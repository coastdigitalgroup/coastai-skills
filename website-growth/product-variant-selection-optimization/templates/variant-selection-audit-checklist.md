# Product Variant Selection Audit Checklist

This audit template provides a systematic framework for evaluating product variant selection controls across Product Detail Pages (PDPs), quick-view modals, and cart drawers. Use this checklist to identify usability barriers, out-of-stock dead ends, hidden pricing surcharges, and media synchronization failures.

---

## 1. Information Hierarchy & Choice Architecture

| Audit Question | Pass/Fail | Observations & Required Fixes | Severity (High/Med/Low) |
| :--- | :---: | :--- | :---: |
| Are primary aesthetic attributes (Color, Pattern, Finish) presented as visual swatches rather than hidden inside native `<select>` dropdowns? | [ ] | | High |
| Is every visual color swatch paired with an explicit, live text label displaying the active option name (e.g., `Color: Slate Grey`)? | [ ] | | High |
| Are secondary sizing/dimensional attributes presented as touch-friendly interactive pills or segmented controls? | [ ] | | High |
| Is a Size & Fit Guide link positioned directly adjacent to the Size attribute label? | [ ] | | Medium |
| Are multi-pack or volume bundle variants formatted as value cards with clear savings callouts (e.g., `Save 15%`)? | [ ] | | Medium |
| On initial page load, is the default pre-selected variant 100% in stock? | [ ] | | High |

---

## 2. Pricing & Surcharge Transparency

| Audit Question | Pass/Fail | Observations & Required Fixes | Severity (High/Med/Low) |
| :--- | :---: | :--- | :---: |
| If specific variants carry price surcharges (e.g., XL sizes, leather materials), is the exact price delta printed directly on the option pill (e.g., `XL (+$10)`) *before* selection? | [ ] | | High |
| Does selecting a variant with a surcharge update the main PDP price headline immediately with zero lag? | [ ] | | High |
| If strike-through anchor pricing (e.g., ~~$120~~ $89) is used, does the discount calculate correctly for every variant SKU? | [ ] | | Medium |
| Are buy-now-pay-later (BNPL) monthly installment estimates (e.g., "or 4 payments of $22.25") dynamically updated when a higher-priced variant is selected? | [ ] | | Low |

---

## 3. Inventory & Out-of-Stock (OOS) Handling

| Audit Question | Pass/Fail | Observations & Required Fixes | Severity (High/Med/Low) |
| :--- | :---: | :--- | :---: |
| Are out-of-stock variant pills/swatches visually distinguished (e.g., diagonal strikethrough, 50% opacity) while remaining clickable? | [ ] | | High |
| Tapping an out-of-stock variant opens an inline "Notify Me When Restocked" email/SMS capture form instead of showing a dead-end disabled CTA? | [ ] | | High |
| Does the restock alert capture form automatically pre-fill the exact SKU/variant combination selected by the user? | [ ] | | Medium |
| Are low-stock urgency badges (e.g., `⚡ Only 2 left in Size M`) rendered when inventory falls below a specified threshold? | [ ] | | Medium |
| When an out-of-stock variant is selected, does the system recommend nearby in-stock alternatives (e.g., *"Size M is OOS in Navy, but available in Black"*)? | [ ] | | Medium |

---

## 4. Media & Gallery Synchronization

| Audit Question | Pass/Fail | Observations & Required Fixes | Severity (High/Med/Low) |
| :--- | :---: | :--- | :---: |
| Does selecting a color swatch immediately filter or jump the primary PDP image gallery to display photos of that specific color? | [ ] | | High |
| Do thumbnail image previews below the main hero photo switch to match the active color variant? | [ ] | | Medium |
| On mobile viewports, does swiping the image carousel automatically update the active color swatch to match the photo displayed? | [ ] | | Low |
| Are variant-specific video clips or 360-degree spinners properly mapped to their corresponding color options? | [ ] | | Low |

---

## 5. Mobile Usability & Accessibility (WCAG 2.1 AA)

| Audit Question | Pass/Fail | Observations & Required Fixes | Severity (High/Med/Low) |
| :--- | :---: | :--- | :---: |
| Do all swatch buttons and option pills meet the minimum 44px x 44px touch target size on mobile viewports? | [ ] | | High |
| Do color swatches feature a high-contrast focus/active border (minimum 3:1 contrast ratio against background) for keyboard/screen reader users? | [ ] | | High |
| Are swatch buttons implemented with accessible `aria-label` or `aria-checked` states for screen readers? | [ ] | | High |
| Are option pills spaced with at least 8px padding to prevent mis-taps on mobile touchscreens? | [ ] | | Medium |

---

## 6. Cart Drawer & Checkout Continuity

| Audit Question | Pass/Fail | Observations & Required Fixes | Severity (High/Med/Low) |
| :--- | :---: | :--- | :---: |
| Do cart drawer line items explicitly list all selected variant attributes (e.g., `Color: Navy | Size: L`) alongside the item title? | [ ] | | High |
| Does the item thumbnail in the cart drawer display the image of the exact chosen color variant? | [ ] | | High |
| Can customers edit variant attributes (e.g., change size from M to L) directly inside the cart drawer via an inline modal without returning to the PDP? | [ ] | | Medium |
| Do checkout order summaries retain full variant attribute text descriptions on mobile and desktop viewports? | [ ] | | High |

---

## Audit Scoring & Action Plan Summary

- **Total Items Audited:** _____ / 27
- **High Severity Failures:** _____ (Immediate Action Required)
- **Medium Severity Failures:** _____ (Target for Next SPRINT)
- **Low Severity Failures:** _____ (Backlog Optimization)

### Priority Remediation Action Steps

1. __________________________________________________________________
2. __________________________________________________________________
3. __________________________________________________________________
