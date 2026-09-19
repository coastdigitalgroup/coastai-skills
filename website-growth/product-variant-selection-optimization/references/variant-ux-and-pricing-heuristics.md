# Product Variant UX, Choice Architecture & Pricing Heuristics

A deep technical and psychological reference guide for engineering high-converting variant selection interfaces on e-commerce Product Detail Pages (PDPs).

---

## 1. Choice Architecture & Cognitive Load

Selecting product variants is a multi-step cognitive task. Reducing cognitive friction requires matching UI control patterns to human visual recognition speeds.

```text
[VARIANT OPTION DENSITY SPECTRUM]

1 - 5 Options          6 - 12 Options         13+ Options
┌──────────────────┐   ┌──────────────────┐   ┌──────────────────┐
│ Visual Swatches /│   │ Wrapped Chips /  │   │ Custom Dropdown /│
│ Pill Chips       │   │ Grid Chips       │   │ Searchable Modal │
└──────────────────┘   └──────────────────┘   └──────────────────┘
  Fastest Recognition    Medium Density         High Density
```

### Component Selection Rules

1. **Color & Pattern Options:**
   - **Rule:** Never use standard text dropdowns for color selection if 1 to 10 choices exist.
   - **Visual Swatch Dimensions:** Minimum `32x32px` on desktop, `44x44px` on touch screens. Use rounded squares (`border-radius: 6px`) or circles.
   - **Texture Accuracy:** Use real micro-cropped photography swatches for fabrics, wood grains, or metallic finishes. Avoid pure hex colors (`#1A2B3C`) as digital hex values rarely match physical dyed textile shades.

2. **Size & Measurement Options:**
   - **Rule:** Render as pill-style text chips arranged in a single horizontal row or flex grid.
   - **Order Standard:** Sort sizes logically (`XS`, `S`, `M`, `L`, `XL`, `XXL` or numeric dimensions `28`, `30`, `32`, `34`). Never sort size options alphabetically (`L`, `M`, `S`, `XL`, `XS`).

3. **Multi-Attribute Packs & Bundles:**
   - **Rule:** Display as vertical or stacked choice cards when option selection changes unit economics or pack volume.
   - **Required Card Information:**
     - Option Name (e.g., `Single Bottle`, `3-Pack Trio`, `6-Pack Family`)
     - Total Price + Unit Price (e.g., `$36 ($12 / bottle)`)
     - Value Badge (e.g., `Most Popular`, `Best Value - Save 25%`)

---

## 2. Multi-Attribute State Dependency Matrix

When a product contains 2+ variant dimensions (e.g., Size x Color x Material), selecting an option in Dimension 1 changes available stock in Dimension 2.

### Cross-Selection State Matrix Logic

```text
               SIZE: SMALL           SIZE: MEDIUM           SIZE: LARGE
COLOR: NAVY    [ IN STOCK ]          [ IN STOCK ]           [ IN STOCK ]
COLOR: BLACK   [ IN STOCK ]          [ OUT OF STOCK ]       [ IN STOCK ]
COLOR: OLIVE   [ OUT OF STOCK ]      [ IN STOCK ]           [ OUT OF STOCK ]
```

### State Resolution Algorithm

1. **User Selects Size "Medium":**
   - Color "Navy" remains fully active (In Stock).
   - Color "Black" morphs to **Slashed + Dimmed State** (Out of Stock in Medium).
   - Color "Olive" remains fully active (In Stock).

2. **User Clicks Slashed Color "Black" while Size "Medium" is selected:**
   - **DO NOT** reset or clear the size selection.
   - **DO NOT** disable the click event on Color "Black".
   - **Action:** Retain Color "Black", retain Size "Medium", and instantaneously trigger:
     - Primary CTA morphs to: `Notify Me When Available in Medium / Black`.
     - Auxiliary banner presents: *"Medium in Black is backordered. Available in Navy or Olive (Ships Today)."*

3. **Default Variant Pre-Selection Rule:**
   - Upon initial page load, automatically pre-select the highest-inventory, highest-converting valid SKU combination.
   - *Exception:* If the user arrives via a deep link containing query parameters (e.g., `?variant=12345`), override default selection with the exact SKU requested in the URL.

---

## 3. Dynamic Pricing Surcharges & Delta Badging

Variant selection often alters unit pricing (e.g., higher storage capacities, premium materials, larger dimensions). Unexpected price increases during selection trigger severe cart abandonment.

### The Upfront Delta Rule

Always display the relative price differential directly on the unselected option control **before** the user interacts with it.

```text
[UPFRONT PRICE DELTA BADGING PATTERNS]

Capacity Selector:
┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐
│ 128 GB              │  │ 256 GB              │  │ 512 GB              │
│ $799 (Included)     │  │ $899 (+$100)        │  │ $1,099 (+$300)      │
└─────────────────────┘  └─────────────────────┘  └─────────────────────┘

Material Selector:
( ) Canvas ($120 Base)
( ) Premium Leather ($180 — +$60 Surcharge)
```

### Price Display Micro-Interactions

- **Instant Synchronized Update:** When a user selects an option with a price delta, the buy-box price must update within 50ms using a smooth fade or number counter transition.
- **Anchor Pricing:** If the selected variant is currently discounted, show the slashed original price (`$899`) beside the active price (`$799`) and display a calculated savings tag (`Save $100`).

---

## 4. Visual Media & Gallery Synchronization

Mismatch between selected variant options and displayed gallery photos is the leading cause of "Wrong Item Delivered" returns.

### 1-to-1 Media Sync Heuristics

1. **Color-Specific Image Filtering:**
   - Every product image in the gallery metadata must be tagged with its corresponding color variant ID.
   - Upon color swatch selection, instantly filter the gallery array so only images matching the selected color are displayed.
2. **Hero Image Auto-Focus:**
   - Selecting a color variant must automatically scroll or update the main hero view to Image #1 of that specific color variant.
3. **Thumbnail Re-Sequencing:**
   - Thumbnail slider must re-index to display thumbnails for the selected color first, preventing users from seeing irrelevant colors in the thumbnail reel.

---

## 5. Accessibility & Touch Standards (WCAG 2.1 AA)

Variant selection UI components must be fully usable via screen readers, keyboard navigation, and touch interfaces.

### ARIA & Keyboard Markup Template

```html
<!-- Custom Color Swatch Radio Group -->
<div
  role="radiogroup"
  aria-labelledby="color-label"
  class="swatch-group"
>
  <span id="color-label" class="swatch-label">
    Color: <strong>Midnight Navy</strong>
  </span>

  <div class="swatch-options">
    <button
      type="button"
      role="radio"
      aria-checked="true"
      aria-label="Color: Midnight Navy (In Stock)"
      class="swatch-btn active"
      style="background-color: #1a2b3c;"
    >
      <span class="sr-only">Midnight Navy</span>
    </button>

    <button
      type="button"
      role="radio"
      aria-checked="false"
      aria-label="Color: Heather Charcoal (Out of Stock)"
      class="swatch-btn oos"
      style="background-color: #4a4a4a;"
    >
      <span class="sr-only">Heather Charcoal - Out of Stock</span>
      <span class="slash-line" aria-hidden="true"></span>
    </button>
  </div>
</div>
```

### Keyboard & Focus Rules

- **Roving Tabindex / Radio Group Keys:** Users navigate between swatches using `Left/Right Arrow` keys or `Up/Down Arrow` keys within the radio group, and move between option groups using `Tab`.
- **Focus Indicator:** Active and focused swatches must feature an explicit, high-contrast focus ring (minimum 2px thickness with 2px offset) passing 3:1 contrast against adjacent background colors.
- **Screen Reader Announcements:** When a swatch selection changes, aria-live or dynamic label updates must announce option state (e.g., *"Alpine Teal selected, $350, In Stock"*).

---

## 6. URL State Persistence & Deep Linking

```text
[URL STATE SYNCHRONIZATION FLOW]

User Selects Variant Options
         │
         ▼
Update JS State Object (color: 'teal', size: 'M')
         │
         ▼
Execute history.replaceState(null, '', '?color=teal&size=M')
         │
         ▼
User Shares URL / Bookmarks Page
         │
         ▼
Direct Landing restores exact Variant Options, Price & Media Gallery
```

### URL Query String Conventions

- Use clean, human-readable key-value pairs in query strings:
  - `?color=alpine-teal&size=medium`
  - OR single master SKU parameter: `?variant=481029381`
- Use `history.replaceState()` rather than `history.pushState()` when updating variant options on the same page to avoid polluting browser back-button history with every swatch click.
