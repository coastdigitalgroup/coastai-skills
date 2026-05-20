---
name: referral-loop-optimization
description:
  Audit and optimize referral programs to turn existing users into a growth
  channel. Trigger this skill when a site has a stable user base but low
  organic growth or a high Customer Acquisition Cost (CAC).
---

# Referral Loop Optimization

## Purpose

The Referral Loop Optimization skill provides a systematic framework for
designing and refining viral growth engines. By identifying the ideal moments
to ask for a referral, optimizing incentive structures, and reducing friction
in the sharing process, this skill aims to increase the Viral Coefficient
(K-factor) and reduce Customer Acquisition Cost (CAC). It transforms the
product experience into a self-sustaining growth channel.

## Use Cases

- **SaaS Platforms:** Encouraging users to invite team members or colleagues.
- **E-commerce:** Implementing "Give $X, Get $X" programs for existing customers.
- **Mobile Apps:** Leveraging contact list integration or social sharing to
  drive installs.
- **Newsletters/Communities:** Incentivizing subscribers to share content to
  unlock rewards or exclusive access.

## When NOT to Use

- **Pre-Product-Market Fit:** If users aren't finding value in the product yet,
  asking them to refer others will only damage trust.
- **High-Churn Products:** Focus on `user-onboarding-optimization` or core
  product value first. Referral loops fail if the "bucket is leaky."
- **Niche/Sensitive B2B:** In industries where referrals are highly formal or
  privacy-sensitive (e.g., specialized legal or medical services), automated
  loops may feel inappropriate.

## Inputs

1. **User Retention Data:** Confirmation that the product has a "sticky" base of
   active users.
2. **Current Referral Metrics:** Viral Coefficient (K), invitation sent rate,
   and referral conversion rate.
3. **Customer Persona & Motivation:** Understanding why users share (e.g.,
   altruism, financial gain, social status).
4. **Existing Sharing Infrastructure:** Current referral links, landing pages,
   and tracking capabilities.

## Outputs

1. **Referral Friction Audit:** Identification of "broken" loops and high-
   friction steps in the sharing journey.
2. **Optimized Incentive Structure:** Recommendations for two-sided rewards
   that align with user motivations.
3. **Sharing Interface Specs:** Guidance on the design of referral dashboards,
   invite modals, and shareable assets.
4. **Viral Logic & Timing Map:** A plan for *when* and *how* to trigger referral
   prompts based on user "Aha! Moments."

## Workflow

### 1. Identify the "Joy Peak"

Referral prompts should be triggered when the user's perceived value is at its
highest.

- **The Moment of Delight:** Immediately after a successful transaction, a
  positive result (e.g., "Report Generated"), or a milestone achievement.
- **The "Aha!" Moment:** When a user first experiences the core value of the
  product.

### 2. Design the Incentive Architecture

Choose the right incentive type based on the product category:

- **Two-Sided Incentives:** The "Dropbox" model (both the referrer and the
  referee get a reward). Usually most effective.
- **Altruistic Sharing:** "Give your friends a free month." Works well for
  mission-driven or high-status products.
- **Status/Access Rewards:** Unlocking "Pro" features or early access to new
  capabilities.

### 3. Optimize the Referral Path (Friction Reduction)

- **The "One-Click" Share:** Use native sharing APIs (Web Share API) or pre-
  filled messages for WhatsApp, Email, and Slack.
- **Personalization:** Allow referrers to add a personal note or use their name
  in the invitation (e.g., "John invited you to join...").
- **Magic Links:** Ensure the referee lands on a personalized page that
  references the friend who invited them to maintain trust.

### 4. Create the "Recipient Experience"

The conversion rate of the referral depends on the landing page for the person
being invited.

- **Social Proof:** Explicitly mention the referrer (e.g., "Your friend Sarah
  thought you'd love this").
- **Contextual Value:** Explain the benefit of joining through a referral
  rather than a standard signup.

### 5. Review Against Decision Rules

Verify the proposed loop against the viral growth heuristics.

## Decision Rules

- **The Two-Sided Rule:** For maximum velocity, always reward both the referrer
  and the referee.
- **The Friction Rule:** The number of clicks from "Intent to Share" to "Share
  Sent" should be no more than two.
- **Low-Value Threshold:** Incentives must be meaningful enough to drive
  action but sustainable for the business (e.g., a $1 discount on a $1000
  product is worse than no incentive at all).
- **Proximity to Value:** Place the referral prompt *after* the user has
  received value, never *before*.

## Common Failure Patterns

- **Premature Referral:** Asking for a referral during the first 30 seconds of
  onboarding.
- **Invisible Loops:** Burying the referral program in a "Settings" menu where
  no one ever sees it.
- **Complex Rewards:** Requiring the user to jump through hoops (e.g., "Refer 5
  people who all must spend $50") to get a small reward.
- **Broken Message Match:** The link shared by the user leads to a generic home
  page that doesn't mention the referral or the reward.
- **Spammy Behavior:** Sending automated emails from the user's account
  without clear consent or preview.

## Validation Methods

- **Viral Coefficient (K):** (Avg. invites per user) * (Conversion rate of
  invites). Goal: Move closer to (or above) 1.0.
- **Referral Conversion Rate:** (Signups from referrals / Total referral link
  clicks).
- **Incentive Participation Rate:** Percentage of active users who have
  interacted with the referral program.
- **CAC Impact:** Measure the decrease in blended Customer Acquisition Cost
  over time.
