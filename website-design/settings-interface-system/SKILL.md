---
name: settings-interface-system
description:
  Design a systematic framework for user, workspace, and application settings
  interfaces, establishing clear navigation, robust section grouping, and
  reliable state persistence models.
---

# Settings Interface System

## Purpose

The Settings Interface System provides a methodology for organizing, designing, and structuring user preferences, account configurations, workspace setups, and billing portals. Settings interfaces are frequently neglected, leading to fragmented visual structures, disconnected navigation models, poor responsiveness, and severe accessibility barriers. This system establishes a standardized approach to spatial composition, navigation architectures, state persistence models (e.g., auto-save vs. manual batch save), and visual affordances to reduce cognitive load and prevent unsaved data loss.

## Use Cases

- **User Profiles & Accounts:** Designing interfaces for updating personal details, security credentials, and preferences.
- **SaaS Workspace Administration:** Organizing multi-tenant or team settings, member roles, integrations, and permission gates.
- **Notification Configuration Centers:** Creating granular, matrix-based toggle boards for email, push, and in-app alerts.
- **Billing & Subscription Hubs:** Designing clear overviews of pricing tiers, current plan metrics, payment methods, and historical invoice lists.
- **Developer Settings:** Organizing complex technical options like API key rotation, webhooks, and environment toggles.

## When NOT to Use

- **Implicit Consent & Privacy Bars:** For cookie acceptance, cookie categorization, and compliance overlays, use `consent-and-preference-system`.
- **One-off Onboarding Forms:** For simple, single-column signup steps or initial survey capture, use `form-design-system`.
- **Low-Complexity Interfaces (<5 total settings):** For extremely simple setups, do not build a nested multi-page system; integrate these options directly into the global header profile dropdown or sidebar footers.

## Inputs

1. **Settings Inventory:** A comprehensive catalog of all configurable attributes, grouped logically.
2. **State Persistence Model:** Determination of whether changes are applied instantly (auto-save) or held until confirmation (batch manual-save).
3. **User Access Roles:** Information on who can view/modify specific rows (e.g., Administrator, Billing Editor, Viewer).
4. **Spacing & Typographic Tokens:** Existing design values (from `fluid-spacing-system` and `fluid-typography-system`).

## Outputs

1. **Settings Navigation Model:** Choice of navigation layout (Sidebar, Sub-tabs, or Accordion) based on section density.
2. **Master-Detail Layout Spec:** Grid/flex composition mapping sidebar controls to their corresponding active settings panes.
3. **State Persistence & Change Log UX:** Visual and auditory patterns for saving confirmation, loading states, and dirty-state banners.
4. **Accessible Field & Permission Annotations:** Keyboard pathways, semantic legend tags, and clear disabled/read-only styling rules.

## Workflow

### 1. Group and Prioritize Settings (Clustering)

Perform card-sorting or thematic grouping on the settings inventory:
- **Personal Tier:** Profile information, avatar, login details, personal security (MFA).
- **Organization/Workspace Tier:** General workspace name, member invites, roles, global integrations.
- **Delivery/System Tier:** Notification rules, sound alerts, theme options (Dark/Light mode).
- **Financial Tier:** Plan tiers, credit cards, billing contact, invoice tables.
- **Danger Zone:** Delete account, deactivate workspace, or transfer ownership.

### 2. Choose the Layout & Navigation Architecture

Select the spatial navigation pattern:
- **Sidebar-driven (Master-Detail):** Recommended for B2B SaaS and dense setups. Use a persistent left navigation column (Master) and a scroll-contained right-side content pane (Detail).
- **Tab-driven:** Best for light-to-medium settings panels (<5 views). Use a horizontal secondary tab menu (using `tab-ui-system` or `segmented-control-system`) below the main settings page header.
- **Single-Page Scrolling (Accordion):** Best for simple mobile apps or settings lists where subsections can expand/collapse inline to keep vertical height manageable.

### 3. Establish the Saving and Feedback Model

Choose a clear state persistence mechanism for each settings card:
- **Auto-Save Pattern:**
  - Used for isolated, low-risk options (toggling Dark Mode, notification preferences).
  - *Feedback:* Render an inline spinner/loader and a clear "Saved" text indicator adjacent to the toggle. The indicator must fade out after 1-2 seconds of inactivity.
- **Batch-Save Pattern (Dirty State):**
  - Used for high-stakes forms or highly correlated fields (updating password, billing address).
  - *Feedback:* Display a floating, fixed-position header or footer banner indicating "You have unsaved changes."
  - *Actions:* Provide two prominent buttons: "Save Changes" (Primary CTA) and "Discard" (Secondary styled text). Disable the sidebar/tab navigation when dirty, or trigger a "Loss of unsaved changes" confirmation modal if the user attempts to click away.

### 4. Design High-Density Settings Matrices

For notification centers or granular permission tables:
- **Use Matrix Grids:** Align checkboxes or switches in columns corresponding to delivery channels (e.g., Email, In-app, SMS) and rows corresponding to events (e.g., "Mentioned in comment", "Task assigned").
- **Column Header Alignment:** Keep labels sticky on vertical scroll to preserve context.
- **Keyboard-ready Row Highlights:** Use `interactive-state-system` styles so focusing a cell highlights its corresponding row.

### 5. Structure the "Danger Zone" Card

irreversible, destructive actions require a dedicated visual treatment:
- **Visual Isolation:** Group actions (Deactivate Workspace, Delete Account) into a single card at the absolute bottom of the layout.
- **High Contrast Danger Alerts:** Use red borders, a subtle light-red warning background, and bold warnings detailing the consequences.
- **Double-Confirmation Modal:** Do not trigger destruction instantly. Clicking the action button must open a modal (`overlay-and-dialog-system`) requiring the user to explicitly type the name of the resource (e.g., "delete workspace-name") to confirm.

### 6. Design for Mobile Responsiveness

- **Collapse to Linear Master-First:** On viewports below `768px`, collapse the sidebar list and content detail pane into a linear master list.
- **Sub-page Navigation:** Clicking a sidebar option on mobile opens a full-width sliding panel containing only that detail section, complete with a sticky "Back to Settings" breadcrumb header.
- **Enlarge Touch Targets:** Expand checkboxes, switches, and close targets to a minimum of `44px x 44px` to accommodate thumb-driven mobile interaction.

## Decision Rules

- **Auto-Save vs. Manual-Save:** Use **Auto-Save** when a toggle/input acts as an immediate user preference (such as dark theme or alert audio). Use **Manual-Batch-Save** when fields are logically grouped and depend on validation (such as email/password change, billing information) to avoid incomplete or invalid database updates.
- **The Sidebar Threshold:** Use a persistent vertical sidebar navigation for settings suites containing **5 or more** distinct sections. For **4 or fewer** sections, use a horizontal secondary tab bar beneath the primary header.
- **Unsaved Changes Dismissal:** If a user modifies an input in a manual-save view and clicks a tab/navigation item without saving, **always** block navigation and trigger a confirmation dialog: *"Discard unsaved changes?"*

## Constraints

- **Accessibility (Semantic Structure):**
  - Group fields with `<fieldset>` and `<legend>` tags to ensure assistive technology reads the context of nested controls.
  - Form controls must use programmatically associated labels (`<label for="...">`) or `aria-labelledby`.
  - Use `aria-live="polite"` on inline auto-save indicators so screen readers are notified of background saves without disrupting typing focus.
  - Active focus indicators must satisfy a contrast ratio of at least `3:1` and must not be obscured by sticky headers or the unsaved changes banner (WCAG 2.2 SC 2.4.11).
- **Responsiveness:** Multi-column grid tables must stack into clean rows or horizontal-scroll tables on small viewports. Text elements must use `word-break: break-word` to prevent long API keys or webhook URLs from overflowing.
- **Visual Hierarchy:** Group related settings into visually isolated "cards" with standard margin spacing (`--space-l`) to reduce cognitive load compared to a single infinite list.

## Common Failure Patterns

- **The "Silent Save Failure":** When an auto-saving toggle fails in the background without showing an error state, leaving the user believing their change was recorded.
- **The "Accidental Loss":** Navigating away from a half-filled settings page loses all changes without displaying a confirmation modal or holding state.
- **The "Mystery Settings Grid":** Creating large multi-dimensional matrices (e.g., notifications) without persistent column or row headers, forcing users to align items with their fingers on-screen.
- **Poor Focus Traps in Danger Zone Modals:** Letting keyboard focus escape the confirm-delete modal into the background page, allowing users to accidentally submit background settings while trying to type a deletion confirmation.
- **Placeholder Labeling:** Using input placeholder text instead of real, persistent `<label>` tags. Once typing begins, the context is lost.

## Validation Criteria

- [ ] A persistent vertical sidebar navigation is used for 5+ settings views, collapsing gracefully to a sliding sub-view navigation on mobile screen sizes.
- [ ] Low-risk preference toggles use the Auto-Save pattern with an inline `aria-live` saving status loader.
- [ ] Critical, multi-field forms use the Manual-Batch-Save pattern with a persistent "Unsaved Changes" floating/fixed banner.
- [ ] Destructive actions are grouped into a visually isolated "Danger Zone" card with a multi-step confirmation dialog.
- [ ] Semantic HTML (`<fieldset>`, `<legend>`, `<label>`) is used for all input groups.
- [ ] Active focus indicators satisfy WCAG 2.2 contrast rules and are not obscured by overlay elements or floating banners.
- [ ] Contrast ratio of all text meets WCAG AA (4.5:1 minimum, 3:1 for large text/icons).
- [ ] Touch targets on mobile satisfy the `44px x 44px` target size for primary inputs.
