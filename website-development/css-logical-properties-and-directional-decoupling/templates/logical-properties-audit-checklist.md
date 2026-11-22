# CSS Logical Properties Audit Checklist & Refactoring Protocol

This checklist provides a systematic step-by-step auditing procedure and refactoring strategy for eliminating physical direction debt (`margin-left`, `width`, `right`, `text-align: left`) and migrating CSS stylesheets to directionally decoupled CSS Logical Properties and Values.

---

## Phase 1: Automated & Static Codebase Audit

### 1. Identify Hardcoded Physical Properties
Scan all project `.css`, `.scss`, `.vue`, `.jsx`, `.tsx`, and template files for physical directional properties:

- [ ] **Physical Margins:** `margin-left`, `margin-right`, `margin-top`, `margin-bottom`
- [ ] **Physical Paddings:** `padding-left`, `padding-right`, `padding-top`, `padding-bottom`
- [ ] **Physical Dimensions:** `width`, `min-width`, `max-width`, `height`, `min-height`, `max-height`
- [ ] **Physical Borders:** `border-left`, `border-right`, `border-top`, `border-bottom`
- [ ] **Physical Border Radii:** `border-top-left-radius`, `border-top-right-radius`, `border-bottom-left-radius`, `border-bottom-right-radius`
- [ ] **Physical Position Anchors:** `top`, `bottom`, `left`, `right`
- [ ] **Physical Alignments & Floats:** `text-align: left`, `text-align: right`, `float: left`, `float: right`, `clear: left`, `clear: right`

### 2. Audit 4-Value Clockwise Shorthands
Inspect all 4-value shorthand declarations. Clockwise shorthands always evaluate physical directions (`top right bottom left`) regardless of document writing mode:
- [ ] `margin: 10px 15px 20px 5px;` $\rightarrow$ Audit and refactor into explicit logical properties or 2-value logical shorthands (`margin-block`, `margin-inline`).
- [ ] `padding: 1rem 2rem 1.5rem 0.5rem;` $\rightarrow$ Audit and refactor into `padding-block` and `padding-inline`.
- [ ] `border-color: red green blue yellow;` $\rightarrow$ Audit and refactor into `border-block-color` and `border-inline-color`.

---

## Phase 2: Systematic Refactoring Protocol

### 1. Refactor Box Model Dimensions
Replace fixed horizontal and vertical pixel/percent dimensions with inline and block equivalents:

| Old Physical Syntax | Refactored Logical Syntax | Verified |
| :--- | :--- | :---: |
| `width: 100%;` | `inline-size: 100%;` | [ ] |
| `max-width: 1200px;` | `max-inline-size: 1200px;` | [ ] |
| `height: auto;` | `block-size: auto;` | [ ] |
| `min-height: 100vh;` | `min-block-size: 100vb;` | [ ] |

### 2. Refactor Spacing & Alignment
Convert margins, paddings, and text alignment to logical properties:

| Old Physical Syntax | Refactored Logical Syntax | Verified |
| :--- | :--- | :---: |
| `margin-left: 1rem;` | `margin-inline-start: 1rem;` | [ ] |
| `margin-right: 2rem;` | `margin-inline-end: 2rem;` | [ ] |
| `padding-top: 0.5rem; padding-bottom: 0.5rem;` | `padding-block: 0.5rem;` | [ ] |
| `padding-left: 1rem; padding-right: 1rem;` | `padding-inline: 1rem;` | [ ] |
| `text-align: left;` | `text-align: start;` | [ ] |
| `text-align: right;` | `text-align: end;` | [ ] |
| `float: left;` | `float: inline-start;` | [ ] |

### 3. Refactor Absolute Positioning & Overlays
Convert absolute/fixed positioning coordinates:

| Old Physical Syntax | Refactored Logical Syntax | Verified |
| :--- | :--- | :---: |
| `top: 0; bottom: 0; left: 0; right: 0;` | `inset: 0;` | [ ] |
| `top: 10px; right: 10px;` | `inset-block-start: 10px; inset-inline-end: 10px;` | [ ] |
| `bottom: 0; left: 0;` | `inset-block-end: 0; inset-inline-start: 0;` | [ ] |

### 4. Refactor Borders & Rounded Corners
Convert physical borders and corner radii:

| Old Physical Syntax | Refactored Logical Syntax | Verified |
| :--- | :--- | :---: |
| `border-left: 2px solid blue;` | `border-inline-start: 2px solid blue;` | [ ] |
| `border-right: none;` | `border-inline-end: none;` | [ ] |
| `border-top-left-radius: 8px;` | `border-start-start-radius: 8px;` | [ ] |
| `border-bottom-left-radius: 8px;` | `border-end-start-radius: 8px;` | [ ] |
| `border-top-right-radius: 8px;` | `border-start-end-radius: 8px;` | [ ] |

---

## Phase 3: Visual & Functional Verification Pass

### 1. LTR Mode Verification (`dir="ltr"`)
- [ ] Verify element margins, paddings, text alignments, and border accent lines render identically to the baseline physical layout in LTR.

### 2. RTL Mode Verification (`dir="rtl"`)
- [ ] Toggle root element to `<html dir="rtl">`.
- [ ] Confirm text alignment flips to right-aligned without line overflow.
- [ ] Confirm avatar/thumbnail floating moves to the right side of content cards.
- [ ] Confirm absolute badges and close buttons shift from top-right to top-left.
- [ ] Confirm accent borders (e.g. `border-inline-start`) mirror to the right border in RTL.
- [ ] Confirm directional icons (arrows, chevrons, pagination controls) flip horizontal orientation via `transform: scaleX(-1)`.

### 3. Vertical Writing Mode Verification (`writing-mode: vertical-rl`)
- [ ] Test section or container with `writing-mode: vertical-rl`.
- [ ] Confirm `inline-size` governs vertical height and `block-size` governs horizontal width as expected.
- [ ] Confirm scrollable containers utilize `overflow-inline: auto` without layout breakage.

---

## Phase 4: Code Cleanliness & Debt Elimination

- [ ] **Eliminate Redundant Override Block Rules:** Search for and delete legacy `html[dir="rtl"] .my-component { margin-left: 0; margin-right: 1rem; }` override blocks that are now handled natively by logical properties.
- [ ] **Verify Build System Preprocessors:** If targeting legacy browser environments, confirm PostCSS `postcss-logical` is configured in the compilation pipeline.
