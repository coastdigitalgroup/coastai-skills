# Sidebar Anatomy Blueprint

Use this blueprint to structure a persistent vertical navigation system. This template ensures consistent spacing, logical grouping, and accessibility landmarks.

## 1. Structural Markup (HTML)

```html
<aside class="sidebar-container">
  <nav class="sidebar-nav" aria-label="Application Navigation">

    <!-- HEADER: Branding & Context -->
    <header class="sidebar-header">
      <div class="brand-logo">
        <!-- Logo SVG -->
      </div>
      <div class="workspace-switcher">
        <button aria-haspopup="listbox" aria-expanded="false">
          <span class="current-workspace">Acme Corp</span>
          <span class="icon-chevron-down"></span>
        </button>
      </div>
    </header>

    <!-- BODY: Navigation Groups -->
    <div class="sidebar-body">

      <!-- Group 1: General -->
      <ul class="nav-group">
        <li class="nav-item">
          <a href="/dashboard" class="nav-link active" aria-current="page">
            <span class="nav-icon" aria-hidden="true"></span>
            <span class="nav-label">Dashboard</span>
          </a>
        </li>
        <li class="nav-item">
          <button class="nav-link" aria-expanded="true" aria-controls="sub-projects">
            <span class="nav-icon" aria-hidden="true"></span>
            <span class="nav-label">Projects</span>
            <span class="icon-expand"></span>
          </button>
          <ul id="sub-projects" class="sub-nav">
            <li><a href="/projects/alpha" class="sub-link">Project Alpha</a></li>
            <li><a href="/projects/beta" class="sub-link">Project Beta</a></li>
          </ul>
        </li>
      </ul>

    </div>

    <!-- FOOTER: Utilities & User -->
    <footer class="sidebar-footer">
      <ul class="nav-group">
        <li class="nav-item">
          <a href="/settings" class="nav-link">
            <span class="nav-icon" aria-hidden="true"></span>
            <span class="nav-label">Settings</span>
          </a>
        </li>
      </ul>
      <div class="user-profile">
        <img src="avatar.jpg" alt="" class="user-avatar">
        <div class="user-info">
          <span class="user-name">Jane Doe</span>
          <span class="user-role">Admin</span>
        </div>
      </div>
    </footer>

  </nav>
</aside>
```

---

## 2. Spatial Blueprint (Spacing Tokens)

Apply these spacing rules from the `fluid-spacing-system` to maintain rhythm:

| Component | Token | Value (Approx) | Purpose |
| :--- | :--- | :--- | :--- |
| **Sidebar Width** | `--sb-width` | 260px | Desktop default. |
| **Section Gap** | `--space-l` | 32px | Gap between Header, Body, and Footer. |
| **Item Padding** | `--space-s` | 12px | Internal padding for nav links. |
| **Label Offset** | `--space-m` | 16px | Distance between Icon and Label. |
| **Sub-nav Inset** | `--space-xl` | 40px | Indentation for Level 2 items. |

---

## 3. Visual State Checklist

Ensure your CSS provides these visual affordances:

- [ ] **Active Indicator:** A vertical 4px bar on the left edge of the active link.
- [ ] **Focus Ring:** A high-contrast ring (3:1) for keyboard navigation.
- [ ] **Collapsed State:** `.sidebar-container.is-collapsed` hides `.nav-label` and `.user-info`.
- [ ] **Hover State:** Background color shifts subtly (e.g., Gray-50 to Gray-100).

---

## 4. Interaction Annotations

- **Collapse Toggle:** Clicking the chevron at the bottom should shrink the sidebar width and hide labels.
- **Accordion:** Only one top-level group should be expandable at a time (optional, based on IA density).
- **Tooltips:** In the collapsed "Rail" state, hovering over an icon must trigger a tooltip showing the `nav-label`.
