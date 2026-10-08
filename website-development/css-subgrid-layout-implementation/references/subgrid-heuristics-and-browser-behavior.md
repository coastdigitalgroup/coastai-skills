# CSS Subgrid Heuristics & Browser Behavior

## Overview

CSS Subgrid is a feature of the CSS Grid Layout Module Level 2 specification. It enables a nested grid container that spans multiple parent grid tracks to participate directly in the parent grid's sizing calculation and track alignment, rather than establishing its own independent, isolated grid context.

---

## Technical Mechanics

### 1. Independent Axis Subgrid Selection
Unlike full subgrid specification concepts in early proposals, CSS Subgrid can be enabled on **one axis independently** or **both axes simultaneously**:

```css
/* Subgrid along rows only; columns are independent */
.card {
  display: grid;
  grid-template-rows: subgrid;
  grid-template-columns: repeat(2, 1fr); /* Local columns */
}

/* Subgrid along columns only; rows are independent */
.form-row {
  display: grid;
  grid-template-columns: subgrid;
  grid-template-rows: auto; /* Local rows */
}

/* Dual-axis subgrid */
.widget {
  display: grid;
  grid-template-rows: subgrid;
  grid-template-columns: subgrid;
}
```

### 2. Line Numbering & Local Scoping
Within a subgrid container:
- Subgrid track line numbers **start at 1**, corresponding to the first inherited line spanned by the subgrid element in the parent grid, regardless of its position in the parent grid.
- For example, if a `.card` is placed at parent grid line `grid-row: 5 / 9` (spanning 4 tracks), inside `.card`:
  - Line 1 = Parent line 5
  - Line 2 = Parent line 6
  - Line 3 = Parent line 7
  - Line 4 = Parent line 8
  - Line 5 = Parent line 9

```css
.card {
  grid-row: 5 / 9; /* Parent lines 5 to 9 */
  display: grid;
  grid-template-rows: subgrid;
}

.card-title {
  grid-row: 1; /* Maps to local subgrid line 1 (parent line 5) */
}
```

### 3. Gap Inheritance Mechanics
- By default, a subgrid element **inherits the gap** defined on the parent grid for the subgrid axis.
- A subgrid element can override this inherited gap by specifying `row-gap` or `column-gap`:

```css
.parent-grid {
  display: grid;
  gap: 2rem; /* Subgrid will inherit 2rem gap by default */
}

.subgrid-child {
  display: grid;
  grid-template-rows: subgrid;
  row-gap: 0.5rem; /* Overrides parent gap for subgrid rows */
}
```

### 4. Padding, Borders, and Margins on Subgrid Elements
- Padding, borders, and margins added to a subgrid container element are applied at the edges of the subgrid span.
- The start and end track lines of the subgrid align with the content area of the subgrid element, expanding the parent track size if necessary to accommodate padding/border dimensions.

---

## Browser Support Matrix & Feature Detection

| Browser Engine | Version Supported | Notes |
| :--- | :--- | :--- |
| **Mozilla Firefox (Gecko)** | Firefox 71+ (Dec 2019) | First engine to ship full subgrid support |
| **Apple Safari (WebKit)** | Safari 16.0+ (Sep 2022) | Full support in WebKit |
| **Google Chrome (Blink)** | Chrome 117+ (Sep 2023) | Full support in Blink engine |
| **Microsoft Edge (Blink)** | Edge 117+ (Sep 2023) | Standard Blink support |

### Feature Query Pattern
Always encapsulate subgrid-dependent styles inside CSS `@supports` feature queries to guarantee graceful degradation in older engines:

```css
/* Base Flexbox Fallback */
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.card {
  display: flex;
  flex-direction: column;
  flex: 1 1 300px;
}

/* Enhanced Subgrid Layout */
@supports (grid-template-rows: subgrid) {
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    grid-template-rows: repeat(4, auto);
  }

  .card {
    display: grid;
    grid-row: span 4;
    grid-template-rows: subgrid;
  }
}
```

---

## Accessibility & DOM Ordering Heuristics

1. **Maintain Logical DOM Order:** Never use subgrid row or column line placement to visually scramble the order of elements in a way that breaks reading comprehension or keyboard tab flow.
2. **Preserve Semantic Containers:** Use subgrid specifically so you do *not* have to flatten semantic HTML (`<article>`, `<fieldset>`, `<section>`). Subgrid allows full semantic nesting while granting direct track alignment.
3. **Screen Reader Virtual Cursor Continuity:** Screen readers traverse elements in DOM order. Subgrid keeps card titles, content, and footers grouped within their respective semantic `<article>` containers during reading.
