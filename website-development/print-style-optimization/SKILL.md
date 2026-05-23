---
name: print-style-optimization
description:
  Implement and debug CSS print styles to ensure web content is legible,
  professional, and resource-efficient when printed or saved as PDF.
---

# Print Style Optimization

## Purpose

The Print Style Optimization skill ensures that web pages are transformed into
clean, readable documents when printed. It focuses on removing non-essential UI
elements (navigation, ads, footers), managing page breaks, ensuring high text
contrast, and handling URL visibility for printed links.

## Use Cases

- Optimizing articles, reports, or invoices for "Print to PDF" or physical printing.
- Fixing "orphans" and "widows" where single lines of text appear at the top or bottom of a page.
- Removing interactive elements (videos, maps, buttons) that are useless on paper.
- Ensuring background colors and images are handled correctly (or removed to save ink).
- Displaying full URLs next to links so the destination is known in a printed format.

## When NOT to Use

- **Web-Only Applications:** Dashboards or interactive tools that have no meaningful static representation.
- **Graphic Design/Publishing:** If precise, pixel-perfect print layout is required, dedicated tools (like InDesign or specialized PDF generation libraries) are often better than CSS.
- **Single-Page Proofs of Concept:** Where printability is not a requirement.

## Inputs

1. **Target Content:** The specific sections of the page that should be preserved in print.
2. **Branding Requirements:** Whether logos or specific brand colors must be maintained.
3. **Typography Specs:** Preferred font sizes and line heights for reading on paper.

## Outputs

1. **Print Stylesheet:** A `@media print` block or separate CSS file.
2. **Reset Styles:** CSS to strip browser-default margins and headers/footers if possible.
3. **Layout Overrides:** Grid/Flexbox adjustments to flatten layouts for paper.

## Workflow

### 1. Identify Essential Content

- Determine what the user actually wants to print (e.g., the article body).
- Identify elements to hide: `nav`, `footer`, `sidebar`, `ad-units`, `buttons`.

### 2. Apply Print Reset

- Set background colors to white and text to black for maximum legibility and ink savings.
- Use `color-adjust: exact` or `print-color-adjust: exact` only if background colors are critical (e.g., a color-coded chart).
- Reset margins and widths to use the full page width.

### 3. Handle Hyperlinks

- Web links are useless on paper unless the URL is visible.
- Use CSS `::after` content to append the `href` attribute to links.

### 4. Manage Page Breaks

- Use `break-inside: avoid` on elements that shouldn't be split across pages (like images, tables, or blockquotes).
- Use `break-before` or `break-after` to force sections to start on new pages.
- Set `orphans` and `widows` properties to ensure at least 2-3 lines of text stay together.

### 5. Flatten Layouts

- Remove complex multi-column layouts (Grid/Flexbox) that don't translate well to standard paper sizes.
- Ensure images don't exceed the page width (`max-width: 100%`).

### 6. Optimize Typography

- Switch to serif fonts if appropriate (often preferred for long-form print).
- Adjust font sizes to a comfortable "pt" (point) size (e.g., 12pt for body text).

## Decision Rules

- **Hide vs. Show:** If an element requires user interaction (hover, click, scroll), hide it. If it provides context (logo, title, timestamp), show it.
- **Color vs. Grayscale:** Default to grayscale/ink-saving mode. Only preserve color for data-visualization or critical branding.
- **Inline vs. External:** Place print styles at the end of your main CSS using `@media print` for easier maintenance and fewer network requests.

## Constraints

- **Browser Variation:** Different browsers (Chrome vs. Safari vs. Firefox) and operating systems handle print dialogs and headers/footers differently.
- **No Backgrounds by Default:** Most browsers disable "Print Background Graphics" by default; don't rely on background colors for meaning.
- **Fixed Dimensions:** Paper has fixed sizes (A4, Letter); layouts must be flexible enough to handle slight variations in width.

## Non-Goals

- Creating a custom print preview UI within the browser.
- Generating PDFs on the server-side.
- Controlling printer-specific settings like duplexing or tray selection.

## Common Failure Patterns

- **Printing the Header/Nav:** Wasting half the first page on a navigation menu that doesn't work on paper.
- **Cut-off Content:** Using `overflow: hidden` on a container, which causes content to be truncated rather than flowing to the next page.
- **Floating Elements:** Leaving "Sticky" headers or "Back to top" buttons visible, which often overlap content on every printed page.
- **Broken Tables:** Allowing tables to break awkwardly, leaving headers on one page and data on another.

## Validation Steps

- [ ] **Print Preview Test:** Use the browser's "Print..." command to inspect the layout in the preview window.
- [ ] **Link Check:** Verify that important URLs are visible next to their text labels.
- [ ] **Break Check:** Ensure no images or headings are "orphaned" at the bottom of a page.
- [ ] **Ink-Saver Test:** Check that unnecessary backgrounds are removed and text is high-contrast.
- [ ] **PDF Export:** Save as PDF and verify that the file metadata and internal links work as expected.
