# Template: Tab Anatomy Blueprint

Use this blueprint to structure the layers and spacing of a tab component
consistently across your project.

## 1. Structural Layers

```text
[Tablist Container] (role="tablist")
├── [Tab Trigger Group] (The horizontal or vertical row of tabs)
│   ├── [Tab Trigger 1] (role="tab", aria-selected="true")
│   │   ├── Label Text
│   │   └── [Active Indicator] (Underline or Background)
│   ├── [Tab Trigger 2] (role="tab", aria-selected="false")
│   └── ...
└── [Panel Container]
    └── [Tab Panel] (role="tabpanel", aria-labelledby="tab-1")
        └── Content (Text, Images, Grids)
```

## 2. Spacing & Rhythm (Tokens)

| Region | Token | Value (Example) |
| :--- | :--- | :--- |
| **Tablist Outer Margin** | `--space-l` | 32px (Distance from sections) |
| **Inter-Tab Gap** | `--space-m` | 24px (Space between triggers) |
| **Trigger Internal Padding** | `--space-s` | 12px 16px (Touch target area) |
| **Active Indicator Thickness**| `3px` | Constant (Visual weight) |
| **Panel Padding** | `--space-m` | 24px (Breathing room for content) |

## 3. Interaction States Spec

### Default (Inactive)
- **Text:** `--color-text-muted`
- **Background:** Transparent
- **Cursor:** `pointer`

### Hover
- **Text:** `--color-text-default`
- **Background:** `--color-surface-hover` (Subtle gray or tint)
- **Transition:** `background-color 200ms ease`

### Active (Selected)
- **Text:** `--color-action-primary`
- **Weight:** `Bold`
- **Indicator:** 3px solid `--color-action-primary` at bottom edge.

### Focus
- **Outline:** 2px solid `--color-focus-ring`
- **Offset:** 2px (Ensure the ring doesn't touch the text)

## 4. Responsive Mapping

| Viewport | Pattern | Logic |
| :--- | :--- | :--- |
| **Desktop (>900px)** | Horizontal | All tabs visible. |
| **Tablet (600-900px)**| Horizontal | Scrollable if > 4 tabs. |
| **Mobile (<600px)** | Scroll / Accordion | Scroll for simple tabs; Accordion for long content. |
