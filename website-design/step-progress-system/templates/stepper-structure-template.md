# Template: Stepper Anatomy & Annotation

Use this template to specify the structure and behavior of a progress indicator
for developers or when building a component library.

## 1. Structural Anatomy

```text
[ (A) INDICATOR ] ---- (B) CONNECTOR ---- [ (C) INDICATOR ]
       |                                         |
  (D) PRIMARY LABEL                         (D) PRIMARY LABEL
       |                                         |
 (E) SECONDARY LABEL                       (E) SECONDARY LABEL
```

- **(A) Indicator:** The visual anchor (Circle, Square, Icon, or Number).
- **(B) Connector:** The line or space between steps. Its color should change
  based on the state of the *preceding* step.
- **(C) State Indicator:** Distinct visuals for Pending, Active, Completed,
  and Error.
- **(D) Primary Label:** The name of the step (e.g., "Account Details").
- **(E) Secondary Label:** (Optional) Contextual info (e.g., "5 mins left" or
  "Completed").

## 2. Layout Logic

- **Horizontal (Desktop):**
  - Justification: Space-between.
  - Alignment: Center-aligned indicators and labels.
  - Max Width: 800px (to prevent labels from being too far apart).
- **Vertical (Mobile/Sidebars):**
  - Justification: Start-aligned.
  - Connector: Vertical line on the left or right of the indicator.
  - Spacing: 32px between indicators.

## 3. State Table Template

| Component Part | Pending (Upcoming) | Active (Current) | Completed (Past) |
| :--- | :--- | :--- | :--- |
| **Indicator Fill** | Transparent / White | Brand Primary | Brand Secondary |
| **Indicator Border**| 2px Muted Grey | 2px Brand Primary | None |
| **Indicator Text** | Muted Grey | White | None (Check icon) |
| **Primary Label** | Muted Grey | High Contrast Black | Mid Contrast Grey |
| **Connector Line** | Muted Grey | Muted Grey | Brand Primary |

## 4. Interaction Annotations

- [ ] **Completed Steps:** Clickable? (Yes/No) -> Should trigger `history.back()` or router push.
- [ ] **Active Step:** Non-clickable.
- [ ] **Upcoming Steps:** Disabled until validation of current step is met.
- [ ] **Hover State:** Only apply hover effects to clickable (completed) steps.
