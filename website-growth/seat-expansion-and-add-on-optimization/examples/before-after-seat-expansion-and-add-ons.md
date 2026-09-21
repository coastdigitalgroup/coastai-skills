# Before & After Example: B2B Project Management Platform Seat & Add-On Expansion

## Business Context

**Company:** TaskGrid (B2B SaaS Collaborative Work Management Platform)
**Target Customer:** Mid-market software development, agency, and marketing teams (10–100 seats per workspace).
**Pricing Model:** $15/user/month (Team Tier). Optional modular add-ons: SOC2 Compliance & Security Pack ($49/mo) and AI Automated Summaries Add-On ($29/mo).

---

## Baseline Situation & Performance Problem

Despite strong initial team onboarding and a high Net Promoter Score (NPS 58), TaskGrid's self-serve Net Revenue Retention (NRR) hovered at a sluggish **98%**. The product team noticed that accounts rarely expanded past their initial seat purchases (average 6 seats per account), even though workspace usage and project volume were growing rapidly.

### Key Friction Points Identified in Audit:

1. **The "Go to Billing First" Detour:** When a Workspace Admin clicked "Invite Member" at seat capacity (6/6 seats used), the modal displayed a red warning: *"Workspace is full. Go to Billing Settings to purchase additional seats."* Admins were forced to leave the project, navigate to `/settings/billing`, find the seat slider, increase it to 8 seats, authorize payment, navigate back to `/settings/team`, and re-enter the email addresses. **78% of admins abandoned the invite flow at this step.**
2. **Non-Admin Permission Brick Wall:** When a non-admin team member attempted to invite a colleague or try the AI Summary add-on, the UI displayed a hard disabled state: *"Permission Denied. Only Workspace Owners can manage team members."* Zero mechanism existed for non-admins to request seats.
3. **Proration Anxiety:** When admins did reach the seat purchase screen, the slider displayed a terrifying flat total: *"Your plan will increase to $120/mo."* It gave zero indication of what would be charged **today** for mid-cycle seat additions, triggering fear of unexpected double-charging.
4. **Generic Invitee Emails:** Invited colleagues received a plain text email: *"You have been invited to TaskGrid. Click here to set your password."* **55% of invitees never completed account registration.**
5. **Buried Modular Add-Ons:** The SOC2 Compliance Pack and AI Summary add-ons were hidden inside a sub-tab named `/settings/billing/add-ons-marketplace`. Less than 1.5% of accounts ever discovered or activated them.

---

## Applied Optimization Strategy

TaskGrid implemented the **Seat Expansion & Add-On Optimization** framework across their workspace management and collaboration interface:

### 1. Unified Inline "Add & Invite" Modal with Proration Calculator
- Replaced the "Go to Billing First" detour with a single, frictionless invite modal.
- If an admin inputs 3 new email addresses when 0 seats are available, the modal automatically calculates the +3 seats inline and renders an interactive **Prorated Invoice Breakdown Widget**:
  ```text
  [!] 3 additional seats required for your new team members.
  -------------------------------------------------------------
  Current Seats: 6 ($90/mo)  ->  New Total: 9 Seats ($135/mo)
  -------------------------------------------------------------
  Charge Today (14 days left in billing cycle): $21.00
  Next Monthly Renewal (Nov 1): $135.00/mo
  -------------------------------------------------------------
  [ Confirm Charge ($21.00) & Send 3 Invites ]
  ```

### 2. Automated Non-Admin "Request Seat" & 1-Click Admin Approval
- Transformed non-admin permission errors into an automated expansion engine. When a regular member tries to invite a colleague, the modal displays: *"Request 1 Additional Seat ($15/mo) from Sarah (Workspace Admin)?"* with a 1-line optional note.
- Clicking "Send Request" dispatches an interactive notification directly to the admin's Slack channel and email inbox with a 1-click **[Approve $15/mo & Send Invite]** button.

### 3. Context-Rich Invitee Onboarding Card
- Redesigned the invitation email and landing page:
  - Email Subject: *"Alex Rivera invited you to join the Q4 Marketing Launch project on TaskGrid"*
  - Includes Alex's avatar, workspace logo, and a direct preview of the project dashboard.
  - Invited users sign in with 1-click Google OAuth and land directly on the Q4 Marketing Launch board with an interactive 20-second spotlight tour.

### 4. In-Context Modular Add-On Triggers
- Placed the AI Summaries Add-On directly inside project status reports with an inline teaser: *"Generate AI Executive Summary (Included in AI Pack — $29/mo for entire workspace). [Try 1-Click Demo / Enable Add-On]"*.
- Rendered the SOC2 Compliance & Audit Logs module inside Workspace Security settings with a 1-click "Enable SOC2 Pack ($49/mo)" toggle for admins.

---

## Results & Measurable Outcomes

Over a 90-day post-implementation evaluation period, TaskGrid achieved dramatic improvements across all expansion and retention metrics:

| Metric | Before Optimization | After Optimization | Impact / Delta |
| :--- | :--- | :--- | :--- |
| **Net Revenue Retention (NRR)** | 98% | **116%** | **+18% absolute lift** |
| **Seat Addition Conversion Rate (SACR)** | 22% | **61%** | **+177% relative lift** |
| **Monthly Expansion MRR** | $4,200 / mo | **$16,800 / mo** | **4.0x increase** |
| **Invitee Account Activation Rate (7 days)** | 45% | **82%** | **+82% relative lift** |
| **Non-Admin Request Approval Rate** | 0% (feature didn't exist) | **68% approved within 24h** | **New expansion channel created** |
| **AI Add-On Attach Rate** | 1.2% | **8.4%** | **7.0x attach rate increase** |
| **Billing Support Tickets ("Proration Questions")** | 142 tickets / mo | **18 tickets / mo** | **87% ticket reduction** |

---

## Key Takeaways

1. **Eliminate Billing Context Switching:** Combining seat purchasing and member invitation into a single modal removes the #1 barrier to B2B SaaS account growth.
2. **Proration Transparency Builds Trust:** Showing the exact dollar charge today versus the upcoming monthly renewal removes fear of surprise charges.
3. **Empower Non-Admin Demand:** Giving standard users a 1-click "Request Seat" button turns dormant team demand into instant expansion revenue for admins.
4. **Context Drives Add-On Attach Rates:** Surface modular add-ons where the work happens, not in buried settings menus.
