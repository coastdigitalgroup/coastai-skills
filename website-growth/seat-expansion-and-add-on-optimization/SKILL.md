---
name: seat-expansion-and-add-on-optimization
description:
  Audit and optimize team seat invites, role-based user additions, prorated billing calculations, and modular feature add-on workflows to maximize self-serve Expansion MRR and Net Revenue Retention (NRR).
---

# Seat Expansion & Add-On Optimization

## Purpose

The Seat Expansion & Add-On Optimization skill provides a systematic framework for auditing, designing, and optimizing team seat invitation workflows, role-based user provisioning, prorated billing previews, and modular feature add-on adoption flows in active customer accounts.

In B2B SaaS and product-led growth (PLG) applications, existing customer expansion (adding seats, inviting collaborators, enabling add-on modules like security compliance, dedicated storage, or AI credits) is the single highest-margin driver of Net Revenue Retention (NRR) and Customer Lifetime Value (LTV). However, self-serve account expansion is frequently crippled by high UX friction:
1. **Proration Anxiety:** Opaque billing mechanics where team admins hesitate to invite members because they cannot see immediate prorated charge breakdowns.
2. **Permission Brick Walls:** Non-admin team members reaching workspace seat limits without an integrated "Request Seat / Request Add-On" workflow.
3. **Broken Invitee Activation:** Clunky onboarding for invited collaborators who receive generic email invites and land on cold login screens without task context.
4. **Hidden Add-On Discovery:** Modular feature add-ons buried deep within account billing settings rather than surfaced contextually at the point of intent.

By optimizing the expansion UX, permission request routing, proration transparency, and invitee onboarding, this skill converts active user demand into friction-free self-serve Expansion Monthly Recurring Revenue (Expansion MRR).

---

## Use Cases

- **B2B SaaS Workspace Seat Expansion:** Existing teams adding additional seats (e.g., inviting 5 new designers, marketers, or engineers to an active workspace).
- **Role-Based User Upgrades:** Upgrading read-only or guest users into paid editor/creator seats directly within collaboration workflows.
- **Modular Feature Add-On Adoption:** Purchasing specialized add-ons (e.g., SOC2 Compliance Pack, Dedicated IP, Custom Branding, AI Assistant Add-On, Extra Storage Unit) within an active paid subscription.
- **Non-Admin Seat & Feature Requests:** Enabling non-billing team members to trigger automated, 1-click approval requests to team admins when seat caps or feature limits are reached.
- **Invitee Onboarding & Activation:** Optimizing the email invite and first-run experience for invited team members to ensure rapid time-to-value and seat utilization.

---

## When NOT to Use

- **Initial Cold Lead Conversion:** For converting anonymous website visitors into initial paid subscribers or trialing users, use `pricing-page-optimization` or `trial-to-paid-optimization`.
- **Freemium Tier Paywalls:** For converting free-tier accounts encountering core product feature gates, use `freemium-upgrade-flow-optimization`.
- **Primary Plan Tier Changes:** For moving a customer from a "Standard" tier to an "Enterprise" tier, use `pricing-page-optimization`.
- **Subscription Billing Interval Switches:** For converting monthly subscriptions to annual billing plans, use `billing-interval-optimization`.
- **Cancellation Prevention:** For handling account downgrades or seat reductions during cancellation attempts, use `churn-prevention-flow-optimization`.

---

## Inputs

1. **Expansion & Seat Analytics:**
   - Expansion MRR contribution (% of total MRR growth from existing accounts).
   - Seat Addition Conversion Rate (SACR) — percentage of seat add attempts that result in completed transactions.
   - Seat Utilization Rate (percentage of paid seats currently assigned to active users).
   - Invitee Activation Rate (% of sent seat invites that complete account setup within 7 days).
   - Add-On Attach Rate (% of active subscriptions with at least 1 paid add-on module).
2. **Current Account & Team UI Assets:**
   - Screenshots/recording of team management settings (`/settings/team`), user invite modals, role configuration panels, and add-on marketplace settings.
3. **Billing & Proration System Mechanics:**
   - Proration rules (e.g., immediate prorated charge vs. next cycle co-termination).
   - Billing gateway capabilities (e.g., Stripe card-on-file automatic charging, invoice billing thresholds).
4. **User Persona & Permission Roles:**
   - Distinction between Workspace Owner/Billing Admin, Admin, Member, Guest, and Read-Only roles.

---

## Outputs

1. **Account Expansion Friction Audit:** In-depth diagnostic of seat invite drop-offs, proration confusion, admin permission dead ends, and add-on discovery failures.
2. **Prorated Invoice Calculator Wireframe Specs:** UI design for real-time, transparent cost breakdown modals showing exact prorated charges today and upcoming renewal totals.
3. **Non-Admin Seat Request & Permission Routing Spec:** Workflow designs for inline "Request Seat from Admin" triggers with 1-click email/Slack admin approval notifications.
4. **Context-Rich Invitee Onboarding Flow:** UX design for personalized email invitation cards and "Welcome to [Workspace]" onboarding steps that preserve inviter context.
5. **Contextual Add-On Discovery Spec:** Design rules for surfacing modular add-ons directly inside feature interfaces rather than hiding them in billing sub-menus.

---

## Workflow

### 1. Audit Current Seat Expansion & Add-On Friction

Analyze the end-to-end expansion path for both team admins and regular team members:
- **Map the Seat Invite Flow:** Attempt to invite a new team member when the workspace is at capacity.
  - *Does it block the invite instantly with a hard red error?*
  - *Does it show the exact cost per additional seat before charging?*
  - *Is the billing admin forced to navigate to a separate `/billing` tab to purchase seats first before returning to `/team` to invite?*
- **Audit Non-Admin Workflows:** Attempt to invite a team member or access an add-on feature as a standard non-admin member.
  - *Does the UI present a dead-end error ("Contact your admin")? Or does it offer an automated "Request Seat from Admin" button?*
- **Inspect Proration Transparency:** Click to add 3 seats mid-billing cycle.
  - *Does the modal show: "Your card will be charged $42.50 today (prorated for 17 remaining days), and your monthly plan will update to $200/mo on Nov 1"?*
- **Evaluate Add-On Discoverability:** Check where add-ons (e.g., SSO, extra storage, AI credits) are located. Are they buried under account settings, or promoted in context where the feature is needed?

### 2. Optimize Inline Seat Addition & Proration Transparency

Eliminate purchase anxiety for billing admins by providing instant financial clarity:
- **Unified "Add & Invite" Single Step:** Combine seat purchasing and member invitation into a single seamless modal. If an admin invites 3 people when 0 seats are available, auto-calculate the 3 additional seats directly in the invite modal.
- **Real-Time Proration Breakdown Widget:** Inside the seat addition modal, render an explicit billing breakdown before purchase:
  - *Current Seats:* 10 seats ($100/mo)
  - *Adding:* +3 seats ($30/mo)
  - *Prorated Charge Today (15 days left in cycle):* **$15.00**
  - *New Monthly Renewal (starting Oct 1):* **$130.00/mo**
- **Flexible Quantity Steppers & Volume Discounts:** For bulk seat additions (e.g., adding 10+ seats), include interactive quantity steppers with real-time tier discount badges (e.g., "Add 5 more seats to unlock 15% volume discount").
- **1-Click Card-On-File Confirmation:** Utilize saved credit card payment methods so billing admins can complete expansion with a single primary CTA ("Confirm & Charge $15.00").

### 3. Implement Non-Admin Permission Routing & Seat Requests

Turn non-admin user intent into automated expansion pipelines rather than brick walls:
- **"Request Seat" Inline Trigger:** When a regular team member enters an email address in the "Invite Team" field and hits the workspace seat cap, display a frictionless request dialog: *"Your workspace has reached its limit of 10 seats. Request an additional seat from your Workspace Admin."*
- **1-Click Admin Notification System:** Instantly dispatch a formatted request notification to the billing admin via email and/or Slack integration:
  - *Headline:* "[User Name] wants to invite [Invitee Name] ([Invitee Email]) to [Workspace Name]."
  - *Context:* "Adding 1 seat will cost **$15/mo** (prorated charge today: **$7.50**)."
  - *Action:* Include a 1-click **[Approve & Add Seat]** button directly inside the notification or Slack message.
- **Request State Tracker for Members:** Give the requesting user real-time visibility ("Request sent to Sarah (Admin) • Pending approval").

### 4. Optimize Invitee Onboarding & First-Run Activation

Ensure paid seats are rapidly occupied and activated to prevent seat churn:
- **Context-Rich Email Invitations:** Personalize the email invitation with the inviter's name, avatar, workspace name, and project context:
  - *Weak:* "You have been invited to TaskGrid."
  - *Strong:* "Alex Rivera invited you to join the **Q4 Product Launch** workspace on TaskGrid."
- **Seamless Account Creation & SSO:** Allow invited users to join with 1-click Google/Microsoft OAuth or password creation without asking redundant company profile questions already answered by the workspace admin.
- **Contextual Welcome & Direct Landing:** Land the invited user directly on the specific project, document, or dashboard where they were invited, accompanied by an interactive 30-second tour.

### 5. Modularize Add-On Discovery & 1-Click Activation

Drive high-margin add-on attach rates by embedding add-on triggers directly at point-of-use:
- **In-Context Feature Teasers & Modules:** Place modular add-on banners where users experience feature limitations:
  - *Example (Storage):* When workspace storage reaches 90%, display an inline banner: *"Running low on cloud storage? [Add 500GB for $10/mo] (Instant 1-Click Activation)."*
  - *Example (Security):* In the team security settings, display a SOC2 Compliance / Audit Logs module: *"Enable Advanced Audit Logs & IP Whitelisting for $49/mo."*
- **1-Click Add-On Activation Overlay:** When an admin clicks to enable an add-on, present a focused single-card modal highlighting the specific add-on benefits, exact prorated charge, and 1-click activation button.
- **Flexible Usage Add-On Metering:** For usage-based add-ons (e.g., AI credits, API calls, contacts), offer auto-reload triggers (e.g., "Auto-add 1,000 AI credits for $20 when balance drops below 100") to prevent service disruptions.

---

## Decision Rules

### Rule 1: Seat Invite & Billing Coupling
- **If the user is a Billing Admin:** ALWAYS allow inline seat purchasing directly inside the team invite modal. Never redirect an admin to a separate billing settings page to buy seats first.
- **If the user is a Non-Admin:** ALWAYS show a "Request Seat from Admin" option with a field for adding an optional note to the admin. Never present a dead-end "Access Denied" or disabled input without a request path.

### Rule 2: Proration Presentation
- ALWAYS display the exact dollar amount that will be charged **today** alongside the new recurring billing total.
- If the remaining duration in the current billing cycle is less than 3 days, optionally waive the micro-proration and roll the initial charge into the upcoming cycle to avoid card processing micro-transaction fees.

### Rule 3: Add-On Architecture & Surfacing
- **If the add-on is feature-based (e.g., SSO, Custom Branding):** Surface it in the relevant product settings page (e.g., Security settings, Brand settings) with a "Try Demo" or "Enable Module" CTA.
- **If the add-on is capacity/usage-based (e.g., Storage, API Credits):** Surface soft warning banners at 80% and 90% utilization with 1-click expansion options.

### Rule 4: Volume Discount Framing
- When adding 5+ seats at once, automatically display a volume savings callout (e.g., *"Adding 5 seats qualifies for Team Tier pricing — saving $5/seat/month"*).

---

## Constraints

- **Proration Transparency:** Never execute an automatic credit card charge for additional seats or add-ons without presenting a clear financial breakdown modal first.
- **Permission Safeguards:** Only designated Billing Admins or Workspace Owners can authorize immediate credit card charges. Non-admin requests must go through approval routing.
- **Seat Reassignment Rights:** Unassigned paid seats (e.g., when an employee leaves the company) must remain available in the workspace pool for future invites without requiring double-charging.
- **Explicit Cancellation & Removal:** Workspace admins must have a simple, self-serve UI in `/settings/team` to remove users and reduce recurring seat counts for upcoming billing cycles.

---

## Non-Goals

- Building payment gateway APIs or handling credit card processor dunning algorithms.
- Negotiating custom enterprise contract terms, MSA redlines, or manual invoice PO workflows.
- Setting the core baseline product price per seat or tier packaging.

---

## Common Failure Patterns

- **The "Go To Billing First" Detour:** Forcing a billing admin who wants to invite 2 new team members to abandon the `/team` page, navigate to `/settings/billing`, adjust a seat stepper slider, click save, navigate back to `/team`, and re-type the email addresses.
- **Proration Shock:** Charging an admin's credit card instantly upon inviting a member without showing a confirmation modal displaying the prorated charge, causing billing disputes and support tickets.
- **The Non-Admin Brick Wall:** Displaying a cold disabled button or error message ("Only admins can invite users") when a regular team member tries to collaborate, killing expansion momentum.
- **The Generic Invite Email:** Sending invited collaborators an unbranded email saying "You have been invited to join an account," which gets flagged as spam or ignored.
- **Buried Add-Ons:** Hiding valuable modular add-ons inside an unsearchable "Add-On Marketplace" sub-tab that no user ever visits.

---

## Validation Criteria

- [ ] **Expansion MRR Growth:** Measure the percentage increase in self-serve expansion revenue from existing accounts month-over-month. Target: **+15% to +35% lift**.
- [ ] **Seat Addition Conversion Rate (SACR):** Track `(Completed seat additions / Total seat addition modal views) * 100`. Target: **>50% for admins**.
- [ ] **Invitee Activation Rate:** Percentage of sent team invites that complete account activation and complete a product action within 7 days. Target: **>75%**.
- [ ] **Non-Admin Request-to-Approval Rate:** Percentage of non-admin seat requests approved by admins within 48 hours. Target: **>60%**.
- [ ] **Add-On Attach Rate:** Percentage of active accounts that adopt at least one modular paid add-on. Target: **+20% relative lift**.
- [ ] **Billing Support Ticket Reduction:** Monitor support tickets related to "seat billing confusion" or "proration questions." Target: **>40% reduction**.
