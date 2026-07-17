# Switch Accessibility Specifications

This reference document outlines the core accessibility standards, browser/assistive technology interactions, and design metrics required to deliver a compliant and inclusive toggle switch.

---

## 1. Semantic Markup & ARIA Properties

### The `role="switch"` Landmark
The ARIA `switch` role indicates a binary state (On or Off) that takes immediate effect when selected. It inherits from `role="checkbox"`, but differs in how it communicates intent:
- A **checkbox** implies selection of an option which will be submitted *later* as part of a form batch.
- A **switch** implies action that takes place *immediately* (e.g., turning on Bluetooth or switching a page layout).

### Essential ARIA Attributes

| Attribute | Value | Description |
|---|---|---|
| `role="switch"` | String | Informs assistive technology that this element behaves as a toggle switch. |
| `aria-checked` | `"true"` or `"false"` | Communicates the active or inactive state of the switch. **Required** when using the `<button>` implementation. |
| `aria-labelledby` | String (ID reference) | Direct association with the text node labeling the switch. Preferred over inline labels. |
| `aria-describedby` | String (ID reference) | Identifies descriptive metadata (e.g., "Allow system connections to peripheral devices"). |

---

## 2. Keyboard Interaction Model

A fully accessible switch must respond to both mouse and keyboard events. The tab focus and activation keycodes must follow native expectations:

| Action | Key | Expected Behavior |
|---|---|---|
| **Focus** | `Tab` | Moves focus onto the switch component. Adds a high-contrast focus ring. |
| **Blur** | `Tab` / `Shift + Tab` | Safely leaves the component and moves focus to the adjacent interactive element. |
| **Activation** | `Space` | Toggles the switch state (`aria-checked` flips, checkbox toggles state). |
| **Activation** | `Enter` | For `<button role="switch">`, toggles state natively. For `<input type="checkbox" role="switch">`, custom listeners must be added to trigger activation on Enter. |

*Note: Swiping gestures (touch dragging) are fine as visual sugar but must never replace direct keyboard button activation.*

---

## 3. Contrast Requirements (WCAG 2.1 & 2.2)

To satisfy **WCAG 2.1 Success Criterion 1.4.3 (Contrast - Minimum)** and **1.4.11 (Non-text Contrast)**, the visual elements of the switch must meet specific ratios:

```text
    Label Text (Push Notifications) -----> Min 4.5:1 Contrast (AA)

     [===== (O) =====]
      ^      ^
      |      +------ Thumb element -> Min 3:1 Contrast against track
      +------------- Track background -> Min 3:1 Contrast against body when ON
```

1. **Text Contrast:** The text label describing the switch must maintain a **4.5:1** contrast ratio against the background.
2. **Component Contrast (Non-Text):** The border, background track, and thumb must have at least **3:1** contrast against the adjacent background in both active (On) and inactive (Off) states, unless they are purely decorative or their state is communicated via visible text.
3. **No Red/Green Bias:** Colorblind users (e.g., protanopia, deuteranopia) cannot differentiate between standard red (Off) and green (On) states. Relying *only* on color changes is a violation of WCAG 1.4.1. The state transition must also be represented by spatial movement of the thumb (left vs. right alignment) or supplementary textual labels.

---

## 4. Touch Targets & Spacing (WCAG 2.2 Success Criterion 2.5.8)

In modern web layouts, tap targets must be easy to activate for users with limited motor control.
- **Minimum Interactive Target Size:** The touch target must be at least **44x44 CSS pixels** (WCAG 2.1 AAA, WCAG 2.2 AA pointer target spacing rules).
- **Remediation Tip:** Since a styled switch track is typically narrow (e.g., 48x24px), use an invisible CSS pseudo-element (`::after`) or padding wrapper to inflate the clickable target box to at least 44x44px. This maintains the clean, compact visual design while satisfying the tap-target requirements.

---

## 5. Screen Reader Speech Profiles

How different screen readers announce `role="switch"`:

- **VoiceOver (macOS / iOS):** *"Push notifications, switch, off"* (when toggled: *"Push notifications, switch, on"*).
- **NVDA (Windows):** *"Push notifications, switch, not checked"* (when toggled: *"Push notifications, switch, checked"*).
- **JAWS (Windows):** *"Push notifications, button switch, off"* (when toggled: *"Push notifications, button switch, on"*).
