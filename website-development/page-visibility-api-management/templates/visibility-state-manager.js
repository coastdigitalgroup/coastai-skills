/**
 * VisibilityStateManager.js
 * Production-grade Page Visibility API Lifecycle Manager
 *
 * Coordinates canvas render loops, video/audio playback, adaptive API polling,
 * and analytics queue flushing on document visibility changes.
 */

export class VisibilityStateManager {
  /**
   * @param {Object} options
   * @param {number} [options.staleTimeMs=300000] Time in background before considering state stale (default: 5 min)
   * @param {string} [options.telemetryEndpoint=''] Endpoint URL for sending beacon telemetry on hide
   */
  constructor(options = {}) {
    this.staleTimeMs = options.staleTimeMs || 300000;
    this.telemetryEndpoint = options.telemetryEndpoint || '';

    this.isHidden = document.visibilityState === 'hidden';
    this.hiddenTimestamp = this.isHidden ? performance.now() : null;

    this.visibleListeners = new Set();
    this.hiddenListeners = new Set();

    this.registeredAnimationLoops = new Map();
    this.registeredPollers = new Map();
    this.registeredMediaElements = new Set();
    this.telemetryQueue = [];

    this._handleVisibilityChange = this._handleVisibilityChange.bind(this);
    this._handlePageHide = this._handlePageHide.bind(this);

    this.init();
  }

  init() {
    document.addEventListener('visibilitychange', this._handleVisibilityChange);
    window.addEventListener('pagehide', this._handlePageHide);
  }

  destroy() {
    document.removeEventListener('visibilitychange', this._handleVisibilityChange);
    window.removeEventListener('pagehide', this._handlePageHide);
    this.visibleListeners.clear();
    this.hiddenListeners.clear();
    this.registeredAnimationLoops.clear();
    this.registeredPollers.clear();
    this.registeredMediaElements.clear();
  }

  /**
   * Subscribe to tab visibility changes
   * @param {Function} onVisible - Callback receiving backgroundDurationMs
   * @param {Function} onHidden - Callback triggered on tab hide
   */
  subscribe(onVisible, onHidden) {
    if (onVisible) this.visibleListeners.add(onVisible);
    if (onHidden) this.hiddenListeners.add(onHidden);

    return () => {
      if (onVisible) this.visibleListeners.delete(onVisible);
      if (onHidden) this.hiddenListeners.delete(onHidden);
    };
  }

  /**
   * Register a render loop managed by requestAnimationFrame
   * @param {string} id - Unique identifier
   * @param {Function} renderStep - Function receiving (currentTime, deltaTime)
   */
  registerAnimationLoop(id, renderStep) {
    const loopState = {
      id,
      renderStep,
      frameId: null,
      lastTime: performance.now(),
      active: false
    };

    const step = (currentTime) => {
      if (!loopState.active) return;
      const dt = currentTime - loopState.lastTime;
      loopState.lastTime = currentTime;

      renderStep(currentTime, dt);

      if (document.visibilityState === 'visible' && loopState.active) {
        loopState.frameId = requestAnimationFrame(step);
      }
    };

    const start = () => {
      if (loopState.active) return;
      loopState.active = true;
      loopState.lastTime = performance.now(); // Reset delta to prevent jumps!
      loopState.frameId = requestAnimationFrame(step);
    };

    const stop = () => {
      loopState.active = false;
      if (loopState.frameId !== null) {
        cancelAnimationFrame(loopState.frameId);
        loopState.frameId = null;
      }
    };

    this.registeredAnimationLoops.set(id, { start, stop });

    if (document.visibilityState === 'visible') {
      start();
    }
  }

  /**
   * Register an adaptive API poller
   * @param {string} id - Unique handle
   * @param {Function} pollFn - Async function executing the network request
   * @param {number} activeIntervalMs - Polling delay when tab is visible
   * @param {number} backgroundIntervalMs - Polling delay when tab is hidden (0 to pause completely)
   */
  registerPoller(id, pollFn, activeIntervalMs = 5000, backgroundIntervalMs = 60000) {
    const pollerState = {
      id,
      pollFn,
      activeIntervalMs,
      backgroundIntervalMs,
      timerId: null
    };

    const schedule = () => {
      if (pollerState.timerId) clearTimeout(pollerState.timerId);

      const isHidden = document.visibilityState === 'hidden';
      const delay = isHidden ? pollerState.backgroundIntervalMs : pollerState.activeIntervalMs;

      if (delay <= 0) return; // Suspended in background

      pollerState.timerId = setTimeout(async () => {
        try {
          await pollFn();
        } catch (e) {
          console.error(`[VisibilityStateManager] Poller error (${id}):`, e);
        }
        schedule();
      }, delay);
    };

    this.registeredPollers.set(id, { schedule, stop: () => clearTimeout(pollerState.timerId) });
    schedule();
  }

  /**
   * Auto-pause video/audio DOM elements on hide
   * @param {HTMLMediaElement} mediaElement
   */
  registerMediaElement(mediaElement) {
    this.registeredMediaElements.add(mediaElement);
  }

  /**
   * Queue telemetry or analytics metrics for beacon flushing on tab hide
   * @param {Object} eventData
   */
  trackTelemetry(eventData) {
    this.telemetryQueue.push({
      ...eventData,
      timestamp: Date.now()
    });
  }

  /**
   * Flush queued analytics using navigator.sendBeacon or keepalive fetch
   */
  flushTelemetry() {
    if (this.telemetryQueue.length === 0 || !this.telemetryEndpoint) return;

    const payload = JSON.stringify({
      events: [...this.telemetryQueue],
      sentAt: Date.now()
    });

    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: 'application/json' });
      navigator.sendBeacon(this.telemetryEndpoint, blob);
    } else {
      fetch(this.telemetryEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true
      }).catch(() => {});
    }

    this.telemetryQueue = [];
  }

  _handleVisibilityChange() {
    if (document.visibilityState === 'hidden') {
      this.isHidden = true;
      this.hiddenTimestamp = performance.now();

      // 1. Pause animation loops
      this.registeredAnimationLoops.forEach(loop => loop.stop());

      // 2. Adjust pollers
      this.registeredPollers.forEach(poller => poller.schedule());

      // 3. Pause media
      this.registeredMediaElements.forEach(media => {
        if (!media.paused) media.pause();
      });

      // 4. Flush analytics
      this.flushTelemetry();

      // 5. Notify hidden listeners
      this.hiddenListeners.forEach(fn => fn());

    } else {
      const backgroundDurationMs = this.hiddenTimestamp
        ? performance.now() - this.hiddenTimestamp
        : 0;

      this.isHidden = false;
      this.hiddenTimestamp = null;

      // 1. Resume animation loops
      this.registeredAnimationLoops.forEach(loop => loop.start());

      // 2. Adjust pollers
      this.registeredPollers.forEach(poller => poller.schedule());

      // 3. Notify visible listeners (passes background duration and staleness flag)
      const isStale = backgroundDurationMs > this.staleTimeMs;
      this.visibleListeners.forEach(fn => fn(backgroundDurationMs, isStale));
    }
  }

  _handlePageHide(event) {
    // Guaranteed final telemetry flush on tab unload / close
    this.flushTelemetry();
  }
}
