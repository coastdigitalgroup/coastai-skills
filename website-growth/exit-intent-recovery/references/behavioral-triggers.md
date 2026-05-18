# Behavioral Triggers & Exit Heuristics

Effective exit-intent recovery relies on understanding the technical signals of
abandonment and the psychological state of a user who is about to leave.

## 1. Technical Detection Methods

Since users don't "announce" they are leaving, we must rely on proxy signals.

### Desktop: Mouse Velocity & Vector

- **The Trigger:** The browser detects when the mouse cursor moves rapidly
  toward the "top" of the viewport (the browser chrome/tabs).
- **Heuristic:** A high-velocity movement toward the exit coordinates is a
  stronger signal than a slow drift, which might just be the user adjusting
  their window.

### Mobile: The "Anxious Scroll"

- **The Trigger:** Since there is no hover/mouse, we detect a rapid "Scroll Up"
  action.
- **Heuristic:** Users who have consumed a significant portion of a page and
  suddenly scroll up rapidly are often looking for the navigation bar to leave
  or are preparing to switch tabs.

### Universal: Tab Switching (Visibility API)

- **The Trigger:** Using the `visibilitychange` event to detect when the page is
  no longer the active tab.
- **Heuristic:** Triggering a small "Wait!" message in the _Title_ of the tab
  (e.g., "Don't forget your discount!") can pull the user back from a new tab.

## 2. Psychological Principles of Recovery

Why do exit-intent interventions work?

### Loss Aversion

Users are more motivated to avoid losing something than they are to gain it.

- **Application:** "Don't lose your 10% discount" is often more effective than
  "Get 10% off."

### The Zeigarnik Effect

People remember uncompleted or interrupted tasks better than completed ones.

- **Application:** Remind users of their "unfinished" progress. "You're only one
  step away from completing your profile!"

### Reciprocity

If you give someone something of value for free, they feel a subtle obligation
to return the favor.

- **Application:** Offer a high-quality free resource (Checklist, Guide) to
  build trust before asking for a sale.

### Choice Architecture (The "Nudge")

Sometimes users leave because they are overwhelmed by too many choices.

- **Application:** The exit-intent popup should simplify the choice to a single,
  binary decision: "Yes, I want the value" or "No, I'll pass."

## 3. Heuristics for "High-Momentum" Zones

Interventions must be carefully suppressed in certain areas to avoid "Negative
Momentum."

- **The Checkout Threshold:** If a user has already entered their email or
  credit card info, do NOT show a standard exit popup. Use a "Save Progress" or
  "Trust" message instead.
- **The Successful Action:** If a user just completed a "Sign up" or "Purchase,"
  suppress all exit popups to allow the "Success" state to sink in.
- **The Search State:** If a user is actively typing in a search bar, delay the
  exit-intent logic until they have finished their interaction.

## 4. Visual Scannability of Interventions

When a user is exiting, you have < 2 seconds to capture their attention.

- **The F-Pattern Anchor:** Place the most important benefit in the top-left
  quadrant of the popup.
- **Visual Isolation:** Use a "Darkness" backdrop (overlay) to dim the rest of
  the site and force focus on the intervention.
- **Micro-Copy Urgency:** Use words like "Wait," "Before you go," or "Last
  chance" to trigger a momentary pause in the user's exit velocity.
