# View Transitions API References

## Official Documentation

- **MDN Web Docs: View Transitions API**
  https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API
- **Chrome for Developers: Smooth and simple transitions**
  https://developer.chrome.com/docs/web-platform/view-transitions/
- **W3C Specification (Draft)**
  https://drafts.csswg.org/css-view-transitions-1/

## Browser Support

As of late 2024:
- **Chrome / Edge / Opera:** Full support for same-document and cross-document (v111+).
- **Safari:** Support for same-document transitions (v18+).
- **Firefox:** Development in progress; currently behind a flag in some versions.

*Always use feature detection and provide fallbacks for production environments.*

## Best Practices

- **Accessibility first:** Always respect `prefers-reduced-motion`.
- **Keep it fast:** Ideal transition durations for UI state changes are between 150ms and 300ms.
- **Unique names:** Ensure `view-transition-name` is unique on the page. If you have a list, only apply the name to the active/clicked item during the transition.
- **Fallbacks:** The API is designed for progressive enhancement. Your site should remain fully functional if `startViewTransition` is missing.
