# Media Anatomy Blueprint

Use this blueprint to annotate media requirements for implementation and to ensure design consistency across a system.

## 1. Aspect Ratio Tokens

Standardize your project by selecting from these tokens.

| Token | Ratio | Visual Use Case | CSS Property |
| :--- | :--- | :--- | :--- |
| `ratio-cinematic` | 21:9 | Immersive Hero, Video Backgrounds | `aspect-ratio: 21 / 9` |
| `ratio-wide` | 16:9 | Standard Video, Large Feature Blocks | `aspect-ratio: 16 / 9` |
| `ratio-standard` | 4:3 | Blog Cards, General Photography | `aspect-ratio: 4 / 3` |
| `ratio-square` | 1:1 | Product Grids, User Avatars | `aspect-ratio: 1 / 1` |
| `ratio-portrait` | 4:5 | Mobile Heroes, Person Biographies | `aspect-ratio: 4 / 5` |

---

## 2. Overlay & Scrim Specs

Annotate your overlay requirements for developers using these patterns.

### Pattern A: The Bottom-Up Scrim (Content at bottom)
- **Background:** `linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 50%)`
- **Text Color:** `#FFFFFF` (White)
- **Contrast Check:** Verify at least 4.5:1 against the darkest part of the gradient.

### Pattern B: The Full Scrim (High-noise backgrounds)
- **Background:** `rgba(0,0,0,0.4)` (Solid 40% black)
- **Blur (Optional):** `backdrop-filter: blur(8px)`
- **Text Color:** `#FFFFFF`

---

## 3. Art Direction Annotation Template

Copy and fill this for any art-directed image component.

```markdown
### Component: [Component Name]
- **Desktop Ratio:** [e.g., 21:9]
- **Mobile Ratio:** [e.g., 1:1]
- **Focal Point (Desktop):** [e.g., Right 33%]
- **Focal Point (Mobile):** [e.g., Center]
- **Treatment:** [e.g., 30% Dark Scrim]
- **Behavior:** `object-fit: cover`
```

---

## 4. Media Composition Rules

1. **Alignment:** All images in a grid row must share the same `aspect-ratio`.
2. **Spacing:** Images should follow the `fluid-spacing-system` for margins and paddings.
3. **Hierarchy:** High-impact (Hero) images should use full-bleed or wide-aspect ratios. Supporting images should use standard or square ratios.
4. **Consistency:** All photographs must follow the brand's [Tonal/Color] treatment.
