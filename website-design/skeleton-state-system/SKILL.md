---
name: skeleton-state-system
description:
  Design a systematic framework for "Skeleton Screens" that manages perceived
  performance and layout stability (CLS) by mapping UI "bones" to incoming
  content.
---

# Skeleton State System

## Purpose

The Skeleton State System provides a methodology for designing the "loading"
state of an interface. Unlike generic spinners or progress bars, skeletons
approximate the final layout using "bones" (low-fidelity shapes), which reduces
the user's perceived wait time and prevents **Cumulative Layout Shift (CLS)** by
reserving the necessary space before content arrives.

## Use Cases

- **Data-Heavy Dashboards:** Where multiple widgets load at different speeds.
- **Content Feeds:** Scrolling through lists of articles, products, or social
  posts.
- **Image-Heavy Grids:** Reserving space for high-resolution images to prevent
  page "jumping."
- **Search & Filter Views:** Providing immediate feedback that the system is
  processing a query.
- **Single Page Applications (SPAs):** Managing transitions between routes where
  data is fetched asynchronously.

## When NOT to Use

- **Instant Interactions:** If content loads in under 300ms, a skeleton may
  cause a distracting "flicker."
- **Simple, Low-Context Loads:** For small elements like a single button or a
  tiny tag, a standard spinner or "Loading..." text is more appropriate.
- **Static Content:** Content that is hard-coded or cached and renders
  immediately.
- **High-Velocity Real-time Data:** If data changes so fast that the skeleton
  would be constantly appearing and disappearing, it may cause visual fatigue.

## Inputs

1.  **Target Layout:** The final "fully loaded" design of the component or
    page.
2.  **Content Variables:** What parts of the UI are dynamic (Text, Images,
    Prices, Avatars)?
3.  **Spatial Dimensions:** The exact height, width, and aspect ratios of the
    final elements.
4.  **Brand Tone:** The primary and secondary colors used for the "bone" base
    and shimmer effect.

## Outputs

1.  **Skeleton Blueprint:** A low-fidelity map showing the arrangement of bones.
2.  **Bone Specification:** Definitions for shape (circles vs. rectangles) and
    sizing (fixed vs. percentage-based).
3.  **Transition Strategy:** Rules for how the skeleton fades out and content
    fades in.
4.  **Accessibility Requirements:** Guidance for `aria-busy` and `aria-hidden`
    implementation.

## Workflow

### 1. Map the "Target" Geometry

Break down the final component into its basic geometric primitives:
- **Circles:** For avatars, icons, or rounded buttons.
- **Rectangles (Rounded):** For cards, image containers, and text blocks.
- **Lines:** For single rows of text (headlines, metadata).

### 2. Define the Bone Hierarchy

Not every element needs a bone. Focus on the structural "anchors":
- **Primary Bone:** The largest visual element (e.g., a product image).
- **Secondary Bones:** Headlines and primary metadata.
- **Tertiary Bones:** Small meta-details or action buttons (can often be
  omitted if they are too small).

### 3. Establish Spatial Matching (The CLS Rule)

Ensure the skeleton's dimensions exactly match the final content's container:
- **Aspect Ratio:** Use fixed aspect ratios (e.g., 16:9 for videos) for the bone
  so it doesn't change size when the asset loads.
- **Text Sizing:** Use bones that match the line-height and approximate width
  of the text they represent.

### 4. Design the Rhythm and Shimmer

Skeletons should feel "alive" but not distracting:
- **Base Color:** Use a low-contrast, neutral color (e.g., Light Gray).
- **Shimmer (The Pulse):** Apply a subtle gradient animation that moves from
  left to right.
- **Synchronization:** If multiple skeletons are on screen, ensure their
  animations are synchronized to prevent visual chaos.

### 5. Define the "Hand-off" Transition

Plan the exit of the skeleton:
- **Timing:** Use a short fade-in (e.g., 200ms) for the real content to prevent
  a harsh "snap" transition.
- **Staggering:** For lists, decide if items should appear all at once or as
  they load individually.

## Decision Rules

- **The 300ms Rule:** Only show a skeleton if the load is expected to take
  longer than 300ms.
- **Bone Accuracy:** A bone should represent the *container*, not the specific
  *data*. For example, a text bone should be a simple bar, not a jagged line
  mimicking specific letters.
- **Line Count:** For multi-line text, use 2 or 3 bones of varying widths (e.g.,
  the last line at 60% width) to simulate natural paragraph flow.
- **Spinner vs. Skeleton:**
  - Use a **Skeleton** for page-level or section-level transitions.
  - Use a **Spinner** for small, localized actions (like a "Saving..." button
    state).

## Constraints

- **Accessibility:** Skeletons must be marked with `aria-hidden="true"` so
  screen readers don't try to "read" the empty bars. The parent container
  should use `aria-busy="true"` while loading.
- **Contrast:** The skeleton colors must be distinct from the background but
  not so high-contrast that they look like active content.
- **Responsiveness:** Skeleton bones must scale using the same grid/flex logic
  as the final content.

## Common Failure Patterns

- **The "CLS Jump":** A skeleton that is 200px tall being replaced by content
  that is 300px tall, causing the page to "jump."
- **Shimmer Overload:** Animations that are too fast or high-contrast, causing
  motion sickness or distraction.
- **Content-Bones Mismatch:** Using a circular bone for a square image, or
  vice versa.
- **Over-Complexity:** Trying to recreate every tiny icon as a bone, resulting
  in a cluttered "ghost" layout.
- **The "Static Skeleton":** A skeleton with no animation, which can be
  mistaken for a broken or empty page.

## Validation Criteria

- [ ] Skeleton dimensions exactly match the final "loaded" state (Zero CLS).
- [ ] Aspect ratios for images/videos are reserved using fixed containers.
- [ ] Shimmer animation is subtle and moves left-to-right.
- [ ] Text-heavy areas use bones that simulate natural line lengths.
- [ ] `aria-hidden="true"` is applied to the skeleton elements.
- [ ] The transition from skeleton to content is a smooth fade (200ms approx).
- [ ] Skeleton does not appear for loads faster than 300ms.
