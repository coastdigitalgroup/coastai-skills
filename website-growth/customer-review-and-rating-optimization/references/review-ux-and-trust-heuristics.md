# Customer Review & Rating UX Heuristics and Trust Frameworks

This reference document outlines the psychological principles, UX heuristics, visual merchandising patterns, and regulatory standards for optimizing customer reviews and star ratings on e-commerce Product Detail Pages (PDPs).

---

## 1. Psychological Heuristics & Consumer Trust Patterns

### The Rating Distribution Sweet Spot (4.2 – 4.8 Stars)
- **The Perfection Paradox**: Products with a perfect 5.0 star rating across a large volume of reviews consistently trigger consumer skepticism and suspicion of fake or paid reviews.
- **Conversion Peak**: Behavioral studies indicate that conversion probability peaks for products with average star ratings between **4.2 and 4.8 stars**.
- **The Value of Controlled Negative Feedback**: Mildly critical 3-star or 4-star reviews (e.g., "Great jacket, but shipping took 5 days") increase the perceived credibility of all 5-star reviews on the page.

### The "Body Twin" & Identity Matching Principle
- Shoppers do not evaluate reviews in a vacuum; they search for reviewers who match their physical dimensions, lifestyle, or specific situation.
- Displaying explicit reviewer metadata (e.g., Height, Weight, Usual Size, Skin Type, Usage Environment) reduces cognitive friction by allowing shoppers to quickly find their "identity twin" and trust their sizing advice.

### Cognitive Load & Unstructured Review Paralysis
- Reading unformatted, unfilterable blocks of text creates high cognitive load.
- When faced with 100+ unstructured reviews, shoppers default to two failure behaviors:
  1. **Bouncing to third-party search engines** (e.g., searching Google/Reddit/TikTok for real opinions), risking session loss.
  2. **Cart abandonment** due to unaddressed micro-doubts regarding quality or fit.

---

## 2. Review UI & Information Architecture Heuristics

### Above-the-Fold Placement
- **Location**: Star graphic + aggregate numeric rating + total review count must sit directly under the product title, above price and color/size selectors.
- **Interaction**: Must be an interactive anchor link that smoothly scrolls the viewport directly to the review section.
- **Key Metric Highlight**: Accompany the star rating with an aggregate category metric where applicable (e.g., `★ 4.7 (412) | 86% say True to Size`).

### Rating Summary Card & Histogram Architecture
- **Distribution Bar Chart**: Always display a 5-star to 1-star percentage breakdown histogram.
- **Interactive Filtering**: Clicking any star row in the histogram (e.g., 2-star bar) must instantly filter the active review list to show only reviews with that star rating.
- **Primary CTA**: Include a distinct "Write a Review" button in the summary card header to encourage organic collection.

### Attribute Spectrum Sliders
- Visual spectrum bars summarize non-star product performance metrics:
  - **Fit Spectrum**: `Runs Small ◄─── True to Size ───► Runs Large`
  - **Quality Spectrum**: `Below Average ◄─────────────► Premium Quality`
  - **Comfort Spectrum**: `Rigid ◄─────────────► Ultra Comfortable`

### Search & Faceted Filter System
- **Inline Search**: A real-time text filter allowing users to query review body text for specific terms (e.g., "wash", "durability", "pockets", "battery life").
- **Smart Keyword Tags**: Auto-generated or curated pill buttons based on top recurring topics in reviews (e.g., `[With Photos]`, `[True to Size]`, `[Warm]`, `[Fast Shipping]`).
- **Demographic / Attribute Filters**: Multi-select dropdowns enabling users to filter by specific reviewer metadata (e.g., Height: `5'8" - 5'10"`, Size Purchased: `Large`).

---

## 3. Media UGC Merchandising & Lightbox UX

### Top-of-Widget Media Gallery
- Position a horizontal scrolling ribbon of customer-uploaded photos and videos directly below the review summary card.
- Prioritize high-resolution, well-lit customer images over blurry or dark uploads.

### Full-Screen Lightbox Modal Mechanics
- Clicking any UGC thumbnail opens a full-screen overlay displaying:
  1. High-resolution customer media (with zoom/pan capability).
  2. Reviewer name, "Verified Buyer" badge, star rating, and review title.
  3. Customer profile metadata (Height, Weight, Size, Skin Type).
  4. Exact product variant shown in the photo (e.g., "Variant: Olive Green / Size M").
  5. Direct "Add Variant to Cart" CTA within the lightbox modal.

---

## 4. FTC & Regulatory Compliance Standards for Customer Reviews

### FTC Anti-Deception & Review Suppression Rules
- **Prohibition of Review Gating**: Merchants cannot screen customers with preliminary star selection inputs (e.g., "How was your experience? 1-3 stars send to private feedback, 4-5 stars send to public review form"). All customers must have equal access to leave a public review regardless of rating.
- **No Selective Suppression**: Hiding or failing to publish negative reviews (1-star or 2-star) solely because of their rating violates FTC guidance and exposes merchants to severe civil penalties.
- **Mandatory Incentive Disclosures**: Reviews collected via sweepstakes, free samples, discounts, or loyalty points must display explicit disclosure badges on the review card (e.g., `Incentivized Review` or `Reviewed as part of a sweepstakes`).
- **Verified Purchaser Authenticity**: The "Verified Buyer" badge must be strictly reserved for orders verified against store purchase records. Unverified public submissions must not display a verified badge.

---

## 5. Post-Purchase Review Solicitation Best Practices

### Delivery-Triggered Timing
- **Hard Goods / Apparel**: Send review request **7–10 days post-delivery** (not post-purchase) to ensure the customer has received and worn the item.
- **Skincare / Supplements**: Send review request **21–30 days post-delivery** to allow sufficient time for real product results to manifest.

### Frictionless Submission Form Design
1. **Single-Click Email Entry**: In-email star rating graphics that launch a pre-populated web submission form.
2. **Structured Inputs First**: Prompt for attribute questions (Fit, Quality, Body Measurements) before asking for open-ended text.
3. **Photo/Video Upload Incentives**: Offer tiered reward incentives for adding media (e.g., "Leave a review for 50 points; add a photo/video for 150 points").
