# WYSIWYG Content Editor and Comment Composer Examples

This document provides detailed layout, spatial composition, and interaction specs for two common rich text editor applications:
1. **Full-Featured Document Canvas Editor** (CMS/Article/Doc Canvas)
2. **Inline Discussion & Comment Composer** (Issue/Thread Reply Box)

---

## 1. Full-Featured WYSIWYG Document Canvas Editor

A full-page or split-pane publishing canvas designed for long-form content creation, blog posts, and documentation articles. It combines a sticky header formatting toolbar, a centered reading column, slash command popups (`/`), floating selection menus, and a bottom status bar.

### Spatial Layout Diagram (Desktop)

```text
+---------------------------------------------------------------------------------------------------------------------------------+
|  [Logo] Document Title: "Q3 System Architecture Blueprint"                      [ Draft ] [ Share ]  [ Publish Button ]          |  Header Bar (56px)
+---------------------------------------------------------------------------------------------------------------------------------+
|  [H2 v] | [ B ] [ I ] [ U ] [ S ] | [ Link ] [ Code ] | [ UL ] [ OL ] [ Task ] | [ Quote ] [ Image ] | [ AI ] | [ Undo ] [ Redo ]  |  Sticky Toolbar (44px)
+---------------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                                 |
|                                       <--- Max Width: 720px (Centered Canvas) --->                                              |
|                                                                                                                                 |
|   ⋮⋮  +   # System Architecture Overview                                                                                        |  H1 (32px bold)
|                                                                                                                                 |
|   ⋮⋮  +   This document outlines the distributed micro-frontend architecture for our next-generation web portal.              |  Body (16px, line-height 1.6)
|           We leverage modern browser capabilities to optimize Interaction to Next Paint (INP) and ensure accessibility.      |
|                                                                                                                                 |
|           +---------------------------------------------+                                                                       |
|   ⋮⋮  +   | [ B ] [ I ] [ Link ] [ Highlight ] [ Comment] |  <-- Floating Text Selection Menu (36px high, centered over selection)|
|           +---------------------------------------------+                                                                       |
|           Modern web applications must prioritize smooth main-thread scheduling and responsive keyboard focus handling.        |
|                                                                                                                                 |
|   ⋮⋮  +   /|                                                                                                                    |  Active line slash trigger
|           +-------------------------------------------------------------+                                                       |
|           | SELECT A BLOCK                                              |                                                       |  Slash Menu Popup
|           | [H1] Heading 1            Big section heading               |                                                       |  (280px max height)
|           | [H2] Heading 2            Medium section heading            |                                                       |
|           | [UL] Bullet List          Create a simple bulleted list     |                                                       |
|           | [Code] Code Block         Capture syntax highlighted snippet|                                                       |
|           +-------------------------------------------------------------+                                                       |
|                                                                                                                                 |
+---------------------------------------------------------------------------------------------------------------------------------+
|  Document > Section 1 > Paragraph                                                            384 words | 2 min read | Saved 1m ago|  Status Bar (32px)
+---------------------------------------------------------------------------------------------------------------------------------+
```

### Key Spatial & Design Specifications

1. **Top Header & Sticky Formatting Bar:**
   - **Height:** Header `56px`, Sticky Toolbar `44px` (`position: sticky; top: 0; z-index: 100`).
   - **Background:** `var(--color-surface-elevated)` (`#FFFFFF` light / `#1E293B` dark) with `1px solid var(--color-border-subtle)`.
   - **Button Anatomy:** `32x32px` icon buttons with `4px` border radius, `8px` gap within button groups, `1px solid var(--color-border-subtle)` dividers between groups.

2. **Editing Canvas Container:**
   - **Max Width:** `720px` centered with `margin: 0 auto`.
   - **Padding:** Vertical `40px`, Horizontal `24px`.
   - **Left Gutter Handle Area:** `48px` left margin reserved for block drag handle (`⋮⋮`) and add block button (`+`). Handles appear on row hover with `opacity: 0` to `opacity: 1` transition (`150ms ease`).

3. **Floating Text Selection Menu:**
   - **Dimensions:** `36px` height, variable width based on button count.
   - **Positioning:** Absolute positioning anchored `8px` above the top edge of active DOM text range.
   - **Visual Style:** Surface `#0F172A` (dark pill) with white icon buttons in light mode for ultra-high contrast emphasis (`elevation shadow: 0 4px 12px rgba(0,0,0,0.15)`).

4. **Slash Command Dropdown (`/`):**
   - **Dimensions:** `320px` width, `280px` max height with `overflow-y: auto`.
   - **Anchor:** Placed directly below the active line text insertion point (`top: calc(line-height + 4px)`).
   - **List Items:** `40px` height per row, flex row with left icon (`24x24px`), bold label (`14px`), and subtle description text (`12px`). Active keyboard highlight uses `var(--color-brand-subtle)`.

---

## 2. Inline Discussion & Comment Composer

A compact, box-constrained rich text editor designed for comment feeds, GitHub pull request reviews, Jira issue updates, or customer support ticket replies. It prioritizes rapid formatting, attachments, mention triggers, and explicit submit actions.

### Spatial Layout Diagram (Desktop & Mobile)

```text
+---------------------------------------------------------------------------------------------------+
| [User Avatar]  Add a comment...                                                                   |
| +-----------------------------------------------------------------------------------------------+ |
| | [ B ] [ I ] [ Code ] [ Link ] [ List ] [ Quote ] | [ Attach ] [ Mention @ ] | [ Markdown Mode ]| | Top Mini-Toolbar (36px)
| +-----------------------------------------------------------------------------------------------+ |
| |                                                                                               | |
| | Thanks for the code review @jules! I have updated the focus-ring variables in `theme.css`    | | Editable Body (Min-height 120px)
| | and added the missing `aria-pressed` states to the toggle buttons.                            | |
| |                                                                                               | |
| | Attachments:                                                                                  | |
| | [ Screenshot-Focus-Ring.png (142 KB) [x] ]                                                    | |
| |                                                                                               | |
| +-----------------------------------------------------------------------------------------------+ |
| | [ Paperclip ] Drag & drop files or paste screenshots             [ Cancel ]  [ Comment (Cmd+Enter) ] | Bottom Action Bar (44px)
| +-----------------------------------------------------------------------------------------------+ |
+---------------------------------------------------------------------------------------------------+
```

### Key Spatial & Design Specifications

1. **Outer Composer Container:**
   - **Border & Radius:** `1px solid var(--color-border-subtle)` with `8px` border radius.
   - **Focus State:** Border transitions to `2px solid var(--color-brand-primary)` with a `3px` focus ring glow when any child element or contenteditable canvas is active.

2. **Top Mini-Toolbar:**
   - **Height:** `36px` with `padding: 4px 8px`.
   - **Background:** Subtle surface background (`#F8FAFC` light / `#0F172A` dark) separating formatting controls from the writing area.
   - **Buttons:** `28x28px` compact icon buttons with tooltips on hover (`top: -28px`).

3. **Editable Body Area:**
   - **Min-Height:** `120px` (expands vertically as content grows up to `360px` before auto-scrolling).
   - **Padding:** `12px 16px`.
   - **Placeholder Text:** `"Leave a comment or type '@' to mention team members..."` in `var(--color-text-muted)`.

4. **Bottom Action Bar:**
   - **Height:** `44px` with `padding: 6px 12px`.
   - **Layout:** `display: flex; justify-content: space-between; align-items: center;`.
   - **Left Helper:** Drag & drop hint or attachment file list chips (`border-radius: 12px`, `padding: 2px 8px`).
   - **Right Action Buttons:** Secondary `"Cancel"` button (`36px` height) adjacent to Primary `"Comment"` button (`36px` height, brand fill, keyboard shortcut hint `"Cmd+Enter"`).

---

## 3. Interaction State Matrix

| State | Canvas Surface | Toolbar Buttons | Selection Popover | Border / Outline |
| :--- | :--- | :--- | :--- | :--- |
| **Default / Unfocused** | `--color-surface-base` | `--color-text-secondary` | Hidden | `1px solid --color-border-subtle` |
| **Canvas Focused** | `--color-surface-base` | Active options highlighted | Hidden | `2px solid --color-brand-primary` + focus ring |
| **Text Selected** | Text range highlighted | Toggled styles active | Floating menu visible (`fade-in`) | Focused border active |
| **Button Hover** | Canvas unchanged | `--color-surface-hover` | Menu button highlighted | Focused border active |
| **Button Active (Toggled)** | Applied formatting | `--color-brand-subtle` fill + blue icon | Selected style active | Focused border active |
| **Disabled / Submitting** | 50% opacity, read-only | Disabled, pointer-events: none | Hidden | `1px solid --color-disabled` |

---

## 4. Mobile Responsive & Virtual Keyboard Adaptation

When displayed on mobile devices (<768px viewports):

1. **Sticky Bottom Action Dock:**
   - The formatting toolbar transfers to the bottom edge of the mobile screen (`position: fixed; bottom: 0`).
   - Integrates `padding-bottom: env(safe-area-inset-bottom)` to prevent home indicator overlap.
   - Listens to `window.visualViewport.addEventListener('resize')` to automatically offset position when the soft keyboard rises.

2. **Mobile Horizontal Scroll Toolbar:**
   - Toolbar buttons maintain `44x44px` minimum tap areas.
   - Button group container uses `overflow-x: auto; white-space: nowrap; -webkit-overflow-scrolling: touch;`.
   - Fades subtle gradient masks at left/right scroll edges to indicate hidden formatting tools.
