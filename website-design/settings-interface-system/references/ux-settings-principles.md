# Settings Interface Design: Reference & Heuristics Guide

This reference document outlines the UX principles, layout models, microcopy guidelines, and accessibility standards required to design world-class web settings and preferences interfaces.

---

## 1. Navigational Hierarchies

Settings density dictates navigation. Applying the correct pattern prevents cognitive overload.

### The Categorization Matrix

| Section Count | Navigational Pattern | Description | Best For |
| :--- | :--- | :--- | :--- |
| **1 – 4 Sections** | **Horizontal Sub-Tabs** | Inline secondary tab menus positioned immediately under the header, spanning 100% detail page content. | Simple SaaS profiles, personal blogs, or micro-accounts. |
| **5 – 10 Sections** | **Persistent Left Sidebar** | Split-pane grid where a structured sidebar (Master) routes users between cards rendering on the right (Detail). | Standard B2B/B2C SaaS accounts, project workspaces, and team tools. |
| **11+ Sections** | **Collapsible Sidebar Categories** | Hierarchical vertical menu grouped into sections (e.g., *Personal Settings*, *Workspace Admin*, *Security & API*) that can collapse to conserve space. | Enterprise resource planning, AWS-like cloud portals, and deep settings consoles. |

---

## 2. Microcopy & Labeling Best Practices

Settings copy must be precise, transparent, and immediate. Users are navigating configurations, and any ambiguity can lead to user error or fatigue.

### Rule 1: The Positivity Principle (Avoid Double Negatives)
Never phrase toggles in the negative. Toggling a switch "On" must enable a behavior, never disable it.
- **Bad:** `[ ] Disable weekly completed task warnings` (Checked means Off/Disabled)
- **Good:** `[ ] Receive weekly completed task warnings` (Checked means On/Enabled)

### Rule 2: Sub-label Context
Every title in a setting must be supported by descriptive sub-label body copy that details the exact system trigger.
- **Field Title:** `Allow Workspace Exports`
- **Sub-label Body:** `Permit team administrators to compile and download all project datasets, attachment cards, and invoices in a raw ZIP bundle.`

### Rule 3: Input Help Placements
Position helper text immediately below the input box (`margin-top: var(--space-xs)`). Never place essential instructions exclusively inside placeholders. Once the input receives focus and the user begins typing, placeholder text disappears, causing cognitive reset.

---

## 3. High-Density Notification Boards

Notification hubs are prone to visual noise. Design tables or grids to structure complex delivery channels.

### The Matrix Grid Layout
When users need to configure multiple events across several delivery mediums (e.g., email, push, SMS), utilize a structured matrix:

```text
+-------------------------------------------------------------------------+
| Notification Matrix                                                     |
+-------------------------------------------------------------------------+
| Activity Event                 | Email (Toggle) | Mobile Push  | SMS    |
+-------------------------------------------------------------------------+
| A teammate mentions you        |     [ x ]      |    [ x ]     | [   ]  |
| A project milestone is reached |     [ x ]      |    [   ]     | [   ]  |
| billing issue or failure alert |     [ x ]      |    [ x ]     | [ x ]  |
+-------------------------------------------------------------------------+
```

### Grid Design Rules
1. **Interactive Rows:** Hovering or focusing an individual toggle must highlight the parent row (`background-color: var(--color-bg-base)`) to prevent cross-row misclicks.
2. **Accessible Headers:** Matrix columns must feature clear vertical text headers. Use `th` elements with `scope="col"`.
3. **Selective Availability:** If a specific event is unavailable on a certain medium (e.g., SMS alerts for milestone events), do not render an empty checkbox. Render a subtle `N/A` text or empty dash symbol so users aren't left guessing if the checkbox is broken.

---

## 4. Full Accessibility & Keyboard Checklist

A compliant settings interface must satisfy the following criteria:

- [ ] **Grouping Semantics (`<fieldset>`):** Group logically correlated options (such as login details or security preferences) within `<fieldset>` tags, utilizing `<legend>` as the accessible title. This ensures screen readers announce the category container context before the input label.
- [ ] **Programmatic Labels:** Every text input, select list, checkbox, and switch must have an associated `<label>` tag using the `for` attribute pointing to the input `id`.
- [ ] **Dynamic Live Regions (`aria-live`):** For immediate auto-saves, direct the output of background network confirmations into a dedicated element containing `aria-live="polite"` and `aria-atomic="true"`. The element must announce: "Saving changes..." followed by "Preferences saved."
- [ ] **Keyboard Navigation & Traps:**
  - Standard focus rings must have at least `3:1` contrast against adjacent backgrounds.
  - Users must be able to navigate all menus, forms, and triggers using only the `Tab`, `Space`, `Enter`, and `Arrow` keys.
  - Modals (like Danger Zone confirmation dialogs) must trap keyboard focus internally, preventing users from accidentally tabbing out into the background page layout.
- [ ] **Dirty State Navigation Intercepts:** When a user alters a manual-save input, attach an event intercept to the window `beforeunload` action and all internal navigation routing links. If they attempt to click away, spawn a native or styled confirmation modal to prevent accidental data loss.
