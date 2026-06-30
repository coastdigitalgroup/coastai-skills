# Implementation Example: Accessible SPA Navigation

This example demonstrates how to transform a "silent" client-side transition into an accessible one using a vanilla JavaScript router pattern.

## Before: Silent Navigation (Inaccessible)

In this version, the content swaps, but the browser remains silent, and focus is either lost or stuck on the clicked element.

```javascript
// Simple router logic
function navigate(route) {
  const content = document.getElementById('app');

  // Swap content
  if (route === '/about') {
    content.innerHTML = '<h1>About Us</h1><p>Welcome to the about page.</p>';
  }

  // PROBLEM 1: document.title is not updated.
  // PROBLEM 2: Screen reader doesn't announce the change.
  // PROBLEM 3: Focus remains on the <a> tag that was clicked.
  // PROBLEM 4: Scroll position stays where the user was on the previous page.
}
```

## After: Accessible Navigation (Recommended)

This version ensures the title is updated, the change is announced, focus is reset, and the viewport is scrolled to the top.

```javascript
// 1. Create a reusable focus utility
function resetFocus(targetElement) {
  if (!targetElement) return;

  // Ensure the element can receive programmatic focus
  targetElement.setAttribute('tabindex', '-1');

  // Remove the focus ring style if it's not a naturally focusable element
  // (Optional: handle this in CSS instead)
  targetElement.style.outline = 'none';

  targetElement.focus();
}

// 2. Create an announcement utility
function announceRoute(pageTitle) {
  const announcer = document.getElementById('route-announcer');
  if (announcer) {
    announcer.textContent = `Navigated to ${pageTitle}`;
  }
}

// 3. Updated router logic
function navigateAccessible(route) {
  const content = document.getElementById('app');
  let pageTitle = '';
  let htmlContent = '';

  if (route === '/about') {
    pageTitle = 'About Us';
    htmlContent = '<h1 id="page-title">About Us</h1><p>Welcome to the about page.</p>';
  }

  // A. Update Title
  document.title = `${pageTitle} | My SPA Site`;

  // B. Swap Content
  content.innerHTML = htmlContent;

  // C. Reset Viewport
  window.scrollTo(0, 0);

  // D. Announce and Focus
  // Use requestAnimationFrame to ensure the DOM has rendered
  requestAnimationFrame(() => {
    announceRoute(pageTitle);

    const h1 = document.getElementById('page-title');
    resetFocus(h1);
  });
}
```

### CSS Requirements

To prevent unsightly focus rings on non-interactive headers while maintaining accessibility:

```css
/* Only show focus rings for keyboard users on actual interactive elements */
h1:focus {
  outline: none;
}

/* Ensure the announcer is hidden from sighted users but readable by screen readers */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```
