# Hero Layout Breakdown

This example demonstrates the application of the Hero Design System to two distinct use cases: a B2B SaaS landing page and a Brand Portfolio.

## Case 1: B2B SaaS (Split Layout)

**Problem:** A project management tool needs to explain a complex feature set while maintaining a high-energy, professional look.

**Design Solution:**
- **Composition:** 50/50 Split. Content (Left) / UI Screenshot (Right).
- **Hierarchy:**
    - **H1:** "Manage projects without the chaos" (64px, Extra Bold).
    - **Subhead:** "The all-in-one workspace for teams that need to stay in sync." (20px, Regular).
    - **CTA:** Primary Button (Filled, Indigo) + Secondary Link (Watch Demo).
- **Visual Layering:**
    - The UI screenshot on the right is inset with a subtle 24px drop shadow to create depth.
    - Background is a clean, neutral gray (`#F9FAFB`) to keep focus on the product.
- **Mobile Adaptation:**
    - Stacks vertically: Text on Top, Screenshot on Bottom.
    - H1 scales down to 40px using `fluid-typography-system`.

## Case 2: Brand Portfolio (Centered Stack)

**Problem:** A high-end architectural firm wants an emotional, immersive introduction to their work.

**Design Solution:**
- **Composition:** Centered Stack on Full-Bleed Media.
- **Hierarchy:**
    - **H1:** "Space for Life." (80px, Serif, Centered).
    - **Subhead:** "Award-winning residential architecture since 1994." (18px, All-caps, Letter-spaced).
    - **CTA:** Single Ghost Button (White Outline, Centered).
- **Visual Layering:**
    - **Background:** 4K video loop of a sunlit interior.
    - **Text Protection:** A 30% linear black-to-transparent gradient applied from the bottom up to ensure the white text remains legible regardless of video content.
- **Mobile Adaptation:**
    - Video is replaced with a high-quality static portrait crop (4:5) to save bandwidth.
    - Navigation "condenses" to a hamburger menu to give more space to the H1.

## Visual Summary

| Element | B2B SaaS (Split) | Brand Portfolio (Centered) |
| :--- | :--- | :--- |
| **Primary Goal** | Clarity & Utility | Emotion & Atmosphere |
| **Grid Pattern** | 12-column grid, 6/6 split | Single-column centered |
| **Text Alignment** | Left-aligned | Center-aligned |
| **Media Role** | Informational (How it works) | Contextual (The vibe) |
| **Accessibility** | High (High-contrast text on solid) | Medium (Requires scrim/overlay) |
