# Color and Accessibility Logic

## Why Color Alone Is Not Enough

Color communicates intent quickly, but users with color vision deficiencies may miss distinctions. Badges and tags should combine:
- Text labels
- Optional iconography
- Shape/border differences where useful

## WCAG Contrast Targets

- Normal text: **4.5:1** minimum
- Large text (18pt+ or 14pt bold+): **3:1** minimum
- Non-text UI indicators/focus outlines: **3:1** against adjacent colors

## Semantic Color Mapping Guidance

| Meaning | Recommended Hue | Notes |
|---------|------------------|-------|
| Success / Positive | Green | Pair with check icon when critical |
| Warning / Attention | Amber/Yellow | Ensure sufficient text contrast |
| Error / Destructive | Red | Avoid red-only distinction |
| Info / Neutral | Blue or Gray | Prefer blue for info, gray for neutral states |

## Badge vs Tag Emphasis Strategy

- **Badge (status):** Higher emphasis; stronger fill and contrast.
- **Tag (category/filter):** Lower emphasis; lighter tones or outlines.
- Preserve hierarchy so status signals remain visually dominant.

## Focus and Interaction Accessibility

- Interactive tags must have:
  - Keyboard focus ring with 3:1 contrast.
  - Clear hover and pressed states.
  - Screen-reader labels for remove actions (e.g., `Remove tag: Marketing`).

## Validation Steps

1. Verify contrast ratios using automated tooling (design plugin or accessibility checker).
2. Simulate grayscale/color-blind views to confirm distinguishability.
3. Test keyboard-only operation for removable/selectable tags.
4. Confirm semantic text remains visible at all responsive sizes.
