# Mobile UX Heuristics for Conversion

Foundational principles for designing growth-oriented mobile experiences.

## 1. The Thumb Zone (Reachability)
The "Thumb Zone" is the area of a mobile screen that can be easily reached with a thumb when a user is holding their phone with one hand.
*   **Natural:** The bottom-center area (where most CTAs should live).
*   **Stretch:** The top-center and side areas (requires slight hand movement).
*   **Hard:** The top corners (requires a second hand or a grip shift).
*   **Growth Application:** Place your "Add to Cart" or "Proceed" buttons in the Natural zone. Use a "Sticky Footer" pattern to keep them there during scrolling.

## 2. Fitts's Law (Mobile Application)
Fitts's Law states that the time required to move to a target is a function of the distance to and the size of the target.
*   **Growth Application:** On mobile, targets are not just "clicked"; they are "tapped." Because the thumb is less precise than a mouse, buttons must be larger (min 44px) and have sufficient "breathing room" (padding) to prevent accidental taps on neighboring elements.

## 3. Cognitive Load & The "Small Window"
Users on mobile are often in high-distraction environments (walking, commuting, multitasking).
*   **The Principle of Least Effort:** Reduce the number of decisions a user must make. Use smart defaults and clear, benefit-driven headlines.
*   **The "One Thing" Rule:** Every mobile viewport should ideally communicate exactly one idea or ask for one action. If a screen is cluttered with three different offers, the user will likely choose none.

## 4. Interaction Feedback (The "Limbic" Loop)
Unlike a mouse click, a tap provides no physical resistance.
*   **Visual Confirmation:** Every interactive element must change state (color, opacity, or subtle scale) immediately upon touch. This confirms to the user's brain that the action was registered, preventing "multi-tapping" and session abandonment.

## 5. Input Facilitation (The HTML5 Advantage)
The mobile keyboard is the single biggest point of friction in any mobile funnel.
*   **Contextual Keyboards:** Use specific input types to save the user from switching keyboard layouts:
    *   `type="tel"`: For phone numbers (numeric pad).
    *   `type="email"`: For email addresses (includes `@` and `.`).
    *   `type="url"`: For website addresses.
    *   `inputmode="decimal"`: For currency or prices.

## 6. The "Scent of Progress"
On a small screen, users lose context easily.
*   **Visual Cues:** Use progress bars in multi-step forms and "scroll-down" indicators on hero sections to signal that there is more value below the fold.
*   **Benefit-Driven Breadcrumbs:** If the user is in a deep funnel (e.g., Checkout), ensure the "Current Step" clearly states the benefit (e.g., "Step 2: Fast Shipping" rather than just "Shipping").
