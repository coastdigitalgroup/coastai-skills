---
name: banner-and-alert-system
description:
  Design and implement a systematic framework for non-overlay notifications,
  managing global announcements and contextual inline alerts to communicate
  system states without interrupting the user's flow.
---

# Banner and Alert System

## Purpose

The Banner and Alert System provides a methodology for designing non-persistent,
non-overlay communication layers. Unlike modals which stop the user, banners
and alerts provide critical information (status updates, warnings, or
announcements) while allowing the user to continue their current task. This
system ensures that notifications are visually distinct, appropriately
prioritized, and accessible.

## Use Cases

- Communicating site-wide announcements (e.g., "Scheduled maintenance in 2
  hours").
- Providing contextual feedback within a form (e.g., "Changes saved
  successfully").
- Warning users about account issues (e.g., "Subscription expires in 3 days").
- Notifying users of systemic errors that don't block the entire app but affect
  functionality (e.g., "Bank sync is currently unavailable").
- Displaying "Marketing Banners" for promotions or new feature launches.

## When NOT to Use

- **Critical Blocks:** If the user *must* take action before proceeding, use
  `overlay-and-dialog-system` (Modal).
- **Passive Feedback:** For short-lived, low-priority status updates (e.g., "Link
  copied"), use Toasts (see `overlay-and-dialog-system`).
- **Data Labels:** For simple status indicators on a single item, use
  `badge-and-tag-system`.
- **Navigation:** Do not use banners for primary or secondary navigation links;
  use `site-navigation-system`.

## Inputs

1. **Message Gravity:** Is this an Error, Warning, Success, or Info message?
2. **Scope:** Is this Global (site-wide) or Inline (specific to a section/page)?
3. **Dismissibility:** Can the user hide this message, or must it remain
   visible?
4. **Action Requirement:** Does the message require a follow-up action (e.g.,
   "Update Billing")?
5. **Brand Palette:** Standard colors for status states (Danger red, Warning
   amber, etc.).

## Outputs

1. **Alert Anatomy Spec:** Definition of the icon, text hierarchy, and action
   placement.
2. **Spatial Logic:** Rules for where banners appear (Top of viewport, Above
   content, or Inside a section).
3. **State Matrix:** Visual treatments for different message gravities.
4. **Accessibility Plan:** ARIA roles and focus management rules for
   interactive alerts.

## Workflow

### 1. Determine the Alert Level (Gravity)

Assign a state based on the intent:
- **Error (High Priority):** Critical issues that require attention but don't
  break the view.
- **Warning (Medium Priority):** Potential issues or upcoming deadlines.
- **Success (Low Priority):** Confirmation of a completed action.
- **Info/Announcement:** Neutral information or marketing updates.

### 2. Choose the Placement Pattern

- **Global Banner (Top-Bar):** Sits at the very top of the viewport. Best for
  high-priority, site-wide announcements.
- **Page Banner:** Sits below the global header but above page content. Best for
  page-specific notifications.
- **Inline Alert:** Sits directly within a section or next to a relevant
  component (e.g., inside a form). Best for contextual feedback.

### 3. Design the Component Anatomy

Each alert should follow a consistent internal hierarchy:
- **Icon:** A visual shorthand for the gravity (e.g., checkmark for success).
- **Title (Optional):** A bold heading for longer alerts.
- **Description:** The core message. Keep it concise.
- **Action:** A button or link for the next step.
- **Dismiss Trigger:** An 'X' button if the alert is non-critical.

### 4. Establish Interaction Rules

- **Persistence:** Determine if the alert disappears after an action, after a
  timeout (not recommended for banners), or only when manually dismissed.
- **Layout Shift Management:** Ensure that appearing banners don't cause
  jarring layout shifts (CLS). Use reserved space or smooth transitions.

### 5. Define Responsive Behavior

- **Stacking:** On mobile, actions should move below the text if they don't fit
  horizontally.
- **Width:** Global banners are full-width; inline alerts follow the container
  width.

## Decision Rules

- **The "One-at-a-Time" Rule:** Never stack more than two global banners. If you
  have multiple announcements, consolidate them into a single "Notification
  Center" or a slider.
- **Color + Icon:** Never rely on color alone to communicate the alert state.
  Always include an icon for accessibility.
- **Placement by Context:** If the alert is caused by a user action (e.g.,
  hitting "Save"), place the alert near the action point (Inline). If it's a
  system state, place it at the top (Global).
- **Dismissibility Logic:** Always allow users to dismiss "Info" and "Success"
  banners. "Error" and "Warning" banners should only be dismissed if the
  underlying issue is resolved.

## Constraints

- **Accessibility:** Use `role="alert"` for high-priority errors and
  `role="status"` for lower-priority updates. Ensure a 4.5:1 contrast ratio for
  text.
- **Typography:** Use a clear font size (min 14px) and avoid all-caps for long
  descriptions.
- **Mobile Reach:** Ensure dismiss buttons are at least 44x44px touch targets.

## Common Failure Patterns

- **The "Ignorable Error":** Using "Info" styling for a critical error, causing
  the user to miss important warnings.
- **Intrusive Marketing:** Using global banners for low-value promotions that
  annoy users and devalue the "Alert" space.
- **Missing Actions:** Telling a user something is wrong (e.g., "Payment failed")
  without providing a direct link to fix it.
- **Layout Thrashing:** Banners that "pop in" and push the entire page content
  down, causing users to misclick.

## Validation Criteria

- [ ] Every alert uses an icon and color combination that matches its gravity.
- [ ] Global banners are positioned at the top of the hierarchy.
- [ ] Inline alerts are placed in close proximity to their related content.
- [ ] All interactive elements (Close, CTA) meet touch target requirements.
- [ ] High-priority alerts use appropriate ARIA roles (`alert`).
- [ ] Dismissible banners remember their state (or have a logic for when to
      reappear).
