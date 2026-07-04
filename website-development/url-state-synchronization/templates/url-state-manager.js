/**
 * URLStateManager
 * A lightweight, framework-agnostic utility for synchronizing UI state with URL query parameters.
 */
class URLStateManager {
  /**
   * @param {Object} options
   * @param {Object} options.defaultState - The fallback values when parameters are missing.
   * @param {Function} options.onUpdate - Callback function triggered when the URL changes (e.g., popstate).
   */
  constructor({ defaultState = {}, onUpdate = () => {} }) {
    this.defaultState = defaultState;
    this.onUpdate = onUpdate;

    // Listen for browser navigation (Back/Forward)
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
    const state = { ...this.defaultState };

    for (const [key, defaultValue] of Object.entries(this.defaultState)) {
      const value = params.get(key);

      if (value !== null) {
        // Simple type casting based on default value type
        if (typeof defaultValue === 'number') {
          state[key] = Number(value);
        } else if (typeof defaultValue === 'boolean') {
          state[key] = value === 'true';
        } else if (Array.isArray(defaultValue)) {
          state[key] = value ? value.split(',') : [];
        } else {
          state[key] = value;
        }
      }
    }

    return state;
  }

  /**
   * Updates the URL based on the provided state.
   * @param {Object} newState - The partial or full state to update.
   * @param {Object} options
   * @param {boolean} options.replace - Use replaceState instead of pushState (default: false).
   */
  setState(newState, { replace = false } = {}) {
    const currentParams = new URLSearchParams(window.location.search);
    const state = { ...this.getState(), ...newState };

    for (const [key, value] of Object.entries(state)) {
      const isDefault = JSON.stringify(value) === JSON.stringify(this.defaultState[key]);

      if (value === null || value === undefined || isDefault) {
        currentParams.delete(key);
      } else {
        const serializedValue = Array.isArray(value) ? value.join(',') : value;
        currentParams.set(key, serializedValue);
      }
    }

    const queryString = currentParams.toString();
    const newURL = `${window.location.pathname}${queryString ? '?' + queryString : ''}${window.location.hash}`;

    if (replace) {
      window.history.replaceState(state, '', newURL);
    } else {
      window.history.pushState(state, '', newURL);
    }
  }
}

// Example usage:
/*
const manager = new URLStateManager({
  defaultState: {
    q: '',
    page: 1,
    tags: []
  },
  onUpdate: (state) => {
    console.log('URL changed, new state:', state);
    // Update your UI here
  }
});

// Initial load
const initialState = manager.getState();

// Update URL when user interacts
manager.setState({ q: 'modern js', page: 2 }, { replace: false });
*/

export default URLStateManager;
