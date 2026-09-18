# Action and Overflow Menu Layout Breakdown

This document illustrates the practical application of the `dropdown-and-menu-system` skill to two real-world application contexts: an **E-Commerce Admin Data Table Overflow Menu** and a **SaaS App Header Profile Menu**.

---

## Scenario 1: E-Commerce Admin Data Table Overflow Menu

In high-density admin tables (e.g., Orders, Customers, Products), space is at a premium. Rather than placing 4–5 individual action buttons in every table row, an **Overflow Action Menu** (`...` icon button) groups secondary and destructive row-level operations.

### Visual Blueprint

```text
+-----------------------------------------------------------------------------------+
| Order ID | Customer         | Total   | Status    | Actions                       |
+-----------------------------------------------------------------------------------+
| #ORD-9821| Sarah Jenkins    | $249.00 | Fulfilled | [ ⋮ More ]                     |
|          |                  |         |           |   |                           |
|          |                  |         |           |   v                           |
|          |                  |         |           |+-----------------------------+|
|          |                  |         |           || [👁] View Details           ||
|          |                  |         |           || [📄] Download Invoice   ⌘D  ||
|          |                  |         |           || [🔄] Re-order Items         ||
|          |                  |         |           || --------------------------- ||
|          |                  |         |           || [⚠️] Cancel Order            || <-- Destructive Item (Red)
|          |                  |         |           |+-----------------------------+|
+-----------------------------------------------------------------------------------+
```

### Key Design & Layout Mechanics

1. **Trigger Component:**
   - Visual: 32x32px icon button containing a vertical ellipsis (`⋮` or `...`).
   - Touch Target: Expanded invisible padding ensures 44x44px touch area.
   - States: Hover background tint; when active, the trigger maintains an active fill state and `aria-expanded="true"`.

2. **Menu Container & Stacking:**
   - Positioned fixed or via Popover API to break out of table row overflow (`overflow: hidden`/`auto`).
   - Aligned to the right edge of the trigger button (`right: 0`).
   - Padding: `6px 0` internal vertical padding with `8px` rounded corners (`border-radius: 8px`).
   - Elevation: `box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)`.

3. **Item Anatomy & Grouping:**
   - **Default Items:** `14px` font size, `var(--text-primary)`, 16px leading SVG icon (`var(--icon-neutral)`), trailing shortcut accelerator badge (`⌘D`).
   - **Divider Line:** `1px solid var(--border-subtle)` placed above "Cancel Order" with `6px` top/bottom margin.
   - **Destructive Item:** Text and icon styled in `var(--color-danger-600)` (#dc2626). On hover/focus, row background changes to `var(--color-danger-50)` (#fef2f2).

---

## Scenario 2: SaaS Profile & Workspace Switcher Header Menu

In SaaS header navigation, the user avatar acts as a trigger for account profile options, workspace switching, preference toggles, and session logout.

### Visual Blueprint

```text
                                             +-----------------------------------+
                                             |  Alex Morgan                      |  <-- Avatar Trigger Button
                                             |  alex@acme.io                [v]  |
                                             +-----------------------------------+
                                                               ||
                                                               v
                                             +-----------------------------------+
                                             |  CURRENT WORKSPACE                |  <-- Group Header Label
                                             |  [✓] Acme Corp (Pro Tier)         |  <-- Selected Item with Check
                                             |  [ ] Stark Industries             |
                                             |  [+] Create New Workspace         |
                                             |  -------------------------------  |  <-- Divider
                                             |  ACCOUNT                          |
                                             |  [👤] Profile Settings            |
                                             |  [⚙️] Preferences                  |
                                             |  [🌙] Dark Theme          [ Toggle]  |  <-- Interactive Switch Sub-item
                                             |  -------------------------------  |  <-- Divider
                                             |  [🚪] Log Out                     |  <-- Destructive Action
                                             +-----------------------------------+
```

### Key Design & Layout Mechanics

1. **Group Header Typography:**
   - Label: `11px` uppercase tracking text (`letter-spacing: 0.05em`) in `var(--text-tertiary)` (#6b7280).
   - Padding: `8px 16px 4px 16px`. Non-interactive (`aria-hidden="true"` or static header).

2. **Mixed Control Types (Switch Item):**
   - The "Dark Theme" item contains an embedded switch control (`role="menuitemcheckbox"` with `aria-checked="true"`).
   - Tapping the row toggles theme state without immediately closing the parent dropdown menu.

3. **Collision & Mobile Adaptation:**
   - **Desktop (≥640px):** Menu drops down anchored right below avatar trigger button.
   - **Mobile (<640px):** Tapping avatar opens a full-width bottom sheet overlay with backdrop dimming, providing large touch targets (48px item height).
