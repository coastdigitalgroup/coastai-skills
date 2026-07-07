---
name: micro-survey-optimization
description:
  Audit and optimize on-site micro-surveys to identify user intent, uncover
  conversion blockers, and gather qualitative insights with minimal friction.
  Trigger this skill when quantitative data shows "where" users drop off, but
  not "why."
---

# Micro-Survey Optimization

## Purpose

The Micro-Survey Optimization skill provides a systematic framework for
gathering "Voice of Customer" (VoC) data through short, targeted, on-site polls.
While analytics tools show *what* users are doing, micro-surveys explain *why*
they are doing it. By asking the right question at the right time, this skill
uncovers hidden objections, identifies missing information, and provides the
qualitative "missing link" needed to drive high-impact conversion experiments.

## Use Cases

- **Exit-Polls:** Understanding why users are leaving a high-intent page (e.g.,
  Pricing or Checkout) without converting.
- **Intent Discovery:** Identifying what a visitor is looking for on the
  homepage to personalize their journey.
- **Content Feedback:** Asking if an article or resource answered the user's
  question.
- **Post-Purchase Surveys:** Identifying "near-misses" (what almost stopped a
  customer from buying) to improve the funnel for others.
- **Feature Prioritization:** Gauging interest in a potential new feature or
  service directly from the target audience.

## When NOT to Use

- **Top-of-Funnel Brand Awareness:** Don't interrupt users who just arrived
  and are still getting their bearings.
- **Critical Interaction Paths:** Avoid showing surveys during the middle of a
  delicate process like entering credit card details or filling out a long form.
- **High-Momentum Flows:** If the user is moving rapidly through a successful
  path, don't break their focus.
- **Redundant Data Collection:** Don't ask for information you already have
  (like an email address if they are logged in).

## Inputs

1. **Analytics "Drop-off" Points:** Knowledge of which pages have the highest
   unexpected exit rates.
2. **Current Hypotheses:** A list of "Why" questions the team is currently
   guessing about (e.g., "Is it the price?").
3. **Survey Tool Capabilities:** Knowledge of trigger options (exit-intent, time
   on page, scroll depth) and question types.
4. **Target Audience Segments:** Who should see the survey? (e.g., "New visitors
   only," "Users with >$100 in cart").

## Outputs

1. **Micro-Survey Roadmap:** A plan for which questions to ask on which pages
   to maximize response rates and insight.
2. **Optimized Question Copy:** Phrasing that reduces bias and encourages
   honest, actionable answers.
3. **Trigger & Targeting Specs:** Logical rules for when and to whom the
   survey should appear.
4. **Insight Analysis Framework:** A method for turning raw text responses into
   prioritized optimization tasks.

## Workflow

### 1. Identify the "Insight Gap"

Look at your funnel data. Where is the drop-off most confusing?
- **Scenario:** 80% of users who reach the Pricing page leave without clicking
  "Start Trial."
- **The Question:** "What's the one thing that's nearly stopping you from
  trying [Product] today?"

### 2. Design the "Low-Friction" Question

The first question must be "one-tap" easy.
- **The Hook:** Use a multiple-choice question to lower cognitive load.
- **The "Other" Option:** Always include an open-ended "Other" or "Something
  else" option to capture unexpected insights.
- **The "One Thing" Rule:** Focus on a single, specific question. If you need
  more, keep it to a maximum of 2–3 total steps.

### 3. Set the Strategic Trigger

Timing is everything.
- **Exit-Intent (Desktop):** Trigger when the cursor moves to close the tab on
  a high-intent page.
- **Time on Page:** Trigger after a user has spent enough time to be "stuck"
  (e.g., 30–60 seconds on a complex feature page).
- **Behavioral Signal:** Trigger after a user has scrolled 75% of a product
  comparison page.

### 4. Categorize and Quantify Results

Turn qualitative text into quantitative data.
- **Bucket Responses:** Group open-ended answers into themes (e.g., "Price too
  high," "Confused by Feature X," "Need Y Integration").
- **Prioritize by Volume:** Focus optimization efforts on the themes that
  appear most frequently.

### 5. Review Against Decision Rules

Ensure the survey doesn't damage the user experience or introduce bias.

## Decision Rules

- **The "Value First" Rule:** Only ask a question if you are prepared to
  change the website based on the answer.
- **Contextual Relevance:** The question must be directly related to the
  content of the page (e.g., don't ask about "Shipping" on a "Careers" page).
- **The "Invisible" Survey:** If a user closes the survey, do not show it again
  to them for at least 30 days.
- **Mobile-Specific Design:** Keep questions extremely short and buttons large.
  Never use surveys that block the primary CTA on mobile.
- **Actionable Phrasing:** Avoid "Do you like this page?" (Binary/Vague). Use
  "What is one thing we could add to make this page more helpful?" (Constructive).

## Constraints

- **Compliance:** Surveys must comply with GDPR/CCPA, particularly if any
  personally identifiable information (PII) is captured.
- **Platform Limitations:** Survey logic is limited by the tools available
  (e.g., Hotjar, Qualaroo, HubSpot, Typeform).
- **Survey Fatigue:** Showing too many surveys across a site will lead to
  declining response rates and increased user frustration.

## Non-Goals

- Collecting general brand sentiment or NPS (Net Promoter Score) for executive
  reporting.
- Customer support ticket resolution.
- Market research for products that don't exist yet.

## Common Failure Patterns

- **The "Wall of Text":** Using long, complex paragraphs in a small popup
  window.
- **Bad Timing:** Triggering the survey the second a user lands on the page
  (interrupting their "entry" phase).
- **Biased Questions:** Leading the user toward a specific answer (e.g., "How
  much do you love our new design?").
- **Ignoring the Data:** Collecting thousands of responses but never actually
  implementing changes based on the findings.
- **The "Dead End":** Not thanking the user or providing a "next step" after
  the survey is completed.

## Validation Criteria

- [ ] **Response Rate:** (Survey Completions / Survey Impressions) * 100.
  Target: 1–3% for exit-intent, 3–5% for targeted on-page polls.
- [ ] **Actionable Insight Rate:** Percentage of responses that lead to a specific
  hypothesis for an A/B test.
- [ ] **Conversion Lift (Post-Fix):** The ultimate validation—measure the CVR
  increase on the target page after implementing a fix based on survey data.
- [ ] **Bounce Rate Impact:** Ensure that the survey itself isn't significantly
  increasing the page's bounce rate.
