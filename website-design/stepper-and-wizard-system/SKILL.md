---
name: stepper-and-wizard-system
description:
  Design linear and branching step-by-step wizard flows, steppers, and multi-step forms with responsive layout adaptation, explicit state indicators, WCAG AA accessibility, and progress tracking.
---

# Stepper and Wizard Design System

## Purpose

The Stepper and Wizard Design System provides a comprehensive framework for structuring, visually chunking, and guiding users through multi-step workflows, complex forms, and setup procedures. Long forms or intricate multi-stage processes (such as enterprise software provisioning, multi-tenant onboarding, financial applications, and multi-address checkouts) create high cognitive load and increase abandon rates when presented as single-page scrolling forms.

Without a structured wizard system, multi-step interfaces frequently suffer from ambiguous user progress, poor mobile layout adaptation (horizontal overflow or illegible step labels), broken screen reader navigation, unpreserved form state when navigating backward, and jarring layout shifts between steps.

This design system establishes spatial rules, step geometry, layout orientations (horizontal header stepper, vertical sidebar stepper, and collapsible mobile step accordion), progress tracking calculations, state indicators (Completed, Active, Incomplete, Optional, Error), keyboard focus management, and WCAG AA accessibility patterns.

## Use Cases

- **E-Commerce Checkout & Fulfilment:** Guiding customers through multi-address shipping, delivery speed selection, payment method authorization, and order review.
- **SaaS & Enterprise Onboarding:** Provisioning organization workspaces, inviting team members, assigning initial role permissions, and selecting pricing tiers.
- **Financial & Identity Verification (KYC):** Collecting personal identification details, document photo uploads, address proof, and security consent in regulated flows.
- **Complex Configuration & Product Builders:** Customizing hardware specifications, server infrastructure parameters, or bespoke insurance policy packages.
- **Multi-Step Application & Request Forms:** Submitting loan applications, grant proposals, vendor registration questionnaires, or job application profiles.

## When NOT to Use

- **Single-View Forms (<= 4 Fields):** For simple inputs such as login, password resets, newsletter signups, or basic contact forms, use standard form layouts (`form-design-system`).
- **Linear Tabbed Data Browsing:** When switching between views does not represent sequential progression or task completion, use standard navigation tabs (`tab-ui-system`).
- **Non-Sequential Data Entry:** If users must complete fields across various categories in any arbitrary order without dependencies, use a master-detail or tabbed settings layout (`settings-interface-system`).
- **Background System Processing:** For monitoring long-running asynchronous server tasks (e.g., video rendering or data migration progress), use progress bars or status indicators (`step-progress-system`).

## Inputs

1. **Step Sequence Architecture:** The list of ordered steps, required vs. optional designations, and conditional branching logic (e.g., Step 3a for Business Accounts vs. Step 3b for Individual Accounts).
2. **Viewport Context & Space Allocation:** Target display container width (Desktop sidebar vs. Header bar vs. Mobile viewport width).
3. **Data Dependency Matrix:** Field dependencies that determine step completion criteria and validation rules prior to advancing.
4. **Navigation Freedom Level:** Strict linear enforcement (users cannot skip ahead or jump to incomplete steps) vs. Non-linear flexibility (users can jump between any step at will).
5. **Brand & Design Tokens:** Primary action colors, success colors, error colors, surface fills, border widths, typography scale, and focus ring definitions.

## Outputs

1. **Step Header / Sidebar Layout Blueprint:** Visual orientation specification (Horizontal Stepper Bar, Vertical Sidebar Stepper, or Compact Mobile Progress Header).
2. **Step Node Geometry & Typography Spec:** Proportions for step circles/badges (`28px` to `36px`), line connectors, primary step titles, supporting summary labels, and state badges.
3. **State & Contrast Blueprint:** Visual specification for all 6 step states: Upcoming/Incomplete, Active/Current, Completed, Optional, Error/Invalid, and Disabled.
4. **Mobile Adaptability Matrix:** Breakpoint-specific transition rules (e.g., converting horizontal desktop step bars into a sticky mobile summary bar with accordion step drawer).
5. **Accessibility & ARIA Mapping:** Complete HTML/ARIA structure (`<nav aria-label="Progress">`, `ol/li`, `aria-current="step"`, live region feedback for step changes).

---

## Workflow

### 1. Map Step Hierarchy and Branching Logic
Identify the minimal number of logical steps required to accomplish the user goal while keeping steps balanced in cognitive weight:
- **Optimal Step Count:** 3 to 5 steps per wizard. If a process requires more than 6 steps, group sub-tasks into nested fieldsets or evaluate process simplification.
- **Step Labeling:** Keep titles short and verb-driven (e.g., "1. Account", "2. Shipping", "3. Payment", "4. Review").
- **Branching Awareness:** If step choices dynamically insert or remove subsequent steps (e.g., "Business Verification" only appears if "Corporate Account" is selected in Step 1), recalculate total step counts dynamically and announce step updates to screen readers.

### 2. Select Spatial Layout and Stepper Variant
Choose the appropriate layout orientation based on screen real estate and field layout demands:

```text
[ HORIZONTAL STEPPER - DESKTOP HEADER ]
 (✓)---------( 2 )---------( 3 )---------( 4 )
Account    Shipping     Payment      Review
Complete    Active      Upcoming    Upcoming

[ VERTICAL STEPPER - DESKTOP SIDEBAR ]
 (✓) Account Details
  |  john@example.com
  |
 (2) Shipping Address  <-- ACTIVE STEP
  |  [ Form Fields Container ]
  |
 (3) Payment Method
  |
 (4) Review & Submit
```

- **Horizontal Stepper (Header Alignment):** Best for full-width views where form content spans below the step indicator. Step titles sit below or beside step badges.
- **Vertical Stepper (Sidebar Alignment):** Ideal for complex wizards with inline step summaries (showing completed values under previous steps) or when form content benefits from a multi-column desktop canvas.
- **Sticky Progress Header (Mobile Viewport):** Converts the step indicator into a compact top bar showing "Step 2 of 4: Shipping Address" with a collapsible drawer for full step list inspection.

### 3. Establish Geometry and Visual Indicators
Design step badges and connecting lines to communicate spatial flow and progression:

- **Step Circle Badges:**
  - Standard Diameter: `32px` x `32px` (or `2rem`).
  - Compact Diameter: `24px` x `24px` for dense table-based or modal wizards.
  - Geometry: Full circle (`border-radius: 50%`) containing numeric step index (`1`, `2`, `3`) or completion icon (Checkmark SVG).
- **Connecting Lines (Track Dividers):**
  - Height / Thickness: `2px` solid line between step circles.
  - Active/Completed Fill: Fills with brand primary or success color as the user advances.
  - Incomplete Track: Light neutral color (`#E2E8F0` / dark mode: `#334155`).
- **Touch Target Enclosure:**
  - If steps are clickable (enabling back-navigation), the touch target MUST be at least **44x44px** on mobile or **24x24px** with adequate spacing on desktop.

### 4. Define State Tokens and Contrast Metrics
Ensure all 6 core step states meet WCAG AA contrast standards (3:1 non-text contrast for graphical controls, 4.5:1 for typography):

- **State 1: Upcoming / Incomplete:**
  - Circle Fill: Neutral surface or transparent with `2px` neutral border (`#94A3B8`).
  - Text Color: Muted neutral text (`#64748B`). Meets 4.5:1 against background.
- **State 2: Active / Current (`aria-current="step"`):**
  - Circle Fill: Primary brand color (`#2563EB`) with white numeric text, or white fill with heavy `2px` primary border and inner dot.
  - Text Color: Primary high-contrast text (`#0F172A`), font-weight bold (`600`).
  - Border Ring: Optional subtle focus or elevation ring (`box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.15)`).
- **State 3: Completed:**
  - Circle Fill: Success color (`#16A34A`) or primary color (`#2563EB`) containing a high-contrast checkmark icon (`#FFFFFF`).
  - Connecting Line: Solid active fill up to the next step node.
  - Text Color: Standard dark text with optional summary text underneath.
- **State 4: Optional:**
  - Labeling: Explicit "(Optional)" secondary badge or muted text adjacent to the step title. Never rely on color alone.
- **State 5: Error / Invalid:**
  - Circle Fill: Muted error red surface (`#FEF2F2`) with solid red border (`#DC2626`) and exclamation icon.
  - Text Color: Error text color (`#991B1B`).
- **State 6: Disabled / Locked:**
  - Opacity: `0.5` opacity with `cursor: not-allowed` for non-navigable future steps in strict linear flows.

### 5. Structure Step Navigation Actions and Form State Preservation
Provide explicit, persistent navigation buttons at the bottom of the current step container:

- **Action Dock Structure:**
  - **Primary Action (Right-aligned):** "Continue" or "Next: [Step Name]" (or "Submit Order" / "Complete Setup" on final step).
  - **Secondary Action (Left-aligned):** "Back" or "Previous Step". Visible on all steps except Step 1.
  - **Tertiary Action (Optional):** "Save Draft" or "Cancel".
- **Form State Preservation:**
  - Moving backward to a previous step MUST retain all previously entered form data. Never erase user inputs when navigating backward or forward.
- **Step Validation Protocol:**
  - Trigger client-side validation when the user clicks "Continue".
  - If errors exist, focus the first invalid form field, display inline field error messages, and update the step indicator state to Error if the user navigates away.

### 6. Implement WCAG AA Accessibility and Focus Management
Guarantee complete keyboard accessibility and screen reader orientation:

- **Semantic HTML & Navigation Structure:**
  ```html
  <nav aria-label="Wizard Progress">
    <ol class="stepper">
      <li class="stepper__item stepper__item--completed">
        <a href="#step-1" class="stepper__link">
          <span class="stepper__badge" aria-hidden="true">
            <svg class="icon-check"><!-- Checkmark SVG --></svg>
          </span>
          <span class="sr-only">Step 1: Account Details, Completed</span>
          <span class="stepper__label">Account Details</span>
        </a>
      </li>
      <li class="stepper__item stepper__item--active" aria-current="step">
        <div class="stepper__link">
          <span class="stepper__badge">2</span>
          <span class="stepper__label">
            <span class="sr-only">Step 2: </span>Shipping Address
          </span>
        </div>
      </li>
      <li class="stepper__item stepper__item--upcoming">
        <div class="stepper__link">
          <span class="stepper__badge">3</span>
          <span class="sr-only">Step 3: Upcoming</span>
          <span class="stepper__label">Payment</span>
        </div>
      </li>
    </ol>
  </nav>
  ```
- **Live Region Announcements:**
  - Wrap the main step container in an ARIA live region (`aria-live="polite"` or `role="region" aria-label="Step Content"`) or issue a live announcement upon step transition: *"Navigated to Step 2 of 4: Shipping Address"*.
- **Keyboard Focus Routing:**
  - When advancing to a new step, programmatically shift focus (`element.focus()`) to the step heading (`<h2 tabindex="-1">Step 2: Shipping Address</h2>`) so keyboard users start reading from the top of the new step.

---

## Decision Rules

### Layout Variant Matrix

| Viewport Width / Device | Preferred Stepper Layout | Rationale |
| :--- | :--- | :--- |
| **Desktop (>= 1024px)** | Horizontal Stepper Bar or Vertical Sidebar | Provides ample space for horizontal connector lines and full step titles. |
| **Tablet (768px - 1023px)** | Compact Horizontal Stepper (Icon + Index) | Prevents step title text truncation or line wrapping. |
| **Mobile (< 768px)** | Sticky Top Header + Accordion Step Drawer | Eliminates horizontal scrolling and tap target crowding on narrow viewports. |

### Navigation Model Matrix

| Workflow Characteristics | Permitted Navigation Model | Implementation Rule |
| :--- | :--- | :--- |
| **Strict Dependencies** (e.g., Payment dependent on calculated Shipping cost) | **Linear Stepper** | Future steps are locked (`disabled`). Clicking past steps allows reviewing/editing. |
| **Independent Modules** (e.g., Profile setup with optional bio, social links, avatar) | **Non-Linear Stepper** | All step badges are clickable. Users can jump directly to any step. |
| **Branching Wizard** (Step 2 determines whether Step 3 is skipped) | **Dynamic Linear Stepper** | Recalculate `aria-valuenow` / total steps when branching conditions change. |

---

## Constraints

- **Accessibility (WCAG 2.1 / 2.2 AA):**
  - Minimum 3:1 non-text contrast ratio for step badges, connector lines, and borders in all states.
  - Minimum 4.5:1 text contrast ratio for active and completed step labels.
  - Step navigation links must have clear focus rings (`outline: 2px solid #2563EB; outline-offset: 2px`).
  - Active step must be explicitly marked using `aria-current="step"`.
- **Responsive Adaptability:**
  - Horizontal steppers MUST NOT cause horizontal viewport scrollbars on mobile devices.
  - Touch targets for navigable step badges must measure at least **44x44px** or be enclosed within a 44px container.
- **Form Data Security & Persistence:**
  - Navigating between steps must never wipe entered input fields.

---

## Common Failure Patterns

- **Horizontal Overflow on Mobile:** Rendering a 5-step desktop horizontal stepper on mobile screens, causing truncated text or horizontal page scrolling.
- **Color-Only Completion Feedback:** Relying solely on green vs. gray badge background colors without checkmark icons or screen reader text.
- **Focus Disorientation:** Advancing to the next step without moving focus, leaving keyboard users focused on a hidden or offscreen "Continue" button at the bottom of the page.
- **Form Data Loss on Back Action:** Resetting form input fields when the user clicks the "Back" button, forcing tedious re-entry.
- **Trapping Users in Linear Dead Ends:** Hiding the "Back" button or preventing users from returning to Step 1 to edit initial entries.
- **Ambiguous Step Titles:** Using vague labels like "Step 1", "Step 2", "Step 3" without descriptive nouns ("1. Contact", "2. Address", "3. Review").

---

## Validation Criteria

- [ ] Stepper indicator uses semantic `<nav>` and `<ol>` HTML markup with `aria-current="step"` on the active step node.
- [ ] Active and completed steps provide checkmark icons or explicit text state indicators in addition to color.
- [ ] Mobile viewports (< 768px) gracefully collapse into a sticky top progress bar or accordion without horizontal overflow.
- [ ] Focus shifts programmatically to the main step heading (`<h2>`) upon step advancement.
- [ ] Navigating backward via the "Back" button preserves all previously entered form data.
- [ ] Touch targets for navigable step nodes meet minimum 44x44px sizing requirements.
- [ ] All step colors and text satisfy WCAG AA 3:1 non-text and 4.5:1 text contrast ratios.
