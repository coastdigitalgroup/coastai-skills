---
name: bottom-sheet-design-system
description:
  Design and structure mobile-first bottom sheets, action sheets, and modal bottom drawers
  with configurable snap detents, drag affordances, safe area padding, responsive desktop modal/popover adaptation,
  and WCAG 2.1 AA screen reader and keyboard accessibility.
---

# Bottom Sheet Design System

## Purpose

The Bottom Sheet Design System provides a mobile-first UI design and spatial framework for structuring slide-up bottom sheets, action sheets, and interactive bottom drawers. On mobile viewports, full-screen modals or desktop-style popovers disrupt reachability and context. Bottom sheets anchor content to the bottom edge of the screen—within easy thumb reach—allowing users to complete quick actions, filter lists, view product details, or select options without losing sight of the parent page.

Designing a robust bottom sheet system requires establishing precise snap detent heights (collapsed, expanded, full-height), managing drag handle affordances and touch gestures, handling mobile safe-area insets (`env(safe-area-inset-bottom)`), preventing body background scroll leaks, and gracefully adapting to centered modal dialogs or side popovers on desktop viewports under WCAG 2.1 AA accessibility guidelines.

## Use Cases

- **Mobile E-Commerce Filtering & Sorting:** Presenting multi-attribute product filters, category taxonomy selectors, or sorting options in a slide-up drawer without taking shoppers away from the product listing grid.
- **Action Sheets & Contextual Menus:** Offering secondary actions (Share, Save to Wishlist, Duplicate, Export, Delete) triggered by list item overflow triggers or primary action buttons.
- **Mobile Quick Checkout & Cart Drawers:** Displaying order summaries, promo code inputs, and quick payment options anchored to the bottom of the screen.
- **Location & Map Detail Views:** Providing collapsible location cards, store hours, and driving directions over an interactive map interface using multi-stage detents (peek, partial, expanded).
- **Mobile Form Step Completion:** Presenting short single-task inputs (date pickers, single-select dropdown replacements, address confirmation) in an overlay focused on high completion speed.

## When NOT to Use

- **Full Desktop SaaS Dashboards:** On desktop screens (`≥1024px`), rendering wide horizontal bottom sheets causes awkward visual proportion. Adapt bottom sheets to centered modal dialogs (`overlay-and-dialog-system`), side drawers (`sidebar-navigation-system`), or popovers (`tooltip-and-hint-system`).
- **Heavy Multi-Step Workflows:** Complex multi-page forms requiring extensive data entry, file attachments, and lengthy tabular data should use `master-detail-layout-system` or dedicated full-page wizard flows (`step-progress-system`).
- **Transient Passive Alerts:** For non-blocking status notifications or brief confirmation toasts, use `toast-and-snackbar-system` or `banner-and-alert-system`.
- **Primary Page Navigation:** Persistent app section navigation belongs in `bottom-navigation-system` or `site-navigation-system`, not inside transient overlay bottom sheets.

## Inputs

1. **Sheet Variant & Content Hierarchy:** Selecting the bottom sheet type:
   - *Action Sheet:* Short list of 2–6 action triggers.
   - *Non-Modal Peek Sheet:* Persistent expandable bottom card (e.g., map details, audio player).
   - *Modal Bottom Drawer:* Overlay surface covering 50%–90% viewport height with dimming backdrop.
2. **Snap Detent Configuration:** Defining allowed snap states:
   - *Peek Detent (15%–25% height):* Shows persistent header/summary while preserving main viewport view.
   - *Partial Detent (50%–60% height):* Ideal for action lists, short forms, or filter selections.
   - *Full Detent (90%–95% height):* Expands to near full-screen for scrollable lists or detailed forms while retaining the top dismiss boundary.
3. **Desktop Adaptation Strategy:** Defining breakpoint conversion behavior at `768px` or `1024px`:
   - Convert to centered Modal Dialog (`max-width: 560px`).
   - Convert to Side Slide-Over Drawer (`width: 400px` on right edge).
   - Convert to Anchored Popover (adjacent to trigger button).
4. **Theme & Surface Elevation Tokens:** Background surface color, backdrop dimming token (`rgba(0,0,0,0.5)`), border radius (`16px 16px 0 0` on mobile), and drop shadow tokens from `elevation-and-depth-system` and `accessible-color-system`.

## Outputs

1. **Spatial & Detent Geometry Specification:** CSS height rules, CSS variables (`--sheet-height`, `--sheet-detent`), border-radius curves, and drag handle sizing (`36px x 4px`).
2. **Safe-Area & Layout Containment Structure:** CSS padding tokens utilizing `env(safe-area-inset-bottom)` and `clamp()` to guarantee tap target clearance above iOS home indicators and virtual keyboards.
3. **Responsive Desktop Adaptation Rules:** Media query spec transitioning bottom sheets into centered modal dialogs or side popovers on larger viewports.
4. **Accessible ARIA & Focus Blueprint:** ARIA dialog attributes (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`, `aria-describedby`), focus trap rules, initial focus targeting, and keyboard escape key handling.

---

## Workflow

### 1. Establish Spatial Containment & Detent Heights
Construct the container hierarchy for the bottom sheet surface:
- **Backdrop Overlay:** Set fixed backdrop layer (`position: fixed; inset: 0; background: rgba(0, 0, 0, 0.5); z-index: 1000; opacity: 0; transition: opacity 250ms ease;`).
- **Sheet Surface Position:** Position sheet container anchored to bottom (`position: fixed; bottom: 0; left: 0; right: 0; z-index: 1001; transform: translateY(100%); transition: transform 300ms cubic-bezier(0.32, 0.72, 0, 1);`).
- **Mobile Shape & Radius:** Apply distinct top corner rounding (`border-radius: 16px 16px 0 0; background: var(--surface-elevation-2); shadow: var(--shadow-elevation-high);`).
- **Detent Height Bounds:**
  - *Partial Height:* `max-height: 60vh; height: auto;`
  - *Full Height:* `max-height: 90vh; height: 90vh;`
  - *Dynamic Height:* `max-height: calc(100vh - 3rem); height: fit-content;`

### 2. Design Drag Affordance & Header Region
Provide explicit visual and touch affordances indicating draggable interaction:
- **Drag Handle Pill:** Place centered handle pill at top of sheet header:
  - Width: `36px` to `48px`, Height: `4px` to `5px`, Border Radius: `9999px`.
  - Color: Subtle neutral contrast (`var(--text-muted)` or `var(--border-strong)` with ≥3:1 ratio against sheet background).
  - Margin: `12px auto 8px auto`.
  - Touch Target Padding: Wrap drag handle in a `min-height: 24px; width: 100%;` invisible touch region to ensure easy grab accuracy.
- **Sheet Header Bar:**
  - Header title (`h2` or `h3`, `font-size: 1.125rem`, `font-weight: 600`).
  - Close Button: Explicit icon button (`aria-label="Close sheet"`) in top-right corner with minimum `44x44px` touch target.
  - Sticky Header: Fix header to top of sheet while sheet body scrolls (`position: sticky; top: 0; z-index: 10; background: inherit;`).

### 3. Implement Scroll Management & Safe Area Insets
Prevent layout breaking, touch glitches, and hardware cut-off on mobile devices:
- **Body Scroll Locking:** When sheet opens, apply body scroll prevention (`overflow: hidden; touch-action: none;`) to parent document to prevent background double scrolling.
- **Internal Content Scrolling:** Set inner body container to scroll (`overflow-y: auto; overscroll-behavior: contain; -webkit-overflow-scrolling: touch;`).
- **Safe Area Inset Padding:** Add bottom padding to account for iOS home indicator bars:
  - `padding-bottom: calc(1.25rem + env(safe-area-inset-bottom, 20px));`
- **Visual Viewport Keyboard Adjustment:** When inputs inside the sheet gain focus, compute visual viewport offset using `window.visualViewport.height` to ensure active input remains visible above virtual soft keyboard.

### 4. Configure Responsive Desktop Adaptation
Bottom sheets look poorly proportioned on wide desktop displays. Transition sheet surface based on viewport width:
- **Breakpoint (`@media (min-width: 768px)`):**
  - Change sheet alignment from bottom-anchored full-width strip to centered modal dialog (`left: 50%; top: 50%; bottom: auto; right: auto; transform: translate(-50%, -50%); width: 100%; max-width: 540px; border-radius: 12px;`).
  - Hide mobile drag handle pill (`display: none;`).
  - Update entrance animation from `translateY(100%)` to scale/fade in (`transform: translate(-50%, -48%) scale(0.96) -> translate(-50%, -50%) scale(1)`).
- **Alternative Desktop Popover (`@media (min-width: 1024px)`):**
  - For action sheets, position surface relative to trigger button as a popover dropdown (`position: absolute; width: 320px; border-radius: 8px;`).

### 5. Enforce WCAG 2.1 AA Accessibility & Focus Management
- **ARIA Semantics:**
  - Container element: `<div role="dialog" aria-modal="true" aria-labelledby="sheet-title" aria-describedby="sheet-desc">`.
- **Keyboard Trapping & Initial Focus:**
  - On open: Move focus immediately to first interactive element (or close button) inside sheet (`element.focus()`).
  - Trap focus inside sheet using keyboard event handler trapping `Tab` and `Shift+Tab`.
- **Dismiss Triggers:**
  - Pressing `Escape` key closes bottom sheet immediately.
  - Clicking/tapping background backdrop overlay closes sheet.
  - Tapping close button or primary action completes interaction and returns focus to original trigger button.

---

## Decision Rules

### Detent Height Selection Matrix

| Sheet Variant | Primary Content Type | Recommended Height Constraint | Mobile Drag Behavior |
| :--- | :--- | :--- | :--- |
| **Action Sheet** | 2–6 Button Triggers | `height: fit-content; max-height: 50vh;` | Swipe down to dismiss |
| **Filter & Sort Drawer** | Multi-attribute controls, checkboxes | `height: 75vh; max-height: 85vh;` | Swipe down to dismiss or snap to full |
| **Map / Detail Peek Sheet** | Headline summary + detailed list | Snap states: `20vh` (Peek), `55vh` (Half), `90vh` (Full) | Drag up/down between snap detents |
| **Quick Cart / Checkout** | Order items, promo code, checkout CTA | `height: fit-content; max-height: 80vh;` | Fixed height; scroll interior content |

### Desktop Adaptation Selection Matrix

| Mobile Pattern | Desktop Viewport (`≥768px`) | Rationale |
| :--- | :--- | :--- |
| **E-Commerce Filter Sheet** | Left Sidebar Panel or Top Filter Bar | Native desktop e-commerce browsing layout |
| **Action Menu / Share Sheet** | Anchored Popover Menu beside Trigger | Preserves visual proximity on wide screens |
| **Quick Cart Overlay** | Right Side Drawer (Slide-Over) | Standard desktop cart experience |
| **Detail Card / Form Sheet** | Centered Modal Dialog (`max-width: 560px`) | Direct focus containment without screen distortion |

---

## Constraints

- **Accessibility (WCAG 2.1 AA):**
  - **SC 2.1.1 Keyboard Accessibility:** Every action within the bottom sheet must be operable using standard keyboard navigation without requiring touch dragging.
  - **SC 2.4.3 Focus Order:** Opening a sheet must trap tab focus inside the modal surface; closing must return focus to the trigger element that opened it.
  - **SC 1.4.3 Contrast (Minimum):** Text content and interactive action buttons must satisfy ≥4.5:1 contrast against sheet surface background. Drag handle pill must satisfy ≥3:1 non-text contrast against surface background.
  - **SC 2.5.8 Target Size:** Close buttons, list item action triggers, and drag handles must feature minimum touch target sizes of **44x44px** (or 24x24px with sufficient spacing).
- **Safe Area Insets:** All bottom sheet footer CTA containers must include `padding-bottom: max(1rem, env(safe-area-inset-bottom))` to prevent action buttons from overlapping device home indicator bars on iOS and mobile Android gesture bars.
- **Performance & Frame Rate:** Sheet entrance/exit animations must use GPU-accelerated CSS properties (`transform` and `opacity` only) to achieve 60fps performance without triggering layout thrashing.

---

## Common Failure Patterns

- **Unreachable Buttons Behind Home Indicator:** Placing primary bottom CTAs at `bottom: 0` without safe-area padding, rendering buttons impossible to tap on iPhone gesture bar area.
- **Double Scrollbar Leakage:** Failing to lock parent document scroll when sheet opens, causing background page and bottom sheet to scroll simultaneously on touch devices.
- **Unreachable Inputs Under Soft Keyboard:** Failing to compute visual viewport height when virtual soft keyboards pop up on mobile input focus, covering the form submit button.
- **Keyboard Trap Violation:** Not supporting `Escape` key dismissal or allowing `Tab` focus to jump into background elements hidden behind dimming backdrop.
- **Missing Desktop Breakpoint Adaptation:** Stretching a 100% full-width bottom sheet across a 2560px desktop monitor, creating an unnatural, unreadable full-width band at screen bottom.

---

## Validation Criteria

- [ ] Mobile bottom sheet anchors cleanly to bottom viewport edge with top corner rounding (`16px`).
- [ ] Drag handle pill is visually centered, satisfies ≥3:1 contrast, and features a minimum 24px touch grab area.
- [ ] Safe-area bottom padding (`env(safe-area-inset-bottom)`) protects CTAs on iOS/Android gesture navigation bars.
- [ ] Opening bottom sheet locks document body scroll (`overflow: hidden`).
- [ ] Desktop media query (`≥768px`) transforms bottom sheet into centered modal dialog or popover.
- [ ] ARIA attributes (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`) are present and accurate.
- [ ] Focus is trapped inside sheet while open and returned to trigger element upon closing.
- [ ] Pressing `Escape` key or tapping backdrop overlay dismisses bottom sheet.
