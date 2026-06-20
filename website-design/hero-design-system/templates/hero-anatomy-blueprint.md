# Hero Anatomy Blueprint

Use this blueprint to structure the visual and spatial zones of a hero section.
This template ensures that layering, spacing, and hierarchy are considered
before implementation.

## 1. Structural Zones

| Zone | Content Type | Alignment Rule |
| :--- | :--- | :--- |
| **Zone A: Intro** | Eyebrow text, badges, or announcements | Top-aligned to H1 |
| **Zone B: Core** | H1 Headline and Subheadline | Centered or Left-aligned |
| **Zone C: Action** | Primary/Secondary CTAs, trust signals | Below Core, grouped |
| **Zone D: Anchor** | Images, Video, Illustration, or 3D assets | Opposite or Background |

## 2. Layering Stack (Z-Index)

1.  **Level 0 (Background):** Base color or abstract texture.
2.  **Level 1 (Media):** The focal visual asset (Anchor).
3.  **Level 2 (Legibility):** Scrims, gradients, or backdrop blurs.
4.  **Level 3 (Content):** Headline, Subhead, and Actions.
5.  **Level 4 (Foreground):** (Optional) Floating elements or "floating" cards
    that overlap the core content for depth.

## 3. Standard Composition Specs

### The "Balanced Split" (Desktop)
- **Container:** Max-width: 1280px.
- **Left Column (Text):** 6/12 columns.
- **Right Column (Media):** 6/12 columns.
- **Internal Padding:** `padding: var(--space-3xl) 0;`

### The "Centered Impact" (Desktop)
- **Content Wrapper:** Max-width: 800px.
- **Alignment:** `margin: 0 auto; text-align: center;`
- **Background Media:** Full-bleed (`width: 100vw;`).

## 4. Annotation Template

When handing off a hero design to developers, annotate with the following:

- **[H1-Style]:** Font-size, weight, line-height (e.g., `Display-XL`).
- **[Spacing-Gap-1]:** Distance between H1 and Subhead (e.g., `--space-m`).
- **[Overlay-Value]:** Gradient direction and opacity (e.g., `linear-gradient(to top, rgba(0,0,0,0.6), transparent)`).
- **[Mobile-Stack]:** Define if media moves to TOP or BOTTOM of the content.
- **[Focal-Point]:** CSS `object-position` value (e.g., `center 20%`).
