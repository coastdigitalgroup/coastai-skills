# Product Variant Selection Audit & Optimization Checklist

Use this audit checklist to evaluate, score, and optimize product variant selection controls across e-commerce Product Detail Pages (PDPs), quick-view modals, and cart drawers.

---

## 1. Store & PDP Context Information

- **Store Name / URL:** __________________________________________________
- **Auditor Name:** _______________________________________________________
- **Audit Date:** _________________________________________________________
- **Target SKU / Product Line:** ___________________________________________
- **Total Variant Dimensions (Axes):** [ ] 1 Axis  [ ] 2 Axes  [ ] 3+ Axes
- **Total Combination SKU Count:** ______ SKUs

---

## 2. Evaluation Categories & Scoring (Max 100 Points)

Evaluate each item on a scale of **0 to 5 points**:
- **0 = Non-existent / Severely Broken** (e.g., hidden dropdowns, broken errors, missing images)
- **3 = Partially Implemented / Minor Friction** (e.g., text swatches only, missing touch target padding)
- **5 = Best-in-Class Implementation** (e.g., responsive swatches, instant gallery sync, restock triggers)

### Category A: Control Component Selection & Ergonomics (25 Points)

| Item | Evaluation Criteria | Score (0-5) | Notes & Remediation |
| :--- | :--- | :---: | :--- |
| **A1** | **Visual Color Swatches:** Color options use high-res fabric textures or verified hex swatches instead of text-only dropdowns. | _____ | |
| **A2** | **Touch Target Accessibility:** All swatches and size pills maintain a minimum 44x44px touch target on mobile viewports with ≥8px spacing. | _____ | |
| **A3** | **Active Option Labeling:** Selected option text name (e.g., *Color: Midnight Navy*) is explicitly displayed above swatch rows. | _____ | |
| **A4** | **Quantity & Bundle Segmented Cards:** Multi-pack options display total price, unit price (e.g., *$12/oz*), and savings percentage badges. | _____ | |
| **A5** | **Mobile Responsiveness:** Swatch rows wrap neatly or scroll horizontally in a clean touch strip without breaking layout boundaries. | _____ | |

### Category B: Pre-Selection & State Management (20 Points)

| Item | Evaluation Criteria | Score (0-5) | Notes & Remediation |
| :--- | :--- | :---: | :--- |
| **B1** | **In-Stock Default Pre-Selection:** A valid, in-stock variant combination is pre-selected on PDP load, ensuring ATC is instantly active. | _____ | |
| **B2** | **URL Parameter Synchronization:** Browser URL updates dynamically (e.g., `?variant=789`) on selection for sharing and bookmarking. | _____ | |
| **B3** | **Selected State Highlighting:** Selected options feature dual visual indicators (e.g., high-contrast ring + checkmark icon). | _____ | |
| **B4** | **Cart Drawer Quick-Edit:** Selected variant attributes are clearly listed in cart drawer line-items with 1-click option editing. | _____ | |

### Category C: Dependency Handling & Out-of-Stock (OOS) Logic (25 Points)

| Item | Evaluation Criteria | Score (0-5) | Notes & Remediation |
| :--- | :--- | :---: | :--- |
| **C1** | **Strike-Through OOS Indicators:** Out-of-stock or invalid attribute pills display a diagonal strike-through line + subtle dimming. | _____ | |
| **C2** | **Non-Destructive Exploration:** All option rows remain interactive without locking or resetting user selections upon clicking OOS items. | _____ | |
| **C3** | **Inline Restock Notification:** Tapping an OOS variant opens an inline modal/drawer for email/SMS restock alerts. | _____ | |
| **C4** | **Low-Stock Scarcity Callouts:** Variants with low inventory display explicit urgency badges (e.g., *⚡ Only 3 Left in Stock*). | _____ | |
| **C5** | **Cross-Axis Pre-Selection Shift:** Clicking an OOS size auto-suggests nearest available color instead of throwing generic error alerts. | _____ | |

### Category D: Pricing Transparency & Value Framing (15 Points)

| Item | Evaluation Criteria | Score (0-5) | Notes & Remediation |
| :--- | :--- | :---: | :--- |
| **D1** | **Explicit Price Surcharge Badges:** Surcharges are badged directly on option pills (e.g., *XXL (+$15)*) before user clicks. | _____ | |
| **D2** | **Real-Time Price Recalculation:** Main buy box price tag updates instantly with smooth micro-animation upon surcharge selection. | _____ | |
| **D3** | **Unit Price Breakdown:** Dynamic unit price calculations (e.g., *$0.25 / count*) update based on selected size or bundle. | _____ | |

### Category E: Gallery Synchronization & Visual Trust (15 Points)

| Item | Evaluation Criteria | Score (0-5) | Notes & Remediation |
| :--- | :--- | :---: | :--- |
| **E1** | **Swatch-to-Gallery Sync:** Tapping a color/style swatch instantly filters main photo gallery to show images matching that option. | _____ | |
| **E2** | **Sizing Chart Context:** Size guide link is placed adjacent to the size selector with interactive fit calculator or measurements. | _____ | |
| **E3** | **UGC / Review Photo Filtering:** Customer review photo gallery filters to display photos matching the selected color/size. | _____ | |

---

## 3. Total Score & Audit Classification

**TOTAL SCORE:** ______ / 100 Points

- **85 – 100 Points (Grade A - Optimized):** High-converting choice architecture. Focus on minor micro-copy polish and A/B testing.
- **70 – 84 Points (Grade B - Moderate Friction):** Noticeable conversion leaks. Implement missing OOS strike-throughs and surcharge badges.
- **50 – 69 Points (Grade C - Severe Friction):** Poor mobile ergonomics. Replace native dropdowns with touch-friendly swatches and pre-selection.
- **Under 50 Points (Grade F - Critical Failure):** Broken user experience. Full overhaul required using the `product-variant-selection-optimization` workflow.

---

## 4. Prioritized Optimization Action Plan

| Priority | Category & Item ID | Identified Friction Point | Remediation Action Required | Target Completion Date | Owner |
| :---: | :---: | :--- | :--- | :---: | :---: |
| **P1** | | | | | |
| **P2** | | | | | |
| **P3** | | | | | |
| **P4** | | | | | |
