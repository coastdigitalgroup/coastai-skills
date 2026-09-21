---
name: toggle-and-switch-system
description:
  Design binary state toggle switches, switch lists, and preference controls with touch-first spatial proportions, WCAG AA contrast states, loading overlays, and accessible ARIA attributes.
---

# Toggle and Switch Design System

## Purpose

The Toggle and Switch Design System provides a standardized framework for designing, positioning, and implementing binary state controls across web interfaces. Toggle switches represent physical on/off switches that immediately trigger or commute a state change, setting preference, or feature status without requiring a manual form submission step (such as clicking "Save").

Without a dedicated design system for switches, interfaces frequently misuse toggle switches in place of checkboxes, fail WCAG contrast requirements in disabled or inactive states, lack clear state labels, create touch targets that are too small for mobile screens, or trigger unexpected layout shifts and background side effects without immediate visual feedback.

This system establishes rules for switch geometry, track and thumb proportions, label alignment, state color mapping, keyboard accessibility (`role="switch"`), touch hit area expansion, responsive list layouts, and async pending/loading states.

## Use Cases

- **Application Settings & Preferences:** Toggling instant system preferences (e.g., "Push Notifications," "Dark Theme," "Auto-save Drafts," or "Two-Factor Authentication").
- **Subscription & Billing Period Selection:** Switching pricing card tiers between Monthly and Annual billing cycles with inline discount badges.
- **Data Table Row Control:** Enabling or disabling individual user access, API integrations, webhooks, or automated rules directly within data table rows.
- **Feature Flag & System Mode Toggles:** Toggling operational states in developer dashboards (e.g., "Maintenance Mode," "Debug Logging," or "Beta Features").
- **Privacy & Cookie Consent Panels:** Managing granular tracking permissions (e.g., "Analytics Cookies," "Marketing Cookies") inside slide-out drawers or modal dialogs.

## When NOT to Use

- **Multi-Option Selection:** For choosing between 3 or more mutually exclusive options, use `segmented-control-system` or `custom-select-and-combobox-system`.
- **Form Submissions Requiring Explicit Approval:** For agreement terms (e.g., "I accept the Terms and Conditions") inside a standard multi-field form that requires a "Submit" button click, use standard checkboxes (`form-design-system`).
- **Binary Choice with Non-Immediate Effect:** If flipping the control does not take effect until a secondary "Apply" or "Save Changes" button is pressed, use a checkbox instead of a switch.
- **Bulk Selection in Tables:** For selecting multiple items for batch operations (e.g., "Delete Selected"), use checkboxes (`data-table-ui-system`).

## Inputs

1. **State Definition:** Binary state parameters (Off / Unchecked / `false` vs. On / Checked / `true`).
2. **Context & Execution Mode:** Immediate client-side state change (e.g., dark theme switch) vs. Async server side-effect (e.g., API webhook enable/disable).
3. **Labeling Structure:** Inline label text, supporting description/help text, and status badge requirement.
4. **Layout Context:** Standalone setting card, dense table row, multi-item preference group, or hero pricing toggle.
5. **Theme & Token Palette:** Surface colors, active track color, inactive track color, thumb color, and focus ring offset tokens.

## Outputs

1. **Switch Geometry & Token Spec:** Spatial dimensions for track width, height, thumb diameter, corner radius, and transition timings (`width: 44px`, `height: 24px`, `thumb: 20px`).
2. **State & Contrast Blueprint:** Palette tokens ensuring minimum WCAG 3:1 graphical object contrast for tracks and thumbs across Default (Off), Active (On), Hover, Focus-Visible, Disabled, and Pending states.
3. **Structural Layout & Typography Spec:** Spacing relationships between switch element, primary label (`h4`/`span`), description text, and optional status indicators (`ON`/`OFF`).
4. **Accessibility & ARIA Mapping:** Semantic HTML `<button role="switch" aria-checked="true|false">` structure with screen reader label association (`aria-labelledby` / `aria-describedby`).
5. **Async Handling Protocol:** Visual loading state specification (spinner thumb or reduced track opacity) for background network verification.

---

## Workflow

### 1. Determine Control Semantics (Switch vs Checkbox)
Before visual design, confirm the interaction intent matches the physical switch mental model:
- **Immediate Effect:** Flipping the switch takes effect instantly (or triggers an immediate background request).
- **Standalone Action:** Operates independently without needing an explicit "Save" or "Submit" confirmation button.
- **On/Off State Metaphor:** Represents turning a feature or status ON or OFF, rather than making a selection in a multi-field questionnaire.

### 2. Establish Spatial Geometry and Touch Margins
Design switch components with proportions that align with mobile touch guidelines while maintaining visual harmony on desktop:

```text
[   INACTIVE / OFF TRACK   ]          [    ACTIVE / ON TRACK    ]
+--------------------------+          +-------------------------+
|  (Thumb)                 |  ----->  |                 (Thumb) |
|   20px                   |          |                  20px   |
+--------------------------+          +-------------------------+
<-------- 44px ------------>          <-------- 44px ----------->
           24px height                                24px height
```

- **Standard Switch Scale:**
  - Track Width: `44px` (or `2.75rem`)
  - Track Height: `24px` (or `1.5rem`)
  - Track Border Radius: `999px` (Full pill shape)
  - Thumb Diameter: `20px` (leaving a `2px` inner track inset on all sides)
  - Thumb Border Radius: `50%` (Circle)
- **Compact / Dense Switch Scale (Table Rows):**
  - Track Width: `36px`
  - Track Height: `20px`
  - Thumb Diameter: `16px` (with `2px` inset)
- **Touch Target Enclosure:**
  - The interactive hit zone MUST be expanded to at least **44x44px** on mobile devices using pseudo-elements (`::before` / `::after`) or padding, preventing misclicks on touchscreens.

### 3. Define State Color Tokens and Contrast Metrics
To satisfy WCAG 2.1 / 2.2 AA non-text contrast requirements (SC 1.4.11 - 3:1 minimum contrast), follow strict color token pairs:

- **Inactive / Off State:**
  - Track Background: Neutral gray surface (`#E2E8F0` / dark mode: `#334155`).
  - Track Border: 1px border (`#CBD5E1` / dark mode: `#475569`) to guarantee 3:1 contrast against light background surfaces.
  - Thumb Color: Solid white or light surface (`#FFFFFF` / dark mode: `#F8FAFC`).
  - Optional Icon inside Thumb: Moon/Sun or Cross/Check icon (`12px`) for dual visual feedback.
- **Active / On State:**
  - Track Background: High-contrast brand or system action color (`#2563EB` primary blue or `#16A34A` success green). Contrast ratio against background page surface must exceed 3:1.
  - Track Border: Transparent or matching active border.
  - Thumb Color: Solid white (`#FFFFFF`) with smooth CSS transition (`transform: translateX(20px)` over `200ms cubic-bezier(0.4, 0, 0.2, 1)`).
- **Hover & Focus States:**
  - Hover: Subtle track brightness shift (+5% or -5%) or thumb shadow enlargement (`box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.15)`).
  - Focus-Visible: Distinct 2px offset focus ring (`outline: 2px solid #2563EB; outline-offset: 2px`).
- **Disabled State:**
  - Track & Thumb Opacity: Reduced to `0.5` or `0.4` with `cursor: not-allowed`.

### 4. Layout Label Alignment and Description Hierarchy
Switches should always be accompanied by clear text labels. Never present an isolated switch without an accessible label or visible context.

- **Horizontal Row Layout (Default Preference Card):**
  - Place text block on the left (Title + Description) and position the switch on the right edge.
  - Align the vertical center of the switch track with the first line of the title text (not centered across multi-line descriptions).
  - Maintain a minimum gap of `16px` between title text and switch element.
- **Form Inline Layout:**
  - Place switch on the left and label text on the right (`gap: 12px`), recommended when switches are integrated inside dense form fields.
- **Pricing Tier Toggle Layout:**
  - Center the switch horizontally between two explicit label options (e.g., "Monthly" — [ Switch ] — "Annual (Save 20%)"). Clicking either text label or the switch toggles the active state.

### 5. Handle Async Side-Effects & Loading States
When a switch triggers an asynchronous API call (e.g., changing a cloud resource setting or enabling an integration):
1. **Optimistic Visual State:** Instantly slide the thumb to the target position (`aria-checked="true"`).
2. **Pending Feedback:** Render a subtle spinner overlay inside the thumb or reduce track opacity slightly during network latency.
3. **Error Recovery:** If the server returns an error, display an inline toast/alert message and smoothly animate the thumb back to its previous state with `aria-checked="false"`.

### 6. Implement WCAG AA Accessibility Patterns
Ensure native keyboard navigation and screen reader support across all browser engines:

- **Semantic HTML Markup:**
  ```html
  <button
    type="button"
    role="switch"
    aria-checked="true"
    id="push-notifications-switch"
    aria-labelledby="push-notifications-label"
    aria-describedby="push-notifications-desc"
    class="toggle-switch">
    <span class="toggle-switch__track">
      <span class="toggle-switch__thumb"></span>
    </span>
  </button>
  ```
- **Keyboard Interaction:**
  - Focusable via `Tab` key navigation.
  - Pressing `Space` or `Enter` toggles the `aria-checked` state (`true` <-> `false`) and triggers the associated handler.
- **Screen Reader Announcements:**
  - Screen readers explicitly announce: *"Push Notifications, switch, on"* or *"Push Notifications, switch, off"*.
  - Do NOT write text like "On/Off" inside the label if it duplicates the switch's native ARIA state.

---

## Decision Rules

### Switch vs. Checkbox vs. Segmented Control Selection Matrix

| Scenario / Requirement | Recommended Control | Reason |
| :--- | :--- | :--- |
| Single binary choice with **immediate effect** (e.g., Dark Theme) | **Toggle Switch** | Instant execution model matches physical switch. |
| Single binary choice inside a **submitted form** (e.g., Accept Terms) | **Checkbox** | Changes do not take effect until "Submit" button is clicked. |
| Multi-item selection from a list (e.g., Select 5 emails) | **Checkboxes** | Standard batch selection behavior. |
| Choosing between 2 distinct modes (e.g., Grid View vs. List View) | **Segmented Control** | Both state labels remain visible side-by-side. |
| Setting an option on/off inside a **mobile list view** | **Toggle Switch** | Clear thumb target and explicit state feedback. |

### Label Position Matrix

| Layout Context | Switch Position | Label Position | Spatial Behavior |
| :--- | :--- | :--- | :--- |
| **Settings Preference List** | Right-aligned | Left-aligned | `justify-content: space-between` across row container. |
| **Inline Form Field** | Left-aligned | Right-aligned | `display: inline-flex; align-items: center; gap: 12px`. |
| **Hero Pricing Toggle** | Center-anchored | Flanking Left & Right | Flanked by "Monthly" and "Annual" text options. |

---

## Constraints

- **Accessibility (WCAG 2.1 / 2.2 AA):**
  - Minimum 3:1 non-text contrast ratio for track border/background and thumb against page background in both On and Off states.
  - Minimum 4.5:1 text contrast ratio for all associated labels and description helper text.
  - Focus ring must provide at least 3:1 contrast against surrounding background and measure at least 2px thick.
- **Touch Targets:**
  - Interactive touch area must measure at least **44x44px** on touch devices (WCAG 2.5.5 / 2.5.8).
- **Color Independence:**
  - Color must NOT be the sole indicator of state. The thumb's physical spatial position (left = off, right = on) and semantic `aria-checked` value must communicate state independently of color.

---

## Common Failure Patterns

- **Misusing Switches in Submitted Forms:** Using switches inside forms where changes do not take effect until clicking a separate "Save" button, confusing users who expect instant application.
- **Inadequate Track Contrast:** Using light gray tracks (`#F1F5F9`) against white backgrounds without a boundary border, making the switch invisible to low-vision users.
- **Color-Only State Communication:** Relying strictly on red vs. green track colors without moving the thumb slider position or updating ARIA attributes.
- **Microscopic Touch Targets:** Restricting the hit zone to the 36x20px visual track, causing frustration and missed taps on mobile viewports.
- **Missing Accessible Labels:** Rendering standalone icon switches without an `aria-label` or `aria-labelledby` reference.
- **Overlapping Multi-line Text:** Centering the switch vertically against a long 4-line description paragraph, breaking visual alignment with the main title.

---

## Validation Criteria

- [ ] Switch uses semantic HTML `<button role="switch" aria-checked="true|false">` structure.
- [ ] Track and thumb satisfy 3:1 minimum contrast ratio against background in both ON and OFF states.
- [ ] Keyboard navigation (`Tab`, `Space`, `Enter`) smoothly toggles the switch state and updates `aria-checked`.
- [ ] Touch hit area is extended to at least 44x44px using invisible padding or pseudo-elements.
- [ ] Switch is paired with visible, high-contrast label text associated via `aria-labelledby`.
- [ ] Switch position transitions smoothly (`transform: translateX()`) over 150ms–250ms with `prefers-reduced-motion` compliance.
- [ ] Responsive settings lists maintain proper spacing (`gap: 16px`) without text overlapping on narrow mobile screens.
