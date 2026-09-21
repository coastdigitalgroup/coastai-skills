# Quantity Break Heuristics & Behavioral Economics Reference Guide

This reference guide outlines the core psychological principles, visual ergonomics rules, and mathematical discount formulas governing high-converting quantity breaks and volume discounts on modern web interfaces.

---

## 1. Key Behavioral Economics Principles

### 1.1 Price Anchoring & High-Value Defaults
- **The Anchoring Effect:** When presented with multiple numeric choices, human decision-making relies heavily on the first or most prominent number presented. By pre-selecting Tier 2 (e.g., "2 Units — $26/ea") rather than Tier 1 ("1 Unit — $32/ea"), the consumer's cognitive anchor shifts from $32 to $26/unit, making single-unit purchases feel comparatively expensive.
- **Default Effect:** Over 65% of online consumers accept pre-selected interface defaults. Setting Tier 2 as the pre-selected default card on PDP load instantly captures a higher baseline multi-unit take rate.

### 1.2 Per-Unit Framing & Fractional Unit Economics
- **Unit Price Dominance:** Consumers process small per-unit costs (e.g., "$2.50 / serving" or "$22.00 / bottle") with significantly lower price sensitivity than aggregate order totals (e.g., "$66.00 Total").
- **Typographic Hierarchy Rule:** In quantity break UI cards, the **per-unit price** must be formatted at a larger font size (minimum 16px–18px bold) than the aggregate total price (12px–14px neutral gray).

### 1.3 The Goal-Gradient Effect in Cart Drawers
- **Proximity to Reward:** People accelerate their efforts as they get closer to achieving a goal. Displaying a progress bar in the cart drawer (*"You are 1 unit away from unlocking 20% OFF!"*) creates a micro-goal that motivates immediate cart additions.

---

## 2. Visual Layout & Touch Target Heuristics

### 2.1 The 3-Tier Limit Rule
- **Cognitive Load Threshold:** Offering 2 to 3 tiers maximizes conversion. Introducing 4 or more tiers introduces choice overload (Hick's Law), causing decision paralysis and reducing total add-to-cart rates by up to 18%.
- **Mobile Stack Order:** On mobile viewports (<768px), tier cards must stack vertically with full-width tap targets (minimum 48px height per tier card) to prevent misclicks.

### 2.2 Visual Hierarchy & Badging Guidance
- **Badge Contrast:** Tiers tagged with `"MOST POPULAR"` or `"BEST VALUE"` must use high-contrast background pill badges positioned at the top-right or top-left edge of the tier card.
- **Active Card Elevation:** The selected quantity card should feature a distinct border highlight (e.g., 2px solid primary brand color), a subtle drop shadow, and a checked radio button icon to provide immediate spatial feedback.

---

## 3. Mathematical Discount Curves & Margin Safeguards

### 3.1 Non-Linear Discount Curves
Avoid linear percentage scaling. Volume discount curves should follow a diminishing return curve to preserve gross contribution margin dollars:

| Tier | Units | Discount % Range | Typical Per-Unit Savings | Target Buyer Perception |
| :--- | :--- | :--- | :--- | :--- |
| **Tier 1** | 1 | 0% (Full Price) | $0.00 / unit | Standard baseline trial |
| **Tier 2** | 2 | 12% – 18% | $4.00 – $6.00 / unit | High-value sweet spot ("Most Popular") |
| **Tier 3** | 3–4 | 20% – 28% | $7.00 – $10.00 / unit | Max savings bulk buy ("Best Value") |

### 3.2 Shipping & Fulfillment Amortization Formula
The economic engine of volume discounting is **shipping fee amortization**. Because shipping a 2-unit package costs only slightly more than shipping a 1-unit package, the saved shipping dollars finance the volume discount without reducing net profit.

$$\text{Shipping Amortization Savings} = (\text{Ship\_Cost}_1 \times N) - \text{Ship\_Cost}_N$$

*Example:*
- Shipping 1 unit costs $6.00. Shipping 3 units in 1 box costs $8.00.
- Standalone shipping cost for 3 separate orders = $6.00 \times 3 = $18.00.
- Amortized shipping savings = $18.00 - $8.00 = **$10.00 saved in fulfillment overhead**.
- This $10.00 in saved fulfillment overhead is directly passed to the customer as a volume discount while keeping net contribution margin dollars equal or higher.
