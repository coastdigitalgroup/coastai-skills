---
name: navigation-api-management
description: Manage client-side routing, navigation interception, history entries, form submission handling, and scroll restoration using the W3C Navigation API (window.navigation) with graceful fallback strategies.
---

# Navigation API Management

## Purpose
The Navigation API Management skill provides an enterprise engineering methodology and implementation architecture for modern web applications using the W3C Navigation API (`window.navigation`). It replaces fragile, legacy `history.pushState` hacks and custom click-intercept event listeners with a unified, browser-native event-driven system for handling client-side routing, navigation guards, history stack traversal, form submission interception, and scroll/focus synchronization.

## Use cases
Apply this skill when:
- **Building Single Page Applications (SPAs) or progressive web apps** requiring smooth, client-side route updates without full-page document reloads.
- **Implementing navigation guards and unsaved-change confirmation flows** (e.g., blocking navigation away from an active form with uncommitted changes unless confirmed by the user).
- **Synchronizing async page transitions** with View Transitions API or animated page skeleton loading while maintaining precise browser history and URL parity.
- **Managing complex history stack state** using `navigation.entries()`, `navigation.currentEntry`, and inspecting state payloads associated with past or future entries.
- **Intercepting same-origin HTML form GET/POST submissions** to deliver seamless client-side processing while retaining standard form accessibility and fallback behavior.
- **Controlling scroll and focus behavior during page transitions**, ensuring WCAG AA compliance by auto-focusing page headings and maintaining proper scroll position restoration (`scroll: 'manual'` vs `'auto'`).

## When NOT to use
Do not use this skill when:
- **Building Multi-Page Applications (MPAs) without client-side transitions** where standard browser page loads, server HTML delivery, and native document reloads are intended.
- **Targeting legacy browsers exclusively** without progressive enhancement capability. For legacy environments, use `focus-management-client-side-navigation` or classic History API routing until progressive enhancement wrappers are applied.
- **Handling internal modal overlays, tabs, or accordion expansions** that do not alter the browser URL or construct independent history entries.
- **Managing external cross-origin links** where browser security models prohibit client-side navigation interception.

## Inputs
To implement Navigation API management, provide:
1. **Route Mapping Configuration:** URL pattern definitions or regex matchers mapping paths (e.g., `/products/:id`, `/dashboard`) to async page views or component renderers.
2. **Navigation Interception Requirements:** Policies defining which links/forms should be intercepted client-side versus allowed to perform native full-page browser navigation.
3. **Transition Lifecycle Handlers:** Async handlers responsible for fetching dynamic data, updating the DOM, triggering view transitions, and updating accessibility focus/announcements.
4. **State Guard Rules:** Conditionals or callbacks that determine if navigation can proceed or if user confirmation is required before discarding state.
5. **Scroll & Focus Preferences:** Specific scroll restoration settings (`scroll: 'auto'` | `'manual'`) and target focus containers (e.g., `#main-content h1`).

## Outputs
This skill produces:
1. **Unified Navigation Listener:** A centralized event listener registered on `navigation.addEventListener('navigate', handler)` that handles link clicks, form submissions, browser back/forward buttons, and programmatic API calls (`navigation.navigate()`).
2. **Navigation Router Controller:** A robust, signal-aware class managing active routing transitions, route cancellation via `AbortSignal`, and fallback execution for non-supporting browsers (`history.pushState` / `popstate`).
3. **Accessibility Synchronization:** Automatic focus management, `aria-live` route change announcements, and scroll restoration logic.
4. **Audit & Testing Suite:** Verification checklist for intercept rules, error boundary handling, and cross-browser degradation.

## Workflow

### Step 1: Feature Detection and Fallback Initialization
Verify native support for `window.navigation`. If unsupported, initialize a fallback wrapper using `history.pushState`, `popstate`, and progressive click Delegation for `<a>` tags.

```javascript
if ('navigation' in window) {
  navigation.addEventListener('navigate', (navigateEvent) => {
    // Native Navigation API handling
  });
} else {
  // Legacy History API fallback strategy
}
```

### Step 2: Evaluating Navigation Eligibility (`canIntercept`)
Inside the `navigate` event listener, evaluate whether the navigation can and should be intercepted:
- Verify `navigateEvent.canIntercept` is `true`.
- Check `navigateEvent.hashChange` to bypass pure anchor hash scrolls if handled by CSS smooth scrolling.
- Check `navigateEvent.downloadRequest` to bypass file download links.
- Check `navigateEvent.formData` if form submissions require special handling or bypass.
- Verify origin is same-origin.

```javascript
navigation.addEventListener('navigate', (event) => {
  if (!event.canIntercept || event.hashChange || event.downloadRequest) {
    return; // Allow native browser navigation
  }

  const url = new URL(event.destination.url);
  if (url.origin !== location.origin) {
    return;
  }

  // Intercept navigation
});
```

### Step 3: Enforcing Navigation Guards (Unsaved Changes)
Check for pending unsaved user state before intercepting or allowing the navigation:
- If unsaved changes exist and `event.userInitiated` is true, prompt the user (e.g., via a custom modal dialog or standard prompt).
- If the user cancels, invoke `event.preventDefault()`.

```javascript
if (hasUnsavedChanges() && !confirm('You have unsaved changes. Discard and navigate away?')) {
  event.preventDefault();
  return;
}
```

### Step 4: Intercepting and Executing Async Route Transition
Call `event.intercept()` and supply an async `handler()` function:
- Use `event.signal` to handle navigation aborts (e.g., if the user rapidly clicks another link while a route fetch is pending).
- Fetch data and update the DOM inside the handler.
- Optionally integrate with `document.startViewTransition()` for smooth visual animations.

```javascript
event.intercept({
  scroll: 'manual', // Control scroll timing manually
  async handler() {
    const signal = event.signal;

    // Perform async view update
    await loadAndRenderPage(url, { signal });

    // Restore scroll position or scroll to top
    if (event.navigationType === 'push' || event.navigationType === 'replace') {
      window.scrollTo(0, 0);
    } else {
      // Restore saved scroll position for back/forward ('traverse')
    }

    // Set focus to primary heading for screen reader navigation
    const heading = document.querySelector('main h1, [autofocus]');
    if (heading) {
      heading.tabIndex = -1;
      heading.focus();
    }
  }
});
```

### Step 5: Handling History Entries and Custom State
Utilize `navigation.currentEntry` and `navigation.entries()` to retrieve metadata or attach custom serializable state:
```javascript
// Navigating programmatically with state
await navigation.navigate('/dashboard', {
  state: { referrerModule: 'onboarding', timestamp: Date.now() },
  history: 'auto' // 'auto' | 'push' | 'replace'
}).finished;

// Reading entry state
const current = navigation.currentEntry;
console.log('Current URL:', current.url, 'State:', current.getState());
```

## Decision Rules

```text
                                [Navigation Event Triggered]
                                             │
                                  Is `canIntercept` true?
                                    ├── No ──> [Allow Native Browser Navigation]
                                    └── Yes
                                             │
                       Is `hashChange` or `downloadRequest` true?
                                    ├── Yes ──> [Allow Native Browser Navigation]
                                    └── No
                                             │
                                 Are Unsaved Changes Present?
                                    ├── Yes ──> Prompt User
                                    │             ├── User Cancels ──> `event.preventDefault()`
                                    │             └── User Confirms ──> Proceed
                                    └── No
                                             │
                                Is Navigation API Supported?
                                    ├── Yes ──> Use `navigateEvent.intercept({ handler })`
                                    └── No ──> Fallback to `history.pushState` + Custom Event
```

## Constraints
1. **Browser Support:** Native W3C Navigation API is fully supported in Chromium browsers (Chrome, Edge, Opera, Brave v102+). WebKit (Safari) and Gecko (Firefox) require progressive enhancement with `history.pushState` fallback.
2. **Same-Origin Policy:** `intercept()` can only be called on same-origin destinations. Cross-origin navigations cannot be intercepted.
3. **Synchronous Interception Requirement:** `navigateEvent.intercept()` **must** be called synchronously within the `navigate` event listener tick. Async calls after an `await` will fail.
4. **Accessibility (WCAG 2.1 AA):** Every client-side navigation must:
   - Move focus to a logical target (`<h1>` or `<main>`).
   - Announce page load completion via an `aria-live` polite region.
   - Update `document.title` to reflect the new page context.
5. **Memory Management:** Ensure abort signals (`event.signal`) cancel ongoing `fetch()` requests and event listeners when a navigation is aborted mid-flight.

## Non-goals
- Replacing backend routing or SSR (Server-Side Rendering) infrastructure.
- Handling full-page cross-origin site redirects.
- Managing low-level network protocol sockets (WebSocket / WebRTC).
- Implementing complete UI layout component frameworks.

## Common Failure Patterns

| Failure Pattern | Root Cause | Solution |
| :--- | :--- | :--- |
| `TypeError: Cannot call intercept after event dispatch` | Attempting to call `event.intercept()` after an `await` statement or inside an async callback. | Ensure `event.intercept()` is called synchronously in the top-level `navigate` listener. Place async logic inside the `handler` function passed to `intercept()`. |
| Unhandled aborted fetch errors | Rapid navigation clicks cause `event.signal` to abort the pending fetch, throwing `AbortError` into the console. | Catch `AbortError` in route fetch handlers and suppress error logs when `signal.aborted` is `true`. |
| Focus loss / "Silent Navigation" | Client-side DOM update replaces content, but focus remains trapped on a deleted node or falls back to `<body>`. | Explicitly shift focus to the new page heading (`<h1>`) or container with `tabindex="-1"` and `.focus()`. |
| Broken back/forward scroll restoration | Leaving `scroll: 'auto'` while performing asynchronous component rendering causes the browser to attempt scroll restoration before DOM elements exist. | Set `scroll: 'manual'` in `event.intercept()`, wait for DOM render completion, and manually adjust scroll position. |
| Incomplete legacy fallback | Relying solely on `navigation.addEventListener` without fallback leads to broken link clicks on Safari and Firefox. | Wrap router logic in a unified controller that feature-detects `navigation` and falls back to `pushState` and click delegation. |

## Validation Steps
Verify your Navigation API management implementation with these checks:
1. **Feature Detection Test:** Load the application in non-Chromium browsers (Firefox/Safari). Confirm that link clicks update the URL and page view seamlessly via the `pushState` fallback without errors.
2. **Navigation Interception Test:** Click client-side links and verify `navigateEvent.intercept()` triggers. Confirm network tab shows no full document reload (`document` type request).
3. **Cancellation & Abort Test:** Initiate a slow network navigation and immediately click another link. Verify the first fetch is aborted via `event.signal` and no race conditions corrupt the DOM.
4. **Unsaved Changes Guard Test:** Modify a form field and attempt to navigate away. Confirm the guard modal/prompt prevents navigation if cancelled.
5. **Accessibility & Focus Test:** Use a keyboard (`Tab` + `Enter`) or screen reader to navigate between routes. Verify focus lands on the target heading (`<h1>`) and `document.title` updates dynamically.
6. **Scroll Restoration Test:** Scroll down a long page, navigate away, and press browser Back button (`traverse`). Verify scroll position is accurately restored.
