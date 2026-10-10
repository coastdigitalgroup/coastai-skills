# Status Indicator Taxonomy, Color Matrix & Layout Rules

This reference guide establishes strict design tokens, color contrast standards, shape taxonomies, ARIA live region policies, and layout dimensions for public status pages and system availability portals.

---

## 1. Five-Tier System State Taxonomy & Color Matrix

To ensure clarity and accessibility, every status state must pair a distinct background tint, text color, border token, icon shape, and text string. Color must **never** be used alone (WCAG 1.4.1).

| Status State | Description | Background Tint | Text Color | Border Color | Icon Shape | Icon Path / Symbol | WCAG AA Contrast |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Operational** | All component sub-systems operating normally within expected latency thresholds. | `#DCFCE7` (Green 100) | `#15803D` (Green 700) | `#86EFAC` (Green 300) | Circle Checkmark | `✓` (Inside solid or outlined circle) | **5.8:1** (Passes) |
| **Degraded Performance** | Service fully functional but experiencing elevated response latencies or minor non-blocking errors. | `#FEF3C7` (Amber 100) | `#78350F` (Amber 900) | `#FCD34D` (Amber 300) | Circle Exclamation | `!` (Inside filled circle) | **7.2:1** (Passes) |
| **Partial Outage** | A subset of users, regional locations, or non-critical sub-components are unavailable. | `#FFEDD5` (Orange 100) | `#9A3412` (Orange 800) | `#FDBA74` (Orange 300) | Warning Triangle | `▲` with `!` center | **5.9:1** (Passes) |
| **Major Outage** | Critical core platform infrastructure is unnavigable or offline for all or most users. | `#FEE2E2` (Red 100) | `#B91C1C` (Red 700) | `#FCA5A5` (Red 300) | Octagon Cross | `✕` (Inside solid octagon shape) | **6.4:1** (Passes) |
| **Under Maintenance** | Planned operational window for routine hardware, software, or network upgrades. | `#DBEAFE` (Blue 100) | `#1E40AF` (Blue 800) | `#93C5FD` (Blue 300) | Wrench / Clock | `⚙` or `🕒` symbol | **6.1:1** (Passes) |

---

## 2. Global Status Banner Calculation Logic

The global hero banner status is computed dynamically based on the **highest severity state** active across all registered components:

$$\text{Global Status} = \max(\text{Severity}(\text{Component}_1), \text{Severity}(\text{Component}_2), \dots, \text{Severity}(\text{Component}_n))$$

$$\text{Severity Order:} \quad \text{Major Outage} > \text{Partial Outage} > \text{Degraded Performance} > \text{Under Maintenance} > \text{Operational}$$

### Banner Headline & Subtitle Rules:
- **Major Outage:**
  - Headline: *"Major System Outage"*
  - Subtitle: *"We are experiencing a major service disruption across core infrastructure. Our engineering team is actively investigating."*
- **Partial Outage:**
  - Headline: *"Partial System Outage"*
  - Subtitle: *"Some core services are currently impacted. Certain features or regions may be temporarily unavailable."*
- **Degraded Performance:**
  - Headline: *"Degraded Performance"*
  - Subtitle: *"All systems are functional, but some API endpoints are experiencing higher than normal response times."*
- **Under Maintenance:**
  - Headline: *"Scheduled System Maintenance"*
  - Subtitle: *"Planned maintenance is currently underway. Some services may operate in read-only mode."*
- **Operational:**
  - Headline: *"All Systems Operational"*
  - Subtitle: *"All core infrastructure, APIs, and edge gateways are operating normally without incident."*

---

## 3. ARIA & Live Region Policies

To ensure real-time status changes are communicated immediately to assistive technology users:

1. **Global Banner Live Region (`aria-live="polite"`):**
   ```html
   <section class="status-banner" aria-live="polite" aria-atomic="true">
     <!-- Dynamic Banner Content -->
   </section>
   ```
   - Use `aria-live="polite"` for general status updates so the screen reader finishes reading the current focused element before announcing status shifts.
   - Upgrade to `aria-live="assertive"` ONLY during active `Major Outage` declarations.

2. **90-Day Uptime Bar Accessibility:**
   - Wrap bar chart in `<div role="region" aria-label="[Component Name] 90-day uptime history">`.
   - Each daily bar MUST include `tabindex="0"` and an explicit text alternative:
     ```html
     <div class="uptime-bar" tabindex="0" aria-label="October 24, 2023: 99.12% Uptime, 1 partial incident"></div>
     ```
   - Provide an off-screen textual summary string (`.sr-only`) for fast non-visual scanning:
     ```html
     <span class="sr-only">Core API Gateway 90-day average uptime is 99.88% with 1 partial outage on Oct 24.</span>
     ```

3. **Windows Forced Colors Mode (High Contrast Mode):**
   - In forced colors mode, custom background tints are stripped by the operating system.
   - Status badges MUST maintain explicit CSS borders using system color keywords:
     ```css
     @media (forced-colors: active) {
       .status-badge {
         border: 1px solid ButtonText !important;
         forced-color-adjust: none;
       }
       .status-badge--success { color: Highlight; }
       .status-badge--danger { color: LinkText; }
     }
     ```

---

## 4. Layout Dimensions & Spatial Grid Rules

```text
+-----------------------------------------------------------------------------+
| Container Max-Width: 1040px / 65rem (Centered)                             |
| Outer Container Margin: Auto | Horizontal Padding: 1.5rem (24px)           |
+-----------------------------------------------------------------------------+
| Global Status Banner:                                                        |
| Padding: 1.5rem (24px) | Border-Radius: 12px | Gap: 1rem (16px)           |
+-----------------------------------------------------------------------------+
| Card Sections (Active Incidents, Component Grid):                           |
| Background: #FFFFFF | Border: 1px solid #E2E8F0 | Border-Radius: 12px      |
| Inner Padding: 1.5rem (24px) | Card Gap: 1.5rem (24px)                    |
+-----------------------------------------------------------------------------+
| Component Row:                                                              |
| Vertical Padding: 0.875rem (14px) | Border-Bottom: 1px solid #E2E8F0       |
| Status Badge Height: 28px | Touch Target Min-Height: 44px                   |
+-----------------------------------------------------------------------------+
| 90-Day Uptime Graph:                                                        |
| Height: 32px | Daily Bar Width: 3px–4px | Bar Gap: 1px–2px                 |
| Hover Tooltip Offset: -40px Top | Tooltip Padding: 0.5rem 0.75rem          |
+-----------------------------------------------------------------------------+
```
