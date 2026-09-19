---
name: toggle-and-switch-system
description:
  Design a systematic framework for binary state toggle switches, switch lists, and preference controls, defining physical proportions, state transitions, WCAG AA contrast, and accessibility patterns.
---

# Toggle and Switch System

## Purpose

The Toggle and Switch System provides a standardized design methodology for binary state switches (on/off controls). A toggle switch represents a physical switch that immediately activates or deactivates a feature, preference, or system state without requiring an explicit form submission (e.g., clicking a "Save" button).

Designing switches systematically eliminates common usability failures: confusion between checkboxes and switches, illegible state contrasts in dark and light modes, inadequate touch targets on mobile viewports, missing async loading indicators, and screen reader accessibility gaps.

## Use Cases

- **Immediate Preference Toggles:** Enabling or disabling instant settings such as "Dark Mode", "Auto-Save", or "Location Sharing".
- **Notification Settings:** Managing granular delivery channels (e.g., "Email Digest", "SMS Alerts", "Push Notifications") in user account settings.
- **Privacy and Consent Controls:** Toggling cookie categories, data analytics opt-ins, or profile visibility in settings panels.
- **Feature Management & Admin Controls:** Enabling or disabling beta features, API access keys, or user permissions in SaaS platforms.
- **Hardware Integration Switches:** Toggling device hardware capabilities like "Microphone Access", "Camera Feed", or "Bluetooth Sync".

## When NOT to Use

- **Batch Form Data Entry:** If the state change requires pressing a "Submit" or "Save Changes" button alongside other form inputs, use standard checkboxes or radio buttons (`form-design-system`).
- **Multi-Option Selection:** If choosing between 3 or more mutually exclusive states (e.g., "Light", "Dark", "System"), use a Segmented Control (`segmented-control-system`) or Radio Group.
- **View or Presentation Swapping:** If switching between display presentations (e.g., "Grid View" vs. "List View"), use a Segmented Control (`segmented-control-system`) or Tab list (`tab-ui-system`).
- **Confirmation-Heavy Actions:** Destructive operations that require modal confirmation or multi-step validation (e.g., "Delete Account" or "Reset Database").
- **Filtering List Content:** For instant multi-facet filtering where multiple options can be active simultaneously, use filter chips or checkboxes (`filter-and-sort-system`).

## Inputs

1. **Setting Label & Context:** Primary text label, optional description text, and context (e.g., settings card, table row, navigation header).
2. **Current Binary State:** Initial state (`true`/`false`, `active`/`inactive`) and whether the switch is mutable, disabled, or pending async execution.
3. **Visual Tokens:** Typography scale (`fluid-typography-system`), color palette for active/inactive tracks and thumbs (`accessible-color-system`), and motion timing (`interface-motion-system`).
4. **Layout Environment:** Container constraints (e.g., stacked preference list, card footer, inline toolbar).

## Outputs

1. **Switch Anatomy Spec:** Visual definition of Track (width, height, radius, border, fill) and Thumb (diameter, shadow, icon/label overlay).
2. **State Transition Blueprint:** Design rules for Default Off, Default On, Hover, Focus Visible, Active (press), Disabled, and Async Loading states.
3. **Accessibility & ARIA Spec:** Role assignment (`role="switch"` or `<input type="checkbox" role="switch">`), labeling relationships (`aria-labelledby`, `aria-describedby`), and state binding (`aria-checked`).
4. **Switch List Layout Specification:** Alignment, spatial distribution, tap target padding, and divider rules for stacked switch lists.

## Workflow

### 1. Evaluate the Action Model (Switch vs. Checkbox)

Determine whether a switch is the correct component based on immediate feedback semantics:
- **Use Switch:** The action takes effect **immediately** upon toggle (e.g., turning on "Airplane Mode" or toggling "Dark Theme"). No "Save" or "Apply" button is required.
- **Use Checkbox:** The action is part of a form that requires an explicit "Save" or "Submit" step before taking effect.

### 2. Establish Spatial Proportions and Target Footprints

Construct the physical dimensions of the switch using proportional sizing:
- **Track Proportions:** Height-to-width ratio of **1:1.75 to 1:2.0** (e.g., 24px height by 44px width, or 28px height by 52px width).
- **Thumb Proportions:** The thumb diameter should equal `Track Height - (2 * Track Padding)`. For a 24px track with 2px inner padding, the thumb is 20px.
- **Touch Target Expansion:** The visual switch may be 44x24px, but the interactive tap container must be padded to a minimum of **44x44px** (WCAG 2.2 SC 2.5.8) for touch accessibility.
- **Label Alignment:** Place labels on the left and the switch on the right in full-width list items, or place the switch on the left of inline labels with a minimum `12px` gap.

### 3. Design the State Transition Matrix

Map out high-contrast, accessible visual styles for all interaction states:

| State | Track Fill | Thumb Fill | Motion / Shadow | Accessibility |
| :--- | :--- | :--- | :--- | :--- |
| **OFF (Default)** | Neutral Muted (e.g., Gray 300) | White / Neutral Light | Thumb offset left (2px margin) | `aria-checked="false"` |
| **OFF (Hover)** | Neutral Hover (e.g., Gray 400) | White / Light Tint | Subtle thumb scale or halo | Pointer cursor |
| **ON (Default)** | Accent / Primary (e.g., Blue 600) | White | Thumb offset right (`transform: translateX(...)`) | `aria-checked="true"` |
| **ON (Hover)** | Accent Darker (e.g., Blue 700) | White | Subtle thumb scale or halo | Pointer cursor |
| **Focus Visible** | Track + 2px High Contrast Focus Ring | Retains ON/OFF fill | Focus ring with 2px offset | Keyboard focused |
| **Async Loading** | Dimmed Accent / Neutral | Spinner / Pulse Icon | Thumb centered or locked with spinner | `aria-busy="true"`, disabled |
| **Disabled** | Low Contrast Neutral (e.g., Gray 200) | Gray 400 | Reduced opacity (40-50%) | `disabled`, `aria-disabled="true"` |

### 4. Structure Accessible Switch Lists

When stacking multiple switches in a settings screen or card list:
- **Card/List Item Wrapping:** Wrap each switch and its text inside a unified label container or use explicit `aria-labelledby` IDs pointing to the title and subtext.
- **Divider Spacing:** Separate list rows with subtle horizontal borders or `16px` vertical gaps (`fluid-spacing-system`).
- **Interactive Row Area:** On touch screens, make the entire row area clickable to toggle the switch, not just the physical thumb.

### 5. Account for Async Operations and Optimistic UI

When toggling a switch triggers an API network request:
- **Optimistic UI with Fallback:** Immediately animate the switch to the target state, but show a subtle loading spinner inside or beside the switch track if the request takes longer than 200ms.
- **Error Reversion:** If the API request fails, smoothly animate the switch back to its original state, announce the error via an ARIA live region (`toast-and-snackbar-system`), and retain focus.

## Decision Rules

### Switch vs. Alternative Controls

- **Switch vs. Checkbox:** If the user must click "Save Settings" at the bottom of the page, use **Checkboxes**. If toggling instantly changes system behavior or updates database records via API, use a **Switch**.
- **Switch vs. Segmented Control:** If choosing between 2 options that are not strictly "On" and "Off" (e.g., "Celsius" vs. "Fahrenheit" or "Public" vs. "Private"), use a **Segmented Control** (`segmented-control-system`) because both states are positive values rather than an active/inactive binary.
- **Label Position:**
  - **Right-Aligned Switch (End of Row):** Best for full-width mobile card lists, SaaS preference tables, and dense account setting forms.
  - **Left-Aligned Switch (Before Label):** Best for standalone inline controls (e.g., a "Dark Mode" toggle in a sidebar or header).

## Constraints

- **WCAG AA Minimum Contrast (SC 1.4.3 & SC 1.4.11):**
  - **Non-Text Contrast (SC 1.4.11):** The switch track in BOTH the ON and OFF states must have at least a **3:1 contrast ratio** against the surrounding page background.
  - **Text Contrast (SC 1.4.3):** Accompanying title and description labels must meet **4.5:1 contrast** (3:1 for large text).
  - **Thumb Contrast:** The thumb inside the track must meet a **3:1 contrast** against the track background to remain visible to low-vision users.
- **Touch Target Size (SC 2.5.8):** Minimum **24x24px** touch target area, with **44x44px** padding strongly recommended for mobile viewports.
- **Never Rely Solely on Color:** The ON state must be distinguishable from the OFF state not only by color change, but also by **thumb position offset** (left vs. right). Optional inner icons (check mark vs. X / dash) or explicit text labels ("ON" / "OFF") improve accessibility.
- **Motion Accessibility:** Transition animations between ON and OFF states must be smooth (`150ms-250ms`) using `transform` (e.g., `transform: translateX()`). If `@media (prefers-reduced-motion: reduce)` is enabled, disable movement transitions and switch state instantly.

## Common Failure Patterns

- **The "Unsaved Switch":** Using a switch inside a multi-input form where clicking the switch does nothing until a "Submit" button is clicked, confusing users who expect instant activation.
- **The Invisible Off-Track:** Making the OFF state track background identical to the card background or using an ultra-light gray that fails the 3:1 WCAG non-text contrast requirement.
- **Color-Only Indication:** Using a green track for ON and a red track for OFF with zero thumb movement, rendering the state ambiguous for red-green colorblind users.
- **Micro Touch Targets:** Setting the interactive tap target to the exact 28x16px boundary of the visual switch, causing repeated missed taps on mobile.
- **Missing Keyboard Focus:** Removing `outline: none` without providing a custom high-contrast focus indicator when the switch is tabbed to using a keyboard.

## Validation Criteria

- [ ] Action model is strictly instant/immediate; switches are not placed inside delayed form submit flows.
- [ ] Track fills in both ON and OFF states satisfy WCAG 3:1 non-text contrast against page background.
- [ ] Thumb position cleanly shifts horizontally between OFF (left) and ON (right) states.
- [ ] Interactive touch target is padded to at least 44x44px or covers the entire row container.
- [ ] High-contrast focus visible state is implemented for keyboard navigation.
- [ ] Semantic HTML/ARIA pattern (`role="switch"`, `aria-checked`, `aria-labelledby`) is fully specified.
- [ ] Motion timing uses `transform` with instant fallback under `prefers-reduced-motion`.
