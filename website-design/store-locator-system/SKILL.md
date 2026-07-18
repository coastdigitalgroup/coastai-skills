---
name: store-locator-system
description:
  Design and implement a systematic framework for physical location discovery,
  managing spatial split-pane layouts, interactive map-to-list synchronization,
  and accessible keyboard navigation fallbacks.
---

# Store Locator System

## Purpose

The Store Locator System provides a methodology for designing physical location discovery interfaces (such as branch finders, retail locators, dealer networks, or medical clinic finders). This system defines the **spatial composition**, **responsive adaptation**, **interaction synchronization**, and **accessibility guardrails** needed to bridge digital searches with physical destinations. It ensures users can find locations near them, evaluate store specifics, and navigate there without cognitive overload, layout instability, or accessibility blocks.

## Use Cases

- **Retail & Dealer Networks:** Guiding customers to physical storefronts, partner retailers, or authorized service centers.
- **Healthcare & Clinics:** Helping patients find nearby urgent care facilities, hospitals, or specialized medical offices.
- **Financial Institutions:** Displaying ATM networks and branch locations with specific service capabilities (e.g., drive-thru, notary public).
- **Restaurant & Food Chains:** Assisting customers in finding nearby venues, checking real-time operating status, and launching pickup/delivery orders.

## When NOT to Use

- **Single-Location Businesses:** If a company has only one or two physical offices, a full locator interface is overkill. A simple contact page with an embedded static map is sufficient (see `site-navigation-system` or contact page guidelines).
- **Purely Digital/E-Commerce Brands:** Businesses with no physical presence or physical pick-up points.
- **Dynamic Logistics and Routing:** Advanced ride-sharing or real-time delivery tracking applications require continuous GPS tracking and dynamic routing, which fall under specialized GIS/real-time transit systems.

## Inputs

1. **Location Metadata Inventory:** Coordinate sets (latitude/longitude), physical address, contact details (phone, email), operational hours, and specific location features or services (facets).
2. **User Location Signal:** Geolocation API availability, user-entered postal/zip code, or city/state text inputs.
3. **Map Platform Capabilities:** Constraints and custom styling parameters of the underlying map provider (e.g., Google Maps API, Mapbox GL JS, Leaflet).
4. **Primary User Goals:** Are users primarily looking to visit immediately (need directions and hours), contact the location (need phone), or verify stock (need connection to inventory)?

## Outputs

1. **Spatial Layout Blueprint:** Responsive spatial layout specs (Desktop split-pane proportions vs. Mobile stacked tabbed panels).
2. **Anatomy Specification:** Detailed design of the Location Card, Search/Filter Header, and Map Markers.
3. **Interaction & State Map:** Defined behavior for marker click synchronization, hover states, list loading indicators, and card/marker correlation.
4. **Accessibility Landmark & Keyboard Map:** Defined focus-trap mechanisms for detail views, screen reader aria-live announcements, and non-visual map navigation paths.

## Workflow

### 1. Establish the Spatial Composition

Design the spatial relationship between the map and the location listing:

- **Desktop Layout (Split-Pane):** Use a split-screen design.
  - **Sidebar Pane (35% to 40% width):** Place on the left (for LTR languages) to establish it as the starting point of reading hierarchy. It must scroll independently of the main page, keeping search input and location lists reachable.
  - **Map Pane (60% to 65% width):** Set as a fixed, persistent element on the right.
- **Mobile Layout (Toggleable Tabs):** Since both map and list cannot fit side-by-side on narrow viewports, implement a toggle bar at the top or bottom of the screen:
  - **"List View" Tab:** Displays the search input and vertical card list. Recommended as the default tab.
  - **"Map View" Tab:** Displays the full-bleed map.
  - **Action Layer:** Ensure floating controls (e.g., "Search this area" button or geolocation pin) sit comfortably above the map without obscuring navigation.

### 2. Define the Location Card Anatomy

The Location Card is the primary informational unit. Order its elements by cognitive scanning priority:

```text
+-------------------------------------------------------------+
|  [Category Tag]                           [Distance: 0.8 mi] |
|  **Location Title / Branch Name**                           |
|  [Star Rating / Reviews (Optional)]                         |
|                                                             |
|  123 Physical Street Address, City, State ZIP               |
|  Status Indicator: [Open Now / Closed] (Closes at 8:00 PM)  |
|                                                             |
|  [Button: Directions]     [Button: Call]    [Link: Details] |
+-------------------------------------------------------------+
```

- **Primary Tier:** Location name and distance from the searched center. Distance must be calculated on-the-fly and highly visible (top right).
- **Secondary Tier:** Street address and real-time open/closed status (utilize color coding paired with text, e.g., green for open, red for closed).
- **Tertiary Tier:** Primary actions as highly touch-friendly CTA buttons (e.g., "Directions", "Call", "View Details").

### 3. Design Search and Faceted Filtering

Provide highly intuitive query and filtering tools in the header section of the sidebar:

- **Search Input:** A combined input supporting postal codes, city names, and street addresses, complete with an autocomplete menu.
- **My Location Trigger:** A prominent, accessible geolocation button represented by a standard "crosshair" icon, labeled appropriately for screen readers (`aria-label="Find locations near my current position"`).
- **Radius Filter:** A dropdown allowing users to refine the search radius (e.g., 5, 10, 25, 50 miles).
- **Facet Dropdowns:** Quick filters for store-specific features (e.g., "Drive-thru", "Wheelchair Accessible", "24 Hours"). Use badges on the filter buttons to show selected counts.

### 4. Implement Bidirectional Interaction Synchronization

Map markers and list cards must behave as a unified system. Establish clear interactive relationships:

- **List Card Hover/Focus -> Map Marker:** Hovering or focusing a list card must trigger a visual state change on its corresponding map marker (e.g., scale up, change color, or bring to front using z-index adjustment).
- **Map Marker Click -> List Card:** Clicking a map marker must:
  - Automatically scroll the sidebar list to bring the corresponding card into view.
  - Highlight the card with a brief transition animation (e.g., subtle background pulse).
  - Open a map "Info Window" (Popup) over the marker containing the store name, distance, and a "Directions" link.
- **Search-this-Area (Map Drag):** Provide a "Search this area" floating button that appears at the top center of the map pane *only* when the user pans or zooms the map away from the initial search center.

### 5. Establish Mobile Touch and Map Adaptation

Manage interactions on mobile devices to prevent frustrations:

- **Scroll Hijacking Avoidance:** Disable gesture-based zooming on mobile maps by default (require two-finger drag to pan or zoom). This prevents users from getting "stuck" in the map while trying to scroll down the page.
- **Floating Controls:** Place floating zoom (+ / -) controls and a geolocation button in the bottom right corner of the map, styled with a high-contrast shadow and minimum touch targets of 44x44px.
- **Card Carousel Overlay:** On the Mobile Map View, provide a swipeable horizontal card carousel at the bottom of the viewport showing the single active or closest location, keeping map exploration and details unified.

## Decision Rules

- **The "Default Search" Rule:** When the locator page loads without a search query or geolocation permission:
  - Do *not* show an empty map.
  - Default to showing the nearest locations based on IP geolocation, or display all locations sorted alphabetically/by priority.
- **The "No Results" Recovery Rule:** If a user searches in an area with zero locations:
  - Zoom the map out to show the nearest available locations.
  - Display a helpful message in the sidebar list (e.g., "No locations found within 25 miles of [Query]. Here are the closest locations to you:").
  - Provide a "View All Locations" link.
- **Popup vs. Details Panel Rule:**
  - If the location has minimal metadata (just address & hours), show all information inside the Map Marker's Info Window popup.
  - If the location has extensive metadata (inventory, team list, photos), clicking "View Details" must slide out an full-depth detail panel within the sidebar, trapping keyboard focus there and offering a clear "Back to List" button.

## Constraints

- **Accessibility (Keyboard Navigation):**
  - Keyboard users must be able to navigate the entire search flow and location list without using the map directly.
  - Map markers must be keyboard-focusable (`tabindex="0"`) or represented by an accessible list alternative.
  - When search results update, announce the change to screen readers using an `aria-live="polite"` element (e.g., "3 locations found near Seattle, WA").
- **Touch Target Size:** All buttons, map markers, and filter controls must meet WCAG 2.2 SC 2.5.8 (minimum 24x24px with surrounding spacing), with primary action triggers on cards and floating controls sized to 44x44px for thumb comfort.
- **Visual Contrast:** High-contrast maps are preferred. Standard markers and active marker labels must have a contrast ratio of at least 3:1 against the map background. Text inside cards and popups must meet WCAG AA (4.5:1).
- **Layout Shift Prevention:** Reserve vertical/horizontal space for loading states using skeleton cards in the sidebar during active searches, preventing Cumulative Layout Shift (CLS).

## Common Failure Patterns

- **The Mobile Scroll Trap:** Users get stuck on the page because scrolling on their mobile screen only pans/zooms the map, preventing them from scrolling past the map component.
- **Broken Bidirectional Sync:** Clicking a map marker opens a popup but does not scroll to or highlight the matching card in the sidebar, forcing users to manually match names.
- **The "Blind Map" (Keyboard Exclusion):** Implementing the map markers as un-focusable SVG shapes or canvas elements, making physical locations entirely unreachable for screen reader and keyboard-only users.
- **No-Query Empty Dead End:** Displaying a completely blank screen and a quiet map on initial page load, requiring the user to guess that they must search first.
- **Laggy Map Dragging:** Attempting to fetch and render hundreds of markers in real-time on every small map drag, causing interface freeze. Implement debounce (250–400ms) on map bounds changes and cluster close markers.

## Validation Criteria

- [ ] Spatial layout is defined for both desktop (split-screen sidebar) and mobile (toggleable List/Map tabs).
- [ ] Bidirectional synchronization is specified (clicking marker highlights/scrolls to card; hovering/focusing card highlights marker).
- [ ] Mobile gesture-zoom is disabled by default (two-finger scroll required) to avoid mobile scroll hijacking.
- [ ] Loading states (skeletons) are designed to avoid layout shifts (CLS) when search queries update.
- [ ] Accessible alternative is defined: Keyboard users can browse all locations, read their details, and get directions without needing a mouse to hover over map canvas items.
- [ ] Screen readers receive a descriptive, polite `aria-live` announcement when search results update.
- [ ] Touch targets for all interactive card elements, markers, and zoom buttons meet at least the WCAG 2.2 24x24px minimum (44x44px preferred for main CTAs).
- [ ] Text contrast inside location cards and map popups meets WCAG AA (4.5:1).
- [ ] Clear fallback flows are designed for zero-results searches and location permission denials.
