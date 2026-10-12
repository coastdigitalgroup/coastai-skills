/**
 * NavigationRouterController
 * Reusable, framework-agnostic Navigation API router controller.
 * Manages same-origin interceptable routing, async view data fetching with AbortSignal,
 * unsaved form state guards, history state persistence, and WCAG AA accessibility focus.
 */
export class NavigationRouterController {
  /**
   * @param {Object} options
   * @param {HTMLElement} options.mainContentEl Container for view content
   * @param {HTMLElement} [options.loadingIndicatorEl] Element toggled during async transitions
   * @param {HTMLElement} [options.announcerEl] Live region element for screen reader alerts
   * @param {Function} [options.dirtyStateChecker] Callback returning true if unsaved changes exist
   * @param {Object<string, Function>} [options.routes] Route mapping from pathname to render handler
   */
  constructor(options = {}) {
    this.mainContentEl = options.mainContentEl;
    this.loadingIndicatorEl = options.loadingIndicatorEl || null;
    this.announcerEl = options.announcerEl || null;
    this.dirtyStateChecker = options.dirtyStateChecker || (() => false);
    this.routes = options.routes || {};

    this.isSupported = typeof window !== 'undefined' && 'navigation' in window;
    this.activeAbortController = null;

    this.init();
  }

  init() {
    if (this.isSupported) {
      this.setupNavigationAPI();
    } else {
      this.setupHistoryFallback();
    }
  }

  /**
   * Register a route dynamically
   * @param {string} path Pathname (e.g., '/products')
   * @param {Function} handler Async callback returning HTML string or view element
   */
  registerRoute(path, handler) {
    this.routes[path] = handler;
  }

  /**
   * Modern Navigation API Interceptor Setup
   */
  setupNavigationAPI() {
    window.navigation.addEventListener('navigate', (e) => {
      // Filter out non-interceptable or external navigations
      if (!e.canIntercept || e.hashChange || e.downloadRequest) {
        return;
      }

      const destinationUrl = new URL(e.destination.url);

      if (destinationUrl.origin !== location.origin) {
        return;
      }

      // Check for unsaved changes before intercepting
      if (this.dirtyStateChecker()) {
        const confirmLeave = window.confirm(
          'You have unsaved changes. Are you sure you want to discard them and leave?'
        );
        if (!confirmLeave) {
          e.preventDefault(); // Cancel navigation
          return;
        }
      }

      // Intercept same-origin same-document transition
      e.intercept({
        handler: async () => {
          await this.executeRouteHandler(destinationUrl, e.navigationType, e.signal);
        },
        focusReset: 'after-transition',
        scroll: 'after-transition'
      });
    });

    window.navigation.addEventListener('navigateerror', (e) => {
      console.error('[NavigationRouterController] Transition failed:', e.error);
    });
  }

  /**
   * History API Fallback for Legacy Environments
   */
  setupHistoryFallback() {
    document.addEventListener('click', (e) => {
      const anchor = e.target.closest('a');
      if (!anchor || !anchor.href) return;

      const url = new URL(anchor.href);
      if (
        url.origin === location.origin &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.shiftKey &&
        !anchor.hasAttribute('download')
      ) {
        e.preventDefault();

        if (this.dirtyStateChecker()) {
          const confirmLeave = window.confirm('Unsaved changes will be lost. Continue?');
          if (!confirmLeave) return;
        }

        history.pushState({}, '', url.pathname);
        this.executeRouteHandler(url, 'push', null);
      }
    });

    window.addEventListener('popstate', () => {
      const url = new URL(location.href);
      this.executeRouteHandler(url, 'traverse', null);
    });
  }

  /**
   * Execute Route Handler with AbortSignal Integration
   */
  async executeRouteHandler(url, navigationType, signal) {
    this.setLoadingState(true);

    try {
      const routeHandler = this.routes[url.pathname] || this.routes['*'] || this.default404Handler;

      // Execute view handler passing url parameters and abort signal
      const content = await routeHandler({
        url,
        pathname: url.pathname,
        searchParams: url.searchParams,
        navigationType,
        signal,
        historyState: this.isSupported ? window.navigation.currentEntry?.getState() : history.state
      });

      if (content) {
        if (typeof content === 'string') {
          this.mainContentEl.innerHTML = content;
        } else if (content instanceof HTMLElement) {
          this.mainContentEl.replaceChildren(content);
        }
      }

      this.updateAccessibilityState();
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('[NavigationRouterController] Navigation aborted by subsequent action.');
      } else {
        this.renderErrorState(err);
      }
    } finally {
      this.setLoadingState(false);
    }
  }

  /**
   * Programmatic Navigation Wrapper
   * @param {string} url Target path
   * @param {Object} [options] Navigation options
   * @param {Object} [options.state] History state object
   * @param {'push'|'replace'} [options.history] History mode
   */
  navigate(url, options = {}) {
    if (this.isSupported) {
      window.navigation.navigate(url, {
        state: options.state || null,
        history: options.history || 'push'
      });
    } else {
      if (options.history === 'replace') {
        history.replaceState(options.state || {}, '', url);
      } else {
        history.pushState(options.state || {}, '', url);
      }
      this.executeRouteHandler(new URL(url, location.origin), options.history || 'push', null);
    }
  }

  setLoadingState(isLoading) {
    if (this.loadingIndicatorEl) {
      if (isLoading) {
        this.loadingIndicatorEl.classList.add('is-loading');
        this.loadingIndicatorEl.setAttribute('aria-busy', 'true');
      } else {
        this.loadingIndicatorEl.classList.remove('is-loading');
        this.loadingIndicatorEl.removeAttribute('aria-busy');
      }
    }
  }

  updateAccessibilityState() {
    if (this.mainContentEl) {
      // Ensure focusable for keyboard navigation after route shift
      if (!this.mainContentEl.hasAttribute('tabindex')) {
        this.mainContentEl.setAttribute('tabindex', '-1');
      }
      this.mainContentEl.focus();
    }

    if (this.announcerEl) {
      const title = document.title || 'Page loaded';
      this.announcerEl.textContent = `Navigated to ${title}`;
    }
  }

  default404Handler() {
    return `
      <section class="error-404">
        <h1>404 - Page Not Found</h1>
        <p>The requested route could not be found.</p>
      </section>
    `;
  }

  renderErrorState(error) {
    if (this.mainContentEl) {
      this.mainContentEl.innerHTML = `
        <section class="error-500">
          <h1>Route Transition Error</h1>
          <p>${error.message || 'An unexpected navigation error occurred.'}</p>
        </section>
      `;
    }
  }
}
