# Mobile Friction & Reachability Audit

Use this checklist to identify and prioritize friction points in your mobile conversion funnel.

## 1. Reachability & The "Thumb Zone"
- [ ] **Primary CTA Location:** Is the main button located in the bottom 2/3 of the screen?
- [ ] **Sticky Footer:** On pages longer than 1.5 viewports, is there a persistent "Buy/Sign Up" button?
- [ ] **Navigation Reach:** Can the main menu and search triggers be reached without repositioning the hand?
- [ ] **Critical Links:** Are important links (e.g., "Privacy Policy" in a form) large enough to tap easily (min 44x44px)?

## 2. Input & Form Ergonomics
- [ ] **Input Types:** Does the email field use `type="email"`? Does the numeric field use `type="number"` or `type="tel"`?
- [ ] **Autofill Support:** Are `autocomplete` attributes (e.g., `given-name`, `email`, `postal-code`) implemented?
- [ ] **Inline Validation:** Do error messages appear *above* or *immediately below* the field to avoid being covered by the keyboard?
- [ ] **Label Visibility:** Are labels placed above the fields (not as placeholders) so they remain visible when the user starts typing?

## 3. Viewport & Interruption Control
- [ ] **Pop-up Audit:** Do any non-critical overlays cover more than 20% of the screen?
- [ ] **The "Close" X:** Are close buttons for modals at least 44px wide/high and placed in a reachable area?
- [ ] **Keyboard Overlap:** When the keyboard is active, is the active input field still fully visible?
- [ ] **Horizontal Scroll:** Ensure there is no accidental horizontal scrolling (often caused by over-wide images or code blocks).

## 4. Visual & Cognitive Load
- [ ] **The Squint Test:** Squint at the screen. Is the "Next Step" still the most obvious thing?
- [ ] **Image Aspect Ratios:** Are images optimized for vertical viewing? (e.g., no wide banners with tiny text).
- [ ] **Progressive Disclosure:** Are secondary details (technical specs, deep footers) hidden behind toggles or accordions?
- [ ] **Text Size:** Is the body text at least 16px to ensure readability without zooming?

## 5. Performance (Perceived Speed)
- [ ] **Button Feedback:** Do buttons provide immediate visual feedback (active state) when tapped?
- [ ] **Skeleton States:** Does the page show a skeleton loader for dynamic content to prevent layout shifts?
- [ ] **LCP Asset:** Is the "Above-the-Fold" image prioritized (using `fetchpriority="high"`)?

---

### Audit Scoring
*   **0-5 "No" answers:** Excellent mobile experience.
*   **6-10 "No" answers:** Significant friction. Expect a large Mobile Conversion Gap.
*   **11+ "No" answers:** Critical failure. The mobile experience is likely deterring customers.
