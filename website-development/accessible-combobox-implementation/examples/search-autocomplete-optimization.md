# Example: Transforming a Search Autocomplete

This example shows the evolution of a search autocomplete from a basic,
inaccessible input to a robust, ARIA-compliant combobox.

## Before: Inaccessible "Autocomplete"

A common mistake is using a simple `div` for suggestions and ignoring keyboard
or screen reader support.

```html
<!-- ❌ INACCESSIBLE: No ARIA, No Keyboard Support -->
<div class="search-wrapper">
  <label for="search">Search Products:</label>
  <input type="text" id="search" placeholder="Type to search..." />
  <div class="suggestions" id="results">
    <!-- Suggestions are injected here via JS -->
    <div class="suggestion-item">Product A</div>
    <div class="suggestion-item">Product B</div>
  </div>
</div>
```

**Issues:**

- Screen readers don't know the input is a combobox.
- Users can't navigate suggestions using arrow keys.
- Selection is mouse-only.
- No "Expanded" state communication.

---

## After: Accessible Combobox

The optimized version follows the ARIA 1.2 pattern, ensuring the input and
listbox are programmatically linked and navigable.

```html
<!-- ✅ ACCESSIBLE: ARIA 1.2 Pattern -->
<div class="combobox-wrapper">
  <label for="cb-input" id="cb-label">Search Products:</label>

  <div class="combobox-container">
    <input
      type="text"
      id="cb-input"
      role="combobox"
      aria-autocomplete="list"
      aria-expanded="false"
      aria-haspopup="listbox"
      aria-controls="cb-listbox"
      aria-labelledby="cb-label"
      placeholder="Type to search..."
    />

    <ul
      id="cb-listbox"
      role="listbox"
      aria-labelledby="cb-label"
      class="hidden"
    >
      <!-- Options are injected here -->
      <li id="opt-1" role="option">Product A</li>
      <li id="opt-2" role="option">Product B</li>
    </ul>
  </div>

  <!-- Status region for screen readers -->
  <div id="cb-status" class="sr-only" aria-live="polite"></div>
</div>

<script>
  // Simplified logic for updating aria-activedescendant
  const input = document.getElementById('cb-input')
  const listbox = document.getElementById('cb-listbox')

  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      // Logic to show listbox and highlight first item
      input.setAttribute('aria-expanded', 'true')
      listbox.classList.remove('hidden')

      // Update programmatic focus
      const firstOptId = 'opt-1'
      input.setAttribute('aria-activedescendant', firstOptId)
      // Update visual styles...
    }

    if (e.key === 'Escape') {
      input.setAttribute('aria-expanded', 'false')
      listbox.classList.add('hidden')
      input.removeAttribute('aria-activedescendant')
    }
  })
</script>
```

**Improvements:**

- **Semantics:** Uses `role="combobox"` and `role="listbox"`.
- **Relationship:** `aria-controls` and `aria-labelledby` establish clear
  connections.
- **State:** `aria-expanded` toggles when the listbox is shown/hidden.
- **Visual Focus:** `aria-activedescendant` allows screen readers to follow
  arrow key navigation without moving physical focus from the input.
- **Feedback:** An `aria-live` status region informs users of result counts.
