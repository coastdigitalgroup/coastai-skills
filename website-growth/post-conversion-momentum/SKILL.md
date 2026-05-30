---
name: post-conversion-momentum
description:
  Audit and optimize the "Thank You" page and post-purchase experience to drive
  secondary actions, maintain engagement, and leverage the "Peak-End Rule" when
  user trust is at its highest.
---

# Post-Conversion Momentum

## Purpose

The Post-Conversion Momentum skill provides a framework for transforming the
often-neglected "Thank You" page into a strategic discovery hub. Most websites
end the user journey abruptly after a conversion, losing the period of highest
user engagement and trust. This skill focuses on leveraging psychological
momentum to drive secondary actions (e.g., social sharing, referrals, account
setup, or related content consumption) while the user is still in a "success"
mindset.

## Use Cases

- **E-commerce:** Driving repeat purchases or newsletter signups after an order.
- **SaaS:** Encouraging immediate onboarding, profile completion, or referral
  invites.
- **Lead Gen:** Guiding users to high-value content or social follows after a
  gated asset download.
- **Webinars/Events:** Adding to calendar and sharing with peers after
  registration.

## When NOT to Use

- **Critical System Errors:** Do not attempt to drive momentum after a failed
  transaction or error state (use `404-page-recovery` for errors).
- **Sensitive Transactions:** For high-security or purely administrative
  confirmations (e.g., password reset, tax document submission) where a clear
  exit is safer.
- **One-and-Done Utility Tools:** Where the service is purely transactional and
  no further relationship is desired.

## Inputs

1. **The Primary Conversion Point:** What did the user just do? (e.g., Bought a
   shirt, signed up for a trial).
2. **Current "Thank You" Page:** URL or screenshot of the existing confirmation
   screen.
3. **Secondary Goals:** What is the next most valuable thing the user can do?
   (e.g., Refer a friend, join a community, follow on Twitter).
4. **Relevant Content/Products:** A list of items that naturally follow the
   initial conversion.

## Outputs

1. **Momentum Audit:** Identification of dead-ends and missed engagement
   opportunities on the post-conversion page.
2. **Optimized Confirmation Experience:** Revised layout and copy that
   celebrates the "win" and presents a clear "Next Step."
3. **Secondary CTA Strategy:** Prioritized list of 1-2 actions for the user to
   take.
4. **Engagement Wireframe:** Guidance on how to balance the confirmation info
   with new discovery paths.

## Workflow

### 1. Audit the "Dead End"

Measure the friction at the end of the current journey.
- **Principle of Closure:** Does the page provide immediate confirmation that
  the action was successful?
- **The Bounce Test:** Is there anything for the user to do other than close
  the tab?
- **Mobile Experience:** Is the "Success" message clear without scrolling on
  mobile?

### 2. Celebrate the Win (The Peak-End Rule)

Reinforce the user's decision to convert.
- **Emotional Copy:** Move from "Order Confirmed" to "You're in! Here's what
  happens next."
- **Visual Validation:** Use success icons, animations (like confetti), or
  hero imagery that reflects the value they just gained.

### 3. Implement the "Next Best Action"

Identify one (maximum two) secondary CTAs based on the user's current intent.
- **High Intent (E-commerce):** "Share your find on Instagram for 10% off your
  next order."
- **Educational (Lead Gen):** "While you wait for your guide, check out this
  related article."
- **Growth (SaaS):** "Invite two teammates to unlock the 'Pro' dashboard for a
  week."

### 4. Leverage the Zeigarnik Effect

Create a sense of an incomplete larger journey.
- **Progress Bars:** Show they are "50% done" with their profile setup.
- **Coming Soon:** Give a sneak peek of what they will receive in their inbox
  shortly.
- **Onboarding Steps:** Provide a "Step 1, 2, 3" roadmap that starts
  immediately.

### 5. Review Against Decision Rules

Verify that the new experience doesn't overshadow the primary confirmation.

## Decision Rules

- **The Confirmation Priority:** The primary confirmation (Order #, Success
  Message) must be the most prominent element and appear at the top.
- **Limit Secondary CTAs:** Never offer more than two distinct paths forward.
  Choice paralysis is just as dangerous on the "Thank You" page.
- **The "Low Friction" Rule:** Secondary actions should require minimal effort
  (e.g., a single click to share or a simple "Add to Calendar").
- **Relevance over Revenue:** If the user just bought a high-end camera, don't
  immediately ask them to buy a cheap toy. Offer a "How-to" guide or lenses.

## Common Failure Patterns

- **The "Sudden Death":** A plain white page with "Success" and no other links.
- **Premature Upsell:** Asking for more money before the user has even
  processed the initial purchase (unless it's a "One-Click" upsell).
- **Information Overload:** Burying the order confirmation under a wall of
  referral links and newsletter signups.
- **Broken Scent:** Sending the user to a completely unrelated part of the
  site that doesn't acknowledge what they just did.

## Validation Methods

- **Secondary Conversion Rate:** Measure clicks/signups on the new CTAs.
- **Session Duration:** Increase in time-on-site after the primary conversion.
- **Referral Traffic:** Increase in traffic coming from "Thank You" page
  sharing buttons.
- **Retention/Churn (SaaS):** Correlate immediate "Thank You" page onboarding
  actions with long-term retention.
