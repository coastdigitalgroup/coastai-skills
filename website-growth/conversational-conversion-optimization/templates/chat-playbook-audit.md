# Conversational Playbook Audit & Design Template

Use this template to audit your existing chat implementation or to design a new conversational growth playbook.

## 1. High-Intent Page Inventory
Identify the top 3-5 pages where a conversation would provide the most value.

| Page Name | High-Intent Action | Primary User Question/FUD |
| :--- | :--- | :--- |
| e.g., Pricing | Choose a plan | "Which plan fits my team size?" |
| | | |
| | | |

## 2. Trigger Logic Audit
Evaluate *when* and *how* the chat widget appears.

- [ ] **Delay:** Does the widget appear too fast (< 3s)? *Recommendation: Wait for 5-10s or 30% scroll.*
- [ ] **Sound:** Does it use an intrusive "Ping"? *Recommendation: Use a subtle visual cue instead.*
- [ ] **Relevance:** Is the same message shown on every page? *Recommendation: Map hooks to page content.*
- [ ] **Mobile:** Does the expanded window cover the primary page CTA? *Recommendation: Ensure "Dismiss" is easy to tap.*

## 3. The "Hook" Design Worksheet
Draft page-specific opening messages.

**Page:** `____________________`
**Visitor Segment:** `(e.g., First-time visitor from Google Ads)`
**The Hook Copy:**
> *"____________________________________________________________________"*

**Clickable Option 1 (Low Friction):** `[ e.g., Just looking ]`
**Clickable Option 2 (High Intent):** `[ e.g., Book a Demo ]`
**Clickable Option 3 (Value Exchange):** `[ e.g., See ROI Guide ]`

## 4. Conversation Branching Framework
Map the logic for your automated playbook.

1.  **Opening:** (The Hook)
2.  **The Filter (Step 1):** Ask a question that categorizes the user (e.g., "Are you looking for personal or business use?").
3.  **The Value Exchange (Step 2):** Provide a quick tip or resource based on their answer.
4.  **The Capture (Step 3):** Ask for an email or offer a meeting link.
5.  **The Routing (Step 4):**
    -   *If [Criteria A]:* Alert Live Sales.
    -   *If [Criteria B]:* Send to Knowledge Base.
    -   *If [Criteria C]:* End with "We'll follow up via email."

## 5. Success Metrics Tracker
Define how you will measure this specific playbook.

- **Baseline Engagement:** `____%`
- **Target Engagement:** `____%`
- **Primary Goal:** `(e.g., Demo Booked)`
- **Goal Rate:** `____%`

## 6. Common Red Flags Checklist
- [ ] Is there an "Escape Hatch" to talk to a human?
- [ ] Are we asking for an email before the user has said more than one thing? (Avoid this).
- [ ] Does the bot sound too robotic? (Use friendly, professional, but clearly "bot" tone).
- [ ] Is the response time for live agents documented and achievable?
