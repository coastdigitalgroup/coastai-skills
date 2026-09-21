/**
 * LoAFObserverManager - Production Manager for W3C Long Animation Frames (LoAF) API
 *
 * Captures, parses, attributes, and streams main-thread blocking frame telemetry
 * (>50ms) to identify script culpability and Interaction to Next Paint (INP) bottlenecks.
 */
export class LoAFObserverManager {
  /**
   * @param {Object} options
   * @param {Function} [options.onLoAFDetected] - Callback when a LoAF entry is recorded.
   * @param {string} [options.beaconEndpoint] - API URL to stream reports via sendBeacon.
   * @param {number} [options.minDurationThreshold=50] - Minimum frame duration in ms to process.
   * @param {number} [options.batchIntervalMs=10000] - Telemetry flush interval in ms.
   * @param {Array<string|RegExp>} [options.thirdPartyDomains] - Patterns matching third-party scripts.
   * @param {boolean} [options.enableConsoleLogs=false] - Log LoAF entries to console in dev mode.
   */
  constructor(options = {}) {
    this.options = {
      onLoAFDetected: null,
      beaconEndpoint: null,
      minDurationThreshold: 50,
      batchIntervalMs: 10000,
      thirdPartyDomains: [
        'googletagmanager.com',
        'google-analytics.com',
        'facebook.net',
        'hotjar.com',
        'segment.io',
        'clarity.ms'
      ],
      enableConsoleLogs: false,
      ...options
    };

    this.observer = null;
    this.buffer = [];
    this.batchTimer = null;
    this.lastInteraction = null;
    this.isSupported = this.checkSupport();

    if (this.isSupported) {
      this.initInteractionTracker();
      this.initObserver();
      this.initUnloadFlusher();
    } else {
      if (this.options.enableConsoleLogs) {
        console.warn('[LoAFObserverManager] Long Animation Frames API is not supported in this browser.');
      }
    }
  }

  /**
   * Check browser support for long-animation-frame entry type.
   * @returns {boolean}
   */
  checkSupport() {
    return typeof window !== 'undefined' &&
      'PerformanceObserver' in window &&
      Array.isArray(PerformanceObserver.supportedEntryTypes) &&
      PerformanceObserver.supportedEntryTypes.includes('long-animation-frame');
  }

  /**
   * Initialize rolling tracker for user interaction events (INP correlation).
   */
  initInteractionTracker() {
    this.interactionHandler = (event) => {
      this.lastInteraction = {
        type: event.type,
        targetTag: event.target?.tagName || 'UNKNOWN',
        targetId: event.target?.id || '',
        timeStamp: performance.now()
      };
    };

    ['pointerdown', 'keydown', 'click'].forEach((type) => {
      window.addEventListener(type, this.interactionHandler, { capture: true, passive: true });
    });
  }

  /**
   * Instantiate and attach PerformanceObserver.
   */
  initObserver() {
    try {
      this.observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        for (const entry of entries) {
          if (entry.duration >= this.options.minDurationThreshold) {
            this.handleEntry(entry);
          }
        }
      });

      this.observer.observe({ type: 'long-animation-frame', buffered: true });

      if (this.options.beaconEndpoint && this.options.batchIntervalMs > 0) {
        this.batchTimer = setInterval(() => this.flush(), this.options.batchIntervalMs);
      }
    } catch (err) {
      console.error('[LoAFObserverManager] Error initializing PerformanceObserver:', err);
    }
  }

  /**
   * Process and normalize a single PerformanceLongAnimationFrameTiming entry.
   * @param {PerformanceEntry} entry
   */
  handleEntry(entry) {
    const parsedRecord = this.parseEntry(entry);

    if (this.options.enableConsoleLogs) {
      console.groupCollapsed(
        `%c[LoAF Detected] Duration: ${parsedRecord.duration.toFixed(1)}ms | Blocking: ${parsedRecord.blockingDuration.toFixed(1)}ms`,
        'color: #fbbf24; font-weight: bold;'
      );
      console.log('Frame Breakdown:', {
        renderStartDelay: parsedRecord.renderDelayMs,
        styleAndLayoutDuration: parsedRecord.styleAndLayoutDurationMs,
        isInteractionCorrelated: parsedRecord.isInteractionCorrelated
      });
      console.log('Script Attributions:', parsedRecord.scripts);
      console.groupEnd();
    }

    if (typeof this.options.onLoAFDetected === 'function') {
      this.options.onLoAFDetected(parsedRecord);
    }

    if (this.options.beaconEndpoint) {
      this.buffer.push(parsedRecord);
    }
  }

  /**
   * Extract and structure metrics from raw LoAF performance entry.
   * @param {PerformanceEntry} entry
   * @returns {Object}
   */
  parseEntry(entry) {
    const duration = entry.duration;
    const blockingDuration = entry.blockingDuration || Math.max(0, duration - 50);
    const startTime = entry.startTime;
    const renderStart = entry.renderStart || 0;
    const styleAndLayoutStart = entry.styleAndLayoutStart || 0;

    const renderDelayMs = renderStart > 0 ? entry.duration - (renderStart - startTime) : 0;
    const styleAndLayoutDurationMs = (styleAndLayoutStart > 0 && renderStart > 0)
      ? entry.duration - (styleAndLayoutStart - startTime)
      : 0;

    // Interaction correlation
    const isInteractionCorrelated = !!(
      this.lastInteraction &&
      this.lastInteraction.timeStamp >= startTime - 16 &&
      this.lastInteraction.timeStamp <= startTime + duration
    );

    const interactionDetails = isInteractionCorrelated ? { ...this.lastInteraction } : null;

    // Parse script attributions
    const scripts = (entry.scripts || []).map((script) => {
      const sourceURL = script.sourceURL || '';
      const category = this.categorizeScriptDomain(sourceURL);

      return {
        invoker: script.invoker || '',
        invokerType: script.invokerType || 'script',
        sourceURL,
        sourceFunctionName: script.sourceFunctionName || '(anonymous)',
        sourceCharPosition: script.sourceCharPosition || 0,
        forcedStyleAndLayoutDurationMs: script.forcedStyleAndLayoutDuration || 0,
        pauseDurationMs: script.pauseDuration || 0,
        category
      };
    });

    return {
      duration,
      blockingDuration,
      startTime,
      renderDelayMs,
      styleAndLayoutDurationMs,
      isInteractionCorrelated,
      interactionDetails,
      scripts,
      pageUrl: typeof window !== 'undefined' ? window.location.href : ''
    };
  }

  /**
   * Categorize script domain as first-party, third-party, extension, or inline.
   * @param {string} sourceURL
   * @returns {string}
   */
  categorizeScriptDomain(sourceURL) {
    if (!sourceURL) return 'inline-or-eval';
    if (sourceURL.startsWith('chrome-extension://') || sourceURL.startsWith('moz-extension://')) {
      return 'browser-extension';
    }

    if (typeof window !== 'undefined' && sourceURL.startsWith(window.location.origin)) {
      return 'first-party';
    }

    const isMatch = this.options.thirdPartyDomains.some((domain) => {
      return typeof domain === 'string'
        ? sourceURL.includes(domain)
        : domain.test(sourceURL);
    });

    return isMatch ? 'known-third-party' : 'other-third-party';
  }

  /**
   * Set up page visibility listeners to flush buffer on unload.
   */
  initUnloadFlusher() {
    this.unloadHandler = () => this.flush();
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          this.flush();
        }
      });
    }
  }

  /**
   * Transmit buffered telemetry reports via sendBeacon or keepalive fetch.
   */
  flush() {
    if (this.buffer.length === 0 || !this.options.beaconEndpoint) return;

    const payload = JSON.stringify({
      timestamp: Date.now(),
      records: [...this.buffer]
    });

    this.buffer = [];

    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      navigator.sendBeacon(this.options.beaconEndpoint, payload);
    } else if (typeof fetch === 'function') {
      fetch(this.options.beaconEndpoint, {
        method: 'POST',
        body: payload,
        headers: { 'Content-Type': 'application/json' },
        keepalive: true
      }).catch((err) => {
        console.error('[LoAFObserverManager] Failed to transmit telemetry:', err);
      });
    }
  }

  /**
   * Teardown observer and clean up event listeners.
   */
  destroy() {
    if (this.batchTimer) {
      clearInterval(this.batchTimer);
      this.batchTimer = null;
    }

    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }

    if (this.interactionHandler && typeof window !== 'undefined') {
      ['pointerdown', 'keydown', 'click'].forEach((type) => {
        window.removeEventListener(type, this.interactionHandler, { capture: true });
      });
    }

    this.flush();
  }
}
