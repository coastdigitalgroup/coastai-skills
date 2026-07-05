# Example: Optimizing Feedback on a High-Exit Pricing Page

This example demonstrates how shifting from a generic "Feedback" widget to a
contextual, intent-driven micro-survey can increase response rates and provide
actionable data for conversion optimization.

## The Problem

A SaaS company noticed a 75% exit rate on their "Pro" plan pricing page. Google
Analytics showed that users spent an average of 45 seconds on the page—long
enough to read the details—but left without clicking "Start Trial."

The team knew users were dropping off, but they didn't know if the issue was
price, missing features, or lack of trust.

## The "Before" (Generic Feedback)

The team initially used a standard feedback tab that sat on the side of the
screen.

- **Question:** "How are we doing? [Text Box]"
- **Trigger:** Passive (User had to click the tab to see the question).
- **Placement:** Bottom right sidebar.
- **Results:**
  - **Response Rate:** 0.2%
  - **Data Quality:** Most responses were "Great site" or "I'm looking for a
    job."
  - **Outcome:** No actionable insights to improve the page.

## The "After" (Optimized Micro-Survey)

The team applied the **Micro-Survey Optimization** skill to create a focused,
proactive interaction.

- **Hook Question:** "What's the #1 thing stopping you from starting a trial
  today?"
- **Options:**
  - [ ] "I'm not sure if [Feature X] is included."
  - [ ] "It's more expensive than I expected."
  - [ ] "I need to talk to my team first."
  - [ ] "Other (please specify)"
- **Trigger:** Exit Intent (Popup appears when the user moves their cursor to
  close the tab) + Behavioral (Only shown to users who spent >30s on the page).
- **Design:** A small, bottom-aligned modal that didn't block the main pricing
  table.

## The Results

| Metric | Before | After | Change |
| :--- | :--- | :--- | :--- |
| **Response Rate** | 0.2% | 4.8% | +2,300% |
| **Completion Rate** | 15% | 92% | +513% |
| **Actionable Insights** | 1 per month | 45 per week | N/A |

### The "Aha!" Discovery

The data revealed that 60% of respondents selected "I'm not sure if [Feature X]
is included." It turned out that Feature X was actually included in the Pro
plan, but it was buried deep in a "See all features" toggle that users weren't
clicking.

### The Fix

The team moved Feature X to the primary list of "Pro" benefits in the pricing
card. This change, derived directly from the micro-survey, resulted in a **12%
lift in trial sign-ups** within the first week of the A/B test.
