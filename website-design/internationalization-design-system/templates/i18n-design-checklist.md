# I18n Design Readiness Checklist

Use this checklist during the design phase to ensure your interface is
prepared for internationalization (i18n).

## 1. Spatial & Layout Integrity
- [ ] **Directionality:** Does the layout mirror correctly for RTL? (Check
      Sidebars, Headers, Footers).
- [ ] **Expansion Buffer:** Do buttons and cards have enough whitespace to
      handle 30% text expansion?
- [ ] **Flexible Containers:** Are you avoiding fixed widths/heights that might
      clip translated text?
- [ ] **Logical Properties:** Are you thinking in "Start/End" rather than
      "Left/Right"?
- [ ] **Z-Index Stability:** Does mirroring the layout create any unexpected
      overlapping or stacking context issues?

## 2. Typography & Scripts
- [ ] **Font Support:** Do your brand fonts support the character sets for all
      target locales (e.g., Extended Latin, Cyrillic, Arabic)?
- [ ] **Vertical Rhythm:** Have you increased `line-height` for scripts with
      complex vertical strokes (Arabic, Thai, Hindi)?
- [ ] **Size Adjustments:** Have you accounted for scripts that become
      illegible at small sizes (CJK scripts usually need min 12–14px)?
- [ ] **Baseline Alignment:** Are mixed-script labels (e.g., "Login (ログイン)")
      optically balanced?

## 3. Iconography
- [ ] **Directional Icons:** Have you identified icons that need to flip (Back
      arrows, Forward arrows, Pencils)?
- [ ] **Universal Icons:** Have you ensured that non-flippable icons (Search,
      Play, Settings) remain static?
- [ ] **Cultural Nuance:** Are icons universally understood? (e.g., avoid mailboxes
      that look like US-only hardware).

## 4. Numbers & Data
- [ ] **Delimiters:** Are you prepared to display decimal points and thousands
      separators correctly (e.g., `1.234,56` vs `1,234.56`)?
- [ ] **Date Formats:** Is the layout flexible enough to handle `DD/MM/YYYY`,
      `MM/DD/YYYY`, and `YYYY/MM/DD`?
- [ ] **Currency Symbols:** Is there space for currency symbols that appear
      before ($), after (€), or with a space (Rp ) between the number?

## 5. Forms & Interaction
- [ ] **Label Alignment:** Do labels stay correctly aligned to the "Start" of
      the input in RTL?
- [ ] **Submit Buttons:** Is the primary action consistently placed at the
      "Conclusion" of the visual scan?
- [ ] **Error Messages:** Do errors appear near the "Start" of the input?
- [ ] **Focus Order:** Does the keyboard Tab order match the visual reading
      path for the locale?
