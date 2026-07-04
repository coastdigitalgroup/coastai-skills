# Privacy & Consent Design Standards

This reference guide provides standard definitions for data categories and visual guidelines for privacy-related UI components.

## 1. Standard Data Categories

When designing a Preference Center, use these industry-standard definitions to ensure user understanding:

| Category | Typical Name | Purpose | Opt-out Allowed? |
| :--- | :--- | :--- | :--- |
| **Category 1** | Strictly Necessary | Security, login, session management, shopping cart. | No |
| **Category 2** | Functional | Language settings, theme preferences, font sizes. | Yes |
| **Category 3** | Performance / Analytics | Page views, scroll depth, error reporting. | Yes |
| **Category 4** | Targeting / Advertising | Personalized ads, social media tracking, retargeting. | Yes |

---

## 2. Visual Component Guidelines

### The Toggle Switch
Privacy settings are binary. Use a toggle switch instead of a checkbox for immediate visual feedback.
- **Active State:** Brand Color (e.g., Blue/Green).
- **Inactive State:** Neutral Gray.
- **Size:** Minimum 44px wide for touch accessibility.
- **Labeling:** Place the label to the left of the switch; use a "Check" icon inside the switch for added clarity if space allows.

### The Privacy Trigger (Floating)
If using a floating trigger (The "Shield"):
- **Size:** 32px - 48px circular button.
- **Placement:** Bottom-left is standard for privacy (to avoid conflict with bottom-right Chat Widgets).
- **Z-index:** Must be lower than the modal but higher than standard page content (e.g., `z-index: 999`).

---

## 3. Anti-Patterns (Dark Patterns) to Avoid

To maintain high trust and comply with strict regulations (like GDPR), avoid these common design failures:

1. **Hidden "Reject" Button:** Placing "Accept All" in a large button and "Reject" in a tiny link hidden in the text.
2. **Confusing Toggles:** Using colors like Green for "Off" or Red for "On".
3. **Double Negatives:** Using labels like "Check here to opt-out of not receiving tracking."
4. **The "Interruption Loop":** Re-showing the banner on every page load if the user dismisses it without choosing.
5. **Nudging:** Using "guilt-tripping" copy like "No, I prefer a worse experience" for the reject button.

---

## 4. Accessibility Check (WCAG 2.1)

- **Keyboard Trap:** When the Preference Modal is open, the user must not be able to "Tab" out of the modal into the background page.
- **Contrast:** Toggles and buttons must meet a **3:1** ratio for graphical objects and **4.5:1** for text.
- **ARIA:** Use `aria-describedby` to link the category toggle to its long-form description.
