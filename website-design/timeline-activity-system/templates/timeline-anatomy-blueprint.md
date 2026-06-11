# Template: Timeline Anatomy Blueprint

Use this blueprint to structure your timeline components. It ensures consistent spacing, alignment, and accessible hierarchy.

## Structural Anatomy

```text
[ GROUP HEADER ] (e.g., "October 2023")
      |
      |--- [ TIME MARKER ] --- [ EVENT CONTENT ]
      |          |               |-- [ TITLE / LEAD ]
      |          |               |-- [ DESCRIPTION ]
      |          |               |-- [ METADATA / TAGS ]
      |          |
      |--- [ TIME MARKER ] --- [ EVENT CONTENT ]
      |
 (CONTINUOUS TRACK)
```

## CSS / Spacing Guidelines (Annotated)

### 1. The Container
- `display: flex; flex-direction: column;`
- `position: relative;` (to anchor the absolute track line).

### 2. The Track Line
- `position: absolute; left: 20px; top: 0; bottom: 0; width: 2px; background: var(--track-color);`
- **Rule:** Stop the line at the last marker to avoid "dangling" tracks.

### 3. The Event Row
- `display: grid; grid-template-columns: 40px 1fr; gap: 16px; margin-bottom: 32px;`
- `align-items: start;`

### 4. The Marker (Node)
- `width: 12px; height: 12px; border-radius: 50%; z-index: 1;`
- `margin-top: 6px;` (to align with the first line of text).

## Component States Checklist

| State | Line Style | Marker Style | Text Style |
| :--- | :--- | :--- | :--- |
| **Completed** | Solid | Filled / Icon | Default |
| **Current** | Solid | Large / Halo | Bold / Primary |
| **Upcoming** | Dashed | Hollow / Dot | Muted / Gray |
| **Error** | Solid | Warning Icon | Red Title |

## Accessibility Annotations
- Use `<ul>` and `<li>` for the list of events.
- Each major date/group should use an `<h3>`.
- The track line should be hidden from screen readers (`aria-hidden="true"`).
- Interactive nodes must have `role="button"` and an `aria-label`.
