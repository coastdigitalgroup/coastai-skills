# Hero Composition Patterns

A reference for common visual treatments and composition strategies for hero sections.

## 1. Composition Patterns

### The Split (50/50)
- **Best for:** SaaS, Product Features, Informational Landing Pages.
- **Why:** Keeps text scannable and separates it from busy product imagery.
- **Rule:** The image should be at least as tall as the text block.

### The Full-Bleed Centered
- **Best for:** Branding, Portfolios, Event Pages.
- **Why:** Maximum visual impact; feels immersive.
- **Rule:** Requires a "Text Protection" layer (scrim) if the background is dynamic.

### The Overlap
- **Best for:** Creative Agencies, Fashion, Editorial.
- **Why:** Adds depth and a "designer" feel.
- **Rule:** Ensure the text and background maintain contrast at the overlap point.

## 2. Text Legibility Treatments

| Treatment | Description | When to use |
| :--- | :--- | :--- |
| **Full Scrim** | A semi-transparent overlay over the entire image. | Busy backgrounds with many colors. |
| **Directional Gradient** | Fades from 60% opacity to 0%. | Focal point is on one side; text is on the other. |
| **Vignette** | Darkening only the edges of the image. | Centered text where the image subject is also centered. |
| **Backdrop Blur** | Applying `backdrop-filter: blur()` behind the text. | Modern, glassmorphism feel; works well with bright colors. |

## 3. Aspect Ratio Matrix

| Device | Hero Height | Ratio |
| :--- | :--- | :--- |
| **Desktop** | 600px - 900px | 16:9 or 21:9 |
| **Tablet** | 500px - 700px | 4:3 or 3:2 |
| **Mobile** | 400px - 600px | 1:1 or 4:5 |

## 4. Accessibility Checkpoints

1. **Color Contrast:** Use the "Check Contrast" tool on the *lightest* part of the background where text sits.
2. **Motion:** If hero video exists, it must not autoplay if the user has `prefers-reduced-motion` enabled.
3. **Hierarchy:** The H1 must be the *first* heading in the document after the navigation.
