# Seat Expansion & Add-On Behavioral Heuristics & Billing Mechanics

This reference guide details the behavioral psychology, billing proration algorithms, permission delegation models, and expansion UX principles for driving self-serve Net Revenue Retention (NRR) in B2B SaaS applications.

---

## 1. Behavioral Economics of Account Expansion

### A. The Proration Transparency Effect
When team administrators decide to add seats or purchase add-on modules mid-billing cycle, their primary psychological barrier is **Proration Uncertainty**. Unclear billing UI causes fear of:
- Being double-charged for the current month.
- Unexpectedly resetting their billing cycle date.
- Inducing accounting or expensing friction with finance departments.

**Heuristic Rule:** Always explicitly decouple the **"Immediate Charge Today"** (prorated remainder of current cycle) from the **"Upcoming Recurring Total"** (full billing rate starting at next renewal). Displaying both figures side-by-side eliminates proration anxiety and raises Seat Addition Conversion Rates (SACR) by over 50%.

### B. End-User Demand Capture (The Sunk-Cost Collaboration Effect)
When a regular team member is working on a critical project and needs a colleague's input, their motivation to expand the team is at its absolute peak. Presenting a hard permission brick wall ("Access Denied — Contact Admin") destroys this momentum.

**Heuristic Rule:** Transform non-admin friction into an automated pipeline. Giving regular users a 1-click **"Request Seat from Admin"** button leverages the employee's active task context to sell the seat upgrade to the admin on their behalf.

### C. Contextual Add-On Surfacing (The Point-of-Intent Principle)
Adding modular features (e.g., SOC2 Audit Logs, Custom Domain Branding, AI Summarizer, Dedicated Storage) to an account fails when add-ons are placed in an isolated "Marketplace" tab that users must actively seek out.

**Heuristic Rule:** Surface add-on upgrade prompts directly at the point of intent within the workflow:
- *Storage Add-On:* Show when cloud usage crosses 85% capacity.
- *Security/SSO Add-On:* Show inside the Team Settings -> Authentication configuration panel.
- *AI/Automation Add-On:* Show inline next to manual tasks that the AI module automates.

---

## 2. Billing & Proration Calculation Mechanics

### Standard Daily Proration Formula

$$\text{Prorated Charge Today} = \left( \frac{\text{Remaining Days in Billing Cycle}}{\text{Total Days in Billing Cycle}} \right) \times (\text{New Seat Price} \times \text{Number of Added Seats})$$

#### Example Calculation:
- Monthly plan rate: $20.00 / seat / month.
- Adding: +3 seats.
- Billing Cycle: 30 days total, with 12 days remaining before renewal.

$$\text{Prorated Charge Today} = \left( \frac{12}{30} \right) \times (\$20.00 \times 3) = 0.40 \times \$60.00 = \mathbf{\$24.00}$$

- **Immediate Charge Today:** $24.00
- **New Monthly Subscription Rate (at Renewal):** Current Monthly Rate + $60.00/mo.

### Micro-Proration Grace Window Rule
If an account adds a seat with **fewer than 3 days remaining** in their billing cycle, processing a micro-transaction (e.g., $1.50) incurs credit card processor fixed fees (e.g., $0.30 + 2.9%) that swallow net profit.

**Heuristic Rule:** For additions made within 72 hours of cycle renewal, waive the micro-prorated charge for the remaining 3 days and append the new seat fee directly to the upcoming invoice.

---

## 3. Permission Delegation & Approval Models

To maintain account security while eliminating expansion bottlenecks, implement a 3-tier permission matrix for seat additions and add-on purchases:

| User Role | Seat Addition Capability | Add-On Purchase Capability | UI Presentation |
| :--- | :--- | :--- | :--- |
| **Workspace Owner / Billing Admin** | Direct 1-Click Purchase (Card-on-File) | Direct 1-Click Purchase | Full checkout breakdown modal with immediate charge confirmation button. |
| **Team Admin (Non-Billing)** | Direct Purchase if under pre-approved monthly spend cap; else trigger Request. | Trigger Request to Billing Admin | "Add Seat ($15/mo)" with pre-approved budget badge, OR "Send Request to Billing Admin". |
| **Standard Member / Contributor** | Trigger Automated 1-Click Request to Admin | Trigger Automated Request to Admin | "Request Seat for [Email] from Admin" with optional note field and Slack notification trigger. |
| **Guest / Read-Only User** | Upgrade Self to Paid Seat Request | N/A | "Request Creator Upgrade" banner when attempting to edit or create documents. |

---

## 4. Invitee Activation & Time-to-Value Principles

An account expansion is incomplete if added seats remain unassigned or unactivated. Unactivated seats lead to "seat cleanup" churn during annual account reviews.

1. **The "Inviter Context" Rule:** The invitation email and registration page must prominently feature the name and avatar of the person who sent the invite, along with the specific project or workspace name.
2. **Eliminate Redundant Onboarding:** Invited users are joining an *existing* team. Do not ask them company setup questions (e.g., "Company Name", "Industry", "Team Size") that the workspace owner already completed.
3. **Task-Specific Landing Page:** Upon completing SSO/password setup, land the invited user directly into the specific document, board, or channel where their inviter is working.
4. **Active Seat Utilization Banners:** If an admin has unassigned paid seats in their account for >14 days, display an inline prompt in their dashboard: *"You have 2 unused paid seats in your workspace. [Invite Team Members] to maximize your team's workflow."*

---

## 5. Expansion Metrics & Target Benchmarks

| Expansion Metric | Formula / Definition | Target Benchmark |
| :--- | :--- | :--- |
| **Net Revenue Retention (NRR)** | $\frac{\text{Starting MRR} + \text{Expansion MRR} - \text{Churn MRR} - \text{Contraction MRR}}{\text{Starting MRR}} \times 100$ | **>115% (SMB) / >125% (Enterprise)** |
| **Expansion MRR Contribution** | $\frac{\text{Expansion MRR}}{\text{New Logo MRR} + \text{Expansion MRR}} \times 100$ | **>30% of total new MRR** |
| **Seat Addition Conversion Rate (SACR)** | $\frac{\text{Completed Seat Additions}}{\text{Seat Addition Modal Views}} \times 100$ | **>50% for Admins** |
| **Invitee 7-Day Activation Rate** | $\frac{\text{Invitees completing 1 core product action}}{\text{Total Invited Members}} \times 100$ | **>75%** |
| **Non-Admin Request Approval Rate** | $\frac{\text{Approved Non-Admin Requests}}{\text{Submitted Non-Admin Requests}} \times 100$ | **>60% within 48 hours** |
| **Add-On Attach Rate** | $\frac{\text{Accounts with \ge 1 Paid Add-On Module}}{\text{Total Active Paid Accounts}} \times 100$ | **>15% to 25%** |
