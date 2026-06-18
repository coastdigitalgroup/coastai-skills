# Hero Composition Reference Patterns

Standard spatial patterns for Hero sections and their psychological/functional
advantages.

---

## 1. The "F-Pattern" Hero
- **Structure:** Text left-aligned, visual right-aligned.
- **Logic:** Follows the natural reading pattern for Western audiences. The eye
  scans the headline, then the subhead, then hits the CTA before glancing at
  the visual on the right.
- **Best For:** Complex SaaS products, documentation, or services where the
  pitch requires reading.

## 2. The "Visual Anchor" Hero
- **Structure:** Large visual takes up 60-70% of the horizontal space; text is
  compact and high-contrast.
- **Logic:** Relies on "Show, Don't Tell." The visual does the heavy lifting of
  explaining the product.
- **Best For:** E-commerce, Physical Products, Portfolio sites.

## 3. The "Z-Pattern" (Centered) Hero
- **Structure:** Centered headline -> Centered subhead -> Centered CTA.
- **Logic:** Guides the eye down a single vertical pillar. Great for mobile and
  for "Storytelling" where you want the user to focus on one idea at a time.
- **Best For:** Mobile apps, Event landing pages, Personal brands.

---

## Compositional Anatomy Cheat Sheet

### Aspect Ratios for Hero Images:
- **Desktop Full-Bleed:** 21:9 or 16:9
- **Desktop Split (Column):** 4:5 or 1:1 (Portrait/Square)
- **Mobile Full-Width:** 1:1 or 4:3

### Visual Weight Levers:
| Lever | High Impact | Low Impact |
| :--- | :--- | :--- |
| **Typography** | Bold, Display Serif/Sans | Regular, Body Sans |
| **Color** | Primary Brand Color | Muted Neutrals |
| **Contrast** | Black on White / White on Dark | Gray on Light Gray |
| **Spacing** | Large Gaps (Breathing Room) | Tight Gaps (Density) |

---

## Accessibility Checkpoints
- [ ] **Color Contrast:** 4.5:1 for text, 3:1 for UI components.
- [ ] **Focus Indicator:** Hero CTAs must have a clear focus ring (visible on
      both light and dark backgrounds).
- [ ] **Text Wrapping:** Ensure text doesn't wrap to more than 3-4 lines on
      mobile viewports.
- [ ] **Semantic Markup:** Use `<section class="hero">` or `<header>` for the
      container.
