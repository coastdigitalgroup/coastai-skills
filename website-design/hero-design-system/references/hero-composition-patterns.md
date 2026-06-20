# Hero Composition Patterns

A reference guide for choosing and scaling the visual arrangement of hero
sections.

## 1. Composition Comparison Matrix

| Pattern | Best For | Visual Weight | Mobile Logic |
| :--- | :--- | :--- | :--- |
| **Split 50/50** | Product Demos, SaaS | Balanced | Stack (Visual Top) |
| **Centered Stack** | Brand Story, Marketing | High (Visual) | Centered Vertical |
| **Visual Background** | Immersive Experiences | Very High | Overlay (Scrim req.) |
| **Offset Card** | Feature Highlights | Depth/Layers | Stack (Card Top) |

## 2. Responsive Scaling Rules

### Aspect Ratios for Hero Media
- **Desktop (Landscape):** 16:9 or 21:9 (Cinematic)
- **Tablet (Square):** 1:1 or 4:3
- **Mobile (Portrait):** 4:5 or 9:16 (Maximize vertical space)

### Content Scaling (Fluid Typography)
Heroes should use larger scales than body sections:
- **H1 Desktop:** 4rem - 6rem (`64px - 96px`)
- **H1 Mobile:** 2.5rem - 3rem (`40px - 48px`)
- **Subhead Desktop:** 1.25rem - 1.5rem (`20px - 24px`)

## 3. The "Legibility Layer" (Scrim) Reference

When text sits on imagery, use these standard opacity values:

- **Light Overlay (Info):** 10-20% opacity. Best for subtle textures.
- **Medium Overlay (Standard):** 30-40% opacity. Necessary for photography.
- **Heavy Overlay (High-Key):** 50-70% opacity. Required for light/bright photos
  or high-contrast busy images.
- **Gradient Fade:** `transparent 0%` to `rgba(0,0,0,0.8) 100%`. Best for keeping
  the subject clear while making text pop at the bottom/top.

## 4. Interaction Affordances

- **Scroll Indicator:** A subtle arrow or "Scroll" text at the bottom-center
  (`bottom: 2rem`) to signal more content below the fold.
- **Hover Transitions:** Hero visuals should have subtle entry animations
  (e.g., `fade-in-up`, `300ms`) to establish premium feel.
