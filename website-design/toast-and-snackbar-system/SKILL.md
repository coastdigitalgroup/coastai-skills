---
name: toast-and-snackbar-system
description:
  Design a systematic framework for transient, non-disruptive feedback (toasts and snackbars)
  that communicates action outcomes and system statuses without blocking the user journey.
---

# Toast and Snackbar System

## Purpose

The Toast and Snackbar System provides a methodology for designing temporary, non-disruptive notification layers. These are brief, self-dismissing or manually dismissible UI components that sit in a dedicated screen layer above the primary interface. Unlike modal overlays, they do not hijack focus or halt the user's flow; instead, they serve as a passive, high-visibility "acknowledgment loop" confirming that a background or immediate task has succeeded, failed, or requires minor attention. This system ensures that toasts are visually unified, positioned to prevent blocking vital controls, and fully accessible to mouse, touch, and assistive technology users.

## Use Cases

- **Asynchronous Actions:** Confirming that a file has uploaded, a draft has been saved, or a record has been deleted in the background.
- **Micro-Commitment Confirmation:** Acknowledging actions like adding a product to a cart, copying a link to the clipboard, or toggling a localized system preference.
- **Reversible Destructive Operations:** Notifying a user that an item was archived or deleted, paired with an immediate "Undo" action inside the snackbar.
- **Transient Status Updates:** Displaying brief, automated system alerts, such as transitioning to an "Offline" or "Online" state.

## When NOT to Use

- **High-Gravity System Blocks:** If a critical error requires immediate intervention or blocks the user from proceeding (e.g., expired session, payment failure); use `overlay-and-dialog-system` (Modal).
- **Persistent Section Warnings:** If a warning or error specifically relates to an entire section, page, or form context and needs to remain visible until resolved; use `banner-and-alert-system` (Inline Alert).
- **Form Validation Messages:** If a user makes an error within a specific input field; use `form-design-system` (field-level validation).
- **Primary Content Discovery:** Never use toasts to present primary content, marketing announcements, or navigation options.

## Inputs

1. **Message Gravity / Type:** Success (confirmation), Information (neutral updates), Warning (non-blocking concern), or Error (operation failure).
2. **Action Requirements:** Is the feedback passive (read-only) or does it include a single micro-action (e.g., "Undo", "View", "Retry")?
3. **Screen Real Estate & Device Class:** Target viewports (desktop, tablet, mobile) and prevailing input methods (mouse hover vs. thumb reach).
4. **Z-Index and Layering Strategy:** Stacking context rules to prevent overlapping header navigation, sticky footers, or active overlays.

## Outputs

1. **Anatomy Specification:** Grid-based blueprint of the container, icon slot, message string, action CTA, and manual close button.
2. **Spatial Alignment & Placement Rules:** Adaptive coordinates for desktop (e.g., top-right or bottom-right stack) and mobile (e.g., bottom full-width slide-up).
3. **Queue and Stacking Logic:** System rules for handling simultaneous alerts, maximum visible limits, and expiration sequencing.
4. **Interactive Timeline & Expiration Spec:** Rules governing self-dismissal timeouts, hover-to-pause behaviors, and swipe gestures.
5. **Accessibility / ARIA Blueprint:** Semantic mapping of live regions, focus handling for interactive toasts, and screen reader announcements.

## Workflow

### 1. Structure the Component Anatomy

Define a precise spacing and layout grid for the toast container using standard spatial tokens:
- **Icon Slot:** Fixed width (e.g., 20px or 24px) positioned on the far left. Use semantic, high-contrast status icons (checkmark for Success, exclamation-triangle for Warning/Error, info-circle for Info).
- **Text Area:** Left-aligned, wrapping typography consisting of a brief title (bold, optional) and a description. Never let text truncate with ellipses; wrap it up to a maximum of 3 lines.
- **Action Slot (Optional):** A single, highly visible text button (e.g., "Undo") placed to the right of the message. For long text on mobile, wrap the action to a new line aligned to the right.
- **Dismiss Trigger:** A clear 'X' close button placed on the far right. Must have a minimum 24x24px hit area (44x44px preferred for touch targets).

### 2. Determine Spatial Placement by Viewport

- **Desktop Placement:** Position the toast container stack in either the **Top-Right** or **Bottom-Right** corner of the screen. Keep a consistent offset of `24px` from the viewport edges.
  - *Top-Right Stack:* Best when the primary action stream occurs in the lower portions of the page.
  - *Bottom-Right Stack:* Best when top-mounted navigation or utility bars occupy the upper margin, preventing overlap.
- **Mobile Placement:** Transform the desktop stack into a bottom-anchored, full-width **Snackbar** (`12px` to `16px` margins from the left, right, and bottom edges). This keeps the interaction within the optimal "thumb reach zone."
- **Z-Index Rule:** Always assign a dedicated z-index token (e.g., `z-index: 5000` or higher) that places toasts above standard sticky headers (`z-index: 1000`) but below active fullscreen overlays (`z-index: 10000`).

### 3. Establish the Stacking and Queueing Logic

Manage high-volume trigger environments without inducing layout thrashing or cognitive overwhelm:
- **Maximum Visible Limit:** Limit the active queue to a maximum of **3 visible toasts** stacked vertically.
- **Stacking Direction:**
  - If placed at the *top* of the screen, new toasts slide in from the top, pushing older toasts downward.
  - If placed at the *bottom* of the screen, new toasts slide up from the bottom, pushing older toasts upward.
- **Queueing Buffer:** If a 4th toast is triggered while 3 are active, buffer the new toast in memory. Render it immediately as the oldest visible toast naturally expires and fades out.

### 4. Code the Expiration and Hover-to-Pause Timeline

Toasts must exist long enough to read but dissolve promptly to clear the screen:
- **Dynamic Time-to-Live (TTL):** Calculate expiration based on content length:
  - *Short Passive Toasts (< 40 characters):* Dismiss after **5 seconds**.
  - *Longer or Action-bearing Toasts:* Dismiss after **7 to 10 seconds** to ensure screen readers can announce them completely and users have time to read and act.
  - *Error/Failure Toasts:* Do **not** auto-dismiss. Keep them visible until the user manually clicks the 'X' button, ensuring critical feedback is not lost.
- **The "Hover-to-Pause" Interaction:**
  - If a mouse user hovers over any part of the toast queue, freeze all active TTL countdowns. Reset and resume the timers only after the mouse exits the toast boundaries.
  - If a keyboard user focuses on any element inside a toast, freeze the timer indefinitely. Resume countdowns only when focus shifts back to the main document.

### 5. Define Close & Gesture Behaviors

- **Touch Swipe:** On mobile devices, allow users to dismiss individual snackbars immediately by swiping them horizontally off the screen (left or right). Keep the drag threshold to 30% of the viewport width.
- **Animation:** Use smooth, hardware-accelerated transitions (e.g., `transform` and `opacity`) with a duration of `200ms` to `300ms` and `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo) for entry, and simple `opacity` fade-out for exit.

---

## Decision Rules

### Stacking Alignment Matrix
| Viewport | Primary Navigation Layout | Recommended Toast Placement | Animation Direction |
| :--- | :--- | :--- | :--- |
| **Desktop** | Left Sidebar / Dashboard | **Bottom-Right** (keeps main work clear) | Slide left from offscreen |
| **Desktop** | Sticky Top Header | **Bottom-Right** (prevents nav occlusion) | Slide left or up |
| **Desktop** | Minimalist / Footer-heavy | **Top-Right** | Slide left or down |
| **Mobile** | Any | **Bottom Centered / Full-Width** | Slide up from bottom edge |

### Expiration Logic Matrix
| Toast Gravity / Type | Contains Action Button? | Recommended Expiration | Dismissal Type |
| :--- | :--- | :--- | :--- |
| **Success / Info** | No | 5 seconds (Fixed) | Auto-dismiss + Manual close |
| **Success / Info** | Yes ("Undo" / "View") | 8 - 10 seconds | Auto-dismiss + Manual close |
| **Warning** | No | 7 seconds | Auto-dismiss + Manual close |
| **Error / Failure** | Yes or No | Infinite (Remains persistent) | Manual close **ONLY** |

---

## Constraints

- **Accessibility (WCAG 2.2 Compliance):**
  - **ARIA Live Regions:** Map passive toasts to `role="status"` (which defaults to `aria-live="polite"` and `aria-atomic="true"`). Avoid using `role="alert"` (assertive) unless communicating system failure (e.g., "Internet connection lost"), as assertive alerts immediately interrupt screen readers mid-sentence.
  - **Keyboard Wayfinding (WCAG 2.2 SC 2.1.1):** When a toast contains an interactive action (e.g., "Undo" or "View"), it must be keyboard-accessible. Since keyboard tab-loops can be slow, provide a global bypass shortcut (e.g., `Escape` closes the active toast, or `F6` shifts focus directly to the toast queue container) or place the toast container closely after the active trigger in the DOM tab order.
  - **No Focus Traps:** Never trap keyboard focus within a toast queue. The user must be able to freely Tab out of the toast back to the page content.
- **Contrast (WCAG 2.2 SC 1.4.3):**
  - All text, status icons, and buttons must meet contrast minimums against the toast background:
    - Normal text: **4.5:1** minimum contrast.
    - Icons and active control borders: **3:1** minimum contrast.
- **Responsiveness:**
  - On viewports `< 600px`, the toast container must span full-width (`width: calc(100% - 32px)`) with centered horizontal alignment to prevent awkward margin columns.

---

## Common Failure Patterns

- **The "Occluded Action" Trap:** Placing the desktop toast queue directly over top of high-frequency interactive elements, such as the shopping cart header button or a table-filtering dropdown, causing users to misclick.
- **The "Now You See It, Now You Don't" Flash:** Auto-dismissing a complex, multi-word error or warning within 2-3 seconds. This violates basic accessibility reading thresholds and panics users who missed the context.
- **Screen Reader Silence:** Adding toasts dynamically to the DOM without an ARIA live-region wrapper, rendering them completely invisible to visually impaired users.
- **Layout Shift Thrashing:** Animating the height of the toast queue abruptly on entry, causing the main page content to shift up and down.
- **Hover/Focus Expiry Ignorance:** Letting a toast self-dismiss while a user is hover-reading a dense text message or hovering over an "Undo" CTA, causing them to click "dead air" and trigger unwanted actions.

---

## Validation Criteria

- [ ] Toasts are styled with distinct, high-contrast semantic indicators (color + unique icon).
- [ ] On desktop, toasts do not overlap primary navigation elements or global action zones.
- [ ] On mobile, toasts transform into bottom-anchored, full-width components easily reachable by the thumb.
- [ ] Active timers pause instantly when hovered over by a mouse or focused via keyboard.
- [ ] Action-bearing toasts remain visible for a minimum of 8–10 seconds; error toasts never auto-dismiss.
- [ ] Semantic screen reader markup (`role="status"` or `role="alert"`) is correctly specified.
- [ ] Keyboard users can navigate to and trigger toast action buttons without focus trap barriers.
- [ ] All interactive elements (close button, CTAs) meet the WCAG 2.2 24x24px minimum touch target (44x44px preferred).
