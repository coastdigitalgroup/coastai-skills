---
name: faq-section-system
description:
  Design and structure Frequently Asked Question (FAQ) sections and help modules,
  managing layout composition, question grouping, category filters, search integration,
  contact fallback cards, and WCAG AA keyboard disclosure accessibility.
---

# FAQ Section System

## Purpose

The FAQ Section System provides a standardized framework for designing, organizing, and structuring Frequently Asked Questions (FAQ) sections, help drawers, and knowledge discovery modules across marketing websites, pricing pages, e-commerce checkout flows, and customer portals.

While individual collapsible disclosure components are governed by standard accordion primitives, a complete FAQ section addresses higher-level spatial composition, visual hierarchy, question chunking, category pill/tab filtering, search-based filtering, answer scannability, and high-converting contact fallback hooks. Without a dedicated system, FAQ sections often suffer from wall-of-text fatigue, poor question discoverability, unnavigable multi-column lists, inadequate touch hit targets, and broken keyboard navigation.

This system establishes rules for layout patterns (single-column centered, split 2-column sidebar, categorized grid), search/filter controls, visual hierarchy of question-and-answer pairs, response legibility, support escalation fallbacks, and WCAG 2.1 AA accessibility.

## Use Cases

- **SaaS Pricing & Plan Landing Pages:** Addressing pre-purchase objections (e.g., billing cycles, seat upgrades, cancellation policies, enterprise SLAs) directly below pricing tables.
- **E-Commerce Product Detail Pages (PDP):** Answering sizing, shipping times, return policies, materials, and warranty questions near purchase actions.
- **Marketing & Campaign Landing Pages:** Structuring key product or service disclosures, implementation timelines, and security certifications.
- **Customer Support & Help Centers:** Creating searchable, categorized self-serve knowledge hubs that reduce support ticket volume.
- **Onboarding & Feature Walkthroughs:** Explaining account setup, API key management, or data migration steps during user onboarding.

## When NOT to Use

- **Isolated Disclosure Controls:** For a single standalone expand/collapse control without section framing or list chunking, use `accordion-ui-system`.
- **Complex Step-by-Step Wizards:** For guided interactive workflows requiring sequential user input and state validation, use `stepper-and-wizard-system`.
- **Deep Hierarchical Documentation Trees:** For multi-tiered technical documentation with sidebars, code snippets, and nested pages, use `tree-view-navigation-system` or `sidebar-navigation-system`.
- **Dynamic Live Chat & AI Bots:** For conversational, multi-turn AI chat interfaces or live support widget windows, use `conversational-chat-ui-system`.

## Inputs

1. **Question & Answer Inventory:** Content schema containing question strings, formatted answer text (including lists, inline links, or bold emphasis), and category tags.
2. **Page Context & Intent:** Conversion-oriented (addressing sales friction on landing/pricing pages) vs. Support-oriented (resolving post-purchase help queries).
3. **Layout & Space Budget:** Full-page dedicated help section, compact 2-column inline section, or narrow drawer panel.
4. **Interactive Controls Schema:** Need for category pill tabs, real-time live search filter, or static grouped lists.
5. **Brand & Surface Tokens:** Background surface colors, border tokens, focus ring metrics, and typography scale from `accessible-color-system` and `fluid-typography-system`.

## Outputs

1. **Section Layout & Spatial Composition Blueprint:** Spatial layout specifications (e.g., centered 1-column, 2-column split with sticky category sidebar, or multi-column grid) with defined margins, padding, and max-width measures.
2. **Question Grouping & Filter Control Spec:** Design specification for category selector tabs/chips, search filter input field, and live query match highlights.
3. **Answer Typography & Framing Spec:** Formatting rules for question header typography (`h3`/`h4`), expandable answer container spacing, bullet formatting, and inline link contrast.
4. **Escalation & Support Fallback Card Spec:** Layout and copy guidelines for the secondary CTA block ("Still have questions? Contact support").
5. **Accessible Markup & ARIA Specification:** WCAG AA compliant disclosure markup (`<details>`/`<summary>` or `<button aria-expanded>`) with screen reader live region query announcements.

---

## Workflow

### 1. Select Layout Architecture Based on Question Density
Determine the overall layout composition according to question volume and page context:

```text
[ SINGLE-COLUMN CENTERED (1–8 Questions) ]
+-------------------------------------------------+
|                   FAQ Header                    |
|  [Q1: Question Title                   (+) ]    |
|  [Q2: Question Title                   (+) ]    |
|  [Q3: Question Title                   (+) ]    |
+-------------------------------------------------+

[ SPLIT 2-COLUMN SIDEBAR (8–20 Questions) ]
+-------------------------------------------------+
|  Categories (Sticky)  |  Questions & Answers    |
|  * General            |  [Q1: Title      (+) ]  |
|  * Billing & Plans    |  [Q2: Title      (+) ]  |
|  * Security & Tech    |  [Q3: Title      (+) ]  |
+-------------------------------------------------+
```

- **Pattern A: Single-Column Centered (1–8 Questions):**
  - Best for pricing pages and targeted product landing pages.
  - Constrain content measure to `max-width: 800px` (or 48rem–52rem) centered in the container.
  - Stack accordion items vertically with `12px`–`16px` gaps between items.
- **Pattern B: Split 2-Column Sidebar (8–20 Questions):**
  - Best for comprehensive product landing pages or dedicated help sections.
  - Left Column (1/3 width, `min-width: 260px`): Section header, category filter list (sticky on scroll), search input, and support contact card.
  - Right Column (2/3 width): Filtered accordion list of question/answer items.
- **Pattern C: Multi-Category Grid (12+ Questions across Distinct Topics):**
  - Best for customer support hubs and self-serve help centers.
  - Divide section into distinct category blocks (e.g., "Account & Billing", "Shipping & Returns", "Security") arranged in a 2-column or 3-column card grid, each containing 3–5 items.

### 2. Implement Category Filtering & Search Controls
When the question count exceeds 8 items, implement progressive filtering to prevent cognitive overload:

- **Category Filter Chips / Tabs:**
  - Render category pills ("All", "Pricing", "Features", "Security", "Account") horizontally above the accordion stack.
  - Active chip uses primary fill color (`background-color: var(--color-primary); color: #ffffff`) with `aria-pressed="true"` or `aria-selected="true"`.
  - Inactive chips use subtle outline styling with minimum 3:1 boundary contrast and 4.5:1 text contrast.
- **Search Filter Input:**
  - Provide an search input with a clear search icon (`aria-label="Search frequently asked questions"`).
  - Filter questions and answers in real-time as the user types.
  - Highlight matching term keywords using `<mark>` or high-contrast background highlights.
  - Announce filter results to screen readers using an `aria-live="polite"` status region (e.g., "Showing 3 questions matching 'billing'").

### 3. Format Question and Answer Content Hierarchy
Ensure clear visual distinction between question headers and answer content:

- **Question Headers:**
  - Render questions as semantic headings (`<h3>` or `<h4>` depending on page hierarchy) wrapped inside interactive disclosure triggers.
  - Font size: `1.125rem`–`1.25rem` (18px–20px), semi-bold (`font-weight: 600`), with primary text color.
  - Include an explicit trailing indicator icon (`+` / `-` or chevron) rotated smoothly via CSS transition (`transform: rotate(180deg)` over `200ms`).
  - Interactive target area must span the full width of the container with a minimum height of `48px` and `padding: 1rem 1.25rem`.
- **Answer Body:**
  - Padding: `1rem 1.25rem 1.25rem` inside the expanded panel.
  - Typography: `1rem` (16px), `line-height: 1.6` for optimal legibility.
  - Support formatted content: Paragraphs, bulleted lists (`<ul>`), bold highlights (`<strong>`), and callout boxes.
  - Links inside answers must be distinctly styled with an underline and maintain 4.5:1 contrast ratio against the panel background.

### 4. Position Support Escalation & Contact Fallback
Even comprehensive FAQs cannot answer every user edge case. Always provide a clear secondary escalation path:

- **Contact Support Card:**
  - Position below or alongside the main FAQ accordion stack.
  - Include headline: *"Still have questions?"* or *"Can't find what you're looking for?"*.
  - Supporting text: *"Our support team is available 24/7 to help you with your account."*.
  - Provide primary contact triggers: "Contact Support", "Start Live Chat", or "Submit a Ticket" buttons using `button-and-action-system`.
  - Style with subtle surface contrast or brand accent tint to draw visual attention without competing with primary page CTAs.

### 5. Program WCAG AA Accessibility & Keyboard Navigation
Ensure seamless accessibility across all input devices and assistive technology:

- **Native `<details>` and `<summary>` Implementation (Recommended):**
  ```html
  <details class="faq-item">
    <summary class="faq-item__question">
      <span>What payment methods do you accept?</span>
      <svg class="faq-item__icon" aria-hidden="true" ...></svg>
    </summary>
    <div class="faq-item__answer">
      <p>We accept all major credit cards including Visa, Mastercard, and AMEX.</p>
    </div>
  </details>
  ```
- **Custom Button + Region ARIA Implementation (Alternative):**
  ```html
  <div class="faq-item">
    <h3>
      <button
        type="button"
        id="faq-btn-1"
        aria-expanded="false"
        aria-controls="faq-ans-1"
        class="faq-item__trigger">
        <span>What payment methods do you accept?</span>
        <svg class="faq-item__icon" aria-hidden="true" ...></svg>
      </button>
    </h3>
    <div
      id="faq-ans-1"
      role="region"
      aria-labelledby="faq-btn-1"
      hidden
      class="faq-item__panel">
      <p>We accept all major credit cards including Visa, Mastercard, and AMEX.</p>
    </div>
  </div>
  ```
- **Keyboard Interaction Rules:**
  - `Tab` / `Shift+Tab`: Focuses sequentially through question summary triggers, active category chips, search inputs, and links inside open answer panels.
  - `Space` / `Enter`: Toggles expand/collapse state of the focused question item.
  - `Focus-Visible`: Focused triggers must feature a visible 2px offset outline (`outline: 2px solid var(--focus-ring); outline-offset: 2px`).

---

## Decision Rules

### Layout Architecture Selection Matrix

| Scenario / Question Count | Recommended Layout | Category Navigation | Search Input Required? |
| :--- | :--- | :--- | :--- |
| **1 – 6 Questions** (Pricing / Landing Page) | **Single-Column Centered** | None | No |
| **7 – 12 Questions** (Product Features) | **Single-Column Stack** | Top Category Filter Pills | Optional |
| **12 – 20 Questions** (SaaS / E-Commerce PDP) | **Split 2-Column Sidebar** | Sticky Left Category List | Highly Recommended |
| **20+ Questions** (Help Center / Knowledge Hub) | **Multi-Category Card Grid** | Multi-Tab Grid / Full Search | Mandatory |

### Accordion State Logic (Single vs Multi-Expand)
- **Multi-Expand (Default & Recommended for FAQs):** Allow multiple question panels to remain open simultaneously. This allows users to compare answers across related questions without losing context.
- **Single-Expand (Accordion Exclusive):** Auto-collapse previously opened items when a new question is clicked. Use ONLY when vertical viewport space is strictly constrained (e.g., mobile checkout drawers).

---

## Constraints

- **Accessibility (WCAG 2.1 / 2.2 AA):**
  - **SC 1.4.3 Contrast (Minimum):** Question headers, answer text, filter chips, and links must satisfy at least **4.5:1** contrast ratio against panel surfaces.
  - **SC 2.1.1 Keyboard:** All summary triggers, filter pills, search fields, and answer links must be completely operable via keyboard.
  - **SC 2.4.7 Focus Visible:** Interactive focus states must feature unclipped focus indicators with ≥3:1 contrast against surrounding surfaces.
  - **SC 2.5.8 Target Size:** Question summary row triggers must measure at least **48px** in vertical touch height.
- **Responsiveness & Stacking:**
  - On mobile viewports (`< 768px`), split 2-column sidebar layouts MUST collapse into a single stacked column with category filter chips converting into a horizontally scrollable pill track.
- **Max Content Measure:**
  - Paragraph text measures within answers must remain between **45 and 75 characters per line** (`ch` units) to ensure comfortable reading.

---

## Common Failure Patterns

- **Wall-of-Text Uncollapsible List:** Displaying 15 long questions and answers fully expanded by default, forcing users to scroll endlessly to find relevant information.
- **Unreachable Touch Targets:** Setting question row heights to 28px or restricting click targets strictly to the icon instead of the full row width.
- **Missing Contact Fallback:** Presenting an FAQ section without a clear "Contact Support" secondary CTA when questions fail to solve the user's problem.
- **Tiny Low-Contrast Answer Text:** Styling answer text in 12px light gray text (`#94A3B8` on white), violating WCAG AA contrast rules and causing eye strain.
- **Broken Search State:** Filtering questions via search but failing to expand matching items or announce filtered counts to screen reader users.
- **Center-Aligned Long Answer Paragraphs:** Centering multi-line answer paragraphs, breaking left-aligned reading scanning patterns.

---

## Validation Criteria

- [ ] FAQ section uses a defined layout pattern (Single-Column, Split 2-Column, or Category Grid) appropriate for question volume.
- [ ] Question summary triggers measure at least 48px in touch height with full-row clickability.
- [ ] Disclosure state is implemented via native `<details>`/`<summary>` or aria-expanded button region semantics.
- [ ] Category filter pills or search inputs update item visibility dynamically and announce changes via `aria-live`.
- [ ] A dedicated "Still have questions? Contact Support" card or fallback CTA is included below or beside the FAQ list.
- [ ] Answer typography uses left-aligned text with `line-height: 1.5`–`1.6` and 4.5:1 minimum WCAG AA contrast.
- [ ] Responsive layout collapses 2-column splits cleanly onto mobile viewports without horizontal scroll overflow.
