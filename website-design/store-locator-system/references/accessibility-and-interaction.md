# Accessibility & Interaction Reference: Store Locator System

This reference sheet covers WCAG 2.1/2.2 AA and AAA compliance rules, keyboard navigation patterns, touch-screen ergonomics, and assistive technology specifications for designing store and physical location locator interfaces.

---

## 1. Keyboard Navigation Rules (Non-Visual Wayfinding)

Since interactive maps rely heavily on pointer devices (mice and touch screens), keyboard users require an independent, sequential path to access all location data without relying on map clicks.

| Keyboard Trigger | Element Context | Expected Action |
|---|---|---|
| `Tab` | Locator page entry | Navigates from page header directly to the **Skip Link**. |
| `Enter` / `Space` | Focused Skip Link | Immediately moves focus to the first card in the Scroll List (`#locator-results-list`), bypassing map rendering. |
| `Tab` | Search Input field | Standard text entry. |
| `Arrow Down` / `Up` | Search Autocomplete Menu | Cycles focus through address suggestions. |
| `Enter` | Autocomplete Item | Selects suggestion and triggers nearby search. |
| `Tab` | Location Card | Enters the scroll list. Moves focus to the first card container (`tabindex="0"`). |
| `Tab` (inside card) | Directions/Call Buttons | Enters card interactive elements in logical source order. |
| `Escape` | Expanded Detail View Panel | Closes the detailed store view and returns focus to the active list card. |

---

## 2. Screen Reader ARIA & Announcement Specifications

Use explicit ARIA attributes and live regions to keep non-visual users aware of spatial and search state changes.

### A. Dynamic Search Announcements (`aria-live`)
When the results list updates following a user search, text filters, or radius changes, the UI **must** trigger a vocal confirmation. Do not use `aria-live="assertive"` as it cuts off current screen reader speech. Use `aria-live="polite"`.

```html
<!-- Container markup -->
<div class="visually-hidden" aria-live="polite" id="locator-live-announcer">
  <!-- JavaScript updates this inner text -->
  Search complete. 8 locations found within 25 miles of Portland, Oregon.
</div>
```

### B. List-to-Map Selection Synchronization (`aria-selected`)
When a card is active (meaning its matching map marker is selected/opened):
- Add `aria-selected="true"` to the active card's container.
- Update other cards to `aria-selected="false"`.

### C. Icon Labels & Visual Actions
- Ensure the geolocation "crosshair" button has an descriptive text label: `aria-label="Find locations near my current position"`.
- Make sure action icons (like a phone handset or arrow sign) have their SVG `aria-hidden="true"` and are wrapped in text-bearing anchors (e.g., `Call Store`).

---

## 3. Touch ergonomics & Touch Target Sizes (WCAG 2.2 SC 2.5.8)

On touch-sensitive viewports, design locator controls to prevent accidental activation and thumb strain.

- **Main CTAs (Directions, Call, Search):** Size buttons to a minimum height and width of `48px` on mobile layouts.
- **Filter Chips and Checkboxes:** Must be spaced with at least `8px` of margin-gap, ensuring touch points do not overlap. Minimum touch target size must meet the **WCAG 2.2 SC 2.5.8 Target Size (Minimum)** criteria of at least `24x24px`.
- **Close Triggers / Cross Icons:** Place close buttons (e.g., on map popups or slide-out detail panels) in corners with a transparent hit-box container measuring at least `44x44px`, regardless of the size of the visual cross icon itself.

---

## 4. Mobile Scroll-Trap Avoidance Protocols

One of the most common user frustrations on mobile store finders is the "map scroll trap." Any drag gesture inside the map boundaries zooms or pans the map rather than scrolling the page, locking the user in place.

### The Two-Finger Pan Solution (Multi-Finger Touch)
Ensure that single-finger drags over the map frame pass through to scroll the viewport. Map panning must require **two-fingers**.

- **Leaflet Implementation Config:**
  ```javascript
  const map = L.map('map', {
    dragging: !L.Browser.mobile, // Disable dragging on mobile or use gesture-handling
    tap: !L.Browser.mobile
  });
  ```
- **Mapbox GL JS Implementation Config:**
  ```javascript
  map.dragPan.enable();
  // On mobile screens, trigger a dynamic gesture handler overlay
  ```

---

## 5. Visual Contrast Guardrails (WCAG 2.1 SC 1.4.3)

Store locators often use custom maps which can result in low text readability if not styled carefully.

- **Map Pins / Markers:** Ensure standard map pins have a minimum contrast of `3:1` against the overall map background color.
- **Card Badges:** Low-contrast badges (e.g., gray background with white text) fail readability standards. Ensure labels like "Corporate" or "Open Now" feature dark text on light backgrounds or meet the `4.5:1` ratio.
- **Map Popup Text:** Backgrounds of map popups must be solid white or solid dark slate to guarantee maximum contrast against popup content. Do not use semi-transparent backdrops over the map canvas.
