# WYSIWYG Content Editor and Inline Comment Composer Layout Breakdowns

This document presents two realistic design breakdowns demonstrating the **Rich Text Editor UI System** applied to common web product requirements:

1. **Pattern A:** Long-Form WYSIWYG Article Editor Canvas (CMS / Publishing Workspace)
2. **Pattern B:** Compact Inline Comment & Reply Composer (Discussion / SaaS Workspace)

---

## Pattern A: Long-Form WYSIWYG Article Editor Canvas

### Overview

Designed for publishing platforms, knowledge bases, and enterprise CMS environments. It combines a sticky top formatting toolbar, a centered reading canvas envelope (60–75 characters per line), block-level hover controls, a slash command menu popover, a floating text selection bubble toolbar, and a bottom status bar.

### Visual & Spatial Layout Diagram

```text
+---------------------------------------------------------------------------------------------------+
|  GLOBAL NAV HEADER                                                                  [ Publish v ] |
+---------------------------------------------------------------------------------------------------+
|  STICKY FORMATTING TOOLBAR (role="toolbar")                                                       |
|  [H1 v] | [B] [I] [U] [S] [</>] | [• List] [1. List] [☑ Task] | [🔗 Link] [📷 Image] | [↺] [↻]  |
+---------------------------------------------------------------------------------------------------+
|                                                                                                   |
|                                CANVAS READING ENVELOPE (max-width: 720px)                         |
|                                                                                                   |
|  [ Title Field: "Architecting Resilient Frontend Systems"                                    ]   |
|                                                                                                   |
|  Hover Handle                                                                                     |
|  [+] [⋮⋮]   In modern web applications, rich text editors serve as the primary bridge between      |
|             human thought and digital publishing.                                                 |
|                                                                                                   |
|             Floating Bubble Menu (Text Highlight Selection)                                       |
|             +--------------------------------------+                                              |
|             | [B] [I] [S] | [🔗 Link] | [💬 Comment] |                                              |
|             +--------------------------------------+                                              |
|             To achieve high accessibility and usability, editor interfaces must balance           |
|             immediate feedback with distraction-free writing environments.                        |
|                                                                                                   |
|             Slash Command Popover                                                                 |
|             /                                                                                     |
|             +-------------------------------------------------------+                             |
|             | BASIC BLOCKS                                          |                             |
|             |  [H1] Heading 1         Big section heading           |                             |
|             |  [H2] Heading 2         Medium section heading        |                             |
|             |  [•]  Bulleted List     Create a simple bulleted list |                             |
|             |  [❝]  Quote             Capture a pull quote          |                             |
|             +-------------------------------------------------------+                             |
|                                                                                                   |
+---------------------------------------------------------------------------------------------------+
|  STATUS BAR                                                                                       |
|  Words: 482  |  Characters: 3,120  |  Reading time: 2 min  |  [✓] Draft saved at 10:45 AM          |
+---------------------------------------------------------------------------------------------------+
```

### Component Breakdown & Spatial Specs

#### 1. Sticky Formatting Toolbar
- **Placement:** Positioned at the top of the workspace container with `position: sticky; top: 0; z-index: 20;`.
- **Dimensions:** Height `48px`, inline padding `16px`. Surface color `#FFFFFF` (dark mode `#1E293B`) with a `1px` bottom border (`#E2E8F0` / `#334155`) and light backdrop blur.
- **Button Sizing:** Formatting buttons are `32×32px` with `4px` border-radius. Active state uses primary soft fill (`#EFF6FF` / `#1E3A8A`) and `aria-pressed="true"`.
- **Dividers:** `1px` vertical lines (`16px` height) separate logical tool groups (Headings | Text Styles | Lists | Embeds | History).

#### 2. Canvas Envelope
- **Width Bounds:** Centered `max-width: 720px` to maintain optimal line-length (approx 68 characters per line using a 18px body font size).
- **Padding:** Top/bottom canvas padding `40px`, horizontal padding `24px`.
- **Typography:** Body font size `1.125rem` (18px), line-height `1.65`, paragraph bottom margin `1.25rem`. Headings use semibold `1.75rem` (H2) and `1.35rem` (H3) with tighter line heights (`1.25`).

#### 3. Floating Bubble Menu (Text Selection Toolbar)
- **Trigger:** Displays automatically when the user selects 2 or more characters within the canvas.
- **Positioning:** Floating `8px` above the top edge of the selection bounding box, centered horizontally.
- **Anatomy:** Dark surface background (`#0F172A`) with crisp white icons (`#F8FAFC`). Contains Bold, Italic, Strikethrough, Code inline, Link creation, and Inline Comment trigger.
- **Animation:** Fades in with a subtle scale transform (`transform: scale(0.95) -> scale(1)`, `duration: 150ms`).

#### 4. Slash Command Menu (`/`)
- **Trigger:** User types `/` at the beginning of a blank paragraph block.
- **Positioning:** Drops down directly below the text cursor (`margin-top: 4px`).
- **Dimensions:** Width `320px`, max-height `280px` with vertical auto-scroll.
- **Keyboard Navigation:** `Up` and `Down` arrow keys highlight active items with background `#F1F5F9` (`#334155` dark mode). `Enter` confirms selection and replaces the `/` prompt with the selected block. `Escape` dismisses the popover.

#### 5. Footer Status Bar
- **Dimensions:** Height `36px`, border-top `1px solid #E2E8F0`. Font size `0.875rem` (14px) with muted text color (`#64748B`).
- **Live Status Region:** Contains `<div aria-live="polite" aria-atomic="true">` to announce save confirmation updates to screen reader users without interrupting typing flow.

---

## Pattern B: Compact Inline Comment & Reply Composer

### Overview

Designed for inline thread comments, task discussions, and support ticket reply interfaces. It prioritizes low visual footprint when inactive, expanding fluidly into a structured rich text composer upon focus.

### Visual & Spatial Layout Diagram

```text
+---------------------------------------------------------------------------------------------------+
|  DISCUSSION THREAD                                                                                |
|                                                                                                   |
|  [Avatar] Sarah Chen · 2 hours ago                                                                |
|           We should update the primary button contrast tokens to pass WCAG 2.2 AAA.              |
|                                                                                                   |
|  +---------------------------------------------------------------------------------------------+  |
|  | INLINE COMPOSER CARD (Focused / Expanded State)                                             |  |
|  |                                                                                             |  |
|  |  ContentEditable Area (role="textbox", min-height: 80px, max-height: 240px)                |  |
|  |  Write a reply... Use @ to mention team members                                            |  |
|  |                                                                                             |  |
|  +---------------------------------------------------------------------------------------------+  |
|  | ACTION DOCK / TOOLBAR FOOTER                                                                |  |
|  | [B] [I] [🔗] | [@ Mention] [📷 Attach] [Smile Emoji]                   [Cancel] [ Send Reply ] |  |
|  +---------------------------------------------------------------------------------------------+  |
+---------------------------------------------------------------------------------------------------+
```

### Component Breakdown & Spatial Specs

#### 1. Inactive State (Collapsed)
- **Dimensions:** Height `44px`, single line preview with placeholder text "Write a reply...".
- **Visual Style:** Light grey border (`#CBD5E1`), background `#FFFFFF`, border-radius `8px`.
- **Interaction:** Single click or tab focus transforms the field into the Expanded State smoothly (`transition: all 200ms ease`).

#### 2. Expanded ContentEditable Canvas
- **Dimensions:** Initial `min-height: 80px` (approx 3 lines of text), auto-expanding up to `max-height: 240px` with `overflow-y: auto`.
- **Padding:** `12px` inline and block padding.
- **Focus Indicator:** `2px` solid primary focus ring (`#2563EB`) with `2px` offset, ensuring clear keyboard focus visibility.

#### 3. Action Dock & Toolbar Footer
- **Placement:** Integrated into the bottom of the composer card container, separated by a thin `1px` border-top (`#F1F5F9`).
- **Left Tool Group:** Compact formatting icons (`28×28px` buttons) for Bold, Italic, Link, `@` Team Member Mention trigger, and Image/File Attachment trigger.
- **Right Action Group:** Muted "Cancel" text button and Primary filled "Send Reply" CTA button.
- **Key Navigation:** `Ctrl+Enter` or `⌘+Enter` triggers the primary "Send Reply" action directly from inside the text canvas.

---

## Responsive Breakpoint Adaptation Table

| Feature / Element | Desktop (≥ 1024px) | Tablet (768px – 1023px) | Mobile (< 768px) |
| :--- | :--- | :--- | :--- |
| **Top Formatting Toolbar** | Full horizontal row with all 5 button groups visible. | Group 5 (Utilities) collapses into a dropdown. | Sticky to bottom viewport above virtual keyboard; scrollable horizontal row. |
| **Canvas Max Width** | `720px` (Centered envelope) | `100%` width with `24px` side margins | `100%` width with `16px` side margins |
| **Floating Bubble Menu** | Positioned `8px` above selection | Positioned `8px` above selection | Docked above mobile virtual keyboard; touch targets scaled to `44×44px`. |
| **Slash Command Popover** | Dropdown popover (`320px` width) | Dropdown popover (`300px` width) | Bottom sheet drawer with full-width item rows. |
| **Touch Target Size** | `32×32px` toolbar buttons | `36×36px` toolbar buttons | Minimum `44×44px` touch targets |
