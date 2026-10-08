# Changelog Badge Taxonomy & Layout Rules Reference

This reference guide provides exact design specifications, color contrast tokens, semantic markup rules, and viewport adaptation guidelines for implementing the **Changelog and Release Notes System**.

---

## 1. Change Classification & Badge Taxonomy

Category badges must establish instant visual recognition without relying exclusively on color. Every badge pairs an explicit text label with a WCAG AA-compliant background fill, text color, border token, and icon indicator.

### Badge Taxonomy Reference Table

| Category | Text Label | Icon Symbol | Purpose & Usage Guidance | Light Theme Fills & Ratios | Dark Theme Fills & Ratios |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **New Feature** | `NEW` / `FEATURE` | `✨` / `Plus` | Completely new capabilities, integrations, or major tool additions. | Fill: `#EFF6FF`<br>Text: `#1D4ED8`<br>Border: `#BFDBFE`<br>**Ratio: 5.1:1** (Pass) | Fill: `#1E3A8A`<br>Text: `#93C5FD`<br>Border: `#1E40AF`<br>**Ratio: 6.8:1** (Pass) |
| **Improvement** | `IMPROVED` | `⚡` / `Zap` | Enhancements to existing features, performance boosts, or UI polish. | Fill: `#F0FDF4`<br>Text: `#15803D`<br>Border: `#BBF7D0`<br>**Ratio: 4.8:1** (Pass) | Fill: `#14532D`<br>Text: `#86EFAC`<br>Border: `#166534`<br>**Ratio: 7.4:1** (Pass) |
| **Bug Fix** | `FIXED` | `🔧` / `Check` | Resolved issues, edge-case corrections, and unexpected behavior fixes. | Fill: `#FFF7ED`<br>Text: `#C2410C`<br>Border: `#FED7AA`<br>**Ratio: 4.7:1** (Pass) | Fill: `#7C2D12`<br>Text: `#FDBA74`<br>Border: `#9A3412`<br>**Ratio: 6.2:1** (Pass) |
| **Security** | `SECURITY` | `🔒` / `Shield` | Vulnerability patches, auth protocol updates, and compliance fixes. | Fill: `#FAF5FF`<br>Text: `#6B21A8`<br>Border: `#E9D5FF`<br>**Ratio: 7.2:1** (Pass) | Fill: `#581C87`<br>Text: `#E9D5FF`<br>Border: `#6B21A8`<br>**Ratio: 9.1:1** (Pass) |
| **Deprecation** | `DEPRECATED` | `⚠️` / `Clock` | Features or API endpoints scheduled for future retirement. | Fill: `#FEF2F2`<br>Text: `#B91C1C`<br>Border: `#FECACA`<br>**Ratio: 5.4:1** (Pass) | Fill: `#7F1D1D`<br>Text: `#FCA5A5`<br>Border: `#991B1B`<br>**Ratio: 6.1:1** (Pass) |
| **Breaking Change** | `BREAKING` | `🚨` / `Flame` | Incompatible API or workflow changes requiring explicit migration actions. | Fill: `#451A03`<br>Text: `#FEF3C7`<br>Border: `#78350F`<br>**Ratio: 11.4:1** (Pass) | Fill: `#FEF3C7`<br>Text: `#78350F`<br>Border: `#FDE68A`<br>**Ratio: 8.9:1** (Pass) |

---

## 2. Typography Scale & Line Length Measures

Scannability depends on constrained reading measures, clear font hierarchy, and distinct code formatting:

- **Changelog Page Title (`<h1>`):** `2rem`–`2.5rem` (32px–40px), `font-weight: 800`, `letter-spacing: -0.025em`.
- **Release Entry Title (`<h2>` / `<h3>`):** `1.25rem`–`1.5rem` (20px–24px), `font-weight: 700`, `line-height: 1.3`.
- **Entry Summary Narrative:** `1rem` (16px), `line-height: 1.6`, `color: var(--text-muted)`.
- **Max Content Measure:** Paragraph summaries and bulleted lists MUST be constrained to `max-width: 68ch` (approx. 680px) to maintain comfortable reading scanning without line-tracking fatigue.
- **Version String (`v2.4.0`):** `0.8125rem` (13px), `font-family: var(--font-mono)`, `font-weight: 600`.
- **Timestamp (`<time>`):** `0.875rem` (14px), `font-weight: 600`, `color: var(--text-main)`.

---

## 3. Viewport Breakpoints & Responsive Adaptation

| Breakpoint Range | Viewport Width | Layout Behavior | Navigation & Filters |
| :--- | :--- | :--- | :--- |
| **Desktop Wide** | `≥ 1024px` | Two-column grid with sticky date column (`220px`) and entry card column (`720px`). | Horizontal category filter pill bar with full search input. |
| **Tablet / Narrow Desktop** | `768px – 1023px` | Two-column grid with compact date column (`180px`) and responsive entry card column. | Horizontal scrolling pill bar with scroll snap. |
| **Mobile Viewport** | `< 768px` | Single stacked column layout. Dates and version tags collapse inline above the entry title. | Horizontally scrollable pill bar with gradient fade edge indicators. |
| **In-App Overlay Drawer** | All Viewports | Fixed dock overlay (`380px`–`420px` width) or full-screen bottom sheet on mobile. | Compact unread tabs and direct action buttons. |

---

## 4. Semantic Markup & ARIA Checklist

1. **Document Wrapper:** `<main class="changelog-feed">` or `<section aria-labelledby="changelog-heading">`.
2. **Individual Release Entry:** Wrapped in an `<article aria-labelledby="entry-title-id">` tag to define independent, self-contained content units.
3. **Machine-Readable Dates:** Publication dates must be enclosed in `<time datetime="YYYY-MM-DD">` elements (e.g., `<time datetime="2024-11-14">November 14, 2024</time>`).
4. **Accessible Category Badges:** Badges must contain readable text and optional `aria-label` tags (e.g., `<span class="badge badge--new" aria-label="Category: New Feature">✨ New</span>`).
5. **Screen Reader Notification Badges:** In-app notification bell triggers must include screen reader text: `<span class="sr-only">2 unread product updates</span>`.
6. **Focus Ring Affordance:** Interactive elements (filter pills, links, buttons) must display an unclipped focus indicator with at least 3:1 contrast against surrounding surfaces.
