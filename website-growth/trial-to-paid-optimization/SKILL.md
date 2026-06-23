---
name: trial-to-paid-optimization
description:
  Optimize the transition from free trial or freemium usage to paid
  subscriptions by identifying value milestones, reducing upgrade friction, and
  leveraging psychological triggers.
---

# Trial-to-Paid Optimization

## Purpose

The Trial-to-Paid Optimization skill provides a systematic framework for converting free trial or freemium users into paying customers. The transition from "experiencing value for free" to "paying for value" is a critical friction point. This skill focuses on identifying when a user has reached enough value to justify payment, optimizing the messaging and timing of upgrade prompts, and reducing the technical and psychological barriers to subscription.

## Use Cases

- **SaaS Free Trials:** Converting users at the end of a 7, 14, or 30-day trial period.
- **Freemium Models:** Moving users from a free tier to a paid "Pro" or "Team" tier based on usage limits or feature gates.
- **Reverse Trials:** Managing the transition for users who start with a full-feature trial and are "downgraded" to a limited free version if they don't pay.
- **Opt-out Trials:** Optimizing the conversion for trials that require a credit card upfront (focusing on reducing Day-0 cancellations).

## When NOT to Use

- **B2B Enterprise High-Touch:** When conversions are handled primarily via manual sales negotiations and custom contracts.
- **Initial Lead Capture:** For improving the initial signup rate for the trial itself, use `lead-capture-form-optimization`.
- **User Onboarding:** While related, onboarding focuses on the "Aha! Moment"; this skill focuses on the "Point of Purchase" (see `user-onboarding-optimization`).
- **One-time Purchases:** Standard e-commerce transactions without a subscription component.

## Inputs

1. **Trial/Freemium Data:** Current conversion rate (Trial-to-Paid %), average time to upgrade, and churn rate immediately after the first payment.
2. **Usage Analytics:** Identification of "Power User" behaviors vs. "Inactive" behaviors during the trial.
3. **Current Upgrade Path:** Screenshots of the "Upgrade" buttons, in-app notifications, and trial expiration emails.
4. **Feature Gating Logic:** Knowledge of which features are free vs. paid and the current limits (e.g., storage, seats, API calls).

## Outputs

1. **Upgrade Trigger Audit:** Identification of missed opportunities to ask for an upgrade when value is highest.
2. **Personalized Expiration Sequence:** A multi-channel messaging plan (Email + In-App) for the final 25% of the trial duration.
3. **Optimized Pricing/Checkout Bridge:** Recommendations for the transition page that connects the "Trial Ended" state to the "Pricing" page.
4. **In-App Urgency Assets:** Design and copy specs for countdown timers, usage bars, and "Feature Locked" states.

## Workflow

### 1. Define and Track Value Milestones

Identify the "Conversion Correlation" actions.
- **Find the Trigger:** Users who use [Feature X] more than 5 times are 3x more likely to upgrade.
- **Monitor Usage:** Track when a user is approaching a freemium limit (e.g., "You've used 80% of your free storage").

### 2. Audit the Upgrade Friction

Walk through the upgrade process as a user.
- **The "Context Switch" Check:** Does the upgrade button take the user away from their work, or can they pay in-context?
- **Plan Clarity:** Is it clear which plan they should choose based on their trial usage?

### 3. Design the Expiration & Transition Sequence

Don't wait until Day 30 to ask for the upgrade.
- **The Early Bird (Day 3-5):** Offer a "Fast-Action Discount" for users who upgrade early after reaching their "Aha! Moment."
- **The Countdown (Final 3 Days):** Introduce a persistent in-app countdown timer to leverage Loss Aversion.
- **The "Soft Landing" (Expiration Day):** Instead of a hard lockout, offer a "7-Day Extension" in exchange for a feedback survey or a demo booking.

### 4. Optimize the "Point of Purchase"

Make the "Upgrade" page a high-conversion landing page.
- **Loss Aversion Copy:** Instead of "Upgrade to Pro," use "Keep your 15 active projects."
- **Recap the Value:** Show a summary of what the user accomplished during the trial (e.g., "You saved 12 hours this month using our automation").
- **One-Click Upgrades:** If the card is already on file, ensure the upgrade is a single click.

### 5. Review Against Decision Rules

Verify the flow against the conversion triggers and decision rules below.

## Decision Rules

- **The Endowment Effect:** Frame the upgrade as "keeping" what they've already built/saved, rather than "buying" something new.
- **Usage-Based Triggers:** Show the upgrade prompt *exactly* when the user tries to use a locked feature, not just at random time intervals.
- **The "Save" Offer:** If a user reaches the end of a trial and hasn't upgraded, offer a "Lite" plan or a limited-time extension before losing them entirely.
- **Transparency:** Clearly communicate when the trial ends and what happens to the data (e.g., "Your data is safe for 30 days, but you won't be able to edit it").
- **Contextual Pricing:** On the upgrade page, pre-select the plan that best fits the user's usage patterns during the trial.

## Constraints

- **Billing Accuracy:** Upgrade logic must perfectly sync with the billing provider (Stripe, Recurly, etc.) to avoid double-charging or missed access.
- **Compliance:** Multi-channel messaging must comply with CAN-SPAM/GDPR (users must be able to opt-out of marketing emails, though transactional expiration notices are usually allowed).
- **Data Integrity:** "Feature Locking" must be robust—users should not be able to bypass gates via URL manipulation or console hacks.

## Non-Goals

- Designing the underlying pricing tiers or feature sets (see `pricing-page-optimization`).
- Building the technical billing/subscription management infrastructure.
- Long-term "Win-back" campaigns for users who churned months ago.

## Common Failure Patterns

- **The Abrupt Ending:** Dropping a user into a hard "Pay Now" wall without warning or a recap of the value they'll lose.
- **Generic Messaging:** Sending the same "Trial Ending" email to someone who used the app daily and someone who never logged in.
- **Upgrade Dead-Ends:** Having "Upgrade" buttons that lead to a generic "Contact Us" page rather than a self-serve checkout.
- **Feature Overload:** Trying to sell every Pro feature at once instead of focusing on the one feature the user actually tried to use.

## Validation Methods

- [ ] **Trial-to-Paid Conversion Rate:** The percentage of trial users who become paying subscribers. Target: 15-25% for B2B SaaS.
- [ ] **Expansion Revenue:** Measure if the optimized flow leads users to higher-tier plans based on usage data.
- [ ] **Time to Upgrade:** An improvement is seen if users upgrade *before* the trial expires (indicates high value/successful urgency).
- [ ] **Net Revenue Retention (NRR):** Ensure that optimized conversions aren't leading to higher churn in Month 2 (which indicates "overselling").
