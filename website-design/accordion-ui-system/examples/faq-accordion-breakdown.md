# Example: FAQ Accordion Breakdown

This example demonstrates the Accordion UI System applied to a standard
Customer Support FAQ section.

## Scenario
A SaaS company needs to display 10 frequent questions about their pricing and
security. A standard list of questions would create a very long page, forcing
users to scroll past irrelevant information.

## The Solution: Progressive Disclosure

### 1. Anatomy of the FAQ Item

- **The Header:**
  - Typography: H3, Semi-bold, `--text-base`.
  - Padding: `--space-s` (top/bottom), `--space-m` (left/right).
  - Background: White (default), Light Gray (hover).
- **The Icon:**
  - A 20px Chevron-Down icon on the right edge.
  - Rotation: 180 degrees when `aria-expanded="true"`.
- **The Panel:**
  - Padding: `--space-m` internal padding for the answer text.
  - Border: Bottom border (1px, light gray) to separate items.

### 2. Interaction Strategy

- **Exclusive Expansion:** To keep the support page clean, only one answer can
  be open at a time. If the user clicks "Is my data secure?", any other open
  answer (like "How much does it cost?") automatically slides closed.
- **Default State:** The first question ("How do I get started?") is open by
  default to show users that the sections are interactive.

### 3. Visual Hierarchy Lever (Before vs. After)

**Before (Static List):**
10 Questions and 10 Answers all visible.
- Page height: 2400px.
- Cognitive load: High (User has to filter text manually).

**After (Accordion System):**
10 Questions visible, 1 Answer visible.
- Page height: 800px.
- Cognitive load: Low (User scans only the bold questions).

## Accessibility Implementation

```html
<!-- Example of a single item in the FAQ group -->
<div class="accordion-item">
  <h3>
    <button
      type="button"
      aria-expanded="true"
      aria-controls="panel-1"
      id="header-1"
      class="accordion-trigger"
    >
      <span>How do I get started?</span>
      <svg class="icon" aria-hidden="true">...</svg>
    </button>
  </h3>
  <div
    id="panel-1"
    role="region"
    aria-labelledby="header-1"
    class="accordion-panel"
  >
    <p>To get started, simply sign up for a free account...</p>
  </div>
</div>
```

## Results
- **Mobile Usability:** Users can find the 10th question without excessive
  thumb-scrolling.
- **Scan-ability:** The bold headers create a clear vertical rhythm, allowing
  users to find their specific concern in seconds.
