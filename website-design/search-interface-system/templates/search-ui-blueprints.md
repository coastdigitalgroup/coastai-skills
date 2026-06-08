# Search UI Blueprints

This template provides annotated layouts for the three core phases of the search experience.

## Blueprint 1: The Search Trigger (Desktop)

Standard proportions and elements for a high-visibility search bar.

```text
[ (A) Magnifying Glass ] [ (B) Placeholder Text           ] [ (C) Shortcut Key ]
--------------------------------------------------------------------------------
(A) Visual anchor. Min 18x18px.
(B) Descriptive placeholder (e.g. "Search for articles, docs, or people...").
(C) Optional hint (e.g., "⌘ K"). Low contrast (text-500).
```

## Blueprint 2: Autocomplete Dropdown Anatomy

The internal structure of the instant discovery layer.

```text
+-------------------------------------------------------------+
| [ Input Field: run|                                       ] |
+-------------------------------------------------------------+
| (A) RECENT SEARCHES                                         |
|     * running shoes                                         |
|     * road gear                                             |
+-------------------------------------------------------------+
| (B) PRODUCTS                                                |
|     [IMG] **Run**ning Jacket - Men's ............ $89.00    |
|     [IMG] **Run**ning Shoes - Air Max ........... $120.00   |
+-------------------------------------------------------------+
| (C) VIEW ALL RESULTS FOR "RUN"                              |
+-------------------------------------------------------------+

(A) Section Header: Small caps, semibold, muted color.
(B) Result Row:
    - Left: Thumbnail (40x40px).
    - Center: Title with **bold** match highlighting.
    - Right: Metadata (Price, Category, or Status).
(C) Global Action: High contrast, distinct from result rows.
```

## Blueprint 3: Search Results Page (SERP) Anatomy

Spatial organization of the dedicated results view.

```text
+-------------------------------------------------------------+
| [ Breadcrumb: Home > Search ]                               |
|                                                             |
| (A) Showing results for "**User Query**"                    |
|     (42 items found)                                        |
+-------------------------------------------------------------+
|             |                                               |
| (B) FILTERS | (C) RESULTS GRID                              |
|     [ ]     |     +---------+  +---------+  +---------+     |
|     [ ]     |     |  Card   |  |  Card   |  |  Card   |     |
|     [ ]     |     +---------+  +---------+  +---------+     |
|             |     +---------+  +---------+  +---------+     |
|             |     |  Card   |  |  Card   |  |  Card   |     |
|             |     +---------+  +---------+  +---------+     |
|             |                                               |
+-------------------------------------------------------------+
| (D) PAGINATION                                              |
+-------------------------------------------------------------+

(A) The Echo: Re-states the query to ground the user.
(B) Faceted Nav: Sidebar for desktop (see filter-and-sort-system).
(C) Result Container: 2-4 columns depending on metadata density.
(D) Navigation: See pagination-system.
```

## Blueprint 4: Mobile Search Overlay (Full-screen)

The "Search Mode" for small viewports.

```text
+-------------------------------------------------------------+
| [ < Back ] [ (A) Search Input...                  ] [ (B) X ] |
+-------------------------------------------------------------+
| (C) RECENT SEARCHES                                         |
|     * item 1                                       [ (D) X ]|
|     * item 2                                       [ (D) X ]|
|                                                             |
| (E) TRENDING NOW                                            |
|     # keyword one                                           |
|     # keyword two                                           |
+-------------------------------------------------------------+

(A) Focused Input: Auto-triggers the keyboard.
(B) Clear Action: Instantly wipes the input.
(C) History: Helps users return to previous tasks.
(D) Remove: Allows users to manage their search history.
(E) Suggested: Fills empty space before the user starts typing.
```
