---
name: consent-and-preference-system
description:
  Design and implement a systematic framework for user privacy, managing
  consent banners, preference centers, and persistent privacy controls to
  balance legal compliance with user trust.
---

# Consent and Preference System

## Purpose

The Consent and Preference System provides a methodology for designing the visual
and structural framework of user privacy management. It ensures that privacy
notices, cookie banners, and granular preference controls are integrated into
the website experience in a way that is legally compliant (GDPR, CCPA),
accessible, and high-trust. This system prevents "consent fatigue" by
organizing information into clear hierarchies and providing intuitive controls
for data sharing.

## Use Cases

- **Initial Consent Banners:** Designing the first-touch overlay or bar that
  notifies users of cookie usage.
- **Granular Preference Centers:** Creating modals or pages where users can
  toggle specific data categories (Analytics, Marketing, etc.).
- **Persistent Privacy Triggers:** Implementing subtle "Privacy Settings"
  triggers that remain accessible after the initial choice.
- **Regulatory Adaptation:** Standardizing the design to meet varying
  requirements across different regions (e.g., "Reject All" button requirements).
- **Communication Preferences:** Designing the UI for managing newsletter or
  marketing notification opt-ins.

## When NOT to Use

- **Internal Data Governance:** This skill handles the UI/UX layer; it does not
  manage the backend data architecture or legal policy writing.
- **Generic Banners:** For simple announcements like sales or maintenance, use
  `banner-and-alert-system`.
- **System Settings:** For purely functional app settings (e.g., Theme,
  Language) without privacy implications, use `site-navigation-system` or
  dedicated settings views.

## Inputs

1. **Regulatory Requirements:** Which laws apply (GDPR, CCPA/CPRA, DMA)?
2. **Data Categories:** A list of all data-gathering tools (Necessary,
   Functional, Analytics, Marketing/Targeting).
3. **Brand Voice:** The intended tone for privacy communication (e.g.,
   Transparent, Minimalist, Reassuring).
4. **Layout Context:** Where the banner should sit (Bottom Bar, Floating Box,
   Full-screen Modal).
5. **Browser Signals:** Whether the site must detect and honor Global Privacy
   Control (GPC) or "Do Not Track" signals as a valid opt-out.

## Outputs

1. **Consent Anatomy Spec:** Definition of the banner/modal regions (Heading,
   Description, Toggles, Actions).
2. **State Matrix:** Visual specs for Pending, Accepted, Rejected, and Focused
   states.
3. **Preference Center Blueprint:** A structural map for granular category
   management.
4. **Interaction Spec:** Rules for backdrop behavior, "Reject All" prominence,
   and persistent trigger placement.

## Workflow

### 1. Categorize the Consent Level

Determine the required level of interruption based on legal and UX goals:
- **Level 1 (Implicit/Info):** A subtle bar that doesn't block interaction.
  Best for low-risk regions or non-tracking sites.
- **Level 2 (Active/Modal):** A floating box or modal that requires a choice
  before or during navigation. Best for GDPR/CCPA compliance.
- **Level 3 (Hard Gate):** A full-screen overlay that prevents any access until
  a choice is made. Only for extreme compliance or age-verification scenarios.

### 2. Choose the Spatial Pattern

- **The Bottom Bar:** Spans the full width at the bottom. Low interruption,
  familiar pattern.
- **The Floating Box:** Usually bottom-left or bottom-right. Less obstructive
  to main content but highly visible.
- **The Preference Modal:** A centered overlay for granular choices. Triggers
  from a "Manage Preferences" button.

### 3. Establish Information Hierarchy

Avoid "Wall of Legalese" fatigue:
- **Heading:** Clear and honest (e.g., "Your Privacy Choices").
- **Primary Description:** 1-2 punchy sentences explaining *why* data is
  collected and the user's rights.
- **Category Labels:** High-level buckets (e.g., "Personalization,"
  "Advertising") with expandable "Learn More" details.

### 4. Design the Action Priority

Follow "Equal Prominence" rules where required:
- **Primary Actions:** "Accept All" and "Reject All" (or "Confirm Choices") should
  ideally have similar visual weight to avoid "Dark Patterns."
- **Secondary Action:** "Manage Preferences" or "Cookie Settings" link to the
  granular view.
- **The Escape Hatch:** Ensure users can easily find the "Close" or "Dismiss"
  if implicit consent is used.

### 5. Define the Persistent Trigger

Consent is a dynamic state; users must be able to change their mind:
- **The "Privacy Shield" Icon:** A small, persistent floating icon (usually
  bottom-left) that re-opens the preference center.
- **Footer Link:** A dedicated "Cookie Settings" link in the `site-footer-system`.

### 6. Respect Browser-Level Opt-Out Signals

For jurisdictions that recognize automated opt-out mechanisms (e.g., CCPA/CPRA
recognition of Global Privacy Control):
- **Detect and Apply:** If a GPC signal is present, treat it as a valid
  "Reject" or "opt-out of sale/sharing" signal and reflect that state in the
  preference center without requiring the user to re-toggle it manually.
- **No Re-Prompting:** Do not re-show the initial banner solely to ask the user
  to override a GPC signal they already sent.
- **Transparency:** Surface the detected signal in the preference center (e.g.,
  "We detected a Global Privacy Control signal and have applied your
  opt-out") so the state is not silently applied.

## Decision Rules

- **The "Equal Weight" Rule:** If your region requires "Reject All" (like the EU),
  the button must be as easy to find and click as "Accept All." Avoid making
  the "Reject" button a tiny text link while "Accept" is a large blue button.
- **The "No Pre-checked" Rule:** All non-essential (Analytics, Marketing)
  toggles must be OFF by default for GDPR compliance.
- **The "Clear Language" Rule:** Avoid technical jargon. Use "Improve our site"
  instead of "Process pixel-based telemetry."
- **Layered Disclosure:** Keep the initial banner simple. Move the 20-paragraph
  policy list into the Preference Center or a dedicated Privacy Policy page.
- **The "Honor the Signal" Rule:** A detected GPC opt-out takes precedence over
  a stale local "accept all" cookie; do not let a cached consent record
  override a fresh browser-level opt-out signal.

## Constraints

- **Accessibility:** Banners must be reachable via keyboard. Preference modals
  must trap focus, and the focus indicator must remain visible and unobscured
  while trapped (WCAG 2.2 SC 2.4.11). All toggles must have clear ARIA labels
  and meet the 24x24px minimum target size (SC 2.5.8).
- **Contrast:** Button text and toggles must meet WCAG AA (4.5:1) contrast.
- **Responsiveness:** Banners must never overlap primary mobile navigation
  (like a bottom nav bar). Switch to a full-screen drawer if a floating box is
  too cramped.

## Common Failure Patterns

- **The "Dark Pattern" Trap:** Making it impossible to find the "Reject" button
  to force user consent.
- **Interference with Nav:** Placing a bottom banner that covers the site's
  mobile menu or primary CTA.
- **Z-Index Wars:** The banner appearing *under* other overlays or menus,
  rendering it unclickable.
- **The "Checklist of 50":** Forcing users to toggle 50 individual vendors
  rather than high-level categories.
- **Broken Escape:** Not allowing users to change their preferences once the
  banner is closed.

## Validation Criteria

- [ ] "Accept All" and "Reject All" have appropriate visual prominence for the
      target region.
- [ ] Non-essential categories are toggled OFF by default (for strict compliance).
- [ ] A persistent trigger (icon or footer link) allows users to re-open settings.
- [ ] Information is layered (Simple Banner -> Detailed Preference Center).
- [ ] Toggles and buttons meet WCAG 2.2 SC 2.5.8 (24x24px minimum touch target).
- [ ] Accessibility: Focus management is handled for preference modals, and
      focus indicators are never obscured (WCAG 2.2 SC 2.4.11).
- [ ] Contrast ratios for all text and interactive states meet WCAG AA.
- [ ] Global Privacy Control (or equivalent) signals are detected and honored
      without re-prompting the user.
