# Toggle and Switch Anatomy & Accessibility Reference

This reference provides exact physical measurements, WCAG AA contrast standards, keyboard mechanics, and screen reader accessibility guidelines for the **Toggle and Switch System**.

---

## 1. Spatial Anatomy & Dimensional Ratios

An accessible toggle switch consists of a fixed **Track** and a sliding circular **Thumb**.

```text
  +--------------------------------------------+
  |              Track Width (W)               |
  |  +--------------------------------------+  |
  |  | Padding (P)                          |  |
  |  |  +----------------+                  |  | Track Height (H)
  |  |  |   Thumb (D)    |                  |  |
  |  |  |                |                  |  |
  |  |  +----------------+                  |  |
  |  +--------------------------------------+  |
  +--------------------------------------------+
```

### Standard Dimension Sets

| Component Tier | Track Width (W) | Track Height (H) | Inner Padding (P) | Thumb Diameter (D) | Travel Distance | Minimum Touch Footprint |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Compact / Dense** | 36px | 20px | 2px | 16px | 16px | 44px × 44px (with padding) |
| **Standard (Default)**| 44px | 24px | 2px | 20px | 20px | 44px × 44px (native height) |
| **Large / Mobile-First**| 52px | 28px | 3px | 22px | 24px | 48px × 48px |

### Key Formulae
- **Thumb Diameter (D):** `Track Height (H) - (2 * Padding (P))`
- **Travel Distance:** `Track Width (W) - (2 * Padding (P)) - Thumb Diameter (D)`
- **Translate Property:** `transform: translateX(Travel Distance)`

---

## 2. WCAG AA Contrast Compliance Rules

### SC 1.4.11 Non-Text Contrast (3:1 Minimum)
The switch track in **both** the ON and OFF states must maintain a minimum contrast ratio of **3:1** against the background container surface.

- **Bad (Fails WCAG):**
  - OFF Track: `#E5E7EB` (Light Gray) on `#FFFFFF` (White) = **1.2:1 contrast ratio (FAIL)**.
- **Good (Passes WCAG):**
  - OFF Track: `#6B7280` (Medium Gray) on `#FFFFFF` (White) = **3.5:1 contrast ratio (PASS)**.
  - ON Track: `#2563EB` (Primary Blue) on `#FFFFFF` (White) = **4.6:1 contrast ratio (PASS)**.

### SC 1.4.3 Text Contrast (4.5:1 Minimum)
Accompanying primary title labels must meet **4.5:1 contrast** against the page background. Secondary description text must meet **4.5:1** (3:1 if text size is 18px+ or 14px bold).

---

## 3. Keyboard & Assistive Technology (ARIA) Rules

### HTML & ARIA Pattern

The industry standard approach wraps a native `<input type="checkbox">` styled with `role="switch"` to guarantee dual accessibility across both visual and screen reader contexts.

```html
<input
  type="checkbox"
  role="switch"
  id="switch-dark-mode"
  aria-checked="true"
  aria-labelledby="label-title"
  aria-describedby="label-desc"
/>
```

### Keyboard Interactions

| Key / Action | Triggered Behavior |
| :--- | :--- |
| **Tab** | Moves focus onto the switch element. Shows prominent focus indicator ring. |
| **Shift + Tab** | Moves focus away from the switch to the preceding focusable element. |
| **Space** | Toggles switch between ON (`aria-checked="true"`) and OFF (`aria-checked="false"`). |
| **Enter** | In standard form contexts, Enter submits the form; in switch roles, pressing Space is the primary toggle trigger. |

### Screen Reader Announcements

When a user navigates to the switch via voiceover or screen reader navigation:
- **Announcement Format:** `"[Title Label], [Description Label], Switch, [On/Off state], [Disabled state if applicable]"`
- **Example:** *"Push Alerts for Direct Messages, Get real-time browser notifications, Switch, On"*

---

## 4. Async & Loading States

When a switch represents a remote setting updated over a network call:

1. **Optimistic Transition:** Switch immediately animates to the target position (`transform: translateX(...)`).
2. **Pending Indicator:**
   - Set `aria-busy="true"` on the switch input.
   - Set `aria-disabled="true"` to prevent duplicate clicks while the request is in flight.
   - Display a subtle loading indicator (or spinner inside the thumb).
3. **Success Resolution:** Remove `aria-busy="true"` and `aria-disabled="true"`.
4. **Failure Rollback:**
   - Smoothly animate the thumb back to the previous state.
   - Update `aria-checked` to reflect the original state.
   - Announce failure using an `aria-live="polite"` status message (e.g., *"Unable to save notification preference. Please try again."*).
