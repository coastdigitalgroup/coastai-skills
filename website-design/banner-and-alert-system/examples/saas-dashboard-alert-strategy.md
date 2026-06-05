# SaaS Dashboard Alert Strategy

This example demonstrates how to apply the **Banner and Alert System** to a
complex SaaS dashboard. It shows the coexistence of site-wide announcements,
account-level warnings, and contextual inline feedback.

## Scenario

A user is viewing their "Project Settings" page. There are three active
notifications:
1.  **Site-wide:** A planned maintenance announcement.
2.  **Account-level:** A warning that their trial is ending soon.
3.  **Contextual:** An error message within the "API Keys" section.

---

## 1. Global Announcement Banner (Site-wide)

**Placement:** Fixed to the very top of the viewport, above the main navigation.

-   **Level:** Info
-   **Anatomy:**
    -   **Icon:** `info-circle`
    -   **Text:** "Scheduled Maintenance: The dashboard will be offline this
        Saturday from 2:00 AM to 4:00 AM UTC."
    -   **Action:** "View Status Page" (Link)
    -   **Dismiss:** 'X' button (User can dismiss once they've read it).
-   **Style:** Neutral background (Light Gray/Blue), high-contrast text.

## 2. Page-Level Warning Banner (Account Context)

**Placement:** Directly below the Page Header, above the main content area.

-   **Level:** Warning
-   **Anatomy:**
    -   **Icon:** `exclamation-triangle`
    -   **Text:** "Your Pro Trial ends in 2 days. Upgrade now to keep your
        advanced features."
    -   **Action:** "View Pricing" (Primary Button, Small)
-   **Style:** Amber background, dark text. Not dismissible until the trial ends
    or the user upgrades.

## 3. Inline Alert (Specific Task)

**Placement:** Inside the "API Keys" section, directly above the "Generate Key"
button.

-   **Level:** Error
-   **Anatomy:**
    -   **Icon:** `x-circle`
    -   **Text:** "Unable to generate key. You have reached the maximum limit
        of 5 API keys for your current plan."
    -   **Action:** "Upgrade Plan" (Text Link)
-   **Style:** Red border, light red background, dark red text.

---

## Layout Visualization

```text
+-------------------------------------------------------------+
| [i] Maintenance this Saturday. [View Status]            [X] | <-- GLOBAL BANNER
+-------------------------------------------------------------+
| LOGO   Projects   Reports   Settings      [User Avatar]     | <-- SITE NAV
+-------------------------------------------------------------+
|                                                             |
|  Project Settings (H1)                                      | <-- PAGE HEADER
|                                                             |
+-------------------------------------------------------------+
| [!] Trial ends in 2 days. [Upgrade Now]                     | <-- PAGE BANNER
+-------------------------------------------------------------+
|                                                             |
|  +-------------------------------------------------------+  |
|  | API Keys                                              |  |
|  |                                                       |  |
|  | [X] Max limit reached. [Upgrade Plan]                 |  | <-- INLINE ALERT
|  |                                                       |  |
|  | [ Generate New Key (Disabled) ]                       |  |
|  +-------------------------------------------------------+  |
|                                                             |
+-------------------------------------------------------------+
```

## Why this works

1.  **Hierarchy of Importance:** The maintenance banner is highest (Global),
    but the warning banner is most visually prominent (Color) because it's a
    growth driver.
2.  **Contextual Proximity:** The API error is right next to the action that
    caused it, so the user knows exactly why the button is disabled.
3.  **Distinct Visuals:** Different colors (Gray, Amber, Red) and icons
    immediately communicate the nature of the message before the user reads a
    single word.
