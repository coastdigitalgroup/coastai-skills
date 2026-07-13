# i18n & RTL Design Readiness Checklist

Use this checklist during the design phase or during a design audit to ensure your UI is ready for internationalization and Right-to-Left (RTL) support.

## 1. Spatial & Layout Readiness
- [ ] **Expansion Buffer:** Does every button, tag, and navigation item have at least 30-40% "white space" to accommodate longer translations?
- [ ] **Flexible Containers:** Are there any hard-coded pixel widths for text containers? (Change to `max-width` or `min-width`).
- [ ] **Logical Properties:** Are spacing and borders defined using "Start/End" logic rather than "Left/Right"?
- [ ] **Mirroring Map:** Has the layout been visually flipped (Sidebar, Logo, Columns) to verify hierarchy in RTL?
- [ ] **Grid Stability:** Does the `responsive-grid-system` remain balanced when columns are reordered?

## 2. Typography & Content
- [ ] **Script Legibility:** Are line heights (leading) increased for complex scripts like Arabic or Devanagari?
- [ ] **Fallback Verification:** Are there specified fallbacks for non-Latin characters to prevent "tofu" boxes?
- [ ] **Dynamic Alignment:** Does text alignment automatically switch to `right` for RTL languages?
- [ ] **Capitalization:** Does the design rely on `text-transform: uppercase`? (Note: Many scripts like Arabic, Chinese, and Hindi do not have capital letters).
- [ ] **Emphasis Styles:** Does the design rely on `italic`? (Note: Italics are often illegible or non-existent in scripts like Arabic or CJK; use `bold` or color shifts instead).

## 3. Iconography & Visuals
- [ ] **Directional Audit:** Have all directional icons (arrows, planes, progress bars) been marked for mirroring?
- [ ] **Fixed Icon Audit:** Have technical/universal icons (Play, Clocks, Checks) been marked to *remain fixed*?
- [ ] **Text in Images:** Are there any flattened images containing text? (These must be replaced with live text or localized assets).
- [ ] **Cultural Neutrality:** Have symbols like piggy banks (finance), mailboxes (contact), or hand gestures been reviewed for cultural appropriateness?

## 4. Interaction & Data
- [ ] **Form Inputs:** Do form labels and placeholder text align to the "Start" (Right for RTL)?
- [ ] **Data Formats:** Are date, currency, and number placements (e.g., $ before vs. € after) accounted for?
- [ ] **Calendar Logic:** Does the date picker allow for different start-of-week settings (Monday vs. Sunday)?
- [ ] **Error Messaging:** Do error banners and tooltips appear in the correct directional context relative to the input?

## 5. Mobile & Responsive
- [ ] **Touch Targets:** Are mirrored navigation buttons (like "Back") large enough (44x44px) and in the correct "Thumb Zone" for RTL users?
- [ ] **Horizontal Scroll:** If breadcrumbs or tabs overflow, do they scroll towards the "End" of the line?
