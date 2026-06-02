---
name: subscription-cancel-flow-optimization
description:
  Audit and optimize the subscription cancellation process to reduce churn,
  capture feedback, and recover customers through personalized "save" offers and
  alternatives.
---

# Subscription Cancel Flow Optimization

## Purpose

The Subscription Cancel Flow Optimization skill provides a systematic framework for transforming a "lost customer" event into a retention opportunity. Instead of a "one-click" exit, this skill designs a persuasive, multi-step sequence that identifies the reason for leaving and offers targeted alternatives—such as pauses, downgrades, or discounts. By reducing "Reactive Churn," this skill directly improves Customer Lifetime Value (LTV) and Net Revenue Retention (NRR).

## Use Cases

- **SaaS Platforms:** High monthly churn rates where users leave due to price, lack of use, or missing features.
- **Membership Sites:** Subscription-based content or communities seeing steady attrition.
- **Subscription E-commerce:** "Subscribe and Save" models where users cancel once they have enough product.
- **Trial-to-Paid Transitions:** Recovering users who intend to cancel before the first billing cycle.

## When NOT to Use

- **B2B Enterprise Contracts:** Cancellations managed via legal notices or human account managers.
- **Mandatory Deletions:** GDPR/CCPA data deletion requests where "persuasion" is legally restricted.
- **Transactional E-commerce:** Standard return/refund flows (use `product-page-optimization` or customer support protocols).
- **Early Product-Market Fit:** If churn is driven by fundamental product failure, a cancel flow is a "band-aid"; focus on core product value first.

## Inputs

1. **Churn Analytics:** Current churn rate, average tenure at cancellation, and any existing "Exit Survey" data.
2. **Current Cancellation Path:** Screenshots or a walkthrough of the existing "Cancel Subscription" button and subsequent steps.
3. **Offer Inventory:** Available "Save" levers (e.g., 50% off for 3 months, 1-month free, "Pause" for 30/60/90 days).
4. **Subscription Tiers:** Knowledge of downgrade paths or "Lite" versions of the product.

## Outputs

1. **Cancel Flow Friction Audit:** Identification of flows that are either "Too Easy" (losing save opportunities) or "Too Hard" (causing frustration/chargebacks).
2. **Personalized Save Logic:** A mapping of "Cancellation Reasons" to specific "Recovery Offers."
3. **Optimized Multi-Step Wireframe:** A recommended sequence (Survey -> Offer -> Confirmation).
4. **Feedback & Win-back Strategy:** Guidance on how to use the captured data for long-term product improvement.

## Workflow

### 1. The Exit Survey (Identifying the "Why")

Before allowing the cancellation, ask the user why they are leaving. Keep it to one question with 4–6 mutually exclusive options:
- "Too expensive / Not enough value"
- "Missing a specific feature"
- "Technical issues / Too complex"
- "Only needed it for a short time"
- "Switching to a competitor"

### 2. The Contextual "Save" Offer

Match the user's reason to a specific recovery lever:
- **Price/Value:** Offer a "Retention Discount" (e.g., "Stay for 50% off the next 3 months") or a "Pause Subscription" option.
- **Temporary Use:** Offer to "Pause" instead of cancel so they don't lose their data/settings.
- **Complexity:** Offer a free "1-on-1 Success Call" or link to a specific tutorial.
- **Missing Feature:** If the feature exists, show it; if not, offer a downgrade to a "Maintenance Plan" to keep their data safe.

### 3. Highlighting "Loss of Value"

Remind the user what they are giving up if they leave.
- **Data Loss:** "You'll lose access to 500+ saved reports."
- **Status/Price Loss:** "You are currently on a Grandfathered plan. If you cancel, you'll pay 20% more if you rejoin later."
- **Streak/Progress:** "You'll lose your 45-day activity streak."

### 4. The "Easy Exit" (Compliance & Trust)

While the flow is persuasive, it must not be "Dark."
- **Clear Confirmation:** The final "Confirm Cancellation" button must be easy to find once the user has seen the offer.
- **Confirmation Email:** Send an immediate email confirming the cancellation and how long they have access.
- **The "Door is Open":** End with a positive note and an easy "Reactivate" path.

### 5. Review Against Decision Rules

Verify the flow against the retention heuristics below.

## Decision Rules

- **The "One-Offer" Rule:** Do not overwhelm the user with multiple choices. Present the ONE most relevant save offer based on their survey response.
- **Pause over Cancel:** Always offer a "Pause" (1-3 months) as the first alternative for users who haven't used the product lately.
- **Transparency:** Clearly state what happens to the user's data and current billing cycle (e.g., "You will have access until Oct 31").
- **The "3-Click" Maximum:** The entire cancel-and-save flow should take no more than 3 screens/clicks to complete.
- **Mobile First:** Ensure the "Confirm" and "Stay" buttons are large and distinct on mobile to avoid "misclick" frustration.

## Constraints

- **Regulatory Compliance:** Flows must comply with local laws (e.g., California's "Easy to Cancel" law, FTC "Click-to-Cancel" proposed rules).
- **Data Integrity:** Cancellation must correctly trigger backend billing stops and access expiration without manual intervention.
- **Honest Copy:** "Loss of Value" claims must be true; do not claim data will be deleted if the business actually retains it for 30 days.

## Non-Goals

- Building the billing backend or subscription management logic.
- Long-term "Win-back" email sequences (triggered weeks after cancellation).
- Customer support scripting for phone-based cancellations.

## Common Failure Patterns

- **The "Dark Pattern" Trap:** Making the "Cancel" button invisible or forcing a phone call when signup was online (increases chargebacks).
- **Generic Offers:** Offering a discount to someone who is leaving because of a technical bug.
- **Ignoring the Data:** Collecting survey reasons but never analyzing them to fix the underlying product issues.
- **The "Begging" Tone:** Sounding desperate rather than helpful. Focus on the *user's* loss, not the *company's* loss.

## Validation Criteria

- [ ] **Save Rate:** (Users who start cancel flow but stay / Total cancel flow starts) * 100. Target: 10-25% recovery.
- [ ] **Churn Reduction:** Measure the decrease in monthly churn rate (%) after implementation.
- [ ] **Offer Take Rate:** Which specific "Save" offers are most effective for which reasons.
- [ ] **Qualitative Feedback:** Monitor if "difficulty canceling" complaints in support/social media decrease.
