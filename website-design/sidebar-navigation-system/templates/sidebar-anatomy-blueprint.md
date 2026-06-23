# Sidebar Anatomy Blueprint

Use this structural template to define the regions and behaviors of your
sidebar navigation. Copy this into your design spec or documentation.

## 1. Structural Regions

| Region | Content Elements | Visual Weight |
| :--- | :--- | :--- |
| **A. Branding** | Logo, App Name, Workspace Switcher | High (Bold, 16px+) |
| **B. Discovery** | Search bar, Global Filters | Medium (Borders/Input) |
| **C. Primary** | Core functional links (Dashboard, Inbox) | High (Icon + Label) |
| **D. Secondary** | Grouped links, Accordions, Nested lists | Low (Indented, Lighter) |
| **E. Action** | "Create New", "Invite Team" buttons | High (Primary Button) |
| **F. Utility** | Settings, Support, Theme Switcher | Medium (Small Icons) |
| **G. Profile** | Avatar, Name, Logout, Collapse Toggle | Medium (Avatar-led) |

---

## 2. Interaction State Matrix

Define the visual tokens for each state:

- **Default:** `color: var(--gray-600); background: transparent;`
- **Hover:** `color: var(--gray-900); background: var(--gray-100);`
- **Active (Page):** `color: var(--blue-600); background: var(--blue-50); border-left: 4px solid var(--blue-600);`
- **Active (Nested):** `color: var(--blue-600); font-weight: 600;`
- **Disabled:** `opacity: 0.5; pointer-events: none;`
- **Focus:** `outline: 2px solid var(--blue-400); outline-offset: -2px;`

---

## 3. Keyboard Shortcut Map

Standardize these interactions for power users:

| Key | Action |
| :--- | :--- |
| `[` | Toggle Sidebar (Expand/Collapse) |
| `/` or `Cmd + K` | Focus Global Search |
| `Up / Down` | Navigate menu items (when focus is in sidebar) |
| `Right / Left` | Expand / Collapse Nested Folder |
| `1-9` | Jump to Top-Level item in Primary Nav |

---

## 4. Component Specification (CSS Logic)

```css
/* Sidebar Container */
.sidebar {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: var(--sidebar-width-expanded); /* 260px */
  background: var(--bg-surface);
  border-right: 1px solid var(--border-subtle);
  transition: width 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: sticky;
  top: 0;
}

/* Nav Item */
.nav-item {
  display: flex;
  align-items: center;
  height: 40px; /* Minimum touch target */
  padding: 0 var(--space-m);
  gap: var(--space-s);
  border-radius: 6px;
  margin: 2px var(--space-s);
  cursor: pointer;
  text-decoration: none;
}

/* Nested Items */
.nav-sub-item {
  margin-left: 32px; /* Indent level 1 */
  height: 32px;
  font-size: 0.9em;
}

/* Mini State */
.sidebar--mini {
  width: var(--sidebar-width-collapsed); /* 72px */
}
.sidebar--mini .nav-item__label {
  display: none;
}
```
