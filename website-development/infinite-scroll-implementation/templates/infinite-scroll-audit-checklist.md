# Infinite Scroll Audit Checklist

Use this checklist to audit existing progressive loading implementations for performance, accessibility, and UX flaws.

## 1. Technical Performance
- [ ] **Intersection Observer:** Is the loader using `IntersectionObserver` instead of `window.onscroll`?
- [ ] **Sentinel Logic:** Is there a dedicated sentinel element (or the last item) being observed?
- [ ] **Request Debouncing:** Is there a flag (e.g., `isLoading`) to prevent multiple simultaneous requests for the same page?
- [ ] **Batch Appending:** Are items appended using a `DocumentFragment` or in a single batch to minimize reflows?
- [ ] **Memory Management:** Are observers disconnected when no more items exist or when the component unmounts?

## 2. Accessibility (A11y)
- [ ] **Announcement:** Does a screen reader-only region (`aria-live="polite"`) notify the user when new content is loading and when it has been added?
- [ ] **Unreachable Footer:** If the page has an important footer, is a "Load More" button or a hybrid pattern used to allow the user to reach it?
- [ ] **Focus Management:** If a "Load More" button is used, does the focus remain in a logical place after the new items appear?
- [ ] **Keyboard Navigation:** Can a keyboard-only user trigger the loading and navigate through the new items without getting "stuck"?

## 3. User Experience (UX)
- [ ] **Loading Indicators:** Is there clear visual feedback (spinner, skeleton, or progress bar) while fetching?
- [ ] **End of Data:** Is there a clear message when the user reaches the end of the collection?
- [ ] **Error Handling:** Is there a visible error state with a "Retry" option if the fetch fails?
- [ ] **Scroll Restoration:** If the user navigates away and clicks "Back", do they return to their previous scroll position with the items still loaded?
- [ ] **Fetch Threshold:** Is `rootMargin` used to start loading content *before* the user hits the absolute bottom?

## 4. SEO & Shareability
- [ ] **Initial Payload:** Is the first "page" of content rendered in the initial HTML (SSR)?
- [ ] **URL Sync:** Does the URL update (e.g., via History API) to reflect the current page or state for bookmarking?
