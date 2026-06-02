# Example: Documentation Hierarchy

This example shows how the Breadcrumb and Wayfinding System is applied to a deep
documentation site for a technical product.

## Context
- **Site:** API Developer Portal
- **Page:** "Authenticating with OAuth2"
- **Depth:** 4 levels deep

## Breadcrumb Implementation

### Desktop View (Full Trail)
`Home > Documentation > Security Guide > Authenticating with OAuth2`

**Analysis:**
1. **Home:** The root anchor.
2. **Documentation:** The primary section.
3. **Security Guide:** The contextual parent.
4. **Authenticating with OAuth2:** The current node (Plain text, H1-related).

### Mobile View (Parent Link Pattern)
`<- Back to Security Guide`

**Analysis:**
- Replaces the full trail to maximize vertical space for the H1 and content.
- Provides the most likely next step for a user wanting to "go up" a level.

### Visual Spec (Annotated)
- **Separators:** `/` (Forward slash) used for a clean, technical feel.
- **Color:** Links are Brand Blue (#0055CC); Separators are Muted Gray (#666666).
- **Spacing:** `--space-xs` (8px) between each element.
- **Font Size:** 0.875rem (14px) to remain secondary to the H1.

## Accessibility Mapping
```html
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <span aria-hidden="true">/</span>
    <li><a href="/docs">Documentation</a></li>
    <span aria-hidden="true">/</span>
    <li><a href="/docs/security">Security Guide</a></li>
    <span aria-hidden="true">/</span>
    <li><span aria-current="page">Authenticating with OAuth2</span></li>
  </ol>
</nav>
```
