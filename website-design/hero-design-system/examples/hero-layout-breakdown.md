# Hero Layout Composition Breakdown

This example demonstrates the application of the Hero Design System to three different brand scenarios, showing how the composition pattern changes based on content and goals.

---

## 1. The SaaS Product Hero (Split Layout)

**Problem:** A project management tool needs to explain its complex interface while maintaining a clear call to action.

### Composition Breakdown
- **Pattern:** Split 50/50 (Horizontal).
- **Layout:**
  - **Left Column (Content):** H1 Headline, Subhead, Primary Button (Primary), Secondary Button (Demo).
  - **Right Column (Asset):** A high-fidelity screenshot of the app dashboard, slightly tilted with a subtle shadow to create depth.
- **Visual Layering:**
  - **Background:** Clean #F8F9FA (Off-white).
  - **Midground:** A subtle geometric "mesh" gradient behind the app screenshot.
  - **Foreground:** High-contrast navy text for the headline.

### Why it works
The split layout allows the user to read the value proposition while simultaneously seeing the product in action. The tilt on the asset provides a sense of "interface as art" rather than a flat, boring screenshot.

---

## 2. The Marketing Landing Page (Centered Stack)

**Problem:** A luxury watch brand is launching a new collection and wants to focus on emotional impact and minimal distraction.

### Composition Breakdown
- **Pattern:** Centered Stack.
- **Layout:**
  - **Top:** A high-resolution, full-bleed background video of the watch being crafted.
  - **Center:** Large, elegant serif H1, a one-sentence subhead, and a single high-contrast "Explore Collection" button.
- **Visual Layering:**
  - **Background:** Full-bleed cinematic video.
  - **Legibility Layer:** A radial scrim (darkening the center) to ensure white text pops against varied video frames.
  - **Foreground:** Centered typography following a strict vertical rhythm.

### Why it works
The centered stack removes all peripheral noise, forcing the user to focus on the brand's visual story. The radial scrim ensures that as the video plays, the text remains WCAG compliant regardless of the background luminance.

---

## 3. The Enterprise Solutions Hero (Layered Offset)

**Problem:** A cybersecurity firm wants to appear modern and complex but trustworthy.

### Composition Breakdown
- **Pattern:** Layered Offset.
- **Layout:**
  - **Background:** Dark charcoal gray with a faint abstract "data flow" illustration.
  - **Foreground Left:** Typography and CTA container.
  - **Offset Layer:** Three overlapping "feature cards" that sit halfway between the center and the right edge, breaking the grid to create a sense of motion.
- **Visual Layering:**
  - **Background:** Solid dark color with low-opacity vector art.
  - **Midground:** Semi-transparent cards with backdrop-blur.
  - **Foreground:** Vibrant brand-colored CTA.

### Why it works
The layered offset creates a sense of sophistication and technological depth. By breaking the standard grid with overlapping cards, the design feels more dynamic and less like a standard template.

---

## Responsive Comparison

| Element | Desktop (1440px) | Tablet (768px) | Mobile (375px) |
| :--- | :--- | :--- | :--- |
| **H1 Size** | 4.5rem | 3.5rem | 2.5rem |
| **Composition** | Horizontal Split | Stacked (Asset Top) | Stacked (Asset Bottom) |
| **CTA Width** | Inset / Auto | Full-width | Full-width |
| **Asset Visibility** | 100% (Side) | 80% (Center) | 40% (Subtle background) |
