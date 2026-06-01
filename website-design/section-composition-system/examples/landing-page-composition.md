# Example: SaaS Landing Page Composition

This breakdown demonstrates how the Section Composition System is applied to a
SaaS "Project Management" landing page to maintain rhythm and flow.

## Section Sequence Map

| Order | Section Type | Layout Pattern | Background | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| 1 | **Hero** | Centered Stack | White | Awareness & Primary Action |
| 2 | **Logo Cloud** | Horizontal Row | White | Initial Trust/Social Proof |
| 3 | **Core Benefit 1** | Split (Media Right) | Light Gray | Education (Topic A) |
| 4 | **Core Benefit 2** | Split (Media Left) | Light Gray | Education (Topic B) |
| 5 | **Quote** | Centered Text | Dark Brand | "Breaker" / High-impact proof |
| 6 | **Features** | 3-Column Grid | White | Secondary Details |
| 7 | **FAQ** | Accordion List | White | Objection Handling |
| 8 | **Final CTA** | Centered Stack | Light Gray | Conversion |

## Detailed Section Breakdown

### 1. The Hero (Pattern: Centered Stack)
- **Hierarchy:** H1 (Level 1), Subhead (Level 2), Button (Level 1).
- **Composition:** High-contrast text against a clean white background. Uses large
  vertical padding (`--space-3xl`) to establish importance.

### 3 & 4. The Benefit Zig-Zag (Pattern: Split 50/50)
- **Logic:** Section 3 has text on the left and a UI screenshot on the right.
  Section 4 flips this (Media Left, Text Right).
- **Transition:** Both sections share the same `Light Gray` background, grouping
  them as "The Core Value Proposition" unit.
- **Mobile Rule:** Both sections stack with **Media on Top**, ensuring a
  consistent "See it, then Read about it" rhythm on phones.

### 5. The "Breaker" Quote (Pattern: Centered Text)
- **Transition:** Sudden shift to a **Dark Brand** background.
- **Visuals:** Large typography (Display size) with no images. This forces the
  user to slow down and read the key testimonial.

### 6. The Feature Grid (Pattern: 3-Column Grid)
- **Transition:** Shift back to **White** background.
- **Logic:** Uses the `card-ui-system` within a 3-column grid to show secondary
  features (e.g., "Mobile App," "API Access," "24/7 Support").
- **Spacing:** Slightly less vertical padding than the Hero to indicate these are
  supporting details.

## Visual Transition Audit

- **Rhythm Check:** White (1,2) -> Light Gray (3,4) -> Dark (5) -> White (6,7) -> Light Gray (8).
- **Pattern Check:** Centered -> Row -> Split R -> Split L -> Centered -> Grid -> List -> Centered.
- **Result:** No pattern or background is repeated more than twice in succession,
  minimizing visual fatigue.
