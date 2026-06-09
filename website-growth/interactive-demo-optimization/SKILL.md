---
name: interactive-demo-optimization
description:
  Audit and optimize self-guided product tours to maximize lead conversion and
  accelerate the "Aha! Moment" for prospects. Trigger this skill when
  interactive demos have high drop-off rates or fail to drive demo-to-lead
  conversions.
---

# Interactive Demo Optimization

## Purpose

The Interactive Demo Optimization skill provides a systematic framework for
designing and refining self-guided product tours (e.g., Navattic, Walnut,
Arcade). It aims to maximize "Demo-to-Lead" conversion by transforming passive
product tours into active, value-driven experiences. By applying psychological
triggers like the Endowment Effect and the Zeigarnik Effect, this skill helps
prospects feel the value of the product before they even sign up.

## Use Cases

- **B2B SaaS:** Shortening the sales cycle by letting prospects "self-serve" a
  product walkthrough.
- **Product-Led Growth (PLG):** Bridging the gap between landing page copy and
  a full free trial.
- **Complex Enterprise Software:** Simplifying complex value propositions into
  digestible, 2-minute interactive "highlights."
- **Sales Enablement:** Providing sales teams with optimized, consistent demo
  links for follow-up or outbound outreach.

## When NOT to Use

- **Simple/Commodity Products:** If the product's value is immediately obvious
  from a single screenshot (e.g., a basic weather app).
- **Extremely High-Touch Sales:** Where the competitive advantage is purely
  relationship-based and showing the UI too early might be counter-productive.
- **Early Alpha/MVP:** If the UI is changing daily, maintaining an interactive
  demo becomes a significant technical debt.
- **Mobile-Only Products:** Most interactive demo platforms are optimized for
  desktop; if your traffic is 90% mobile, focus on video or high-quality GIFs.

## Inputs

1. **Top 3 High-Value Workflows:** The specific tasks that make users say
   "Wow!" during a live sales call.
2. **Current Demo Analytics:** Completion rates, average time spent, and
   "Lead Capture" conversion rates.
3. **Buyer Personas:** Who is clicking the "Take a Tour" button? (e.g.,
   Technical Evaluator vs. Economic Buyer).
4. **Primary Objections:** The most common questions that arise during live
   demos.

## Outputs

1. **Demo Flow Map:** A storyboard of the optimized tour sequence, focusing
   on value rather than every single button.
2. **Interactive Tour Specification:** Detailed guidance on tooltips, modals,
   and "hotspots" within the demo.
3. **Optimized Lead Capture Logic:** Strategy for when and how to ask for
   an email without killing the momentum.
4. **Friction Audit:** Identification of "dead-end" steps or technical hurdles
   in the existing demo.

## Workflow

### 1. The "Hook" Design (The first 10 seconds)
Prospects have zero patience for an interactive demo.
- **Start with the End:** Begin the demo on a high-value screen (e.g., a
  finished dashboard or a completed report), not a "Settings" page or a blank
  state.
- **The First Click:** Make the first interaction incredibly simple and
  immediately rewarding.

### 2. The Narrative Path (The Middle)
Avoid the "feature dump." Instead, follow a "Story-First" approach:
- **Problem-Action-Resolution:** Every tooltip should address a specific pain
  point. (e.g., "Tired of manual data entry? Click here to import automatically.")
- **The "Goldilocks" Length:** Aim for 8-12 steps. Fewer than 5 feels
  insubstantial; more than 15 feels like work.
- **Branching:** If serving multiple personas, offer a "Choose your own
  adventure" at step 2.

### 3. Psychological Layering
- **Endowment Effect:** Use "Your" and "You" in the copy to make the user feel
  ownership of the data they are seeing.
- **Labor Illusion:** Briefly explain what the product is doing in the
  background (e.g., "Analyzing 10,000 data points...") to increase perceived
  value.
- **Progress Indicators:** Use a visible progress bar to leverage the
  Zeigarnik Effect (the drive to finish an incomplete task).

### 4. Lead Capture Optimization
- **The "Value Exchange" Gate:** Never gate the *start* of a demo. Gate it
  approximately 60-70% through the tour or at the "Grand Finale" screen.
- **Soft Gates:** Offer a "Skip for now" option to maintain momentum, or
  use "Save these results" as the call to action for the email field.

### 5. Review Against Decision Rules
Verify the proposed demo against the growth heuristics below.

## Decision Rules

- **The "Show, Don't Tell" Rule:** If you can show a feature working in 3
  clicks, don't use a 2-paragraph modal to explain it.
- **No Dead Ends:** Every tour must end with a primary CTA (Book a Demo, Start
  Trial) or a secondary CTA (Download Whitepaper).
- **Contextual Copy:** Tooltips should explain *why* a user should click, not
  just *what* they are clicking on.
- **Friction over Fidelity:** It is better to have a slightly simplified UI
  that is easy to navigate than a 1:1 replica of the app that is slow to load.

## Constraints

- **Platform Limitations:** Tour logic must be achievable within the constraints of the chosen interactive demo platform (e.g., Navattic, Arcade, Walnut).
- **Data Privacy:** Any data shown in the demo must be synthetic or anonymized; never use real customer data in an interactive tour.
- **Browser Compatibility:** Demos must be tested for smooth performance across Chrome, Safari, and Firefox.

## Non-Goals

- Building the underlying demo capture technology or hosting platform.
- Full product documentation or "How-to" guides (onboarding is separate).
- High-fidelity video production or professional voiceover.

## Common Failure Patterns

- **The "Manual" Tour:** Forcing users to click "Next" on 20 modals that
  simply describe features without any interactive benefit.
- **The Blank State:** Starting the demo with an empty dashboard that requires
  setup work.
- **Infinite Loops:** Complex branching that makes it impossible for the
  user to find the "Resolution" screen.
- **Technical Lag:** Using high-resolution unoptimized assets that make
  the tour feel sluggish or broken.
- **Gating the Start:** Asking for an email before the user has seen a
  single pixel of the product value.

## Validation Methods

- **Demo-to-Lead Conversion Rate:** (Leads Generated from Demo / Total Demo
  Starts). Target: >5% for ungated, >15% for mid-gated.
- **Completion Rate:** (Users who reach the last screen / Total Demo Starts).
  Target: >60%.
- **Time-to-Lead:** Measuring the duration of the demo session before a lead
  form is submitted.
- **Qualitative "Aha!" Feedback:** User testing where participants are
  asked: "At what point did you understand how this solves [Problem]?"
