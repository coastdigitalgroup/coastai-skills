---
name: mobile-conversion-optimization
description:
  Audit and optimize the mobile-specific user experience to close the "Mobile
  Conversion Gap." Trigger this skill when mobile conversion rates are
  significantly lower than desktop, or when mobile bounce rates on key landing
  pages are high.
---

# Mobile Conversion Optimization

## Purpose

The Mobile Conversion Optimization skill provides a systematic framework for
identifying and neutralizing friction points unique to the mobile experience.
While desktop users benefit from large screens and precise input (mouse), mobile
users face constraints in screen real estate, attention span, and "fat-finger"
interactions. This skill focuses on closing the **Mobile Conversion Gap**—the
common delta between desktop and mobile conversion rates—by optimizing for
portability, speed, and thumb-driven ergonomics.

## Use Cases

- Sites where mobile traffic is high (50%+) but mobile conversion rate (CVR) is
  less than 50% of the desktop CVR.
- Optimizing mobile-first landing pages for social media campaigns (TikTok,
  Instagram).
- Reducing mobile cart abandonment in e-commerce.
- Improving lead capture form completion on small screens.

## When NOT to Use

- **B2B Power Tools:** Complex, spreadsheet-heavy admin dashboards designed
  primarily for desktop workflows.
- **Pure App Environments:** Native mobile apps have different UX patterns and
  technical constraints better served by Mobile App Optimization.
- **Early-Stage Acquisition:** If the traffic source itself is the problem
  (e.g., accidental clicks from mobile games), CVR optimization won't fix it.

## Inputs

1. **Comparative Analytics:** Conversion Rate (CVR) and Bounce Rate broken down
   by device (Mobile vs. Desktop vs. Tablet).
2. **Mobile-Specific Session Recordings:** To observe where users struggle with
   tap targets or scrolling.
3. **Current Viewport Data:** The most common screen sizes and resolutions for
   your mobile audience.
4. **Checkout/Lead Funnel:** Screenshots or access to the mobile version of the
   primary conversion path.

## Outputs

1. **Mobile Friction Audit:** Identification of viewport-blocking elements,
   tiny tap targets, and "thumb-unfriendly" layouts.
2. **Optimized Mobile Wireframe/Specs:** Guidance on "Thumb-Zone" placement,
   sticky elements, and simplified navigation.
3. **Input & Form Optimizations:** Specific HTML5 input type requirements and
   labeling improvements for mobile keyboards.
4. **Performance & Speed Roadmap:** Recommendations to improve mobile-specific
   loading metrics (LCP, INP).

## Workflow

### 1. Calculate the Mobile Conversion Gap

Determine the priority level by comparing device performance.
- Formula: `(Mobile CVR / Desktop CVR) * 100`.
- **Target:** 60-70% for E-commerce; 80%+ for simple Lead Gen. If you are below
  these benchmarks, a significant gap exists.

### 2. Conduct the "Thumb-Zone" Audit

Overlay a "Thumb-Zone" map onto your key conversion pages.
- Are primary CTAs in the "Natural" reaching area (the bottom 2/3 of the screen)?
- Are secondary links tucked into the "Hard" to reach corners (the top corners)?
- Is the navigation menu reachable without shifting the hand grip?

### 3. Neutralize Mobile Friction Points

Audit and fix common mobile-only bottlenecks:
- **Sticky CTAs:** For long pages, implement a sticky "Buy" or "Sign Up" button
  at the bottom of the viewport so the user never has to scroll back up.
- **Tap Target Size:** Ensure all interactive elements are at least 44x44px.
- **Remove "Intrusive Interstitials":** Audit pop-ups and overlays. If they cover
  more than 25% of the screen or are hard to close, remove them.
- **Keyboard Optimization:** Ensure every field triggers the correct keyboard
  (e.g., `type="tel"` for phone, `type="email"` for email).

### 4. Streamline the Visual Narrative

Simplify the page for the "On-the-Go" user.
- **The "Squint Test":** If you squint at the mobile screen, is the one primary
  action still obvious?
- **Progressive Disclosure:** Hide secondary information behind "Read More"
  toggles or accordions to keep the vertical scroll manageable.
- **Mobile-Specific Assets:** Use images that are cropped for vertical viewing
  rather than just shrinking wide desktop photos.

### 5. Review Against Decision Rules

Verify that the mobile experience is optimized for speed, reachability, and
focus.

## Decision Rules

- **Reach Over Beauty:** If a design choice looks good on desktop but puts the
  primary button in the "Hard" thumb zone on mobile, prioritize reachability.
- **The "One-Handed" Rule:** A user should be able to complete the primary
  conversion action using only their thumb, without repositioning their phone.
- **Speed is CVR:** For mobile, every 100ms of latency can drop conversion by
  1%. Prioritize lightweight assets and native browser patterns over heavy
  scripts.
- **Sticky is Mandatory:** On any page longer than 1.5 viewports, the primary
  CTA must be persistent or repeat frequently.

## Constraints

- **Viewport Fidelity:** Optimizations must be tested on real mobile devices or
  high-fidelity simulators; desktop "Inspect" mode does not accurately simulate
  mobile touch behavior or network latency.
- **Technical Implementation:** Some sticky or fixed-position patterns may
  conflict with mobile OS UI (like bottom navigation bars) and require CSS
  adjustment for "Safe Areas."
- **Brand Consistency:** Mobile-specific simplifications must not strip away
  essential brand identity or legal requirements.

## Non-Goals

- Building a native mobile application.
- Improving mobile-specific SEO (AMP, mobile-friendly indexing).
- Deep technical performance tuning (server-side caching, CDN config), though
  front-end performance is relevant.

## Common Failure Patterns

- **The "Desktop Mirror":** Simply stacking desktop elements vertically without
  considering the hierarchy or reachability.
- **Tiny Touch Targets:** Placing links too close together, leading to "rage
  clicks" and accidental navigation.
- **The Keyboard Block:** Fixed headers or footers that overlap the input field
  when the mobile keyboard is active.
- **Hidden CTAs:** Forcing the user to scroll through a long hero image or
  paragraph before seeing the first button.
- **Heavy Media:** Using desktop-sized images that take seconds to load on
  mobile 4G/5G connections.

## Validation Criteria

- [ ] **Mobile-to-Desktop CVR Ratio:** Measure the improvement in the ratio after
  optimization.
- [ ] **Mobile Add-to-Cart (ATC) Rate:** Percentage of mobile visitors who start the
  conversion process.
- [ ] **Interaction to Next Paint (INP):** Verify that mobile interactions (taps,
  swipes) feel snappy and responsive.
- [ ] **Form Error Rate (Mobile):** Measure if errors decrease after implementing
  optimized input types and labels.
