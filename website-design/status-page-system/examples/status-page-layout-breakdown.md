# Status Page System — Layout Breakdown & Case Study

This document provides a realistic layout breakdown of a public status page applied to a cloud platform during both operational state and an active high-severity incident.

---

## 1. Global Page Structure & Spatial Layout

```text
+-----------------------------------------------------------------------------------------+
| HEADER                                                                                  |
| [ Logo ] Acme Cloud System Status                [ Bell Icon ] Subscribe to Updates     |
+-----------------------------------------------------------------------------------------+
| HERO STATUS BANNER (ACTIVE INCIDENT STATE)                                              |
| ⚡ Active Incident: Partial Outage in US-East Data Storage                              |
| Last updated 3 minutes ago — Oct 24, 2024, 15:42 UTC                                    |
| [ Jump to Active Incident Timeline ↓ ]                                                  |
+-----------------------------------------------------------------------------------------+
| SECTION: ACTIVE INCIDENTS (1)                                                           |
| +-------------------------------------------------------------------------------------+ |
| | [ Square Icon ] Partial Outage: US-East Object Storage Latency Spikes               | |
| | Impacted Services: US-East Storage, Core API Gateway | Started: Oct 24, 14:10 UTC    | |
| | ----------------------------------------------------------------------------------- | |
| | Chronological Updates (Newest First):                                               | |
| |                                                                                     | |
| | [ Badge: Monitoring ] Oct 24, 15:39 UTC                                             | |
| | A fix has been deployed to affected storage nodes. Error rates have returned to     | |
| | baseline (<0.01%). We are monitoring system telemetry before declaring resolution.  | |
| |                                                                                     | |
| | [ Badge: Identified ] Oct 24, 14:45 UTC                                             | |
| | The root cause has been identified as a corrupted routing table in node cluster 4B. | |
| | Isolation procedures are underway.                                                  | |
| |                                                                                     | |
| | [ Badge: Investigating ] Oct 24, 14:10 UTC                                          | |
| | We are investigating reports of elevated API latency and timeout errors in US-East. | |
| +-------------------------------------------------------------------------------------+ |
+-----------------------------------------------------------------------------------------+
| SECTION: SERVICE COMPONENT STATUS & 90-DAY UPTIME                                       |
|                                                                                         |
| Group: Core Infrastructure & API                                                        |
| +-------------------------------------------------------------------------------------+ |
| | Service            Status              90-Day Uptime History               90d %    | |
| | REST API Gateway   [✓ Operational]     [||||||||||||||||||||||||||||||||]  99.99%   | |
| | Authentication     [✓ Operational]     [||||||||||||||||||||||||||||||||]  100.0%   | |
| | US-East Storage    [⚡ Partial Outage]  [|||||||||||||||!||||||||||||||||]  99.82%   | |
| | EU-West Storage    [✓ Operational]     [||||||||||||||||||||||||||||||||]  100.0%   | |
| +-------------------------------------------------------------------------------------+ |
|                                                                                         |
| Group: Payment & Commerce Engine                                                        |
| +-------------------------------------------------------------------------------------+ |
| | Credit Card Sync   [✓ Operational]     [||||||||||||||||||||||||||||||||]  100.0%   | |
| | Webhook Engine     [✓ Operational]     [||||||||||||||||||||||||||||||||]  99.95%   | |
| +-------------------------------------------------------------------------------------+ |
+-----------------------------------------------------------------------------------------+
| SECTION: SCHEDULED MAINTENANCE (1)                                                      |
| +-------------------------------------------------------------------------------------+ |
| | [ Wrench Icon ] Planned Database Upgrade — EU-West Region                            | |
| | Scheduled for Oct 28, 2024, 02:00 UTC – 04:00 UTC (Expected Duration: 2 Hours)      | |
| | Affected Services: EU-West Database Engine                                          | |
| | Impact: Short read-only periods lasting up to 5 minutes during failover switch.     | |
| +-------------------------------------------------------------------------------------+ |
+-----------------------------------------------------------------------------------------+
| FOOTER                                                                                  |
| System Timezone: UTC | Contact Support | SLA Compliance Report | Past Incidents Archive |
+-----------------------------------------------------------------------------------------+
```

---

## 2. Key Visual & Accessibility Design Details

### Hero Status Banner Mechanics
- **Operational Normal State:**
  - Background: `#F0FDF4` (Emerald 50 tint).
  - Border: `1px solid #BBF7D0`.
  - Icon: Green filled circle with white checkmark.
  - Heading: *"All Systems Operational"* (`#166534`, 1.5rem, semi-bold).
- **Active Outage State:**
  - Background: `#FFF7ED` (Orange 50 tint).
  - Border: `1px solid #FED7AA`.
  - Icon: Orange square alert icon.
  - Heading: *"Active Incident: Partial Outage in US-East Data Storage"* (`#9A3412`, 1.5rem, bold).
  - Includes action link: *"Jump to Active Incident Timeline ↓"*.

### Shape-Augmented Status Badge Taxonomy
To ensure WCAG 2.1 AA compliance (SC 1.4.1 Use of Color), each status badge uses a unique icon shape, background tint, and explicit text label:

1. **Operational:**
   - Shape: Circle with Checkmark `(✓)`
   - Color: `#059669` (Emerald Green) on `#ECFDF5`
   - Label: `"Operational"`
2. **Performance Degradation:**
   - Shape: Equilateral Triangle `(▲)`
   - Color: `#D97706` (Amber Yellow) on `#FFFBEB`
   - Label: `"Degraded Performance"`
3. **Partial Outage:**
   - Shape: Filled Square `(■)`
   - Color: `#EA580C` (Orange) on `#FFF7ED`
   - Label: `"Partial Outage"`
4. **Major Outage:**
   - Shape: Regular Octagon Exclamation `(🛑)`
   - Color: `#DC2626` (Crimson Red) on `#FEF2F2`
   - Label: `"Major Outage"`
5. **Under Maintenance:**
   - Shape: Wrench / Gear Icon `(🔧)`
   - Color: `#2563EB` (Royal Blue) on `#EFF6FF`
   - Label: `"Under Maintenance"`

---

## 3. Responsive Breakpoint Adaptation Behavior

- **Desktop (≥ 1024px):** Full 4-column service component row layout (Service Name, Status Badge, 90-Day Bar Strip, Percentage).
- **Tablet (768px – 1023px):** 3-column layout where 90-day bar strip reduces to 60 days dynamically via CSS `@media` container rules.
- **Mobile (< 768px):**
  - Stacks service component row into 2 vertical tiers:
    - Tier 1: Service Name + Status Badge (flex space-between).
    - Tier 2: Condensed 30-day uptime bar strip + 90-day percentage label.
  - Subscribe button transforms from text button to full-width bottom sticky button or header icon.
  - Timeline cards adjust padding from `1.5rem` to `1rem` for small screens.
