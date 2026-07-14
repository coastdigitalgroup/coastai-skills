# Form Draft Persistence Example

This example demonstrates how to use `localStorage` to save a user's progress in a multi-field form, ensuring data is not lost on refresh, while properly handling potential storage errors.

## The Problem

Users often lose data when they accidentally refresh a page, lose their internet connection, or their browser crashes while filling out a long form.

## The Solution

Implementing an "Auto-Save" feature that serializes the form state to `localStorage` on every change and restores it when the page loads.

### Implementation

```javascript
/**
 * FormAutoSave.js
 * A simple utility to persist form data to localStorage
 */

const STORAGE_KEY = 'form_draft_v1';

/**
 * Saves form data to localStorage
 * @param {HTMLFormElement} form
 */
function saveFormDraft(form) {
  try {
    const formData = new FormData(form);
    const data = {};

    // Correctly handle multi-value fields (e.g. checkboxes with same name)
    formData.forEach((value, key) => {
      if (data[key]) {
        if (Array.isArray(data[key])) {
          data[key].push(value);
        } else {
          data[key] = [data[key], value];
        }
      } else {
        data[key] = value;
      }
    });

    // Add metadata for expiration/versioning
    const payload = {
      updatedAt: Date.now(),
      values: data
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    console.log('Draft saved successfully');
  } catch (error) {
    // Handle QuotaExceededError or blocked storage
    if (error.name === 'QuotaExceededError') {
      console.error('Storage quota exceeded! Cannot save draft.');
      // Optional: Clear old/other storage items to make room
    } else {
      console.error('Failed to save draft:', error);
    }
  }
}

/**
 * Loads form data from localStorage
 * @param {HTMLFormElement} form
 */
function loadFormDraft(form) {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    if (!rawData) return;

    const { values, updatedAt } = JSON.parse(rawData);

    // Check if the draft is too old (e.g., older than 24 hours)
    const ONE_DAY = 24 * 60 * 60 * 1000;
    if (Date.now() - updatedAt > ONE_DAY) {
      console.log('Draft expired, clearing...');
      localStorage.removeItem(STORAGE_KEY);
      return;
    }

    // Populate form fields
    Object.entries(values).forEach(([name, value]) => {
      const elements = form.elements[name];
      if (!elements) return;

      // Handle multi-element collections (NodeList or RadioNodeList)
      if (elements instanceof NodeList || elements instanceof HTMLCollection || Array.isArray(elements)) {
        const valueArray = Array.isArray(value) ? value : [value];
        Array.from(elements).forEach(element => {
          if (element.type === 'checkbox' || element.type === 'radio') {
            element.checked = valueArray.includes(element.value);
          }
        });
      } else {
        // Single element
        const element = elements;
        if (element.type === 'checkbox') {
          element.checked = value === 'on';
        } else if (element.type === 'radio') {
          element.checked = element.value === value;
        } else {
          element.value = value;
        }
      }
    });

    console.log('Draft restored successfully');
  } catch (error) {
    console.error('Failed to load draft:', error);
    // Potential corrupted JSON, clear it
    localStorage.removeItem(STORAGE_KEY);
  }
}

/**
 * Clears the draft after successful submission
 */
function clearDraft() {
  localStorage.removeItem(STORAGE_KEY);
}

// Usage
const myForm = document.querySelector('#job-application-form');

// Restore on load
window.addEventListener('DOMContentLoaded', () => loadFormDraft(myForm));

// Save on input (debounced for performance)
let saveTimeout;
myForm.addEventListener('input', () => {
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => saveFormDraft(myForm), 500);
});

// Clear on success
myForm.addEventListener('submit', (e) => {
  // Assume AJAX submission for this example
  // e.preventDefault();
  // submitData().then(() => clearDraft());
});
```

## Key Considerations

1.  **Debouncing:** We don't save on every single keystroke. We wait for the user to stop typing for 500ms to avoid excessive `JSON.stringify` and `setItem` calls.
2.  **Expiration:** We check if the draft is older than 24 hours. Stale drafts can be confusing to users who return days later for a fresh start.
3.  **Graceful Failure:** If `localStorage` is full or blocked, the application continues to work (the user just loses the auto-save benefit).
4.  **Serialization:** We use `JSON.stringify` because `localStorage` only stores strings.
5.  **Type Handling:** Special care is taken for checkboxes and radio buttons, as their value handling in `FormData` differs from text inputs.
