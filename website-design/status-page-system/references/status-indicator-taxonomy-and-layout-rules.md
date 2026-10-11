# Status Indicator Taxonomy, Typography, & Spatial Reference Rules

This reference document provides exact design tokens, color taxonomies, non-color visual shape definitions, typography scale parameters, spatial layout rules, ARIA semantics, and WCAG AA accessibility requirements for engineering system status pages.

---

## 1. Status Indicator Color & Shape Taxonomy

To comply with **WCAG 2.1 SC 1.4.1 (Use of Color)**, status indicators must never rely on color alone. Every severity level pairs a specific background/accent color with a distinct visual geometry (shape/icon) and an explicit textual label.

```text
========================================================================================================================
STATUS TIER          HEX / HSL COLOR CODE            VISUAL SHAPE / ICON       TEXT LABEL        EXAMPLE WCAG CONTRAST
========================================================================================================================
Operational          #16A34A (HSL 142 72% 36%)       Filled Circle (●)        Operational       4.8:1 on #F0FDF4
Degraded             #D97706 (HSL 38 92% 44%)        Filled Triangle (▲)      Degraded          6.8:1 on #FEF3C7
Partial Outage       #EA580C (HSL 21 86% 48%)        Half-Filled Square (■)   Partial Outage    5.1:1 on #FFEDD5
Major Outage         #DC2626 (HSL 0 72% 51%)         Filled Diamond (◆)       Major Outage      5.4:1 on #FEE2E2
Under Maintenance    #2563EB (HSL 217 91% 60%)       Gear / Wrench (⚙)        Maintenance       4.9:1 on #EFF6FF
========================================================================================================================
```

### CSS Token Mapping Blueprint
```css
:root {
  /* Operational Tokens */
  --status-operational-bg: #F0FDF4;
  --status-operational-border: #86EFAC;
  --status-operational-text: #14532D;
  --status-operational-dot: #16A34A;

  /* Degraded Performance Tokens */
  --status-degraded-bg: #FEF3C7;
  --status-degraded-border: #FDE68A;
  --status-degraded-text: #78350F;
  --status-degraded-dot: #D97706;

  /* Partial Outage Tokens */
  --status-partial-bg: #FFEDD5;
  --status-partial-border: #FDBA74;
  --status-partial-text: #7C2D12;
  --status-partial-dot: #EA580C;

  /* Major Outage Tokens */
  --status-major-bg: #FEE2E2;
  --status-major-border: #FCA5A5;
  --status-major-text: #7F1D1D;
  --status-major-dot: #DC2626;

  /* Under Maintenance Tokens */
  --status-maintenance-bg: #EFF6FF;
  --status-maintenance-border: #BFDBFE;
  --status-maintenance-text: #1E3A8A;
  --status-maintenance-dot: #2563EB;
}
```

---

## 2. Typography Scale & Hierarchy

Status page typography prioritizes immediate legibility and rapid information scanning.

```text
======================================================================================================
ELEMENT                     FONT SIZE (REM / PX)     LINE HEIGHT    FONT WEIGHT    COLOR TOKEN
======================================================================================================
Page Brand Title (H1)       1.5rem / 24px            1.2            700 (Bold)     var(--color-text-main)
Hero Banner Status (H2)     1.25rem / 20px           1.3            700 (Bold)     Inherited from status
Section Card Title (H2)     1.125rem / 18px          1.4            600 (Semi)     var(--color-text-main)
Service Component Name      1.00rem / 16px           1.5            600 (Semi)     var(--color-text-main)
Incident Feed Body          0.875rem / 14px          1.6            400 (Regular)  var(--color-text-main)
Metadata & Timestamps       0.8125rem / 13px         1.4            500 (Medium)   var(--color-text-muted)
Heatmap Tooltip Copy        0.75rem / 12px           1.4            500 (Medium)   #FFFFFF
======================================================================================================
```

---

## 3. Spatial Layout & Responsive Breakpoint Rules

### Spatial Measurements & Padding Grid
- **Main Page Canvas Container:** `max-width: 1080px; margin: 0 auto; padding: 2rem 1rem;`
- **Vertical Gap Between Sections:** `clamp(1.5rem, 4vw, 2.5rem)` (24px to 40px dynamic spacing).
- **Hero Banner Internal Padding:** `1.5rem 1.75rem` on desktop; `1rem 1.25rem` on mobile.
- **Card Container Radius & Elevation:** `border-radius: 12px; border: 1px solid var(--color-border); box-shadow: 0 1px 3px rgba(0,0,0,0.05);`.

### 90-Day Heatmap Bar Dimensions
- **Desktop Viewport (>768px):**
  - Grid track: `display: grid; grid-template-columns: repeat(90, 1fr); gap: 2px; height: 32px;`
  - Daily bar width: ~8px–10px per day on 1080px container.
- **Tablet Viewport (480px - 768px):**
  - Grid track: `grid-template-columns: repeat(45, 1fr); gap: 2px; height: 28px;` (Groups days into 2-day combined chunks or displays last 45 days).
- **Mobile Viewport (<480px):**
  - Grid track: `grid-template-columns: repeat(30, 1fr); gap: 2px; height: 24px;` (Groups days into 3-day chunks) or displays a unified horizontal percentage progress bar with a text link: *"View detailed 90-day logs →"*.

---

## 4. Incident Phase Lifecycle Rules

All active and historical incident reports follow a strict 4-phase lifecycle progression.

```text
[INVESTIGATING]  ──►  [IDENTIFIED]  ──►  [MONITORING]  ──►  [RESOLVED]
 (Issue triaged)      (Root cause)      (Fix deployed)     (Restored)
```

1. **INVESTIGATING:** Activated when automated monitoring alerts fire or support reports accumulate.
   - *Phase Badge Styling:* Purple tint (`#F3E8FF` background / `#7E22CE` text).
   - *Action:* Engineering team on site; establishing diagnostic baseline.
2. **IDENTIFIED:** Activated when root cause is isolated to a specific component or cloud region.
   - *Phase Badge Styling:* Amber tint (`#FEF3C7` background / `#B45309` text).
   - *Action:* Fix prepared, tested, and deployment initiated.
3. **MONITORING:** Activated when remediation fix is deployed to production.
   - *Phase Badge Styling:* Blue tint (`#DBEAFE` background / `#1D4ED8` text).
   - *Action:* Telemetry and latency metrics actively observed for stabilization.
4. **RESOLVED:** Activated when service metrics return to baseline normal operational performance.
   - *Phase Badge Styling:* Green tint (`#DCFCE7` background / `#15803D` text).
   - *Action:* Incident closed; post-incident Root Cause Analysis (RCA) scheduled.

---

## 5. Accessibility & ARIA Semantics Blueprint

### Live Region Updates
Status pages must announce dynamic operational status updates to assistive technology without shifting user focus.

```html
<section
  aria-live="polite"
  aria-atomic="true"
  class="hero-status-wrapper">
  <div role="region" aria-label="System Operational Status">
    <h2>(▲) PARTIAL SYSTEM OUTAGE</h2>
    <p>US-East REST API endpoints are experiencing elevated response times.</p>
  </div>
</section>
```

### 90-Day Heatmap Bar Keyboard Access
Every heatmap bar element must be individually focusable with full screen-reader announcements:

```html
<div
  class="heatmap-bar heatmap-bar--degraded"
  tabindex="0"
  role="img"
  aria-label="October 24, 2024: Degraded Performance, 42 minutes elevated latency">
</div>
```

### Subscriber Modal Focus Trap Rules
When the `"Subscribe to Updates"` modal overlay opens:
1. Save currently focused element (`document.activeElement`).
2. Programmatically move focus to the first interactive field inside the modal (`#subscriber-email`).
3. Trap `Tab` and `Shift+Tab` cycles strictly inside the modal container.
4. Close modal on `Escape` key press and return focus to the `"Subscribe to Updates"` trigger button.
