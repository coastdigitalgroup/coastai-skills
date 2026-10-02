# Stepper and Wizard Anatomy and UX Reference Rules

This reference guide details structural specifications, ARIA accessibility semantics, responsive breakpoint adaptations, and error validation mechanics for multi-step wizards and steppers.

---

## 1. Component Anatomy & Terminology

```text
[1] STEPPER HEADER NAVIGATION (Container: <nav aria-label="...">)
 ┌────────────────────────────────────────────────────────────────────────┐
 │  (✓) Step 1           (2) Step 2              (3) Step 3               │
 │  Completed             Active                  Upcoming                │
 └────────────────────────────────────────────────────────────────────────┘
     │                    │                       │
    [1a] Completed Node  [1b] Active Node         [1c] Upcoming Node
                         (aria-current="step")

[2] WIZARD CANVAS PANEL
 ┌────────────────────────────────────────────────────────────────────────┐
 │ [2a] Panel Heading: <h2> Step Title (tabindex="-1")                   │
 │ [2b] Panel Subheading / Instructions                                  │
 │                                                                        │
 │ [2c] Form Control Groups & Field Set Input Fields                      │
 │ [2d] Inline Error Messaging Area                                       │
 └────────────────────────────────────────────────────────────────────────┘

[3] ACTION DOCK FOOTER
 ┌────────────────────────────────────────────────────────────────────────┐
 │ [3a] Secondary CTA ("Back")        [3b] Primary CTA ("Next / Submit")  │
 └────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Accessibility & ARIA Specifications

To achieve WCAG 2.1 AA compliance across screen readers and keyboard navigation, multi-step wizards must adhere to these rules:

### A. Navigation & List Structure
- **Container:** Enclose step progress indicators in `<nav aria-label="Registration progress">`.
- **List Hierarchy:** Group individual step items inside an `<ol>` (ordered list) element to convey step count and sequence position to assistive technology.
- **Active State Indicator:** Mark the current step button with `aria-current="step"`. Never rely solely on color or CSS classes (`.active`).
- **Completed Nodes:** Ensure completed step buttons remain focusable and clickable so keyboard users can navigate backward.
- **Disabled Nodes:** Apply `disabled` or `aria-disabled="true"` to future unreached steps in strict linear workflows.

### B. Keyboard Focus Management
1. **Step Transition:** When advancing from Step $N$ to Step $N+1$, do not leave focus on the "Next" button in the action dock. Move DOM focus to the panel heading (`<h2 tabindex="-1">`) of the newly active panel.
2. **Error Trapping:** If validation fails on "Next", shift focus to the first invalid input element or an `aria-live="assertive"` error summary banner.
3. **Screen Reader Announcements:** Place a hidden `div` with `aria-live="polite"` at the document root to announce step changes (e.g., *"Step 2 of 4: Delivery Options loaded"*).

---

## 3. Form Chunking & Field Grouping Rules

When chunking a complex form across wizard steps, apply the following design rules:

- **Maximum 5 Steps:** Keep total wizard steps between 3 and 5. If a workflow exceeds 5 steps, reconsider form necessity or consolidate related inputs.
- **Uniform Density:** Maintain balanced cognitive weight across panels. Avoid putting 12 fields in Step 1 and only 1 field in Step 2.
- **High-Confidence Priming:** Place straightforward, low-friction questions in Step 1 (e.g., account type, email) to establish completion momentum before requesting complex financial or technical inputs.
- **State Preservation on Back:** Returning to prior steps MUST preserve all previously inputted data. Never reset form fields when a user clicks "Back".

---

## 4. Responsive Breakpoint Matrix

| Viewport Width | Stepper Style | Dock Position | Panel Width |
| :--- | :--- | :--- | :--- |
| **Desktop ($\ge 1024\text{px}$)** | Full Horizontal Header with Titles & Badges | Inline inside Panel Footer | Fixed $640\text{px} - 720\text{px}$ centered |
| **Tablet ($768\text{px} - 1023\text{px}$)** | Horizontal Header with Badges & Short Titles | Inline inside Panel Footer | $100\%$ width ($32\text{px}$ padding) |
| **Mobile ($< 768\text{px}$)** | Compact Bar Header ("Step 2 of 4" + Progress Bar) | Sticky / Fixed Viewport Bottom | $100\%$ width ($16\text{px}$ padding) |

---

## 5. Decision Tree: Wizard Type Selection

```text
Do users need to answer questions in sequential order?
 ├── YES ──► Are future steps dependent on answers in earlier steps?
 │            ├── YES ──► Branching Wizard System
 │            └── NO  ──► Strict Linear Stepper
 └── NO  ──► Is sequence strictly required by business logic?
              ├── YES ──► Non-Linear Stepper with Jump Navigation
              └── NO  ──► Multi-Tab Form (Use tab-ui-system or settings-interface-system)
```
