/**
 * A reusable pattern for managing abortable fetch requests.
 * Use this to wrap your data-fetching logic in components that
 * trigger frequent updates (search, filters, etc.)
 */
export function createAbortableFetch() {
  let currentController = null;

  /**
   * Performs an abortable fetch.
   * @param {string} url - The URL to fetch.
   * @param {Object} options - Standard fetch options.
   * @returns {Promise<Response>}
   */
  return async function(url, options = {}) {
    // 1. Abort any previous request managed by this instance
    if (currentController) {
      currentController.abort();
    }

    // 2. Create a new controller for the current request
    currentController = new AbortController();

    try {
      const response = await fetch(url, {
        ...options,
        signal: currentController.signal
      });
      return response;
    } catch (error) {
      // 3. Re-throw the error unless it's a planned abortion
      if (error.name === 'AbortError') {
        // Return a null or specific object to indicate cancellation
        return { aborted: true };
      }
      throw error;
    }
  };
}

// Example usage in a component:
/*
const safeFetch = createAbortableFetch();

async function handleSearch(query) {
  const response = await safeFetch(`/api/search?q=${query}`);

  if (response.aborted) return; // Request was replaced by a newer one

  if (response.ok) {
    const data = await response.json();
    updateUI(data);
  }
}
*/
