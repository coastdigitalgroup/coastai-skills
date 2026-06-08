---
name: interactive-demo-optimization
description:
  Audit and optimize self-paced, interactive product demos to increase
  lead quality, activation intent, and conversion rates by reducing the
  "time-to-value" in the pre-signup discovery phase.
---

# Interactive Demo Optimization

## Purpose

The Interactive Demo Optimization skill provides a systematic framework for
designing and refining self-guided product tours (e.g., Navattic, Walnut, Arcade).
Unlike videos or static screenshots, interactive demos allow prospects to
experience the product's "Aha! Moment" without the friction of a signup or a
live sales call. This skill aims to maximize "Demo-to-Lead" conversion by
optimizing the tour's narrative flow, pacing, and calls to action.

## Use Cases

- **PLG (Product-Led Growth) SaaS:** Replacing "Book a Demo" buttons with
  "Take a Tour" to capture early-stage interest.
- **Complex Software:** Explaining high-value features that are hard to
  understand via text or static images.
- **Sales Enablement:** Providing a consistent, high-quality product walkthrough
  for cold outbound prospects.
- **Feature Launches:** Letting existing users "try" a new feature before
  fully committing to the setup.

## When NOT to Use

- **Simple/Commoditized Tools:** If the value is immediately obvious (e.g., a
  basic notes app), a complex tour might add unnecessary friction.
- **High-Touch Enterprise Sales:** Where the primary goal is a 1-on-1 human
  relationship and technical discovery is sensitive.
- **Mobile-Only Apps:** If the interactive demo platform doesn't support a
  seamless mobile experience (standard screen recordings are better).
- **Post-Signup Onboarding:** Use `user-onboarding-optimization` for users who
  have already created an account.

## Inputs

1. **The Core "Aha! Moment":** What is the specific value point that makes a
   prospect want the product?
2. **Persona Pain Points:** What are the top 3 problems the prospect is trying
   to solve?
3. **Current Demo URL/Platform:** Access to the existing tour and its
   analytics (drop-off rates per step).
4. **Primary Conversion Goal:** What should the user do after the tour? (e.g.,
   "Start Free Trial," "Talk to Sales").

## Outputs

1. **Demo Narrative Audit:** Identification of technical jargon, "fluff" steps,
   and narrative gaps.
2. **Optimized Tour Storyboard:** A refined sequence of steps (usually 5-10)
   that leads to a clear value realization.
3. **Tooltip & Copy Refinements:** Action-oriented microcopy for every tour
   bubble.
4. **Conversion Gate Strategy:** Recommendation on when and how to ask for an
   email within the tour.

## Workflow

### 1. Identify the "Critical Path"

Most demos are too long. Cut anything that doesn't lead to the value realization.
- **Outcome First:** Start the tour as close to the "result" as possible.
- **Skip the Setup:** Don't show users how to "Settings > Integrations >
  Configure." Show them the *data* after it's already integrated.

### 2. The Narrative Arc (HOOK-SHOW-CLOSE)

Structure the tour like a short story:
- **The Hook (Step 1):** Validate the user's problem and promise a solution.
- **The Meat (Steps 2-6):** Interactive steps where the user "clicks" to see
  value. Focus on 2-3 key features only.
- **The Close (Final Step):** A clear, high-contrast CTA that aligns with the
  value they just saw.

### 3. Optimize Microcopy (Action-Driven)

Audit every tooltip and guide bubble.
- **Before:** "This is the dashboard where you see your stats."
- **After:** "See your ROI in real-time with this customizable dashboard."
- **Directive:** Tell the user exactly where to click next (e.g., "Click
  'Generate' to see the magic").

### 4. Strategic "Gating" (The Lead Exchange)

Decide where to capture the lead.
- **Ungated:** Highest engagement. Best for brand awareness.
- **End-Gated:** Best for high-intent leads. Capture email to "Get the full
  feature list" or "Start your own project."
- **Mid-Gated:** Risky. Only use if the value provided in the first 3 steps is
  undeniable.

### 5. Performance Tuning (Speed & Accessibility)

- **Loading States:** Ensure the demo loads in under 2 seconds.
- **Mobile Fallback:** If the interactive demo is too complex for mobile,
  provide a simplified video or "Email me the tour" link.

## Decision Rules

- **The "Step 10" Rule:** If a tour takes more than 10 clicks to reach a "value
  state," it must be split or shortened.
- **Active > Passive:** Every step should require a user action (click/type)
  rather than just "Next." This builds "Investment."
- **The "Contextual Gate":** Never ask for an email *before* the user has seen
  a single screen of the product.
- **Single Threaded:** One tour = One persona = One problem solved. Don't try
  to show "everything for everyone" in one go.

## Constraints

- **Platform Limitations:** The optimization is limited by the capabilities of the demo platform (e.g., custom CSS, gating options, branching logic).
- **Data Privacy:** Any "dummy data" shown in the demo must be realistic but
  entirely fabricated; never use real customer data.
- **Mobile Compatibility:** Demos must be tested across devices; complex
  desktop UI simulations often fail on small touchscreens.

## Non-Goals

- Producing the original product screenshots or screen recordings.
- Technical implementation of the demo within the website (e.g., iFrame
  embed or script placement).
- Designing the landing page that hosts the demo.

## Common Failure Patterns

- **The "Grand Tour":** Trying to show every feature in the product, leading
  to 20+ steps and a 90% drop-off rate.
- **Tool-Oriented Copy:** Explaining *what* a button does rather than *why* it
  matters to the user.
- **Dead Ends:** Reaching the end of the tour without a clear "What's Next?"
  button.
- **Poor "Start" State:** Launching the tour with a massive modal that covers
  the product, scaring users away.

## Validation Methods

- **Demo Completion Rate:** (Users who reach the final CTA / Users who
  start). Target: >40%.
- **Demo-to-Lead Conversion:** Percentage of tour users who click the final
  CTA and sign up/book.
- **Engagement Depth:** Average number of steps completed.
- **Qualitative Feedback:** User tests where participants are asked, "After
  this tour, do you understand what this product does?"
