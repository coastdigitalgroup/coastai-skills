---
name: review-and-rating-system
description:
  Design and implement a systematic framework for user feedback interfaces,
  including aggregate ratings, distribution summaries, and individual reviews
  to build trust and social proof.
---

# Review and Rating UI System

## Purpose

The Review and Rating UI System provides a methodology for designing the visual
and structural framework of user-generated feedback. It ensures that quantitative
data (star ratings) and qualitative data (written reviews) are organized into a
scannable, trustworthy, and accessible interface. This system helps users make
informed decisions by surfacing the most relevant feedback while maintaining
visual consistency with the broader site design.

## Use Cases

- **E-commerce Product Pages:** Displaying product satisfaction and detailed
  customer experiences.
- **Service/SaaS Marketplaces:** Rating providers, tools, or applications.
- **Content Platforms:** Allowing users to rate articles, courses, or media.
- **Feedback Collection Forms:** Designing the input side of the rating system.
- **Review Summaries:** Creating "at-a-glance" rating distributions (e.g., 5-star
  bar charts).

## When NOT to Use

- **Internal Quality Audits:** Where feedback is private and used only for
  internal processing without a public UI.
- **Binary Feedback:** If the goal is a simple "Helpful/Not Helpful" or "Upvote/Downvote,"
  use a simpler interaction pattern from `interactive-state-system`.
- **Low-Volume Content:** If a site typically has 0–2 reviews per item, a
  complex distribution summary might look "empty" or discouraging.
- **Strictly Quantitative Data:** For performance metrics or system health
  (e.g., "99.9% Uptime"), use a simple `badge-and-tag-system` or data visualization.

## Inputs

1. **Feedback Schema:** The data to be captured/displayed (Rating 1-5, Title,
   Body, Date, User ID, Verified status, Photos).
2. **Aggregate Metadata:** Total review count and average score.
3. **Distribution Data:** The count of reviews for each star level (5, 4, 3, 2, 1).
4. **Interaction Requirements:** Sorting (Newest, Highest Rated), Filtering
   (Verified only, with Photos), and "Helpful" voting.

## Outputs

1. **Rating Component Spec:** Visual design for the "Star Row" (including empty,
   half, and full states).
2. **Review Summary Anatomy:** A layout for the aggregate score and distribution
   bar chart.
3. **Individual Review Blueprint:** The structural layout for a single review
   entry (User, Rating, Content, Actions).
4. **Input Interaction Spec:** The design for the rating selection and review
   submission form.

## Workflow

### 1. Design the Aggregate Summary (The Snapshot)

Before showing individual reviews, provide a mental shortcut:
- **Average Score:** Large, prominent number (e.g., "4.8").
- **Star Visualization:** A row of 5 stars reflecting the average.
- **Total Count:** "Based on 1,240 reviews."
- **Distribution Bars:** A vertical or horizontal list showing the percentage
  of 5, 4, 3, 2, and 1-star reviews. These should ideally be interactive
  (clicking a bar filters the list).

### 2. Establish the Individual Review Anatomy

Apply `visual-hierarchy-system` to the review card:
- **Header:** User name (optionally anonymized) and "Verified Purchase" badge.
- **Rating & Date:** The star rating and when it was posted.
- **Title & Body:** A bold title for the core sentiment, followed by the
  descriptive text.
- **Media (Optional):** Thumbnails for user-uploaded photos.
- **Footer/Actions:** "Was this helpful? (Yes/No)" and "Report" buttons.

### 3. Select Interaction & Discovery Patterns

Enable users to find the feedback most relevant to them:
- **Sorting:** Default to "Most Relevant" (a mix of recency and helpfulness).
  Allow switching to "Newest" or "Highest/Lowest Rated."
- **Filtering:** Provide quick toggles for "With Images," "Verified Only,"
  or specific star counts.

### 4. Design the Feedback Input (The Form)

Ensure the collection process is frictionless:
- **Initial Trigger:** Use large, interactive stars that change state on hover.
  A radio-group of star inputs styled with the `:has()` selector (e.g.,
  `label:has(~ input:checked)`) gives hover/selected fill states without extra
  JavaScript.
- **Progressive Disclosure:** Reveal the text input area only after a star
  rating is selected.
- **Contextual Guidance:** Use placeholders like "What did you like or dislike?"
  to encourage useful feedback.

### 5. Plan for Content Variance

- **Empty State:** Design a "No reviews yet—be the first to review" state.
- **Long Reviews:** Implement "Read More" truncation for extremely long
  qualitative feedback.
- **Responsive Stacking:** On mobile, move the distribution summary into a
  collapsible section or stack it above the review list.

## Decision Rules

- **The "Squint" Test for Stars:** Stars must be distinguishable even when small.
  Use high-contrast colors (e.g., Amber/Gold) against the background.
- **Verified Priority:** "Verified Purchase" badges should be visually distinct
  (often green or with a check icon) to build immediate trust.
- **Average Precision:** Round the numeric average to one decimal place (e.g.,
  4.7) but ensure the star row visually represents half-stars correctly.
- **Helpfulness Logic:** Use "Helpful" voting to surface the best reviews,
  but ensure the UI doesn't become cluttered with too many secondary actions.
- **Image Aspect Ratio:** Use square (1:1) thumbnails for user-uploaded review
  images to keep the review list organized.

## Constraints

- **Accessibility:** Star ratings must use `aria-label` (e.g., "4 out of 5
  stars"). Interactive star inputs must be keyboard-accessible and use
  `role="radiogroup"` or similar, with each star at least 24x24px (WCAG 2.2,
  2.5.8) — 44x44px preferred given how easily a small star target is
  mis-tapped.
- **Contrast:** Empty stars (background) must have a 3:1 contrast against the
  page background; filled stars must have 4.5:1 against the background or a
  strong border.
- **Responsiveness:** Review lists must be fluid. Avoid multi-column review
  cards on mobile; stack all metadata vertically.

## Common Failure Patterns

- **The "Binary Star" Mistake:** Using stars that are only "On" or "Off" without
  half-star states, which misrepresents averages like 4.3.
- **Hidden Distribution:** Showing the average score but not the breakdown,
  making it impossible for users to see the volume of negative vs. positive.
- **Lack of Verification:** Failing to distinguish between a verified buyer and
  a generic user, reducing the trust of the entire system.
- **The "Review Wall":** Not providing sorting or filtering, forcing users to
  scroll through hundreds of irrelevant entries.
- **Inaccessible Inputs:** Using an icon-only star rating input that cannot be
  reached or selected by keyboard-only users.

## Validation Criteria

- [ ] Average rating and distribution summary are present and scannable.
- [ ] Individual reviews have a clear hierarchy (User -> Rating -> Content).
- [ ] "Verified Purchase" status is visually signaled.
- [ ] Sorting and filtering controls are present for high-volume scenarios.
- [ ] Accessibility: Star ratings have descriptive ARIA labels.
- [ ] Interactive rating inputs are keyboard-navigable and have focus states.
- [ ] Layout is responsive, stacking elements logically on smaller screens.
