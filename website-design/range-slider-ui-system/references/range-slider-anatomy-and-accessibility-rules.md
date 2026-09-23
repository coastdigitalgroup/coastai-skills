# Range Slider Anatomy and Accessibility Rules

This reference guide outlines spatial geometry, touch target rules, WCAG AA contrast standards, ARIA attributes, keyboard interaction protocols, and state tokens for range sliders.

---

## 1. Component Anatomy

```text
               +-----------------------------+
               | Value Floating Tooltip      |
               | (e.g., "$250 / month")      |
               +--------------+--------------+
                              |
 +----------------------------v-----------------------------------+
 |  (Inactive Track) [===== ACTIVE FILL TRACK =====] (Inactive)   |
 |  +---------------+-----------------------------+-------------+ |
 |  |               |                             |             | |
 |  +---------------+-----------------------------+-------------+ |
 |                  O                             O               |
 |              Thumb Handle (Min)           Thumb Handle (Max)   |
 +----------------------------------------------------------------+
 <----------------- Interactive Touch Target: 44px --------------->
```

### Anatomical Sub-Components
1. **Container Wrapper:** Outer boundary encapsulating label, tracks, thumbs, ticks, and direct-entry fields.
2. **Inactive Track Background:** Full domain track bar representing total span from `min` to `max`.
3. **Active Fill Track:** Highlighted track segment representing current selected value (or span between dual thumbs).
4. **Thumb Handles:** Interactive draggable circular controls.
5. **Value Tooltips / Badges:** Real-time text outputs displaying numeric values with units ($ / seats / GB / % / ms).
6. **Tick Marks & Step Labels:** Optional discrete step markers positioned along the track axis.

---

## 2. Geometric Scale & Touch Target Specifications

| Geometric Property | Standard Dimension | Compact Dimension (Tables) | Mobile Dimension |
| :--- | :--- | :--- | :--- |
| **Track Height** | `8px` (`0.5rem`) | `6px` (`0.375rem`) | `8px` (`0.5rem`) |
| **Track Border Radius** | `999px` (Full Pill) | `999px` | `999px` |
| **Thumb Diameter** | `24px` (`1.5rem`) | `18px` (`1.125rem`) | `28px` (`1.75rem`) |
| **Touch Target Area** | **44x44px minimum** | **44x44px minimum** | **48x48px recommended** |
| **Focus Ring Offset** | `3px` solid, `3px` offset | `2px` solid, `2px` offset | `3px` solid, `3px` offset |

---

## 3. WCAG AA Non-Text Contrast Compliance Rules (SC 1.4.11 & 1.4.3)

- **Inactive Track:**
  - Light Mode: `#E2E8F0` with a `1px` border `#CBD5E1` against `#FFFFFF` background (3.1:1 contrast).
  - Dark Mode: `#475569` against `#1E293B` background surface.
- **Active Fill Track:**
  - Light Mode: `#2563EB` (Primary blue) or `#0D9488` (Teal). Exceeds 4.5:1 against track backgrounds.
- **Thumb Border & Fill:**
  - Thumb fill `#FFFFFF` must feature a 2px outer border `#2563EB` to guarantee visibility against both white card backgrounds and colored active fill tracks.
- **Text Labels & Value Badges:**
  - Text must maintain at least 4.5:1 contrast against adjacent background colors (e.g., `#0F172A` dark text on `#FFFFFF`).

---

## 4. Keyboard Navigation & ARIA Rules

### ARIA State Mapping Table

| Attribute | Purpose | Dynamic Value Example |
| :--- | :--- | :--- |
| `role="slider"` | Defines semantic slider control | Applied automatically to `<input type="range">`. |
| `aria-valuemin` | Lowest value bound | `aria-valuemin="0"` |
| `aria-valuemax` | Highest value bound | `aria-valuemax="500"` |
| `aria-valuenow` | Current numerical value | `aria-valuenow="250"` |
| `aria-valuetext` | Human-readable value with units | `aria-valuetext="$250 dollars per month"` |
| `aria-label` / `aria-labelledby` | Accessible name of the thumb handle | `aria-label="Minimum Price"` |

### Keyboard Shortcuts

- `ArrowRight` / `ArrowUp`: Increment value by `1 step`.
- `ArrowLeft` / `ArrowDown`: Decrement value by `1 step`.
- `PageUp`: Increment value by large step (typically 10% of total domain span).
- `PageDown`: Decrement value by large step.
- `Home`: Jump value directly to `min`.
- `End`: Jump value directly to `max`.

---

## 5. State Matrix

| State | Track Style | Thumb Handle Style | Tooltip / Output Style |
| :--- | :--- | :--- | :--- |
| **Default / Resting** | Inactive track neutral gray, active fill brand color | Solid fill with 2px border, subtle drop shadow | Visible summary badge or resting header text |
| **Hover** | Active fill brightened (+5%) | Thumb scale `1.05x`, cursor `grab` | Tooltip bubble opacity `1` |
| **Active / Dragging** | Active fill brightened (+10%) | Thumb scale `1.15x`, cursor `grabbing` | Tooltip bubble expanded with active value |
| **Focus-Visible** | Visible track outline | Distinct 3px offset focus ring (`#60A5FA`) | Focused thumb elevated z-index |
| **Disabled** | Opacity `0.4`, track neutral gray | Opacity `0.4`, cursor `not-allowed` | Muted secondary text color |
