---
name: status-page-system
description:
  Design, structure, and layout-engineer public status pages, system health dashboards,
  availability transparency portals, and operational health monitors with status color taxonomies,
  uptime metrics visualizers, incident timeline progression, scheduled maintenance notices,
  subscriber notification modals, and WCAG AA accessibility.
---

# Status Page System

## Purpose

The Status Page System provides a standardized, implementation-aware design framework for public system health dashboards, availability transparency portals, and incident communication hubs. When cloud services, API endpoints, payment gateways, or SaaS platforms experience degraded performance or outages, the status page serves as the single source of truth for customers, engineering teams, and customer support.

Designing an effective status page requires balancing real-time operational clarity with high-contrast visual hierarchy. Without a structured design system, status pages frequently suffer from color-only status indicators that violate WCAG AA accessibility, ambiguous status severities, unreadable 90-day uptime bars on mobile viewports, unstructured wall-of-text incident logs, and missing escalation/subscription triggers.

This system defines rules for status indicator color taxonomies, non-color visual cues (shapes and iconography), overall system health hero banner states, 90-day uptime heatmap bar grids, active incident timeline progression (Investigating → Identified → Monitoring → Resolved), scheduled maintenance alerts, subscriber notification modal overlays, and WCAG 2.1 AA accessibility (including ARIA live regions for real-time operational status updates).

## Use Cases

- **SaaS & API Platform Health Portals:** Communicating real-time availability, latency metrics, and API endpoint operational status to developers and enterprise customers.
- **E-Commerce & Payment Gateway Infrastructure Monitors:** Providing continuous visibility into checkout pipelines, payment processing, fulfillment APIs, and third-party integrations during peak traffic sales events.
- **Developer Tool & Cloud Infrastructure Dashboards:** Displaying regional node health, build runners, database clusters, and edge CDN availability status.
- **Internal & Customer-Facing Incident Communication Hubs:** Serving as the central operational hub during major service disruptions, broadcasting real-time updates and post-incident root cause analyses (RCA).
- **Scheduled Maintenance Communication:** Proactively notifying users of planned system upgrades, maintenance windows, and expected temporary downtime.

## When NOT to Use

- **In-App Page Error Views:** For full-page 404, 500, or offline application views within a main product experience, use `error-and-status-system`.
- **Contextual In-App Banners & Alerts:** For localized, non-blocking notification banners inside a SaaS dashboard, use `banner-and-alert-system`.
- **Ephemeral Transient Toast Messages:** For short-lived action feedback toasts (e.g., "Changes saved"), use `toast-and-snackbar-system`.
- **System Metrics & Charting Analytics:** For detailed time-series charts, CPU/Memory telemetry dashboards, or internal monitoring tools, use `data-visualization-system` or `metric-and-statistic-system`.

## Inputs

1. **System Architecture & Service Inventory:** List of core services, regions, and API components (e.g., Web App, Core API, Database Cluster, Payment Gateway, Webhooks, Third-Party Integrations).
2. **Status Severity Classification:** Current operational state per component (Operational, Degraded Performance, Partial Outage, Major Outage, Under Maintenance).
3. **Uptime & Latency Metrics Data:** Historical daily availability percentages and response time data for 30-day, 60-day, or 90-day heatmap bars.
4. **Incident & Maintenance Logs:** Active incident updates with timestamps, severity levels, affected components, and progression status.
5. **Brand Surface & Color Tokens:** Surface background colors, border tokens, focus indicators, and accessible status color palettes from `accessible-color-system`.

## Outputs

1. **Overall System Health Hero Banner Spec:** Visual definition and typography layout for the global system status header ("All Systems Operational", "Partial System Outage", or "Active Major Outage").
2. **Component Status List & 90-Day Uptime Heatmap Grid:** Layout specification for component rows with collapsible sub-services, daily uptime bars, hover tooltips, and overall availability percentages.
3. **Incident Timeline Progression Feed:** Chronological layout model for active and historical incidents showing step-by-step progress tags, timestamped updates, and impacted service badges.
4. **Scheduled Maintenance Banner & Modal:** Layout blueprint for upcoming maintenance announcements and automated calendar/notification reminders.
5. **Subscriber Notification Modal Overlay:** Accessible modal dialog allowing users to subscribe to incident alerts via Email, SMS, Webhook, or RSS.
6. **ARIA & Keyboard Accessibility Spec:** Screen reader live region definitions (`aria-live="polite"`), focus trap management, and non-color visual indicator rules under WCAG 2.1 AA.

---

## Workflow

### 1. Establish Status Severity Taxonomy & Non-Color Indicators
Define a 5-tier status taxonomy where every state is represented by a distinct color, an explicit text label, and a unique visual shape/icon to ensure full WCAG AA compliance (SC 1.4.1 Use of Color):

```text
[STATUS SEVERITY TAXONOMY]
--------------------------------------------------------------------------------------
Severity Tier         Color (Hex / HSL)             Icon / Shape          Text Label
--------------------------------------------------------------------------------------
Operational           Green (#16A34A / HSL 142 72% 36%) Filled Circle (●)   Operational
Degraded Performance  Yellow (#D97706 / HSL 38 92% 44%)  Triangle (▲)       Degraded
Partial Outage        Orange (#EA580C / HSL 21 86% 48%) Half-Filled Square (■) Partial Outage
Major Outage          Red (#DC2626 / HSL 0 72% 51%)     Filled Diamond (◆) Major Outage
Under Maintenance     Blue (#2563EB / HSL 217 91% 60%)  Gear / Wrench (⚙)  Maintenance
--------------------------------------------------------------------------------------
```

- **Color Contrast Rules:** Ensure all status badge text achieves a minimum contrast ratio of **4.5:1** against the badge background, and background shapes achieve at least **3:1** graphic contrast against the page surface.
- **Dual-Layer Encoding:** Never rely on color alone. Always pair colored dots with distinct geometry (circle, triangle, square, diamond, gear) and readable plain-text labels.

### 2. Design the Global Health Hero Banner
Position a high-visibility hero banner at the top of the status page canvas (`max-width: 1080px`, centered):

```text
+-----------------------------------------------------------------------------------+
|  (●) ALL SYSTEMS OPERATIONAL                                    Refreshed: 1m ago |
|  All core APIs, web applications, and database clusters are running smoothly.     |
+-----------------------------------------------------------------------------------+
```

- **Global State Computation:** Compute global health from the highest severity among active components. If any component is in "Major Outage", the global banner reflects "Major System Outage".
- **Visual Styling:**
  - *Operational State:* Subtle green tint background (`#F0FDF4` light / `#052E16` dark) with solid green accent border (`#16A34A`).
  - *Outage State:* Prominent solid fill or high-contrast border in red/orange with bold status header (`h1` or `h2` at `1.5rem`–`2rem`).
- **Live Auto-Refresh Metadata:** Display last updated timestamp (e.g., "Updated 2 minutes ago") alongside a manual "Check for updates" button or indicator.

### 3. Build the Component Availability List & 90-Day Uptime Heatmap
Structure individual core service rows and nested sub-services:

```text
+-----------------------------------------------------------------------------------+
|  ▼ Core API Platform                             (●) Operational    99.98% Uptime |
|  [|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||] |
|  90 days ago                                                 Today (100% operational)|
|                                                                                   |
|    └ REST API Endpoint                           (●) Operational       100% Uptime |
|    └ GraphQL Query Engine                         (▲) Degraded        99.85% Uptime |
+-----------------------------------------------------------------------------------+
```

- **Component Group Row Layout:**
  - Left: Accordion expand/collapse toggle for component groups + Service Name (`font-weight: 600`).
  - Right: Overall status indicator badge + 90-day aggregate uptime percentage (e.g., `99.98%`).
- **90-Day Uptime Heatmap Grid:**
  - Render a horizontal track containing **90 individual vertical bar segments** representing the last 90 calendar days.
  - Bar height: `24px`–`32px`, bar width: `3px`–`4px` with `1px` or `2px` gaps between bars.
  - Color each daily bar according to the worst severity experienced on that day (Green = 100% uptime, Yellow/Orange = partial degradation, Red = outage).
  - Hover / Focus Interaction: Hovering or focusing a daily bar reveals a tooltip detailing exact date, status, and duration of disruptions (e.g., *"Oct 14, 2024: 12 minutes of Partial Outage"*).
- **Responsive Stacking for Mobile (<768px):**
  - Mobile screens cannot fit 90 individual 4px bars side-by-side without horizontal scrolling or extreme squishing.
  - On mobile viewports, consolidate the 90-day heatmap into **12 weekly blocks** or display a simplified aggregate uptime progress bar with a text link to view full daily history.

### 4. Structure the Incident Timeline Progression Feed
Display active incidents at the top of the feed, followed by resolved incidents grouped by calendar date:

```text
[ACTIVE INCIDENT]
+-----------------------------------------------------------------------------------+
| (▲) Degraded Performance - US-East REST API High Latency                          |
| Impacted Services: [Core API Platform] [REST API Endpoint]                        |
| Severity: Partial Outage | Started: Oct 24, 14:22 UTC                             |
|-----------------------------------------------------------------------------------|
| • MONITORING (Oct 24, 15:05 UTC)                                                  |
|   A fix has been deployed and API latency metrics have returned to normal levels. |
|   We are monitoring system stability.                                            |
|                                                                                   |
| • IDENTIFIED (Oct 24, 14:40 UTC)                                                  |
|   The root cause was identified as a database connection pool contention in       |
|   the primary US-East cluster. Connection limits have been adjusted.              |
|                                                                                   |
| • INVESTIGATING (Oct 24, 14:22 UTC)                                               |
|   Our engineering team is investigating reports of elevated latency on API calls. |
+-----------------------------------------------------------------------------------+
```

- **4-Stage Incident Lifecycle:** Standardize incident progress updates using strict phase badges:
  1. `INVESTIGATING`: Issue detected; engineers actively triaging.
  2. `IDENTIFIED`: Root cause located; fix being prepared or deployed.
  3. `MONITORING`: Fix applied; observing telemetry for stabilization.
  4. `RESOLVED`: Service restored; incident formally closed.
- **Timestamp Formatting:** Always include explicit timezone indicators (e.g., `UTC` or user-local timezone `EST/PST`) and ISO timestamps (`YYYY-MM-DD HH:mm UTC`) to avoid global operational confusion.
- **Impacted Component Badges:** Attach explicit service tags (`badge-and-tag-system`) to every incident log so users immediately see which API or region was affected.

### 5. Add Scheduled Maintenance Alerts & Subscriber Modal Overlay
- **Scheduled Maintenance Banner:**
  - Position above historical incidents in a distinct blue/neutral card (`#EFF6FF` background).
  - Include maintenance window details: Date, Start Time, End Time, Duration, and Affected Components.
- **Subscriber Notification Trigger & Modal Overlay:**
  - Place a prominent "Subscribe to Updates" button in the top header (`button-and-action-system`).
  - Clicking trigger opens an accessible modal dialog (`overlay-and-dialog-system`).
  - Modal provides multi-channel subscription tabs: Email, SMS, Webhook, RSS Feed.
  - Form fields must use accessible input patterns (`form-design-system`) with explicit labels and error validation.

### 6. Program WCAG AA Accessibility & Screen Reader Live Regions
- **ARIA Live Region Setup:**
  - Wrap the main status summary container in `<section aria-live="polite" aria-atomic="true">`.
  - When real-time status updates arrive via WebSocket or polling, screen readers automatically announce the new operational state without interrupting user focus.
- **Interactive Tooltips & Keyboard Nav:**
  - Daily 90-day heatmap bars must be keyboard focusable (`tabindex="0"`) with accessible `aria-label` text (e.g., `aria-label="October 14, 2024: Operational, 100% uptime"`).
  - Focus indicators must meet 3:1 contrast against background surfaces (`outline: 2px solid var(--focus-ring); outline-offset: 2px`).

---

## Decision Rules

### Component Group Accordion & Layout Selection Matrix

| Service Volume | Recommended Layout Pattern | Heatmap Granularity | Mobile Stacking Strategy |
| :--- | :--- | :--- | :--- |
| **1 – 5 Core Services** | Single-column flat list | 90 individual daily bars | 30-day aggregate bar + historical text link |
| **6 – 15 Services across Groups** | Collapsible Service Accordion Groups | 90 daily bars with hover tooltips | 12 weekly aggregated blocks |
| **15+ Microservices / Multi-Region** | Categorized Card Grid with Search/Filter | 60-day or 30-day compact bars | Search filter + expandable status drawers |

### Incident Escalation & Severity Calculation Logic
- **Global Banner Severity Rule:** Set global hero banner status to the worst severity among all active core services.
- **Incident Ordering Rule:** Active/Unresolved incidents ALWAYS pin to the top of the page above component status rows or immediately below the hero banner. Resolved incidents order chronologically by date (`Newest → Oldest`).
- **Sub-Service Severity Propagation:** If a child sub-service (e.g., "GraphQL Query Engine") experiences a "Major Outage", the parent service group (e.g., "Core API Platform") reflects "Partial Outage" or "Major Outage" automatically.

---

## Constraints

- **Accessibility (WCAG 2.1 / 2.2 AA):**
  - **SC 1.4.1 Use of Color:** All status badges, heatmap bars, and hero indicators must pair background color with visible icons/shapes and text labels.
  - **SC 1.4.3 Contrast (Minimum):** Status badge text, incident titles, and body updates must satisfy **≥4.5:1** contrast ratio.
  - **SC 2.1.1 Keyboard Accessibility:** Heatmap bars, accordion row toggles, and subscribe modals must be 100% operable via keyboard (`Tab`, `Enter`, `Space`, `Esc`).
  - **SC 2.4.7 Focus Visible:** Interactive focus states must feature unclipped focus indicators with ≥3:1 contrast.
  - **SC 4.1.3 Status Messages:** Real-time status changes must utilize `aria-live="polite"` regions.
- **Responsiveness & Spatial Limits:**
  - Containers must remain bounded (`max-width: 1080px`) centered on widescreen displays.
  - On viewports `< 768px`, heatmap bars must collapse or re-aggregate to prevent horizontal page overflow and scroll lockups.
- **Performance & Resilience:**
  - Status page assets must be lightweight and hosted independently from core production infrastructure so the status page remains accessible during full production outages.

---

## Common Failure Patterns

- **Color-Only Status Dots:** Using a standalone green or red circle without text or distinct shape coding, rendering the status page unusable for colorblind users.
- **Mobile Horizontal Overflow:** Forcing 90 unscaled CSS grid columns on a 375px mobile screen, causing severe horizontal scrolling and breaking layout alignment.
- **Ambiguous Timezones:** Displaying timestamps like "Updated at 4:15 PM" without specifying time zone or UTC reference, confusing international users during global incidents.
- **Stale Operational Banner:** Failing to update the main hero banner while listing active outages in the incident log below, creating contradictory information.
- **Missing Subscription Escalation:** Publishing a status page without SMS, Email, or RSS subscription options, forcing users to repeatedly manually reload the page during outages.
- **Inaccessible Heatmap Tooltips:** Relying strictly on CSS `:hover` for 90-day heatmap tooltips without providing `tabindex="0"` or keyboard focus triggers.

---

## Validation Criteria

- [ ] Global health hero banner displays computed global status with dual-coded color and icon/shape indicators.
- [ ] Every component status row includes explicit text labels, icon shapes, and aggregate uptime percentage.
- [ ] 90-day uptime heatmap bars are keyboard focusable (`tabindex="0"`) with descriptive `aria-label` content.
- [ ] Active incidents pin to the top with standard phase tags (`INVESTIGATING`, `IDENTIFIED`, `MONITORING`, `RESOLVED`) and ISO/UTC timestamps.
- [ ] Status updates and real-time shifts are wrapped in an `aria-live="polite"` live region for screen readers.
- [ ] Mobile viewports (<768px) stack layout components cleanly without horizontal page scroll overflow.
- [ ] A functional "Subscribe to Updates" modal overlay is accessible via keyboard with proper focus trap management.
