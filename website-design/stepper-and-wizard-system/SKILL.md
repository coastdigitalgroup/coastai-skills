---
name: stepper-and-wizard-system
description:
  Design, structure, and visually chunk multi-step workflows, linear and branching wizard flows, steppers, and multi-step forms with responsive layout adaptation, explicit state indicators, WCAG AA accessibility, and progress tracking.
---

# Stepper and Wizard Design System

## Purpose

The Stepper and Wizard Design System provides a standardized framework for structuring, visually chunking, and guiding users through multi-step workflows, complex setup wizards, multi-page forms, and sequential web processes.

Without a dedicated design system for steppers and wizards, applications suffer from high drop-off rates due to cognitive overload, ambiguous step progression, loss of user input state on navigation, truncated or overlapping labels on mobile viewports, unannounced screen reader state changes, and inaccessible keyboard focus order.

This system establishes spatial geometry rules, layout selection matrices (horizontal, vertical, accordion, and mobile summary steppers), state token standards (Pending, Current, Completed, Error, and Disabled), branching logic rules, responsive viewport breakpoints, keyboard interaction protocols (`aria-current="step"`), and non-color state indicator guidelines.

## Use Cases

- **SaaS Account Onboarding & Workspace Setup:** Guiding new users through team invitation, workspace customization, billing tier selection, and integration connections.
- **E-Commerce Checkout Workflows:** Structuring sequential checkout phases including Shipping Address, Delivery Method, Payment Details, and Order Review.
- **Financial & Loan Applications:** Breaking down extensive data-gathering flows (Personal Info, Employment History, Income Verification, Loan Terms, e-Signature) into digestible sequential steps.
- **Enterprise Configuration & Deployment Wizards:** Guiding DevOps or IT administrators through multi-stage cloud resource provisioning, policy assignment, and deployment confirmation.
- **Multi-Step Survey & Audit Forms:** Chunking complex questionnaires into categorical sections with progress feedback and intermediate save states.

## When NOT to Use

- **Short Forms (1 to 3 Fields):** For simple login, contact, or single-action forms, a stepper adds unnecessary visual clutter and navigation overhead. Use standard single-page form layouts (`form-design-system`).
- **Non-Linear / Unordered Tab Navigation:** When users can jump freely between independent sections in any arbitrary order without dependencies, use `tab-ui-system` or `sidebar-navigation-system`.
- **Continuous / Unbounded Page Scroll:** For infinite content feeds or long documentation pages, use `table-of-contents-system` or `pagination-system`.
- **System-Driven Loading / Upload Bars:** For passive, system-calculated operations (file conversion, software installation, page loading) without user input at each stage, use `step-progress-system` or continuous progress bars.

## Inputs

1. **Workflow Inventory & Hierarchy:** List of discrete step titles, subtitles, input fields, and required user actions.
2. **Flow Linearity:** Linear progression (Step 1 -> Step 2 -> Step 3) vs. Branching dynamic progression (Step 2 selection alters Step 3 requirements).
3. **Data Dependency & Validation Policy:** Step-level validation requirements (strict gatekeeper validation vs. optional draft saving and flexible step navigation).
4. **Layout Context & Screen Real Estate:** Full-screen wizard container vs. embedded card stepper vs. modal dialog workflow.
5. **Brand & Design Tokens:** Primary action colors, surface fills, border tokens, typography scale, icon set, and spatial spacing grid.

## Outputs

1. **Stepper Spatial Layout Spec:** Pixel-accurate dimensions for step indicators, node diameters (e.g., `32px` desktop, `28px` mobile), line connectors (`2px` thickness), spacing gaps, and typography pairings.
2. **Responsive Adaptation Matrix:** Concrete layout shift specifications across Mobile (`< 640px`), Tablet (`640px - 1024px`), and Desktop (`> 1024px`).
3. **State & Contrast Blueprint:** Complete palette and token specifications for Pending, Active/Current, Completed, Error, and Disabled steps meeting WCAG 2.1 / 2.2 AA standards (4.5:1 text, 3:1 non-text).
4. **Accessibility & ARIA Structure:** Semantic HTML markup (`<nav aria-label="Progress">`, `<ol>`, `<button>`, `aria-current="step"`) with focus management rules and live region announcements.
5. **Branching & State Persistence Spec:** Rules for handling step recalculation, skip logic, back-navigation input preservation, and draft auto-save.

---

## Workflow

### 1. Structure the Workflow into Logical Chunks
Before establishing visual design, organize the user process into optimal cognitive units:
- **Optimal Step Count:** Limit linear workflows to 3 to 6 steps. If a process exceeds 6 steps, group sub-tasks into parent sections or restructure into a multi-phase wizard.
- **Logical Categorization:** Group closely related fields into single steps (e.g., group First Name, Last Name, Email, and Phone into "Personal Information").
- **Clear Step Naming:** Use concise, task-oriented verb-noun labels (e.g., "1. Account Info", "2. Payment Details", "3. Review & Submit"). Avoid vague labels like "Step 1" or "Details".

### 2. Select the Layout Pattern Based on Viewport & Context

Choose the appropriate structural layout pattern:

```text
HORIZONTAL STEPPER (Desktop > 1024px, 3-5 Steps)
[ (1) Account ] ------ [ (2) Shipping ] ====== [ (3) Payment ] ------ [ (4) Review ]
                                 ▲
                           CURRENT STEP

VERTICAL STEPPER (Dense forms, Branching flows, or Sidebars)
(✓) 1. Account Info
 |  Completed
(2) 2. Shipping Address
 |  • Street Address
 |  • City, State, Zip
( ) 3. Payment Method
 ( ) 4. Review Order

MOBILE SUMMARY STEPPER (< 640px Viewports)
+--------------------------------------------------+
| Step 2 of 4: Shipping Address                    |
| [=======================------------] 50%        |
+--------------------------------------------------+
```

1. **Horizontal Stepper (Desktop, 3 to 5 Steps):**
   - Ideal for linear checkout flows or concise wizards on wide screens.
   - Nodes and text labels sit side-by-side or stacked vertically.
   - Connector lines span between nodes across the top of the container.
2. **Vertical Stepper (Complex Forms & Branching Logic):**
   - Ideal for deep forms with varying step heights, accordion-style expansion, or dynamic step addition.
   - Placed either in a dedicated left sidebar or stacked directly in the main content canvas.
3. **Accordion Stepper (Embedded In-Page Workflows):**
   - Each step expands vertically when active and collapses into a summary card when completed, showing a "Edit" action button.
4. **Mobile Summary / Compact Numeric Stepper (`< 640px`):**
   - Converts full horizontal steppers into a compact header: `"Step 2 of 4: Shipping Address"` paired with a thin top progress track (`height: 4px`) or an expandable step list drawer.

### 3. Establish Node Geometry, Spacing, and Connectors
Define consistent spatial proportions for stepper nodes and connecting tracks:

- **Desktop Node Size:** `32x32px` circle container with a `2px` border stroke or solid fill.
- **Mobile Node Size:** `28x28px` circle container.
- **Node Contents:**
  - **Numeric Indicator:** `14px` bold text centered inside the circle (for Pending and Current steps).
  - **Checkmark Icon:** `16px` SVG check icon centered inside the circle (for Completed steps).
  - **Error Indicator:** `16px` SVG exclamation icon or warning symbol (for Error steps).
- **Connector Line:** `2px` height horizontal rule (or `2px` width vertical rule) spanning the space between adjacent nodes.
  - **Pending Line:** Soft neutral border color (`#E2E8F0` / dark mode: `#334155`).
  - **Completed Line:** High-contrast accent color (`#2563EB` / dark mode: `#60A5FA`).

### 4. Apply State Tokens & Non-Color Identifiers
Never rely solely on color to convey step status. Combine background color, border width, typography, and icon indicators:

| State | Node Fill / Border | Icon / Text Color | Label Typography | Connector Track |
| :--- | :--- | :--- | :--- | :--- |
| **Pending** | Neutral fill (`#F1F5F9`), `1px` border (`#CBD5E1`) | Muted text (`#64748B`) | Regular weight, muted (`#64748B`) | Neutral inactive (`#E2E8F0`) |
| **Current / Active** | Primary fill (`#2563EB`) or `2px` active border | High-contrast white (`#FFFFFF`) | Bold weight, primary text (`#0F172A`) | Neutral ahead / Primary behind |
| **Completed** | Success fill (`#16A34A`) or Primary accent | White Checkmark (`#FFFFFF`) | Medium weight, body text (`#334155`) | Solid active accent (`#2563EB`) |
| **Error** | Error fill (`#DC2626`) or `2px` red border | White Exclamation (`#FFFFFF`) | Medium weight, error text (`#DC2626`) | Neutral / Error accent |
| **Disabled** | Subdued fill (`#F8FAFC`), `1px` border (`#E2E8F0`) | Light gray (`#94A3B8`) | Light weight, disabled text (`#94A3B8`) | Subdued line |

### 5. Handle Branching Logic & Input State Preservation
- **Dynamic Step Insertion:** If selecting "Business Account" in Step 1 introduces a "Tax ID Verification" step, dynamically insert it into the step list and update total step counts immediately (`"Step 2 of 5"`).
- **Back-Navigation Input Preservation:** When a user navigates back to Step 1 from Step 3, preserve all previously entered form fields. Do not clear inputs unless explicitly requested via a "Reset" action.
- **Step Re-validation:** If a user modifies an earlier step that invalidates downstream steps (e.g., changing shipping country affects available shipping methods), mark affected downstream steps as unverified and prompt the user to re-confirm.

### 6. Implement WCAG AA Accessibility & Keyboard Interaction
- **Semantic Structure:**
  ```html
  <nav aria-label="Checkout Progress">
    <ol class="stepper">
      <li class="stepper__item stepper__item--completed">
        <a href="#step-1" class="stepper__link">
          <span class="stepper__node">
            <svg aria-hidden="true" class="icon-check"><!-- Check Icon --></svg>
            <span class="sr-only">Step 1: Account, Completed</span>
          </span>
          <span class="stepper__label">Account</span>
        </a>
      </li>
      <li class="stepper__item stepper__item--current" aria-current="step">
        <div class="stepper__content">
          <span class="stepper__node">2</span>
          <span class="stepper__label">Shipping</span>
        </div>
      </li>
      <li class="stepper__item stepper__item--pending">
        <div class="stepper__content">
          <span class="stepper__node">3</span>
          <span class="stepper__label">Payment</span>
        </div>
      </li>
    </ol>
  </nav>
  ```
- **Current Step Attribute:** Always attach `aria-current="step"` to the wrapper or active step item.
- **Clickable Completed Steps:** Completed steps should be implemented as keyboard-focusable links (`<a>`) or buttons (`<button>`) allowing users to jump back (`Tab` + `Enter`/`Space`).
- **Future / Pending Steps:** Future non-navigable steps should remain non-interactive (`<div role="text">` or `disabled` button) until prior steps pass validation.
- **Focus Management on Transition:** When a user clicks "Next Step", move focus smoothly to the top heading (`<h1>` / `<h2>`) or primary input of the newly activated step canvas, announcing the new step title via an `aria-live="polite"` region.

---

## Decision Rules

### Layout Pattern Matrix

| Scenario / Constraints | Layout Pattern | Rationale |
| :--- | :--- | :--- |
| **Desktop viewport, 3–5 linear steps** | **Horizontal Stepper** | Clean top banner placement; preserves full canvas height for form fields. |
| **Mobile viewport (`< 640px`)** | **Compact Mobile Summary** | Avoids label truncation, text overlap, and horizontal scroll. |
| **Complex form with varying step heights** | **Vertical / Accordion Stepper** | Accommodates expanding content sections without awkward height jumps. |
| **Dynamic branching logic (variable steps)** | **Vertical Sidebar Stepper** | Easily appends, removes, or modifies step items without breaking grid lines. |
| **Embedded card workflow inside dashboard** | **Accordion Stepper Card** | Keeps overall page context intact while focusing on current active step. |

### Navigation & Validation Rules

| User Action | Validation Strictness | Behavior |
| :--- | :--- | :--- |
| **Click "Next Step" Button** | Strict Validation | Trigger inline form validation. If valid, advance to next step and focus top heading. If invalid, display inline field errors and focus first invalid field. |
| **Click Completed Step Node** | No Validation | Instantly navigate back to target completed step. Retain all current input data. |
| **Click Future Pending Node** | Blocked / Disabled | Prevent navigation until current step passes validation. Display tooltip if clicked ("Complete current step first"). |
| **Click "Save & Exit" / Draft** | Partial / No Validation | Persist current form state to server or local storage and issue success toast. |

---

## Constraints

- **Accessibility (WCAG 2.1 / 2.2 AA):**
  - Text labels against backgrounds must achieve at least **4.5:1** contrast ratio.
  - Active nodes, completed nodes, and connector lines must achieve at least **3:1** non-text contrast against surrounding page surfaces.
  - Non-color state indicators (checkmarks, numbers, bold text) MUST accompany color changes.
  - Clickable step nodes and navigation buttons must satisfy at least **44x44px** touch target dimensions (`24x24px` absolute minimum with surrounding margin per WCAG 2.2 SC 2.5.8).
- **Responsiveness:**
  - Horizontal steppers MUST NOT cause horizontal scrollbars or word-wrap overlap on narrow viewports. Switch layout to Compact Mobile Summary at `< 640px`.
- **Keyboard Navigation:**
  - Focus indicators (`:focus-visible`) must measure at least 2px thick with 2px offset for all interactive step nodes and buttons.

---

## Common Failure Patterns

- **Mobile Label Squeeze:** Forcing a 5-step horizontal stepper onto a 375px mobile screen, resulting in unreadable 8px text, truncated words, or clipped nodes.
- **Color-Only Completion Feedback:** Relying solely on a green vs. gray node fill to indicate completion without rendering a checkmark icon or updating screen reader text.
- **Loss of Input Data on Back Navigation:** Wiping user-entered data when they click a previous step to check details, forcing them to re-type information.
- **Focus Trap / Lost Focus on Step Advance:** Advancing to the next step while leaving keyboard focus stranded on the bottom "Next" button, forcing screen reader users to navigate backwards to read the new step content.
- **Unannounced Branching:** Dynamically adding or removing steps without announcing changes to screen reader users (`aria-live="polite"`).
- **Unclickable Completed Steps:** Disabling previous step nodes so users are forced to click a "Back" button repeatedly to navigate across multiple steps.

---

## Validation Criteria

- [ ] Stepper layout adapts responsively across Mobile (`< 640px`), Tablet (`640px - 1024px`), and Desktop (`> 1024px`) viewports without overflow.
- [ ] Active step is marked with `aria-current="step"`.
- [ ] Completed steps feature non-color visual indicators (e.g., SVG checkmark icons) and keyboard-focusable controls.
- [ ] Active and completed state tokens satisfy WCAG AA contrast requirements (4.5:1 text, 3:1 graphical elements).
- [ ] Form input state is preserved when navigating backwards to previously completed steps.
- [ ] Advancing steps shifts focus to the top heading or primary field of the new step canvas.
- [ ] Touch target sizes for interactive step nodes meet or exceed 44x44px.
