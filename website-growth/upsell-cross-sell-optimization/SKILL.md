---
name: upsell-cross-sell-optimization
description:
  Audit and optimize strategies for upselling and cross-selling to increase
  Average Order Value (AOV) and Customer Lifetime Value (CLV). Trigger this
  skill when a site has healthy conversion rates but low revenue per visitor or
  underperforming bundle offers.
---

# Upsell and Cross-sell Optimization

## Purpose

The Upsell and Cross-sell Optimization skill provides a systematic framework for
increasing the value of every transaction. By strategically presenting higher-value
alternatives (upselling) or complementary products (cross-selling) at key
decision points, this skill aims to maximize Average Order Value (AOV) and
Revenue Per Visitor (RPV) while maintaining a positive user experience.

## Use Cases

- E-commerce stores looking to increase AOV through bundles or add-ons.
- SaaS platforms encouraging users to upgrade to higher-tier plans during
  onboarding or at usage limits.
- B2B services offering specialized "pro" add-ons to standard service packages.
- Mobile apps using in-app prompts for premium feature unlocks.

## When NOT to Use

- **Low Conversion Rate Sites:** If the baseline conversion rate is poor, focus
  on `hero-section-optimization` or `product-page-optimization` first. Adding
  upsells to a leaky funnel can increase friction and further hurt conversions.
- **Purely Informational Sites:** Where there is no transaction or clear
  monetary value exchange.
- **High-Friction Checkout:** If the checkout flow is already complex, avoid
  adding cross-sell steps that might lead to cart abandonment.

## Inputs

1. **Transaction Data:** Current Average Order Value (AOV), Revenue Per Visitor
   (RPV), and top-selling product combinations.
2. **Product Catalog:** A map of products, their margins, and logical
   relationships (e.g., "Camera" -> "Memory Card").
3. **User Journey Map:** Identification of key "Intent Peaks" (e.g., Adding to
   cart, viewing pricing, post-purchase thank you page).
4. **Current Offers:** Any existing bundles, discount codes, or "Frequently
   bought together" widgets.

## Outputs

1. **Upsell/Cross-sell Audit:** Identification of missed opportunities and
   friction points in the current flow.
2. **Strategic Offer Map:** Recommendations for specific offers at specific
   funnel stages (e.g., "In-cart insurance cross-sell").
3. **Copy & Design Guidance:** Optimized messaging and UI patterns for non-intrusive
   upsell prompts.
4. **Bundle Specifications:** High-value product groupings designed to increase
   AOV with minimal friction.

## Workflow

### 1. Identify "Value Anchors" and Gaps

Analyze the product catalog to identify high-margin upsells and logical
cross-sell "logical matches."

- **The Upsell:** Look for a "Better/Best" version of the primary product.
- **The Cross-sell:** Look for "Essential Utilities" (e.g., batteries) or
  "Enhanced Experience" items (e.g., a case).
- **The Bundle:** Identify items that are 80%+ likely to be used together.

### 2. Map the Timing & Placement

Determine where to trigger the offer based on user intent.

- **Pre-purchase (PDP):** Show "Frequently Bought Together" or a
  "Comparison Table" to encourage the upsell.
- **In-cart (Interstitial):** Offer low-friction "impulse" add-ons or "Free
  Shipping Threshold" progress bars.
- **Post-purchase (Thank You Page):** Offer time-limited discounts on related
  items that don't require re-entering payment info (one-click upsell).

### 3. Apply Psychological Triggers

Craft the offer using proven persuasion principles.

- **The Decoy Effect:** Present a middle option that makes the premium option
  look like a better value.
- **Scarcity/Urgency:** "Add this to your order in the next 10 minutes for 20%
  off."
- **Social Proof:** "80% of customers also bought [Product]."
- **Progress Bias:** "You're only $10 away from Free Shipping! Add this [Product]?"

### 4. Optimize the UI/UX

Ensure the offer doesn't disrupt the primary goal of completing the initial
purchase.

- **The "No" Path:** Always provide a clear, easy way to decline the offer (e.g.,
  "No thanks, I'll pass").
- **Contrast:** Ensure the primary "Accept" button is prominent but the "Close"
  option is easily findable to avoid "Dark Pattern" accusations.
- **One-Click Integration:** For post-purchase upsells, use "One-Click"
  functionality to bypass re-entering shipping or billing data.

### 5. Review Against Decision Rules

Verify the strategy against the upsell heuristics.

## Decision Rules

- **The 25% Rule:** An upsell or cross-sell offer should generally not increase
  the total order value by more than 25% of the original item's price to avoid
  "sticker shock."
- **Relevance First:** Never offer an unrelated product. A user buying a lawnmower
  should be offered oil or a cover, not a kitchen knife.
- **The "One-Click" Priority:** Post-purchase offers should always be
  one-click. Any additional form fields at this stage will tank the conversion
  rate.
- **Friction Balance:** If the primary conversion rate drops by more than 2%
  after adding an upsell, the offer is too intrusive and must be moved or
  simplified.

## Common Failure Patterns

- **The "Wall of Offers":** Bombarding the user with multiple popups before
  they've even reached the cart.
- **Irrelevant Add-ons:** Using generic "You might also like" widgets that show
  products unrelated to the current cart contents.
- **The "Hidden No":** Making it difficult to decline an offer, which leads to
  frustration and cart abandonment.
- **Breaking the Flow:** Forcing a page reload or a new window for a cross-sell,
  which disrupts the checkout momentum.
- **Over-Discounting:** Offering such deep discounts on upsells that it devalues
  the primary product or erodes all profit margin.

## Validation Methods

- **Average Order Value (AOV) Lift:** (Total Revenue / Total Orders). Target:
  10-25% increase.
- **Cross-sell Take Rate:** (Orders with Add-on / Total Orders) * 100.
- **Revenue Per Visitor (RPV):** (Total Revenue / Total Unique Visitors).
- **Secondary Conversion Impact:** Monitor the primary conversion rate to
  ensure the upsell isn't causing abandonment.
