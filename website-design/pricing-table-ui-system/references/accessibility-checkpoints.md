# Reference: Accessibility Checkpoints for Pricing Tables

Pricing tables are complex UI structures that require careful accessibility
handling to ensure they are usable by keyboard and screen reader users.

## 1. Contrast Ratios (WCAG 2.1 AA)

- **Large Text (Price):** If the price is 18pt/24px or larger, it must have a
  contrast ratio of at least **3:1** against the background.
- **Normal Text (Features):** Must have a contrast ratio of at least **4.5:1**.
- **Badges/Ribbons:** Text inside "Most Popular" badges must meet contrast
  standards. Do not rely on background color alone to signal importance.
- **Checkmarks:** Ensure the icon color has at least a **3:1** contrast ratio
  against the background.

## 2. Keyboard & Interaction

- **Billing Toggles:**
  - Must be reachable via `Tab`.
  - Must have a clear visual **Focus State** (e.g., an outline).
  - Use `role="switch"` or `role="radiogroup"` with appropriate `aria-checked`
    or `aria-selected` states.
- **CTA Buttons:** Must follow standard button accessibility rules (accessible
  names, keyboard triggers).

## 3. Screen Reader Navigation (ARIA)

- **Headings:** Use a logical hierarchy. The Page title is `H1`, the Pricing
  Section is `H2`, and individual Plan Names are `H3`.
- **Lists:** Use semantic `<ul>` and `<li>` for feature lists so screen readers
  can announce the number of items.
- **Announcing Updates:** If the prices change via a toggle without a page
  refresh, use `aria-live="polite"` on the price container so the new price is
  announced to the user.
- **Contextual Labels:** If multiple buttons say "Get Started," provide
  context via `aria-label` (e.g., `aria-label="Get Started with Professional
  Plan"`).

## 4. Tabular Data (Comparison Tables)

- **Semantic Tags:** Use `<table>`, `<thead>`, `<tbody>`, `<th>`, and `<td>`.
- **Scope:** Use `scope="col"` for plan names in the header and `scope="row"`
  for feature names in the first column.
- **Captions:** Use a `<caption>` element to provide a brief description of the
  table's purpose.

## 5. Responsive Accessibility

- **Touch Targets:** On mobile, ensure every interactive element (toggle
  labels, buttons) is at least **44x44px**.
- **Visual Order:** Ensure the DOM order matches the visual order of tiers to
  prevent confusing keyboard navigation.
