# Page Header Examples

This document showcases the Page Header System applied to different common
website contexts.

## 1. The Dashboard Entity Header
Used for managing specific objects like projects, users, or documents.

### Scenario: Project Management App
- **Wayfinding:** Breadcrumbs showing the path from the project list.
- **Title:** "Q4 Marketing Campaign" (H1).
- **Metadata:** A "Public" status badge and a "Last edited 2h ago" label.
- **Actions:** Primary "Share" button, Secondary "Edit" and "Duplicate" buttons.

**Visual Breakdown (Desktop):**
```text
[ Projects / Marketing ]  <-- Breadcrumbs (nav)
[ (Icon) Q4 Marketing Campaign ] [ Status: Public ] [ Edited 2h ago ]  <-- Title & Metadata
----------------------------------------------------------------------
                                     [ Edit ] [ Duplicate ] [[ Share ]] <-- Actions
```

---

## 2. The Article / Documentation Header
Focused on readability, authorship, and content categorization.

### Scenario: Technical Blog Post
- **Wayfinding:** "Back to Blog" link.
- **Title:** "Mastering CSS Grid Layouts" (H1).
- **Metadata:** Author avatar, name, and "8 min read" estimate.
- **Actions:** Social share icons and "Save to Reading List" bookmark.

**Visual Breakdown (Centered Layout):**
```text
          [ <- Back to Blog ]

     Mastering CSS Grid Layouts
      (H1 - Bold, Extra Large)

 (Avatar) By Jules  •  October 2023  •  8 min read

          [ Share ] [ Save ]
```

---

## 3. The Responsive Mobile Adaptation
Showing how the "Dashboard" header adapts to small screens.

### Scenario: Project Management App (Mobile)
- **Wayfinding:** Condensed to a simple "<- Projects" link.
- **Title:** Wraps to two lines if necessary.
- **Metadata:** Status badge moves below the title.
- **Actions:** Primary action stays at the top-right; secondary actions move to
  an overflow menu (...).

**Visual Breakdown (Mobile):**
```text
[ <- Projects ]   [ (Overflow) ] [[ Share ]]
[ Q4 Marketing  ]
[ Campaign      ]
[ Status: Public ]
```

## Key Differences & Decisions

| Feature | Dashboard Header | Article Header | Settings Header |
| :--- | :--- | :--- | :--- |
| **Alignment** | Left-aligned | Centered | Left-aligned |
| **Wayfinding** | Full Breadcrumbs | Simple Back Link | None (Context in Nav) |
| **Primary Action** | "Save" or "Share" | "Subscribe" or "Share" | "Save Changes" |
| **Metadata** | Status, Owner, ID | Date, Author, Time | Description of section |
