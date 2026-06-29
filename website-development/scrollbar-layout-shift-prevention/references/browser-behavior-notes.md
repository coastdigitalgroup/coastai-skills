# Browser and OS Scrollbar Behavior

Understanding how different environments handle scrollbars is critical for
preventing layout shifts.

## Classic vs. Overlay Scrollbars

### Classic Scrollbars (Windows, Linux, macOS with Mouse)
- **Behavior:** The scrollbar occupies physical space within the window.
- **Impact:** When a scrollbar appears, the available "client width" for content
  shrinks (typically by 12px–17px). This causes text to re-wrap and elements
  to shift left.
- **Mitigation:** Requires `scrollbar-gutter` or manual padding compensation.

### Overlay Scrollbars (iOS, Android, macOS with Trackpad)
- **Behavior:** The scrollbar floats on top of the content and only appears
  during active scrolling. It has a width of `0` in terms of layout impact.
- **Impact:** Content does not shift when these scrollbars appear or disappear.
- **Mitigation:** Unnecessary to apply padding. Manual application of "estimated"
  scrollbar width (e.g., hardcoded 15px) will create an ugly, asymmetrical gap.

## Detecting Scrollbar Type

You can detect if a user has a space-consuming scrollbar by comparing
`window.innerWidth` and `document.documentElement.clientWidth`.

```javascript
const hasClassicScrollbar = window.innerWidth > document.documentElement.clientWidth;
```

## CSS `scrollbar-gutter` Support

- **Chromium (Chrome/Edge):** Supported since v94.
- **Firefox:** Supported since v97.
- **Safari:** Supported since v16.

For older versions of Safari (pre-2022), the JavaScript-based compensation
provided in the `templates/` directory is the most reliable fallback.

## Impact on Cumulative Layout Shift (CLS)

Layout shifts caused by scrollbars appearing during page load (as content
renders) or during interaction (modals) contribute to a site's CLS score. While
often small, these shifts can be the difference between a "Good" and "Needs
Improvement" rating in Core Web Vitals, especially if they trigger larger
re-flows of text or images.
