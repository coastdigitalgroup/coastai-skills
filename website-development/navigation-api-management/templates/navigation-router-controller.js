/**
 * NavigationRouterController
 *
 * A production-grade client-side router controller leveraging the W3C Navigation API
 * (window.navigation) with progressive fallback to the History API.
 */
export class NavigationRouterController {
  /**
   * @param {Object} options
   * @param {string} [options.appContainerSelector='#app'] Element selector for view injection
   * @param {string} [options.focusSelector='h1, [autofocus], main'] Element selector for focus management
   * @param {boolean} [options.enableViewTransitions=true] Enable View Transitions API if available
   * @param {Function} [options.onNavigationStart] Optional callback on navigation initiation
   * @param {Function} [options.onNavigationEnd] Optional callback on navigation completion
   * @param {Function} [options.onNavigationError] Optional callback on navigation error
   */
  constructor(options = {}) {
    this.appContainerSelector = options.appContainerSelector || '#app';
    this.focusSelector = options.focusSelector || 'h1, [autofocus], main';
    this.enableViewTransitions = options.enableViewTransitions !== false;
    this.onNavigationStart = options.onNavigationStart || (() => {});
    this.onNavigationEnd = options.onNavigationEnd || (() => {});
    this.onNavigationError = options.onNavigationError || ((err) => console.error('[Router Error]', err));

    this.routes = new Map();
    this.guards = [];
    this.isSupported = 'navigation' in window;
    this.abortController = null;

    this._boundNavigateListener = this._handleNavigateEvent.bind(this);
    this._boundFallbackClickListener = this._handleFallbackClick.bind(this);
    this._boundFallbackPopstateListener = this._handleFallbackPopstate.bind(this);
  }

  /**
   * Initialize the router and attach event listeners.
   */
  init() {
    this._ensureLiveRegion();

    if (this.isSupported) {
      navigation.addEventListener('navigate', this._boundNavigateListener);
    } else {
      document.addEventListener('click', this._boundFallbackClickListener);
      window.addEventListener('popstate', this._boundFallbackPopstateListener);
    }

    // Process initial route
    this.handleRoute(window.location.pathname + window.location.search);
  }

  /**
   * Register a route path and handler.
   * @param {string} path Exact pathname or pattern (e.g., '/dashboard', '/products/:id')
   * @param {Function} handler Async function (params, signal) => HTML string or DOM Node
   */
  addRoute(path, handler) {
    this.routes.set(path, handler);
  }

  /**
   * Add a navigation guard callback.
   * @param {Function} guardFn Function returning boolean (true to allow, false to block)
   */
  addGuard(guardFn) {
    this.guards.push(guardFn);
  }

  /**
   * Programmatically navigate to a URL.
   * @param {string} url Destination URL or path
   * @param {Object} [options] Navigation options
   * @param {Object} [options.state] State object to associate with navigation entry
   * @param {'auto'|'push'|'replace'} [options.history='auto'] History mode
   */
  async navigate(url, options = {}) {
    if (this.isSupported) {
      return navigation.navigate(url, options).finished;
    } else {
      if (options.history === 'replace') {
        window.history.replaceState(options.state || {}, '', url);
      } else {
        window.history.pushState(options.state || {}, '', url);
      }
      return this.handleRoute(url);
    }
  }

  /**
   * Internal W3C Navigation API navigate event handler.
   */
  _handleNavigateEvent(navigateEvent) {
    if (!navigateEvent.canIntercept || navigateEvent.hashChange || navigateEvent.downloadRequest) {
      return;
    }

    const url = new URL(navigateEvent.destination.url);
    if (url.origin !== window.location.origin) {
      return;
    }

    // Run navigation guards
    for (const guard of this.guards) {
      if (!guard(navigateEvent)) {
        navigateEvent.preventDefault();
        return;
      }
    }

    // Intercept navigation
    navigateEvent.intercept({
      scroll: 'manual',
      handler: async () => {
        this.onNavigationStart(url.pathname);
        try {
          const signal = navigateEvent.signal;
          await this._renderRoute(url.pathname + url.search, signal);

          // Manage focus and scroll
          this._manageFocusAndScroll(navigateEvent.navigationType);
          this.onNavigationEnd(url.pathname);
        } catch (err) {
          if (err.name !== 'AbortError') {
            this.onNavigationError(err);
          }
        }
      }
    });
  }

  /**
   * Core route rendering logic.
   */
  async _renderRoute(pathnameWithSearch, signal) {
    const url = new URL(pathnameWithSearch, window.location.origin);
    const routeMatch = this._matchRoute(url.pathname);

    if (!routeMatch) {
      this._renderNotFound();
      return;
    }

    const { handler, params } = routeMatch;

    const renderAction = async () => {
      const content = await handler(params, signal);
      const container = document.querySelector(this.appContainerSelector);
      if (container) {
        if (typeof content === 'string') {
          container.innerHTML = content;
        } else if (content instanceof Node) {
          container.replaceChildren(content);
        }
      }
    };

    // Use View Transitions API if supported and enabled
    if (this.enableViewTransitions && 'startViewTransition' in document) {
      await document.startViewTransition(renderAction).finished;
    } else {
      await renderAction();
    }

    // Screen reader announcement
    const title = document.title || 'Page loaded';
    this._announceToScreenReader(`Navigated to ${title}`);
  }

  /**
   * Simple route pattern matcher.
   */
  _matchRoute(pathname) {
    for (const [pattern, handler] of this.routes.entries()) {
      if (pattern === pathname) {
        return { handler, params: {} };
      }
      // Simple dynamic route matching like /products/:id
      const patternParts = pattern.split('/');
      const pathParts = pathname.split('/');

      if (patternParts.length === pathParts.length) {
        const params = {};
        let matches = true;

        for (let i = 0; i < patternParts.length; i++) {
          if (patternParts[i].startsWith(':')) {
            const paramName = patternParts[i].slice(1);
            params[paramName] = pathParts[i];
          } else if (patternParts[i] !== pathParts[i]) {
            matches = false;
            break;
          }
        }

        if (matches) {
          return { handler, params };
        }
      }
    }
    return null;
  }

  /**
   * Accessible focus and scroll positioning.
   */
  _manageFocusAndScroll(navigationType) {
    if (navigationType === 'push' || navigationType === 'replace') {
      window.scrollTo(0, 0);
    }

    const focusTarget = document.querySelector(this.focusSelector);
    if (focusTarget) {
      if (!focusTarget.hasAttribute('tabindex')) {
        focusTarget.setAttribute('tabindex', '-1');
      }
      focusTarget.focus({ preventScroll: true });
    }
  }

  /**
   * Default 404 handler.
   */
  _renderNotFound() {
    const container = document.querySelector(this.appContainerSelector);
    if (container) {
      container.innerHTML = `
        <div style="padding: 2rem; text-align: center;">
          <h1 tabindex="-1">404 - Page Not Found</h1>
          <p>The requested page does not exist.</p>
          <a href="/">Return Home</a>
        </div>
      `;
    }
  }

  /**
   * WCAG Accessible live region setup.
   */
  _ensureLiveRegion() {
    if (!document.getElementById('router-a11y-announcer')) {
      const region = document.createElement('div');
      region.id = 'router-a11y-announcer';
      region.className = 'visually-hidden';
      region.setAttribute('aria-live', 'polite');
      region.setAttribute('aria-atomic', 'true');
      region.style.cssText = 'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;';
      document.body.appendChild(region);
    }
  }

  _announceToScreenReader(message) {
    const announcer = document.getElementById('router-a11y-announcer');
    if (announcer) {
      announcer.textContent = message;
    }
  }

  // --- Fallback Handlers for Legacy Browsers ---
  _handleFallbackClick(event) {
    const link = event.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    const target = link.getAttribute('target');

    if (href && href.startsWith('/') && target !== '_blank' && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
      event.preventDefault();
      this.navigate(href);
    }
  }

  _handleFallbackPopstate() {
    this.handleRoute(window.location.pathname + window.location.search);
  }

  async handleRoute(url) {
    if (this.abortController) {
      this.abortController.abort();
    }
    this.abortController = new AbortController();
    return this._renderRoute(url, this.abortController.signal);
  }

  /**
   * Cleanup event listeners on destruction.
   */
  destroy() {
    if (this.isSupported) {
      navigation.removeEventListener('navigate', this._boundNavigateListener);
    } else {
      document.removeEventListener('click', this._boundFallbackClickListener);
      window.removeEventListener('popstate', this._boundFallbackPopstateListener);
    }
  }
}
