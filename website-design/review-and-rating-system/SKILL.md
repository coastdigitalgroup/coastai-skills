---
name: review-and-rating-system
description:
  Design and implement a systematic framework for user feedback interfaces,
  including aggregate ratings, distribution summaries, and individual reviews.
---

# Review and Rating System

## Purpose

The Review and Rating System skill provides a methodology for designing the
visual and structural components of user feedback. It ensures that social proof
is presented in a clear, trustworthy, and accessible way, allowing users to
quickly assess product or service quality through aggregate data and detailed
personal accounts.

## Use Cases

- Designing product review sections for e-commerce sites.
- Implementing rating systems for services, apps, or content (e.g., star ratings).
- Creating aggregate rating summaries (e.g., "4.5 out of 5 stars").
- Structuring review lists with filtering, sorting, and "helpful" voting.
- Designing the "Write a Review" interface and feedback loops.

## When NOT to Use

- **Internal Qualitative Feedback:** For internal surveys or net promoter scores
  (NPS) that aren't displayed publicly.
- **Single-Testimonial Callouts:** Where a single quote is used as a design
  element; use `social-proof-optimization` or `section-composition-system`.
- **Low-Data Sites:** Where there are fewer than 3-5 reviews; a simple list or
  quote block is more effective than a full system.

## Inputs

1. **Feedback Type:** Is it a simple binary (thumbs up/down), a 5-star scale, or
   a complex multi-attribute rating (e.g., "Fit," "Quality," "Value")?
2. **Data Metadata:** Reviewer name, date, verification status (e.g., "Verified
   Purchase"), and images.
3. **Volume Expectations:** How many reviews are expected? (Influences sorting,
   filtering, and pagination needs).
4. **Brand Tokens:** Iconography (stars vs. hearts), color palette, and spacing.

## Outputs

1. **Review Anatomy Spec:** Visual definitions for aggregate scores,
   distribution bars, and individual review cards.
2. **Interaction Map:** Logic for sorting (Newest, Highest Rated) and filtering
   (By rating, With images).
3. **Accessibility Spec:** ARIA labels for stars, focus management for forms,
   and contrast rules.
4. **Layout Blueprint:** Positioning of the summary vs. the list vs. the action.

## Workflow

### 1. Design the Aggregate Summary (The Snapshot)

Provide an immediate "at-a-glance" understanding:
- **Primary Score:** Large numerical score (e.g., 4.8) and star icons.
- **Rating Distribution:** Horizontal bars showing the percentage of 1-5 star
  reviews.
- **Review Count:** Total number of ratings/reviews to establish volume trust.

### 2. Define the Review Card Anatomy

Apply `visual-hierarchy-system` to the individual review:
- **The Rating:** Clear visual (stars) and numeric value.
- **The Content:** Bold headline (optional) and the body text.
- **The Metadata:** Reviewer name, date, and trust signals (e.g., "Verified").
- **Visual Evidence:** Space for user-uploaded photos if relevant.

### 3. Establish Discovery Controls

Help users find relevant feedback:
- **Sorting:** Default to "Most Helpful" or "Newest."
- **Filtering:** Allow users to filter by specific ratings (e.g., "Show all
  1-star reviews").
- **Search:** For high-volume reviews, include a keyword search within the
  reviews section.

### 4. Design the Feedback Loop (The "Write" Action)

Encourage participation:
- **Placement:** A clear "Write a Review" button, usually near the summary.
- **The Form:** Simple star selection first, followed by text and image
  uploads. Use `form-design-system` for the input fields.

### 5. Plan for Content States

Handle different amounts of data:
- **Empty State:** A prompt to "Be the first to review."
- **Low Volume:** Show the list without complex filters.
- **High Volume:** Use `pagination-system` and robust filtering.

## Decision Rules

- **The "No Empty Bars" Rule:** If a rating level (e.g., 2 stars) has zero
  reviews, the distribution bar should still be visible but at 0% to maintain
  structural consistency.
- **Trust Signaling:** Always visually prioritize "Verified Purchase" or
  "Real Name" badges to increase credibility.
- **Negative Proof:** Do not hide low-rated reviews. Transparency builds more
  trust than a "perfect" 5.0 score with hidden criticism.
- **The 44px Rule:** Ensure star icons in the "Write a Review" form are large
  enough to be easily tapped on mobile (min 44x44px).

## Constraints

- **Accessibility:** Stars must have `aria-label` (e.g., "4 out of 5 stars").
  Interactive stars must be focusable and keyboard-operable.
- **Responsiveness:** Aggregate summaries often shift from a horizontal layout
  on desktop to a vertical stack on mobile.
- **Contrast:** Star colors (usually yellow/gold) must meet at least 3:1
  contrast against their background if they are functional/interactive.

## Common Failure Patterns

- **The "Mystery Average":** Showing a star rating without the numeric score or
  total count, leaving the user guessing at the volume.
- **Inaccessible Stars:** Using icons that aren't readable by screen readers or
  have no focus states.
- **Lack of Filtering:** Forcing users to scroll through hundreds of reviews to
  find specific feedback (e.g., about "shipping speed").
- **Form Friction:** Making the "Write a Review" form too complex, causing
  users to drop off before submitting.

## Validation Criteria

- [ ] Aggregate summary includes both icons and numerical scores.
- [ ] Rating distribution (1-5 stars) is clearly visualized.
- [ ] Reviews are sortable and filterable.
- [ ] "Verified" trust signals are visually distinct.
- [ ] Interactive stars in the form meet the 44x44px touch target.
- [ ] Semantic ARIA labels are used for all rating components.
- [ ] Layout is responsive and preserves hierarchy on mobile.
