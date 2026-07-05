---
name: pricing-table-ui-system
description:
  Design and implement a systematic framework for pricing grids and tables,
  managing tier hierarchy, feature comparison, and billing logic to reduce
  cognitive load and guide conversion.
---

# Pricing Table UI System

## Purpose

The Pricing Table UI System provides a methodology for designing the visual and
structural organization of pricing tiers. It ensures that users can easily
compare plans, understand value differences, and select the appropriate option
without cognitive overload. This system focuses on the **spatial arrangement**
of tiers, the **hierarchy of features**, and the **interactive affordances**
(like billing toggles) that support the purchase decision.

## Use Cases

- Designing subscription plan grids for SaaS applications.
- Structuring tiered service offerings (e.g., Agency packages).
- Creating comparison matrices for physical product bundles.
- Standardizing pricing layouts across a multi-product company.
- Implementing responsive pricing "cards" that maintain context on mobile.

## When NOT to Use

- **Single-Product E-commerce:** Use `product-page-optimization` for single
  items with no competing tiers.
- **Enterprise-Only Custom Quotes:** If every price is "Contact Us," focus on
  lead capture form design.
- **Pure Data Comparison:** For comparing technical specs of 10+ items, use
  `data-table-ui-system`.
- **Dynamic/Auction Pricing:** Where price is determined by bidding or real-time
  market fluctuations.

## Inputs

1. **Plan Tiers:** The names, prices, and intended audience for each tier.
2. **Feature Inventory:** A comprehensive list of features, categorized by
   priority.
3. **Billing Cycles:** Options for monthly vs. annual billing and associated
   discounts.
4. **Primary Target:** Which plan is the "Goldilocks" or "Best Value" option?
5. **Brand Style Tokens:** Spacing, typography, and color scales from the parent
   system.

## Outputs

1. **Pricing Grid Anatomy:** Definition of the Tier Card (Header, Price,
   Features, CTA).
2. **Billing Toggle Spec:** Design for switching between different payment
   terms.
3. **Feature Comparison Logic:** Rules for how features are displayed, hidden,
   or summarized across tiers.
4. **Tier Highlighting Strategy:** Visual methods for emphasizing the
   recommended plan.
5. **Responsive Stacking Plan:** How the grid adapts to mobile viewports.

## Workflow

### 1. Structure the Tier Anatomy

Apply the `visual-hierarchy-system` to the individual pricing card:
- **Header:** Plan name and a brief value proposition (e.g., "For growing
  teams").
- **Price Block:** The currency, amount, and interval (e.g., "/mo"). Ensure the
  amount is the most prominent element.
- **Feature List:** The top 5-7 most important features.
- **CTA:** A high-contrast button to select the plan.

### 2. Design the "Anchor" Tier (Highlighting)

Identify the primary plan and make it visually dominant:
- **Elevation:** Use a subtle box shadow or border to make it "pop."
- **Color:** Use a brand color for the header or CTA button.
- **Badging:** Add a "Most Popular" or "Best Value" ribbon/badge.
- **Scale:** Increase the card's height slightly compared to neighbors.

### 3. Establish the Billing Logic

Design the mechanism for switching between billing cycles (e.g., Monthly vs.
Yearly):
- **The Toggle:** Use a clear switch or tabbed interface.
- **Discount Signaling:** Clearly state the saving (e.g., "Save 20%") near the
  Yearly option.
- **Contextual Pricing:** Ensure the prices in the cards update instantly when
  the toggle is switched.

### 4. Manage Feature Comparison

Organize features to prevent "The Wall of Text":
- **Primary Features:** List unique value drivers at the top.
- **Feature Grouping:** Group similar features (e.g., "Support," "Security")
  if the list is long.
- **Checkmarks vs. Text:** Use icons for binary features (Yes/No) and text
  for limits (e.g., "Up to 10 users").
- **"Show All" Link:** For complex tiers, keep the card short and provide a
  link to a full comparison table below.

### 5. Define Responsive Stacking

Map how the grid collapses for smaller screens:
- **Horizontal Scroll vs. Vertical Stack:** On mobile, stack tiers vertically
  to ensure readability.
- **Sticky Header:** For vertical stacks, consider a sticky bar that keeps the
  Plan Name and Price visible as the user scrolls through features.
- **Plan Comparison Mode:** On mobile, allow users to "swipe" between tiers
  to compare them horizontally if a vertical stack is too long.
- **Container Queries:** Prefer container queries over viewport breakpoints
  for the tier card itself, since pricing grids are often embedded in
  varying-width contexts (e.g., a homepage section vs. a full pricing page).

## Decision Rules

- **The Power of Three:** Three tiers (e.g., Basic, Pro, Enterprise) is the
  optimal number for reducing choice paralysis.
- **Price Prominence:** The price should be the second most prominent element
  after the "Best Value" badge.
- **Consistent CTAs:** All tiers should have a CTA at the same vertical
  position (usually aligned to the bottom of the card).
- **The "No Hidden Terms" Rule:** Always show the billing frequency near the
  price (e.g., "$29/mo billed annually").
- **Binary Clarity:** Use clear, high-contrast checkmarks for included
  features; use a muted "X" or just omit excluded features to avoid negative
  visual noise.

## Constraints

- **Accessibility:** Toggles must be keyboard-accessible and expose their
  state via `aria-checked` or `aria-pressed`. Price text must meet WCAG AA
  contrast (4.5:1), and all interactive targets (toggle, CTA buttons) must
  meet the WCAG 2.2 24x24px minimum target size (2.5.8).
- **Responsiveness:** Pricing cards must never have a fixed width; they should
  be fluid within the `responsive-grid-system`.
- **Currency Support:** Design for varying currency symbol lengths (e.g., "$10"
  vs. "1,000 kr") and use logical CSS properties (`margin-inline`,
  `padding-inline`) so layouts adapt correctly for RTL locales.

## Common Failure Patterns

- **Feature Overload:** Listing 20+ features in a single card, making it
  impossible to scan.
- **Invisible Toggles:** Making the billing cycle switch so small that users
  don't realize they can get a discount.
- **The "Floating CTA":** Buttons that aren't aligned across cards, making the
  grid look disorganized.
- **Ambiguous Pricing:** Not clarifying if a price is per-user or a flat fee
  until the checkout.
- **Lack of Tier Differentiation:** Plans that look so similar that the user
  doesn't know which one to pick.

## Validation Criteria

- [ ] A clear visual hierarchy exists between the tiers (Recommended tier is
      highlighted).
- [ ] Prices are the most prominent element after tier names.
- [ ] Billing toggle is clearly visible and updates prices instantly.
- [ ] Features are limited to the top 5-7 per card.
- [ ] CTAs are aligned horizontally across all cards in the grid.
- [ ] Mobile view stacks cards vertically or provides an accessible swipe
      pattern.
- [ ] All interactive elements (toggles, buttons) are keyboard accessible.
- [ ] Contrast ratios for prices and badges meet WCAG AA.
