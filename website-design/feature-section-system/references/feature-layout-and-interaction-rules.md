# Feature Layout & Interaction Rules Reference

This reference provides technical specifications, layout grid heuristics, aspect ratio rules, typography scales, and accessibility checklists for designing feature sections.

---

## 1. Grid Composition & Column Ratio Heuristics

### Column Width Allocations by Content Density

| Layout Pattern | Desktop Grid Ratio | Content Weighting | Best Asset Pairings |
| :--- | :--- | :--- | :--- |
| **50 / 50 Balanced Split** | 6 Cols / 6 Cols | Equal visual weight between text and visual proof | 16:9 UI Screenshots, Browser Mockups, Video Demos |
| **40 / 60 Media Focus** | 5 Cols / 7 Cols | High visual priority; complex screenshot inspection | High-density Analytics Dashboards, Code Editors |
| **60 / 40 Text Focus** | 7 Cols / 5 Cols | High copy priority; regulatory or compliance rules | Multi-bullet feature specs, Enterprise SLAs |
| **3-Column Feature Grid** | 4 Cols / 4 Cols / 4 Cols | High scannability across secondary features | 48px Vector Icons, 4:3 Mini Screenshots |
| **4-Column Feature Grid** | 3 Cols / 3 Cols / 3 Cols / 3 Cols | Compact micro-feature overview | 32px Accent Icons, Short 2-line descriptions |

---

## 2. Aspect Ratio & Media Framing Matrix

### Aspect Ratio Guidelines

- **16 : 9 Widescreen (1.78:1):** Recommended for full desktop application dashboards, workflow videos, and browser window mockups.
- **4 : 3 Classic Aspect (1.33:1):** Recommended for mobile app interfaces, tablet screens, and dense feature card visuals.
- **1 : 1 Square (1:1):** Recommended for focused micro-interactions, single UI component callouts, and icon illustration blocks.

### Screenshot Framing Rules

1. **Outer Border Boundary:** Always enclose screenshots with `border: 1px solid var(--border-subtle)` or `border: 1px solid rgba(0,0,0,0.08)` to prevent light screenshot canvas areas from dissolving into white background sections.
2. **Ambient Elevation Shadows:**
   ```css
   .media-frame-shadow {
     box-shadow:
       0 20px 25px -5px rgba(15, 23, 42, 0.1),
       0 8px 10px -6px rgba(15, 23, 42, 0.05);
   }
   ```
3. **Corner Radius Scale:**
   - Inner screenshot image: `border-radius: 8px`
   - Outer browser mockup container: `border-radius: 12px`

---

## 3. Typography Hierarchy & Measure Matrix

### Typography Scale Table

| Element Role | Semantic Tag | Font Size Range | Line Height | Max Measure / Width |
| :--- | :--- | :--- | :--- | :--- |
| **Section Eyebrow** | `<span>` | `0.875rem` (14px) | `1.2` | N/A (Pill width) |
| **Section Title** | `<h2>` | `2.25rem`–`3rem` (36px–48px) | `1.2` | `25ch`–`35ch` |
| **Section Subtitle** | `<p>` | `1.125rem`–`1.25rem` (18px–20px) | `1.6` | `65ch` |
| **Feature Item Title** | `<h3>` | `1.5rem`–`1.875rem` (24px–30px) | `1.3` | `30ch` |
| **Feature Body Copy** | `<p>` | `1rem`–`1.125rem` (16px–18px) | `1.6` | `55ch` |
| **Checklist Bullet** | `<span>` | `0.9375rem`–`1rem` (15px–16px) | `1.5` | `45ch` |

---

## 4. Responsive Breakpoint & Reflow Matrix

```text
[ BREAKPOINT STRATEGY ]

Mobile (< 768px):
--------------------------------------------------
* Single column layout (100% width).
* Zig-zag rows collapse into uniform Text-First stack.
* Tab triggers convert to horizontally scrollable pill track.
* Touch targets enforce min 48px height.

Tablet (768px - 1023px):
--------------------------------------------------
* 2-column grid activated with reduced gap (2rem / 32px).
* Feature grids collapse from 3-columns to 2-columns.
* Media assets maintain locked aspect ratios.

Desktop (>= 1024px):
--------------------------------------------------
* Full grid ratio (e.g. 50/50 split or 5/7 split).
* Column gap expands smoothly via clamp() up to 4.5rem (72px).
```

---

## 5. WCAG 2.1 / 2.2 AA Accessibility Audit Checklist

- [ ] **Contrast Ratios:**
  - Body text (`#334155` on `#FFFFFF`) satisfies ≥ **4.5:1** contrast.
  - Headings (`#0F172A` on `#FFFFFF`) satisfy ≥ **3:1** (large text) or **4.5:1** contrast.
  - Interactive focus indicators feature ≥ **3:1** contrast against surrounding surfaces.
- [ ] **Interactive Target Sizes:**
  - All tab triggers, CTA links, and media control buttons measure at least **48px × 48px** in touch target height.
- [ ] **Keyboard Interactivity:**
  - Tablist supports `ArrowRight`, `ArrowLeft`, `Home`, and `End` key navigation.
  - Active tab trigger receives `tabindex="0"`; inactive tabs receive `tabindex="-1"`.
  - Tab panels feature `role="tabpanel"` and `tabindex="0"`.
- [ ] **Media & Motion Safeguards:**
  - Screenshots and UI diagrams include descriptive `alt` text explaining what the visual proves.
  - Autoplay videos are muted, loop automatically, and respect `@media (prefers-reduced-motion: reduce)`.
