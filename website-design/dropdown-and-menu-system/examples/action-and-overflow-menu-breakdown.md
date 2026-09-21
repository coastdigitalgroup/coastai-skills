# SaaS Data Table Row Action & Overflow Menu Design Breakdown

This example breaks down the design, spatial layout, visual hierarchy, responsive adaptation, and keyboard accessibility for a multi-action dropdown menu system within an enterprise SaaS invoice data table.

---

## 1. Page Context & Architectural Placement

In high-density data tables, each row requires contextual operations (e.g., *View Invoice*, *Send Reminder*, *Duplicate*, *Download PDF*, *Archive*, *Delete*). Placing every action button directly into the table row creates visual clutter, exhausts screen real estate, and degrades readability.

The **Dropdown & Menu System** solves this by collapsing row-level operations into a compact `32x32px` trigger button (using an ellipsis `...` icon) that expands an anchored floating action menu overlay on demand.

```text
+------------------------------------------------------------------------------------------------------------------+
| Invoices                                                     [ + New Invoice ]  [ Filter v ]  [ (•••) Overflow ] |
+------------------------------------------------------------------------------------------------------------------+
| CLIENT / ID        | AMOUNT     | STATUS   | DATE       | ACTIONS                                                |
+--------------------+------------+----------+------------+--------------------------------------------------------+
| Acme Corp (#1042)  | $4,500.00  | Paid     | Oct 24     |  [ (•••) ]  <-- Trigger                                 |
| Global Media (#1041)| $1,250.00 | Pending  | Oct 22     |  [ (•••) ] ----+                                       |
|                    |            |          |            |                |  +---------------------------------+  |
| Vertex Ltd (#1040) | $8,900.00  | Overdue  | Oct 19     |  [ (•••) ]     |  | QUICK ACTIONS                   |  |
|                    |            |          |            |                |  | [Icon] View Details        ⌘O   |  |
|                    |            |          |            |                |  | [Icon] Send Reminder...         |  |
|                    |            |          |            |                |  | [Icon] Download PDF        ⌘D   |  |
|                    |            |          |            |                |  |---------------------------------|  |
|                    |            |          |            |                |  | EXPORT & EXTRAS                 |  |
|                    |            |          |            |                |  | [Icon] Export JSON         >    |  |
|                    |            |          |            |                |  |---------------------------------|  |
|                    |            |          |            |                |  | [Icon] Archive Invoice          |  |
|                    |            |          |            |                |  | [Icon] Delete Invoice (Danger)  |  |
|                    |            |          |            |                |  +---------------------------------+  |
+--------------------+------------+----------+------------+--------------------------------------------------------+
```

---

## 2. Component Design & Spatial Token Specifications

### A. Trigger Button Specification
- **Component:** Icon Button (`<button type="button">`)
- **Dimensions:** `32px x 32px` desktop target (`44px x 44px` on mobile touch)
- **Border Radius:** `6px` (`var(--radius-md)`)
- **Visual Token:** Background `transparent`; Hover `var(--bg-subtle-hover)`
- **ARIA Attributes:** `aria-haspopup="menu"`, `aria-expanded="true|false"`, `aria-controls="invoice-row-menu"`

### B. Floating Menu Panel Specification
- **Min Width:** `220px` (Max `280px`)
- **Padding:** `4px` top/bottom, `4px` left/right (`padding: var(--space-xs)`)
- **Background & Border:** Surface `var(--bg-surface-elevated)` (e.g. White `#FFFFFF` in Light, Dark Grey `#1E293B` in Dark mode); Border `1px solid var(--border-subtle)`
- **Elevation Shadow:** `box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)` (`var(--shadow-popover)`)
- **Layer Stacking:** `z-index: 1000` (`var(--z-popover)`)
- **Positioning Alignment:** Top `100%` (+ `4px` offset), Right `0` (right-aligned to trigger to prevent right screen clipping).

---

## 3. Detailed Menu Anatomy Breakdown

```text
+-------------------------------------------------------+  <-- Menu Panel Container
| QUICK ACTIONS                                         |  <-- Section Label (0.75rem / 600 weight)
|  [Eye Icon]    View Details                      ⌘O   |  <-- Standard Menu Item
|  [Mail Icon]   Send Reminder...                       |  <-- Standard Menu Item
|  [File Icon]   Download PDF                      ⌘D   |  <-- Standard Menu Item
|-------------------------------------------------------|  <-- Separator Line (1px solid border)
| EXPORT & OPTIONS                                      |  <-- Section Label
|  [Check Icon]  Auto-Sync to Accounting   [✓]          |  <-- Checkable Menu Item
|  [Share Icon]  Export Format                      >   |  <-- Submenu Trigger (Chevron >)
|-------------------------------------------------------|  <-- Separator Line
|  [Archive Icon] Archive Invoice                       |  <-- Muted Standard Action
|  [Trash Icon]   Delete Invoice                    ⌫   |  <-- Destructive Action (Red text/icon)
+-------------------------------------------------------+
```

### Functional Grouping & Micro-Typography
1. **Section Headers:** Uppercase micro-type (`color: var(--text-tertiary); font-size: 0.75rem; font-weight: 600; padding: 6px 10px 2px 10px;`).
2. **Item Spacing & Tap Alignment:** Flexbox layout (`display: flex; align-items: center; justify-content: space-between; padding: 8px 10px; height: 36px; border-radius: 4px;`).
3. **Leading Icons:** Muted icon token (`color: var(--icon-secondary); width: 16px; height: 16px; margin-right: 10px;`).
4. **Keyboard Shortcut Hints:** Trailing monospaced label (`color: var(--text-tertiary); font-family: monospace; font-size: 0.75rem;`).
5. **Destructive Action Separation:** Placed at the very bottom of the menu panel after a separator line. Text and icon utilize red danger tokens (`color: var(--color-danger); hover-bg: var(--color-danger-subtle)`).

---

## 4. Responsive Mobile Adaptation Strategy (`< 768px`)

On narrow mobile viewports, the desktop floating dropdown transitions into a **Bottom Action Sheet**:

```text
+-------------------------------------------------------+
|  ============== Drag Handle Indicator ==============  |  <-- 36px x 4px Pill Handle
|                                                       |
|  Invoice Actions (#1041)                              |  <-- Header Title
|                                                       |
|  [ Eye Icon ]    View Details                   ⌘O    |  <-- Tap Target: 48px Height
|  [ Mail Icon ]   Send Reminder...                     |  <-- Tap Target: 48px Height
|  [ File Icon ]   Download PDF                   ⌘D    |  <-- Tap Target: 48px Height
|  ---------------------------------------------------  |
|  [ Archive Icon] Archive Invoice                      |  <-- Tap Target: 48px Height
|  [ Trash Icon ]  Delete Invoice                       |  <-- Tap Target: 48px Height
|                                                       |
|  [ CANCEL ]                                           |  <-- Full-width Cancel Button
+-------------------------------------------------------+
```

### Touch Adaptations:
- **Placement:** Fixed to bottom viewport (`position: fixed; bottom: 0; left: 0; right: 0; width: 100%`).
- **Touch Target Padding:** Row height expanded from `36px` to `48px` to ensure effortless finger tapping (WCAG 2.5.8 Target Size).
- **Dismissal Mechanism:** Tap anywhere on dimmed backdrop (`rgba(0,0,0,0.5)`), drag sheet down, or tap explicit full-width "Cancel" button.

---

## 5. Keyboard Navigation & ARIA Focus State Flow

```text
[ Trigger Button ]  --- (User presses Enter / Space / ArrowDown) ---> [ Menu Opens & Focuses Item 1 ]
        ^                                                                     |
        |                                                                 (ArrowDown)
        |                                                                     v
  (Press Escape) <--------------------------------------------------- [ Focuses Item 2 ]
        |                                                                     |
        |                                                                 (ArrowDown)
        v                                                                     v
[ Menu Closes & Returns Focus ] <------------------------------------- [ Focuses Item 3 (Destructive) ]
```

1. **Opening Phase:**
   - User tabs to `[ (•••) ]` trigger button.
   - User presses `ArrowDown` or `Enter`.
   - JavaScript opens menu (`aria-expanded="true"`), finds first focusable `.menu-item`, and executes `.focus()`.
2. **Item Traversal:**
   - User presses `ArrowDown`: Focus wraps from last item back to first item.
   - User presses `ArrowUp`: Focus moves backward up the list.
   - User types "D": Focus immediately jumps to "Download PDF" (Typeahead character matching).
3. **Closing Phase:**
   - User selects an action (or presses `Escape`): Menu closes (`aria-expanded="false"`), and programmatic focus returns cleanly to `[ (•••) ]` trigger.
