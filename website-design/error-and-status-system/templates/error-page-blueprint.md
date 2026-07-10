# Error Page Anatomy Spec

Use this template to structure full-page error states (404, 500, 403).

## 1. Structural Zones

| Zone | Priority | Content Requirement |
| :--- | :--- | :--- |
| **Visual Anchor** | Medium | Non-semantic illustration or large icon. |
| **Messaging Core** | High | H1 (Headline) + Paragraph (Instruction). |
| **Primary Action** | High | The "One Way Out" (Home or Refresh). |
| **Search/Discovery** | Medium | Search bar or Top 3-5 links (Required for 404). |
| **Utility/Support** | Low | Link to Help Center or Status Page. |
| **Tech Metadata** | Hidden/Low | Error ID or Status Code for support triage. |

## 2. Component Annotations

- **Headline:** Avoid "Error 404". Use "Page Not Found".
- **Description:** Explain *why* (concisely) and *how to fix* (actionably).
- **Search Bar:** Must be the focal point if the page is a 404.
- **Back Button:** Primary brand button style.
- **Home Button:** Sits in the site header (standard nav).

## 3. Responsive Stacking Rules

- **Desktop (>1024px):** Centered column or 2-column (Visual left, Text right).
- **Tablet (768px-1024px):** Centered column.
- **Mobile (<768px):** Centered column. Increase vertical spacing between
  actions for better thumb targets (44x44px).

## 4. Accessibility Check-list

- [ ] Headline is an `<h1>`.
- [ ] Page `<title>` includes the error (e.g., "Page Not Found | BrandName").
- [ ] Search input has a visible `<label>` or `aria-label`.
- [ ] Technical metadata is marked as low-emphasis (muted color).
- [ ] Global navigation and footer remain accessible for wayfinding.
