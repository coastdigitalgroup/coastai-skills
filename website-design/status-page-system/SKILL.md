---
name: status-page-system
description:
  Design and implement public status pages, system health dashboards, availability transparency portals,
  status indicator taxonomies, incident progression timelines, and WCAG AA accessible uptime monitors.
---

# Status Page System

## Purpose

The Status Page System provides a standardized framework for designing, structuring, and layout-engineering public status pages, system health dashboards, availability transparency portals, and operational health monitors. When services experience latency, outage, or scheduled maintenance, users and enterprise customers require immediate, unambiguous, and accessible communication regarding system operational health. Without a systematic design framework, status pages often suffer from ambiguous color coding, poor visual hierarchy, hidden incident histories, lack of accessible screen-reader status announcements, and unhelpful metric visualizations.

This skill ensures that status pages provide high-signal operational transparency, communicate incident severity without relying solely on color, support responsive cross-device viewing, and comply fully with WCAG 2.2 AA accessibility specifications.

## Use Cases

- Designing public status pages for SaaS platforms, cloud infrastructure providers, APIs, and developer tools.
- Structuring in-app operational health widgets and mini status indicators embedded within web applications or customer portals.
- Layout-engineering incident communication hubs with chronological updates, impact assessments, post-mortems, and scheduled maintenance notices.
- Creating historical uptime visualization grids (e.g., 90-day availability bar charts) with accessible tooltips and screen-reader breakdowns.
- Building subscriber notification preference flows (email, SMS, webhook, RSS) for real-time status updates.

## When NOT to Use

- **In-App Temporary Alerts or Toasts:** For temporary user action feedback or localized error messages, use `toast-and-snackbar-system` or `banner-and-alert-system`.
- **System Error Fallbacks (404 / 500 Pages):** For full-screen web error pages or empty state feedback, use `error-and-status-system` or `empty-state-system`.
- **General Product Analytics:** For business metrics, user behavior dashboards, or internal analytics charts, use `dashboard-layout-system` or `data-visualization-system`.
- **Static Documentation or Changelogs:** For product updates, feature releases, and release notes, use `changelog-and-release-notes-system`.

## Inputs

1. **System Service Architecture:** The list of public services, APIs, databases, regions, and dependencies to monitor (e.g., Core API, Web Dashboard, Billing Gateway, US-East Region, EU-West Region).
2. **Status State Taxonomy:** The operational state classifications used across services (e.g., Operational, Degraded Performance, Partial Outage, Major Outage, Under Maintenance).
3. **Incident Data Stream:** Active incident reports, timeline updates (Investigating, Identified, Monitoring, Resolved), impact scopes, and upcoming scheduled maintenance events.
4. **Historical Uptime Metrics:** Timeframe resolution (30-day, 60-day, 90-day), uptime percentage targets (99.9%), and historical outage logs.
5. **Brand Design Tokens:** Light and dark theme surface tokens, state colors (Green/Success, Yellow/Warning, Orange/Degraded, Red/Critical, Blue/Info), typography tokens, and focus rings.

## Outputs

1. **Global Health Banner Specification:** Top-level operational state hero card that instantly communicates overall system status (e.g., "All Systems Operational" or "Active Outage - Core API Degraded").
2. **Service & Component Health Grid:** Grouped and collapsible hierarchy of individual infrastructure services with real-time status badges and 90-day uptime bars.
3. **Incident Timeline & Active Notice Canvas:** Structured chronological layout for active incident tracking, milestone progression, and post-incident reviews.
4. **Scheduled Maintenance Calendar & Notices:** Dedicated layout section for upcoming maintenance windows with impact duration and affected services.
5. **Subscription & Notification Modal Blueprint:** Accessible interface for subscribing to status alerts via Email, SMS, Webhook, RSS, or Slack.
6. **WCAG AA Accessibility Specification:** Screen-reader live region (`aria-live="polite"`), high-contrast non-color indicators (icons + text tags), keyboard navigation focus rules, and forced-colors support.

---

## Workflow

### 1. Structure the System Health Hierarchy & Hero Banner

Place the global system health status at the primary focal point of the page (top of the main content canvas):

- **Hero Status Banner:**
  - **All Systems Operational State:** Subtle green surface accent (`#ECFDF5` / `#064E3B`), prominent checkmark icon, bold headline ("All Systems Operational"), and timestamp ("Updated 1 minute ago").
  - **Degraded / Outage State:** High-contrast warning/danger accent (`#FEF2F2` / `#7F1D1D`), distinct warning symbol (triangle/alert icon), active incident headline ("Active Incident: Latency affecting US East API"), and direct anchor link ("View Incident Details ↓").
- **Header Actions:** Place a prominent "Subscribe to Updates" CTA button in the page header, opening an accessible subscription modal or drawer.

```
+-----------------------------------------------------------------------------------+
|  [Logo] ACME Cloud Status                           [ Subscribe to Updates ]     |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  +-----------------------------------------------------------------------------+  |
|  |  (✓) All Systems Operational                                                |  |
|  |  Refreshed automatically • Last updated 10:42 AM UTC                       |  |
|  +-----------------------------------------------------------------------------+  |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

### 2. Group Services & Implement 90-Day Uptime Bars

Organize individual system components into clear logical categories (e.g., Core Services, Regional Infrastructure, Third-Party Integrations):

- **Component Group Container:** Use accordion or nested list structures (`<section>` with `<h3>` section headers). Allow expanding/collapsing regional subgroups.
- **Service Status Item Row:**
  - **Left Side:** Service name, optional description tooltip, and active status tag (e.g., "Operational", "Degraded").
  - **Right Side:** Current uptime percentage (e.g., "99.98% uptime") and 90-day interactive history bar.
- **90-Day Uptime Bar Engineering:**
  - Render 90 vertical day segments (`<span>` or `<rect>`).
  - Color segments according to daily status: Green = 100% operational, Yellow = Partial outage / latency, Red = Major outage, Muted Grey = Maintenance / No data.
  - Hover / Focus Interaction: Hovering or focusing a day bar reveals an accessible tooltip displaying the date, uptime percentage, and incident links if applicable.

```
+-----------------------------------------------------------------------------------+
| System Services & Uptime (Past 90 Days)                                           |
+-----------------------------------------------------------------------------------+
| Core API                                [Operational]  99.99% Uptime              |
| ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| |
| 90 days ago                                                         Today         |
+-----------------------------------------------------------------------------------+
| Web Dashboard                           [Degraded]     98.42% Uptime              |
| ||||||||||||||||||||||||||||||||!|||||||||||||||||||||||||||||||||||||||||||||||| |
| 90 days ago                                                         Today         |
+-----------------------------------------------------------------------------------+
```

### 3. Layout Active Incidents & Timeline Progressions

Present active operational issues with an explicit chronological progression model:

- **Incident Card Layout:**
  - **Header:** Incident Title ("High Error Rates on Search API"), Severity Badge ("Major Outage"), and Timestamp.
  - **Affected Components:** Tagged chips listing specific services impacted ("Search Index", "REST API v2").
  - **Timeline Progression:** Vertical line connector displaying updates in reverse-chronological order (newest first).
- **Update Milestone States:**
  1. **Investigating:** "We are investigating reports of elevated error rates."
  2. **Identified:** "The root cause has been identified as a database connection pool bottleneck."
  3. **Monitoring:** "A fix has been applied. We are monitoring traffic recovery."
  4. **Resolved:** "The incident is resolved. System performance has returned to baseline."

```
+-----------------------------------------------------------------------------------+
| Active Incidents                                                                  |
+-----------------------------------------------------------------------------------+
| [MAJOR OUTAGE] High Error Rates on Search API                                     |
| Impacted: Search Index, REST API v2                                               |
|                                                                                   |
|  • Monitoring — Oct 12, 10:30 UTC                                                 |
|    A patch has been deployed. Error rates have dropped below 0.1%.                |
|                                                                                   |
|  • Identified — Oct 12, 09:45 UTC                                                 |
|    Root cause identified as database lock contention during index re-indexing.    |
|                                                                                   |
|  • Investigating — Oct 12, 09:15 UTC                                              |
|    Engineers are investigating spike in HTTP 500 errors on /v2/search endpoint.   |
+-----------------------------------------------------------------------------------+
```

### 4. Design Scheduled Maintenance & Historical Archives

- **Scheduled Maintenance Section:** Display upcoming maintenance windows clearly separate from active outages. Include scheduled start/end times, estimated downtime, and affected systems.
- **Historical Incident Archive:** Provide date-filtered pagination or monthly accordions to inspect past resolved incidents, complete with post-mortem links.

### 5. Build Accessible Notification Preferences (Subscribe Modal)

- Offer multiple notification channels: Email, SMS, Webhook, Slack / Teams, RSS Feed.
- Allow granular channel selection: Users can choose to subscribe only to specific critical services or major outage alerts rather than all system events.

---

## Decision Rules

- **Overall Status Aggregation Rule:**
  - If **ALL** services are operational $\rightarrow$ Global Banner = **All Systems Operational** (Green).
  - If **ANY** non-critical service has latency or minor issues $\rightarrow$ Global Banner = **Degraded Performance** (Yellow).
  - If **ANY** primary service has partial failure $\rightarrow$ Global Banner = **Partial System Outage** (Orange).
  - If **ANY** core system is completely down $\rightarrow$ Global Banner = **Major System Outage** (Red).
  - If a planned maintenance is active without unexpected outages $\rightarrow$ Global Banner = **Under Scheduled Maintenance** (Blue).
- **Color Non-Reliance Rule:** Never rely on color alone to indicate status. Every status badge must combine:
  1. **A distinct icon** (Checkmark for Operational, Exclamation Triangle for Degraded, X-Octagon for Outage, Wrench for Maintenance).
  2. **Explicit text label** ("Operational", "Degraded Performance", "Major Outage").
  3. **High-contrast CSS tokens** meeting 4.5:1 text-to-background contrast ratio.
- **Live Region Announcement Rule:** Use `aria-live="polite"` on the status summary banner so automated refreshes announce status updates to screen reader users without interrupting current speech.

---

## Constraints

### 1. Accessibility (WCAG 2.2 AA Minimum)

- **Color Contrast:** All status text and background badges must maintain a minimum contrast ratio of **4.5:1** (e.g., dark green text `#065F46` on light green background `#D1FAE5`).
- **Icons & Non-Text Elements:** Status indicator icons must have appropriate `aria-hidden="true"` if accompanied by text, or `aria-label` / `<title>` if standing alone.
- **Keyboard Navigation for Uptime Bars:** Each day bar in a 90-day uptime chart must be keyboard-focusable (`tabindex="0"`) with a clear focus ring, or wrapped in a accessible group with an interactive tabular fallback table for screen reader users.
- **Modal Dialog Focus Trap:** The "Subscribe to Updates" modal must trap focus, close on `Escape`, and return focus to the trigger button upon dismissal.

### 2. Responsiveness & Touch Performance

- **Mobile Uptime Chart Adaptations:** On narrow viewports (<640px), compress 90-day bars into 30-day bars or switch to a horizontal summary list to prevent horizontal page overflow while maintaining minimum touch targets (44×44px for day tooltips).
- **Sticky Status Bar:** On mobile viewports during active outages, anchor a compact status banner to the top of the viewport so users scrolling deep incident logs retain visual status context.

---

## Common Failure Patterns

- **Color-Only Status Indicators:** Relying on green/yellow/red dots without text labels or distinct icons, rendering the status page unusable for colorblind users.
- **Ambiguous Operational Taxonomy:** Using vague status descriptions like "Unstable" or "Issues" instead of precise states ("Degraded Performance", "Partial Outage", "Under Maintenance").
- **Hidden Incident Timelines:** Hiding active incident updates inside collapsed menus or external links instead of displaying chronological progression directly on the main status page.
- **Inaccessible Uptime Tooltips:** Creating 90-day uptime bar charts using hover-only tooltips that cannot be accessed via keyboard or read by screen readers.
- **Stale Status Information:** Failing to display clear "Last Updated" timestamps or automatic background refresh indicators, leaving users uncertain if data is live.

---

## Validation Criteria

- [ ] Global health status banner clearly communicates top-level operational health at first glance.
- [ ] Every status indicator combines icon, explicit text label, and WCAG AA compliant color contrast (4.5:1 min).
- [ ] Active incidents feature reverse-chronological progression milestones (Investigating, Identified, Monitoring, Resolved).
- [ ] 90-day uptime chart bars are keyboard-focusable and accessible via screen readers.
- [ ] System automatically announces dynamic status updates via an `aria-live="polite"` region.
- [ ] "Subscribe to Updates" modal contains accessible form controls and focus trap.
- [ ] Layout adapts gracefully to mobile viewports without horizontal scrolling or tiny touch targets.
