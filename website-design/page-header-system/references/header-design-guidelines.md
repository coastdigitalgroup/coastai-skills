# Page Header Design Guidelines

This reference documents the patterns, accessibility requirements, and spatial
rules for effective page-level headers.

## Header Patterns

### 1. The Fixed (Sticky) Header
- **When to Use:** When the page contains critical actions (Save, Publish,
  Export) that must be accessible at all times during long-form editing or data
  entry.
- **Design Rule:** Must have a background color or blur effect to remain
  legible over scrolled content.

### 2. The Transparent Hero Header
- **When to Use:** Top-level landing pages where the header sits over a large
  background image.
- **Design Rule:** Ensure text contrast (WCAG AA) against all possible image
  variations, often using a subtle dark overlay or text shadow.

### 3. The Minimal Header
- **When to Use:** Settings pages or sub-sections where the parent navigation
  already provide enough context.
- **Design Rule:** Focus purely on the Title (H1) and a "Save" button.

---

## Accessibility Requirements

### Semantic Landmarks
```html
<!-- CORRECT -->
<header>
  <nav aria-label="Breadcrumb">...</nav>
  <h1>Page Title</h1>
</header>

<!-- INCORRECT -->
<div class="top-area">
  <div class="crumbs">...</div>
  <div class="title">Page Title</div> <!-- Missing H1 -->
</div>
```

### Keyboard & Focus
- **Tab Order:** Breadcrumbs should come before the H1, and Actions should come
  after the H1 in the DOM order.
- **Skip Links:** If the page header is very large, ensure the site's "Skip to
  Content" link lands at the start of the Page Header or immediately after it.

---

## Spatial Guidelines (Rhythm)

Use your project's `fluid-spacing-system` tokens for consistency:

| Element | Recommended Spacing | Purpose |
| :--- | :--- | :--- |
| **Top Padding** | `--space-l` | Clearance from the site navigation |
| **Bottom Padding** | `--space-m` | Separation from the page content |
| **Breadcrumb Gap** | `--space-xs` | Proximity to the Title |
| **Action Gap** | `--space-s` | Grouping related buttons |

---

## Responsive Breakpoints

- **Below 640px (Mobile):**
  - Stack Metadata below the Title.
  - Collapse secondary actions into an overflow (kebab) menu.
  - Switch breadcrumbs to a single "Back" link.
- **Above 1024px (Desktop):**
  - Use a split layout (Title on left, Actions on right).
  - Show all primary and secondary actions.
  - Display full breadcrumb path.
