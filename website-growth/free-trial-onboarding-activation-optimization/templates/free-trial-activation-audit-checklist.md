# Free Trial Onboarding & Activation Audit Checklist

Use this checklist to audit, score, and optimize self-serve free trial onboarding flows, first-run user experiences, setup checklists, and Time-To-First-Value (TTFV) pathways.

---

## 1. Signup & Initial Authentication Friction Audit

- [ ] **Email Verification Deferral:** Is the user allowed to enter the product dashboard immediately after creating a password, without being blocked by a "Check your email" mandatory verification wall?
- [ ] **Single-Sign-On (SSO) Availability:** Are 1-click Google, Microsoft, or GitHub OAuth login options provided on the trial registration form?
- [ ] **Frictionless Form Fields:** Is the signup form restricted to $\le 4$ fields (e.g., Name, Work Email, Password, Company Name)?
- [ ] **Role & Persona Segmentation:** Does the first-run experience include a 1 or 2-question persona selector ("What is your role?", "What do you want to accomplish today?") to tailor the UI?
- [ ] **Password Requirements Visibility:** Are password strength rules displayed inline before form submission to prevent validation errors?

---

## 2. Time-To-First-Value (TTFV) & First-Run Experience

- [ ] **Defined "Aha!" Moment:** Is there a single, clearly documented core value milestone that defines user activation?
- [ ] **TTFV Duration Benchmark:** Can a new trial user reach the core value milestone in **under 5 minutes** from account creation?
- [ ] **Elimination of Intrusive Modal Tours:** Are auto-playing 10-step modal walkthroughs ("Click next") removed or replaced with interactive, user-triggered tooltips?
- [ ] **Contextual First Tooltip:** Is the user greeted with a single, clear primary CTA or highlighted action on screen 1?
- [ ] **Deferral of Secondary Tasks:** Are non-essential administrative tasks (e.g., uploading profile avatars, setting up custom domain DNS, entering credit card details) deferred until *after* core value is experienced?

---

## 3. Empty States & Sample Data Integration

- [ ] **No Blank Canvases:** Does the product load pre-populated, realistic sample/dummy data by default for users without active integrations or data?
- [ ] **Clear Sample Data Labeling:** Is sample data clearly identified with an interactive banner (e.g., *"Showing Sample E-Commerce Store Data"*)...
- [ ] **1-Click Live Data Replacement:** ...accompanied by a high-contrast CTA button to replace sample data with live integrations?
- [ ] **Pre-Built Template Library:** If sample data is not applicable, are 1-click starter templates provided on the main workspace screen?
- [ ] **1-Click Clean Slate:** Can users clear or delete sample data instantly without technical support?

---

## 4. Progressive Setup Checklist & Goal Gradient Design

- [ ] **Persistent Checklist Widget:** Is a collapsible setup checklist widget visible on the main product interface?
- [ ] **Zeigarnik Pre-Completion:** Is Step 1 of the checklist pre-checked by default upon account creation (e.g., `[x] Account Created`)?
- [ ] **Micro-Step Limit:** Is the checklist strictly limited to **3 to 5 core activation steps**?
- [ ] **Visual Progress Bar:** Does the checklist feature an explicit percentage or fraction progress bar (e.g., `2 of 4 Steps Complete (50%)`)?
- [ ] **Incentivized Completion:** Is there an explicit reward or milestone celebration (e.g., +3 bonus trial days, unlocked template, or badge) upon completing all steps?

---

## 5. In-App Nudges, Telemetry & Behavioral Email Rules

- [ ] **Event-Based Telemetry Tracking:** Are key activation events (e.g., `first_project_created`, `integration_connected`, `team_invited`) tracked in real time?
- [ ] **24-Hour Inactivity Email:** Is an automated behavioral email sent to users who have NOT completed Step 2 within 24 hours of registration, offering a specific 60-second tutorial?
- [ ] **Milestone Reinforcement Email:** Is a congratulatory email sent immediately when the user achieves the core value milestone?
- [ ] **Trial Expiration Bar:** Is a non-intrusive sticky header displayed showing remaining trial days and a quick upgrade link?
- [ ] **Value Summary on Expiration:** Does the trial expiration screen display a personalized summary of value generated during the trial (e.g., *"You created 8 reports and tracked 1,200 events"* )?

---

## Activation Optimization Scorecard

Calculate your readiness score based on the checks above:

| Category | Total Checked | Category Score | Target Score |
| :--- | :--- | :--- | :--- |
| **1. Signup & Auth** | _____ / 5 | _____ % | $\ge 80\%$ |
| **2. TTFV & First Run** | _____ / 5 | _____ % | $\ge 80\%$ |
| **3. Empty States & Data** | _____ / 5 | _____ % | $\ge 80\%$ |
| **4. Setup Checklist** | _____ / 5 | _____ % | $\ge 80\%$ |
| **5. Nudges & Telemetry** | _____ / 5 | _____ % | $\ge 80\%$ |
| **TOTAL OVERALL SCORE** | _____ / 25 | _____ % | **$\ge 84\%$ (21+ items)** |

*Scoring Key:*
- **0–50% (Critical Leakage):** Over 60% of trial signups leave after 1 session. Immediate overhaul required.
- **51–80% (Moderate Friction):** High TTFV slowing trial-to-paid conversions. Implement sample data and checklists.
- **81–100% (High Activation):** Best-in-class PLG activation. Focus on viral expansion and seat invites.
