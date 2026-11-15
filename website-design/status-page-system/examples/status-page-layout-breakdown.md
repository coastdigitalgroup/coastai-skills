# Status Page System - Layout Breakdown & Case Study

This document breaks down a production-grade status page design for a high-availability B2B SaaS and API platform (**Acme Cloud Services**) operating during an active partial service degradation incident.

---

## 1. Overall Page Layout & Wireframe Architecture

The page follows a vertical single-column container (`max-width: 1080px`, centered) with clearly separated section blocks.

```text
+-----------------------------------------------------------------------------------+
|  ACME CLOUD                                                [ Subscribe to Updates ]|
|  System Status                                                                    |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  [!] PARTIAL SYSTEM OUTAGE                                                        |
|  Some systems are experiencing degraded performance. Updated 3 mins ago.          |
|  90-Day System Uptime: 99.94%                                                     |
|                                                                                   |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  ACTIVE INCIDENT                                                                  |
|  Elevated Error Rates on REST API Gateway (EU-West Region)                       |
|  Status: Monitoring | Severity: Partial Outage | Started: Oct 24, 14:15 UTC         |
|                                                                                   |
|  ● MONITORING - Oct 24, 15:02 UTC                                                 |
|    Fix deployed. We are observing latency metrics returning to baseline.           |
|                                                                                   |
|  ● IDENTIFIED - Oct 24, 14:40 UTC                                                |
|    Issue traced to database connection pool exhaustion in EU-West-1.              |
|                                                                                   |
|  ● INVESTIGATING - Oct 24, 14:15 UTC                                              |
|    We are investigating elevated 504 gateway timeouts on REST API requests.       |
|                                                                                   |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  SCHEDULED MAINTENANCE                                                            |
|  Q4 Database Maintenance Window                                                   |
|  Scheduled: Nov 02, 02:00 UTC - 04:00 UTC (In 9 days)                              |
|  Impact: Read-only access for core web dashboard during maintenance window.        |
|                                                                                   |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  SYSTEM COMPONENTS & AVAILABILITY                                                 |
|                                                                                   |
|  [▼] Core Infrastructure Services                                                 |
|  ├── REST API Gateway                                           Degraded [!]      |
|  │   |||||||||||||||||||||||||||||||||||||||||||||||||||||||||  99.88%            |
|  ├── GraphQL API                                                Operational [✓]   |
|  │   |||||||||||||||||||||||||||||||||||||||||||||||||||||||||  100.0%            |
|  └── Webhook Dispatch Engine                                    Operational [✓]   |
|      |||||||||||||||||||||||||||||||||||||||||||||||||||||||||  99.99%            |
|                                                                                   |
|  [▼] Regional Edge Gateways                                                       |
|  ├── US-East (N. Virginia)                                      Operational [✓]   |
|  ├── EU-West (Ireland)                                          Partial Outage [✕]|
|  └── AP-Southeast (Tokyo)                                       Operational [✓]   |
|                                                                                   |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  HISTORICAL INCIDENTS (PAST 30 DAYS)                                              |
|  * Oct 12, 2023 - Webhook Delivery Delay (Resolved - 24 mins duration)             |
|  * Sep 28, 2023 - Scheduled SSO Provider Upgrades (Completed)                     |
|                                                                                   |
+-----------------------------------------------------------------------------------+
|  Acme Cloud Inc. © 2023 · Security · Terms · Privacy · RSS Feed                  |
+-----------------------------------------------------------------------------------+
```

---

## 2. Component Design & Anatomy Breakdown

### A. Global Status Hero Banner (`Partial Outage State`)
- **Visual Container:** Amber tinted background surface (`background-color: #FEF3C7; border: 1px solid #F59E0B`).
- **Typography:**
  - Headline: `24px` / `font-weight: 700` (`color: #78350F`). Text: **"PARTIAL SYSTEM OUTAGE"**.
  - Subtitle: `15px` / `line-height: 1.5` (`color: #92400E`). Text: *"Some core systems are currently experiencing degraded performance. Our engineering team is actively managing an incident."*
- **Visual Icon:** Amber warning triangle with exclamation mark (`width: 28px`, `height: 28px`, `aria-hidden="true"`).
- **Secondary Metrics:** Right-aligned inline badges displaying last updated relative timestamp (`Updated 3m ago`) and overall 90-day system uptime percentage (`99.94% Uptime`).

### B. Active Incident Progression Timeline Card
- **Header Section:**
  - Incident Title: `18px` / `font-weight: 600` (`color: #0F172A`).
  - Metadata Badges: Severity Badge (`Partial Outage` with orange tint + icon), Impacted Components (`REST API Gateway`, `EU-West`), Start Timestamp (`Started Oct 24, 14:15 UTC`).
- **Timeline Progression Nodes:**
  - Left Track: `2px` vertical connecting line (`background-color: #E2E8F0`) with circular status node bullets (`width: 12px`, `height: 12px`).
  - Stage Badges & Timestamp:
    - `MONITORING` (Blue badge): **Oct 24, 15:02 UTC** - *"Fix deployed to EU-West cluster. Connection pool limits expanded. API response latencies are returning to baseline levels."*
    - `IDENTIFIED` (Yellow badge): **Oct 24, 14:40 UTC** - *"The root cause has been identified as database connection pool exhaustion following a traffic spike in the EU-West-1 region."*
    - `INVESTIGATING` (Orange badge): **Oct 24, 14:15 UTC** - *"We are investigating reports of elevated 504 gateway timeouts and response latencies affecting the REST API in EU-West."*

### C. System Components & 90-Day Uptime Grid
- **Category Accordion Header:**
  - Left: Category name ("Core Infrastructure Services") in `16px` semi-bold heading.
  - Right: Category aggregate status badge ("Degraded Performance").
- **Component Row Anatomy:**
  - Column 1 (Component Name): `15px` medium text ("REST API Gateway") + hover tooltip trigger icon explaining scope.
  - Column 2 (Status Badge): Right-aligned status pill (`Degraded Performance` on amber tint, with `!` icon and text).
  - Column 3 (90-Day Bar Graph):
    - Flex container featuring 90 vertical daily bars (`height: 32px`, `width: 4px`, `gap: 2px`).
    - Bar color mapping: Green (`#16A34A` for 100% uptime), Amber (`#F59E0B` for degraded performance on Oct 24), Red (`#DC2626` for major outage).
    - Hover / Focus Interaction: Tooltip appears positioned above the focused day bar displaying: `Oct 24, 2023: 99.12% Uptime (1 incident)`.

### D. Multi-Channel Notification Subscription Modal
- **Trigger:** Top-right hero banner button: `[ Subscribe to Updates ]` (`button-and-action-system`).
- **Modal Surface (`overlay-and-dialog-system`):**
  - Header: *"Subscribe to System Status Updates"* with close button (`✕`).
  - Channel Navigation Tabs (`tab-ui-system`): `[ Email ]`, `[ SMS ]`, `[ Webhook ]`, `[ Slack ]`, `[ RSS ]`.
  - Email Tab Form:
    - Input Label: *"Email Address"* (`form-design-system`).
    - Component Granularity Checkboxes: Allows users to opt-in strictly to specific components (e.g., Checkbox for "REST API Gateway", Checkbox for "EU-West Region").
    - Action CTA: `[ Subscribe to Notifications ]` primary button.

---

## 3. Responsiveness & Adaptive Behavior

| Breakpoint / Device | Hero Banner Layout | Component Grid Layout | 90-Day Uptime Bars |
| :--- | :--- | :--- | :--- |
| **Desktop (`≥ 1024px`)** | Horizontal flex layout with headline left, metrics & subscribe button right. | 2-column flex row (Component title left, status badge & 90-day bars right). | All 90 daily bars visible side-by-side (`4px` bar width). |
| **Tablet (`768px - 1023px`)** | Stacked hero banner layout with subscribe button full-width below subtext. | Component title & status badge top row, 90-day bars stacked below full width. | 90 daily bars rendered with narrower width (`3px` bar width). |
| **Mobile (`< 768px`)** | Single column stack with prominent alert icon top-centered. | Vertical card layout for each component with status pill right-aligned. | 30-day condensed bar view with "Show 90-day history" expand trigger, or text summary. |

---

## 4. Accessibility & Inclusive Design Verification

1. **Colorblindness Protection (WCAG 1.4.1):**
   - Every status indicator pairs color with explicit text (`Operational`, `Degraded`, `Partial Outage`) and geometric icons (`✓` checkmark circle, `!` warning triangle, `✕` octagon cross).
2. **Text & Graphic Contrast (WCAG 1.4.3 & 1.4.11):**
   - Amber banner text `#78350F` on `#FEF3C7` background = **7.2:1 contrast ratio** (Exceeds 4.5:1 AA requirement).
   - Green operational badge `#15803D` text on `#DCFCE7` background = **5.8:1 contrast ratio**.
   - Red outage badge `#B91C1C` text on `#FEE2E2` background = **6.4:1 contrast ratio**.
3. **Screen Reader Live Announcements (WCAG 4.1.2):**
   - Global status banner is wrapped in an `<section aria-live="polite" aria-atomic="true">` region, announcing status changes automatically when updated via real-time WebSocket or polling.
4. **Keyboard Focus & High Contrast Mode:**
   - 90-day uptime bars are focusable via keyboard `Tab` with visible `2px solid #2563EB` focus ring.
   - Forced colors mode (`Windows High Contrast`) overrides background fills with explicit CSS borders (`1px solid ButtonText`).
