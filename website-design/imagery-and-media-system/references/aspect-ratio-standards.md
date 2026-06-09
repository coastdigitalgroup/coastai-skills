# Aspect Ratio Standards

A guide to common aspect ratios and their psychological and functional impact in web design.

## 1. Cinematic & Ultrawide (21:9 to 16:9)

- **Psychology:** Feels modern, expensive, and immersive. Mimics film.
- **Best For:**
  - Hero sections with minimal text.
  - Video backgrounds.
  - High-end architecture or landscape photography.
- **Constraint:** Hard to maintain focal points on mobile without significant cropping.

## 2. Standard Landscape (3:2 to 4:3)

- **Psychology:** Familiar, comfortable, feels like traditional "photography."
- **Best For:**
  - Blog post thumbnails.
  - Team member photos (group shots).
  - Documentation and "How-it-works" steps.
- **Constraint:** Can feel a bit "dated" if used for primary hero sections.

## 3. The Square (1:1)

- **Psychology:** Balanced, stable, efficient. Optimized for social media patterns.
- **Best For:**
  - Product listing grids (E-commerce).
  - User avatars.
  - Icon blocks.
- **Constraint:** Not ideal for showing wide context (like a room or a landscape).

## 4. Portrait & Social (4:5 to 9:16)

- **Psychology:** Urgent, personal, mobile-native.
- **Best For:**
  - Testimonial portraits.
  - "Mobile-first" landing page heroes.
  - Tall feature cards.
- **Constraint:** Takes up significant vertical space on desktop; use sparingly in grids.

## Contrast Heuristics for Text Overlays

| Background Brightness | Text Color | Required Scrim Opacity |
| :--- | :--- | :--- |
| **Dark (0-30%)** | White | 0% (None needed) |
| **Mid (30-60%)** | White | 20-30% Black |
| **Light (60-100%)** | White | 40-60% Black (or use Black text) |
| **Busy/Vibrant** | White | 30% Black + 8px Blur |

---

## Art Direction: Focal Points

When using `object-fit: cover`, the focal point determines which part of the image remains visible as the container changes shape.

- **Center (Default):** Good for abstract images.
- **Top:** Best for portraits (keeps the face visible).
- **Left/Right:** Best for images with "offset" subjects (common in heroes).
- **Bottom:** Best for images where the ground or base is the primary subject.
