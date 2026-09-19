# Product Variant Selection Audit Checklist & Optimization Template

A comprehensive diagnostic template for auditing e-commerce product variant selection interfaces across mobile and desktop PDPs. Use this checklist to identify choice friction, eliminate out-of-stock dead ends, clarify variable pricing, and maximize Add-to-Cart conversion rates.

---

## Audit Metadata

- **Store Name / URL:** _____________________________________
- **Product Category / Page audited:** _____________________________________
- **Auditor Name:** _____________________________________
- **Date:** ___________________
- **Device Viewports Tested:** [ ] Mobile Safari (iOS)  [ ] Mobile Chrome (Android)  [ ] Desktop Chrome

---

## Section 1: Selector Component Architecture & Visual Layout

Evaluate whether option selector controls match human visual processing capabilities and screen real estate constraints.

| Item | Diagnostic Requirement | Status | Severity | Remediation Notes |
| :--- | :--- | :---: | :---: | :--- |
| **1.1** | **No Dropdown Overload:** Options with 1 to 5 choices use visual swatches or pill chips rather than hidden native `<select>` dropdowns. | `[ ] Pass / [ ] Fail` | High | Convert 1-5 item dropdowns to horizontal pill chips or visual swatches. |
| **1.2** | **Swatch Image Quality:** Color/material swatches use high-definition visual textures (min 32x32px) rather than flat, inaccurate hex codes. | `[ ] Pass / [ ] Fail` | Medium | Replace hex colors with real product texture preview images. |
| **1.3** | **Dynamic Labeling:** The exact selected option name is dynamically displayed in text above the selector (e.g., `Color: Midnight Navy`). | `[ ] Pass / [ ] Fail` | High | Add dynamic text label updating on swatch hover/focus/selection. |
| **1.4** | **Standardized Option Order:** Size and capacity options follow logical, standardized progression (e.g., XS -> S -> M -> L -> XL; 64GB -> 128GB -> 256GB). | `[ ] Pass / [ ] Fail` | Medium | Sort array parameters logically before rendering option lists. |
| **1.5** | **Multi-Pack / Bundle Cards:** Quantity bundle options show total price, unit price, and savings badge (e.g., `3 Pack - $45 (Save 25%)`). | `[ ] Pass / [ ] Fail` | High | Render bundle options as distinct cards with explicit savings math. |

---

## Section 2: Out-of-Stock (OOS) & Matrix State Management

Verify that out-of-stock and invalid variant combinations do not cause dead-end user interactions.

| Item | Diagnostic Requirement | Status | Severity | Remediation Notes |
| :--- | :--- | :---: | :---: | :--- |
| **2.1** | **Visible OOS States:** Unavailable variant options remain visible on page (never hidden) with slashed + dimmed visual treatment. | `[ ] Pass / [ ] Fail` | Critical | Apply 40% opacity and diagonal line overlay to out-of-stock options. |
| **2.2** | **Clickable OOS Handling:** Tapping an out-of-stock option reveals explanation and alternative paths rather than freezing the button. | `[ ] Pass / [ ] Fail` | High | Maintain button clickability and open back-in-stock notification drawer. |
| **2.3** | **Inline Back-in-Stock Capture:** Out-of-stock selection morphs primary CTA into "Notify Me When Available" email/SMS input form. | `[ ] Pass / [ ] Fail` | Critical | Integrate instant back-in-stock capture drawer on OOS selection. |
| **2.4** | **In-Stock Alternative Suggestions:** When a selected combination is out-of-stock, in-stock color/size alternatives are suggested inline. | `[ ] Pass / [ ] Fail` | Medium | Render helper text: "Size M out of stock in Navy. Available in Charcoal." |
| **2.5** | **Smart Default Variant:** PDP defaults to a popular, fully in-stock variant combination on initial page load. | `[ ] Pass / [ ] Fail` | High | Ensure default URL/page state resolves to an in-stock SKU. |

---

## Section 3: Price Surcharges & Differential Transparency

Ensure all pricing variations are completely transparent prior to user interaction.

| Item | Diagnostic Requirement | Status | Severity | Remediation Notes |
| :--- | :--- | :---: | :---: | :--- |
| **3.1** | **Upfront Surcharge Badging:** Options that incur extra cost display `+$X` directly on the unselected option control prior to click. | `[ ] Pass / [ ] Fail` | Critical | Add upfront delta badges (e.g., `[ 512GB - +$150 ]`). |
| **3.2** | **Synchronized Price Update:** Selecting a premium variant instantly updates the main price display without delay or layout shift. | `[ ] Pass / [ ] Fail` | High | Bind variant selection state directly to buy-box price component. |
| **3.3** | **Savings & Strike-through Math:** Discounted or bundled variants display original slashed price alongside calculated savings percentage. | `[ ] Pass / [ ] Fail` | Medium | Render original price with `<del>` tag and show calculated `% off` badge. |
| **3.4** | **Cart Drawer Price Parity:** Selected variant price in cart drawer matches the exact price displayed on PDP buy-box. | `[ ] Pass / [ ] Fail` | Critical | Verify backend line-item pricing matches client-side calculation. |

---

## Section 4: Media Gallery & Visual Feedback Sync

Confirm that selecting product variants updates all corresponding photography and visual assets.

| Item | Diagnostic Requirement | Status | Severity | Remediation Notes |
| :--- | :--- | :---: | :---: | :--- |
| **4.1** | **1-to-1 Color Gallery Filter:** Selecting a color variant filters the main image gallery to display photos of that exact color. | `[ ] Pass / [ ] Fail` | Critical | Link image gallery tags to variant color attribute IDs. |
| **4.2** | **Fast Hero Photo Swap:** Main hero photo updates within 100ms of variant swatch selection without full page reload. | `[ ] Pass / [ ] Fail` | High | Preload main variant hero images or use client-side image cache. |
| **4.3** | **Selected Swatch Elevation:** Active variant swatch features a high-contrast border (min 2px), checkmark icon, or shadow ring. | `[ ] Pass / [ ] Fail` | High | Ensure active swatch state passes WCAG 2.1 AA 3:1 contrast ratio. |
| **4.4** | **Thumbnail Auto-Scroll:** Selecting a variant automatically scrolls thumbnail strip to show the primary shot of that variant. | `[ ] Pass / [ ] Fail` | Medium | Trigger `scrollIntoView()` on corresponding thumbnail element. |

---

## Section 5: Mobile Usability, Touch Targets & Navigation

Verify touch ergonomics and responsive layout behavior on mobile screen viewports.

| Item | Diagnostic Requirement | Status | Severity | Remediation Notes |
| :--- | :--- | :---: | :---: | :--- |
| **5.1** | **44x44px Touch Targets:** All swatch, chip, and dropdown touch targets meet minimum 44x44px dimensions with 8px spacing. | `[ ] Pass / [ ] Fail` | Critical | Expand hit area padding on touch controls (`min-height: 44px`). |
| **5.2** | **Thumb-Zone Accessibility:** Variant controls on mobile are located within natural thumb reach without obscuring the CTA button. | `[ ] Pass / [ ] Fail` | High | Stack variant selectors above sticky bottom buy-box on mobile. |
| **5.3** | **No Horizontal Page Overflow:** Variant rows flex/wrap cleanly on narrow mobile viewports (320px–375px) without horizontal scrolling. | `[ ] Pass / [ ] Fail` | Critical | Set `flex-wrap: wrap` or grid layout on variant container rows. |
| **5.4** | **Sticky CTA Variant Context:** Sticky mobile buy-box displays currently selected variant summary (e.g., `Add to Cart - Navy / M`). | `[ ] Pass / [ ] Fail` | High | Bind sticky CTA sub-label to selected variant state object. |

---

## Section 6: URL State, Deep Linking & Accessibility

Ensure technical robustness, shareability, and screen reader compliance.

| Item | Diagnostic Requirement | Status | Severity | Remediation Notes |
| :--- | :--- | :---: | :---: | :--- |
| **6.1** | **URL Parameter Sync:** Selecting options updates browser URL (`?variant=ID` or `?color=navy&size=L`) via `history.replaceState()`. | `[ ] Pass / [ ] Fail` | High | Implement clean query string synchronization on selection change. |
| **6.2** | **Deep-Link State Restoration:** Navigating directly to a parameterized URL automatically pre-selects the exact options and images. | `[ ] Pass / [ ] Fail` | Critical | Parse URL query parameters on initial page script initialization. |
| **6.3** | **Keyboard Navigation:** Variant swatches/chips are navigable via `Tab` and `Arrow` keys with clear focus indicators. | `[ ] Pass / [ ] Fail` | High | Use native `<input type="radio">` or `tabindex="0"` with `:focus-visible`. |
| **6.4** | **ARIA Radio Group Markup:** Custom swatch containers use `role="radiogroup"` and swatches use `role="radio"` + `aria-checked`. | `[ ] Pass / [ ] Fail` | High | Inject proper ARIA roles and state attributes into custom components. |
| **6.5** | **Inline Validation Handling:** Clicking "Add to Cart" with unselected options gently scrolls to missing option with clear inline helper text. | `[ ] Pass / [ ] Fail` | Critical | Replace browser alerts with smooth scroll + red inline message. |

---

## Audit Scoring & Remediation Roadmap

### Score Summary

- **Total Items Checked:** ______ / 28
- **Critical Pass Rate:** ______ / 8 (Target: 100%)
- **High Severity Pass Rate:** ______ / 13 (Target: >85%)
- **Overall Compliance Score:** ______%

### Prioritized Action Plan

1. **Immediate Quick Fixes (Sprint 1):**
   - ____________________________________________________________________
   - ____________________________________________________________________

2. **Core Component Enhancements (Sprint 2):**
   - ____________________________________________________________________
   - ____________________________________________________________________

3. **Advanced Integration & URL State (Sprint 3):**
   - ____________________________________________________________________
   - ____________________________________________________________________
