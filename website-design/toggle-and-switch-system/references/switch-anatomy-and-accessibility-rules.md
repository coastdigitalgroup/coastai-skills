# Switch Anatomy, Proportions, and Accessibility Rules Reference

This reference document outlines the core geometric proportions, color contrast algorithms, ARIA state mappings, and decision models required when designing and implementing the **Toggle and Switch System**.

---

## 1. Geometric Ratios & Anatomy Metrics

A visually balanced toggle switch relies on precise mathematical relationships between the track, thumb, and touch bounds.

```
                  ◄────────────────── Track Width (W) ──────────────────►
                 ┌───────────────────────────────────────────────────────┐  ▲
                 │   padding (P)                                         │  │
                 │  ┌─────────┐                                          │  │
   Touch Bound   │  │  Thumb  │                  Track Interior          │Track Height
   Min 44x44px   │  │ Dia (D) │                  Travel Space            │ (H)
   (WCAG 2.5.8)  │  └─────────┘                                          │  │
                 │                                                       │  │
                 └───────────────────────────────────────────────────────┘  ▼
```

### Proportional Formulas
- **Aspect Ratio:** Track Width ($W$) should equal approximately **$1.8 \times H$ to $2.0 \times H$** (e.g., 48px width for a 24px-26px track height).
- **Thumb Diameter ($D$):** $D = H - (2 \times P)$, where Padding ($P$) is typically 2px to 3px.
- **Thumb Travel Offset ($T$):** $T = W - D - (2 \times P)$. For a $48\text{px}$ track with $22\text{px}$ thumb and $2\text{px}$ padding: $T = 48 - 22 - 4 = 22\text{px}$.
- **Concentric Corner Radii:** Track Radius $R_T = 9999\text{px}$ (Pill shape); Thumb Radius $R_D = 50\%$ (Circle).

### Metric Standards Table

| Scale Tier | Track Footprint ($W \times H$) | Thumb Diameter ($D$) | Touch Bounds | Use Case Environment |
| :--- | :--- | :--- | :--- | :--- |
| **Compact** | $36\text{px} \times 20\text{px}$ | $16\text{px}$ | $40\text{px} \times 40\text{px}$ | Dense Data Tables, Compact Toolbars |
| **Standard Desktop** | $48\text{px} \times 26\text{px}$ | $22\text{px}$ | $44\text{px} \times 44\text{px}$ | Primary Settings Panels, Card Lists |
| **Touch Large (Mobile)** | $52\text{px} \times 30\text{px}$ | $24\text{px}$ | $48\text{px} \times 48\text{px}$ | Mobile App Views, Primary Onboarding |

---

## 2. Color Contrast & WCAG AA Requirements

Toggle switches feature both **textual elements** and **graphical control components**. Both must meet WCAG 2.2 criteria.

```
┌────────────────────────────────────────────────────────┐
│ [Track Boundary/Fill] ──> Must meet 3:1 contrast against Background
│ [Thumb Surface]       ──> Must meet 3:1 contrast against Track Fill
│ [Label Text]          ──> Must meet 4.5:1 contrast against Surface
└────────────────────────────────────────────────────────┘
```

### Contrast Formula Metrics

1. **Non-Text Contrast (WCAG 2.1 / 2.2 SC 1.4.11 - Level AA):**
   - **Off-State Track:** The inactive track boundary or fill must have a contrast ratio of at least **3:1** against the card surface background (e.g., `#64748B` track fill on a `#FFFFFF` surface = **3.6:1**).
   - **On-State Track:** Active color fill must meet at least **3:1** contrast against adjacent backgrounds.
   - **Thumb Indicator:** The circular thumb must maintain at least **3:1** contrast against the active or inactive track background.

2. **Text Contrast (WCAG 2.1 / 2.2 SC 1.4.3 - Level AA):**
   - **Setting Title:** Minimum **4.5:1** contrast (e.g., `#0F172A` on `#FFFFFF` = **15.8:1**).
   - **Description Text:** Minimum **4.5:1** contrast (e.g., `#475569` on `#FFFFFF` = **5.8:1**). Avoid using ultra-light gray text (`#94A3B8` on `#FFFFFF` = 2.6:1, **FAILS**).

---

## 3. Accessibility & ARIA Technical Handoff Rules

### ARIA Attributes Reference

```html
<!-- Recommended HTML Structure -->
<button type="button"
        role="switch"
        aria-checked="true|false"
        aria-labelledby="switch-title-id"
        aria-describedby="switch-desc-id"
        class="switch">
  <span class="switch-thumb"></span>
</button>
```

| ARIA Attribute | Value Type | Function / Behavior |
| :--- | :--- | :--- |
| `role="switch"` | String | Identifies the element as a binary state toggle switch to screen readers. |
| `aria-checked` | `"true"` \| `"false"` | Communicates the current active state. **Must update dynamically** via JavaScript. |
| `aria-labelledby` | ID Reference | Connects the switch to its primary label element (`<label id="...">` or `<span>`). |
| `aria-describedby` | ID Reference | Connects the switch to its secondary supporting description text. |
| `aria-busy` | `"true"` \| `"false"` | Applied during asynchronous API requests to signal pending state update. |
| `disabled` / `aria-disabled` | Boolean | Prevents user interaction and dim-renders the control. |

### Keyboard Event Mapping

- **`Tab` / `Shift+Tab`:** Moves focus into and out of the switch control. Focus ring MUST be rendered using `:focus-visible`.
- **`Space` (Key code 32):** Toggles the state between `aria-checked="true"` and `aria-checked="false"`. `event.preventDefault()` must be called to prevent browser page scrolling.
- **`Enter` (Key code 13):** Toggles the state. Standard `<button>` elements execute click handlers natively on `Enter`.

---

## 4. Component Selection Decision Matrix

Use this matrix to resolve ambiguity when selecting between selection controls.

```
                       Is the option part of a form with an
                        explicit "Save/Submit" button?
                                     │
                     ┌───────────────┴───────────────┐
                     ▼                               ▼
                   YES                               NO
                     │                               │
            Use CHECKBOX control           Does it select between
                                          2 binary states (On/Off)?
                                                     │
                                     ┌───────────────┴───────────────┐
                                     ▼                               ▼
                                    YES                              NO
                                     │                               │
                              Use TOGGLE SWITCH            Use SEGMENTED CONTROL
                              (Instant Action)            or RADIO BUTTON GROUP
```
