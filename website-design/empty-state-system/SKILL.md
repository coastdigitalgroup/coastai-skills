---
name: empty-state-system
description:
  Design and implement purposeful "empty states" (zero-data screens) that guide
  users, reduce frustration, and provide clear paths to action when content is
  missing or yet to be created.
---

# Empty State System

## Purpose

The Empty State System provides a framework for designing screens or components
that appear when there is no data to display. Instead of showing a blank screen
or a generic "No results found" message, this system treats empty states as
opportunities for onboarding, education, and proactive discovery. It transforms
potential dead-ends into productive moments that maintain user momentum and
clarify system utility.

## Use Cases

- **First-run Experiences:** When a user logs in for the first time and hasn't
  created any content (e.g., an empty dashboard or project list).
- **Search Results:** When a user's search query returns zero matches.
- **Filtering:** When a combination of active filters results in an empty grid.
- **Empty Containers:** Specific UI elements like an empty shopping cart, a
  cleared notification center, or a fresh favorites list.
- **Error States:** When content fails to load due to permissions or connection
  issues (secondary use case).

## When NOT to Use

- **Loading States:** Use a skeleton screen or spinner when content is expected
  to appear shortly.
- **Permanent "Dead" Pages:** Use a 404 page for broken links or deleted
  resources.
- **Partial Content:** If some data is available but limited, use standard
  layout patterns rather than an empty state.
- **Passive Backgrounds:** Do not use for sections that are meant to be blank by
  design (e.g., margins or decorative whitespace).

## Inputs

1.  **Empty Scenario Type:** Is this a user-cleared state (success), a first-run
    state (onboarding), or a search failure (discovery)?
2.  **User Intent:** What was the user trying to achieve or find?
3.  **Core Value Prop:** What is the primary benefit of the content that is
    currently missing?
4.  **Available Actions:** What is the "single best next step" for the user?

## Outputs

1.  **Empty State Blueprint:** A structural definition including illustration,
    headline, body copy, and primary CTA.
2.  **Contextual Logic:** Rules for when and where the empty state should be
    triggered.
3.  **Discovery Strategy:** Recommendations for suggested content or educational
    tips to fill the void.

## Workflow

### 1. Identify the Empty Trigger

Determine why the state is empty. Categorize it to choose the right tone:

- **First-run (Educational):** Encourage the first "create" action.
- **User-cleared (Positive):** Acknowledge completion (e.g., "All caught up!").
- **Search/Filter (Helper):** Provide ways to broaden or pivot the search.

### 2. Establish Visual Hierarchy

Structure the empty state using the "Three-Point Rule" (modified for empty
states):

- **The Anchor (Visual):** A non-distracting icon or illustration that sets the
  tone.
- **The Context (Messaging):** A clear headline explaining _why_ it's empty and
  body copy explaining _how_ to change it.
- **The Target (CTA):** A primary button that triggers the creation of content
  or resets filters.

### 3. Draft Action-Oriented Copy

- **Headline:** Be specific. Instead of "No Items," use "You haven't created any
  projects yet."
- **Body:** Offer value. "Projects help you organize your tasks. Create your
  first one to get started."
- **CTA:** Use benefit-driven verbs. "Create Project" or "Start Free Trial."

### 4. Provide Discovery Paths (Secondary Actions)

If there is no direct "create" action (like in search), offer alternatives:

- **Reset:** A link to clear all filters.
- **Suggestions:** Popular categories or "Did you mean?" suggestions.
- **Education:** Link to documentation or a video tutorial.

### 5. Define Technical Constraints

- **Responsiveness:** Ensure the empty state remains centered and legible on
  small viewports.
- **Accessibility:** Use appropriate ARIA roles (e.g., `role="status"`) to
  ensure the state is announced when it appears dynamically.

## Decision Rules

- **The One-Action Rule:** Focus on exactly ONE primary action to avoid
  overwhelming the user in a moment of potential confusion.
- **Empathy over Humor:** While a bit of personality is fine, prioritize clarity
  and helpfulness. Avoid "clever" copy that hides the solution.
- **Direct vs. Indirect:**
  - If the user _can_ fix it (e.g., first-run), use a Primary CTA.
  - If the user _can't_ fix it (e.g., search failure), use suggestions or reset
    links.
- **Image Relevance:** Use illustrations that reinforce the specific context
  (e.g., a magnifying glass for search, a folder for files).

## Constraints

- **Accessibility:** Empty state illustrations must have `aria-hidden="true"` or
  be purely decorative. The text must meet WCAG AA contrast ratios. The
  primary CTA and any secondary links/buttons must meet WCAG 2.2 SC 2.5.8
  (24x24px minimum target size).
- **Scale:** Empty states should not exceed the container width of the actual
  content they replace.
- **Consistency:** Use the same visual style and layout for all empty states
  across the site to build pattern recognition.

## Common Failure Patterns

- **The "Dead End":** Telling the user something is empty without telling them
  how to fix it.
- **Over-Design:** Using complex, heavy illustrations that distract from the
  primary CTA.
- **Negative Tone:** Using language that sounds like an error or a failure
  (e.g., "Search Failed!").
- **Generic Copy:** Using "No results" for everything from search to first-time
  onboarding.
- **Mobile Overflow:** Designs that look great on desktop but require vertical
  scrolling on mobile just to see the CTA.

## Validation Criteria

- [ ] The empty state clearly explains why it is appearing.
- [ ] There is a clear, actionable primary CTA or "reset" path.
- [ ] The visual hierarchy leads the eye from the visual to the CTA.
- [ ] The tone matches the context (onboarding vs. search failure).
- [ ] The state is accessible (contrast, keyboard navigation, screen reader
      announcements via `role="status"` or equivalent live region).
- [ ] The primary CTA meets WCAG 2.2 SC 2.5.8 (24x24px minimum target size).
- [ ] The layout is responsive and centered within its parent container.
