# Status Page Layout Breakdown: Enterprise SaaS Cloud Platform

This example demonstrates a complete, real-world layout breakdown for a public system status page and health monitor for an enterprise SaaS platform ("CloudScale Data Cloud"). It illustrates spatial composition, visual hierarchy, status indicator taxonomy, 90-day uptime heatmaps, active incident progression feeds, scheduled maintenance banners, and subscriber modal triggers.

---

## 1. High-Level Spatial Blueprint & Page Composition

The status page layout is organized as a centered single-column container (`max-width: 1080px`) with vertical section spacing (`gap: 2.5rem` or `40px`) to guide scanning users from macro system health to micro component availability and historical incident logs.

```text
+-----------------------------------------------------------------------------------+
|  [HEADER / BRAND BAR]                                                             |
|  CloudScale System Status             [ Subscribe to Updates ] [ View History → ] |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  [GLOBAL SYSTEM HEALTH HERO BANNER]                                               |
|  +-----------------------------------------------------------------------------+  |
|  | (▲) PARTIAL SYSTEM OUTAGE                                 Updated: 2m ago   |  |
|  | We are experiencing elevated latency on US-East API endpoints.              |  |
|  +-----------------------------------------------------------------------------+  |
|                                                                                   |
|  [ACTIVE INCIDENT FEED (Pinned to Top)]                                           |
|  +-----------------------------------------------------------------------------+  |
|  | (▲) Degraded Performance - US-East REST API High Latency                      |  |
|  | Affected Components: [Core API Platform] [REST API Endpoint]                |  |
|  | Started: Oct 24, 2024 - 14:22 UTC                                           |  |
|  |                                                                             |  |
|  |  • MONITORING (15:05 UTC)                                                  |  |
|  |    A database connection pool fix was deployed. Latency is recovering.     |  |
|  |  • IDENTIFIED (14:40 UTC)                                                 |  |
|  |    Root cause isolated to DB pool contention in US-East cluster.           |  |
|  |  • INVESTIGATING (14:22 UTC)                                              |  |
|  |    Engineers actively investigating API response degradation reports.       |  |
|  +-----------------------------------------------------------------------------+  |
|                                                                                   |
|  [SCHEDULED MAINTENANCE BANNER]                                                   |
|  +-----------------------------------------------------------------------------+  |
|  | (⚙) Scheduled DB Cluster Maintenance                                        |  |
|  | Date: Nov 2, 2024 (02:00 UTC - 04:00 UTC) | Expected Downtime: None (HA)    |  |
|  +-----------------------------------------------------------------------------+  |
|                                                                                   |
|  [COMPONENT AVAILABILITY & 90-DAY HEATMAP GRID]                                   |
|  +-----------------------------------------------------------------------------+  |
|  | SERVICE COMPONENT                         STATUS            90-DAY UPTIME   |  |
|  |-----------------------------------------------------------------------------|  |
|  | ▼ Core API Platform                       (▲) Degraded             99.88%   |  |
|  |   [|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||] |  |
|  |   90 days ago                                                     Today     |  |
|  |   │ └ REST API Endpoint                   (▲) Degraded             99.80%   |  |
|  |   │ └ GraphQL Engine                      (●) Operational         100.00%   |  |
|  |   │ └ Webhook Delivery                    (●) Operational         100.00%   |  |
|  |                                                                             |  |
|  | ▼ Storage & Database Services             (●) Operational          99.99%   |  |
|  |   [|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||] |  |
|  |   90 days ago                                                     Today     |  |
|  |                                                                             |  |
|  | ▼ Developer Portal & Auth                 (●) Operational         100.00%   |  |
|  |   [|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||] |  |
|  +-----------------------------------------------------------------------------+  |
|                                                                                   |
|  [PAST INCIDENTS & HISTORICAL LOG]                                                |
|  +-----------------------------------------------------------------------------+  |
|  | October 18, 2024 — No incidents reported.                                    |  |
|  | October 12, 2024 — (■) Partial Outage: CDN Edge SSL Renewal Delay [RESOLVED] |  |
|  +-----------------------------------------------------------------------------+  |
|                                                                                   |
|  [FOOTER & UTILITY NAVIGATION]                                                    |
|  Powered by CloudScale Operations | Security Trust Center | Support Desk         |
+-----------------------------------------------------------------------------------+
```

---

## 2. Component Layout & Visual Taxonomy Breakdown

### Section A: Operational Header & Subscriber Trigger
- **Layout:** Flexbox row with `justify-content: space-between; align-items: center;`.
- **Primary Brand Title:** `h1` at `1.5rem` (24px), bold (`font-weight: 700`), primary text color `#0F172A`.
- **Action Triggers:**
  - Primary Action: `"Subscribe to Updates"` button with email icon, styled using `#2563EB` solid fill, `44px` height, and `padding: 0 1rem`.
  - Secondary Link: `"Incident History →"` link with focus outline.

### Section B: Global System Health Hero Banner
The hero banner communicates global health at a glance. It dynamically computes status based on the highest active severity across all components.

```text
[STATE VARIATIONS FOR HERO BANNER]

State 1: All Operational
+-----------------------------------------------------------------------------------+
| (●) ALL SYSTEMS OPERATIONAL                                    Refreshed: 1m ago  |
| All systems and API regions are functioning normally.                             |
+-----------------------------------------------------------------------------------+
Visual Tokens: Surface #F0FDF4 | Border #16A34A (Green) | Text #14532D

State 2: Degraded / Partial Outage (Active in Example)
+-----------------------------------------------------------------------------------+
| (▲) PARTIAL SYSTEM OUTAGE                                      Refreshed: Just now|
| US-East REST API endpoints are experiencing elevated latency. Engineers on site.  |
+-----------------------------------------------------------------------------------+
Visual Tokens: Surface #FFFBEB | Border #D97706 (Yellow/Amber) | Text #78350F

State 3: Major System Outage
+-----------------------------------------------------------------------------------+
| (◆) MAJOR SYSTEM OUTAGE                                       Refreshed: Just now|
| Core API and Authentication clusters are currently unresponsive globally.         |
+-----------------------------------------------------------------------------------+
Visual Tokens: Surface #FEF2F2 | Border #DC2626 (Red) | Text #7F1D1D
```

### Section C: Active Incident Timeline Progression
Pinned immediately above component lists during an outage to provide immediate tactical updates.

- **Incident Header:**
  - Headline: `(▲) Degraded Performance - US-East REST API High Latency`.
  - Impacted Component Badges: `<span class="badge">Core API Platform</span> <span class="badge">REST API Endpoint</span>`.
  - Metadata Row: Severity (`Partial Outage`), Start Time (`Oct 24, 2024 14:22 UTC`).
- **Timeline Step Items (Vertical Progression Stream):**
  - Left Border Track: 2px vertical rule (`#E2E8F0`) connecting step dots.
  - Step 1 (`MONITORING`): Blue/Green phase badge (`#16A34A`), Timestamp `15:05 UTC`, Progress copy: *"A database connection pool fix was deployed. Latency metrics are stabilizing."*
  - Step 2 (`IDENTIFIED`): Amber phase badge (`#D97706`), Timestamp `14:40 UTC`, Progress copy: *"Root cause isolated to DB connection pool exhaustion in US-East primary cluster."*
  - Step 3 (`INVESTIGATING`): Purple phase badge (`#9333EA`), Timestamp `14:22 UTC`, Progress copy: *"Engineering team triaging automated alert for elevated 504 gateway timeouts."*

### Section D: Component Availability & 90-Day Uptime Heatmap
Groups services under expandable accordion categories with interactive daily heatmap tracks.

- **Component Group Header Row:**
  - Chevron Toggle: Keyboard focusable `<button aria-expanded="true" aria-controls="group-core-api">`.
  - Title: `Core API Platform` (`1.125rem`, `font-weight: 600`).
  - Status Badge: `(▲) Degraded` (`background: #FEF3C7; color: #92400E; border: 1px solid #F59E0B`).
  - Overall Uptime: `99.88% 90-day availability`.
- **90-Day Heatmap Bar Container:**
  - Width: `100%`, CSS Grid with `grid-template-columns: repeat(90, 1fr); gap: 2px; height: 32px;`.
  - Individual Bar Element: `<div class="heatmap-bar" tabindex="0" role="img" aria-label="October 24, 2024: Degraded Performance, 42 minutes latency disruption"></div>`.
  - Bar Color Mapping:
    - Operational (100%): `#22C55E` (Vibrant Green)
    - Degraded (<99%): `#F59E0B` (Amber)
    - Major Outage (<95%): `#EF4444` (Red)
    - Under Maintenance: `#3B82F6` (Blue)
- **Interactive Tooltip Hover State:**
  - Focusing or hovering a single bar triggers an accessible floating tooltip anchored above the bar:
    ```text
    +-----------------------------------------------+
    | Oct 24, 2024                                  |
    | Status: Degraded Performance                  |
    | Duration: 42 minutes elevated latency         |
    +-----------------------------------------------+
    ```

### Section E: Subscriber Notification Modal Overlay
Triggered via the `"Subscribe to Updates"` button. Built as an accessible modal window with focus trap management (`overlay-and-dialog-system`).

```text
+-----------------------------------------------------------------------------------+
|  Subscribe to Incident Updates                                                [X] |
|  Get instant notifications whenever CloudScale experiences an incident or        |
|  scheduled maintenance.                                                           |
|-----------------------------------------------------------------------------------|
|  [ Email ]   [ SMS ]   [ Webhook ]   [ RSS / Atom ]                               |
|-----------------------------------------------------------------------------------|
|                                                                                   |
|  Email Address *                                                                  |
|  [ user@company.com                                                             ] |
|                                                                                   |
|  Select Components to Monitor:                                                    |
|  [x] Core API Platform                                                            |
|  [x] Storage & Database Services                                                  |
|  [x] Developer Portal & Auth                                                      |
|                                                                                   |
|  [ Subscribe to Notifications ]                                 [ Cancel ]        |
+-----------------------------------------------------------------------------------+
```

---

## 3. Responsive Stacking & Mobile Viewport Adaptation

### Mobile Screen Viewport (<768px Width)
On mobile displays, horizontal space is tightly constrained. The layout adapts seamlessly:

1. **Header Stack:**
   - Title and `"Subscribe"` trigger stack vertically (`flex-direction: column; align-items: stretch; gap: 12px;`).
   - `"Subscribe to Updates"` button expands to full width (`width: 100%`).
2. **Hero Banner Scaling:**
   - Banner padding scales down from `24px` to `16px`. Status headline font scales to `1.25rem`.
3. **Heatmap Bar Consolidation:**
   - Rendering 90 distinct 2px bars on a 375px mobile screen creates microscopic touch targets and visual noise.
   - On mobile viewports (`<768px`), the 90-day heatmap bar track toggles to a **12-week aggregated block view** (12 wider blocks representing weekly availability) or displays a simplified availability progress bar with a text link: `"View 90-day daily logs →"`.
4. **Accordion Sub-Services:**
   - Nested sub-service indentations reduce from `32px` to `16px` to maximize readable text measure.

---

## 4. Accessibility Specification (WCAG 2.1 AA Compliance)

- **SC 1.4.1 Use of Color:**
  - Status states ALWAYS include text labels (`Operational`, `Degraded`, `Major Outage`) AND distinct icon shapes (`● Circle`, `▲ Triangle`, `◆ Diamond`, `⚙ Gear`).
- **SC 1.4.3 Contrast Minimum:**
  - Status badge text `#78350F` on `#FEF3C7` background = **6.8:1 contrast ratio** (Passes AA and AAA).
  - Body text `#334155` on `#FFFFFF` surface = **10.6:1 contrast ratio**.
- **SC 2.1.1 Keyboard Nav:**
  - `Tab` moves focus cleanly through:
    1. `"Subscribe to Updates"` button
    2. Hero banner check updates link
    3. Pinned incident detail links
    4. Service group expand/collapse toggles
    5. Heatmap daily bar items
    6. Footer links
- **SC 4.1.3 Status Messages & ARIA Live Regions:**
  - Header status container includes `aria-live="polite"` and `aria-atomic="true"`:
    ```html
    <div role="region" aria-label="System Operational Status" aria-live="polite">
      <h2 id="global-status-title">Partial System Outage</h2>
    </div>
    ```
