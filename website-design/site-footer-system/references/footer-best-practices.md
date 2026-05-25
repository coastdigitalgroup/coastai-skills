# Footer Best Practices & Checklist

A high-performance footer is more than a list of links; it's a critical piece of
user orientation and trust-building. Use this reference to audit your design.

## Accessibility Checklist (WCAG 2.1/2.2 AA)

- [ ] **Landmarks:** Section is wrapped in `<footer>` or `role="contentinfo"`.
- [ ] **Navigation Roles:** Link clusters are wrapped in `<nav>` elements.
- [ ] **Labels:** Every `<nav>` has a unique `aria-label` or `aria-labelledby`.
- [ ] **Contrast:** All text (including small utility links) meets 4.5:1 ratio.
- [ ] **Focus States:** Every link and button has a visible focus indicator.
- [ ] **Form Labels:** Newsletter inputs have explicit, visible labels.
- [ ] **Icon Labels:** Social icons have `aria-hidden="true"` on the SVG and a
      visually hidden `<span class="sr-only">` label for screen readers.

## SEO & Information Architecture

- [ ] **Hierarchy:** Primary links are in the Header; secondary/deep links are
      in the Footer.
- [ ] **No Hidden Links:** All links are visible and indexable by search engines.
- [ ] **Consistent Labels:** Footer link text matches the H1/Title of the target
      page.
- [ ] **Nofollow Rule:** Use `rel="nofollow"` for non-critical external links if
      needed, but keep internal links "follow."

## UX & Content MUST-HAVES

- [ ] **Copyright Date:** Current year (automate this via JS if possible).
- [ ] **Privacy Policy:** Mandatory in almost all jurisdictions.
- [ ] **Contact Path:** Phone, Email, or "Contact Us" link.
- [ ] **Physical Address:** Increases trust and SEO for local businesses.
- [ ] **Social Proof:** Logos or trust badges (optional but recommended).

## Standard Footer Spacing Scale

| Zone | Padding (Top/Bottom) | Gutter (Between Columns) |
| :--- | :--- | :--- |
| **Fat Footer** | 64px - 96px | 32px |
| **Slim Footer** | 24px - 40px | 16px |
| **Utility Bar** | 16px - 32px | N/A |

## Common Footer Decision Tree

1. **Does the site have > 15 pages?**
   - Yes: Use **Fat Footer** (3-5 columns).
   - No: Use **Slim Footer** (1-2 columns or a single row).

2. **Is conversion the primary goal of the page?**
   - Yes: Use **Minimal Footer** (Legal links only) to reduce distraction.
   - No: Use **Full Footer** to encourage exploration.

3. **Is the page long-form content?**
   - Yes: Add a **"Back to Top"** link in the footer.
   - No: Standard footer is sufficient.
