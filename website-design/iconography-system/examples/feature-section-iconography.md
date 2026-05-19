# Feature Section Iconography Breakdown

This example demonstrates the application of the **Iconography System** to a
standard "Features" section of a SaaS landing page.

## The Problem

A SaaS startup has a feature grid where icons are inconsistent: some are solid,
some are thin-lined, and they are different sizes. This makes the section feel
cluttered and unprofessional.

## The Solution (Applied Skill)

### 1. Visual Style Definition

- **Library:** Lucide Icons.
- **Style:** 2px Stroke, Outline only.
- **Color:** Primary Blue (#0055FF) on a Light Gray background.
- **Corners:** 2px rounded.

### 2. Sizing & Spacing

- **Icon Size:** 32px (Large scale for feature highlights).
- **Container:** 64px circular background with 10% opacity of the primary color.
- **Alignment:** Top-left aligned within the card.
- **Gap:** 16px between the icon container and the feature title.

### 3. Hierarchy & Metaphor

- **Feature 1 (Security):** `Shield` icon (Standard metaphor).
- **Feature 2 (Speed):** `Zap` (Lightning bolt) icon (Standard metaphor).
- **Feature 3 (Collaboration):** `Users` icon (Standard metaphor).

### 4. Accessibility Treatment

Since these icons are decorative (the title next to them explains the feature),
they are implemented as:

```html
<div class="icon-container" aria-hidden="true">
  <svg>...</svg>
</div>
```

## Resulting UI Pattern

| Feature         | Icon Metaphor | Stroke | Size | Acc. Role     |
| :-------------- | :------------ | :----- | :--- | :------------ |
| **Secure Data** | Shield        | 2px    | 32px | `aria-hidden` |
| **Fast API**    | Zap           | 2px    | 32px | `aria-hidden` |
| **Team Sync**   | Users         | 2px    | 32px | `aria-hidden` |

## Why this works

- **Consistency:** The uniform stroke weight and color create a "set" that feels
  part of the same brand.
- **Legibility:** 32px is large enough for users to quickly recognize the
  symbol while scanning.
- **Clarity:** Standard metaphors ensure the user doesn't have to think about
  what the "Shield" represents in the context of data.
