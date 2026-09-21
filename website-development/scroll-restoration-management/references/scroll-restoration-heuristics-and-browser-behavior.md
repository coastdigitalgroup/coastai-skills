# Scroll Restoration Heuristics & Browser Behavior Reference

## 1. W3C `history.scrollRestoration` Specification

The `History` interface property `scrollRestoration` allows web applications to explicitly set default scroll restoration behavior on history navigation.

```javascript
// Check browser feature support
if ('scrollRestoration' in window.history) {
  // Options: 'auto' (default browser handling) | 'manual' (application handles scrolling)
  window.history.scrollRestoration = 'manual';
}
```

### Modes
- **`auto` (Default):** The browser user agent attempts to restore scroll position when navigating back or forward through history.
- **`manual`:** The browser user agent does NOT restore scroll position on history traversal. The application is entirely responsible for setting scroll positions.

---

## 2. Anatomy of the Scroll Clamping Bug in SPAs

### What Happens with `auto` in Dynamic Applications
1. User is on dynamic Product List Page (PLP) at `Y = 1800px`.
2. User clicks a product card, navigating to Product Detail Page (PDP).
3. User clicks browser "Back" button.
4. Browser fires `popstate` event immediately and attempts native scroll restoration to `1800px`.
5. **The Timing Defect:** At the moment `popstate` fires in a client-side SPA, the framework has unmounted the PDP and mounted an empty skeleton or spinner container for the PLP. The document height is currently `400px`.
6. **The Clamping Action:** `window.scrollTo(0, 1800)` cannot scroll past `scrollHeight - innerHeight` (400px). The browser clamps the scroll coordinate to `400px` and considers restoration complete.
7. 300ms later, the API request finishes and 50 product cards render, expanding document height to `3000px`. However, the browser's scroll restoration pass has already completed, leaving the user trapped at `400px` near the top of the page.

---

## 3. Sub-Container Scroll Limitations

Native browser scroll restoration ONLY tracks the top-level document window (`window.scrollX` and `window.scrollY`). It completely ignores overflow scroll containers:

```html
<!-- Native browser restoration ignores this container's scrollTop! -->
<div class="filter-sidebar" style="overflow-y: auto; height: 100vh;">
  ...
</div>
```

### Mitigation Strategy
Mark all scrollable sub-containers with a declarative data attribute:
```html
<aside data-scroll-container data-scroll-id="plp-filter-sidebar" style="overflow-y: auto;">
  ...
</aside>
```
The `ScrollRestorationManager` captures `element.scrollTop` and `element.scrollLeft` prior to navigation and re-applies them during state restoration.

---

## 4. Mobile Viewport Quirks

### iOS Safari Dynamic Address Bar
- On iOS Safari, scrolling down shrinks the dynamic address bar, increasing `window.innerHeight`.
- Scrolling up expands the address bar, decreasing `window.innerHeight`.
- Restoring scroll positions near the bottom of a page can cause minor 40px-60px visual shifts if the address bar state changes between routes.
- **Rule:** Use `document.documentElement.scrollHeight - window.innerHeight` dynamically when checking target height boundaries.

### Android Chrome Soft Keyboard
- If an input element on a form route is focused when the user navigates away, the visual viewport height shrinks due to the soft keyboard.
- **Rule:** Always blur active inputs (`document.activeElement?.blur()`) before executing scroll restoration routines.

---

## 5. Accessibility & Reduced Motion Guidance

- **`prefers-reduced-motion`:** Users who have enabled reduced motion settings in their operating system may experience motion sickness or vestibular disorientation from smooth scroll animations (`behavior: 'smooth'`). Always inspect `window.matchMedia('(prefers-reduced-motion: reduce)').matches` and force `behavior: 'instant'` when true.
- **Focus Alignment:** Restoring scroll position should not leave keyboard focus in an invisible or off-screen state. When restoring scroll on back-navigation, focus the main content area (`<main tabindex="-1">`) or the container element without forcing layout jumps.
