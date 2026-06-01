---
name: value-calculator-optimization
description:
  Audit and optimize interactive value calculators (ROI, savings, TCO) to
  demonstrate quantifiable value, build business cases, and capture high-intent
  leads.
---

# Value Calculator Optimization

## Purpose

The Value Calculator Optimization skill provides a systematic framework for
designing and refining interactive tools that quantify the benefit of a product
or service. Unlike generic lead magnets, value calculators (ROI, Savings, or
TCO calculators) provide personalized, data-driven proof of value. This skill
aims to reduce "Purchase Anxiety" by making the business case undeniable,
thereby increasing lead quality, conversion rates, and sales velocity.

## Use Cases

- **B2B SaaS:** Demonstrating Return on Investment (ROI) or Total Cost of
  Ownership (TCO) comparisons.
- **Service Providers:** Estimating savings or efficiency gains (e.g., "How much
  time can you save with automated payroll?").
- **Financial Services:** Loan calculators, investment growth projections, or
  tax savings estimators.
- **Sustainable Products:** Calculating energy savings or carbon footprint
  reduction.

## When NOT to Use

- **Low-Consideration Goods:** Simple, low-cost products where the "value" is
  subjective or emotional rather than quantifiable (e.g., fashion, snacks).
- **Early-Stage Discovery:** If the user doesn't understand the problem yet, a
  complex calculator might be overwhelming. Use `guided-discovery-optimization`
  first.
- **Purely Qualitative Services:** Where the primary benefit cannot be
  reasonably expressed in numbers (e.g., brand consulting, therapy).

## Inputs

1. **Value Formula:** The underlying logic or mathematical model that connects
   user inputs to outcomes (e.g., "Hours saved * Hourly rate = Monthly savings").
2. **Benchmark Data:** Industry averages or internal data points to provide
   sensible defaults for the user.
3. **Target Conversion Goal:** What should happen after the calculation? (e.g.,
   "Download Full Report," "Book a Demo").
4. **Current Performance:** Analytics on calculator starts, completions, and
   lead conversion rates.

## Outputs

1. **Calculator Logic Audit:** Identification of friction points, confusing
   inputs, or "Leaky Logic" that produces unbelievable results.
2. **Optimized Input Sequence:** A refined flow of questions that balances data
   accuracy with user effort.
3. **Persuasive Results Dashboard:** Guidelines for presenting the outcome in a
   way that is scannable, shareable, and authoritative.
4. **Lead Capture Strategy:** A plan for when and how to ask for user details
   without tanking the completion rate.

## Workflow

### 1. Define the "Outcome Metric"

Identify the single most persuasive number for your audience.
- **Financial:** ROI, Net Savings, Cost Avoidance.
- **Efficiency:** Hours Saved, Productivity Lift.
- **Risk:** Probability of Error, Cost of Downtime.

### 2. Streamline the Inputs (The "Rule of 5")

Audit the calculator for cognitive load.
- **Sensible Defaults:** Pre-fill fields with industry averages so the user
  only has to change what's unique to them.
- **Input Grouping:** If you need more than 5 inputs, group them into logical
  steps (e.g., "Current State" vs. "Future Goals").
- **Tooltips:** Provide clear explanations for technical terms or where to find
  the requested data.

### 3. Implement "Live Results" (The Hook)

Don't hide the value behind a lead wall initially.
- **The "Teaser" Result:** Show a live, updating calculation as the user moves
  sliders or changes inputs. This creates "Momentum."
- **The Labor Illusion:** Use subtle loading animations (e.g., "Calculating
  your custom ROI...") to make the result feel more personalized and earned.

### 4. Optimize the "Lead Exchange"

Place the lead form where the user's curiosity is highest.
- **The "Full Report" Strategy:** Provide the basic result for free, then ask
  for an email to "Download the detailed 5-page PDF breakdown."
- **Social Sharing:** Allow the user to "Email these results to my boss"
  directly from the results page.

### 5. Design the Persuasive Results Page

The results must be authoritative enough to be used in a internal business case.
- **Visual Evidence:** Use charts or graphs to show the "Before vs. After" or
  "Cumulative Savings over 3 years."
- **Assumptions Transparency:** List the benchmarks and formulas used to build
  trust in the numbers.
- **Direct Path to Action:** Place a primary CTA (e.g., "Schedule an ROI
  Walkthrough") immediately next to the winning number.

## Decision Rules

- **Accuracy vs. Effort:** Accuracy is secondary to engagement in the initial
  step. Use sliders and toggles for speed; allow precise text input only for
  power users.
- **The "Lead Wall" Rule:** Never block the *start* of a calculator with a lead
  form. Provide value first, then capture the lead to unlock "advanced" or
  "permanent" results.
- **Transparency Priority:** Always include a "How we calculate this" link.
  Opaque "Black Box" calculators are rarely trusted by B2B buyers.
- **Mobile First:** Use large tap targets for sliders and ensure charts are
  responsive (not just shrunk-down images).

## Constraints

- **Defensible Outputs:** Calculator results must be based on honest assumptions and a validated formula — inflated projections create unrealistic expectations and erode post-sale trust.
- **Business Validation:** The formula inputs, weights, and assumptions must be reviewed and approved by product, finance, or sales before publishing.
- **Appropriate Caveats:** Results should include clear disclaimers (e.g., "estimates vary by use case") to set accurate expectations.

## Non-Goals

- Building or maintaining the calculator backend, data model, or API.
- CRM integration for routing calculator-generated leads.
- Financial modeling, pricing strategy, or guarantee commitments based on calculator outputs.

## Common Failure Patterns

- **The "Interrogation":** Asking for 20+ precise data points that the user
  doesn't have on hand.
- **The "Black Box":** Providing a massive number without any explanation of
  how the system arrived at it.
- **Over-Promising:** Calculating ROI that is clearly impossible (e.g., "Save
  $10M in 1 month"), which destroys brand credibility.
- **The "Static PDF":** Forcing a user to download a file to see any results
  at all, rather than providing an interactive experience.
- **Hidden CTAs:** Focusing so much on the math that the "What's Next?" button
  is buried at the bottom of the page.

## Validation Criteria

- [ ] **Completion Rate:** (Calculations Completed / Calculators Started) * 100.
  Target: >60%.
- [ ] **Lead Conversion Rate (LCR):** Percentage of calculator users who provide
  their contact info.
- [ ] **Sales Velocity:** Measure if leads coming from the calculator close faster
  than generic demo requests (due to established value).
- [ ] **Sharing Rate:** How many users use the "Email this report" or "Share"
  functionality.
