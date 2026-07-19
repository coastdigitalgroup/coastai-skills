# FAQ Reference: UX Heuristics & Search Compliance

This reference guide details the UX interaction heuristics, accessibility standards, and SEO compliance guidelines necessary to construct high-performing, compliant FAQ sections.

---

## 1. UX Heuristics for Conversational Reassurance

### The Proximity Rule
Users experience doubts at the exact moment they are asked to make a commitment (e.g., clicking a pricing button, entering a credit card). Burying answers in a standalone `/faqs` page forces users to leave their conversion flow.
*   **Action:** Position the FAQ section on the same page, directly under the primary pricing or feature grids. It acts as a safety net, absorbing prospects who scroll past the main offer because of unresolved friction.

### The Contrast Rule (No Promotional Distractions)
FAQ sections should be visually clean. Excessive colors, background shapes, or illustrative clutter distract users from absorbing the written answers.
*   **Action:** Use high-contrast, clean typography (dark text on a light background or vice versa). Keep accordion background styles minimal—focusing attention on the scannability of the headings.

### Micro-Feedback Loops
Tracking user interactions inside the FAQ provides highly structured user-intent signals.
*   **Action:** Analyze click-expand metrics. An accordion-expand represents an active declaration of concern. If one question has a disproportionately high click rate, it indicates a critical gap in the primary page copy. Use this feedback loop to revise above-the-fold value propositions.

---

## 2. WCAG Accordion Accessibility (ARIA Spec)

To ensure compliance with WCAG 2.1 and 2.2 standards, accordions must support keyboard navigation and screen-reader announcements. Custom implementations using simple styled `<div>` elements with click events are non-compliant.

### Semantic Markup Requirements
Each accordion unit must consist of a header (trigger) and a panel (content).

1.  **The Trigger Button:**
    *   Must use a semantic `<button>` element.
    *   Must have an `aria-expanded` attribute set dynamically to `"true"` or `"false"`.
    *   Must have an `aria-controls` attribute pointing to the unique ID of the corresponding content panel.
2.  **The Content Panel:**
    *   Must have a unique ID that matches the trigger's `aria-controls` value.
    *   Must have `role="region"` to provide a structural landmark.
    *   Must have `aria-labelledby` pointing to the ID of the trigger button.

### Accessible HTML Structure Boilerplate
```html
<!-- Accordion Header -->
<h3>
  <button
    type="button"
    id="faq-trigger-1"
    aria-expanded="false"
    aria-controls="faq-panel-1"
    class="faq-accordion-trigger"
  >
    Can I cancel my subscription at any time?
    <span class="chevron-icon" aria-hidden="true">▼</span>
  </button>
</h3>

<!-- Accordion Panel -->
<div
  id="faq-panel-1"
  role="region"
  aria-labelledby="faq-trigger-1"
  class="faq-accordion-panel"
  hidden
>
  <p>
    <strong>Yes. You can cancel your subscription instantly</strong> from your dashboard settings with zero penalties or extra fees.
  </p>
  <a href="/billing-faq">View Billing Policy →</a>
</div>
```

### Keyboard Navigation Specifications
The accordion component must handle the following keyboard interactions:

*   **Tab Key:** Moves focus between accordion headers. Focus indicators must be highly visible (minimum 2px outline with high contrast).
*   **Space or Enter:** When focus is on an accordion header, pressing Space or Enter toggles the expansion state of the content panel.
*   **Arrow Keys (Optional but Recommended):** Up Arrow moves focus to the previous accordion header; Down Arrow moves focus to the next accordion header.

---

## 3. SEO Schema & Search Compliance

Structured data allows search engines to read, parse, and display your FAQ content directly in organic search results. However, search engines strictly enforce compliance guidelines to prevent web spam.

### Google Search Quality Compliance Rules

1.  **Exact Match Constraint:** The content mapped in your JSON-LD schema must match the exact visible text displayed on the webpage. Using different, keyword-stuffed text in the schema to manipulate search rankings will result in schema penalties and rich-result suppression.
2.  **User-Generated Content (UGC) Prohibition:** Do not use `FAQPage` schema for forum posts, collaborative Q&A sites, or comments where multiple users can write different answers to the same question. For those use cases, use `QAPage` schema instead.
3.  **No Advertising or Obscene Content:** FAQ schema must not contain advertising, promotional copy, or offensive content. Link anchors inside FAQ answers are permitted, but they should be highly relevant and reference functional support or documentation pages.
4.  **No Duplicate Schema on the Same Site:** If the same FAQ question/answer is displayed on multiple pages of your website, only apply the `FAQPage` schema to the primary, most authoritative page (e.g., the pricing page, not a blog post).
