# Command Palette System: Design Scenarios & Breakdowns

This document presents two realistic website design scenarios applying the **Command Palette System** to solve user wayfinding, keyboard-first navigation, and shortcut-discovery challenges.

---

## Scenario 1: B2B Project Management SaaS ("TaskForge")

### The Challenge
"TaskForge" is an enterprise-tier collaborative workspace with high feature-density. Users frequently struggle to toggle between 12+ workspace boards, trigger administrative tasks (like updating billing or adding members), and find context-specific actions. The traditional navigation bar is overcrowded, and mobile users experience high menu-diving fatigue.

### The Solution: A Command-Palette-Led App Shell
The design integrates a persistent `Cmd+K` trigger in the global header, which opens a top-anchored command palette overlay.

---

### Wireframe Breakdown

#### 1. Header Trigger (Default Unclicked State)
The trigger is positioned centrally in the persistent app header. It is visually styled to look like an input but functions as an interactive button that opens the palette.

```text
+---------------------------------------------------------------------------------+
| [Logo] TaskForge   | Search or run a command...                       [ ⌘ K ]  |
+---------------------------------------------------------------------------------+
                       ^                                                 ^
               Visual Input Styling                              Shortcut Badge
```

#### 2. Default Overlay State (On Trigger, No Query Typed)
When the user clicks the trigger or presses `⌘K`, the backdrop dims, and the top-centered palette opens. It defaults to displaying the user's **Recent Searches**, **Navigation shortcuts**, and **Common Actions**.

```text
+-------------------------------------------------------------------------------+
|  [Search Icon]  Search or type a command...                             [ESC] |
+-------------------------------------------------------------------------------+
|  ( All )  ( Actions )  ( Pages )  ( Members )  ( Settings )                   |
+-------------------------------------------------------------------------------+
|  RECENT SEARCHES                                                              |
|  [Icon] Go to Billing Settings                                  [ ⌘ G ] [ B ] |
|  [Icon] Open Active Sprint Board                                              |
|                                                                               |
|  NAVIGATION                                                                   |
|  [Icon] Dashboard                                               [ ⌘ G ] [ D ] |
|  [Icon] Team Members                                            [ ⌘ G ] [ T ] |
|                                                                               |
|  ORGANIZATION ACTIONS                                                         |
|  [Icon] Create New Workspace Board                               [ ⌥ N ]      |
|  [Icon] Invite Team Member...                                    [ ⌥ I ]      |
+-------------------------------------------------------------------------------+
|  ↑↓ Navigate  |  ↵ Select  |  esc Close  |  ? Keyboard Shortcuts              |
+-------------------------------------------------------------------------------+
```

#### 3. Active Search State (Query: "inv")
The user types "inv". The category chips automatically filter, and the list updates instantly. Matching letters are **bolded**. The first result is active by default.

```text
+-------------------------------------------------------------------------------+
|  [Search Icon]  inv_                                                    [ESC] |
+-------------------------------------------------------------------------------+
|  ( All )  ( Actions )  ( Pages )  ( Members )  ( Settings )                   |
+-------------------------------------------------------------------------------+
|  ACTIONS (2)                                                                  |
|  >> [Icon] **Inv**ite Team Member...             Settings > Org       [ ⌥ I ] |  <-- Active Selected Option (BG Highlight)
|     [Icon] **Inv**oicing & Receipt Logs          Settings > Billing   [ ⌘ G ] |
|                                                                               |
|  MEMBERS (1)                                                                  |
|     [Avatar] **Inv**itation: Sarah Jenkins       Pending Approval             |
+-------------------------------------------------------------------------------+
|  ↑↓ Navigate  |  ↵ Select  |  esc Close  |  ? Keyboard Shortcuts              |
+-------------------------------------------------------------------------------+
```

- **Visual Cues Applied:**
  - **Selected Row Highlight:** Double right-angle indicators `>>` (or background-color shift to `--color-primary-light`) immediately highlight the active row.
  - **Query Echo Echoing:** Bolding the matched characters (`**Inv**`) establishes high scanability.
  - **Context breadcrumbs:** Below the title, small muted text (`Settings > Org`) provides context.

---

### Mobile Viewport Adaptation
On mobile viewports (<768px), the layout shifts to eliminate layout squishing and prevent physical keyboard mismatch.

```text
+-------------------------------------------+
| [Back Arrow]  Search...             [Clear]|
+-------------------------------------------+
|  ( All )  ( Actions )  ( Pages )  ( Help )|
+-------------------------------------------+
|  ACTIONS                                  |
|  [Icon] Invite Team Member...             |  <-- Sized to 48px height for touch
|  [Icon] Invoicing & Receipt Logs          |
|                                           |
|  PAGES                                    |
|  [Icon] Active Sprint Board               |
|  [Icon] Dashboard                         |
|  [Icon] Team Settings                     |
+-------------------------------------------+
```

- **Mobile Adaptations Applied:**
  - **Full-Screen takeover:** The overlay occupies 100% of the screen height and width to prevent visual double scrollbars.
  - **Hiding Keyboard Badges:** The shortcut badges (e.g., `[ ⌥ I ]`) are hidden because the mobile device does not have an Option/Alt key.
  - **Enlarged Touch Targets:** Row heights are expanded to a minimum of **48px** to guarantee accurate tapping (WCAG 2.2 SC 2.5.8).
  - **Top-left Back Arrow:** Tapping the back arrow cleanly dismisses the command palette and returns the background document to its active state.

---

## Scenario 2: High-Density API Documentation Portal ("DevStream")

### The Challenge
"DevStream" is an API developer portal containing over 10,000 reference pages across Guides, API Endpoints, SDK libraries, and Release Notes. Developers need to move rapidly from reading guides to querying API properties, without having to mouse-navigate complex nested sidebars.

### The Solution: Multi-Modifier Command Palette
The design leverages prefix modifiers in the command palette. Developers can filter content types directly by typing a single-character prefix (e.g., `/` for endpoints, `?` for guides, `@` for SDKs).

#### Active Search with Prefix Modifier (Query: "/auth")
By typing `/auth`, the system limits search results strictly to **API Endpoints** containing "auth", filtering out tutorials and general guides.

```text
+-------------------------------------------------------------------------------+
|  [Search Icon]  /auth_                                                  [ESC] |
+-------------------------------------------------------------------------------+
|  FILTER ACTIVE: API Endpoints (/)                                     [Clear] |
+-------------------------------------------------------------------------------+
|  API ENDPOINTS (3 Matches)                                                    |
|  >> [POST]  /v1/**auth**/token                   Authentication   [REST]      |  <-- Active Selected Option
|     [GET]   /v1/**auth**/user                    Session Info     [REST]      |
|     [DELETE]/v1/**auth**/logout                  Revocation       [REST]      |
+-------------------------------------------------------------------------------+
|  Prefixes:  / API Endpoints  |  ? Guides  |  @ SDKs  |  esc Close             |
+-------------------------------------------------------------------------------+
```

- **Visual Cues Applied:**
  - **Status Badge Integration:** Semantic badges (`[POST]`, `[GET]`, `[DELETE]`) communicate the HTTP method immediately using specific color coding.
  - **Prefix Context Bar:** The category chip bar transforms into an active "Filter Active" alert with a "Clear" button.
  - **Footer Instruction Shift:** The helper footer dynamically shifts to list available prefix modifiers, educating developers on how to use advanced search techniques.
