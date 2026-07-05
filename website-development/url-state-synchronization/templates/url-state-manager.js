/**
 * URLStateManager
 * A lightweight utility to synchronize UI state with browser URL parameters.
 */
export class URLStateManager {
  /**
   * @param {Object} options
   * @param {Function} options.onChange Callback triggered when URL state changes (including popstate)
   * @param {Object} options.defaultState Default values for state properties
   */
  constructor({ onChange, defaultState = {} }) {
    this.onChange = onChange;
    this.defaultState = defaultState;

    // Listen for back/forward navigation
    window.addEventListener('popstate', () => {
      this.onChange(this.getState());
    });
  }

  /**
   * Retrieves current state from the URL
   * @returns {Object}
   */
  getState() {
    const params = new URLSearchParams(window.location.search);
    const state = { ...this.defaultState };

    params.forEach((value, key) => {
      // Basic type inference: handle numbers and booleans
      if (value === 'true') {
        state[key] = true;
      } else if (value === 'false') {
        state[key] = false;
      } else if (!isNaN(value) && value !== '') {
        state[key] = Number(value);
      } else {
        state[key] = value;
      }
    });

    return state;
  }

  /**
   * Updates the URL to reflect the new state
   * @param {Object} newState
   * @param {boolean} push Create a new history entry (true) or replace current (false)
   */
  setState(newState, push = true) {
    const params = new URLSearchParams();

    Object.entries(newState).forEach(([key, value]) => {
      // Only include values that differ from defaults and are not null/undefined
      if (
        value !== this.defaultState[key] &&
        value !== null &&
        value !== undefined &&
        value !== ''
      ) {
        params.set(key, value.toString());
      }
    });

    const queryString = params.toString();
    const newURL = `${window.location.pathname}${queryString ? '?' + queryString : ''}`;

    if (push) {
      window.history.pushState(newState, '', newURL);
    } else {
      window.history.replaceState(newState, '', newURL);
    }
  }

  /**
   * Clears all parameters from the URL except defaults
   */
  clear() {
    this.setState(this.defaultState);
  }
}

// Example usage:
/*
const manager = new URLStateManager({
  defaultState: { page: 1, sort: 'newest', query: '' },
  onChange: (newState) => {
    console.log('URL Changed, updating UI:', newState);
    // myApp.update(newState);
  }
});

// To update URL when user clicks a filter:
// manager.setState({ ...manager.getState(), sort: 'price_low' });
*/
