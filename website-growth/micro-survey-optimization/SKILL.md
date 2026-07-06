---
name: micro-survey-optimization
description:
  Identify user intent and conversion blockers using on-site feedback tools
  (e.g., exit polls, NPS), focusing on timing, targeting, and phrasing to boost
  response rates and gather qualitative insights.
---

# Micro-Survey Optimization

## Purpose

The Micro-Survey Optimization skill provides a framework for gathering
qualitative insights at scale without disrupting the user experience. While
analytics tell you *what* users are doing, micro-surveys (also known as on-site
polls or nudges) tell you *why* they are doing it. By optimizing the timing,
targeting, and phrasing of these interactions, this skill directly improves the
quality of user feedback and provides the "missing link" for high-impact A/B
testing.

## Use Cases

- **High-Exit Pages:** Identifying the specific reason for drop-offs on pricing
  or checkout pages.
- **Low-Conversion Content:** Understanding why users are reading but not
  clicking on informational articles.
- **Product Discovery:** Validating if a new feature or product idea aligns
  with user needs before building it.
- **Persona Identification:** Segmenting anonymous traffic by asking about
  their role or goal.
- **Uncovering Objections:** Asking "What's the one thing that nearly stopped
  you from buying today?"

## When NOT to Use

- **High-Momentum Transactions:** Avoid interrupting users in the middle of a
  successful checkout or account creation flow.
- **Post-Purchase (Immediate):** Wait until the "Thank You" page or use email
  for post-purchase feedback to avoid cluttering the final transaction step.
- **Brand-Sensitive Minimalist Sites:** Where any popup or widget is
  strictly prohibited for aesthetic reasons.
- **Poorly Tracked Sites:** If you don't have basic event tracking, you won't
  be able to target the survey effectively.

## Inputs

1. **Analytical "Leak" Points:** Identification of pages with high traffic and
   unexplained high bounce or exit rates.
2. **Key Hypothesis:** What is the specific question we are trying to answer?
   (e.g., "Is the price too high?" or "Is the shipping too slow?").
3. **Target Audience Segments:** Definition of who should see the survey (e.g.,
   "Returning visitors on mobile").
4. **Tool Capability:** Knowledge of the feedback tool's features (e.g., branching
   logic, exit-intent triggers, device targeting).

## Outputs

1. **Contextual Survey Strategy:** A plan for where, when, and to whom the
   survey will be shown.
2. **Optimized Question Set:** A set of questions designed for high completion
   rates (starting with micro-choices).
3. **Logic Flow:** Branching diagrams for surveys with more than one step.
4. **Actionable Insight Report:** A framework for translating survey responses
   into A/B test hypotheses.

## Workflow

### 1. Identify the "Insight Gap"

Analyze quantitative data to find where the "What" is known but the "Why" is
missing. Focus on pages with high intent but high drop-off.

### 2. Match Question to Intent

Select a question that fits the user's current context:
- **Price Page:** Ask about value, clarity, or comparison.
- **Blog Post:** Ask about content relevance or "What should we write next?"
- **Checkout:** Ask about trust or technical friction.

### 3. Design the "Micro-Hook"

Avoid open-ended questions as the first step.
- **The Choice Hook:** Provide 3-5 pre-defined answers based on known or
  suspected pain points.
- **The "Other" Escape Hatch:** Always include an "Other" option with a text
  box to capture unexpected insights.
- **Specificity Rule:** Use "What's the #1 thing stopping you from signing up?"
  instead of "Do you have any feedback?"

### 4. Optimize Timing and Triggering

Don't show the survey too early.
- **Exit Intent:** Trigger when the user moves to close the tab.
- **Behavioral:** Trigger after 30-60 seconds on page or 50% scroll depth.
- **Frequency Capping:** Ensure the user only sees one survey every 30 days.

### 5. Analyze and Iterate

Turn qualitative data into quantitative hypotheses.
- **Theme Analysis:** Group "Other" responses into new categories.
- **Hypothesis Generation:** If 40% say "Too expensive," create an A/B test for
  pricing or value-stacking.

## Decision Rules

- **Context Over Convenience:** The survey question must relate directly to the
  content of the page.
- **The 3-Second Rule:** A user should be able to read and respond to the first
  step in under 3 seconds.
- **Value Before Data:** Never ask for an email as the first step.
- **Progress Bias:** Use a progress bar or step counter if the survey is more than
  2 steps to leverage the Zeigarnik effect.
- **Mobile First:** Ensure the widget doesn't block the primary page CTA on
  mobile viewports.

## Constraints

- **Platform Dependencies:** Implementation is limited by the capabilities of the chosen feedback tool (e.g., Hotjar, Qualaroo, Sprig).
- **Qualitative Minimums:** At least 50-100 responses are usually required to identify a statistically significant pattern for a new hypothesis.
- **Privacy Compliance:** Survey data collection must comply with GDPR/CCPA regulations, especially when collecting email addresses.

## Non-Goals

- Long-form annual customer satisfaction surveys.
- Technical implementation of the survey widget or custom CSS.
- NPS (Net Promoter Score) benchmarking without follow-up "Why" questions.

## Common Failure Patterns

- **The Vague Greeting:** Using "Hi! Do you have a second?" (Users say no).
- **Premature Triggering:** Showing a survey 2 seconds after page load.
- **Open-Ended First:** Starting with a blank text box (High friction).
- **The Data Graveyard:** Collecting feedback but never reviewing it or turning
  it into experiments.
- **Clutter Wall:** Overlapping the survey with chat widgets or other popups.

## Validation Methods

- [ ] **Response Rate (RR):** Target 3-5% for contextual micro-surveys.
- [ ] **Completion Rate:** Target >80% for 2-step surveys.
- [ ] **Insight-to-Experiment Ratio:** The number of valid A/B test hypotheses
  generated per 100 responses.
- [ ] **CVR Lift:** Measure the success of the resulting A/B test derived from
  the survey data.
