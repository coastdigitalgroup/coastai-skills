/**
 * NavigationRouterController
 *
 * A zero-dependency, production-ready router controller that encapsulates the W3C Navigation API
 * (window.navigation) for SPA client-side routing, navigation guards, history state management,
 * and accessible focus placement, with seamless fallback for HTML5 History API browsers.
 */

export class NavigationRouterController {
  /**
   * @param {Object} options
   * @param {HTMLElement} [options.renderTarget] Container element for view updates
   * @param {HTMLElement} [options.liveRegion] Screen reader aria-live announcer element
   * @param {boolean} [options.useViewTransitions=true] Enable View Transitions API if available
   * @param {Function} [options.onLoadingChange] Callback triggered when route loading state changes
   */
  constructor(options = {}) {
    this.renderTarget = options.renderTarget || document.querySelector('main') || document.body;
    this.liveRegion = options.liveRegion || document.getElementById('a11y-announcer');
    this.useViewTransitions = options.useViewTransitions !== false;
    this.onLoadingChange = options.onLoadingChange || (() => {});

    this.routes = new Map();
    this.guards = [];
    this.isNativeSupported = typeof window !== 'undefined' && 'navigation' in window;
    this.isInitialized = false;

    this.boundNavigateHandler = this.handleNativeNavigate.bind(this);
    this.boundFallbackClickHandler = this.handleFallbackClick.bind(this);
    this.boundFallbackPopstateHandler = this.handleFallbackPopstate.bind(this);
  }

  /**
   * Register a route path or pattern with a view handler function.
   * @param {string|RegExp} pattern Path string (e.g. '/products/:id') or RegExp
   * @param {Function} handler Async or sync function returning template/content or handling render
   */
  addRoute(pattern, handler) {
    this.routes.set(pattern, handler);
    return this;
  }

  /**
   * Register a global navigation guard function.
   * Guard functions must return true (allow) or false (block/cancel).
   * @param {Function} guardFn Function receiving (destinationUrl, navigationType)
   */
  addGuard(guardFn) {
    this.guards.push(guardFn);
    return this;
  }

  /**
   * Initialize the router and attach appropriate event listeners.
   */
  init() {
    if (this.isInitialized) return;
    this.isInitialized = true;

    if (this.isNativeSupported) {
      window.navigation.addEventListener('navigate', this.boundNavigateHandler);
      window.navigation.addEventListener('navigatesuccess', () => this.handleNavigateSuccess());
      window.navigation.addEventListener('navigateerror', (e) => this.handleNavigateError(e));
    } else {
      document.addEventListener('click', this.boundFallbackClickHandler);
      window.addEventListener('popstate', this.boundFallbackPopstateHandler);
    }

    // Process initial route render
    this.processRoute(window.location.href, 'initial');
  }

  /**
   * Native W3C Navigation API 'navigate' event handler.
   */
  async handleNativeNavigate(event) {
    // 1. Verify if the navigation can be intercepted
    if (!event.canIntercept) return;

    const destUrl = new URL(event.destination.url);

    // 2. Cross-origin guard
    if (destUrl.origin !== window.location.origin) return;

    // 3. Download/external attribute guard
    if (event.download !== null) return;

    // 4. Run pre-interception synchronous guards
    for (const guard of this.guards) {
      const allowed = await guard(destUrl, event.navigationType);
      if (!allowed) {
        event.preventDefault(); // Cancel navigation
        return;
      }
    }

    // 5. Intercept same-document navigation
    event.intercept({
      handler: async () => {
        this.onLoadingChange(true);
        try {
          await this.processRoute(destUrl.href, event.navigationType, event.formData);
        } finally {
          this.onLoadingChange(false);
        }
      },
      focusReset: 'after-transition',
      scroll: 'after-transition'
    });
  }

  /**
   * Process and render a matching route.
   */
  async processRoute(urlStr, navigationType = 'push', formData = null) {
    const url = new URL(urlStr, window.location.origin);
    const pathname = url.pathname;

    let matchedHandler = null;
    let routeParams = {};

    // Match route
    for (const [pattern, handler] of this.routes.entries()) {
      if (typeof pattern === 'string') {
        if (pattern === pathname) {
          matchedHandler = handler;
          break;
        }
        // Simple parameterized route matching (e.g., /products/:id)
        const paramNames = [];
        const regexPath = pattern.replace(/:([^/]+)/g, (_, key) => {
          paramNames.push(key);
          return '([^/]+)';
        });
        const match = pathname.match(new RegExp(`^${regexPath}$`));
        if (match) {
          matchedHandler = handler;
          paramNames.forEach((name, idx) => {
            routeParams[name] = match[idx + 1];
          });
          break;
        }
      } else if (pattern instanceof RegExp) {
        const match = pathname.match(pattern);
        if (match) {
          matchedHandler = handler;
          routeParams = match.groups || {};
          break;
        }
      }
    }

    if (!matchedHandler) {
      matchedHandler = () => `<h1>404 Page Not Found</h1><p>No route matched for <code>${pathname}</code></p>`;
    }

    // Execute view handler
    const viewResult = await matchedHandler({ url, pathname, params: routeParams, formData, navigationType });

    // Apply DOM update
    const updateDom = () => {
      if (typeof viewResult === 'string') {
        this.renderTarget.innerHTML = viewResult;
      } else if (viewResult instanceof HTMLElement) {
        this.renderTarget.innerHTML = '';
        this.renderTarget.appendChild(viewResult);
      }
    };

    if (this.useViewTransitions && document.startViewTransition) {
      await document.startViewTransition(updateDom).finished;
    } else {
      updateDom();
    }
  }

  /**
   * Post-navigation success tasks (focus & accessibility).
   */
  handleNavigateSuccess() {
    const focusTarget = this.renderTarget.querySelector('h1, [tabindex="-1"]') || this.renderTarget;
    if (focusTarget) {
      if (!focusTarget.hasAttribute('tabindex')) {
        focusTarget.setAttribute('tabindex', '-1');
      }
      focusTarget.focus({ preventScroll: true });
    }

    if (this.liveRegion) {
      this.liveRegion.textContent = `Navigated to ${document.title || 'new page'}`;
    }
  }

  /**
   * Handle navigation errors or promise rejections.
   */
  handleNavigateError(event) {
    console.error('[NavigationRouterController] Navigation failed:', event.error);
    this.onLoadingChange(false);
  }

  /**
   * Fallback click delegate for non-supporting browsers.
   */
  async handleFallbackClick(event) {
    const anchor = event.target.closest('a');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('//') || anchor.hasAttribute('target')) {
      return;
    }

    event.preventDefault();
    const destUrl = new URL(href, window.location.origin);

    for (const guard of this.guards) {
      const allowed = await guard(destUrl, 'push');
      if (!allowed) return;
    }

    this.onLoadingChange(true);
    try {
      history.pushState(null, '', href);
      await this.processRoute(destUrl.href, 'push');
      this.handleNavigateSuccess();
    } finally {
      this.onLoadingChange(false);
    }
  }

  /**
   * Fallback popstate listener.
   */
  async handleFallbackPopstate() {
    this.onLoadingChange(true);
    try {
      await this.processRoute(window.location.href, 'traverse');
      this.handleNavigateSuccess();
    } finally {
      this.onLoadingChange(false);
    }
  }

  /**
   * Programmatically navigate to a URL.
   * @param {string} url Destination path or full URL
   * @param {Object} [options] Navigation options (e.g., state, history mode)
   */
  async navigate(url, options = {}) {
    if (this.isNativeSupported) {
      return window.navigation.navigate(url, {
        state: options.state,
        history: options.replace ? 'replace' : 'push'
      }).finished;
    } else {
      const destUrl = new URL(url, window.location.origin);
      if (options.replace) {
        history.replaceState(options.state || null, '', url);
      } else {
        history.pushState(options.state || null, '', url);
      }
      await this.processRoute(destUrl.href, options.replace ? 'replace' : 'push');
      this.handleNavigateSuccess();
    }
  }

  /**
   * Destroy router and remove listeners.
   */
  destroy() {
    if (!this.isInitialized) return;

    if (this.isNativeSupported) {
      window.navigation.removeEventListener('navigate', this.boundNavigateHandler);
    } else {
      document.removeEventListener('click', this.boundFallbackClickHandler);
      window.removeEventListener('popstate', this.boundFallbackPopstateHandler);
    }
    this.isInitialized = false;
  }
}
