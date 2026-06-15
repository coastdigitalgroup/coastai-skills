# Timeline Anatomy Blueprint

Use this blueprint to structure vertical timelines consistently across your
project. This template defines the spatial relationships between the thread,
nodes, and content.

## Structural Components

### 1. The Container (`.timeline`)
- **Padding-left:** Space for the thread (usually 2rem - 4rem).
- **Position:** `relative` (to anchor the thread).

### 2. The Thread (`.timeline::before`)
- **Width:** 2px.
- **Position:** `absolute`, `left: 1rem`, `top: 0`, `bottom: 0`.
- **Color:** Neutral muted (e.g., `#E2E8F0`).

### 3. The Event Item (`.timeline-item`)
- **Margin-bottom:** Spacing between events (e.g., `--space-l`).
- **Position:** `relative`.

### 4. The Node (`.timeline-node`)
- **Dimensions:** 12px x 12px (min).
- **Position:** `absolute`, `left: -0.5rem` (centered on thread).
- **Z-Index:** 1.
- **Visuals:** Border, Background, or Icon.

### 5. The Content Block (`.timeline-content`)
- **Alignment:** Left-aligned (standard) or centered.
- **Components:**
    - `.timeline-header`: Title + Timestamp.
    - `.timeline-body`: Descriptive text.
    - `.timeline-footer`: Actions/Buttons.

## Annotation Template

| Element | Requirement | Token Suggestion |
| :--- | :--- | :--- |
| **Thread** | 2px wide, continuous | `--color-neutral-300` |
| **Node (Minor)** | 8px dot | `--color-neutral-400` |
| **Node (Major)** | 16px circle + icon | `--color-brand-primary` |
| **Date Label** | Sticky or persistent | `--font-size-sm`, `--font-weight-bold` |
| **Vertical Gap** | Spacing between items | `--space-l` (24px - 32px) |
| **Horizontal Gap** | Space between node and text | `--space-m` (16px - 20px) |

## Implementation Checklist

- [ ] Is the thread continuous through the last item?
- [ ] Do nodes align perfectly with the center of the thread?
- [ ] Is the vertical rhythm consistent across all items?
- [ ] Are date headings distinct from event titles?
- [ ] Does the layout collapse to a single column for mobile?
- [ ] Is the "active" or "latest" event visually highlighted?
