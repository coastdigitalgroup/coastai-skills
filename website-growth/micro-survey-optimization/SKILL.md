---
name: micro-survey-optimization
description:
  Audit and optimize on-site micro-surveys (exit polls, NPS, intent surveys) to
  capture qualitative insights and identify conversion blockers without
  degrading the user experience.
---

# Micro-Survey Optimization

## Purpose

The Micro-Survey Optimization skill provides a framework for gathering "Voice of Customer" (VoC) data at scale. While analytics tell you *what* is happening, micro-surveys tell you *why*. By using targeted, low-friction questions at critical moments in the user journey, this skill identifies specific conversion blockers, validates user intent, and provides the qualitative data needed to prioritize high-impact website changes.

## Use Cases

- **High-Exit Pages:** Identifying why users are leaving a specific stage of the funnel (e.g., "What's the one thing that nearly stopped you from signing up?").
- **Pricing Clarity:** Gauging if users understand the value or find the pricing structure confusing.
- **Post-Purchase/Signup:** Understanding the "Aha!" moment or the primary driver behind a successful conversion.
- **Feature Validation:** Asking users on a specific product page if they find a certain feature relevant to their needs.
- **Content Gaps:** Asking readers if a blog post or guide answered their questions.

## When NOT to Use

- **High-Momentum Actions:** Never interrupt a user who is in the middle of a high-value task (e.g., entering credit card details or completing a multi-step checkout).
- **Redundant Data Collection:** Don't ask for information you already have in your CRM or analytics (e.g., "What industry are you in?" if they are logged in and you know the answer).
- **Low-Traffic Pages:** Qualitative data requires a minimum sample size to be actionable; on very low-traffic pages, the results may be statistically insignificant or take too long to collect.
- **Privacy-Sensitive Flows:** Avoid surveys on pages where users expect absolute privacy or are handling sensitive information.

## Inputs

1. **Analytics "Leakage" Points:** Heatmaps and exit rate data showing where users are dropping off.
2. **Current Conversion Hypotheses:** Internal assumptions about why users aren't converting.
3. **Survey Tool Capabilities:** Access to tools like Hotjar, Qualaroo, Survicate, or HubSpot for triggering and targeting.
4. **Target Audience Segments:** Definition of who should see the survey (e.g., "New visitors only," "Users who have spent >30 seconds on the page").

## Outputs

1. **Micro-Survey Strategy:** A plan defining the "Where," "When," "Who," and "What" for each survey.
2. **Optimized Question Set:** Phrasing designed to maximize response rates and minimize bias.
3. **Insights Report:** Analysis of survey results categorized into themes (e.g., "Price Objection," "Lack of Trust," "Technical Issue").
4. **Actionable Fix List:** A prioritized list of website changes based on the qualitative feedback received.

## Workflow

### 1. Identify the "Insight Gap"

Map your analytics to your questions.
- **Problem:** High bounce on the "Features" page. -> **Question:** "Does this page have the information you were looking for?"
- **Problem:** Low trial-to-paid conversion. -> **Question:** "What's the main reason you haven't upgraded yet?"

### 2. Design the "Micro-Interaction"

The survey must be as low-friction as possible.
- **The "Rule of One":** One question at a time. Never show a multi-page survey as a pop-up.
- **Low-Friction Start:** Use multiple-choice or "Yes/No" for the first interaction.
- **Optional Depth:** Follow a multiple-choice question with an optional open-ended text box ("Tell us more...").

### 3. Set Contextual Triggers

Trigger the survey based on behavioral signals, not just time.
- **Exit Intent:** Trigger when the mouse moves toward the browser bar (Desktop only).
- **Scroll Depth:** Trigger after the user has scrolled 50-75% of the page (indicating engagement).
- **Inactivity:** Trigger after 30-60 seconds of no interaction on a high-intent page.

### 4. Categorize & Quantify Responses

Turn qualitative "Voice of Customer" into quantitative data.
- **Theme Tagging:** Group open-ended responses into categories (e.g., "Navigation," "Pricing," "Missing Feature").
- **Impact vs. Frequency:** Prioritize fixes for issues that are mentioned most often AND by your highest-value personas.

### 5. Validate and Iterate

- Use the survey insights to run an A/B test.
- If the survey results suggest "Price is too high," test a discount or a more clear value-proposition.

## Decision Rules

- **The "Invisibility" Rule:** If a user closes the survey, do not show it to them again for at least 30 days.
- **Value Before Question:** On informational pages, ask the question *after* the user has had time to consume the content.
- **Specificity > Generalities:** Ask "Was this pricing clear?" instead of "How is your experience?"
- **Mobile First:** Ensure the survey widget does not cover the primary CTA or take up more than 30% of the mobile screen.

## Common Failure Patterns

- **The "Interruption" Survey:** Showing a pop-up 1 second after page load, before the user even knows where they are.
- **Analysis Paralysis:** Asking 5+ questions in a pop-up, leading to a <1% completion rate.
- **Leading Questions:** Phrasing questions to get the answer you want (e.g., "How much do you love our new design?") rather than honest feedback.
- **The "Dead End" Feedback:** Collecting insights but never acting on them or closing the loop with the product team.
- **Bad Mobile UX:** Widgets that are impossible to close on mobile or block the "Add to Cart" button.

## Validation Methods

- [ ] **Response Rate (RR):** (Surveys Completed / Surveys Shown) * 100. Target: 3-5% for generic surveys, 10%+ for highly targeted ones.
- [ ] **Insights-to-Action Ratio:** The number of website changes implemented as a direct result of survey feedback.
- [ ] **Conversion Lift (Post-Fix):** Measuring the increase in CVR after implementing a fix suggested by survey data.
- [ ] **Bounce Rate Reduction:** Measure if addressing a "Missing Information" complaint reduces the bounce rate on that page.
