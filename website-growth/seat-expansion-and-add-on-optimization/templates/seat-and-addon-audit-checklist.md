# Seat Expansion & Add-On Audit Checklist & Spec Template

This template provides a comprehensive checklist and specification guide for auditing and optimizing team seat invitations, role management, prorated billing transparency, and modular add-on adoption in B2B SaaS products.

---

## Part 1: Diagnostic Audit Checklist

### Section A: Seat Addition & Invite Flow Friction

- [ ] **Single-Step Invite & Purchase:** Can a Billing Admin invite new team members when at capacity without leaving the current page/modal?
  - *Pass:* Modal automatically detects missing seats and calculates additional seat purchase inline.
  - *Fail:* User is shown an error and told to go to `/settings/billing` to buy seats first.
- [ ] **Proration Breakdown Transparency:** Does the seat purchase modal show the exact dollar amount that will be charged *today*?
  - *Pass:* Modal displays prorated charge for remaining days in cycle + new upcoming renewal total.
  - *Fail:* Modal shows only the full monthly cost or hides pricing details until after card charge.
- [ ] **1-Click Payment Authorization:** Can the Billing Admin complete seat expansion using card-on-file with a single primary CTA click?
  - *Pass:* 1-click confirmation using saved payment method.
  - *Fail:* Admin is forced to re-enter billing address or credit card details for existing account.
- [ ] **Unassigned Seat Pooling:** Are unassigned paid seats clearly visible and reusable before triggering new charges?
  - *Pass:* "You have 2 unused paid seats available in your pool. Inviting these members will incur $0 additional charge today."
  - *Fail:* System attempts to charge for additional seats even when paid seats are unassigned.

---

### Section B: Non-Admin Permission Routing & Request Workflows

- [ ] **Request Seat Button:** When a non-admin team member hits a seat cap while trying to invite a colleague, do they have a "Request Seat from Admin" option?
  - *Pass:* Frictionless modal allowing non-admin to submit request with an optional note.
  - *Fail:* Hard red error message ("Permission Denied. Contact Admin") with no action button.
- [ ] **Automated Admin Notification:** Does the seat request notify the Billing Admin via high-visibility channels (Slack, email, in-app notification)?
  - *Pass:* Direct notification containing requester name, invitee email, exact cost ($/mo and prorated today), and a 1-click [Approve] button.
  - *Fail:* Request buried in an unread admin notification queue without email/Slack triggers.
- [ ] **Request Status Visibility:** Can the requesting member track the status of their seat request?
  - *Pass:* UI shows "Request pending with Sarah (Admin)" with option to send a polite nudge.
  - *Fail:* Request disappears into a black hole with no feedback.

---

### Section C: Invitee Onboarding & First-Run Activation

- [ ] **Context-Rich Email Invite:** Does the invitation email include inviter name, workspace logo, and project context?
  - *Pass:* "Alex Rivera invited you to join the Q4 Product Launch workspace on [App]."
  - *Fail:* Generic system email: "You have been added to an account."
- [ ] **Frictionless Auth & SSO:** Can the invited user join via 1-click Google/Microsoft OAuth or simple password creation?
  - *Pass:* 1-click authentication without repetitive company setup questions.
  - *Fail:* Invitee forced to complete a multi-step survey asking "What is your company size?"
- [ ] **Direct Landing Context:** Does the invitee land directly on the relevant workspace/project upon logging in?
  - *Pass:* Lands on the exact project board with a 20-second contextual tour.
  - *Fail:* Lands on an empty default dashboard homepage.

---

### Section D: Modular Add-On Discovery & Attach Rate

- [ ] **Point-of-Use Add-On Placement:** Are modular feature add-ons (e.g., AI credits, SOC2 pack, extra storage) surfaced where the feature is needed?
  - *Pass:* Add-on banner/modal appears in context (e.g., in security tab for SOC2 pack, or at 90% storage capacity).
  - *Fail:* Add-ons hidden exclusively under `/settings/billing/marketplace`.
- [ ] **1-Click Add-On Activation:** Can admins enable an add-on with a clear modal showing benefits, prorated cost today, and a single confirmation click?
  - *Pass:* Instant activation modal with card-on-file charge authorization.
  - *Fail:* Forced sales contact form or manual invoice request for standard SMB add-ons.
- [ ] **Auto-Reload Metered Add-Ons:** For usage-based add-ons (e.g., credits, contacts), is an auto-reload threshold available?
  - *Pass:* Option to auto-purchase 1,000 credits when balance drops below 100.
  - *Fail:* Hard cutoff when balance reaches 0 without proactive warnings.

---

## Part 2: Seat Expansion Modal UX Spec Template

```markdown
# UI Specification: Unified Seat Addition & Proration Modal

## Trigger Event
- Admin clicks "Invite Member" when `Available_Seats == 0`.
- OR Non-admin clicks "Request Seat" -> Admin clicks [Approve] in email/Slack notification.

## Modal Layout & Copy Structure

### Header
- Title: "Add Team Members to [Workspace Name]"
- Subtitle: "Your workspace is currently using all [Current_Seats] paid seats."

### Input Fields
- Team Member Emails: [ Multi-email input field with auto-complete ]
- Role Selector Dropdown: [ Member (Default) | Admin | Read-Only (Free) ]

### Dynamic Proration Breakdown Card (Renders dynamically as emails are typed)
+-----------------------------------------------------------------------+
|  [!] Adding 2 new seats to your account                              |
|                                                                       |
|  Current Subscription: 10 Seats ($150.00/mo)                          |
|  New Subscription:     12 Seats ($180.00/mo)                          |
|  -------------------------------------------------------------------  |
|  Charge Today (18 days remaining in cycle):           $18.00          |
|  Next Billing Renewal Date (Nov 1):                  $180.00/mo       |
|  -------------------------------------------------------------------  |
|  Payment Method: Visa ending in •••• 4242 [Change]                    |
+-----------------------------------------------------------------------+

### Primary CTA Button
- Text: "Confirm & Charge $18.00 Today"
- Secondary Action: "Cancel" (Text link)

### Error & Edge Case States
- Invalid Email: Inline error below field ("Please enter a valid email address").
- Card Payment Failure: Inline alert above CTA ("Card declined. Update payment method or contact card issuer.").
```

---

## Part 3: Non-Admin Seat Request Workflow Spec Template

```markdown
# Workflow Specification: Non-Admin Seat Request & Approval Pipeline

## Step 1: Member Triggers Request
- User Role: `Member`
- Action: Enters `newcolleague@company.com` in Invite Team field.
- Condition: `Unassigned_Seats == 0`.
- System Response: Display modal:
  "Your team has used all [Seats_Total] seats. Request 1 additional seat ($15/mo) for newcolleague@company.com from [Admin_Name]?"
- Optional Input: "Add a brief note for [Admin_Name] (e.g., 'Joining the engineering sprint')"
- CTA: [ Send Request to Admin ]

## Step 2: Automated Slack & Email Dispatch to Admin
- Recipient: `Workspace_Billing_Admin`
- Slack Block Kit / Email Layout:
  - Header: "🚀 Seat Request for [Workspace Name]"
  - Body: "[Member_Name] requested an additional seat for newcolleague@company.com."
  - Note: '"Joining the engineering sprint"'
  - Billing Summary: "+1 Seat = $15/mo ($7.50 prorated charge today)."
  - Interactive Button: [ Approve & Add Seat ($7.50) ] (Executes API call directly)
  - Secondary Button: [ Decline Request ]

## Step 3: Resolution & Notification
- If Approved:
  1. Card-on-file charged $7.50 automatically.
  2. Seat pool incremented +1.
  3. Invitation email sent instantly to `newcolleague@company.com`.
  4. Slack notification sent to requesting member: "🎉 Sarah approved your seat request! Invitation sent to newcolleague@company.com."
- If Declined:
  1. Slack notification sent to requesting member: "Sarah declined the seat request for newcolleague@company.com."
```
