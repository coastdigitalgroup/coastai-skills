# Status Indicator Taxonomy, Color System & Layout Rules

This reference guide establishes strict guidelines for status color tokens, shape augmentation, accessibility compliance (WCAG 2.1 AA), and spatial layout rules for status pages.

---

## 1. Status Indicator Color Taxonomy & Contrast Rules

| Status Severity Level | Primary Hue & Hex Code | Dark Text Color (On Light BG) | Light BG Tint | Geometric Shape Icon | WCAG AA Contrast Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Operational / Normal** | Emerald Green (`#059669`) | Dark Green (`#065F46`) | Tint Green (`#ECFDF5`) | Circle with Checkmark `(✓)` | **5.2 : 1** (Passes) |
| **Degraded Performance** | Amber Yellow (`#D97706`) | Dark Amber (`#92400E`) | Tint Amber (`#FFFBEB`) | Triangle Alert `(▲)` | **4.8 : 1** (Passes) |
| **Partial System Outage** | Orange (`#EA580C`) | Dark Orange (`#9A3412`) | Tint Orange (`#FFF7ED`) | Solid Square `(■)` | **5.1 : 1** (Passes) |
| **Major System Outage** | Crimson Red (`#DC2626`) | Dark Crimson (`#991B1B`) | Tint Crimson (`#FEF2F2`) | Octagon Exclamation `(🛑)` | **5.4 : 1** (Passes) |
| **Under Maintenance** | Royal Blue (`#2563EB`) | Dark Blue (`#1E40AF`) | Tint Blue (`#EFF6FF`) | Wrench / Gear Icon `(🔧)` | **5.6 : 1** (Passes) |

### Non-Text Contrast (WCAG 2.1 SC 1.4.11)
- Border outlines on status banners, daily bars, and badges must maintain at least a **3:1 contrast ratio** against adjacent background surfaces to remain visually distinct.

---

## 2. Shape-Augmented Indicator Rules (WCAG SC 1.4.1 Use of Color)

Relying exclusively on green, yellow, or red dots fails colorblind users (e.g., deuteranopia, protanopia, tritanopia) and users on monochromatic screens.

### Mandatory Requirements:
1. **Always pair color with explicit text labels:** Never present a raw colored dot without inline text (e.g., `"Operational"`).
2. **Always include distinct geometric shape outlines:**
   - Operational -> **Circle**
   - Degraded -> **Equilateral Triangle**
   - Partial Outage -> **Square**
   - Major Outage -> **Octagon**
   - Maintenance -> **Wrench / Gear**

---

## 3. ARIA & Screen Reader Accessibility Standards

### Dynamic Status Announcements (`aria-live`)
- Wrap the Global Status Hero Banner in an `aria-live="polite"` region:
  ```html
  <section role="region" aria-live="polite" aria-label="Global System Operational Status">
    <h2>Active Incident: Partial System Outage</h2>
  </section>
  ```
- When real-time status updates are pushed over WebSockets or long polling, screen readers will announce the updated headline automatically without interrupting current focus.

### 90-Day Uptime Bar Accessibility
- Each daily bar inside the 90-day history component MUST be focusable via keyboard:
  ```html
  <div
    class="uptime-bar"
    tabindex="0"
    role="button"
    aria-label="August 14, 2024: Partial outage lasting 42 minutes">
  </div>
  ```
- Pressing `Enter` or `Space` on a focused bar triggers a detailed modal or tooltip overlay describing all incidents logged on that date.

---

## 4. Spatial Measurement & Grid Rules

- **Main Page Measure:** Maximum width constraint `1024px` (`64rem`), centered with `margin: 0 auto`.
- **Card Padding:** `1.5rem` (`24px`) on desktop, collapsing to `1rem` (`16px`) on mobile viewports (`< 768px`).
- **Uptime Bar Strip Dimensions:**
  - Container: Flexible flexbox (`display: flex; gap: 2px`).
  - Height: `28px` to `32px` to ensure sufficient vertical touch target.
  - Hover / Focus scale effect: `transform: translateY(-2px)` with CSS transition `150ms`.
