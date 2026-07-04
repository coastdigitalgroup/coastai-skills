# Example: Search and Filter Synchronization

This example demonstrates how to synchronize a product search and category
filter with the URL. This ensures that users can share a link to a specific set
of results and that the browser "Back" button works as expected.

## Before: Purely Local State

In this version, if the user refreshes the page or shares the link, the search
and category selections are lost.

```javascript
// Local state only - lost on refresh
const state = {
  query: '',
  category: 'all'
};

const searchInput = document.querySelector('#search');
const categorySelect = document.querySelector('#category');

function updateResults() {
  console.log(`Searching for "${state.query}" in ${state.category}`);
  // Fetch results based on state...
}

searchInput.addEventListener('input', (e) => {
  state.query = e.target.value;
  updateResults();
});

categorySelect.addEventListener('change', (e) => {
  state.category = e.target.value;
  updateResults();
});
```

## After: URL-Synchronized State

In this version, every change is reflected in the URL, and the state is
initialized from the URL on load.

```javascript
// 1. Initialize state from URL on load
const urlParams = new URLSearchParams(window.location.search);

const state = {
  query: urlParams.get('q') || '',
  category: urlParams.get('cat') || 'all'
};

const searchInput = document.querySelector('#search');
const categorySelect = document.querySelector('#category');

// 2. Set initial UI values to match URL
searchInput.value = state.query;
categorySelect.value = state.category;

function updateURL(replace = false) {
  const newParams = new URLSearchParams();

  // Only add to URL if not default
  if (state.query) newParams.set('q', state.query);
  if (state.category !== 'all') newParams.set('cat', state.category);

  const newRelativePathQuery = window.location.pathname + '?' + newParams.toString();

  if (replace) {
    history.replaceState(state, '', newRelativePathQuery);
  } else {
    history.pushState(state, '', newRelativePathQuery);
  }
}

function updateResults() {
  console.log(`Searching for "${state.query}" in ${state.category}`);
  // Fetch results based on state...
}

// 3. Handle interactions
let searchTimeout;
searchInput.addEventListener('input', (e) => {
  state.query = e.target.value;

  // Debounce URL updates for typing to avoid history bloat
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    updateURL(true); // Use replaceState while typing
    updateResults();
  }, 300);
});

categorySelect.addEventListener('change', (e) => {
  state.category = e.target.value;
  updateURL(false); // Use pushState for discrete filter changes
  updateResults();
});

// 4. Handle Back/Forward buttons
window.addEventListener('popstate', (event) => {
  const params = new URLSearchParams(window.location.search);

  state.query = params.get('q') || '';
  state.category = params.get('cat') || 'all';

  // Update UI components to match new state
  searchInput.value = state.query;
  categorySelect.value = state.category;

  updateResults();
});

// Initial load
updateResults();
```

## Key Improvements

1.  **Hydration:** The app reads the URL on load, meaning shared links work
    immediately.
2.  **Debounced Updates:** Using `setTimeout` and `replaceState` for the search
    input prevents creating a new history entry for every single character
    typed.
3.  **Back Button Support:** The `popstate` listener ensures that if a user
    clicks "Back" after filtering, the UI correctly reverts to the previous
    filter.
4.  **Clean URLs:** Parameters are only added if they differ from the default
    value (e.g., no `?cat=all`).
