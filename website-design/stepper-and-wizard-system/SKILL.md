---
name: stepper-and-wizard-system
description:
  Design and implement a systematic framework for multi-step workflows, linear and
  branching wizards, step navigation, and form chunking with responsive layout
  adaptations and WCAG AA accessibility.
---

# Stepper and Wizard System

## Purpose

The Stepper and Wizard System provides a comprehensive design framework for visually chunking, structuring, and guiding users through multi-step workflows. Long forms and multi-stage processes (such as account setup, checkout flows, complex SaaS onboarding, and loan applications) frequently trigger user anxiety, cognitive overload, and high drop-off rates when presented as continuous single-page scrolling forms.

A systematic approach to wizards and steppers divides a complex transaction into discrete, logical stages. It establishes visual progress context, manages state persistence across steps, provides immediate field-level validation before step transitions, and ensures smooth responsive layout degradation from desktop progress headers to compact mobile step counters.

## Use Cases

- **Multi-Step Onboarding:** Guiding new users through workspace creation, team invitations, and integration configuration during initial SaaS signup.
- **E-Commerce Checkout Workflows:** Structuring shipping address selection, delivery options, payment input, and order review.
- **Financial & Insurance Applications:** Breaking down dense multi-field compliance, credit, or underwriting applications into digestible sections.
- **Branching Configuration Wizards:** Guiding users through custom product or software setups where answers in Step 1 dynamically determine the fields required in Step 2 or Step 3.
- **Enterprise Data Import & Mapping:** Guiding users through CSV uploading, column mapping, validation dry-runs, and final batch execution.

## When NOT to Use

- **Short Forms (1–5 Fields):** For simple contact forms or single-action signups, splitting fields across steps creates unnecessary interaction friction. Use `form-design-system`.
- **System or Background Process Status:** To display passive system loading or download status, use `step-progress-system` or `skeleton-state-system`.
- **Non-Linear Tabbed Dashboards:** When content sections can be edited in any order at any time without sequence enforcement, use `tab-ui-system` or `settings-interface-system`.
- **Infinite Feeds or Unbounded Explorations:** When there is no clear terminal completion point or defined goal.

## Inputs

1. **Workflow Inventory & Field Mapping:** List of all required user input fields, actions, and supporting media, grouped into logical steps.
2. **Workflow Archetype:** Linear sequence (Step 1 → Step 2 → Step 3) versus Branching sequence (if Option A chosen in Step 1, go to Step 2A; else Step 2B).
3. **Step Titles & Subtitles:** Action-oriented headers (e.g., "1. Personal Details", "2. Payment Method", "3. Review & Submit").
4. **Validation Rules:** Per-field and per-step completion prerequisites required before enabling "Next" or "Continue".
5. **State Persistence Strategy:** Local storage, URL search parameters, or draft server state for handling step reloads or user interruptions.

## Outputs

1. **Stepper Component Architecture:** Responsive visual step indicator (Horizontal Stepper bar on desktop, sticky compact step counter on mobile).
2. **Form Panel Container Layout:** Standardized content canvas with consistent vertical rhythm, section headers, field groups, and inline error messaging.
3. **Action Dock / Footer Bar:** Persistent bottom action bar containing primary "Next / Submit" and secondary "Back / Save Draft" controls.
4. **Keyboard & ARIA Specifications:** Accessible structure utilizing `nav[aria-label="Progress"]`, `ol`, `aria-current="step"`, `aria-live` status regions, and keyboard focus management on step transition.

## Workflow

### 1. Group Fields into Logical Steps
- **Cognitive Limit:** Aim for 3 to 5 steps maximum per wizard.
- **Cohesion:** Group closely related fields (e.g., all shipping address fields together).
- **Early Wins:** Put lightweight, high-confidence questions in Step 1 to build completion momentum.

### 2. Establish Stepper Visual Hierarchy
- **Header Progress Navigation:** Position horizontal step indicators above the form panel on desktop screens ($>1024\text{px}$).
- **Step Item States:**
  - *Completed:* Marked with a checkmark icon, clickable to jump back.
  - *Active:* High-contrast badge/border, non-clickable, highlighted title, tagged with `aria-current="step"`.
  - *Upcoming / Incomplete:* Subdued color, disabled pointer interaction in linear flows.
  - *Error:* Semantic warning indicator if a previously completed step loses validity.

### 3. Implement Layout Structure & Action Docks
- **Panel Container:** Fixed maximum width ($640\text{px} - 800\text{px}$) centered horizontally to prevent wide, hard-to-read inputs.
- **Persistent Action Dock:** Place navigation buttons at the bottom of the panel. Ensure the primary call-to-action ("Next Step" / "Submit") is aligned to the right, and the secondary action ("Back") to the left.
- **Sticky Dock on Mobile:** On viewports $<768\text{px}$, pin the action dock to the viewport bottom to prevent thumb-stretching.

### 4. Wire Validation and Focus Management
- **In-Page Validation:** On clicking "Next", run client-side validation on the active step panel only.
- **Error Trapping:** If errors exist, highlight invalid fields, scroll the first error into view, and move focus to it or an `aria-live` summary box.
- **Step Advance Focus:** On successful advance to Step $N+1$, automatically focus the step's primary heading (`<h2>`) or the first focusable input control.

### 5. Adapt for Mobile Viewports
- **Collapse Horizontals:** On mobile screens ($<768\text{px}$), horizontal steppers clip and cause horizontal overflow. Replace horizontal step nodes with a compact step summary (e.g., "Step 2 of 4: Delivery Options") accompanied by a thin continuous progress bar.

## Decision Rules

### Step Layout Orientation Selection

| Criteria | Horizontal Header Stepper | Vertical Sidebar Stepper | Compact Mobile Stepper |
| :--- | :--- | :--- | :--- |
| **Viewport Width** | $\ge 1024\text{px}$ | $\ge 1024\text{px}$ | $< 768\text{px}$ |
| **Step Count** | 3 to 5 steps | 5 to 8 steps | Any count |
| **Step Titles** | Short (1-2 words) | Longer with subtext | Text summary |
| **Flow Type** | Strict linear workflow | Complex branching / optional steps | Responsive fallback |

### Linear vs. Non-Linear Navigation Rules
- **Strict Linear Flow:** Users MUST complete Step 1 before Step 2. Do NOT allow clicking on upcoming step indicators in the header. Only completed prior steps are clickable.
- **Non-Linear / Review Flow:** Users can jump freely between steps (common in final review screens or settings setup). All step indicators in the header are interactive buttons.

## Constraints

- **Accessibility (WCAG AA Minimum):**
  - Progress list must be structured inside an `<ol>` wrapped in `<nav aria-label="Wizard progress">`.
  - Active step node must carry `aria-current="step"`.
  - Step transitions must announce panel changes using an `aria-live="polite"` region or by shifting keyboard focus directly to the step heading (`<h2 tabindex="-1">`).
  - Target sizes for interactive step indicators and action buttons must meet a minimum of $44 \times 44\text{px}$ ($24 \times 24\text{px}$ strict CSS bounds with $44\text{px}$ touch target padding).
- **Responsiveness:**
  - Never allow horizontal scrollbars on the step progress indicator on mobile screens.
  - Action button container must remain visible above mobile soft keyboards or fixed bottom bars.
- **Typography & Rhythm:**
  - Maintain consistent 24px/32px vertical spacing between field groups within every step panel.

## Common Failure Patterns

1. **The Mobile Clip Overflow:** Fitting 5 horizontal step badges with text labels on a 375px wide smartphone, resulting in cutoff text and broken alignment.
2. **Silent Failure on "Next":** Clicking "Next" when an input is invalid without scrolling to or focusing the error, leaving the user wondering why the step won't advance.
3. **Loss of Input State on "Back":** Returning to Step 1 clearing all previously entered fields, forcing the user to re-type data.
4. **Focus Disorientation:** Advancing to Step 2 while browser focus remains on the bottom "Next" button from Step 1, forcing keyboard users to tab backward through the page.
5. **Ambiguous Step Titles:** Vague labels like "Step 1", "Step 2" instead of clear action descriptors like "Account", "Billing", "Review".

## Validation Criteria

- [ ] Progress indicator is enclosed in `<nav aria-label="...">` with an `<ol>` list.
- [ ] Active step is correctly marked with `aria-current="step"`.
- [ ] Mobile viewports (<768px) convert horizontal steps to a compact progress bar and counter.
- [ ] On clicking "Next", client-side validation runs on active panel before advancing.
- [ ] Advancing steps shifts keyboard focus to the top heading of the new panel.
- [ ] "Back" navigation preserves all previously entered field values.
- [ ] Action buttons are clearly differentiated (Primary CTA on right, Secondary Back CTA on left).
