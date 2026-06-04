# Example: Product Review & Rating Breakdown

This example demonstrates the Review and Rating UI System applied to a high-volume e-commerce product page. It shows how the system balances aggregate data with individual qualitative feedback.

## 1. Aggregate Rating Summary (The "Snapshot")

Located at the top of the reviews section, this provides immediate context before the user dives into the details.

| Component | Visual Treatment | Purpose |
| :--- | :--- | :--- |
| **Global Average** | Large 48px Bold Text ("4.7") | Immediate value communication. |
| **Star Row** | 5 Amber Stars (4 full, 1 three-quarter) | Visual reinforcement of the number. |
| **Total Count** | Muted 14px Text ("1,240 Reviews") | Establishes statistical significance. |
| **Distribution** | Horizontal bars for 5, 4, 3, 2, 1 stars | Shows the "sentiment spread." |
| **CTA** | "Write a Review" Button (Secondary) | Encourages participation. |

### Visual Layout
```text
[ 4.7 ]  ★★★★¾  Based on 1,240 reviews
---------------------------------------
5 Star [ |||||||||||||||||||| 85% ]
4 Star [ ||||                10% ]
3 Star [ |                    2% ]
2 Star [ |                    1% ]
1 Star [ |                    2% ]
```

## 2. Individual Review Card

Each review is a modular unit using a vertical stack on mobile and a hybrid layout on desktop.

### Anatomy Breakdown
- **Sidebar (Desktop) / Top Row (Mobile):**
  - **User:** "Sarah M." (Bold)
  - **Status:** [✓ Verified Purchase] (Green text/icon)
  - **Location:** "Seattle, WA" (Muted)
- **Main Content:**
  - **Rating:** ★★★★★ (Immediate context)
  - **Date:** "Oct 24, 2023" (Muted)
  - **Headline:** "Game changer for my morning routine!" (Bold H4)
  - **Body:** "I was hesitant at first, but after a week of use, I can't imagine going back..."
- **Media:** 3x Square thumbnails of the product in use.
- **Actions:**
  - "Helpful? Yes (42) No (2)"
  - "Report" (Link)

## 3. Discovery & Sorting Controls

Placed between the Summary and the Review List to manage cognitive load.

- **Sort Dropdown:** "Sort by: Most Relevant" (Default), "Newest," "Highest Rating."
- **Filter Chips:**
  - [✓ Verified Only]
  - [With Images]
  - [5 Stars]
  - [Critical]

## 4. Responsive Adaptation

### Desktop (1200px+)
- Aggregate Summary sits on the left (33% width).
- Review List and Sorting sit on the right (66% width).
- Media thumbnails are 80x80px inline.

### Mobile (<768px)
- Aggregate Summary is full-width at the top.
- Distribution bars become narrower.
- Review metadata (User/Status) stacks above the star rating.
- Media thumbnails wrap to a new line below the text.
- Sorting/Filtering becomes a single "Filter & Sort" button that opens a bottom drawer.
