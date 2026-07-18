# Retail Locator Breakdown: Apex Outdoor Gear

This example analyzes the design structure and interaction flow of the Store Locator for **Apex Outdoor Gear**, a national retail chain with 120+ corporate and dealer locations. It contrasts an unstructured "before" state with an optimized, highly synchronized, and accessible "after" design.

---

## 1. The Design Scenario
Apex Outdoor Gear has two customer-facing goals:
1. **Direct Purchase:** Drive customers to their 45 corporate retail flagship stores (which carry all inventory and offer gear rentals).
2. **Dealer Purchase:** Direct customers to 80+ third-party authorized dealers who sell a curated subset of gear.

### Customer Pain Points (Before Overhaul)
- **The Map Wall:** The locator initially loaded a static global map containing 120 identical red dots. Users had to zoom in manually to find their state and city.
- **Scroll Hijack:** On mobile devices, the map took up 80% of the screen. Users attempting to scroll down to see the phone numbers or hours got trapped in a zoom-and-pan loop inside the map frame.
- **Disconnected Search:** Clicking a pin opened a tiny pop-up window on the map with the title "Dealer #42" and no contact details. To call the store, the user had to close the pop-up, scroll down to a separate long text list, and search alphabetical listings manually.

---

## 2. Spatial Composition & Anatomy (The Overhaul)

The system is restructured into a bidirectional split-pane layout on desktop and a clean tabbed structure on mobile.

```text
DESKTOP VIEWPORT (1440px)
+-----------------------------------------------------------+-----------------------------------------------------------+
|                                                           |                                                           |
|  [Header: APEX OUTDOOR GEAR]                              |  [MAP VIEWPORT]                                           |
|                                                           |                                                           |
|  [Search: Enter City or Zip     ] [Locate Me]             |   +---------------------------------------------------+   |
|                                                           |   |                 (Marker: Corporate Flagship)          |   |
|  [Radius: 25 mi v] [Filter: Corporate v] [Filter: Rental v]   |   |                   [A] <--- Highlighted            |   |
|                                                           |   |                                                       |   |
|  [Showing 3 results near "Seattle, WA"]                   |   |         (Marker: Dealer)                              |   |
|                                                           |   |          [B]                                          |   |
|  +-----------------------------------------------------+  |   |                                                       |   |
|  | [Card A - ACTIVE]                    [Dist: 1.2 mi] |  |   |    +-----------------------------+                    |   |
|  | **Apex Flagship - Seattle**                         |  |   |    | **Apex Flagship - Seattle** |                    |   |
|  | 500 Pine St, Seattle, WA 98101                      |  |   |    | 500 Pine St                 |                    |   |
|  | [OPEN] Closes at 8:00 PM                             |  |   |    | [Directions CTA] [Call CTA] |                    |   |
|  |                                                     |  |   |    +-----------------------------+                    |   |
|  | [Directions]    [Call Store]    [View Rentals]      |  |   |    | (Map Controls: +/-) (Layer) |                    |   |
|  +-----------------------------------------------------+  |   +---------------------------------------------------+   |
|  | [Card B]                             [Dist: 4.5 mi] |  |                                                           |
|  | **Pacific Outfitters (Dealer)**                     |  |                                                           |
|  +-----------------------------------------------------+  |                                                           |
|                                                           |                                                           |
+-----------------------------------------------------------+-----------------------------------------------------------+
```

### Component Details

#### A. The Left-Hand Sidebar Panel (40vw width)
- **Sticky Search Container:** Sits at the top of the column. It is locked in place so that as users scroll through many results, they can instantly change their filters.
- **Result Grouping:** Standard dealers and corporate flagship stores are visually distinguished:
  - **Flagship Stores:** Feature a dark slate background, high contrast, and a "Corporate Flagship + Gear Rental" badge.
  - **Authorized Dealers:** Feature a subtle white background with a simple "Authorized Dealer" tag.

#### B. The Right-Hand Map Panel (60vw width)
- **High-Contrast Map Base:** Uses a custom light-grayscale Mapbox theme, removing heavy administrative colors so store markers stand out.
- **Custom Map Markers:**
  - **Corporate Marker [A]:** A circular dark-slate badge containing a custom "Apex Mountain" icon.
  - **Dealer Marker [B]:** A smaller, green pin.
  - **Active State:** When card [A] is active, marker [A] scales up by 1.3x and gets surrounded by a pulsing focal ring.

---

## 3. Bidirectional Synchronization Flow

The core of the optimized design is its instantaneous bidirectional feedback loops:

### Scenario 1: Direct List-to-Map Navigation (User scans list first)
1. **User Action:** User hovers their mouse over **Card A (Apex Flagship - Seattle)** or navigates to it via `Tab` key.
2. **UI Feedback (Map):** Marker [A] on the map expands and its `z-index` is raised to `999` to ensure it sits on top of overlapping dealer pins.
3. **User Action:** User clicks Card A.
4. **UI Feedback (Map):** The map smoothly pans (`flyTo`) to center Marker [A] and opens a styled Map Info Bubble showing:
   - Store Name
   - Rating
   - Active phone number
   - "Get Directions" button which opens Google Maps in a new tab pre-populated with the user's origin coordinates.

### Scenario 2: Direct Map-to-List Navigation (User explores map first)
1. **User Action:** User drags map toward Bellevue and clicks **Marker B**.
2. **UI Feedback (Map):** Marker B gains active styling.
3. **UI Feedback (Sidebar):**
   - The scrollable sidebar list automatically scrolls Card B (**Pacific Outfitters**) to the top of the sidebar.
   - Card B performs a brief, 300ms background highlight animation (color fades from light green to white) to visually guide the user's eyes to the selected item.
   - The "Search this area" button appears floating at the top of the map because the map center changed.

---

## 4. Mobile Refactoring & Touch Heuristics

On small screens (below 768px), the layout completely alters to maintain usability:

```text
MOBILE VIEWPORT (375px)

   +---------------------------------------+
   | [Header: APEX OUTDOOR GEAR]           |
   | [Search Input                       ] |
   +---------------------------------------+
   |    [LIST VIEW (3)]   |   [MAP VIEW]   | <--- Mobile Tabs
   +---------------------------------------+
   | Showing 3 results near "Seattle"      |
   |                                       |
   | +-----------------------------------+ |
   | | **Apex Flagship - Seattle**       | |
   | | 500 Pine St, Seattle              | |
   | | [OPEN] Closes 8:00 PM             | |
   | |                                   | |
   | | [Directions CTA]   [Call Store]   | | <--- Giant 48px touch CTA buttons
   | +-----------------------------------+ |
   | | **Pacific Outfitters (Dealer)**   | |
   | +-----------------------------------+ |
   |                                       |
   +---------------------------------------+
```

### Key Mobile Adaptations
1. **Tabbed Navigation:** Users toggle between List and Map. List is default, ensuring immediate readability and access to search controls.
2. **Gesture Lock (Map View):**
   - Single-finger swipes on the map pan the parent page, *not* the map.
   - To pan or zoom the map, the user must use **two fingers**. A subtle overlay instructs the user: *"Use two fingers to move the map"* if they attempt to drag with one finger. This eliminates the dreaded mobile scroll trap.
3. **Persistent Action Button:** On Mobile Map View, rather than forcing users to click tiny markers, a swipeable horizontal card carousel floats at the bottom of the map. Swiping the cards pans the map to the corresponding pin automatically.
4. **Click-to-Call Placement:** The "Call" button occupies 50% of the card width on mobile, allowing users to tap and dial with one thumb instantly.
