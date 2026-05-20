# Example: Referral Loop Optimization

This scenario demonstrates the optimization of a referral program for a fictional B2B SaaS platform, "ProjectFlow."

## Before Optimization: The "Hidden" Program

ProjectFlow had a "Refer a Friend" link in the footer of the dashboard. When clicked, it opened a generic email form asking the user to manually type in email addresses.

*   **Trigger:** User-initiated (passive).
*   **Incentive:** "Get $10 credit for every successful signup." (One-sided).
*   **Friction:** High. Users had to remember the program exists and manually input data.
*   **Outcome:**
    *   **Monthly Invites:** 45
    *   **Invite Conversion Rate:** 2%
    *   **Viral Coefficient (K):** 0.009 (Negligible growth).

## The Optimization Strategy

The team applied the Referral Loop Optimization skill to rebuild the engine:

1.  **Joy Peak Trigger:** Instead of a footer link, a modal is shown immediately after a user successfully "Completes their first project" (the Aha! Moment).
2.  **Two-Sided Incentive:** Changed to "Give your colleague 1 month free, and get 1 month free for yourself when they join."
3.  **Friction Reduction:** Implemented the Web Share API for mobile and a "Copy Link" button with a pre-written message for Slack/Teams.
4.  **Recipient Experience:** Created a custom landing page for referees that says: "Your colleague [Name] invited you to ProjectFlow. Sign up now to claim your free month."

## After Optimization: The "Viral" Engine

*   **Trigger:** Automated at "Joy Peak."
*   **Incentive:** Two-sided value (1 month free).
*   **Friction:** Low (One-click copy/share).
*   **Outcome:**
    *   **Monthly Invites:** 850 (18x increase)
    *   **Invite Conversion Rate:** 12% (6x increase due to personalized landing page)
    *   **Viral Coefficient (K):** 0.102
    *   **Impact:** 10% of all new signups now come from referrals, reducing blended CAC by 8%.
