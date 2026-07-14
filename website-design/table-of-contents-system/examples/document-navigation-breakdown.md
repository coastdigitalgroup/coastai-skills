# Example: Documentation Page Wayfinding

This example demonstrates the `table-of-contents-system` applied to a dense
technical documentation page. It shows how the sidebar ToC maintains context
through deep vertical scrolling and provides a clear map of a multi-level
document.

## The Problem

A technical guide for an API has 12 major sections (`h2`) and 45 sub-sections
(`h3`). Without a ToC, users have to scroll blindly to find a specific
endpoint or error code. On mobile, the problem is worse as the "sense of
place" is lost within the first three paragraphs.

## The Solution

We implement a **Scroll-Synced Right Sidebar ToC** for desktop and a
**Sticky Bottom "Outline" Trigger** for mobile.

### 1. Visual Hierarchy (Desktop)

The ToC is placed in the right gutter, distinct from the primary site
navigation on the left.

- **Title:** "On this page" (Small, all-caps, muted color).
- **Primary Items (H2):** Standard weight, 14px font size.
- **Secondary Items (H3):** Muted color, indented by 16px, 13px font size.
- **The Indicator:** A 2px vertical line runs the full height of the ToC. An
  active "marker" (primary brand color) slides along this line to indicate the
  current section.

### 2. Scroll-Spy Logic

As the user scrolls:
- When an `h2` or `h3` reaches 100px from the top of the viewport, the
  corresponding ToC link is marked as `active`.
- The active link text shifts to the primary brand color and becomes bold.
- If a section is very long, the indicator stays on that section until the
  next header crosses the threshold.

### 3. Mobile Adaptation

On viewports below 1024px:
- The sidebar is hidden.
- A sticky bar appears at the bottom of the screen with the text:
  `Section: [Current H2 Title]`.
- Tapping this bar opens a full-screen drawer showing the full ToC for the
  page, allowing the user to jump ahead.

---

## Annotated Layout

```text
+-----------------------------------------------------------------------+
|  [Logo]   Search...                                    [Login] [Join] |  <- Global Header
+-----------------------------------------------------------------------+
|          |                                            |               |
| [Nav]    |  # API Reference                           | [ToC]         |
| Home     |                                            | ON THIS PAGE  |
| Guide    |  The API provides a set of endpoints...    |               |
| > Auth   |                                            | - Overview    |
|   - Key  |  ## Authentication [id=auth]               | - Auth      <-- [Active Marker]
|   - JWT  |  To authenticate, you must use...          |   - Key       |
| Errors   |                                            |   - JWT       |
|          |  ### API Keys [id=keys]                    | - Errors      |
|          |  API keys are generated in...              | - Rate Limits |
|          |                                            |               |
+----------+--------------------------------------------+---------------+
```

## Key Heuristics Applied

1. **Logical Progression:** The ToC reflects the exact order of headers on the
   page.
2. **Indentation:** `h3` items are clearly subordinated to `h2` items via
   padding.
3. **Smooth Scroll:** Clicking "Errors" scrolls the page smoothly to the
   errors section and adds `#errors` to the browser URL.
4. **Visibility:** The ToC is sticky, so even after 5,000 pixels of scrolling,
   the user knows they are in the "Errors" section.
