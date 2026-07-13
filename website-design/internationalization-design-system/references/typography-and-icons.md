# Typography and Iconography Guidelines

## Multi-Script Typography Rules

When designing for global audiences, a single Latin-only font is insufficient.
Follow these rules for building a robust multi-script typography system.

### 1. The Script-Specific Leading Scale
Standard Latin leading (1.5) is often too tight for other scripts.

| Script Family | Suggested Leading | Reason |
| :------------ | :---------------- | :----- |
| Latin / Cyrillic | 1.5 - 1.6 | Standard density. |
| Arabic | 1.8 - 2.0 | High vertical complexity; prevents clashes. |
| CJK (Chinese, Jap, Kor) | 1.7 - 1.8 | Dense block-like characters need breathing room. |
| Thai / Indic | 1.9 - 2.1 | Numerous ascenders, descenders, and tone marks. |

### 2. Minimum Legibility Sizes
Some scripts become unreadable much faster than Latin when scaled down.

- **Latin/Cyrillic:** 10px (minimum readable), 16px (standard body).
- **Arabic:** 14px (minimum readable), 18px (standard body).
- **CJK:** 12px (minimum readable), 16px (standard body).

## Directional Iconography Rules

### Icons that MUST flip in RTL
Flipping these icons ensures that the "sense of progress" matches the reading
direction.

- **Directional Indicators:** Single arrows (→), double arrows (»), chevrons (>).
- **Progress Icons:** Back/Forward buttons, undo/redo, pagination triggers.
- **Reading/Writing Path:** Pencils/Pens (angled to the start), magnifying
  glasses (if the handle implies a scan direction), document icons with text lines.

### Icons that MUST NOT flip in RTL
These icons are either universal, based on hardware, or would lose their
meaning if mirrored.

- **Media Controls:** Play, Pause, Fast Forward, Rewind.
- **Universal Symbols:** Search (magnifying glass), Settings (gear), Checkmarks,
  Home (if symmetrical), Camera, Print.
- **Asymmetrical Logos:** Brand logos should remain as designed unless a
  localized version exists.

## CSS Implementation Tip: Logical Properties
To avoid maintaining two separate stylesheets for LTR and RTL, use CSS Logical
Properties.

```css
/* Instead of: */
.card {
  margin-left: 20px;
  border-left: 5px solid blue;
  text-align: left;
}

/* Use: */
.card {
  margin-inline-start: 20px;
  border-inline-start: 5px solid blue;
  text-align: start;
}
```
This automatically mirrors the layout when the parent container has `dir="rtl"`.
