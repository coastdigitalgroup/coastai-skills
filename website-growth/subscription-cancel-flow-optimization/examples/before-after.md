# Example: SaaS Cancellation Flow Overhaul

This example shows how a B2B SaaS company (ProjectStream) optimized their cancellation flow to reduce monthly churn from 6% to 4.5%.

## The "Before" Scenario (The "Cold Exit")

ProjectStream had a simple "Cancel Subscription" button in the settings. Clicking it triggered a browser "Are you sure?" alert. If the user clicked "OK," the subscription was terminated immediately.

- **Friction:** Too low (no save opportunities).
- **Feedback:** Zero (didn't know why people were leaving).
- **Save Rate:** 0%.
- **Monthly Churn:** 6.2%.

## The "After" Optimization (The "Retention Path")

ProjectStream implemented a 3-step optimized cancel flow using the `subscription-cancel-flow-optimization` skill.

### Step 1: The Insight Survey
Instead of an alert, the "Cancel" button opened a modal asking: *"We're sorry to see you go. What's the primary reason for your cancellation?"*
- Options included: "Too expensive," "Missing features," "Temporary project finished."

### Step 2: The Contextual Save
The system branched based on the response:
- **If "Too expensive":** The system offered a "Retention Discount" of 50% for 3 months.
- **If "Temporary project finished":** The system offered to "Pause for 3 months" instead of canceling, preserving all project data and custom templates.
- **If "Missing features":** The system showed a "Maintenance Plan" ($9/mo) to keep data accessible without active project management tools.

### Step 3: The Loss Aversion Summary
Before the final confirmation, a small sidebar showed: *"If you proceed, you will lose your 12 active project boards and 4 years of version history."*

---

## Results & Measurable Outcomes

| Metric | Before | After | Change |
| :--- | :--- | :--- | :--- |
| **Save Rate** | 0% | 18.5% | +18.5% |
| **Monthly Churn** | 6.2% | 4.5% | -27.4% |
| **LTV (Lifetime Value)** | $450 | $610 | +35.5% |
| **Data Insights** | None | 40% leave due to "Price" | Strategic pricing review triggered |

**Analysis:** By matching the *reason* for leaving with a *logical alternative*, ProjectStream recovered nearly 1 in 5 users who intended to cancel. The "Pause" option was particularly effective for seasonal users who previously thought cancellation was their only choice.
