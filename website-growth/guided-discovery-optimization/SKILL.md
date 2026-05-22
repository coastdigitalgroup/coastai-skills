---
name: guided-discovery-optimization
description:
  Audit and optimize interactive discovery experiences (quizzes, product
  finders, and recommendation engines) to reduce choice paralysis and increase
  conversion by guiding users to the ideal product or solution.
---

# Guided Discovery Optimization

## Purpose

The Guided Discovery Optimization skill provides a systematic framework for
designing and refining interactive experiences—such as product finders,
recommendation quizzes, and solution builders. It aims to solve "Choice
Paralysis" by replacing a complex manual search/filter process with a
structured, conversational sequence that matches user needs to the right
outcome. This skill directly improves conversion rates, average order value
(AOV), and lead quality by reducing cognitive load and building user
confidence.

## Use Cases

- **Complex E-commerce Catalogs:** Sites with 50+ items where technical specs
  or subtle differences make manual selection difficult (e.g., skincare,
  electronics, supplements).
- **Multi-Persona SaaS:** Products that serve very different use cases or
  industries and need to route users to the right plan or feature set.
- **Gift Guides:** Helping users find products for *others* based on
  attributes they may not fully understand.
- **High-Consideration Purchases:** Services or products with a long decision
  cycle where "starting small" with a quiz builds initial engagement.

## When NOT to Use

- **Small Catalogs:** If you have fewer than 10-15 products, a well-optimized
  `product-listing-page-optimization` is more efficient.
- **Commoditized Goods:** Simple products where the choice is purely based on
  price or visual preference (e.g., plain t-shirts).
- **Repeat/Replenishment Purchases:** Users who already know exactly what they
  want should not be forced through a discovery flow.
- **Internal Tools:** Where speed and direct access are prioritized over
  persuasion and guidance.

## Inputs

1. **Product/Solution Matrix:** A mapping of all possible outcomes to the
   attributes that define them (e.g., "Skin Type: Dry" -> "Product: Hydrating
   Cream").
2. **User Pain Points/Goals:** The top 3-5 questions users ask before buying.
3. **Current Discovery Data:** Analytics on existing search patterns, filter
   usage, and bounce rates on category pages.
4. **Persona Definitions:** Clear understanding of the different segments
   entering the site.

## Outputs

1. **Discovery Flow Map:** A logical branching diagram of the quiz or finder
   logic.
2. **Optimized Question Set:** Refined questions and answers that use
   benefit-driven language rather than technical jargon.
3. **Recommendation Page Specification:** Guidelines for the "Results" page to
   ensure it closes the sale.
4. **Friction Audit:** Identification of drop-off points in the current
   interactive flow.

## Workflow

### 1. Outcome Mapping (Backwards Design)

Start with the results, not the questions.
- List all final recommendations.
- Define the "Winning Attributes" for each (Why would someone pick this over
  that?).
- Ensure every outcome is actually attainable through the logic.

### 2. The Conversational Architecture

Design the question sequence:
- **The Hook:** The first question must be incredibly easy and high-intent (e.g.,
  "What is your primary goal?").
- **The Filter:** 2-4 questions that narrow down the catalog based on the
  Outcome Mapping.
- **The Personalizer:** 1 question that makes the user feel "seen" (e.g., "How
  would you describe your style?").
- **Constraint:** Keep the total flow to 5-7 steps.

### 3. Language Translation (Technical to Human)

Translate technical specs into user benefits:
- *Before:* "What wattage do you need?"
- *After:* "How large is the room you want to heat?"
- *Before:* "Choose your preferred CPU."
- *After:* "What will you be using this computer for? (Gaming, Office Work,
  Video Editing)."

### 4. Results Page Optimization

The recommendation must feel inevitable and personalized:
- **The "Why":** Explicitly state why this product was chosen for them (e.g.,
  "Because you mentioned you have dry skin and live in a cold climate...").
- **The Selection:** Offer one primary "Best Match" and 1-2 "Alternative"
  options.
- **The Shortcut:** Place a clear "Add to Cart" or "Start Free Trial" button
  directly on the results page.

### 5. Review Against Decision Rules

Verify the proposed discovery engine against the heuristics below.

## Decision Rules

- **The Easy Start:** The first question must have a 95%+ completion rate. If
  users drop off at step 1, the question is too hard or intrusive.
- **Value Exchange:** If you ask for an email, it must be *after* providing
  initial value or as a way to "save these results." Never block the first
  question with a lead form.
- **Visual Answers:** Use images or icons for answers whenever possible to
  reduce reading time and cognitive load.
- **The Progress Rule:** Always show a progress bar or "Step X of Y" to manage
  user expectations.

## Common Failure Patterns

- **The "Dead End":** Reaching the end of a quiz and seeing "No results found."
  (Always fallback to a "Best Seller" or "Closest Match").
- **The Interrogation:** Asking too many technical or personal questions that
  don't actually change the outcome.
- **Lack of Explanation:** Showing a product without explaining *why* the
  engine recommended it.
- **Mobile Friction:** Using tiny radio buttons or complex dropdowns that are
  hard to tap on mobile devices.
- **The "Data Trap":** Using the quiz purely for lead gen without actually
  helping the user find a product.

## Validation Methods

- **Completion Rate:** (Quiz Finished / Quiz Started) * 100. Target: >70%.
- **Conversion from Results:** Percentage of users who land on the results page
  and then Add to Cart or Sign Up.
- **AOV Lift:** Compare the average order value of "Quiz Users" vs. "Organic
  Browsers."
- **Return Rate Reduction:** Measure if products bought via the finder are
  returned less frequently (indicating better fit).
