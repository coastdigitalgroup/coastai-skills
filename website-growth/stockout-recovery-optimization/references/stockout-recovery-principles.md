# Stockout Recovery Optimization: UX Heuristics & Core Principles

This reference guide details the psychological triggers, UX design patterns, and legal/compliance considerations for designing high-converting out-of-stock experiences.

---

## 1. Core Psychological Heuristics

### A. The Sunk Cost Effect & Micro-Commitments
When a user visits a Product Detail Page (PDP), selects variations, and clicks to buy, they have invested cognitive effort and time. Facing a blunt "Sold Out" dead end creates instant frustration (cognitive dissonance).
- **Application:** By offering an immediate, frictionless "Notify Me" action, you capture this momentum. The user’s willingness to perform a small micro-commitment (subscribing) is at its peak because it salvages their invested effort.

### B. Anticipation vs. Frustration (The Zeigarnik Effect)
Unfinished tasks create psychological tension. A buyer who has chosen a product but cannot purchase it leaves the page with an incomplete mental transaction.
- **Application:** A well-designed notification flow changes the narrative from *"I can't have this"* (frustration) to *"I am waiting on my reservation"* (active, positive anticipation). This builds brand affinity and keeps the mental tab open.

### C. Scarcity & The Fear of Missing Out (FOMO)
Products that sell out are perceived as highly valuable because other human beings have collectively validated and exhausted the supply (social proof).
- **Application:** Use copy that frames the restock as a priority drop: *"Join the reservation list to secure your pair before we sell out again."* This reinforces the value of the product and increases opt-in rates.

---

## 2. Notification UX & Flow Design Heuristics

### Variant Memory Heuristic
Users make selections on the page before realizing a variant is out of stock. If they are forced to re-select their options inside a signup form, they experience high cognitive load.
- **Rule:** The system must automatically read the selected variant ID from the active state of the page (e.g., Color: Red, Size: 10) and bind the notification to that ID.
- **Form Design:** The signup form should display the captured variant details clearly as reassurance (e.g., *"Notify me when Crimson Red, Size 10 is available"*).

### Interaction Cost Minimization
Each additional field required decreases the subscription rate by approximately 5% to 10%.
- **Pattern:** Use single-field inputs. For guest users, show only one input (either Email or Phone Number).
- **Logged-in users:** Automatically read account records and display: `[ Notify Me with 1-Click (email@example.com) ]`.

### Dual-Channel Capture (SMS vs. Email)
- **SMS Heuristics:** Open rates for transactional SMS are near 98%, with click-through rates (CTR) often 3-4x higher than email. For fast-moving or limited-quantity restocks, SMS is the superior driver.
- **Email Heuristics:** Ideal for longer wait-times (>4 weeks) as it allows rich-text, visual product reinforcement, and matches slower customer-consideration timelines.

---

## 3. Alternative Recommendation Logic (Bounce Mitigation)

Do not let the out-of-stock notification be the final option on the page. Some users cannot or will not wait. You must provide a high-relevance path forward.

```text
               [ LANDS ON OUT-OF-STOCK PDP ]
                             |
              /--------------+--------------\
             /                               \
     [ Needs it now ]               [ Willing to wait ]
            |                                |
  [ View Similar In-Stock ]         [ Notify Me Sign-Up ]
            |                                |
   (Filter by exact size)           (Choose SMS / Email)
            |                                |
   [ Add to Cart in 1-Click ]       [ Receive Alert Link ]
            |                                |
   [ Complete Purchase ]            [ Direct Checkout Page ]
```

### Recommendation Heuristics
1. **The Size-Match Constraint:** The primary reason users reject recommended alternative products is size availability. If a user lands on an out-of-stock Size 10 boot, the recommended alternatives carousel must *only* query and display other boots that are currently in-stock in Size 10.
2. **Visual/Functional Consistency:** Recommendations must maintain the core product benefits (e.g., if a waterproof hiking boot is out of stock, recommend other waterproof boots, not lightweight sandals).
3. **Price Anchoring:** Ensure alternative products are in a comparable price range (typically within +/- 15% of the original item) to avoid sticker shock or perceived quality downgrade.

---

## 4. Compliance and Legal Guardrails

Because notifications involve collecting user contact information and sending automated alerts, strict regulatory boundaries must be obeyed.

### A. TCPA Compliance (SMS)
The Telephone Consumer Protection Act enforces strict penalties for unauthorized text messages.
- **Rule 1:** Explicit, active consent is required. A user must check an unchecked box or manually enter their number under clear terms.
- **Rule 2:** Restock notification consent must be **independent** of terms of sale. You cannot force them to agree to marketing spam to get a single transactional restock alert.
- **Rule 3:** The signup text must state clear disclosures: *"Consent not required for purchase. Msg & data rates may apply. Reply STOP to cancel."*

### B. GDPR / CAN-SPAM (Email)
- **Rule 1:** A restock alert is considered a transactional/customer-initiated action. However, you cannot automatically subscribe the email to your general promotional newsletters unless the user explicitly checks a separate, unchecked marketing opt-in box.
- **Rule 2:** Every notification email must contain a clear, functional unsubscribe option.
- **Rule 3:** Clearly state in the privacy policy how subscription data is stored and used.

---

## 5. Timing and Delivery Optimization (ERP Synchronization)

- **ERP Sync Lag:** If inventory updates are slow, you risk sending a restock notification after an item has already been sold out again by active site browsers. Ensure alerts are triggered only when physical stock is fully scanned and allocated in the warehouse.
- **Throttling for High-Demand Drops:** If 1,000 people are waiting for a restock of 50 units, sending an alert to all 1,000 simultaneously will lead to 950 extremely frustrated users landing on an out-of-stock page.
  - **Best Practice:** Implement tiered, chronological notifications (FIFO - First-In, First-Out). Send alerts to the first 50 subscribers first, wait 30 minutes, and if inventory remains, notify the next tier.
