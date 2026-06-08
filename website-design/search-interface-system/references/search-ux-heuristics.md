# Search UX Heuristics & Standards

This reference guide covers the accessibility, interaction, and performance standards for a professional search interface.

## 1. Accessibility (WCAG 2.1 AA)

Search is a critical utility and must be accessible to all users.

- **Accessible Labels:** Every search input MUST have a programmatically linked label. If visually hidden, use `aria-label="Search [site name]"` or a visually hidden `<label>`.
- **Keyboard Navigation:**
  - `Escape`: Must close the autocomplete dropdown or the mobile search overlay.
  - `Arrow Down / Up`: Must cycle focus through autocomplete suggestions.
  - `Enter`: Must navigate to the currently focused suggestion or the full results page.
- **Focus Indicators:** The search input must have a high-contrast focus ring (min 3:1 contrast) when active.
- **ARIA Live Regions:** Use `aria-live="polite"` to announce when search results are updated or when "No results" are found, ensuring screen reader users are aware of the change.

## 2. Interaction Design (The Search "Feel")

- **The Debounce:** Delay the search request by ~250ms-300ms after the last keystroke to prevent flickering results and excessive server load.
- **Visual Feedback (Loading):**
  - Show a small spinner inside the input or a progress bar at the top of the dropdown when fetching results.
  - Use `skeleton-state-system` for the full results page.
- **State Persistence:** When a user navigates to a result and then clicks "Back" in their browser, the search term should remain in the input field, and the scroll position on the results page should be preserved.

## 3. Visual Grammar

- **Highlighting:** Use a subtle background highlight (e.g., light yellow or bold weight) for the query match within the results.
- **Scent of Information:** Use "Snippetting" (showing the 10-15 words surrounding the match) rather than just the beginning of the text.
- **Iconography:** Use the magnifying glass icon consistently. Avoid using it for other discovery tools like "Explore" or "Browse" to prevent confusion.

## 4. Mobile Ergonomics

- **Touch Targets:** The "X" to clear the search and the "Cancel" button must be at least 44x44px.
- **Input Type:** Use `<input type="search">`. This triggers the "Search" or "Go" button on mobile keyboards instead of a standard "Return."
- **Focus Management:** Do not auto-focus the search input on page load (this is disruptive for screen readers), but DO auto-focus it once the user has explicitly tapped a "Search" button or icon.

## 5. Performance Targets

- **First Result (Autocomplete):** < 200ms (feels "instant").
- **Full Results Page:** < 600ms (feels "fast").
- **Visual Stability:** Ensure the search bar doesn't shift the layout when the dropdown opens (use absolute positioning for the dropdown).
