# Announcement Bar Audit & Optimization Checklist

Use this checklist to evaluate the effectiveness of a sitewide announcement bar and identify opportunities for conversion lift.

## 1. Visibility & Clarity (The 3-Second Test)
- [ ] **Instant Identification:** Is it clear what the offer/announcement is within 3 seconds?
- [ ] **Visual Contrast:** Does the bar background color contrast sufficiently with the header and hero?
- [ ] **Readability:** Is the font size at least 14px (desktop) / 12px (mobile)?
- [ ] **Contrast Ratio:** Does the text-to-background contrast meet WCAG AA (4.5:1)?

## 2. Messaging & Copy
- [ ] **The "What's in it for me?":** Does the copy lead with a benefit (e.g., "Save 20%") rather than an internal update?
- [ ] **Action Verb:** Does the CTA use a strong verb (Shop, Get, Join, Claim)?
- [ ] **Conciseness:** Is the message under 60 characters (to avoid wrapping on mobile)?
- [ ] **Urgency:** If the offer is time-limited, is the deadline or a countdown present?

## 3. Mobile Ergonomics
- [ ] **Height Check:** Does the bar take up less than 15% of the mobile screen height?
- [ ] **Interactive Safety:** Is the bar far enough from the hamburger menu to prevent accidental taps?
- [ ] **Clickability:** Is the entire bar a link, or is there a clear "Shop" button that is easy to tap?
- [ ] **Responsive Flow:** Does the text wrap or truncate gracefully on small viewports (320px)?

## 4. Interaction & Logic
- [ ] **Dismissal:** Is there a clear 'X' to close the bar for users who aren't interested?
- [ ] **Persistence:** Does the bar stay closed (via `localStorage` or `cookies`) once dismissed?
- [ ] **Dynamic States:** Does the bar update based on cart contents (e.g., shipping thresholds)?
- [ ] **Link Integrity:** Does the bar link directly to a relevant landing page (not just the homepage)?

## 5. Performance & Technical
- [ ] **Cumulative Layout Shift (CLS):** Does the bar load instantly without "pushing" the rest of the content down after it has already rendered?
- [ ] **Accessibility (ARIA):** Does the container have `role="status"` or `aria-label="Announcement"`?
- [ ] **Tracking:** Is there a unique UTM parameter or event trigger on the bar's link to measure CTR?

---

## Strategic Optimization Ideas
*   **Tiered Messaging:** Show "First purchase" offer to new users; "New Arrivals" to returning users.
*   **Threshold Math:** Instead of "Free Shipping over $50," use "You're only $X away from Free Shipping."
*   **Geotargeting:** "Free shipping to [User Country]" increases trust for international buyers.
*   **Countdown Exit:** Use a countdown timer for the last 4 hours of a flash sale to drive peak volume.
