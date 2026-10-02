# Behavioral Heuristics & Psychology for Free Trial Onboarding

This reference guide details key behavioral economics principles, UX heuristics, and cognitive mechanics that govern user activation in self-serve SaaS products.

---

## 1. Time-To-First-Value (TTFV) & Cognitive Load Theory

### The First-Session Window of Attention

When a user signs up for a free trial, their initial motivation is at its peak. However, motivation decays rapidly within **3 to 7 minutes** if they encounter friction or failure.

```text
Motivation
  ▲
  │   [Signup]
  │      \   (Peak Motivation)
  │       \
  │        \  <--- Critical 3-5 Minute Window (TTFV Target)
  │         \
  │          \_________ (Decay Curve / Abandonment Threshold)
  │
  └────────────────────────────────────────────────────────► Time (Minutes)
```

- **Intrinsic vs. Extrinsic Cognitive Load:**
  - *Intrinsic Load:* Effort required to process the actual value of the software.
  - *Extrinsic Load:* Unnecessary friction imposed by bad UX (mandatory password confirmation, email verification walls, navigating complex menus).
- **Goal:** Minimize extrinsic load to zero during the first session so 100% of the user's cognitive budget is spent experiencing product value.

---

## 2. Psychological Principles in Activation Design

### A. The Zeigarnik Effect & Goal Gradient Effect

- **The Zeigarnik Effect:** Uncompleted tasks create cognitive tension in human memory. People are psychological driven to finish tasks they have already started.
- **The Goal Gradient Effect:** As humans approach the completion of a goal, their effort and speed increase.
- **Application in Onboarding Checklists:**
  - By presenting a setup checklist that is already **25% or 50% complete** on first load (e.g., `[x] Account Created`), the user feels they have already made progress rather than starting from scratch.

### B. Choice Overload & Hicks-Hyman Law

- **Hicks-Hyman Law:** The time it takes to make a decision increases logarithmically with the number and complexity of choices.
- **Application in First-Run UX:**
  - Landing a user on a blank dashboard with 20 navigation icons triggers decision paralysis.
  - Using a **2-question persona selector** allows the system to make decisions *for* the user, routing them directly to 1 relevant template or workspace view.

### C. Default Effect & Endowed Progress

- **Endowed Progress:** Giving users artificial advancement toward a goal increases effort toward reaching that goal.
- **Application in Sample Data:**
  - Pre-populating a workspace with realistic sample data gives the user an "endowed" starting state. They are far more likely to edit or replace existing sample data than to create new data structures on a blank canvas.

---

## 3. Product Tour Anti-Patterns vs. Contextual Guidance

| Experience Dimension | Auto-Playing Modal Product Tours (Bad) | Contextual Interactive Guidance (Good) |
| :--- | :--- | :--- |
| **User Control** | Passive / Forced (System-driven) | Active / Self-Paced (User-driven) |
| **Cognitive Timing** | Front-loaded before task context | Just-In-Time (JIT) at point of interaction |
| **Skip / Dismiss Rate** | 80% to 90% instant skip rate | <15% dismissal rate |
| **Information Retention** | Near 0% (Users click "Next" rapidly) | High (Action-oriented muscle memory) |
| **UI Format** | Screen-dimming modal popups | Subtle pulsing highlights & inline tooltips |

---

## 4. Behavioral Email & Nudge Timing Matrix

Do not send calendar-based email blasts. Trigger communications based on **real-time user state transitions**:

```text
[User Signs Up]
       │
       ├──► (Condition A: Core Value Milestone Reached in Session 1)
       │          └─► Trigger: Milestone Congratulation + Team Invite Prompt
       │
       └──► (Condition B: Inactive for 24 Hours / Checklist Incomplete)
                  └─► Trigger: "Need a hand?" 45-Second Video Tutorial
```

1. **State: Signed Up, No Value Experienced (24h Inactive):**
   - *Message Focus:* Low-friction video walkthrough or 1-click template link. Eliminate the specific bottleneck blocking them.
2. **State: Core Value Experienced, Single User:**
   - *Message Focus:* Viral collaboration / Team invite prompt (*"Invite 1 teammate to review this report"*).
3. **State: High Engagement, 3 Days Before Trial Expiration:**
   - *Message Focus:* Value summary report (*"During your trial, you saved 12 hours and generated 4 reports. Upgrade now to keep seamless access"*).
