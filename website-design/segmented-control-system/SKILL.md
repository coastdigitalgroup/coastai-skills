---
name: segmented-control-system
description:
  Design a systematic framework for compact, mutual-exclusion selectors (segmented controls or button groups), defining layout, state transition models, and accessibility patterns.
---

# Segmented Control System

## Purpose

The Segmented Control System provides a design methodology for compact, mutually exclusive selectors (also known as Button Groups, Sliding Toggles, or Segmented Buttons). Unlike navigation menus or content-panel tabs, a segmented control serves as an inline modifier within a single context or form. It allows users to immediately alter the display format, filter a single dataset, or select an input option within a highly constrained spatial footprint.

A systematic approach ensures that these controls have a cohesive visual relationship, clear interactive affordances, seamless layout scaling, and proper semantic accessibility patterns to prevent them from being mistaken for generic buttons or tab navigation.

## Use Cases

- **View Swapping:** Switching display presentation of identical content (e.g., "Grid vs. List vs. Map" or "Board vs. Calendar").
- **Pricing & Billing Toggles:** Choosing billing frequencies (e.g., "Monthly vs. Annually") directly altering price displays.
- **Micro-filtering / Sub-segmenting:** Filtering an active list within a specific sub-category (e.g., "All vs. Unread vs. Starred" messages).
- **Inline Option Selection:** Replacing bulky dropdown select menus in forms for 2 to 5 high-priority choices (e.g., "Small vs. Medium vs. Large").
- **Interactive State Switchers:** Modifying an active metric parameter in live charts (e.g., "7D vs. 30D vs. 1Y" timeframes).

## When NOT to Use

- **Full Page Navigation:** If clicking an item changes the page URL or navigates the user away from the current view context, use `site-navigation-system`.
- **Large Content Panel Switching:** If switching options displays completely unrelated blocks of content with complex layouts (such as settings panels or document tabs), use `tab-ui-system`.
- **High Option Count:** If there are more than 5 options, use a dropdown selection or a filter drawer to prevent visual crowding and horizontal text overflow.
- **Multi-select Settings:** If users can select more than one active option simultaneously, use grouped checkboxes or tags (`badge-and-tag-system`).
- **Binary Dynamic Toggles:** For single on/off settings that trigger an immediate background process (e.g., "Enable Notifications"), use a standard Toggle Switch (`accessible-switch-implementation`).

## Inputs

1. **Option Inventory:** The list of mutually exclusive labels, icons, or values (typically 2 to 5 items).
2. **Control Scope:** Whether the control acts as a form input, a layout view modifier, or a metric switcher.
3. **Container Constraints:** The exact width and layout environment (e.g., inline next to search, centered in pricing cards, or full-width on mobile).
4. **Style Tokens:** Typography scale, spacing variables (`fluid-spacing-system`), interactive states (`interactive-state-system`), and color tokens.

## Outputs

1. **Control Anatomy Spec:** Visual definition of the Track (the background container), the Segments (individual buttons), and the Active Indicator (the sliding or highlighted background).
2. **Behavioral ARIA Mapping:** Selection of correct ARIA roles (`role="radiogroup"` vs. `role="tablist"`) and keyboard navigation rules.
3. **State Transition Matrix:** Style definitions for Default, Hover, Active/Selected, Focus, and Disabled states.
4. **Responsive Flow Rules:** Specifications for horizontal scaling, full-width fluid behavior, and mobile reflowing or fallback to `<select>`.

## Workflow

### 1. Identify the Semantic Intent

Determine if the control modifies a value or modifies a display view:
- **Form Input or Micro-filter:** Semantically acts as a Radio Group. It changes a value stored or sent on submit, or immediately refilters an inline list.
- **View Controller:** Semantically acts as a Tablist. It switches the active visible panel or presentation within the same container.

### 2. Design the Visual Anatomy

Build a highly polished, unified visual component. The design consists of three core layers:
- **The Track:** A single horizontal container with a subtle background color (e.g., low-contrast gray), small padding (usually 2px to 4px), and rounded corners (semi-rounded or pill).
- **The Segments:** Buttons placed shoulder-to-shoulder inside the Track. They must share equal width (justified) or adapt to content width with consistent padding.
- **The Active Indicator:** A sliding physical card or highlight with a distinct background (often white or primary theme color) and a subtle shadow (`elevation-and-depth-system`) that sits underneath the active text to visually lift it.

### 3. Establish State and Motion Choreography

Configure distinct visual feedback for every interaction phase:
- **Default State:** Non-active text uses a secondary neutral color with a high enough contrast ratio (at least 4.5:1).
- **Hover State:** A subtle hover background highlight on the target segment to indicate clickability.
- **Selected State:** The text moves to primary/bold styling, and the Active Indicator slides behind it.
- **Focus State:** When navigating via keyboard, draw a distinct, high-contrast focus outline around the active segment. The focus indicator must not clip outside the Track boundary.
- **Disabled State:** Dimmed opacity (typically 40%) with cursor pointer disabled.

### 4. Code and Handoff Annotations

Annotate the structural requirements for implementation:
- **Equal-width Distribution:** Specify flexbox alignment (`flex: 1 1 0%`) to distribute segments equally when appropriate.
- **Sliding Indicator Transition:** Specify CSS transition rules (`transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)`) for the sliding active indicator card, ensuring it does not trigger Cumulative Layout Shift (CLS) by utilizing hardware-accelerated properties (`transform` and `opacity` instead of altering `left`/`width` properties directly).

### 5. Plan Responsive Behaviors

Define how the segmented control scales down on small viewports:
- **Fluid justification:** Expand the Track and Segments to occupy 100% width on mobile screens, acting as a full-width bottom bar or header component.
- **Label Truncation and Min-width:** Enforce strict min-widths for segments to prevent text wraps from stacking lines inside a single button.
- **Overflow Dropdown Fallback:** If options cannot fit within a 320px viewport without visual breakage, swap the segmented control layout to a native `<select>` dropdown using responsive CSS media queries.

## Decision Rules

### Radio Group vs. Tablist Patterns

| Criterion | Use Radio Group Pattern (`role="radiogroup"`) | Use Tablist Pattern (`role="tablist"`) |
| :--- | :--- | :--- |
| **Primary Function** | Edits a data property or filters a list inline. | Switches between distinct layout views or panels. |
| **Form Integration** | Integrated inside a `<form>` or acts as an input. | Outside standard forms; manages layout view modes. |
| **ARIA Role** | Parent: `role="radiogroup"`, Child: `role="radio"` with `aria-checked="true/false"`. | Parent: `role="tablist"`, Child: `role="tab"` with `aria-selected="true/false"`. |
| **Keyboard Navigation**| Arrow keys move selection immediately; Tab exits group. | Arrow keys move focus immediately; Space/Enter activates. |

### Visual Layout: Fixed Equal-width vs. Auto Fluid-width
- **Fixed Equal-width:** Best for short, uniform labels (e.g., "7D", "30D", "90D" or "Grid", "List"). Every segment is identical in width, offering visual symmetry.
- **Auto Fluid-width:** Best when labels differ significantly in character length (e.g., "All Items" vs. "Pending Verification"). Each segment wraps around its text with consistent padding (e.g., `12px 16px`).

## Constraints

- **Contrast Ratios:** Both active and inactive text segments must meet the WCAG AA minimum contrast ratio of **4.5:1** against their background.
- **Touch Target Dimensions:** Every individual segment must provide a minimum interactive area of **24x24px** (WCAG 2.2 SC 2.5.8), but a minimum height of **40px to 44px** is strongly recommended for seamless finger taps on mobile.
- **Focus Indicators:** Keyboard focus must be clearly visible on the currently selected segment or active focus target. Ensure focus rings do not clip or hide behind adjacent segments.
- **No Text Wrapping:** Segment text should be single-line and must never wrap to multiple lines inside a button. This breaks the vertical rhythm and causes visual overlap.
- **Reduced Motion:** If animated sliding indicators are implemented, respect user OS preferences via `@media (prefers-reduced-motion: reduce)` by disabling the sliding sliding effect and instantly switching opacity or outline highlights instead.

## Common Failure Patterns

- **The Layout Shift (CLS):** Changing the active segment alters the width of the active button, causing adjacent elements to jump left or right.
- **The Navigation Fallacy:** Styling major global page navigation to look like segmented controls, confusing users who expect instant content changes within the page.
- **Missing Selected Affordance:** Using only a subtle font weight change or low-contrast indicator, making it difficult for low-vision users to identify which option is selected.
- **Keyboard Trap:** Failing to bind standard keyboard arrow keys inside the control, forcing keyboard-only users to press `Tab` through every single option individually.
- **Mobile Squash:** Allowing a 4-segment control to shrink on mobile until labels overlap, truncate illegibly, or clip outside the boundaries of the Track.

## Validation Criteria

- [ ] Clear semantic ARIA pattern is chosen based on the control's function (Radio Group vs. Tablist).
- [ ] Individual segments meet the minimum 24x24px touch target size (44px preferred on mobile).
- [ ] Inactive and active text contrasts are WCAG AA compliant (>= 4.5:1 ratio).
- [ ] Active indicator uses hardware-accelerated CSS properties (`transform`) during sliding transitions to prevent Cumulative Layout Shift (CLS).
- [ ] Responsive behavior is defined (fluid justify, min-width, or dropdown select fallback).
- [ ] Text inside segments remains on a single line with no vertical wrapping or clipping.
- [ ] `@media (prefers-reduced-motion: reduce)` transition fallback is explicitly handled.
