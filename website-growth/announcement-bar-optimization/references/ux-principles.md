# UX Principles for Announcement Bars

To optimize announcement bars for growth, it is essential to understand the underlying psychological and UX principles that govern how users interact with top-of-page notifications.

## 1. Banner Blindness & Salience
Users have been trained by years of exposure to ads to ignore anything that looks like a "banner." To overcome this:
- **Optical Contrast:** Use colors that are outside the primary site palette but still within brand guidelines.
- **Motion (Used Sparingly):** A subtle entrance animation or a rotating message can catch the eye, but avoid aggressive blinking or constant movement.
- **Positioning:** Because the bar is at the very top, it is the first thing a browser processes. It must be high-quality and integrated into the UI.

## 2. Loss Aversion (Shipping Thresholds)
Shipping threshold bars are effective because they leverage the "Endowment Effect" and "Loss Aversion."
- When a user sees they have "unlocked" something or are "close" to it, the psychological pain of losing that benefit (paying for shipping) outweighs the cost of adding another small item to the cart.
- **Benefit:** Increases Average Order Value (AOV) by encouraging "filler" item purchases.

## 3. Cognitive Load & Scannability
The announcement bar is a "Utility" element. It should not require deep reading.
- **The 60-Character Rule:** Most users can process a short sentence of ~10 words or 60 characters in a single glance without slowing down their scan of the main page.
- **Link Scent:** The text in the bar must provide a strong "scent" of where the user is going. If the bar says "Winter Sale," the landing page must immediately show winter products and sale prices.

## 4. Accessibility Checkpoints (WCAG 2.2)
- **Status Regions (4.1.3):** Use `role="status"` so screen readers announce the update without moving focus.
- **Contrast (1.4.3):** Ensure a minimum contrast of 4.5:1.
- **Interactive Targets (2.5.8):** Ensure dismissal 'X' and CTA links are large enough (min 24x24px, ideally 44x44px).

## 5. Persistence vs. Annoyance
- **Diminishing Returns:** A message shown 10 times without interaction becomes "noise."
- **Dismissal Persistence:** Respecting a user's choice to close the bar builds trust. If they close a "Newsletter Signup" bar, don't show it to them again on the next page load.
