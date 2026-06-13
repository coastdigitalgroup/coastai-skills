# Timeline Anatomy Blueprint

This blueprint defines the structural and spatial requirements for a robust,
accessible timeline component. Use these specifications to ensure consistency
across different implementations.

## 1. Vertical Activity Log (Standard)

Used for feeds, histories, and logs.

### Structural Anatomy
- **Timeline Container:** `padding-left: 2rem; position: relative;`
- **Vertical Line (The Track):**
    - `position: absolute; left: 0.75rem; top: 0; bottom: 0; width: 2px;`
    - `background-color: var(--color-border-neutral);`
- **Event Item:** `margin-bottom: 2rem; position: relative;`
- **Marker (The Node):**
    - `position: absolute; left: -1.25rem; top: 0.25rem;`
    - `width: 1rem; height: 1rem; border-radius: 50%;`
    - `background: var(--color-bg-page); border: 2px solid var(--color-marker);`

### Spacing & Rhythm
- **Header to First Item:** `1rem`
- **Between Items:** `2rem` (provides clear separation for scanning)
- **Marker to Text:** `1.5rem` horizontal clearance.

---

## 2. Horizontal Milestone Timeline

Used for processes, shipping tracking, or high-level roadmaps.

### Structural Anatomy
- **Container:** `display: flex; align-items: flex-start; overflow-x: auto;`
- **Timeline Item:** `flex: 1; position: relative; min-width: 150px;`
- **Horizontal Line:**
    - `position: absolute; top: 0.5rem; left: 0; right: 0; height: 2px;`
    - `z-index: 0;`
- **Marker:**
    - `width: 1.25rem; height: 1.25rem; margin-bottom: 1rem;`
    - `position: relative; z-index: 1; background: var(--color-bg-page);`

### Responsive Rule
- **Breakpoint (< 768px):** Change container to `flex-direction: column`.
- **Line Flip:** Move horizontal line to become a vertical line on the left.
- **Text Alignment:** Shift from center-aligned (horizontal) to left-aligned
  (vertical).

---

## 3. Design Tokens (Example)

| Token | Recommended Value | Purpose |
| :--- | :--- | :--- |
| `--tl-line-width` | `2px` | Visual weight of the track. |
| `--tl-marker-size-lg` | `24px` | Icons/Avatars (Major events). |
| `--tl-marker-size-sm` | `10px` | Dots (Minor events). |
| `--tl-group-spacing` | `3rem` | Space between different date groups. |
| `--tl-content-gap` | `1rem` | Space between marker and text block. |

## 4. Interaction States

- **Hover (Item):** Subtle background change on the entire event block to
  indicate interactivity.
- **Focus:** If an event is a link, the focus ring should encompass the marker
  AND the text content.
- **Active/Current:** For processes, the "Current Step" marker should have a
  pulsing animation or a distinct high-contrast color.
