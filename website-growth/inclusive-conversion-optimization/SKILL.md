---
name: inclusive-conversion-optimization
description:
  Identify and remove barriers for users with diverse abilities and backgrounds
  to expand reachable market share and improve overall conversion rates.
---

# Inclusive Conversion Optimization

## Purpose

The Inclusive Conversion Optimization skill provides a systematic framework for
identifying and eliminating the friction points that disproportionately affect
users with disabilities, neurodivergence, or situational limitations. While
standard accessibility (a11y) focuses on compliance, Inclusive Conversion
Optimization focuses on the **Growth Gap**—the measurable segment of users who
fail to convert because of mismatched interface design. By building a more
robust and flexible experience, you expand your reachable market and improve
usability for all users.

## Use Cases

- **Checkout & Payment Flows:** Where complex interactions and strict validation
  often block assistive technology users.
- **Form-Heavy Lead Generation:** Where cognitive load and time limits can
  cause high abandonment among neurodivergent users.
- **E-commerce Product Discovery:** Where reliance on purely visual cues
  (color swatches, image-only buttons) excludes users with visual impairments.
- **Global Sites:** Where language barriers and cultural contexts affect
  messaging clarity and trust.
- **Mobile-First Audiences:** Where situational limitations (glare, noise,
  one-handed use) mimic permanent disabilities.

## When NOT to Use

- **Internal Backend Systems:** Where the user base is known and specific
  training is provided (though inclusivity is still a best practice).
- **Initial Brand Ideation:** When the core value proposition is still being
  defined; use `hero-section-optimization` first.
- **Low-Traffic Experiments:** Small-scale A/B tests may not have enough
  statistical power to show the impact on specific inclusive segments.

## Inputs

1. **Accessibility Audit Data:** Automated scan results (e.g., Axe, Lighthouse)
   identifying baseline technical failures.
2. **Device & Assistive Tech Analytics:** Data on screen reader usage, keyboard-only
   navigation, and high-contrast mode (where detectable).
3. **User Feedback & Support Tickets:** Inquiries regarding "bugs" that are actually
   accessibility barriers (e.g., "I can't click the button").
4. **Current Conversion Funnel:** Identification of steps with the highest
   drop-off for mobile or non-standard device users.

## Outputs

1. **Inclusivity Friction Audit:** A list of conversion barriers categorized by
   disability type (Visual, Motor, Cognitive, Auditory).
2. **Universal Design Specs:** UI adjustments that improve reachability for
   everyone (e.g., increased contrast, larger tap targets, simplified copy).
3. **Assistive Tech Optimization Plan:** Specific fixes for ARIA labels, focus
   management, and semantic structure.
4. **Alternative Conversion Paths:** Strategy for providing non-visual or
   low-cognitive-load ways to complete a transaction.

## Workflow

### 1. Identify the "Conversion Barrier" Gap

Compare the conversion rate of "Standard" users vs. "Assistive Technology" or
"Constraint-Based" users (e.g., Compare Desktop vs. Keyboard-only).
- **The Keyboard Test:** Attempt to complete the entire conversion funnel using
  only the `Tab` and `Enter` keys. Note where you get stuck.
- **The Screen Reader Audit:** Listen to the checkout flow. Does it make sense?
  Are form errors announced immediately?

### 2. Map Barriers to the "Growth Gap"

Categorize friction into four primary buckets:
- **Perception:** Can everyone see/hear the value prop? (Contrast, Alt-text,
  Captions).
- **Operation:** Can everyone interact with the CTA? (Tap targets, Focus
  states, Keyboard traps).
- **Understanding:** Can everyone comprehend the instructions? (Reading level,
  Error clarity, Icon consistency).
- **Robustness:** Does it work across all devices and settings? (Zoom levels,
  Font scaling).

### 3. Implement Universal "Growth" Fixes

Apply changes that benefit the widest possible audience:
- **High-Contrast CTAs:** Ensure buttons meet a 4.5:1 ratio, benefiting users
  in bright sunlight and those with low vision.
- **Clear Error Recovery:** Provide specific, non-color-dependent error
  messages (e.g., an "!" icon + text, not just a red border).
- **Semantic Structure:** Use proper H1-H4 tags so users can "scan" the page
  using screen reader shortcuts, similar to how visual users scan H2s.

### 4. Optimize the "Last Mile" of Conversion

Focus on the final decision points:
- **Redundant Visuals:** Don't rely on color alone to convey status (e.g.,
  "Items in Green are in stock"). Use text labels.
- **Descriptive Links:** Replace "Click Here" with "Download the PDF Guide"
  to provide context for screen readers.
- **Progressive Disclosure:** Simplify complex forms for cognitive ease,
  showing only what's necessary at each step.

### 5. Review Against Decision Rules

Ensure the optimizations don't compromise brand aesthetics while maximizing
reach.

## Decision Rules

- **The "Two-Senses" Rule:** Never convey critical information using only one
  sense (e.g., sound-only notifications or color-only status).
- **Reach Over Polish:** If a "fancy" animation or interaction prevents a
  segment of users from converting, simplify it.
- **The "Fat-Finger" Minimum:** All interactive elements must be at least
  44x44px to accommodate motor impairments and mobile users.
- **Clarity is Conversion:** Use a 6th-8th grade reading level for instructions
  and CTAs to reduce cognitive friction for all users.
- **No Invisible States:** Every interactive element must have a highly visible
  `:focus` state that is distinct from its `:hover` state.

## Constraints

- **Technical Debt:** Some inclusive optimizations may require significant
  refactoring of legacy front-end code or third-party widgets.
- **Brand Identity:** High-contrast requirements must be balanced with the
  established brand palette, often requiring a "Secondary" accessible palette.
- **Compliance vs. Growth:** Meeting WCAG 2.2 AA is the floor, not the ceiling.
  Growth comes from exceeding the floor to make the experience *pleasant*, not
  just possible.

## Non-Goals

- Full legal accessibility audit for ADA/Section 508 compliance.
- Content translation or localization (though they overlap).
- Resolving deep technical bugs in screen reader software or browsers.

## Common Failure Patterns

- **The "Overlay" Trap:** Using "Accessibility Overlays" or "AI Widgets" that
  actually interfere with real assistive technology.
- **Invisible Focus:** Removing the "blue outline" for aesthetic reasons,
  making it impossible for keyboard users to navigate.
- **Alt-Text Stuffing:** Using alt-text for SEO keywords instead of
  describing the image's function or value to a blind user.
- **Time-Out Anxiety:** Using strict timers on checkouts or forms without
  providing a way to extend the time.
- **Empty ARIA:** Adding `aria-label` to every element, creating a "wall of
  sound" for screen reader users.

## Validation Criteria

- [ ] **Funnel Completion Rate (Keyboard):** Increase in successful test
  conversions using only keyboard input.
- [ ] **Error Rate Reduction:** A decrease in form validation errors after
  implementing clearer, more accessible instructions.
- [ ] **Reach Expansion:** Measure traffic and conversion from previously
  underperforming device types or browser settings (e.g., High Contrast Mode).
- [ ] **Qualitative Feedback:** User testing with participants who use
  assistive technology shows a reduction in "Task Completion Time."
