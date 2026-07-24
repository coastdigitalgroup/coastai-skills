---
name: onboarding-tour-system
description:
  Design and structure a systematic framework for multi-step guided onboarding
  tours and product walkthroughs, managing anchor positioning, backdrop masking,
  interaction hierarchies, and responsive adaptation.
---

# Onboarding Tour System

## Purpose

The Onboarding Tour System skill provides a comprehensive design methodology for structuring, styling, and coordinating multi-step guided product walkthroughs. It is designed to ease the user's cognitive load during first-time onboarding or major feature releases by visually isolating key interface elements, providing sequential, highly relevant context, and guiding them to an active, successful state. This system prevents confusing, chaotic, or overly intrusive tours by establishing a predictable, accessible, and user-controlled pacing.

## Use Cases

- **First-Time User Onboarding:** Guiding newly registered users through the core workflows of a complex SaaS application to drive activation.
- **New Feature Promotion:** Highlighting and explaining a newly released high-value tool or interface element to existing users.
- **UI Redesign Familiarization:** Helping returning users locate familiar tools after a significant interface restyling or reorganization.
- **Complex Step-by-Step Data Entry Tours:** Guiding a user through a multi-faceted dashboard panel during their initial setup (e.g., setting up their first automation rule).

## When NOT to Use

- **Self-Explanatory Interfaces:** If a task can be simplified through clearer layouts, better labels, or intuitive iconography, improve the core UI first instead of masking poor UX with a tour.
- **Highly Repetitive Micro-Tasks:** Avoid disrupting frequent workflows with popups. For regular help, use the `tooltip-and-hint-system` or inline helper text.
- **Mobile-Only or Low-Resolution Interfaces:** Multi-step anchored popover tours consume massive screen space and are highly prone to clipping or overlapping on mobile devices. Use full-screen cards or integrated dismissible inline steps instead.
- **Critical Error or Transactional Feedback:** For instant system feedback or errors, use the `banner-and-alert-system` or `toast-and-snackbar-system`.

## Inputs

1. **Information Architecture & Context:** The specific page layouts, dashboard sections, or UI coordinates where the tour will run.
2. **Anchor Element Inventory:** The specific target buttons, inputs, tables, or navigation links that need to be highlighted in each step.
3. **Onboarding Milestones (The "Why"):** The minimum key actions required to complete onboarding and ensure activation.
4. **Device Breakpoints:** Responsive target viewports where the tour must render, using guidelines from the `responsive-grid-system`.

## Outputs

1. **Backdrop & Mask Specification:** Visually isolating targeted elements while darkening the rest of the interface to focus user attention.
2. **Popover (Tour Card) Anatomy Spec:** Detailed structural blueprint for the tour bubble (arrows, body text, step indicators, skip/next/back buttons, close controls).
3. **Sequence & Flow Logic:** Step-by-step route mapping, progression models (strict linear vs. user-driven), and session persistence.
4. **Responsive Strategy & Mobile Fallbacks:** Adaptation rules for smaller screens where floating anchored popovers cannot safely fit.
5. **Accessibility Landmarks & Interaction Spec:** Full ARIA specification, keyboard navigation map, and focus trapping behavior.

## Workflow

### 1. Define the Step Sequence (The Happy Path)
- Limit the tour sequence to **3 to 5 steps** (Miller's Law). Anything longer results in high abandonment.
- Focus each step on an active benefit, not just a label. (e.g., Instead of "This is the Settings menu", write "Customize your workspace to match your team's workflow here").
- Ensure the final step has a clear, actionable call-to-action (CTA) that leaves the user in an active, productive state.

### 2. Design the Backdrop Mask and Isolation (Focus)
- Use a dark semi-transparent backdrop overlay (usually `#000000` with 50-70% opacity) to mute background noise and focus the eye.
- Create an "Isolation Mask" (using SVG path cutouts or CSS `clip-path` / box-shadows) around the active anchor element.
- Maintain a **4px to 8px padding buffer** around the highlighted anchor to prevent the mask from hugging the element borders too tightly.

### 3. Build the Popover (Tour Card) Hierarchy
- **Anchor Alignment:** Position the popover dynamically next to the highlighted element. Use a small directional arrow/pointer to visually link the card to the anchor.
- **Component Anatomy:**
  - **Header:** Include a standard Close button ('X') and a progress indicator (e.g., "Step 2 of 4").
  - **Body:** Use bold, concise titles and a maximum of 2 sentences of descriptive text.
  - **Action Bar:** Left-align the "Skip" link, right-align the navigation buttons. Ensure "Next" (or "Got It") uses the primary CTA style, and "Back" uses a low-contrast tertiary style.

### 4. Code for Accessibility (Keyboard & Screen Reader Parity)
- **Focus Trapping:** When a tour step is active, keyboard focus (`Tab` key) must be trapped within the tour popover to prevent keyboard users from navigating background items.
- **ARIA Associations:** Ensure the popover container uses `role="dialog"` or `role="alertdialog"` with `aria-modal="false"` (so assistive technologies know background elements are still present). Link the popover heading with `aria-labelledby` and description with `aria-describedby`.
- **Keyboard Shortcuts:** Support keyboard navigation: `Escape` to dismiss/skip the tour, `ArrowRight` for "Next", and `ArrowLeft` for "Back".

### 5. Map the Mobile Adaptation Strategy
- If the viewport is smaller than `768px` (Tablet/Mobile), transition from anchored floating popovers to a **bottom sheet drawer** or a **centered, non-anchored modal**. This prevents the card from being pushed off-screen or covering critical elements.
- Ensure the backdrop mask is disabled or simplified on mobile to prevent clipping errors caused by mobile scrolling.

## Decision Rules

- **Linear Tour vs. User-Driven Task List:**
  - Use a **Linear Tour** for a rigid, first-time setup sequence where Step A *must* precede Step B.
  - Use an **Interactive Progress Widget (Task List)** if tasks can be completed in any order, allowing users to select tasks at their own pace.
- **Trigger Condition:**
  - Trigger automatically **only** during first-run or after explicit updates.
  - Never auto-trigger tours for returning users on standard visits.
- **Anchor Position Override:**
  - **Default:** Position the popover "Bottom-Center" or "Right-Center" of the anchor.
  - **Collision Rule:** If the anchor is near the screen edge, flip the popover placement to prevent clipping (e.g., from "Right" to "Left"). If the anchor is hidden (inside a collapsed panel), programmatically expand the panel first before rendering the popover.
- **The "Skip" Affordance:**
  - Always provide a visible "Skip Tour" or "Dismiss" action on every step. Forcing users to complete a tour without escape breeds frustration.

## Constraints

- **Accessibility (WCAG 2.2):**
  - Text contrast within the tour card must meet WCAG AA (at least 4.5:1).
  - High-contrast visual focus ring (`outline`) must be present on interactive buttons.
  - Touch targets for next/back buttons must be at least 44x44px (recommended) or meet the 24x24px minimum (WCAG 2.2 SC 2.5.8).
  - Interactive anchors inside the backdrop cutout must be focusable.
- **Layout Shift Management:**
  - The appearance of the backdrop, cutout mask, and popover must not shift existing layout elements. Use `position: absolute` or `position: fixed` relative to the document viewport.
- **Z-Index Alignment:**
  - The backdrop and tour card must sit below top-level utility alerts like Toasts (e.g., backdrop at z-index 900, popover at z-index 910) to ensure high-priority system alerts can still break through.

## Common Failure Patterns

- **The "Infinite Tour" Trap:** Tours with more than 5 steps, causing users to drop off immediately.
- **The "Double-Focus" Conflict:** Auto-starting a tour on a page that already has an active modal, creating stacked overlays and trapped inputs.
- **Blind Anchor Highlighting:** Highlighting an element that is scrolled off-screen or collapsed, pointing the arrow at empty space.
- **Unreachable Background Actions:** Requiring the user to type into a masked element to proceed, but blocking their input or mouse clicks with the backdrop.
- **Mobile Bubble Squeezing:** Letting anchored bubbles shrink to unreadable widths on mobile, causing words to break awkwardly.

## Validation Criteria

- [ ] Tour is strictly capped at 3-5 steps.
- [ ] Every step has a clearly labeled, visible "Skip" or close option.
- [ ] Keyboard tab focus is trapped inside the popover during active steps.
- [ ] Focus shifts smoothly to the next tour card (or the newly highlighted element) when "Next" is pressed.
- [ ] ARIA attributes (`role="dialog"`, `aria-modal`, `aria-describedby`) are correctly configured.
- [ ] Popover collision handling is defined (automatically flips position near screen edges).
- [ ] Mobile viewports gracefully transition from anchored popovers to a centered modal or a persistent bottom sheet.
- [ ] A 4-8px padding buffer is maintained around the isolated anchor to avoid clipping borders.
- [ ] Active and hover states for all buttons meet WCAG AA (4.5:1 contrast).
