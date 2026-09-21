# Sample & Try-Before-You-Buy (TBYB) UX Heuristics & Unit Economics Reference

## Behavioral Psychology Principles in Sampling & TBYB

### 1. The Endowment Effect (Psychological Ownership)
Once a physical product enters a customer's hands or home, their psychological valuation of the item increases dramatically. In apparel and home try-on programs (TBYB), consumers treat trial items in their closet as already theirs. Returning an item feels like a *loss* rather than keeping it feeling like a *spend*, leveraging human loss aversion to boost retention rates.

### 2. Reciprocity & The "Free-Money" Mental Frame
When a merchant credits 100% of a sample set price ($30) toward a future full-size purchase, the customer mentally categorizes the $30 voucher as "free money that will go to waste if not spent." This eliminates purchase hesitation for the full-size item and creates a sense of brand goodwill and reciprocity.

### 3. Zero-Risk Bias & Friction Asymmetry
Shoppers perceive a massive psychological difference between `$0 upfront + 7-day trial` vs. `$150 upfront + 30-day money-back guarantee`. Even though both allow returns, the upfront monetary outlay creates high cognitive friction. Zero-risk trial structures remove financial commitment at the decision-making peak.

---

## Unit Economics & ROSI Formulas

### Formula 1: Return on Sampling Investment (ROSI)
ROSI evaluates whether a sampling or TBYB program produces net profitable growth compared to direct acquisition.

$$\text{ROSI} = \frac{\text{Net Gross Margin from Full-Size Conversions}}{\text{Total Sample Production + Fulfillment + Shipping Costs}}$$

Where:
- $\text{Net Gross Margin from Full-Size Conversions} = (\text{Sample Buyers} \times \text{Conversion Rate}) \times (\text{Full-Size Price} \times \text{Gross Margin \%})$
- $\text{Total Sample Cost} = \text{Sample Volume} \times (\text{Sample COGS} + \text{Packaging} + \text{Outbound Shipping} - \text{Sample Retail Price Charged})$

### Formula 2: Net Sample Break-Even Conversion Rate
To determine the minimum sample-to-full-size conversion rate required for a paid sample kit to break even:

$$\text{Break-Even Conversion Rate} = \frac{\text{Sample COGS} + \text{Outbound Shipping} - \text{Sample Price Charged}}{\text{Full-Size Retail Price} \times \text{Full-Size Gross Margin \%}}$$

*Example*: If a Discovery Set costs $4 COGS + $4 shipping ($8 total) and is sold for $20 ($12 net profit before full-size conversion), the break-even conversion rate is **0%** because the sample itself is self-funding!

---

## Program Architecture Selection Matrix

| Category | Typical Price | Primary Hesitation | Recommended Model | Expiration Window |
| :--- | :--- | :--- | :--- | :--- |
| **Fragrance & Perfume** | $120 – $250 | Scent preference & skin chemistry dry-down | 5 x 2ml Discovery Set with 100% Credit Voucher | 30 Days post-delivery |
| **Skincare & Cosmetics** | $40 – $150 | Shade matching & skin reaction | 3-Shade Sample Card or Mini Trio ($15 w/ $15 Credit) | 30 Days post-delivery |
| **Apparel & Footwear** | $100 – $400 | Fit, sizing between brands, fabric drape | 7-Day TBYB (Card Pre-Auth, max 3 items) | 7 Days from carrier delivery |
| **Eyewear & Frames** | $120 – $300 | Face shape visual match | 5-Frame Home Try-On Box ($0 deposit, prepaid return) | 5 Days from delivery scan |
| **Coffee, Tea & Food** | $25 – $60 | Taste profile & freshness | Sampler Variety Pack ($15 w/ $15 Voucher) | 21 Days post-delivery |

---

## Risk Mitigation & Fraud Prevention Rules

1. **Payment Card Vaulting & Address Verification (AVS)**:
   - Always validate card authenticity using payment gateway pre-authorization ($1 temporary authorization or AVS check).
   - Block prepaid gift cards or unverified virtual card numbers on TBYB zero-upfront orders.
2. **Cart Value & Quantity Ceiling**:
   - Limit TBYB try-on orders to a maximum of 3 SKUs or $400 total retail value per customer.
3. **Automated Carrier Scan Integration**:
   - Wire trial timers directly to carrier webhooks (USPS, FedEx, UPS). The 7-day trial timer begins upon **Carrier Delivered** status scan, not when the order is fulfilled in the warehouse.
4. **Transparent Auto-Billing Microcopy**:
   - State terms clearly on PDP, Cart, and Order Confirmation: *"Items kept past Day 7 will be automatically billed to your card on file on [Exact Date]."*
