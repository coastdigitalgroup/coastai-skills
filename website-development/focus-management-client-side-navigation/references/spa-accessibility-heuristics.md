# SPA Accessibility Heuristics

Handling client-side navigation requires understanding how different screen readers interact with dynamic DOM changes.

## 1. Browser & Screen Reader Behaviors

| Screen Reader | Behavior on Standard Navigation (MPA) | Behavior on SPA Navigation (Default) |
|---------------|---------------------------------------|--------------------------------------|
| **NVDA / JAWS** | Announces page title and starts reading from the top. | Remains silent unless focus is moved or a live region is updated. |
| **VoiceOver (iOS)** | Announces new page title and moves focus to the header. | Often stays focused on the "point of click," which may now be empty or at the bottom of the page. |
| **VoiceOver (macOS)** | Announces page title. | May announce "Web content loaded" but won't specify *what* changed without an announcer. |

## 2. The "Point of Click" Problem

When a user clicks a link that is then removed from the DOM (common in SPAs), the browser's focus becomes "homeless."
- **Chrome/Edge:** Usually resets focus to the `<body>` element.
- **Safari:** Can lose focus entirely, requiring the user to navigate from the start of the document.
- **Firefox:** Tries to find the nearest parent, which might be the main navigation, causing the user to repeat the navigation process.

**Solution:** Always move focus programmatically to a known, stable element in the new view (the `<h1>`).

## 3. Why `tabindex="-1"`?

Most elements (like `<h1>`, `<div>`, `<main>`) are not natively focusable.
- `tabindex="0"` adds an element to the sequential tab order (bad for headings).
- `tabindex="-1"` allows the element to be focused via JavaScript (`element.focus()`) but keeps it out of the user's `Tab` key sequence.

## 4. Skip Links in SPAs

In many SPAs, "Skip to Content" links break after the first use. If the skip link points to `#main`, and the user is already on a page where the URL contains `#main`, clicking it again might do nothing.

**Heuristic:** Ensure your router or focus manager resets the "Skip to Content" link's target or manually triggers the focus move if the user clicks it.

## 5. Announcement Timing

If you update the `aria-live` region and move focus to an element containing the *same text* (e.g., the page title), some screen readers may only announce it once, while others may announce it twice.

**Recommendation:** The `aria-live` announcement should include a verb like "Navigated to..." or "Loading..." to provide distinct context from the heading itself.
