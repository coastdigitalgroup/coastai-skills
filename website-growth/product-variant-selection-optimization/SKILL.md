---
name: product-variant-selection-optimization
description:
  Audit, design, and optimize multi-dimensional product variant selectors (color,
  size, material, style, capacity, quantity bundle) across PDPs and cart drawers
  to eliminate selection friction, out-of-stock dead ends, hidden price
  surcharges, and misorder returns.
---

# Product Variant Selection Optimization

## Purpose

The Product Variant Selection Optimization skill provides a systematic framework for auditing, structuring, designing, and optimizing variant selection interfaces on e-commerce Product Detail Pages (PDPs) and cart drawers. Multi-option products (varying by color, size, material, storage capacity, style, or quantity pack) introduce critical conversion barriers: unselected variant errors on primary CTAs, out-of-stock dead ends, unexpected price jumps during selection, unlinked gallery media, and high product return rates caused by customers accidentally ordering the wrong variant. This skill applies behavioral economics, interaction design heuristics, and state synchronization rules to streamline choice architecture, ensure dynamic visual feedback, and maximize Add-to-Cart (ATC) rate, PDP-to-Checkout progression, and post-purchase customer satisfaction.

## Use Cases

- **E-Commerce Brands with Multi-Option Products:** Storefronts selling goods with 2+ variant dimensions (e.g., Apparel: Size x Color; Tech: Model x Storage x Color; Home Goods: Dimensions x Fabric x Leg Finish).
- **High-Return Retail Categories:** Apparel, footwear, jewelry, and customized accessories experiencing elevated product return rates due to "Wrong Color/Size/Spec Ordered."
- **Variable-Price Catalogues:** Merchants where specific premium variants incur price surcharges (e.g., 64GB vs. 512GB storage, genuine leather vs. canvas, single item vs. 3-pack).
- **High Out-of-Stock Matrix Catalogs:** Stores where popular variant combinations frequently go out of stock, leading to dead-end clicks and high bounce rates.

## When NOT to Use

- **Single-SKU / Non-Variant Products:** Goods with no configurable options or options handled purely via post-purchase customization (use `product-page-optimization`).
- **Complex Custom Configurators:** 3D customizers, bespoke tailoring, or modular build-your-own tools requiring full Canvas/WebGL rendering pipelines (use specialized 3D configurator patterns).
- **B2B Wholesale Order Sheets:** Matrix bulk order tables with multi-item quantity inputs per SKU row designed for high-volume purchasing (use B2B bulk grid patterns).
- **Pure Tiered Subscriptions:** SaaS or content plans where variations are feature tiers rather than physical/tactile SKUs (use `pricing-page-optimization`).

## Inputs

1. **Variant Matrix Data:** List of product options, option types (Color, Size, Material, etc.), SKU counts, price delta mappings, and inventory availability per combination.
2. **Variant Analytics:** Drop-off rate at the PDP buy box, frequency of "Please Select an Option" error triggers, Add-to-Cart rate per variant, and exit rates on out-of-stock combinations.
3. **Product Return Reason Logs:** Breakdown of customer returns tagged as "Wrong Color Received," "Wrong Size Ordered," "Different from Photo," or "Expected Different Material."
4. **Current PDP Screenshots/Code:** Mobile and desktop layouts of variant selectors (swatches, dropdowns, chips), media gallery, buy-box button, and URL parameter handling.

## Outputs

1. **Variant Selection Friction Audit:** A granular assessment identifying Dead Ends, Hidden Surcharges, Selection Ambiguity, and Mobile Usability Flaws.
2. **Component & Layout Architecture Spec:** UI layout mapping declaring when to use Color Swatches, Text Chips, Visual Image Chips, or Custom Dropdowns based on option density.
3. **State Dependency Matrix & Out-of-Stock (OOS) Logic:** Rulebook for managing multi-attribute cross-selection (e.g., how selecting Size "Large" updates available Colors without clearing state).
4. **Dynamic Price Delta & Gallery Sync Spec:** Microcopy and badge rules for upfront price differential transparency and automated gallery media swapping.
5. **URL Query State & Error Prevention Spec:** Technical guidelines for URL parameter persistence (`?variant=12345` or `?color=navy&size=L`) and inline pre-selection/validation.

---

## Workflow

### 1. Variant Architecture & Component Selection Audit

Categorize all product options and evaluate if current UI controls match human visual processing capabilities.

- **Option Count Rule:**
  - **1 to 5 Options:** Use horizontal visual swatches or pill/text chips. Never hide 2-5 options inside a drop-down menu.
  - **6 to 12 Options:** Use wrapped visual chips or a searchable chip grid.
  - **13+ Options:** Use a structured custom dropdown with inline visual swatches/badges or a search/filter modal.
- **Visual Representation Alignment:**
  - **Colors & Patterns:** Use minimum 32x32px circular or rounded square visual swatches showing actual fabric/material texture rather than flat hex codes.
  - **Sizes & Dimensions:** Use clear, high-contrast text chips with standardized order (XS, S, M, L, XL).
  - **Materials & Finishes:** Use image swatches with high-definition micro-texture previews and hover text labels.
  - **Quantity Bundles / Packs:** Use structured cards displaying total price, per-unit price, and savings badges (e.g., "1 Pack - $20", "3 Pack - $45 (Save 25%)").

### 2. Multi-Dimensional Matrix & Out-of-Stock (OOS) State Management

Eliminate dead ends when customers select variant combinations that are currently unavailable.

- **Never Hide Unavailable Variants:** Keep unavailable combinations visible so customers know the option exists.
- **The "Slashed + Dimmed" Pattern:** Mark out-of-stock variants with a diagonal strike-through and 40% opacity while keeping them clickable.
- **Cross-Attribute State Resolution:**
  - When Option A (e.g., Size "Small") is selected and Option B (e.g., Color "Olive") is out-of-stock in Small, do NOT disable Color "Olive" entirely.
  - Allow the user to click "Olive" and dynamically present two high-converting paths:
    1. **In-Stock Alternative Recommendation:** "Small in Olive is out of stock. Available in Medium, or available now in Forest Green (Small)."
    2. **Inline Back-in-Stock Capture:** Instantly morph the primary CTA button from "Add to Cart" to "Notify Me When Available in Small / Olive" with a 1-click email/SMS input drawer.
- **Smart Default Selection:**
  - Default the page to the most popular, in-stock variant combination. Never default to an out-of-stock variant unless coming from a specific marketing deep-link.

### 3. Dynamic Price Differential & Surcharge Transparency

Eliminate cart abandonment caused by surprise price changes.

- **Upfront Delta Badging:** When selecting a higher-tier variant increases the base price, explicitly label the surcharge on the selector control before the user clicks it.
  - *Example:* `[ 128GB - Included ]` vs. `[ 256GB - +$100 ]` vs. `[ 512GB - +$250 ]`.
- **Synchronized Buy-Box Pricing:** Upon selection, instantaneously update the primary price display with a micro-animation (e.g., gentle fade/slide) showing the final total price.
- **Anchor & Savings Display:** If a variant pack or higher capacity carries a discount, display both the slashed original price and the calculated savings percentage directly beside the buy button.

### 4. Visual Media Gallery & Touch Interaction Sync

Connect physical variant choices directly to visual feedback.

- **1-to-1 Media Gallery Filtering:** When a user selects a color or style variant, instantly filter and re-sequence the product image gallery so all primary images depict the exact selected variant.
- **Thumbnail Auto-Scroll:** Ensure selecting a variant scrolls or shifts the main gallery view to the hero shot of that specific variant without a full page refresh.
- **Touch-Friendly Proportioning:**
  - On mobile viewports, all swatch and chip buttons must maintain a minimum touch target size of 44x44px with at least 8px spacing between touch targets to eliminate accidental taps.
- **Selected State Elevation:** Distinguish selected swatches with a thick high-contrast border (minimum 2px solid primary color), checkmark icon, or distinct shadow ring that complies with WCAG 2.1 AA (3:1 contrast against adjacent elements).

### 5. URL State Synchronization & Error-Free Add-to-Cart

Ensure smooth sharing, bookmarking, and error handling.

- **Deep-Link URL Parameters:** Update the browser location bar without page reload using `history.replaceState()` whenever options change (e.g., `?variant=48192031` or `?color=midnight-blue&size=L`).
- **Direct Link Restoration:** Ensure loading a deep-linked URL automatically pre-selects the exact variant options, updates gallery images, and updates price tags instantly.
- **Pre-Selection vs. Unselected Validation:**
  - *Best Practice:* Pre-select valid default options to enable instant 1-click Add-to-Cart.
  - *If Unselected State is Required:* If explicit selection is legally or operationally necessary, clicking "Add to Cart" without selecting options must gently shake/scroll to the missing variant selector and display inline red helper text ("Please choose a size") rather than displaying a generic browser alert or failing silently.

---

## Decision Rules

- **The "No Hidden Surcharges" Rule:** Never change the price upon variant selection without showing an explicit `+$X` badge on the unselected option control prior to click.
- **The "No Dead-End Swatch" Rule:** Tapping an out-of-stock swatch must never freeze the UI or render the page non-interactive. It must immediately reveal a back-in-stock notification form or switch to an in-stock alternative recommendation.
- **The "1-to-1 Media Sync" Rule:** Selecting a color variant MUST change the primary product photography hero image within 100ms.
- **The "Thumb-Zone Protection" Rule:** On mobile, variant selectors must be anchored in the lower 60% of the screen or accessible within thumb reach without hiding the primary price or Add-to-Cart button below the fold.
- **The "Contrast & Name" Rule:** Color swatches must never rely purely on visual color. A clear, human-readable color label (e.g., "Color: Heather Charcoal") must update dynamically above the swatch row.

---

## Constraints

- **WCAG 2.1 AA Accessibility:** All custom swatches and chips must be accessible via keyboard (Tab/Arrow navigation), feature proper `role="radiogroup"` / `role="radio"` or `aria-checked` attributes, and pass a 3:1 contrast ratio against the background.
- **Performance Budget:** Variant state changes, price recalculations, and gallery swaps must execute in under 100ms without triggering layout thrashing or full page reloads.
- **Browser State Preservation:** Using browser Back/Forward navigation must accurately restore the previously selected variant combination and media gallery state.

## Non-Goals

- Managing physical inventory warehousing, reorder point thresholds, or ERP syncing logic.
- Building custom 3D web graphics or AR virtual try-on engines.
- Design of general checkout payment gateways or post-purchase order tracking.

---

## Common Failure Patterns

- **The "Silent Fail" Add-to-Cart:** Customer taps "Add to Cart", nothing happens, and a tiny red text message appears far above the fold stating "Please select a size" while the user remains confused at the bottom.
- **The Dropdown Overload Trap:** Hiding 4 distinct colors inside a hidden select dropdown on desktop, masking visual choices behind extra clicks.
- **The Mystery Swatch:** Showing 12 tiny 15px color dots with no text labels, forcing users to hover/tap each one blindly to figure out which dot is "Navy" vs. "Black".
- **The Disconnected Gallery:** Customer selects "Emerald Green", but all 8 product photos continue showing the default "Burgundy" model photo.
- **The Broken Shared Link:** Customer shares a link with a friend for a specific size/color combination, but the URL drops parameters, opening the default out-of-stock SKU instead.
- **The Hidden Surcharge Shock:** Base price reads "$49", but selecting size "3XL" stealthily increases the price to "$64" at the cart drawer without prior notice.

---

## Validation Criteria

- [ ] **Add-to-Cart (ATC) Conversion Rate:** Track percentage of PDP sessions that click "Add to Cart". Target: **+10% to +22%** relative lift.
- [ ] **Variant Selection Error Rate:** Measure percentage of users who attempt to click "Add to Cart" without selecting required options. Target: **<2%** of total ATC attempts.
- [ ] **Wrong-Variant Return Rate:** Measure post-purchase product returns citing "wrong color/size/spec ordered". Target: **25% to 40%** reduction.
- [ ] **Out-of-Stock Bounce Rate:** Measure PDP exit rate when encountering an out-of-stock variant. Target: **15% to 30%** reduction via back-in-stock capture or alternative recommendations.
