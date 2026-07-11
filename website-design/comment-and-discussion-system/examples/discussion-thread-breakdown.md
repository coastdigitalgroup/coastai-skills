# Example: Threaded Discussion Breakdown

This example demonstrates the application of the **Comment and Discussion
System** to a high-volume community forum thread, showing how visual
hierarchy and spatial rules manage complexity.

## The Scenario

A community discussion thread about a "New Product Feature." The thread
includes the original author (Author), a staff member (Staff), and multiple
community members with nested replies.

## Layout Breakdown

### 1. The Thread Root (Level 0)
- **Visual Signal:** The highest prominence. Full-width content.
- **Badge:** "OP" (Original Poster) badge next to the username.
- **Anatomy:** Large avatar (48px), bold title, and high-contrast text.

### 2. Nested Reply (Level 1)
- **Indentation:** 32px margin-left from the root.
- **Thread Line:** A 1px solid vertical line starts from the parent's avatar
  and extends to the level 1 avatar.
- **Visual Signal:** "Author" badge (if the OP replies) or "Staff" badge
  (distinct color, e.g., blue).

### 3. Deeply Nested Reply (Level 2)
- **Indentation:** Additional 32px (64px total).
- **Avatar Scale:** Small avatar (32px) to signal lower hierarchy.
- **Action Bar:** "Reply" is the only primary action; "Edit" and "Report"
  move to an overflow menu.

### 4. Nesting Cap (Level 3+)
- **The Pivot:** After 3 levels, the next reply is no longer indented.
- **Visual Signal:** A "Continue this thread" link appears, or the comment
  includes an "@username" mention to maintain context in a flat view.

---

## Annotated Components

```text
[ (A) Avatar ]  [ User Name ] [ (B) Staff Badge ] [ 2h ago ]
-----------------------------------------------------------
[ (C) Comment Body Text...                                ]
[                                                         ]
-----------------------------------------------------------
[ (D) ↑ 1.2k ↓ ]  [ (E) Reply ]  [ (F) Share ]  [ ... ]
```

- **(A) Avatar:** 40px circle. High resolution.
- **(B) Staff Badge:** Background: `#0052CC`, Text: `#FFFFFF`, 12px Semi-bold.
- **(C) Comment Body:** Line-height 1.5 for readability. Max-width 70ch.
- **(D) Vote Cluster:** Horizontal group. Color changes to orange on Upvote.
- **(E) Reply Action:** Primary action. Left-aligned for fast access.
- **(F) Share Action:** Secondary. Lower contrast (muted grey).

## Responsive Transformation

### Desktop View
- Indentation: 32px per level.
- Multi-action bar visible.
- Thread lines visible.

### Mobile View
- Indentation: 12px per level (capped at 2 levels).
- Nesting >2 levels: Flattened with "In response to @user" header.
- Touch Targets: Action buttons expanded to 44px height.
- Vote Cluster: Moves to the right side for thumb-reach.
