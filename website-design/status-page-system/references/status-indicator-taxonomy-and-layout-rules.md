# Status Indicator Taxonomy & Layout Reference Guide

This reference guide provides engineering specifications, color tokens, icon pairing rules, and layout constraints for building accessible, high-signal status pages and operational health dashboards.

---

## 1. Operational State Taxonomy & Visual Tokens

Never rely on color alone. Always pair status state colors with explicit text labels and distinct geometric icon glyphs.

| Operational State | Icon Glyph | Light Surface Color | Dark Surface Color | Text Token | WCAG Ratio | Description |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Operational** | Checkmark inside circle `(✓)` | `#ECFDF5` | `#064E3B` | `#065F46` | **6.1:1** (Pass AA) | All component systems functioning within normal thresholds. |
| **Degraded Performance** | Exclamation in triangle `(⚠)` | `#FFFBEB` | `#78350F` | `#92400E` | **5.4:1** (Pass AA) | Service available but experiencing high latency or non-fatal error spikes. |
| **Partial Outage** | Diamond with slash `(◈)` | `#FFEDD5` | `#7C2D12` | `#9A3412` | **5.2:1** (Pass AA) | Minor service or sub-feature completely down while main application functions. |
| **Major Outage** | Octagon with X `(🞭)` | `#FEF2F2` | `#7F1D1D` | `#991B1B` | **7.1:1** (Pass AA) | Primary service down or inaccessible for a large portion of users. |
| **Under Maintenance** | Wrench / Tool symbol `(🔧)` | `#EFF6FF` | `#1E3A8A` | `#1E40AF` | **6.8:1** (Pass AA) | Planned service window with scheduled disruption or feature updates. |

---

## 2. Global Status Aggregation Logic

When aggregating individual component statuses into a single global system health banner, follow this priority hierarchy:

```text
Highest Priority
  1. Major Outage (Red)      ──► If ANY core service is down
  2. Partial Outage (Orange) ──► If ANY secondary feature is down
  3. Degraded (Yellow)       ──► If ANY service has latency/error spikes
  4. Maintenance (Blue)      ──► If scheduled maintenance is in progress
  5. Operational (Green)     ──► If ALL services are operating normally
Lowest Priority
```

---

## 3. Incident Timeline Progression Model

Every incident card must track updates chronologically from newest to oldest using standardized milestone badges:

1. **Investigating:** Initial acknowledgment of anomaly or user reports. Engineers assigned.
2. **Identified:** Root cause pinned down (e.g., memory leak, cloud network partition).
3. **Monitoring:** Patch or mitigation deployed. Telemetry monitored for stabilization.
4. **Resolved:** System metrics verified back to normal baseline (<100ms latency, 0% error rate).
5. **Post-Mortem Published:** Optional follow-up linking to detailed root cause analysis document.

---

## 4. Accessibility & Screen Reader Guidelines

- **ARIA Live Region:** The status hero banner must use `role="region"`, `aria-live="polite"`, and `aria-atomic="true"`.
- **High-Contrast Mode (Windows Forced Colors):** Ensure custom dots and badges maintain borders (`1px solid transparent` minimum) so CSS system color overrides maintain visual bounds in forced-colors mode.
- **Keyboard Tooltips for Uptime Bars:** Day segments in uptime bar charts must support keyboard focus (`tabindex="0"`) and pop up an aria-described tooltip or rely on standard native `title` attribute fallbacks for simplicity.
