# Typography & Iconography i18n Guidelines

## 1. Iconography Mirroring Logic

| Icon Category | Behavior | Examples |
| :--- | :--- | :--- |
| **Directional** | **Mirror** | Arrows (Back/Next), Chevron, Search (if handle is diagonal), Undo/Redo, Planes, Bicycles. |
| **Time-based** | **Mirror** | Progress bars, Sliders, Loading states (if directional). |
| **Clock/Circular** | **Fixed** | Clocks, Reload/Refresh (standard clockwise), Stopwatches. |
| **Media Player** | **Fixed** | Play, Pause, Fast Forward, Rewind, Timeline Progress. |
| **Universal/Literal**| **Fixed** | Checkmarks, Camera, Printer, Attachment (Paperclip), Padlock. |

---

## 2. Script-Specific Typography Guidelines

### CJK (Chinese, Japanese, Korean)
- **Contrast:** Characters are denser; avoid weights that are too thin (hard to see) or too heavy (strokes bleed together).
- **Leading:** Increase line-height to `1.6 - 1.8` to accommodate stroke density.
- **Emphasis:** Use a change in color or a bottom "dot" (emphasis mark) rather than italics.

### Arabic & Persian
- **Vertical Space:** Arabic script has significant ascenders and descenders. Increase line-height to `1.8 - 2.0` for body text.
- **Font-Size:** Small sizes are very difficult to read. Minimum body size should be `18px`.
- **Justification:** Avoid standard "Justify" (which adds space between words). Arabic uses "Kashida" (stretching characters), but for web design, stick to `text-align: right`.

### Devanagari (Hindi, Marathi)
- **Top Bar:** Most characters are connected by a horizontal top bar. Ensure the line-height is sufficient so bars don't touch the line above.
- **Baseline:** The "visual" baseline is the top bar, not the bottom of the characters.

---

## 3. Localization Design Tokens (Logical Properties)

When annotating designs for developers, use these logical terms:

| Absolute Property | Logical Equivalent |
| :--- | :--- |
| `margin-left` | `margin-inline-start` |
| `padding-right` | `padding-inline-end` |
| `border-top-left-radius` | `border-start-start-radius` |
| `float: left` | `float: inline-start` |
| `text-align: right` | `text-align: end` |

---

## 4. Cultural Color Meaning (Reference)

*Note: Use these as awareness, but prioritize brand consistency unless a color is deeply offensive.*

- **Red:** Danger/Stop (Western), Success/Luck (China), Mourning (South Africa).
- **White:** Purity/Peace (Western), Death/Mourning (East Asia).
- **Green:** Nature/Success (Global), Sacred (Middle East), Infidelity (China - "Green Hat").
- **Yellow:** Caution (Western), Royalty (Thailand), Mourning (Egypt).
