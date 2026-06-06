# Skeleton Design Heuristics & References

## 1. Perceived Performance Rules
Research shows that the design of a loading state significantly impacts how
users perceive the speed of a site.

- **Movement direction:** Always animate shimmer from **Left to Right**. This
  mimics the natural reading direction in LTR languages and feels "forward-moving."
- **Speed:** The ideal shimmer duration is between **1s and 2s**. Any faster
  can feel anxious/stuttery; any slower can feel like the site is frozen.
- **Synchronization:** When multiple items are loading (like a grid),
  synchronizing their shimmer animations reduces visual noise and cognitive load.

## 2. Bone Sizing Guidelines (Text)
To make text skeletons look realistic without being distracting, follow these
spacing rules:

| Text Type | Bone Height | Bone Width Logic |
| :--- | :--- | :--- |
| **H1 Headline** | 32-40px | 60% to 80% |
| **Body Paragraph** | 16-18px | 3 lines: 100%, 95%, 60% |
| **Metadata/Small** | 12-14px | 20% to 40% |

## 3. Color & Contrast (Accessibility)
Skeletons should be visible but non-intrusive.

- **Base Color:** Use a light neutral like `gray-200` (#E5E7EB) on white
  backgrounds.
- **Contrast Ratio:** While bones are decorative, they should have enough
  contrast to be visible on the background (approx 1.5:1 to 2:1 is usually
  enough for purely decorative shapes).
- **Dark Mode:** In dark mode, reverse the logic: use a dark gray base
  (`gray-800`) with a slightly lighter shimmer (`gray-700`).

## 4. Key Metric: CLS Impact
A well-designed skeleton should result in a **Cumulative Layout Shift (CLS)
score of 0.0**.

- **Formula:** `Distance Fraction * Impact Fraction = 0`.
- **Technique:** Use CSS `aspect-ratio` on all image/video bones to ensure the
  vertical space is reserved exactly.

## 5. Technical References
- [WCAG 2.1 - 4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html) (Regarding ARIA states).
- [Google Web Dev - Optimize CLS](https://web.dev/cls/) (Regarding layout stability).
