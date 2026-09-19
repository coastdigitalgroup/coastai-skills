# Toggle and Switch System - Example Layout Breakdown

This document provides a realistic layout composition breakdown demonstrating how the **Toggle and Switch System** is applied within an e-commerce / SaaS account settings dashboard and a dark theme preference section.

---

## Scenario: Account Security & Preference Panel

In this scenario, a SaaS application settings page allows users to manage security settings, notification preferences, and system appearance. All settings take effect immediately via background API calls without requiring a global "Save Changes" button.

---

## Spatial Layout & Anatomy Breakdown

```text
+-----------------------------------------------------------------------------------+
| ACCOUNT PREFERENCES & SECURITY                                                    |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  [Section 1: Security & Authentication]                                           |
|  +-----------------------------------------------------------------------------+  |
|  | Two-Factor Authentication (2FA)                         [  ====(O)  ]       |  |
|  | Requires an authenticator app code on login                ON (Active)          |  |
|  +-----------------------------------------------------------------------------+  |
|  | Login Security Alerts                                   [  (O)====  ]       |  |
|  | Receive email alerts when a new device logs in             OFF (Inactive)       |  |
|  +-----------------------------------------------------------------------------+  |
|                                                                                   |
|  [Section 2: System Appearance]                                                   |
|  +-----------------------------------------------------------------------------+  |
|  | Dark Mode Theme                                         [  ===(O)===  ]     |  |
|  | Switch between dark and light high-contrast themes       LOADING... (Spinner) |  |
|  +-----------------------------------------------------------------------------+  |
|  | Reduce Interface Motion                                 [  (X)====  ]       |  |
|  | Minimizes animations across all dashboard views            DISABLED             |  |
|  +-----------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------+
```

---

## Design Specifications & Annotations

### Row 1: Two-Factor Authentication (Active / ON State)
- **Label Title:** Two-Factor Authentication (2FA) — Font: 16px Medium, `--color-text-primary` (Contrast > 7:1).
- **Description:** Requires an authenticator app code on login — Font: 14px Regular, `--color-text-secondary` (Contrast 4.5:1).
- **Switch Track:**
  - Dimensions: 44px width × 24px height.
  - Fill Color: `--color-primary-600` (`#2563EB`) — WCAG 3:1 non-text contrast achieved against white container.
  - Inner Thumb: 20px diameter, white `#FFFFFF`.
  - Position: Offset Right (`transform: translateX(20px)`).
  - ARIA Attributes: `role="switch"`, `aria-checked="true"`, `aria-labelledby="label-2fa"`.
- **Interaction Model:** Toggling immediately prompts a 2FA setup modal or updates security credentials.

### Row 2: Login Security Alerts (Inactive / OFF State)
- **Label Title:** Login Security Alerts — Font: 16px Medium.
- **Description:** Receive email alerts when a new device logs in — Font: 14px Regular.
- **Switch Track:**
  - Dimensions: 44px width × 24px height.
  - Fill Color: `--color-neutral-300` (`#D1D5DB`) — High-contrast dark neutral border/fill meeting 3:1 contrast.
  - Inner Thumb: 20px diameter, white `#FFFFFF`.
  - Position: Offset Left (`transform: translateX(0px)`).
  - ARIA Attributes: `role="switch"`, `aria-checked="false"`, `aria-labelledby="label-alerts"`.
- **Interaction Model:** Clicking updates user notification preference via background `PATCH` request.

### Row 3: Dark Mode Theme (Async Loading State)
- **Label Title:** Dark Mode Theme — Font: 16px Medium.
- **Description:** Switch between dark and light high-contrast themes — Font: 14px Regular.
- **Switch Track:**
  - Fill Color: `--color-primary-400` (`#60A5FA`) with 60% opacity while API call is pending.
  - Inner Thumb: Displays a tiny centered 12px CSS loading spinner.
  - ARIA Attributes: `role="switch"`, `aria-checked="true"`, `aria-busy="true"`, `aria-disabled="true"`.
- **Interaction Model:** Optimistically switches theme, displays spinner for 150ms while stylesheet swaps, then resolves `aria-busy` to `false`.

### Row 4: Reduce Interface Motion (Disabled State)
- **Label Title:** Reduce Interface Motion — Font: 16px Medium (Dimmed 50%).
- **Description:** Minimizes animations across all dashboard views — Font: 14px Regular (Dimmed 50%).
- **Switch Track:**
  - Fill Color: `--color-neutral-200` (`#E5E7EB`).
  - Inner Thumb: `--color-neutral-400` (`#9CA3AF`).
  - Cursor: `not-allowed`.
  - ARIA Attributes: `role="switch"`, `aria-checked="false"`, `disabled`.

---

## Responsive & Touch Adaptation

- **Mobile Viewport (< 640px):**
  - Switch rows expand to 100% card width with `16px` padding around each row.
  - The entire row (text + switch) acts as a single touch target with a minimum height of `56px`, providing an easy thumb target.
  - The switch maintains a 12px right margin, aligned cleanly with the card right edge.
- **Desktop Viewport (>= 1024px):**
  - Rows are laid out in a clean list panel inside a card container with subtle borders (`--color-border-subtle`).
  - Keyboard focus highlights the entire row container with a prominent 2px high-contrast blue focus ring (`outline: 2px solid #2563EB; outline-offset: 2px;`).
