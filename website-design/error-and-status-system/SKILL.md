---
name: error-and-status-system
description:
  Design a systematic framework for site-level error states and system statuses
  (404, 500, Maintenance, Offline) to maintain user trust and provide clear
  recovery paths.
---

# Error and Status System

## Purpose

The Error and Status System provides a methodology for designing the "unhappy
paths" of a website—the moments when something goes wrong at a system level.
Unlike form-level validation or contextual banners, this system handles
full-page or site-wide states. It ensures that failures are communicated with
clarity, empathy, and a clear "way out," preventing user frustration and
abandonment during technical issues.

## Use Cases

- **404 Not Found:** When a user navigates to a URL that doesn't exist.
- **500 Server Error:** When a critical backend failure prevents a page from
  loading.
- **Maintenance Mode:** When a site is intentionally taken offline for updates.
- **Offline States:** When a user loses connectivity in a web application.
- **Access Denied (403):** When a user lacks permission to view a specific
  resource.

## When NOT to Use

- **Form Validation:** Use `form-design-system` for field-level errors.
- **Contextual Notifications:** Use `banner-and-alert-system` for non-blocking
  updates or minor errors.
- **Empty Lists:** Use `empty-state-system` when a page loads correctly but
  contains no data.
- **Loading States:** Use `skeleton-state-system` for standard content
  fetching.

## Inputs

1. **Error Type:** Is it a client error (4xx), server error (5xx), or system
   state (Maintenance)?
2. **Technical Context:** Can the system explain *why* it failed without
   leaking sensitive data?
3. **Recovery Paths:** What are the most likely next steps for the user?
4. **Brand Tone:** Is the brand voice humorous, professional, or strictly
   technical?
5. **System Constraints:** Does the offline state need to support specific
   local-first actions?

## Outputs

1. **Status Page Anatomy:** A defined layout for the error message, visual
   anchor, and recovery actions.
2. **Messaging Hierarchy:** Standards for the headline (what happened) and
   description (what to do next).
3. **Recovery Blueprint:** A map of links, search inputs, or help resources
   tailored to the specific error.
4. **Offline UI Spec:** Rules for how the interface changes when connectivity
   is lost.

## Workflow

### 1. Categorize the Failure Gravity

Determine the impact of the error:
- **Low (404/403):** Localized to one URL. The site is healthy. Focus on
  **Redirection**.
- **High (500):** System-wide or page-breaking. The site is struggling. Focus
  on **Reassurance** and **Support**.
- **Systemic (Maintenance):** Intentional downtime. Focus on **Expectation
  Management** (e.g., "Back at 2 PM").
- **Connectivity (Offline):** Environmental failure. Focus on **State
  Preservation** (e.g., "Changes saved locally").

### 2. Establish the Recovery Path

Every error page must have a "Way Out":
- **The "Home" Button:** The absolute minimum requirement.
- **Smart Suggestions:** For 404s, provide links to popular pages or a search
  bar.
- **The "Refresh" Trigger:** For 5xx errors, provide a prominent way to retry
  the request.
- **Support Links:** For persistent issues, provide a direct path to a help
  center or status page.

### 3. Design the Visual Anatomy

Apply `visual-hierarchy-system` to the error view:
- **Visual Anchor:** Use a brand-aligned illustration or icon to soften the
  impact of the failure.
- **Clear Headline:** Use a "human" headline (e.g., "We can't find that page")
  instead of just the status code ("404 Error").
- **Subtle Metadata:** Keep technical codes (e.g., `Error ID: 12345`) small and
  low-contrast, intended for support teams rather than the user.

### 4. Apply the "Human First" Messaging Rule

Avoid technical jargon that alienates users:
- **Bad:** "500 Internal Server Error: Connection reset by peer."
- **Good:** "Something went wrong on our end. We're working on fixing it now."
- **Bad:** "404 Resource not located."
- **Good:** "Looks like this page took a wrong turn."

### 5. Plan for Responsive Adaptation

- **Full-Page vs. Modal:** Decide if the error should take over the whole
  viewport (standard for 404/500) or appear as a fixed banner (common for
  Offline states).
- **Centered Layout:** Centering content is often best for error pages as it
  minimizes scanning effort and emphasizes the "Pause" in the user journey.

## Decision Rules

- **The "Direct Path" Rule:** Never let an error page be a dead end. If there
  are no specific suggestions, always include a "Back to Home" and "Search"
  option.
- **Search-on-404:** If a site has >100 pages, the 404 page MUST include a
  search bar.
- **Maintenance Transparency:** If in maintenance mode, always provide an
  estimated time of return or a link to a status page.
- **Offline Persistence:** When offline, visually "gray out" or disable
  non-functional actions (e.g., "Submit" buttons) to prevent data loss.

## Constraints

- **Accessibility:** Error pages must maintain the site's global navigation
  and footer (where possible) to provide familiar wayfinding. For dynamic
  status changes (like going offline), use an `aria-live="assertive"` region
  to announce the change immediately.
- **Responsiveness:** Error pages must be as resilient as possible. Avoid
  heavy assets that might fail to load if the system is already struggling.
- **Branding:** Error pages should look like part of the site, not a generic
  browser or server default page.

## Common Failure Patterns

- **The "Dead End":** A 404 page with no links, forcing the user to use the
  browser's back button or leave.
- **The "Jargon Wall":** Displaying raw stack traces or database errors that
  confuse users and potentially leak security info.
- **The "Blame Game":** Messaging that implies the user did something wrong
  (e.g., "You entered an invalid URL") instead of taking responsibility for
  the discovery failure.
- **Style Mismatch:** An error page that uses different fonts/colors than the
  rest of the site, making it look broken or malicious.

## Validation Criteria

- [ ] Every error state (404, 500, etc.) has a clear, human-readable headline.
- [ ] At least one primary recovery action (e.g., "Back to Home") is present.
- [ ] For 404 pages, a search bar or popular links are provided for discovery.
- [ ] Technical metadata (Error IDs) is present but subordinated in hierarchy.
- [ ] Connectivity shifts (Offline) are announced via ARIA live regions.
- [ ] Visual styling remains consistent with the core brand/design system.
- [ ] Maintenance pages provide an "Expected Return" or "Status Page" link.
