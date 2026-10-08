# Changelog & Release Notes Design Breakdown

This example demonstrates two real-world application contexts for the **Changelog and Release Notes System**:
1. **Scenario A:** A standalone, public SaaS marketing changelog page (`/changelog`) with sticky timeline layout, category filtering, and rich media embeds.
2. **Scenario B:** An in-app "What's New" update notification drawer docked to the application's top navigation header with unread badge states and quick action triggers.

---

## Scenario A: Standalone Public SaaS Changelog Page

### Problem Statement
An analytics SaaS platform ("MetricFlow") was shipping updates weekly, but users and trial prospects had no single source of truth. Feature launches were scattered across blog posts, while bug fixes were buried in raw GitHub release tags. Prospects on the pricing page frequently asked if the platform supported custom export formats, unaware that the feature had been shipped two weeks prior.

### Layout Architecture: Sticky Timeline Grid (Desktop)

```text
+---------------------------------------------------------------------------------------------------+
|  HEADER ZONE                                                                                      |
|  MetricFlow Product Changelog                                                                     |
|  New features, improvements, and fixes shipped by the MetricFlow product team.                    |
|  [ Search updates...           ]   [ (RSS) RSS Feed ]  [ (Mail) Get Email Updates ]               |
+---------------------------------------------------------------------------------------------------+
|  FILTER PILL BAR                                                                                  |
|  [ All Updates (18) ]  [ ★ New Features (6) ]  [ ⚡ Improvements (7) ]  [ 🔧 Bug Fixes (4) ]  ...  |
+---------------------------------------------------------------------------------------------------+
|  FEED CONTAINER (2-Column Grid: 240px Sticky Date + 720px Entry Measure)                           |
|                                                                                                   |
|  LEFT COLUMN (Sticky)        RIGHT COLUMN (Entry Content)                                         |
|  +------------------------+  +-----------------------------------------------------------------+  |
|  | Nov 14, 2024          |  | [ NEW FEATURE ]  v2.4.0                                        |  |
|  | v2.4.0                 |  | AI-Powered Custom Report Builder                                |  |
|  | 3 days ago             |  | --------------------------------------------------------------- |  |
|  +------------------------+  | Generate tailored analytics dashboards and automated PDF reports|  |
|  (Stays fixed in viewport    | using plain-English prompts.                                    |  |
|   during entry scroll)       |                                                                 |  |
|                              | [ Screenshot Embed: Report Builder Interface with Alt Text ]    |  |
|                              |                                                                 |  |
|                              | What's New:                                                     |  |
|                              | • Prompt Input Bar: Ask questions like "Show Q3 churn by region"|  |
|                              | • Automated Scheduling: Email PDF exports every Monday at 8 AM  |  |
|                              | • Multi-Format Export: Download clean CSV, XLSX, or PDF formats  |  |
|                              |                                                                 |  |
|                              | [ Try Report Builder -> ]   [ Read Documentation -> ]           |  |
|                              +-----------------------------------------------------------------+  |
|                                                                                                   |
|  LEFT COLUMN (Sticky)        RIGHT COLUMN (Entry Content)                                         |
|  +------------------------+  +-----------------------------------------------------------------+  |
|  | Nov 02, 2024          |  | [ IMPROVED ]  [ SECURITY ]  v2.3.2                              |  |
|  | v2.3.2                 |  | Enhanced OAuth Token Security & Speed                           |  |
|  | 15 days ago            |  | --------------------------------------------------------------- |  |
|  +------------------------+  | Upgraded SSO connector infrastructure and reduced dashboard load|  |
|                              | times by 35%.                                                   |  |
|                              |                                                                 |  |
|                              | Key Improvements:                                               |  |
|                              | • OAuth Scopes: Streamlined enterprise SSO permission requests   |  |
|                              | • Query Caching: Cached dashboard widget queries in Redis       |  |
|                              +-----------------------------------------------------------------+  |
+---------------------------------------------------------------------------------------------------+
```

### Spatial Grid Metrics
- **Max Container Width:** `1080px` centered in viewport.
- **Left Column Width:** `220px` (`flex: 0 0 220px`), containing date, version badge, and relative age. Positioned with `position: sticky; top: 2rem;`.
- **Right Column Width:** `flex: 1 1 auto; max-width: 720px;`.
- **Column Gap:** `2.5rem` (40px) visual gutter.
- **Entry Vertical Separation:** `3.5rem` (56px) margin between individual `<article>` release entries with a subtle `1px solid var(--border-subtle)` dividing rule.

---

## Scenario B: In-App "What's New" Update Drawer

### Problem Statement
In-app users rarely visit the marketing website to check changelogs. When new features are launched, active users miss productivity enhancements because there is no contextual in-app discovery channel.

### Layout Architecture: Slide-Out Drawer Panel

```text
+---------------------------------------------------------------------+
| IN-APP TOP NAVIGATION HEADER                                        |
| [Logo MetricFlow]   [Dashboards]  [Reports]   [(Bell) What's New (2)]|
+---------------------------------------------------------------------+
                                                |
                                                v (User Clicks Bell)
+---------------------------------------------------------------------+
| DOCKED SLIDE-OUT DRAWER (380px Width)                               |
| +-----------------------------------------------------------------+ |
| | What's New                                          [ (X) Close ] | |
| | 2 unread updates since your last visit                           | |
| +-----------------------------------------------------------------+ |
| | TAB FILTER: [ All Updates ]  [ Unread (2) ]                     | |
| +-----------------------------------------------------------------+ |
| | UNREAD ENTRY 1 (Accent Border-Left)                             | |
| | [ NEW FEATURE ]  Nov 14, 2024                                   | |
| | AI-Powered Custom Report Builder                                | |
| | Generate tailored analytics dashboards using plain English      | |
| | prompts directly from your workspace.                           | |
| | [ Launch Report Builder -> ]                                    | |
| +-----------------------------------------------------------------+ |
| | UNREAD ENTRY 2 (Accent Border-Left)                             | |
| | [ IMPROVED ]  Nov 02, 2024                                      | |
| | 35% Faster Dashboard Load Speed                                 | |
| | Dashboard widget queries are now cached automatically.          | |
| | [ View Benchmarks -> ]                                          | |
| +-----------------------------------------------------------------+ |
| | READ ENTRY 3 (Neutral Surface)                                  | |
| | [ FIXED ]  Oct 24, 2024                                         | |
| | Date Picker Timezone Sync Bug                                   | |
| | Resolved UTC offset discrepancies in custom date ranges.        | |
| +-----------------------------------------------------------------+ |
| | FOOTER: [ View Full Public Changelog -> ]                       | |
| +-----------------------------------------------------------------+ |
+---------------------------------------------------------------------+
```

---

## Detailed Micro-Layout Component Specs

### 1. Change Badge Visual System & Tokens

Every update badge uses precise surface fills, border rules, text colors, and icon identifiers:

```css
/* Badge Base Token Styles */
.changelog-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.625rem;
  font-family: var(--font-sans);
  font-size: 0.75rem; /* 12px */
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  border-radius: 9999px; /* Pill shape */
  border: 1px solid transparent;
  white-space: nowrap;
}

/* Category Specific Tokens (Light Theme Example) */
.changelog-badge--new {
  background-color: #EFF6FF; /* Blue 50 */
  color: #1D4ED8;            /* Blue 700 - Contrast 5.1:1 */
  border-color: #BFDBFE;     /* Blue 200 */
}

.changelog-badge--improved {
  background-color: #F0FDF4; /* Green 50 */
  color: #15803D;            /* Green 700 - Contrast 4.8:1 */
  border-color: #BBF7D0;     /* Green 200 */
}

.changelog-badge--fixed {
  background-color: #FFF7ED; /* Orange 50 */
  color: #C2410C;            /* Orange 700 - Contrast 4.7:1 */
  border-color: #FED7AA;     /* Orange 200 */
}

.changelog-badge--security {
  background-color: #FAF5FF; /* Purple 50 */
  color: #6B21A8;            /* Purple 700 - Contrast 7.2:1 */
  border-color: #E9D5FF;     /* Purple 200 */
}

.changelog-badge--breaking {
  background-color: #451A03; /* Amber 950 */
  color: #FEF3C7;            /* Amber 100 - Contrast 11.4:1 */
  border-color: #78350F;     /* Amber 900 */
}
```

### 2. Media Embed Framing Spec
- **Container Structure:**
  ```html
  <figure class="changelog-media">
    <div class="changelog-media__frame">
      <img src="/images/changelog/v2-4-0-ai-reports.webp"
           alt="MetricFlow AI Report Builder input bar showing a prompt query for quarterly churn"
           width="1280" height="720" loading="lazy">
    </div>
    <figcaption class="changelog-media__caption">
      Figure 1: Plain-English prompt bar generating a multi-region churn analysis report.
    </figcaption>
  </figure>
  ```
- **CSS Frame Rules:**
  ```css
  .changelog-media {
    margin: 1.5rem 0;
  }
  .changelog-media__frame {
    position: relative;
    border-radius: 0.75rem; /* 12px */
    overflow: hidden;
    border: 1px solid var(--border-subtle, #E2E8F0);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    background-color: var(--surface-muted, #F8FAFC);
  }
  .changelog-media__frame img {
    display: block;
    width: 100%;
    height: auto;
    object-fit: cover;
  }
  .changelog-media__caption {
    margin-top: 0.5rem;
    font-size: 0.8125rem; /* 13px */
    color: var(--text-muted, #64748B);
    text-align: center;
  }
  ```

---

## Key Design Principles Applied

1. **Scannability First:** Skimmers can quickly read change badges and version headings; deep readers can read paragraph summaries and bulleted technical details.
2. **Non-Disruptive In-App Discovery:** The slide-out drawer allows active application users to discover updates on their own terms without interrupting active work sessions.
3. **WCAG AA Color Safety:** Every badge color combination is explicitly checked to exceed 4.5:1 text contrast against both light and dark background tokens.
4. **Zero Layout Shift (CLS):** Images are framed with explicit `width` and `height` attributes and responsive aspect-ratio containers.
