# Example: Return Visitor Optimization for B2B SaaS

This example demonstrates how a B2B SaaS platform ("FlowState CRM") optimized
its experience for returning anonymous visitors who have shown interest but
haven't signed up yet.

## Scenario

- **Context:** FlowState CRM has a 3-visit average before a user starts a free
  trial.
- **Problem:** Every time a user returns, they are greeted by a generic hero
  video and a "What is FlowState?" value prop. Users who have already viewed the
  pricing page 2x are still treated as "Unaware" prospects.
- **Goal:** Increase Trial Signup Rate for returning visitors.

## Before Optimization (The "Amnesia" Experience)

1. **Visit 1:** User lands on Home, reads features, views Pricing.
2. **Visit 2:** User returns to Home.
   - **Hero:** "The Ultimate CRM for Agile Teams" (Generic).
   - **Pop-up:** "Get 10% off your first year!" (New visitor offer).
   - **Friction:** User has to click "Pricing" again to remember the tiers.
3. **Outcome:** User gets distracted and leaves.

## After Optimization (The "Continuity" Experience)

1. **Visit 1:** User lands on Home, reads features, views Pricing. (System
   saves `last_viewed_category: "pricing"` in LocalStorage).
2. **Visit 2:** User returns to Home.
   - **Hero Change:** Headline swaps to "Ready to pick your plan?" with a
     subheadline: "You last viewed our Pro Tier. See how it compares to Basic."
   - **Pop-up Suppressed:** The system recognizes the returning user and hides
     the "New Visitor" pop-up.
   - **New Widget:** A "Recently Viewed" sidebar appears: "Top Feature: Slack
     Integration" (based on their previous click-path).
3. **Outcome:** User feels the product "understands" their needs, clicks the
   personalized CTA, and starts a trial.

## Measurable Results

- **Return Visitor CVR:** Increased from 2.1% to 3.4% (62% relative lift).
- **Time to Trial:** Decreased from 4.2 days to 2.8 days.
- **Bounce Rate:** Decreased by 15% for returning visitors landing on the
  homepage.
