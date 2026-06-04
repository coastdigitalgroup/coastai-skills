# Product Review Section Breakdown

This example demonstrates the **Review and Rating System** applied to a
high-intent e-commerce product page.

## The Snapshot (Aggregate Summary)

Located at the top of the reviews section, this area provides the "Trust
Baseline."

- **Total Score:** "4.7" (H2 size, bold)
- **Star Visualization:** 5 stars (4 filled, 1 half-filled), color: `--gold-500`
- **Review Count:** "Based on 1,248 reviews" (Muted text)
- **Distribution Histogram:**
  - 5 Stars: 75% (Greenish-gold bar)
  - 4 Stars: 15%
  - 3 Stars: 5%
  - 2 Stars: 3%
  - 1 Star: 2% (Gray bar)

## The Filter & Sort Row

- **Sort Dropdown:** Options: "Most Helpful" (Default), "Newest," "Rating: High
  to Low."
- **Filter Chips:**
  - "With Images"
  - "Verified Only"
  - "Mentioned: 'Battery Life'" (Dynamic keywords)

## The Review Card (Individual Entry)

A single entry in the list, designed for scannability.

### Anatomy
1. **Header Zone:**
   - Stars (Size: 16px)
   - Badge: "Verified Purchase" (Small, green check icon + text)
   - Date: "Oct 12, 2023" (Right-aligned, muted)
2. **Title Zone:**
   - "Exceeded my expectations!" (H4, semi-bold)
3. **Body Zone:**
   - "The battery life is incredible. I've been using it for three days
     straight..." (Line-height: 1.5, max-width: 60ch)
4. **Visual Zone (Optional):**
   - Thumbnail of a user-uploaded photo (48x48px, rounded corners)
5. **Footer Zone (Feedback):**
   - "Was this helpful?" (Text)
   - Thumbs Up/Down icons (Interactive)
   - "Report" link (Tertiary)

## Responsive Strategy

| Component | Desktop | Mobile |
| :--- | :--- | :--- |
| **Summary** | Split: Left (Score) / Right (Bars) | Stacked: Score Top / Bars Below |
| **Filters** | Horizontal row | Scrollable horizontal pill-tray |
| **Review Card** | 24px padding, clear borders | 16px padding, border-bottom only |

## Why it works
The combination of **numerical data** (4.7) and **visual distribution** (the
bars) allows the user to quickly see that the majority of people are satisfied.
The **Verified Purchase** badge adds layers of trust, while the **Filtering**
allows users to seek out the specific information they care about most (e.g.,
"Battery Life").
