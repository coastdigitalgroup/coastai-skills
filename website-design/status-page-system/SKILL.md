---
name: status-page-system
description:
  Design, structure, and layout-engineer public status pages, system health
  dashboards, uptime metrics visualizers, service component indicators, incident
  logs, scheduled maintenance notices, and subscriber notification modals.
---

# Status Page System

## Purpose

The Status Page System provides a standardized framework for designing, structuring, and layout-engineering public status pages, system health dashboards, availability transparency portals, and operational health monitors across SaaS platforms, API infrastructure, cloud services, e-commerce platforms, and enterprise applications.

During infrastructure degradation or service outages, a well-designed status page is a critical trust-building surface. It deflects thousands of repetitive support tickets, sets accurate real-time expectations, and provides clear visibility into issue resolution progress. Conversely, poorly designed status pages erode trust through misleading "all green" indicators during active incidents, inaccessible visual status indicators, unstructured wall-of-text incident logs, or clunky subscriber entry points.

This system defines rules for global health header banners, component availability grids, 90-day interactive uptime history bars, timestamped incident progression timelines, scheduled maintenance windows, multi-channel subscription drawers, WCAG 2.1 AA accessibility, and responsive adaptation.

## Use Cases

- **SaaS & API Platform Public Status Portals:** Communicating real-time availability for core web applications, REST/GraphQL APIs, webhooks, authentication services, and third-party integrations (e.g., `status.acme.com`).
- **Cloud Infrastructure & Developer Services:** Displaying multi-region datacenter health, edge network performance, compute cluster status, and database cluster metrics.
- **Fintech & Payment Gateway Monitors:** Providing live status transparency for payment processing pipelines, payout rails, card processing networks, and fraud detection engines.
- **E-Commerce Platform Health Dashboards:** Monitoring checkout engines, inventory sync pipelines, order processing APIs, and shipping carrier integrations during high-demand traffic drops.
- **Internal Enterprise IT Dashboards:** Managing internal service health visibility across internal tools, VPN gateways, SSO providers, and internal databases for employee helpdesks.

## When NOT to Use

- **Full-Page Site HTTP Errors:** For full-page 404 Not Found, 500 Server Error, or site-wide maintenance takeovers on a primary marketing site, use `error-and-status-system`.
- **Form Field Validation Feedback:** For inline input validation messages or form submission status errors, use `form-design-system`.
- **In-App Product Notification Centers:** For user-specific in-app activity feeds, task updates, or transactional notifications, use `notification-center-system`.
- **Transient In-App Alert Banners:** For non-blocking, contextual banner messages inside a web application UI, use `banner-and-alert-system`.

## Inputs

1. **System Topology & Component Hierarchy:** List of platform components, microservices, regional datacenters, or API endpoints grouped by category (e.g., Core Services, Payment Gateway, Developer Tools).
2. **Operational State Taxonomy:** Five-tier severity classification schema:
   - `Operational` (All systems normal)
   - `Degraded Performance` (Service functional but experiencing high latency or minor errors)
   - `Partial Outage` (Subset of users or non-critical sub-components impacted)
   - `Major Outage` (Critical service unnavigable or completely offline)
   - `Under Maintenance` (Planned operational window)
3. **Uptime & Latency Metrics:** Historical 90-day availability percentage data and daily availability status arrays.
4. **Active & Historical Incident Data:** Incident titles, severity levels, affected components, and chronological update timeline entries (Investigating, Identified, Monitoring, Resolved).
5. **Scheduled Maintenance Data:** Planned downtime windows, affected components, expected duration, and impact descriptions.
6. **Subscription Entry Points:** Supported alert notification channels (Email, SMS, Webhooks, Slack/Teams, RSS).

## Outputs

1. **Status Page Layout Blueprint:** Full layout composition specifying global health banner placement, component grid hierarchy, uptime graph positioning, active incident timeline layout, and subscription trigger placement.
2. **Status Indicator & Color Taxonomy Specification:** Accessible color tokens paired with non-color visual indicators (badges, icons, text labels) adhering to WCAG 2.1 AA contrast standards.
3. **90-Day Uptime Bar Graph Specification:** Interactive, accessible visualizer specification for daily availability history with keyboard focusable daily bars and tooltip popovers.
4. **Incident Progression Timeline Specification:** Chronological layout design for timestamped incident stage logs with status badges and rich markdown content styling.
5. **Multi-Channel Subscription Drawer/Modal Specification:** Accessible modal form layout allowing users to subscribe to real-time incident updates via preferred notification channels.

---

## Workflow

### 1. Establish Global System Health Banner
Design the top-level status hero banner that delivers instant visual status upon page load:

```text
+-----------------------------------------------------------------------+
|  [ ICON ]  All Systems Operational                  [ Subscribe Button]|
|            Updated 2 minutes ago · 99.98% 90-day uptime               |
+-----------------------------------------------------------------------+
```

- **Global Health Calculation Logic:**
  - If any component is in `Major Outage` -> Global Banner = **Major System Outage** (Red).
  - Else if any component is in `Partial Outage` -> Global Banner = **Partial System Outage** (Orange).
  - Else if any component is in `Degraded Performance` -> Global Banner = **Degraded System Performance** (Yellow).
  - Else if any component is `Under Maintenance` -> Global Banner = **Active Scheduled Maintenance** (Blue).
  - Else -> Global Banner = **All Systems Operational** (Green).
- **Banner Spatial Anatomy:**
  - Full-width hero surface with distinct state background tinting (minimum 4.5:1 contrast against text).
  - Prominent status headline (`h1` or `h2`), large status icon (checkmark, triangle, warning octagon), last refreshed timestamp, and global 90-day uptime metric summary.
  - Top-right action placement for the primary "Subscribe to Updates" button using `button-and-action-system`.

### 2. Construct Component Availability Grid & Groupings
Organize individual services into logical category accordions or card grids:

```text
[ Core Infrastructure ]                                    [ Status Badge ]
├── REST API Endpoint                                      Operational [✓]
├── GraphQL Gateway                                        Operational [✓]
└── Webhook Delivery Engine                                Degraded    [!]

[ Regional Edge Locations ]
├── US-East (N. Virginia)                                 Operational [✓]
├── EU-West (Ireland)                                      Operational [✓]
└── AP-Southeast (Tokyo)                                   Partial     [✕]
```

- **Category Grouping Structure:**
  - Group related components under expandable category headers (`<h3>` with `aria-expanded`).
  - Render component rows with clear vertical separation (`padding: 0.875rem 1rem`, `border-bottom: 1px solid var(--border-subtle)`).
- **Component Row Elements:**
  - Left: Component name, optional tooltip describing component scope (e.g., "v1 & v2 API routes").
  - Right: Explicit status badge combining background tint, status text, and visual icon shape.

### 3. Design Interactive 90-Day Uptime Metrics Visualizer
Provide transparent historical availability data through an accessible daily bar chart:

```text
[ Core API Uptime ]                                    99.95% Uptime
|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
90 days ago                                                         Today
```

- **Bar Chart Composition:**
  - 90 individual vertical bars representing each day over the past quarter.
  - Height: `32px`–`40px`, width: `3px`–`4px` with `1px`–`2px` gaps.
  - Bar colors map to daily health: Solid Green (100% / No incidents), Yellow (Minor incident / Latency), Red (Major outage), Blue (Maintenance).
- **Accessibility & Interaction:**
  - Wrap bars in a focusable grid (`role="region"`, `aria-label="Core API 90-day uptime history"`).
  - Hover or Keyboard Focus (`Tab` through dates or Arrow keys) reveals a tooltip popover displaying exact date, status, and linked incident details.
  - Provide an accessible textual summary for screen readers (e.g., `<span class="sr-only">Core API uptime over the last 90 days is 99.95% with 1 minor incident on October 12th.</span>`).

### 4. Structure Active Incident Timeline & Historical Logs
Layout real-time incident reports with clear stage progression:

```text
[ ACTIVE INCIDENT ]
Elevated API Latency in EU-West Region
Impact: Partial Outage | Affected: REST API, EU-West | Started: 14:22 UTC

● RESOLVED - October 15, 2023 - 15:45 UTC
  Latency has returned to normal baseline levels after routing adjustments.

● MONITORING - October 15, 2023 - 15:10 UTC
  A fix has been deployed. We are monitoring API response times.

● IDENTIFIED - October 15, 2023 - 14:40 UTC
  An issue with a upstream DNS provider was identified.

● INVESTIGATING - October 15, 2023 - 14:22 UTC
  We are investigating reports of elevated API response latencies.
```

- **Incident Card Anatomy:**
  - Header: Incident title (`<h3>`), overall severity tag (`Partial Outage`), affected components badges, and start time.
  - Body: Vertical timeline track with bullet nodes corresponding to progression stages: `Investigating` -> `Identified` -> `Monitoring` -> `Resolved`.
  - Timestamp formatting: Standardized ISO format with relative timestamp (e.g., `October 15, 2023 - 15:45 UTC (20 mins ago)`).
  - Body text: Clear, empathetic update prose formatted with markdown support (bold highlights, code snippets, hyperlinked post-mortems).

### 5. Design Scheduled Maintenance Notices
Display planned operational downtime windows ahead of time to allow customers to prepare:

- **Placement:** Position directly below active incidents and above the component grid.
- **Card Styling:** Distinct blue accent border (`border-left: 4px solid var(--color-info)`) with calendar clock icon.
- **Content Requirements:** Scheduled start/end times in UTC with local timezone conversion, affected services list, and anticipated user impact (e.g., "Read-only mode for 15 minutes").

### 6. Integrate Multi-Channel Subscriber Modal
Allow users to subscribe to real-time incident alerts via their preferred platform:

- **Trigger:** Prominent top-right "Subscribe to Updates" button on the global header banner.
- **Modal Layout (`overlay-and-dialog-system`):**
  - Tabbed selection interface (`tab-ui-system`): Email, SMS, Webhook, Slack/Teams, RSS/Atom.
  - Email Tab: Input field for email address + checkbox list for granular component selection (e.g., "Only alert me for REST API and EU-West region").
  - Webhook Tab: Input for endpoint URL + secret key generation preview.
  - Accessible focus management: Auto-focus first input on open, trap focus within dialog, restore focus to trigger button on close.

---

## Decision Rules

### Global Status Tier Calculation Matrix

| Highest Severity Among Components | Global Banner Title | Color Token | Visual Icon | ARIA Live Severity |
| :--- | :--- | :--- | :--- | :--- |
| **Major Outage** | Major System Outage | `--color-danger` (#DC2626) | Solid Octagon (✕) | `assertive` |
| **Partial Outage** | Partial System Outage | `--color-warning-dark` (#D97706) | Triangle Warning (!) | `polite` |
| **Degraded Performance** | Degraded Performance | `--color-warning` (#F59E0B) | Circle Exclamation (!) | `polite` |
| **Under Maintenance** | Scheduled Maintenance | `--color-info` (#2563EB) | Wrench / Clock (⚙) | `polite` |
| **Operational** | All Systems Operational | `--color-success` (#16A34A) | Circle Checkmark (✓) | `polite` |

### Status Indicator Redundancy Rule
**NEVER rely solely on color to convey system status.** Every status badge and indicator MUST pair background color with at least TWO additional visual cues:
1. **Explicit Text Label:** "Operational", "Degraded Performance", "Partial Outage", "Major Outage".
2. **Distinct Icon Shape:** Checkmark in circle for operational; exclamation mark in triangle for degraded/partial; cross mark in octagon for major outage.
3. **Pattern / Border Differentiation:** Solid border vs. dashed/dotted border for maintenance states.

---

## Constraints

- **Accessibility (WCAG 2.1 / 2.2 AA):**
  - **SC 1.4.1 Use of Color:** All status states must include text labels and distinct icon shapes alongside color.
  - **SC 1.4.3 Contrast (Minimum):** Status badges, banner text, and timeline update body text must achieve at least **4.5:1** contrast ratio against backgrounds.
  - **SC 1.4.11 Non-Text Contrast:** Status icons, 90-day uptime bars, and focus rings must achieve at least **3:1** contrast against adjacent backgrounds.
  - **SC 4.1.2 Name, Role, Value:** Dynamic status updates must be wrapped in `aria-live="polite"` regions to announce real-time state changes to screen readers.
  - **Forced Colors Mode:** Ensure status badges remain legible in Windows High Contrast Mode by applying `forced-color-adjust: auto` and explicit system color borders (`1px solid ButtonText`).
- **Responsiveness & Layout Stacking:**
  - **Desktop (`≥ 1024px`):** 90-day uptime bars render all 90 daily ticks side-by-side.
  - **Tablet (`768px – 1023px`):** 90-day uptime bars condense to 60 days or scale bar width dynamically (`width: calc(100% / 90)`).
  - **Mobile (`< 768px`):** Component row converts to stacked vertical layout (component title on top, status badge aligned right below). 90-day uptime bars condense to 30-day view with an option to expand, or convert to a numerical summary string.
- **Content Measure:**
  - Incident update narrative prose must be constrained between **45 and 75 characters per line** (`max-width: 68ch`) for optimal readability during stress reading.

---

## Common Failure Patterns

- **The "Watermelon" Status Page:** Displaying "All Systems Operational" (green on the outside) while core API endpoints or customer logins are failing (red on the inside), destroying customer trust.
- **Color-Only Status Indicators:** Using plain green, yellow, and red dots without text labels or distinct icon shapes, making the page unusable for colorblind users.
- **Unaccessible 90-Day Uptime Graphs:** Rendering uptime bars as unlabelled `<div>` elements without ARIA text alternatives, keyboard focusability, or screen reader descriptions.
- **Unstructured Wall-of-Text Incident Reports:** Publishing long paragraphs without timestamped stage progression (Investigating -> Identified -> Monitoring -> Resolved), making it difficult to scan for recent updates.
- **Hidden Subscription Entry Points:** Hiding alert subscription options in footers or small text links, forcing frustrated users to manually refresh the page during outages.
- **Vague Non-Actionable Messaging:** Writing updates like "We are experiencing technical difficulties" without stating which components are impacted or providing an estimated time for the next update.

---

## Validation Criteria

- [ ] Global status hero banner dynamically reflects the highest severity level across all components.
- [ ] Every status indicator combines background color, explicit text label, and distinct icon shape (WCAG 1.4.1).
- [ ] All text and status badge foreground/background combinations meet or exceed 4.5:1 WCAG AA contrast ratio.
- [ ] 90-day uptime bar chart items are keyboard focusable, support hover tooltips, and include accessible screen reader text summaries.
- [ ] Active incidents are structured chronologically with timestamped progression stages (Investigating -> Identified -> Monitoring -> Resolved).
- [ ] Scheduled maintenance notices display UTC start/end times, affected services, and expected user impact.
- [ ] A multi-channel "Subscribe to Updates" modal/drawer is prominently accessible from the global status header.
- [ ] Responsive layout adapts cleanly across desktop, tablet, and mobile viewports without horizontal overflow.
