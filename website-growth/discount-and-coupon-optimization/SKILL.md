---
name: discount-and-coupon-optimization
description:
  Audit and optimize promotional incentives, discount structures, and coupon field
  placement to maximize conversion and Average Order Value (AOV) while
  minimizing margin erosion.
---

# Discount and Coupon Optimization

## Purpose

The Discount and Coupon Optimization skill provides a systematic framework for
designing and implementing promotional incentives that drive profitable growth.
Poorly executed discounts often lead to "Margin Erosion" (giving away profit to
users who would have bought anyway) or "Coupon Hunting" (users leaving the site
to find a code and never returning). By applying behavioral economics
principles—such as the Rule of 100 and the Zeigarnik Effect—this skill ensures
discounts are used as surgical tools to overcome specific conversion barriers
and increase total revenue.

## Use Cases

- **High Cart Abandonment:** Where users hesitate at the final price point.
- **Low Average Order Value (AOV):** Using tiered rewards to encourage larger
  purchases.
- **First-Purchase Conversion:** Accelerating the transition from "Visitor" to
  "Customer" for new audiences.
- **Inventory Clearance:** Moving specific stock without devaluing the rest of
  the catalog.
- **Seasonal/Holiday Sales:** Maximizing volume during peak shopping windows
  without excessive race-to-the-bottom pricing.

## When NOT to Use

- **Luxury/Premium Positioning:** Where frequent discounting can damage brand
  equity and "prestige" pricing.
- **High-Retention SaaS:** Where the focus should be on product value rather
  than price-based acquisition that might lead to high churn.
- **Commoditized Markets with Razor-Thin Margins:** Where any discount might
  result in a net loss per transaction.
- **Early-Stage Pricing Discovery:** When you are still trying to find the
  baseline market value for a new product.

## Inputs

1. **Current Promotion Data:** Usage rates of existing coupons, average discount
   depth, and impact on conversion vs. margin.
2. **Margin Analysis:** Break-even points for key products and categories.
3. **Competitive Benchmarking:** How competitors use discounts (e.g., constant
   sale vs. rare events).
4. **Checkout Analytics:** Data on where users interact with the "Promo Code"
   field and where they exit.
5. **Customer Segmentation:** Distinguishing between price-sensitive new users
   and brand-loyal repeat buyers.

## Outputs

1. **Discount Strategy Audit:** Identification of wasteful promotions and
   conversion-killing coupon field placements.
2. **Optimized Incentive Structure:** Recommendations for tiered rewards,
   discount framing (percentage vs. absolute), and thresholds.
3. **UI/UX Optimization Specs:** Improved placement and design for coupon
   inputs to reduce exit-intent.
4. **Behavioral Trigger Map:** Guidance on when to trigger discounts (e.g.,
   exit-intent, cart-threshold, or multi-session return).

## Workflow

### 1. Audit Current "Margin Leaks"

Analyze existing promotions to identify "Dead-Weight" discounts.
- **Auto-Applied vs. Manual:** Are you forcing loyal users to find a code that
  should have been auto-applied?
- **Discount Depth:** Are you offering 20% when 10% would have achieved the same
  conversion lift?
- **The Coupon Field Trap:** Is your "Promo Code" box so prominent that it
  signals "You're paying too much" to users who don't have a code?

### 2. Apply "The Rule of 100" (Discount Framing)

Frame the discount to maximize the "Perceived Value" based on the item price.
- **Under $100:** Use **Percentage** discounts (e.g., "20% Off" sounds better
  than "$10 Off" a $50 item).
- **Over $100:** Use **Absolute Dollar** discounts (e.g., "$50 Off" sounds
  better than "10% Off" a $500 item).

### 3. Implement Tiered Rewards (AOV Growth)

Move from flat discounts to behavior-driving tiers.
- **The "Nudge" Threshold:** Set a reward slightly above your current AOV
  (e.g., "Save $10 on orders over $75" if current AOV is $60).
- **Progress Bars:** Use a visual indicator in the cart (e.g., "You're $15 away
  from 15% off!") to leverage the **Zeigarnik Effect** (the desire to complete
  an unfinished task).

### 4. Optimize Coupon Field UI

Reduce the "Search-and-Abandon" behavior triggered by prominent coupon fields.
- **Subordinate the Field:** Hide the promo code input behind a text link
  (e.g., "Have a promo code?") to keep the focus on the "Place Order" button.
- **The "Success Reveal":** Once a code is applied, show the savings clearly
  in the order summary to build positive momentum.
- **Error Handling:** If a code is invalid, provide a clear, non-frustrating
  explanation (e.g., "This code is for new customers only").

### 5. Review Against Decision Rules

Verify that the promotion is profitable, targeted, and non-distractive.

## Decision Rules

- **The Rule of 100:** Percentages for <$100, Dollars for >$100.
- **The Margin Guardrail:** Every discount must be measured against its
  "Incremental Lift" — if it doesn't bring in users who wouldn't have bought
  otherwise, it's a cost, not an investment.
- **The "Hide-until-needed" Rule:** Never show a primary-level coupon field to
  a user unless they've come from a source that specifically promised one.
- **Incentivize Behavior, Not Existence:** Use discounts to reward specific
  actions (e.g., "Buy 2, Get 1," "Spend $100," or "Sign up for SMS").
- **Exclusivity framing:** Frame discounts as "Member-only" or "Early access"
  to build brand loyalty rather than just price-sensitivity.

## Constraints

- **Legal Compliance:** Discounts must follow local consumer protection laws
  (e.g., "MSRP" comparison rules, "Permanent Sale" prohibitions).
- **Financial Integrity:** Discounts must not push the Net Margin below the
  agreed-upon floor without explicit finance approval.
- **Technical Capability:** Complex tiered rewards require backend support or
  specialized cart apps/plugins.

## Common Failure Patterns

- **The "Coupon Hunt" Trigger:** Making the promo code box so big that users
  leave the site to search Google for "Brand Name Coupon," get distracted by
  competitor ads, and never return.
- **Over-Discounting:** Training users to never buy at full price, leading to
  "Revenue Lumping" around sale events.
- **Complex Math:** Forcing users to do mental arithmetic to figure out the
  final price (e.g., "Buy 3 for 15% off or 5 for 22% off").
- **Stacking Errors:** Allowing multiple coupons to be combined in ways that
  eliminate all profit.
- **Vague Exclusions:** "20% Off Site-wide*" with a giant list of excluded
  brands that frustrates users at the point of purchase.

## Validation Methods

- [ ] **AOV Lift:** Measure the increase in Average Order Value after
  implementing tiered rewards.
- [ ] **Checkout Exit Rate:** Monitor if subordinating the coupon field
  reduces drop-offs at the payment step.
- [ ] **Profit Margin Per Visitor:** (Total Revenue - Discount Cost) / Total
  Unique Visitors.
- [ ] **Incremental Conversion Rate:** A/B test a "No Discount" group against
  a "Discounted" group to ensure the lift justifies the cost.
