# Status Page System — Real-World Layout Breakdown

## Scenario Overview

This breakdown illustrates a public status page implementation for a cloud software company (`SaaS Cloud Platform`) experiencing an active incident (API Latency & Database Degradation) in one region while maintaining operational integrity across other services.

---

## 1. Page Composition & Spatial Architecture

```text
+---------------------------------------------------------------------------------------------------+
|  [Logo] CloudPlatform Status                              [ Subscribe to Updates (Modal) ]        |
+---------------------------------------------------------------------------------------------------+
|                                                                                                   |
|  +---------------------------------------------------------------------------------------------+  |
|  |  (⚠) PARTIAL SYSTEM DEGRADATION                                                              |  |
|  |  Active Incident: Elevated API latency on US-East region. Core services remain functional.    |  |
|  |  Updated 2 minutes ago • Auto-refresh active                                                 |  |
|  +---------------------------------------------------------------------------------------------+  |
|                                                                                                   |
|  +---------------------------------------------------------------------------------------------+  |
|  | Active Incidents (1)                                                                        |  |
|  |                                                                                             |  |
|  | [ DEGRADED PERFORMANCE ] High Latency on US-East REST API                                    |  |
|  | Affected: REST API (US-East), Database Cluster B                                             |  |
|  |                                                                                             |  |
|  |   • Monitoring — 14:20 UTC                                                                  |  |
|  |     Connection limits increased on Cluster B. Latency returning to nominal (<120ms).         |  |
|  |                                                                                             |  |
|  |   • Identified — 13:50 UTC                                                                   |  |
|  |     Root cause identified as automated index rebuild locking database read replicas.            |  |
|  |                                                                                             |  |
|  |   • Investigating — 13:30 UTC                                                                |  |
|  |     Engineers investigating p99 latency spikes exceeding 2500ms on /v1/query endpoints.       |  |
|  +---------------------------------------------------------------------------------------------+  |
|                                                                                                   |
|  +---------------------------------------------------------------------------------------------+  |
|  | System Services & Component Status (Past 90 Days)                                          |  |
|  |                                                                                             |  |
|  | ▼ Core Application Services                                                                 |  |
|  |   Web Dashboard                       [✓ Operational]                  99.98% Uptime      |  |
|  |   ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| |  |
|  |                                                                                             |  |
|  |   REST API (US-East)                  [⚠ Degraded]                     98.65% Uptime      |  |
|  |   ||||||||||||||||||||||||||||||||||!|||||||||||||||||||||||||||||||||||||||||||||||||||||! |  |
|  |                                                                                             |  |
|  |   REST API (EU-West)                  [✓ Operational]                  99.99% Uptime      |  |
|  |   ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| |  |
|  |                                                                                             |  |
|  | ▼ Data & Infrastructure                                                                      |  |
|  |   Database Cluster A (Primary)        [✓ Operational]                  100.0% Uptime      |  |
|  |   ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| |  |
|  |                                                                                             |  |
|  |   Database Cluster B (Replicas)       [⚠ Degraded]                     98.10% Uptime      |  |
|  |   ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||! |  |
|  +---------------------------------------------------------------------------------------------+  |
|                                                                                                   |
|  +---------------------------------------------------------------------------------------------+  |
|  | Scheduled Maintenance                                                                       |  |
|  |                                                                                             |  |
|  | [ UPCOMING ] Database Cluster A Security Patching                                           |  |
|  | Scheduled: Oct 18, 02:00 – 04:00 UTC (Expected downtime: < 5 minutes)                         |  |
|  | Affected: REST API (Read operations may fail over to replica)                                |  |
|  +---------------------------------------------------------------------------------------------+  |
|                                                                                                   |
+---------------------------------------------------------------------------------------------------+
```

---

## 2. Key Design Decisions & Implementation Highlights

### A. Non-Color Relying Status Indicators

To ensure full accessibility for colorblind users and low-vision users, every status badge pairs distinct visual glyphs with clear textual labels:

- **Operational:** Solid green circle containing a checkmark (`✓ Operational`)
- **Degraded Performance:** Amber triangle with exclamation point (`⚠ Degraded`)
- **Partial Outage:** Orange filled diamond with slash (`◈ Partial Outage`)
- **Major Outage:** Red octagon with X symbol (`🞭 Major Outage`)
- **Under Maintenance:** Blue square with wrench icon (`🔧 Maintenance`)

### B. Screen Reader Live Region Broadcasting

The top global banner utilizes an ARIA live region (`aria-live="polite"` and `aria-atomic="true"`). When background polling or WebSocket pushes update the overall system status, screen reader users hear the updated status without losing focus:

```html
<div role="region" aria-live="polite" aria-atomic="true" class="status-hero status-hero--degraded">
  <div class="status-hero__icon" aria-hidden="true">
    <svg width="24" height="24" viewBox="0 0 24 24"><!-- Warning Icon SVG --></svg>
  </div>
  <div class="status-hero__content">
    <h2 class="status-hero__title">Partial System Degradation</h2>
    <p class="status-hero__subtitle">Elevated API latency on US-East region. Core services remain functional.</p>
  </div>
</div>
```

### C. Accessible 90-Day Uptime Grid

Each day segment in the 90-day history bar is rendered as an accessible element with `tabindex="0"`, an `aria-label` specifying the date and status, and a keyboard focus indicator:

```html
<div class="uptime-bar" role="group" aria-label="90-day uptime history for REST API US-East">
  <!-- Day 1 of 90 -->
  <span tabindex="0" class="uptime-bar__day uptime-bar__day--operational"
        aria-label="Oct 10: 100% operational">
    <span class="tooltip" role="tooltip">Oct 10, 2023: Operational (100%)</span>
  </span>
  <!-- Day 90 (Today - Active Outage) -->
  <span tabindex="0" class="uptime-bar__day uptime-bar__day--degraded"
        aria-label="Oct 12 (Today): Degraded performance, 98.65% uptime, 1 active incident">
    <span class="tooltip" role="tooltip">Oct 12, 2023 (Today): Degraded performance. 1 active incident.</span>
  </span>
</div>
```

---

## 3. Responsive Behavior & Viewport Breakpoints

- **Desktop (>1024px):** Full 90-day bar charts rendered inline next to service labels; dual-column layout for incident timeline and maintenance updates.
- **Tablet (640px – 1023px):** 90-day bar charts drop below service titles; maintenance notices stack vertically below active incidents.
- **Mobile (<639px):** 90-day chart displays 30 compressed day blocks to eliminate horizontal scrolling; "Subscribe" CTA switches to a full-width bottom sticky button; active outage alert sticks to the viewport header during deep scrolling.
