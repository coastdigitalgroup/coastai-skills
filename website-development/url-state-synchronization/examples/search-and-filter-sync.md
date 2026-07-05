# Example: Search and Filter Synchronization

This example demonstrates how to synchronize a search input and category filter with the browser URL.

## Before: Local State Only

In this version, the UI works, but refreshing the page resets the search and filters. The back button also doesn't work to undo a filter selection.

```javascript
// ui.js
const searchInput = document.querySelector('#search');
const categorySelect = document.querySelector('#category');

let state = {
  query: '',
  category: 'all'
};

function updateUI() {
  // Logic to filter and render items based on state
  renderItems(state);
}

searchInput.addEventListener('input', (e) => {
  state.query = e.target.value;
  updateUI();
});

categorySelect.addEventListener('change', (e) => {
  state.category = e.target.value;
  updateUI();
});
```

## After: URL State Synchronization

In this version, the state is mirrored in the URL. Users can bookmark their search results, and the back button works as expected.

```javascript
// state-sync.js

/**
 * 1. Initialize State from URL on Page Load
 */
function getInitialState() {
  const params = new URLSearchParams(window.location.search);
  return {
    query: params.get('q') || '',
    category: params.get('cat') || 'all'
  };
}

let state = getInitialState();

// Apply initial state to UI elements
document.querySelector('#search').value = state.query;
document.querySelector('#category').value = state.category;
updateUI(state);

/**
 * 2. Update URL when State Changes
 */
function syncStateToURL(newState, push = true) {
  const params = new URLSearchParams();

  if (newState.query) params.set('q', newState.query);
  if (newState.category !== 'all') params.set('cat', newState.category);

  const newURL = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;

  if (push) {
    window.history.pushState(newState, '', newURL);
  } else {
    window.history.replaceState(newState, '', newURL);
  }
}

// Event Listeners with Sync
document.querySelector('#search').addEventListener('change', (e) => {
  state.query = e.target.value;
  syncStateToURL(state, true); // Create history entry on change
  updateUI(state);
});

document.querySelector('#category').addEventListener('change', (e) => {
  state.category = e.target.value;
  syncStateToURL(state, true);
  updateUI(state);
});

/**
 * 3. Handle Back/Forward Buttons
 */
window.addEventListener('popstate', (event) => {
  // Update state from the new URL
  state = getInitialState();

  // Sync UI elements back to state
  document.querySelector('#search').value = state.query;
  document.querySelector('#category').value = state.category;

  updateUI(state);
});

function updateUI(s) {
  console.log('Rendering items for:', s);
  // ... rendering logic
}
```

## Key Improvements

1.  **Shareability:** A user can copy `example.com/?q=shoes&cat=sport` and send it to a friend.
2.  **Back Button:** Clicking "Back" after changing a category returns the user to the previous category.
3.  **Consistency:** Standardizing `URLSearchParams` avoids manual string manipulation and encoding errors.
4.  **Resilience:** Refreshing the page doesn't lose the user's progress.
