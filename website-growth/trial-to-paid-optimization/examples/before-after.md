# Trial-to-Paid Optimization: Before and After

This example demonstrates how a B2B SaaS platform ("ProjectFlow") optimized their trial-to-paid transition, resulting in a significant lift in conversion rate and reduced early churn.

## Scenario: ProjectFlow SaaS

ProjectFlow is a project management tool with a 14-day free trial. Users can create unlimited projects and invite up to 5 team members during the trial.

### The "Before" State (Low Urgency & Friction)

- **The Trigger:** On Day 14 at midnight, the user's account is locked.
- **The Experience:** The user logs in on Day 15 and sees a full-screen modal: "Your trial has ended. Please pick a plan to continue."
- **The Messaging:** Generic "Trial Ended" email sent on Day 14.
- **The Friction:** The user has to navigate to the pricing page, compare three complex plans, and then enter credit card details while their active work is hidden behind the modal.
- **Outcome:**
    - **Trial-to-Paid Conversion:** 8.2%
    - **Churn Reason:** "Lost momentum," "Confused by plans," "Forgot the trial was ending."

### The "After" State (Optimized Transition)

ProjectFlow applied the Trial-to-Paid Optimization skill to create a proactive, value-driven sequence.

1. **Value Milestone Trigger (Day 4):**
   - **Action:** If a user completes their first 10 tasks, they receive an in-app "Achievement" notification.
   - **Offer:** "You're a power user! Upgrade in the next 24 hours to get 20% off your first year."
2. **Loss Aversion Countdown (Day 11-14):**
   - **Action:** A subtle top-bar countdown appears: "3 days left in your trial. Keep your 12 active projects by upgrading now."
   - **Psychology:** Focuses on *keeping* what they've built (Endowment Effect).
3. **The "Soft Landing" Expiration (Day 14):**
   - **Action:** Instead of a hard lockout, the app enters "View-Only" mode.
   - **Messaging:** "Your trial ended, but your data is safe. You can still view your projects, but editing is disabled until you upgrade."
4. **Contextual Checkout Bridge:**
   - **Action:** When the user clicks "Upgrade," they are shown a "Plan Recommendation" based on their trial usage (e.g., "You have 6 team members; the 'Pro' plan is best for you").
   - **Outcome:**
    - **Trial-to-Paid Conversion:** 14.5% (76% increase)
    - **Early Churn:** Reduced by 15% (users felt more in control).

## Key Improvements Made

| Feature | Before | After | Psychological Trigger |
| :--- | :--- | :--- | :--- |
| **Notification Timing** | Only on expiration | Days 4, 11, 13, 14, 15 | Recency & Frequency |
| **Messaging Focus** | "Buy a subscription" | "Keep your projects" | Loss Aversion |
| **Urgency** | None until lockout | 3-day countdown timer | Scarcity / Deadlines |
| **Accessibility** | Hard lockout (Friction) | View-only mode (Safety) | Endowment Effect |
| **Plan Selection** | Manual comparison | Data-driven recommendation | Reducing Choice Paralysis |
