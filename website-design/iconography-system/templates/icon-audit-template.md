# Iconography Audit Template

Use this template to evaluate the current state of iconography on a website or
to specify requirements for a new design.

## 1. Style Definition

- [ ] **Library/Source:** (e.g., FontAwesome, Phosphor, Custom)
- [ ] **Visual Type:** [Outline / Filled / Duo-tone]
- [ ] **Stroke Weight:** [N]px
- [ ] **Corner Radius:** [Sharp / Rounded Npx]
- [ ] **Cap Style:** [Butt / Round / Square]

## 2. Sizing Scale

| Token     | Size (px) | Typical Use Case                    |
| :-------- | :-------- | :---------------------------------- |
| `icon-xs` | 12px      | Super-scripts, tight badges         |
| `icon-sm` | 16px      | Inline with body text, breadcrumbs  |
| `icon-md` | 24px      | Default, Buttons, Navigation        |
| `icon-lg` | 32px      | Feature headers, smaller highlights |
| `icon-xl` | 48px+     | Hero sections, large cards          |

## 3. Semantic Mapping

| Action / Concept    | Preferred Icon Metaphor | Alternative     |
| :------------------ | :---------------------- | :-------------- |
| **Navigation Menu** | Hamburger (3 lines)     | None            |
| **Close / Cancel**  | X / Cross               | None            |
| **Search**          | Magnifying Glass        | None            |
| **Success / Done**  | Checkmark               | Circle-check    |
| **Error / Alert**   | Triangle-exclamation    | Circle-x        |
| **Download**        | Arrow-down-to-line      | Tray-arrow-down |

## 4. Technical Checklist

- [ ] **Format:** SVGs are used instead of Icon Fonts.
- [ ] **ViewBox:** All icons use a consistent viewBox (e.g., `0 0 24 24`).
- [ ] **Optical Balance:** Do any icons look "heavier" or "lighter" than others?
- [ ] **Accessibility:** Are all functional icons labeled? Are decorative icons
      hidden?
- [ ] **Contrast:** Minimum 3:1 ratio for all icons.

## 5. Usage Notes

_Add any project-specific rules here (e.g., "Always use the 'Duo-tone' version
for primary features")._
