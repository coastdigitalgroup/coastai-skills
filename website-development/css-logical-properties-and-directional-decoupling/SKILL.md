---
name: css-logical-properties-and-directional-decoupling
description:
  Decouple layout dimensions, margins, padding, borders, positioning, and text alignment from physical directions (left, right, top, bottom) using CSS Logical Properties and Values for multi-directional writing modes (LTR, RTL, vertical).
---

# CSS Logical Properties and Directional Decoupling

## Purpose

The CSS Logical Properties and Directional Decoupling skill provides an architectural protocol, CSS box-model refactoring methodology, utility pattern system, and auditing checklist for replacing physical directional styles (`left`, `right`, `top`, `bottom`, `width`, `height`) with CSS Logical Properties and Values (`inline-start`, `inline-end`, `block-start`, `block-end`, `inline-size`, `block-size`).

Hardcoding physical directions binds layout dimensions and spatial relationships to horizontal left-to-right (LTR) scripts. When websites adapt to right-to-left (RTL) languages (Arabic, Hebrew, Persian, Urdu) or vertical writing modes (East Asian CJK vertical text), physical CSS breaks: margins appear on wrong sides, icons align incorrectly, absolute positioning floats off-screen, scrollbars misbehave, and developers are forced to write bloated override stylesheets (`[dir="rtl"] .card { margin-left: 0; margin-right: 1rem; }`).

Using CSS Logical Properties decouples layout semantics from physical coordinates, enabling bidirectional and multi-writing-mode layouts automatically without duplicative CSS rules or preprocessor switches.

---

## Use Cases

- **Multilingual & Internationalized Web Applications:** Architecting global design systems, SaaS platforms, and e-commerce websites that seamlessly support LTR and RTL script switching via `dir="rtl"` or `dir="ltr"` HTML attributes.
- **Vertical Writing Mode Layouts:** Implementing vertical navigation panels, Japanese/Chinese vertical typography sections (`writing-mode: vertical-rl`), or sideways headers without breaking padding, border, or margin logic.
- **Component Design System Foundations:** Building reusable component libraries (cards, modal dialogs, navigation bars, form inputs) that inherit parent writing modes dynamically without requiring secondary theme overrides.
- **Legacy CSS Modernization & Refactoring:** Eliminating technical debt and redundant `html[dir="rtl"]` CSS overrides by refactoring legacy physical box model properties into logical equivalents.
- **Bi-Directional Absolute Positioning & Floating:** Positioning overlays, popovers, badges, tooltips, and floating controls (`inset-inline-start`, `inset-inline-end`) relative to logical reading order instead of screen edges.

---

## When NOT to Use

- **Physical Media & Hardware Constraints:** Styling canvas elements, camera viewports, physical video player controls, or hardware-bound interfaces where `left` or `top` represent literal physical hardware screens rather than document flow direction.
- **Legacy Browser Requirements Without Build Transforms:** Targeted environments requiring legacy browser support (e.g., IE11 or early Chrome/Safari releases prior to 2018) where CSS Logical Properties are unsupported without PostCSS logical property transformation plugins.
- **Directionally Asymmetric Graphic Design:** Specific artistic artwork or asymmetrical visual illustrations where an icon or shape MUST remain anchored to the physical top-left corner of a container regardless of document reading direction.

---

## Inputs

1. **Physical CSS Stylesheet or Component Code:** Source CSS containing physical properties (`margin-left`, `padding-right`, `border-top`, `width`, `height`, `left`, `right`, `top`, `bottom`, `text-align: left`).
2. **Target Document Flow & Writing Modes:** Target language directions (`dir="ltr"`, `dir="rtl"`) and inline/block axes (`writing-mode: horizontal-tb`, `writing-mode: vertical-rl`).
3. **Interactive Components & Overlays:** Tooltips, modals, sidebars, and dropdowns needing bidirectional positioning.

---

## Outputs

1. **Logically Decoupled CSS Stylesheet:** CSS clean of physical direction lock-in, using logical properties and values across all box model dimensions, borders, margins, padding, and layout bounds.
2. **Logical Box Model Utility System:** Modular utility classes (`.mis-2`, `.pbe-4`, `.is-full`, `.bs-auto`) supporting flexible component construction.
3. **Audit & Migration Checklist:** Protocol for detecting physical property anti-patterns and verifying LTR/RTL/Vertical flow parity.

---

## Workflow

### 1. Map Physical Properties to Logical Axes

Understand the two key axes defined by CSS Writing Modes Level 3:
- **Inline Axis:** Parallel to text flow within a line (Horizontal in LTR/RTL; Vertical in vertical writing modes). Starts at `inline-start` and ends at `inline-end`.
- **Block Axis:** Perpendicular to text flow, direction in which blocks stack (Top-to-bottom in horizontal LTR/RTL; Right-to-left or Left-to-right in vertical modes). Starts at `block-start` and ends at `block-end`.

#### Physical-to-Logical Mapping Table
| Physical Property | Logical Property (Horizontal LTR) | Logical Property (Horizontal RTL) |
| :--- | :--- | :--- |
| `width` | `inline-size` | `inline-size` |
| `height` | `block-size` | `block-size` |
| `min-width` / `max-width` | `min-inline-size` / `max-inline-size` | `min-inline-size` / `max-inline-size` |
| `min-height` / `max-height` | `min-block-size` / `max-block-size` | `min-block-size` / `max-block-size` |
| `margin-left` | `margin-inline-start` | `margin-inline-end` |
| `margin-right` | `margin-inline-end` | `margin-inline-start` |
| `margin-top` | `margin-block-start` | `margin-block-start` |
| `margin-bottom` | `margin-block-end` | `margin-block-end` |
| `padding-left` | `padding-inline-start` | `padding-inline-end` |
| `padding-right` | `padding-inline-end` | `padding-inline-start` |
| `border-left` | `border-inline-start` | `border-inline-end` |
| `border-right` | `border-inline-end` | `border-inline-start` |
| `left` / `right` / `top` / `bottom` | `inset-inline-start` / `inset-inline-end` / `inset-block-start` / `inset-block-end` | Reversed inline in RTL |
| `text-align: left` / `right` | `text-align: start` / `end` | `text-align: start` / `end` |
| `float: left` / `right` | `float: inline-start` / `inline-end` | `float: inline-start` / `inline-end` |
| `clear: left` / `right` | `clear: inline-start` / `inline-end` | `clear: inline-start` / `inline-end` |

---

### 2. Refactor Box Model Dimensions and Margins

Replace physical sizing (`width`, `height`) and physical spacing (`margin-left`, `padding-right`) with logical equivalents.

```css
/* Physical / Rigid CSS (Anti-pattern for multi-directional layouts) */
.media-card {
  width: 320px;
  height: auto;
  margin-left: 1.5rem;
  margin-right: 0;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 1.25rem;
  padding-right: 0.75rem;
  border-left: 4px solid #2563eb;
}

/* Logical / Adaptive CSS */
.media-card {
  inline-size: 320px;
  block-size: auto;
  margin-inline-start: 1.5rem;
  margin-inline-end: 0;
  padding-block: 1rem; /* Shorthand for block-start & block-end */
  padding-inline: 1.25rem 0.75rem; /* Shorthand for inline-start & inline-end */
  border-inline-start: 4px solid #2563eb;
}
```

---

### 3. Refactor Absolute Positioning (`inset`)

Use `inset` logical properties for overlays, badges, modals, and absolute positioning anchors.

```css
/* Physical Absolute Badge (Positioned top-right in LTR) */
.badge--physical {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}

/* Logical Absolute Badge (Positioned block-start & inline-end in all directions) */
.badge--logical {
  position: absolute;
  inset-block-start: 0.5rem;
  inset-inline-end: 0.5rem;
}

/* Modal centering shorthand */
.modal-overlay {
  position: fixed;
  inset: 0; /* Logical & Physical shorthand for block & inline bounds */
}
```

---

### 4. Refactor Borders, Border-Radius, and Text Alignment

Convert directional borders, rounded corners, and text alignments to logical properties.

```css
/* Physical Border Radius */
.notification-banner {
  text-align: left;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

/* Logical Border Radius & Alignment */
.notification-banner {
  text-align: start;
  /* Logical border-radius properties */
  border-start-start-radius: 8px;
  border-end-start-radius: 8px;
}
```

---

### 5. Handle Logical Container Queries & Layout Overflow

Ensure media queries and container queries use inline/block terminology, and handle scroll overflow logically.

```css
/* Logical Container Query */
.card-container {
  container-type: inline-size;
}

@container (min-inline-size: 400px) {
  .card-content {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }
}

/* Logical Overflow */
.scrollable-tabs {
  overflow-inline: auto; /* Replaces overflow-x in horizontal modes */
  overflow-block: hidden; /* Replaces overflow-y in horizontal modes */
  scroll-padding-inline-start: 1rem;
}
```

---

## Decision Rules

### Property Selection Guidance Matrix

| Layout Intent | Recommended Logical Property | Avoid (Physical Counterpart) |
| :--- | :--- | :--- |
| Set element width along reading flow | `inline-size` | `width` |
| Set element height perpendicular to line flow | `block-size` | `height` |
| Space before paragraph or element text | `margin-inline-start` | `margin-left` (LTR) / `margin-right` (RTL) |
| Space after paragraph or element text | `margin-inline-end` | `margin-right` (LTR) / `margin-left` (RTL) |
| Space above block element | `margin-block-start` | `margin-top` |
| Space below block element | `margin-block-end` | `margin-bottom` |
| Inner horizontal start padding | `padding-inline-start` | `padding-left` |
| Top-left rounded corner in LTR | `border-start-start-radius` | `border-top-left-radius` |
| Align text with reading direction | `text-align: start` | `text-align: left` |
| Absolute position at trailing edge | `inset-inline-end: 0` | `right: 0` |

---

## Constraints

- **Shorthand Parsing Rules:** CSS logical shorthand properties (e.g. `margin-inline: 10px 20px;`) accept 1 or 2 values (`inline-start inline-end`). They do NOT accept 4-value physical clock syntax (`margin: top right bottom left`).
- **Border Radius Nomenclature:** Logical border radius properties use `start` / `end` naming for both block and inline axes: `border-start-start-radius` (block-start inline-start), `border-start-end-radius` (block-start inline-end), `border-end-start-radius`, and `border-end-end-radius`.
- **Flexbox & Grid Interactions:** CSS Grid and Flexbox natively align items according to `dir` and `writing-mode`. Avoid adding manual logical margins (`margin-inline-start`) inside Flexbox containers when `gap` or `justify-content` already manages direction-aware spacing.
- **Browser Compatibility:** Native Logical Properties are supported in all modern browsers (Chrome 89+, Safari 15+, Firefox 66+, Edge 89+). For legacy target builds, automated PostCSS plugins (`postcss-logical`) convert rules to physical fallbacks during compilation.

---

## Non-Goals

- Managing translation strings or string localization APIs (e.g., `i18next`).
- Managing physical HTML canvas rendering contexts or WebGL viewports.
- Overriding user-agent default scrollbar visual themes beyond standard CSS properties.

---

## Common Failure Patterns

- **Mixing 4-Value Physical Shorthand with Logical Intent:** Writing `margin: 10px 0 20px 15px;` expecting logical behavior. 4-value `margin`, `padding`, and `border-color` shorthands ALWAYS follow physical clock directions (`top right bottom left`). Use explicit logical properties (`margin-block-start`, `margin-inline-end`, etc.) or 2-value logical shorthands (`margin-inline`, `margin-block`).
- **Confusing `start` and `left` in Text Alignment:** Using `text-align: left` inside an Arabic (`dir="rtl"`) container, causing text to detach from the right border and stick awkwardly to the left margin.
- **Misassembling Logical Border Radius:** Writing `border-top-start-radius` (invalid syntax) instead of `border-start-start-radius` (correct specification syntax).
- **Physical Arrow / Icon Rotation Bugs:** Flipping text direction with `dir="rtl"` but forgetting to rotate directionally dependent icons (e.g., back arrows, chevron icons) using CSS transforms (`transform: scaleX(-1)`).
- **Hardcoding `width: 100vw` or `height: 100vh`:** Hardcoding `100vw` / `100vh` instead of `100vi` (viewport inline size) / `100vb` (viewport block size) when building layouts designed for vertical writing modes.

---

## Validation Steps

- [ ] **RTL Direction Toggle Test:** Add `dir="rtl"` to the root `<html>` or test container. Verify that margins, paddings, borders, text alignments, and absolute positions mirror cleanly without manual `[dir="rtl"]` overrides.
- [ ] **Vertical Writing Mode Test:** Apply `writing-mode: vertical-rl` to a test section. Confirm `inline-size` controls vertical height and `block-size` controls horizontal width as specified by CSS Writing Modes.
- [ ] **Physical Anti-Pattern Audit:** Scan CSS files for hardcoded `margin-left`, `margin-right`, `padding-left`, `padding-right`, `border-left`, `border-right`, `top`, `bottom`, `left`, `right`, `width`, `height`, `text-align: left`, and `text-align: right`.
- [ ] **Logical Shorthand Inspection:** Verify all shorthand rules (`padding-inline`, `margin-block`, `inset`) use valid 1 or 2 value syntax.
- [ ] **Validation Script Pass:** Run `node scripts/check-skills.mjs` to verify folder naming, frontmatter structure, and formatting integrity.
