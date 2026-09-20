---
name: toggle-and-switch-system
description:
  Design a systematic framework for binary state toggle switches, switch lists,
  and instant-action preference controls with touch-first spatial proportions,
  WCAG AA contrast states, loading overlays, and accessible ARIA attributes.
---

# Toggle and Switch System

## Purpose

The Toggle and Switch System provides a methodology for designing, structuring, and integrating binary state switches (`on`/`off`) across web applications, preference panels, and task interfaces. Unlike checkboxes—which historically represent selection within a multi-field form that requires a manual "Save" or "Submit" step—a toggle switch represents a direct physical power control that takes effect immediately upon activation.

This skill solves critical design challenges: preventing user confusion between instant settings vs. deferred form submissions, maintaining touch-friendly hit areas without causing visual crowding, establishing high-contrast off/on states for low-vision users, handling asynchronous saving states without layout shifts, and structuring grouped switch lists for intuitive scanning and screen reader accessibility.

## Use Cases

- **Immediate Preference Controls:** Enabling or disabling application settings, dark mode triggers, desktop/email notifications, or two-factor authentication where state changes execute immediately in the background.
- **Feature Toggles in Dashboards:** Activating real-time platform features, API sandbox modes, or auto-renewal subscription options.
- **Filtering & Display Modes:** Toggling live view properties (e.g., "Show Archived Items", "Compact Mode", "Include Out of Stock") where the content view immediately re-renders without reloading the page.
- **Permission & Privacy Controls:** Toggling data collection opt-ins, camera/microphone permissions, or public profile visibility in account settings.

## When NOT to Use

- **Deferred Form Submissions:** If setting options requires clicking an explicit "Save Changes" or "Submit Form" button (e.g., a checkout address form or multi-input registration), use standard Checkboxes (`<input type="checkbox">`) or Radio Buttons instead of Toggles.
- **Mutually Exclusive Options (>2 choices):** If selecting between three or more distinct modes (e.g., "Light", "Dark", "System Theme"), use `segmented-control-system` or `radio-button-group`.
- **View Panel Switching:** If switching options replaces an entire main content area or panel view (e.g., switching between "Dashboard" and "Analytics" views), use `tab-ui-system` or `site-navigation-system`.
- **Complex Hierarchical Filtering:** If filtering deep product catalogs with multiple nested options, ranges, and categories, use `filter-and-sort-system`.

## Inputs

1. **Setting Context & Intent:** Whether the action takes effect immediately (instant action setting) or is part of a larger deferred batch form.
2. **State Model Matrix:** Requirements for initial binary state (`on` or `off`), pending/loading states during API network requests, disabled states, and error fallback states.
3. **Control Hierarchy & Labels:** Primary setting title, supporting inline description text, and optional micro-feedback badges (e.g., "Active", "Paused", "Saving...").
4. **Layout Context:** Container environment (e.g., isolated setting card, full-width settings list, embedded table cell, or compact toolbar).
5. **Brand Design Tokens:** Surface fill colors, active track color, focus outline tokens, border radii, and fluid spacing tokens (from `fluid-spacing-system` and `accessible-color-system`).

## Outputs

1. **Switch Component Anatomy Spec:** Dimensional ratios, track-to-thumb sizing rules, border-radius specifications, and thumb offset geometry.
2. **State Transition Matrix:** Explicit visual and structural definitions for Default Off, Default On, Hover, Focus-Visible, Pending/Loading, Disabled, and Error states.
3. **Switch List Layout Blueprint:** Alignment patterns, spacing rules, divider treatments, and typography hierarchy for grouped setting rows.
4. **ARIA & Accessibility Handoff Spec:** Mapping for `role="switch"`, `aria-checked`, `aria-describedby`, label associations, and keyboard interaction behavior.

---

## Workflow

### 1. Evaluate Setting Semantics and Determine Control Type
Before styling a toggle component, verify that a switch is semantically correct:
- **Instant vs. Deferred Test:** Will the backend database or user session update immediately when the user clicks/taps the control? If **Yes**, use a **Toggle Switch**. If **No** (requires a "Save" button), use a **Checkbox**.
- **Binary State Test:** Does the setting represent a clear binary choice (Enabled/Disabled, On/Off)? If the choice involves states like "Low / Medium / High" or "Monthly / Yearly", use a `segmented-control-system`.

### 2. Define Spatial Anatomy and Touch Targets
Design the switch component with strict proportional relationships:
- **Visual Track Footprint:** Standard desktop track dimensions are **44px to 48px width** by **24px to 26px height**. Standard mobile track dimensions are **48px to 52px width** by **28px to 30px height**.
- **Thumb Geometry:** The circular thumb diameter should sit 2px to 4px smaller than the track height (e.g., a 24px high track uses a 20px thumb, leaving a 2px inner inset margin).
- **Physical Hit Target (WCAG 2.2 SC 2.5.8):** While the visual track is compact (~48x24px), the interactive hit container (including padding) must be at least **44x44px** (or minimum 24x24px with surrounding clear space).
- **Concentric Corner Radii:** Use `border-radius: 9999px` (pill shape) for both the track and thumb to convey a physical sliding mechanism.

### 3. Establish High-Contrast Visual States
Avoid relying solely on color or thumb position to communicate state:
- **Off State (Inactive):** Low-contrast neutral track background (e.g., slate gray `#64748B` or dark neutral `#475569`) with a strong border outline or high-contrast thumb to achieve at least **3:1 contrast** against adjacent surfaces.
- **On State (Active):** High-contrast primary/brand or success color fill (e.g., blue `#2563EB` or green `#16A34A`). The thumb slides cleanly to the right edge with a smooth, hardware-accelerated CSS transition (`transform: translateX()`).
- **Text Label Integration:** Always pair the switch with a clear primary label. Never rely on moving text inside the track itself (e.g., "ON/OFF" squeezed inside the thumb), which causes severe legibility and truncation issues.

### 4. Structure Switch List Rows and Group Layouts
When stacking multiple setting switches in a preference panel or card:
- **Row Anatomy:** Layout setting items horizontally using Flexbox (`display: flex; justify-content: space-between; align-items: center;`).
- **Left Column (Text Stack):** Position the primary title (`font-weight: 600`) and supporting description (`font-size: 0.875rem; color: secondary`) on the left, max-width constrained to ~75% of the row to prevent long text lines.
- **Right Column (Switch Control):** Align the switch to the right edge. Ensure vertical centering (`align-items: center` or `align-items: flex-start` with top-padding if description text wraps multiple lines).
- **Row Separation:** Separate setting items with subtle divider lines or card borders, maintaining at least `16px` vertical padding between adjacent rows to prevent accidental mis-taps.

### 5. Engineer Asynchronous Loading and Error States
Because toggle switches execute background API requests immediately upon activation:
- **Pending/Loading State:** Upon user click, switch `aria-checked` state visually while replacing or overlaying the thumb with a subtle micro-spinner or dimming track opacity (e.g., `opacity: 0.7; cursor: wait;`). Keep the control non-interactive until the request completes.
- **Success Micro-Feedback:** Optionally display a temporary inline checkmark or status badge ("Saved") adjacent to the switch for 1.5 seconds.
- **Error Rollback:** If the network request fails, automatically slide the switch thumb back to its original state, highlight the row with an error token/border, and display an inline error message explaining the failure with a "Retry" option.

### 6. Map Keyboard Navigation and Screen Reader Accessibility
Ensure native parity for screen reader and keyboard-only users:
- **Native Underpinnings:** Use `<input type="checkbox" role="switch">` or a `<button role="switch" aria-checked="true|false">` element to provide full native focus and toggle behavior.
- **Label Association:** Wrap the text and control in a `<label>` element or link them explicitly via `for="id"` and `aria-describedby="description-id"`.
- **Keyboard Triggers:** Ensure both `Space` key and `Enter` key toggle the state cleanly when focused.
- **Focus Ring:** Apply a high-contrast focus outline (minimum 2px width with 2px offset) around the switch container when focused via keyboard (`:focus-visible`). Focus rings must never be clipped by row boundaries or `overflow: hidden` parent cards.

---

## Decision Rules

### Switch vs. Checkbox vs. Segmented Control Selection Matrix

| Design Requirement | Recommended Component | Rationale |
| :--- | :--- | :--- |
| **Instant backend setting change** (e.g., "Dark Mode", "Notifications") | **Toggle Switch** | Analogous to a physical light switch; conveys immediate background effect. |
| **Deferred form input** requiring a "Submit" or "Save" button | **Checkbox** | Indicates selected state that will only be processed when the entire form is sent. |
| **Mutually exclusive choice between 2 options** (e.g., "Monthly / Annual") | **Segmented Control** | Exposes both explicit labels simultaneously; switches don't show the "Off" option label clearly. |
| **Multi-select items from a long list** | **Checkbox List** | Standard multi-selection pattern; less visual noise than dozens of colorful switches. |
| **Binary choice with complex confirmation modal** | **Toggle Switch + Modal** | Switch initiates action; modal confirms before executing irreversible state change. |

### Label Positioning & Alignment Rules
- **Right-Aligned Switch (Default):** Place the switch control on the right edge of full-width cards or setting lists. This leaves the left margin clean for readable title and description scanning.
- **Left-Aligned Switch (Inline):** Place the switch directly to the left of its label ONLY when used as a compact inline filter widget in toolbars or standalone table controls.
- **Row Divider Lines:** Use thin, low-contrast borders between switch rows in dense lists to prevent touch target ambiguity.

---

## Constraints

- **Touch Target Floor (WCAG 2.2 SC 2.5.8):** The interactive container around the switch must provide at least a `24x24px` target area, with `44x44px` strongly preferred for mobile thumb tap zones.
- **Contrast Ratios (WCAG AA SC 1.4.11 / SC 1.4.3):**
  - Text labels: Minimum **4.5:1** contrast against row background.
  - Switch track boundaries (Off state): Minimum **3:1** visual contrast against background surface.
  - Switch active fill (On state): Minimum **3:1** contrast against thumb and background surface.
- **Motion Safety (WCAG SC 2.3.3):** Respect user reduced motion settings (`@media (prefers-reduced-motion: reduce)`). In reduced motion mode, disable sliding thumb animations and switch states instantaneously (`transition: none`).
- **Focus Visibility (WCAG SC 2.4.13):** Keyboard focus rings must remain 100% visible and unclipped. Never set `outline: none` without providing an equal or superior focus style.

---

## Common Failure Patterns

- **The Form Submit Misunderstanding:** Placing toggle switches inside a standard multi-field registration or profile edit form alongside a "Save" button. Users become confused about whether clicking the switch saved immediately or if they still need to click "Save".
- **The Mysterious Off-State Label:** Hiding text context and using an ambiguous grey track without labels, leaving users unsure if gray means "Disabled", "Off", or "Not Configured".
- **Color-Only State Indication:** Relying purely on green vs. red color fills without changing thumb position or spatial offset, making the switch completely unusable for red-green colorblind users.
- **Jittery Loading Layout Shift (CLS):** Injecting an asynchronous spinner that alters row height or shifts the switch control left/right, causing the entire list to jump during saving.
- **Nested Focus Traps:** Putting interactive help buttons or external links inside a `<label>` element containing a switch, causing double-triggers or broken keyboard focus order.

---

## Validation Criteria

- [ ] **Semantic Context Confirmed:** The toggle switch is used exclusively for instant background settings or immediate live filters, not deferred forms.
- [ ] **Spatial Ratios & Touch Targets:** Interactive tap target meets the min 44x44px mobile preference; visual track maintains a clean 2:1 width-to-height ratio.
- [ ] **WCAG AA Contrast Verified:** Off-state track outline meets >= 3:1 contrast; text labels meet >= 4.5:1 contrast.
- [ ] **Keyboard & ARIA Compliance:** Component operates via `Space` and `Enter` keys, uses `role="switch"` and `aria-checked="true|false"`, and has a high-contrast `:focus-visible` ring.
- [ ] **Asynchronous Feedback Handled:** Loading, pending, and error rollback states are visually accounted for without causing Cumulative Layout Shift (CLS).
- [ ] **Reduced Motion Support:** `@media (prefers-reduced-motion: reduce)` disables thumb sliding transitions.
