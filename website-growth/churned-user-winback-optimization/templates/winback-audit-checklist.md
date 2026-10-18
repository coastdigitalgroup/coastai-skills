# Churned-User Winback Audit & Optimization Checklist

Use this actionable checklist to audit, design, and deploy high-converting on-site winback flows for returning churned subscribers and lapsed customers.

---

## Phase 1: Entry Point & Authentication Friction Audit

- [ ] **1.1 Tokenized Direct Access**
  - Are returning winback links using secure, tokenized magic-link authentication (`/welcome-back?token=...`)?
  - Does the link bypass mandatory password resets for inactive accounts while maintaining token expiration security (e.g., 7-14 day expiry)?

- [ ] **1.2 Destination Page Specificity**
  - Does winback campaign traffic land on a dedicated, contextual winback landing page rather than the generic homepage (`/`) or generic login (`/login`)?

- [ ] **1.3 Mobile Experience Verification**
  - Is the winback landing page fully responsive with tap-friendly 1-click reactivation targets (minimum 48x48px)?
  - Does mobile authentication operate smoothly without pop-up block issues or app-switch failures?

---

## Phase 2: Personalization & Account Context

- [ ] **2.1 Explicit Identity Recognition**
  - Does the hero section greet the user by name and former company/account name (e.g., "Welcome back, [First Name]")?

- [ ] **2.2 Preserved Asset & Data Callout**
  - Does the page explicitly inform the user that their historical data, settings, saved lists, or projects remain preserved and ready (e.g., "Your 24 saved templates are preserved")?

- [ ] **2.3 Legacy Status Privilege Acknowledgment**
  - Does the page frame the user as an appreciated returning alumnus rather than a cold lead (e.g., "Exclusive return offer for former members")?

---

## Phase 3: Reason-Aligned Content & "What's New" Showcase

- [ ] **3.1 Cancellation Reason Dynamic Content**
  - Is the page content dynamically aligned with the user's recorded cancellation reason?
    - **Feature-Gapped Churners:** Displays targeted feature release cards for capabilities launched since their exit date.
    - **Price-Sensitive Churners:** Displays flexible billing options, pause extensions, or discounted return tiers.
    - **Usage / Seasonal Churners:** Displays lightweight "Resume where you left off" framing.

- [ ] **3.2 "Since You Left" Interactive Changelog**
  - Is there a visual section highlighting 2-3 major product or catalog upgrades completed during their churn period?
  - Are updates demonstrated using short micro-videos, GIFs, or clear visual before/after callouts?

---

## Phase 4: Offer Framing & Incentive Economics

- [ ] **4.1 Strategic Incentive Selection**
  - Is the discount or bonus structured sustainably based on prior Customer Lifetime Value (LTV)?
  - Does the offer include a clear expiration date or countdown timer (e.g., "Offer valid for 72 hours") to drive immediate action?

- [ ] **4.2 Legacy Rate Protection**
  - If baseline pricing increased since their cancellation, are returning users granted legacy price protection or locked-in rates?

- [ ] **4.3 Risk Reversal & Assurance**
  - Is there an explicit money-back guarantee, satisfaction promise, or "cancel anytime in 1-click" callout placed adjacent to the main CTA?

---

## Phase 5: 1-Click Reactivation & Checkout Flow

- [ ] **5.1 Stored Payment Method Handling**
  - Is the user's previous payment method pre-selected and masked (e.g., "Visa ending in •••• 4242") for 1-click reactivation?
  - If the stored card is expired, does the UI prompt for inline card update without resetting the offer or redirecting away from the page?

- [ ] **5.2 Flexible Alternative Options**
  - Does the page provide a secondary "Pause for 30 days" or "Downgrade to Free/Lite Tier" option for users not yet ready for full paid restoration?

- [ ] **5.3 Instant System Access & Confirmation**
  - Upon clicking "Confirm & Reactivate", is account access granted instantly (< 3 seconds)?
  - Is the user redirected directly into their reactivated workspace with a clear welcome toast?

---

## Phase 6: Analytics & Optimization Protocol

- [ ] **6.1 Analytics Tracking Instrumentation**
  - Are key events firing correctly in analytics?
    - `winback_page_viewed` (with parameters: `cancellation_reason`, `cohort_age_days`)
    - `winback_offer_accepted`
    - `winback_card_updated`
    - `winback_alternative_selected` (e.g., pause, downgrade)

- [ ] **6.2 Secondary Churn Monitoring**
  - Is a 30/60/90-day retention cohort setup specifically to track reactivated winback users vs. standard acquisitions?
