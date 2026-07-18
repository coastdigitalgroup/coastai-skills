# Stockout Recovery Optimization: Before-and-After Scenario

This document presents a realistic before-and-after scenario detailing how optimizing the out-of-stock experience transformed bounce rates and recovered lost sales for a premium running shoe brand.

## Context: StrideAhead Performance Footwear

**StrideAhead** is a fast-growing DTC athletic brand selling high-performance running shoes. Their signature model, the *Velocity-9*, frequently sells out in popular sizes (sizes 9, 10, and 10.5) due to high demand and supply chain variations.

---

## The "Before" Experience (The Dead End)

### User Flow
1. A prospect searches for running shoes and clicks an ad landing on the *Velocity-9* Product Detail Page (PDP).
2. The user selects their size (Size 10).
3. **The Friction:**
   - The size 10 box instantly gets a diagonal slash across it.
   - The bright blue primary "Add to Cart" button turns gray and displays "SOLD OUT" in static text.
   - The quantity selector is locked and unclickable.
4. There is no alternative product recommended on the page, except for a generic "You May Also Like" carousel at the very bottom of the page featuring cold weather running jackets and socks.
5. **The Outcome:** The user clicks the back button to find an alternative on a competitor's site.

### Performance Metrics (Baseline)
- **PDP Bounce Rate on Sold-Out Variants:** 76% (compared to 34% on in-stock pages)
- **Variant Abandonment Rate:** 84% of visitors who select an out-of-stock size leave the site within 15 seconds.
- **Back-in-Stock Opt-In Rate:** 1.5% (The link to subscribe was a small text link saying "Email us when back in stock" which opened a default system email client).
- **Recovered Revenue:** Negligible.

---

## The "After" Experience (Optimized Stockout Flow)

### Applied Optimizations
1. **Dynamic Variant-Aware CTA:**
   - When a user clicks the out-of-stock Size 10 variant, the gray "SOLD OUT" button dynamically transitions into a bright blue "Notify Me When Restocked" button.
2. **Frictionless Inline Form:**
   - Clicking "Notify Me When Restocked" slides open an inline single-field subscription drawer *directly below the button* (no popups).
   - The user is presented with: "We are restocking Size 10 in 2 weeks. Enter your number or email to receive a secure purchase link the moment they arrive."
   - The form contains a simple choice tab: `[ Email ]` or `[ SMS ]`. SMS is selected by default with a phone number field and a microcopy checkbox explaining compliance: *"Agree to receive a single automated restock alert. No marketing spam. Message rates may apply."*
3. **Automatic Size Memory:**
   - The system automatically registers the selected size (Size 10) in the database backend. The user does *not* have to pick their size again.
4. **Contextual Alternates (In-Stock Match):**
   - Directly underneath the notification form, a new dynamic carousel appears titled: **"Size 10 In Stock & Ready to Ship"**.
   - It recommends the *Velocity-9* in a different, highly similar colorway (which is in stock in Size 10), and the *Apex-Flyer* (StrideAhead's highly rated road-running shoe) in Size 10.
   - Each alternative product has a small, secondary "Quick Add" button.

### The Conversion Recovery Sequence (The Return Loop)
- Two weeks later, the container arrives at the fulfillment warehouse. The ERP updates stock counts.
- Within 10 minutes, the automated recovery router identifies 412 subscribers for "Velocity-9, Size 10".
- It triggers SMS/Email notifications in batches (since stock arrived with 600 units, the whole list is notified):
  > "StrideAhead: The Velocity-9 in Size 10 is back in stock! We reserved a pair for you for the next 24 hours. Tap to checkout instantly: [Shortened Link]"
- The link directs the customer to a checkout screen where the *Velocity-9 (Size 10)* is already in their shopping cart, ready for one-click payment.

---

## The Results (Measurable Growth Outcomes)

| Metric | Before | After | Change |
| :--- | :---: | :---: | :---: |
| **PDP Bounce Rate on Stockouts** | 76% | 41% | **-46.0%** (Fewer users left immediately) |
| **Back-in-Stock Opt-In Rate** | 1.5% | 18.2% | **+1,113%** (Huge increase in high-intent capture) |
| **SMS/Email Click-Through Rate** | N/A | 38.5% | High engagement upon restock alert |
| **Recovered Revenue Rate (RRR)**| < 1.0% | 22.4% | **+2,140%** (Recovered purchase rate on restock) |
| **Alternative Purchase Rate** | 0.8% | 6.2% | **+675%** (Users buying a recommended in-stock shoes) |

### Key Takeaway
By eliminating the "dead end" of an out-of-stock product, StrideAhead captured intent that would have otherwise bounced. Instead of losing the sale entirely, they either redirected the user to a highly relevant, in-stock alternative in their exact size immediately, or captured an SMS address that converted at a 22.4% rate two weeks later.
