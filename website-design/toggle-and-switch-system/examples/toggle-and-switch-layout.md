# Toggle and Switch Layout Breakdown

This document provides realistic layout and page composition breakdowns showing the `toggle-and-switch-system` applied to real-world design problems across settings preference panels, SaaS pricing tier toggles, and data table row controls.

---

## 1. Application Settings & Preferences Panel

In application settings interfaces, users manage multiple immediate system preferences. Each preference card pairs a descriptive title and subtitle on the left with a right-aligned toggle switch.

```text
+-----------------------------------------------------------------------------------+
|  ACCOUNT & NOTIFICATION PREFERENCES                                               |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  [Icon]  Push Notifications                                        [ (X) OFF ]    |
|          Receive instant alerts on your desktop when someone mentions you.        |
|          -----------------------------------------------------------------------  |
|                                                                                   |
|  [Icon]  Two-Factor Authentication (2FA)                            [ ON (O) ]    |
|          Require an SMS or authenticator code when signing in on a new device.    |
|          -----------------------------------------------------------------------  |
|                                                                                   |
|  [Icon]  Marketing Emails & Product Updates                        [ (X) OFF ]    |
|          Receive weekly digests and product feature announcements.                |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

### Key Spatial & Visual Design Decisions

1. **Alignment Anchor:** The vertical center of each switch aligns with the **first line of the title text** (`h4`/`span.title`), ensuring consistent baseline balance regardless of whether the description spans 1 or 3 lines.
2. **Row Container:** Each preference item is wrapped in a flex container (`display: flex; justify-content: space-between; align-items: flex-start; gap: 24px; padding: 16px 0; border-bottom: 1px solid var(--border-subtle)`).
3. **Touch Area Padding:** On mobile screens (<768px), each row container expands its vertical hit padding to `20px` to allow easy tapping anywhere along the row, while the switch button retains a minimum 44x44px touch target.
4. **State Contrast:**
   - **OFF Track:** Neutral slate border (`#94A3B8`) with light surface background (`#F8FAFC`). Thumb at `translateX(2px)`.
   - **ON Track:** Primary blue background (`#2563EB`) with white thumb at `translateX(22px)`. Contrast ratio against white page background is 4.6:1 (exceeds WCAG 3:1 non-text requirement).

---

## 2. SaaS Hero Pricing Toggle (Monthly vs. Annual)

In SaaS pricing tables, switches act as global view controls that commute pricing values across all plan cards simultaneously.

```text
+-----------------------------------------------------------------------------------+
|                                                                                   |
|                          Flexible Plans for Every Team                            |
|                                                                                   |
|                 [ Monthly ]   (---O---)   [ Annual ]  [ Save 20% ]               |
|                                                                                   |
|   +--------------------------+  +--------------------------+  +-----------------+ |
|   | STARTER                  |  | PRO (POPULAR)            |  | ENTERPRISE      | |
|   | $19 / mo                 |  | $49 / mo                 |  | Custom          | |
|   | (Billed annually at $228)|  | (Billed annually at $588)|  | Unlimited       | |
|   |                          |  |                          |  |                 | |
|   | [ Get Started ]          |  | [ Start Free Trial ]     |  | [ Contact Us ]  | |
|   +--------------------------+  +--------------------------+  +-----------------+ |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

### Key Interaction & Layout Rules

1. **Flanking Labels:** The switch is placed between two clickable text labels ("Monthly" and "Annual").
   - Clicking "Monthly" sets `aria-checked="false"` and slides thumb left.
   - Clicking "Annual" sets `aria-checked="true"` and slides thumb right.
   - Clicking the switch itself toggles between the two states.
2. **Badge Association:** The "Save 20%" discount badge is visually attached to the "Annual" label using a pill badge (`background: #DCFCE7; color: #166534; font-size: 12px; font-weight: 600`).
3. **Layout Shift Prevention:** Card height and numeric dimensions are pre-reserved. Changing the toggle updates numbers smoothly without causing card vertical heights to collapse or expand.

---

## 3. Data Table Row Control (Inline Webhook Enable/Disable)

In dense administrative data tables, switches allow users to activate or deactivate individual API endpoints or automated webhooks without leaving the table view.

```text
+-----------------------------------------------------------------------------------+
| ENDPOINT URL                      EVENT TYPES           LAST TRIGGER     STATUS   |
+-----------------------------------------------------------------------------------+
| https://api.acme.com/v1/stripe    payment.succeeded     2 mins ago       (O) ON   |
| https://api.acme.com/v1/orders    order.created         15 mins ago      (O) ON   |
| https://api.acme.com/v1/users     user.signup           Yesterday       (X) OFF   |
+-----------------------------------------------------------------------------------+
```

### Compact Switch Specification

- **Scale:** Uses the Compact Switch variant (`36px` track width x `20px` track height, `16px` thumb diameter).
- **Touch Target Padding:** Extended via invisible pseudo-element (`::before`) to `44x44px` so table row spacing remains tight visually while remaining touch-friendly.
- **Async Latency Indicator:** When toggled in a table row, the thumb displays an inline micro-spinner during the network request before settling into the confirmed ON or OFF state.
