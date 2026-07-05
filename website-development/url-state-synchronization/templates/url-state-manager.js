/**
 * URLStateManager - A utility for synchronizing UI state with URL parameters.
 */
class URLStateManager {
  /**
   * @param {Object} config
   * @param {Object} config.defaults - The default state values.
   * @param {Function} config.onUpdate - Callback when state changes (including popstate).
   */
  constructor({ defaults, onUpdate }) {
    this.defaults = defaults;
    this.onUpdate = onUpdate;

    // Listen for browser back/forward buttons
    window.addEventListener('popstate', () => {
      this.onUpdate(this.getState());
    });
  }

  /**
   * Reads the current state from the URL.
   * @returns {Object} The current state object.
   */
  getState() {
    const params = new URLSearchParams(window.location.search);
    const state = {};

    Object.keys(this.defaults).forEach(key => {
      const value = params.get(key);
      const defaultValue = this.defaults[key];

      // Basic Type Parsing
      if (value === null) {
        state[key] = defaultValue;
      } else if (typeof defaultValue === 'number') {
        state[key] = Number(value);
      } else if (typeof defaultValue === 'boolean') {
        state[key] = value === 'true';
      } else {
        state[key] = value;
      }
    });

    return state;
  }

  /**
   * Updates the URL based on the provided state object.
   * @param {Object} newState - The partial or full state to update.
   * @param {string} method - 'pushState' or 'replaceState'.
   */
  updateURL(newState, method = 'pushState') {
    const currentParams = new URLSearchParams(window.location.search);
    const fullState = { ...this.getState(), ...newState };

    Object.keys(fullState).forEach(key => {
      const value = fullState[key];
      const defaultValue = this.defaults[key];

      if (value === defaultValue || value === undefined || value === null) {
        currentParams.delete(key);
      } else {
        currentParams.set(key, value);
      }
    });

    const queryString = currentParams.toString();
    const newURL = `${window.location.pathname}${queryString ? '?' + queryString : ''}`;

    if (window.location.search !== (queryString ? '?' + queryString : '')) {
      window.history[method]({ path: newURL }, '', newURL);
    }
  }
}

/*
// Usage Example:
const urlManager = new URLStateManager({
  defaults: { q: '', page: 1, filter: 'all' },
  onUpdate: (state) => {
    console.log('UI should now reflect:', state);
    // Update your UI components or fetch new data here
  }
});

// To update state (e.g. on filter click):
// urlManager.updateURL({ filter: 'new-value' }, 'pushState');

// To update state (e.g. on search input):
// urlManager.updateURL({ q: 'shoes' }, 'replaceState');
*/
export default URLStateManager;
