# Example: Layered Consent Flow Breakdown

This example demonstrates a high-trust, two-stage consent experience that balances a clean initial UI with granular user control.

## Stage 1: The Initial Entry (Floating Box)

When the user first arrives, a non-intrusive but clear floating box appears in the bottom-left corner.

### Visual Layout
- **Location:** Bottom-left, 24px from edges.
- **Anatomy:**
    - **Icon:** Subtle "Shield" or "Lock" icon for category recognition.
    - **Copy:** "We use cookies to improve your experience and analyze our traffic."
    - **Primary Action:** "Accept All" (Solid Brand Button)
    - **Secondary Action:** "Reject Non-Essential" (Outline Button)
    - **Tertiary Action:** "Manage Preferences" (Text Link)

### Design Logic
- **Vertical Stack (Mobile):** On mobile, the actions stack vertically to ensure 44px touch targets.
- **Visual Balance:** The "Reject" and "Accept" buttons share the same size and border-radius to avoid "Dark Pattern" accusations.

---

## Stage 2: The Preference Center (Granular Modal)

If the user clicks "Manage Preferences," a centered modal opens.

### Category Breakdown
The preference center groups cookies into logical, user-friendly buckets:

| Category | Status | Description |
| :--- | :--- | :--- |
| **Strictly Necessary** | Always ON | Required for the site to function (Security, Login). |
| **Functional** | Optional | Remember your settings (Language, Region). |
| **Performance/Analytics** | Optional | Help us understand how the site is used. |
| **Marketing** | Optional | Used to show relevant ads on other sites. |

### Visual Affordances
- **Toggles:** Large, accessible toggle switches (32px x 56px).
- **Expansion:** Each category has a "Show Details" chevron that reveals the specific cookies, their provider, and their duration.
- **Footer Actions:**
    - "Save My Choices" (Primary)
    - "Accept All" (Secondary/Ghost)

---

## Stage 3: The Persistent Trigger (The "Privacy Anchor")

Once the user saves, the banner disappears, and a persistent anchor remains.

### Implementation
- **Visual:** A small circular button (32px) with a shield icon.
- **Location:** Bottom-left (where the banner was).
- **Behavior:** Re-opens the Stage 2 modal instantly.
- **Tooltip:** "Privacy Settings" appears on hover.

---

## Key Benefits of this Flow
1. **Reduces Anxiety:** Clear labeling and "Reject All" prominence build trust immediately.
2. **Accessible:** Focus is trapped within the modal, and toggles are keyboard-operable.
3. **Flexible:** Adapts from a "small box" to a "detailed settings" view without overwhelming the user.
