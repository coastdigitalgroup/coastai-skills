# Media Composition Breakdown

This example demonstrates the application of the **Imagery and Media System** to a standard marketing landing page, focusing on aspect ratios, overlays, and responsive art direction.

## 1. Hero Section: Cinematic Immersion

The Hero section uses a high-impact background image with a text overlay.

### Application:
- **Aspect Ratio:** 21:9 (Desktop) transitioning to 4:5 (Mobile).
- **Legibility Treatment:** 40% linear gradient scrim from bottom-to-top.
- **Focal Point:** Subject centered in the "rule of thirds" right-hand side on desktop, centered on mobile.
- **Composition:** Full-bleed background.

### Visual Diagram:
```text
+---------------------------------------+
|  [SITE HEADER]                        |
|                                       |
|  [H1: CLEAR OVER CLEVER HEADLINE]     |
|  [SUBHEAD: BENEFIT-DRIVEN COPY]       |
|                                       |
|  [PRIMARY CTA]                        |
|                                       |
|          (FOCAL POINT: SUBJECT)       |
|          [Gradated Scrim Overlay]     |
+---------------------------------------+
```

---

## 2. Product Grid: Rhythmic Consistency

A grid of feature cards where each card contains an image.

### Application:
- **Aspect Ratio:** 1:1 (Square) for all cards to ensure perfectly aligned text below.
- **Visual Style:** Minimalist, high-key photography with consistent white backgrounds.
- **Hierarchy:** Image is the "Anchor" (Priority 1).
- **Constraint:** All cards in the row have equal heights, and images never stretch.

---

## 3. Editorial Storytelling: Art-Directed Crop

A "50/50 Split" section where content and media sit side-by-side.

### Application:
- **Desktop (Split):** 3:2 landscape image on the left, text on the right.
- **Mobile (Stack):** The image pivots to a 16:9 crop to save vertical space while keeping the focal point (e.g., a person's face) centered.
- **Composition:** Inset media (stays within the 12-column grid).

### Art Direction Logic:
| Viewport | Container Ratio | Image Crop | object-position |
| :--- | :--- | :--- | :--- |
| **Desktop** | 1/2 Grid Width | 3:2 | center center |
| **Tablet** | 1/2 Grid Width | 3:2 | center center |
| **Mobile** | Full Width | 16:9 | 50% 20% (Top-heavy) |

---

## 4. Legibility Comparison: Scrim vs. No Scrim

| Scenario | Text Color | Treatment | Result |
| :--- | :--- | :--- | :--- |
| **No Scrim** | White | None | **FAIL:** Text disappears on white clouds in background. |
| **Solid Overlay** | White | 50% Black Solid | **PASS:** Legible, but image feels "buried." |
| **Gradated Scrim** | White | 0% -> 40% Black | **WIN:** Text is legible (4.6:1 contrast) while image remains vibrant. |
