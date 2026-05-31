# Example: Status Badge vs Category Tag

## Scenario
A SaaS dashboard displays projects with:
- **Project Status** (e.g., Active, At Risk, Completed)
- **Project Category** (e.g., Finance, Marketing, Platform)

## Correct Component Mapping

- **Status** → Badge
- **Category** → Tag (removable when used as filters)

## UI Pattern

- Card header includes a status badge (filled semantic color):
  - Active → Green badge
  - At Risk → Amber badge
  - Completed → Gray/neutral badge
- Metadata row includes category tags (outlined or subtle fill):
  - Finance
  - Marketing
  - Platform

## Accessibility Notes

- Include icon + text for statuses with critical meaning (e.g., warning icon for “At Risk”).
- Ensure 4.5:1 contrast ratio for text in both badge and tag variants.
- Tags used for filtering should have visible focus states and an accessible `Remove tag: {name}` label if dismissible.

## Outcome

This separation prevents semantic confusion:
- Users scan status quickly via strong badges.
- Users navigate categories with interactive, lower-emphasis tags.
