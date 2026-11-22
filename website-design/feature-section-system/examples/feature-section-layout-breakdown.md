# Feature Section Layout Breakdown

This example demonstrates how to apply the `feature-section-system` to solve real-world product capability presentation challenges on a B2B SaaS landing page.

---

## Scenario Overview

**Product:** Pulse Analytics & Automation Platform
**Page Location:** Primary feature showcase section on the homepage (`/`) directly following the Hero intro.
**Goal:** Clearly communicate three core platform capabilities—Automated Data Pipelines, Real-Time Anomaly Detection, and Custom Dashboard Builders—using alternating zigzag feature rows and an interactive tabbed feature switcher for sub-features, driving trial signups without overwhelming the user.

---

## Layout Structure & Composition Matrix

```text
========================================================================================
FEATURE SECTION CONTAINER (max-width: 1280px, vertical padding: 6rem 1.5rem)
========================================================================================
┌──────────────────────────────────────────────────────────────────────────────────────┐
│ SECTION HEADER (Centered)                                                            │
│ Eyebrow: "POWERFUL PLATFORM CAPABILITIES" (0.875rem, tracking: 0.1em, color: #2563EB) │
│ Headline: "Everything You Need to Scale Data Operations" (2.5rem, font-weight: 700)   │
│ Subtitle: "Eliminate manual data engineering and deliver real-time insights fast."  │
└──────────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────────────┐
│ FEATURE ROW 1: ALTERNATING ZIGZAG (Desktop: Text Left 50% | Screenshot Right 50%)    │
├──────────────────────────────────────────┬───────────────────────────────────────────┤
│ LEFT COLUMN (Text Content)               │ RIGHT COLUMN (Visual Media Frame)         │
│ Eyebrow: "01. AUTOMATED PIPELINES"       │                                           │
│ Title: "Connect 200+ Data Sources in     │ ┌───────────────────────────────────────┐ │
│ Minutes Without Writing Code"            │ │ Dashboard Screenshot / Pipeline Visual│ │
│                                          │ │ [16:9 Aspect Ratio Frame]             │ │
│ Body: Pulse automatically extracts,      │ │ • Border: 1px solid #E2E8F0           │ │
│ transforms, and loads your data with    │ │ • Shadow: 0 20px 25px -5px rgba(...)  │ │
│ zero maintenance overhead.               │ │ • Radius: 12px                        │ │
│                                          │ └───────────────────────────────────────┘ │
│ Bullets:                                 │                                           │
│ ✓ Automatic schema drift resolution      │                                           │
│ ✓ Sub-second ingestion latency           │                                           │
│                                          │                                           │
│ Micro-CTA: "Explore data connectors →"   │                                           │
└──────────────────────────────────────────┴───────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────────────┐
│ FEATURE ROW 2: ALTERNATING ZIGZAG (Desktop: Screenshot Left 50% | Text Right 50%)    │
├──────────────────────────────────────────┬───────────────────────────────────────────┤
│ LEFT COLUMN (Visual Media Frame)         │ RIGHT COLUMN (Text Content)               │
│ ┌──────────────────────────────────────┐ │ Eyebrow: "02. ANOMALY DETECTION"          │
│ │ Anomaly Detection Graph / Alert Mock  │ │ Title: "Catch Data Quality Issues Before  │
│ │ [16:9 Aspect Ratio Frame]            │ │ Your Customers Notice"                    │
│ │ • Border: 1px solid #E2E8F0          │ │                                           │
│ │ • Shadow: 0 20px 25px -5px rgba(...) │ │ Body: Machine learning models monitor    │
│ │ • Radius: 12px                       │ │ baseline metrics and trigger instant      │
│ └──────────────────────────────────────┘ │ Slack/PagerDuty alerts.                   │
│                                          │                                           │
│                                          │ Micro-CTA: "See alert integrations →"     │
└──────────────────────────────────────────┴───────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────────────┐
│ INTERACTIVE TABBED FEATURE SWITCHER (Sub-Feature Showcase)                           │
├──────────────────────────────────────────────────────────────────────────────────────┤
│ TABLIST: [ 📊 Custom Dashboards ]  [ ⚡ API Webhooks ]  [ 🔒 Enterprise RBAC ]      │
├──────────────────────────────────────────┬───────────────────────────────────────────┤
│ TAB PANEL LEFT (Selected Feature Text)   │ TAB PANEL RIGHT (Dynamic Media Preview)   │
│ Heading: "Drag-and-Drop Dashboarding"    │ ┌───────────────────────────────────────┐ │
│ Copy: Build executive dashboards in      │ │ Dynamic Interactive Canvas / UI Preview │ │
│ seconds with responsive layout widgets.  │ │ (Updates dynamically when active tab  │ │
│ Link: "Try interactive dashboard demo →" │ │  selection changes)                   │ │
│                                          │ └───────────────────────────────────────┘ │
└──────────────────────────────────────────┴───────────────────────────────────────────┘
```

---

## Detailed Component & Spatial Specs

### 1. Section Header & Vertical Spacing Rhythm
- **Top / Bottom Section Padding:** `6rem` (`96px`) on desktop, `3.5rem` (`56px`) on mobile.
- **Header Eyebrow:**
  - Font size: `0.875rem` (`14px`), font-weight: `700`, uppercase, `letter-spacing: 0.1em`.
  - Color: `var(--color-primary-600)` (`#2563EB`).
- **Section Heading (`h2`):**
  - Font size: `2.5rem` (`40px`), line-height: `1.2`, font-weight: `700`, max-width: `32ch`.
  - Bottom margin: `1rem` (`16px`).

### 2. Alternating Zigzag Row Specs (Pattern B)
- **Grid Layout:** `display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center`.
- **Row Gap Vertical Spacing:** `6rem` (`96px`) between alternating feature rows.
- **Visual Media Framing:**
  - Aspect ratio: `16:9` (`aspect-ratio: 16 / 9`).
  - Container styling: `border: 1px solid var(--border-subtle); border-radius: 12px; box-shadow: var(--shadow-xl); overflow: hidden`.
  - Image behavior: `width: 100%; height: 100%; object-fit: cover`.
- **Content Hierarchy:**
  - Feature Number / Eyebrow (`.feature-eyebrow`): `0.875rem`, font-weight `600`, primary tint.
  - Feature Title (`h3`): `1.875rem` (`30px`), line-height `1.25`, font-weight `700`.
  - Body Text: `1.125rem` (`18px`), line-height `1.6`, color `var(--text-secondary)`.
  - Bullet Points: Custom SVG checkmark icons, `1rem` text size, `0.75rem` vertical item gap.
  - Micro-CTA Link: `font-weight: 600; color: #2563EB; display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none`.

### 3. Interactive Tabbed Switcher Specs (Pattern C)
- **Tab Container (`[role="tablist"]`):**
  - Layout: `display: flex; gap: 0.5rem; border-bottom: 2px solid var(--border-subtle); margin-bottom: 2.5rem`.
- **Tab Triggers (`[role="tab"]`):**
  - Padding: `0.875rem 1.5rem`.
  - Active Tab: `color: #2563EB; border-bottom: 3px solid #2563EB; font-weight: 600; background: transparent`.
  - Inactive Tabs: `color: #64748B; border-bottom: 3px solid transparent; font-weight: 500`.
  - Focus Ring: `outline: 2px solid #2563EB; outline-offset: 2px`.
- **Tab Panels (`[role="tabpanel"]`):**
  - Grid Layout: `display: grid; grid-template-columns: 1fr 1.25fr; gap: 3rem; align-items: center`.

---

## Responsive Adaptation Model

| Screen Breakpoint | Row 1 (Text Left / Media Right) | Row 2 (Media Left / Text Right) | Tabbed Switcher |
| :--- | :--- | :--- | :--- |
| **Desktop (≥1024px)** | 2-Column Side-by-side | 2-Column Side-by-side (Reversed) | Horizontal Tablist + 2-Column Panel |
| **Tablet (768px–1023px)**| 2-Column with tighter gap (2rem) | 2-Column with tighter gap (2rem) | Horizontally scrollable Tablist |
| **Mobile (<768px)** | Stacks vertically (Text first, Media second) | Stacks vertically (Text first, Media second via DOM order) | Converts to Vertical Accordion Stack |

---

## WCAG 2.1 AA Accessibility Validation Matrix

- **Text Contrast Ratios:**
  - Section Heading (`#0F172A` on `#FFFFFF`): **15.8:1** (Exceeds AA 4.5:1).
  - Feature Body Copy (`#334155` on `#FFFFFF`): **8.9:1** (Exceeds AA 4.5:1).
  - Micro-CTA Link (`#2563EB` on `#FFFFFF`): **4.6:1** (Exceeds AA 4.5:1).
- **DOM Stacking Order:**
  - On mobile, CSS Grid layout overrides `grid-template-columns` to `1fr` and forces text blocks to render above screenshots for Row 2, preventing inverted content flow.
- **Keyboard Tablist Operability:**
  - Arrow Keys (`Left`/`Right`) switch focused tab and update active panel.
  - `Tab` key moves focus out of tablist into the active panel links.
