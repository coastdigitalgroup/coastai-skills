---
name: status-page-system
description:
  Design and structure public status pages, system health dashboards, availability transparency portals,
  and operational health monitors with status color taxonomies, uptime metrics visualizers, incident timeline progression,
  scheduled maintenance notices, subscriber notification modals, and WCAG AA accessibility.
---

# Status Page System

## Purpose

The Status Page System provides a standardized framework for designing, structuring, and layout-engineering public status pages, system health dashboards, operational health monitors, and availability transparency portals across SaaS platforms, cloud infrastructure providers, API services, e-commerce platforms, and enterprise web applications.

Public status pages serve as the primary source of truth during service disruptions and high-severity incidents. When an outage occurs, thousands of users simultaneously flood the status page seeking immediate clarity on system state, impacted subsystems, root causes, and estimated resolution timelines. Without a structured status page design system, organizations suffer from ambiguous status messaging, color-only state indicators that fail colorblind users, chaotic unformatted incident timelines, hidden historical uptime metrics, poor mobile responsiveness, and high customer support ticket volumes.

This system establishes concrete design rules for global health status banners, shape-augmented status taxonomies, 90-day uptime bar visualizers, service component hierarchy trees, active incident progression timelines, scheduled maintenance cards, subscriber notification drawers/modals, and WCAG 2.1 AA compliant accessibility.

## Use Cases

- **SaaS & Cloud Platform Operational Transparency:** Communicating real-time availability and subsystem health (e.g., API Gateway, Dashboard, Webhooks, Database Clusters) to self-serve users and enterprise clients.
- **API & Developer Tool Infrastructure:** Displaying granular endpoint group latency and regional service availability (e.g., US-East, EU-Central, AP-South) with 90-day historical uptime bar breakdowns.
- **E-Commerce & Payment Gateways:** Providing real-time operational status for checkout engines, payment processing gateways, inventory sync services, and third-party fulfillment webhooks.
- **Enterprise Service Level Agreement (SLA) Portals:** Publishing verifiable monthly/quarterly uptime percentage metrics (e.g., 99.95% uptime) for compliance and SLA verification.
- **Incident Escalation & Public Communication:** Managing real-time incident lifecycle updates (Investigating -> Identified -> Monitoring -> Resolved) with timestamped records during ongoing outages.

## When NOT to Use

- **In-App Temporary Banner Alerts:** For brief, contextual info or warning banners rendered within an authenticated web application layout, use `banner-and-alert-system`.
- **System Exception & HTTP Error Pages:** For standalone 404, 500, or network disconnect error screens presented to a user when a page fails to load, use `error-and-status-system`.
- **Internal Microservice Telemetry Dashboards:** For high-density, real-time internal engineering dashboards with heavy time-series charts (e.g., Grafana/Datadog charts), use `dashboard-layout-system` or `data-visualization-system`.
- **User Activity & Security Audit Logs:** For chronological user actions, account changes, or audit histories within a user settings portal, use `timeline-activity-system`.

## Inputs

1. **System Topology & Component Hierarchy:** Infrastructure schema mapping core service groups (e.g., Core API, Storage, Authentication) and sub-services, including regional locations.
2. **Current System Operational State:** Real-time global health status (Operational, Performance Degradation, Partial Outage, Major Outage, Under Maintenance).
3. **Active Incidents & Scheduled Maintenance Data:** Incident severity, title, timestamped update logs, impacted components, and scheduled maintenance windows.
4. **Historical Uptime Dataset:** Daily availability data (typically 60 to 90 days) per service component, including duration and severity of past incidents.
5. **Notification Subscription Channels:** Available user alert channels (Email, SMS, Webhook, Slack, RSS feed).
6. **Brand & Surface Tokens:** Design system tokens for neutral background surfaces, status colors, border tokens, typography scale, and focus rings from `accessible-color-system` and `fluid-typography-system`.

## Outputs

1. **Global Health Banner Blueprint:** Design specification for the top hero status banner, featuring dynamic state headers, ambient status styling, and global timestamp indicators.
2. **Component Health Matrix & Uptime Visualizer Spec:** Spatial layout for nested service component lists, 90-day interactive daily uptime bar strips, and average uptime percentage metrics.
3. **Incident Progression Timeline Blueprint:** Structuring timestamped incident logs (Investigating, Identified, Monitoring, Resolved) with semantic badge tags and rich typography measures.
4. **Scheduled Maintenance Notice Card Spec:** Layout guidelines for upcoming maintenance events, detailing affected services, window start/end times, and expected customer impact.
5. **Subscriber Notification Modal / Drawer Spec:** Layout and interaction spec for multi-channel alert signup modals (Email, SMS, Webhook, RSS) with WCAG AA form validation.
6. **Accessible Indicator & ARIA Markup Spec:** High-contrast, shape-augmented status taxonomy (`aria-live` region, icon shapes, contrast ratios ≥ 4.5:1) ensuring accessibility across screen readers and high-contrast modes.

---

## Workflow

### 1. Structure the Page Layout Architecture
Establish a clean vertical layout hierarchy designed for immediate scanning during high-stress incident lookups:

```text
+-----------------------------------------------------------------------+
|  PAGE HEADER: Logo, System Title, "Subscribe to Updates" CTA          |
+-----------------------------------------------------------------------+
|  GLOBAL HEALTH BANNER: Primary Operational State & Timestamp          |
|  [ ✓ All Systems Operational ] or [ ⚡ Partial System Outage ]        |
+-----------------------------------------------------------------------+
|  ACTIVE INCIDENT SECTION (Renders conditionally when incident active)  |
|  - Incident Title, Severity Badge, Component Tag                      |
|  - Chronological Updates: Resolved -> Monitoring -> Investigating     |
+-----------------------------------------------------------------------+
|  SYSTEM METRICS & UPTIME MATRIX                                       |
|  - Service Group: Core Infrastructure                                 |
|    - API Gateway           [ 90-Day Daily Uptime Bars ]  99.98%      |
|    - Authentication        [ 90-Day Daily Uptime Bars ]  100.0%      |
|  - Service Group: Payment Processing                                  |
|    - Credit Card Engine    [ 90-Day Daily Uptime Bars ]  99.85%      |
+-----------------------------------------------------------------------+
|  SCHEDULED MAINTENANCE SECTION (Upcoming maintenance windows)         |
+-----------------------------------------------------------------------+
|  HISTORICAL INCIDENT ARCHIVE / PAST INCIDENTS LIST                    |
+-----------------------------------------------------------------------+
|  FOOTER: SLA links, Support Contact, Timezone Indicator               |
+-----------------------------------------------------------------------+
```

- **Container Constraint:** Set main layout measure to `max-width: 1024px` (or 64rem) centered with responsive padding (`1rem` on mobile, `2rem` on desktop) to optimize readability and scannability.
- **Top Bar Integration:** Place brand identifier on the left and a prominent secondary CTA button ("Subscribe to Updates") on the top right using `button-and-action-system`.

### 2. Define the Status Indicator Taxonomy
Never rely solely on color (e.g., green vs. red) to convey system state. Combine distinct status colors, text labels, and geometric shapes to satisfy WCAG 2.1 AA (SC 1.4.1 Use of Color):

```text
STATUS LEVEL           INDICATOR COLOR      SHAPE ICON        ARIA SEMANTIC TEXT
--------------------   ------------------   ---------------   --------------------------
Operational            Emerald Green        Check Circle      "Operational"
Performance Degraded   Amber Yellow         Triangle Alert    "Performance Degradation"
Partial Outage         Orange               Square Alert      "Partial System Outage"
Major Outage           Crimson Red          Octagon Exclaim   "Major System Outage"
Under Maintenance      Royal Blue / Slate   Wrench / Gear     "Under Scheduled Maintenance"
```

- **Global Banner Styling:**
  - **Operational State:** Subtle green background tint (`background-color: var(--color-success-subtle)`), dark green text (`color: var(--color-success-text)`), bold headline: *"All Systems Operational"*.
  - **Outage / Degradation State:** High-visibility banner tint matching the highest active severity level, bold headline: *"Active Incident: Partial System Outage"*, with a direct jump link to the active incident timeline (`href="#active-incidents"`).
  - **Live Timestamp:** Display last updated time with explicit timezone (e.g., *"Updated 2 mins ago — Oct 24, 14:32 UTC"*).

### 3. Design the Component Health Matrix & 90-Day Uptime Bars
Structure individual services into logical accordion groups or expandable card lists:

- **Group Header & Service Items:**
  - Service group headers (`h2` or `h3`) segment core platform modules (e.g., "Developer API", "Web Application", "Database & Analytics").
  - Each service row displays:
    1. Service Name + Info Tooltip (e.g., "REST API", describing scope).
    2. Operational Status Badge (Shape + Color + Text label).
    3. 90-Day Daily Uptime Visualizer (Interactive horizontal bar strip).
    4. 90-Day Uptime Percentage (e.g., "99.98%").
- **90-Day Uptime Bar Strip Design:**
  - Render 90 vertical pill bars inside a flex container (`gap: 2px`).
  - Bar dimensions: `width: 100%` flexible (`min-width: 3px`–`4px`), `height: 28px`–`32px`, `border-radius: 2px`.
  - Bar Color Rules:
    - **No Incidents (100%):** Solid Emerald (`--color-success`).
    - **Minor Degradation / Short Outage:** Amber or Orange.
    - **Major Outage (>30 mins):** Crimson Red (`--color-danger`).
    - **Scheduled Maintenance:** Slate / Blue (`--color-info`).
  - **Interactive Hover / Focus Tooltip:** Hovering or focusing a daily bar displays a precise tooltip (`tooltip-and-hint-system`) specifying date and incident summary (e.g., *"Aug 14, 2024: 1 major incident (42 mins downtime)"*).

### 4. Structure the Active Incident & Maintenance Timelines
Present ongoing outages and planned maintenance in clear reverse-chronological order:

- **Active Incident Card:**
  - Position directly below the Hero Banner when an incident is open.
  - Card Header: Incident Title (`<h3>`), Severity Tag, Affected Component Badges, and Start Time.
  - Chronological Update Stream (Newest update at the top):
    - **Update Item Anatomy:**
      - **Status Badge:** `Resolved`, `Monitoring`, `Identified`, or `Investigating`.
      - **Timestamp:** Local time + UTC offset (e.g., *"Oct 24, 14:15 UTC"*).
      - **Update Body Text:** Concise operational description of engineering actions taken.
- **Scheduled Maintenance Card:**
  - Display upcoming maintenance windows in an info card block (`background-color: var(--surface-subtle)`).
  - List: Maintenance Title, Expected Duration (e.g., *"Oct 28, 02:00 – 04:00 UTC (2 hours)"*), Affected Services, and Mitigation Guidance (e.g., *"API requests may experience higher latency during this window"*).

### 5. Build the Multi-Channel Subscription Modal / Drawer
Allow users to subscribe to real-time incident updates via a dedicated modal or slide-out drawer (`overlay-and-dialog-system`):

- **Trigger:** "Subscribe to Updates" header button.
- **Channel Tabs / Options:**
  - **Email:** Input field for email address.
  - **SMS:** Phone number input with country code picker.
  - **Webhook:** Endpoint URL input for automated PagerDuty/Slack integrations.
  - **Atom/RSS Feed:** Direct copyable RSS feed link.
- **Notification Granularity Checkboxes:** Allow users to select specific service components or severity levels (e.g., *"Only notify me about Major Outages"*).
- **Form Feedback:** Inline success announcement (`aria-live="polite"`) upon subscription submission.

---

## Decision Rules

### Layout & Component Density Selection Matrix

| Scenario / Service Count | Recommended Component Layout | Uptime Visualizer Type | Incident Display Strategy |
| :--- | :--- | :--- | :--- |
| **1 – 5 Core Services** (Simple SaaS / App) | **Flat Card List** | 90-Day Daily Bar Strip + Percentage | Full Timeline Card below Header |
| **6 – 15 Services** (Multi-Product SaaS) | **Grouped Card Accordions** | 90-Day Daily Bar Strip | Prominent Incident Banner + Jump Link |
| **15+ Regional Services** (Cloud Infra / API) | **Nested Categorized Matrix** | Compact 60-Day Bar Strip or Status Pill | Collapsible Incident Stream by Region |

### Status Severity Level Mapping

| Condition | Banner Variant | Status Badge | Uptime Bar Color | Incident Tag |
| :--- | :--- | :--- | :--- | :--- |
| All systems operating within normal parameters | Success Tint | Emerald Check Circle | Emerald `#10B981` | None |
| Higher response latency; non-critical feature impact | Warning Amber Tint | Amber Alert Triangle | Amber `#F59E0B` | `Degraded Performance` |
| Primary feature down; partial system failure | Warning Orange Tint | Orange Alert Square | Orange `#F97316` | `Partial Outage` |
| Core infrastructure down; service completely unusable | Danger Crimson Tint | Crimson Octagon Exclamation | Crimson `#EF4444` | `Major Outage` |
| Pre-announced maintenance window actively in progress | Info Blue Tint | Blue Wrench / Gear | Royal Blue `#3B82F6` | `Under Maintenance` |

---

## Constraints

- **Accessibility (WCAG 2.1 / 2.2 AA):**
  - **SC 1.4.1 Use of Color:** Every status badge, uptime bar tooltip, and banner MUST include explicit text labels or distinct geometric icons alongside color.
  - **SC 1.4.3 Contrast (Minimum):** All text (labels, timestamps, incident updates) must satisfy at least **4.5:1** contrast ratio against dark or light background surfaces.
  - **SC 2.1.1 Keyboard Accessibility:** Every daily uptime bar must be focusable (`tabindex="0"`) via keyboard, displaying the tooltip on focus.
  - **SC 4.1.2 Name, Role, Value:** Dynamic status updates must be wrapped inside an `aria-live="polite"` region so screen reader users receive automatic announcements during real-time status changes.
- **Responsiveness & Mobile Adaptation:**
  - On mobile viewports (`< 768px`), 90-day uptime bar strips MUST scale down gracefully or combine into 30-day condensed segments without breaking out of the container or creating horizontal page scrolling.
  - Touch targets for interactive bars or subscribe buttons must satisfy minimum **44x44px** hit area.
- **Performance & Lightweight Footprint:**
  - Status pages MUST load in under 1 second under high load during major outages. Minimize heavy external JS libraries or unoptimized assets.

---

## Common Failure Patterns

- **Color-Only Status Badges:** Displaying plain green, yellow, or red dots without text labels or shape differences, rendering the status page unusable for colorblind users.
- **Cryptic Technical Jargon:** Publishing raw internal microservice codes (e.g., `"srv-pod-us-east-4a degraded"`) instead of customer-understandable service names (e.g., *"US-East Payment Processing"*).
- **Missing Timezone Context:** Displaying timestamps as `"Updated at 10:15"` without specifying local timezone or UTC, causing confusion for global users.
- **Non-Keyboard Accessible Uptime Bars:** Building daily uptime bar charts with pure CSS hover triggers without `tabindex="0"` or focus event handlers, hiding historical incident details from keyboard users.
- **Horizontal Scrollbar Overflow on Mobile:** Setting fixed pixel widths on 90-day bar charts (e.g., `width: 700px`), causing horizontal scrollbars and broken layouts on mobile screens.
- **Opaque Incident Updates:** Leaving an active incident card stuck on *"Investigating"* for 3 hours without posting periodic status updates.

---

## Validation Criteria

- [ ] Global status hero banner displays explicit headline, timestamp, timezone, and shape-augmented status badge.
- [ ] Status indicators satisfy WCAG AA by combining color, text label, and geometric shape icons (Check Circle, Alert Triangle, Alert Square, Octagon Exclamation).
- [ ] All text elements (labels, dates, descriptions) achieve at least 4.5:1 contrast ratio against background surfaces.
- [ ] 90-day daily uptime bars are keyboard focusable (`tabindex="0"`) and display details via focusable tooltips.
- [ ] Service components are organized in logical groups with clear operational status badges and uptime percentages.
- [ ] Active incident stream lists updates in reverse-chronological order with semantic badges (Investigating, Identified, Monitoring, Resolved).
- [ ] Responsive layout adapts cleanly to mobile viewports (`< 768px`) without horizontal overflow.
- [ ] Subscribe to updates modal/drawer provides accessible channel options (Email, SMS, Webhook, RSS) with proper form controls and focus traps.
