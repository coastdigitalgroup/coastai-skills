# Hero Anatomy Blueprint

This blueprint defines the structural zones and spacing rules for a standard,
high-impact hero section. Use this as a starting point for any hero design.

---

## 1. Structural Zones

| Zone | Purpose | Elements |
| :--- | :--- | :--- |
| **Top Navigation Overlay** | Branding & Global Links | Logo, Nav, Account (usually transparent) |
| **Messaging Area** | Value Proposition | Headline (H1), Subheadline, Tagline |
| **Visual Area** | Proof & Engagement | Image, Video, Illustration, Product UI |
| **Action Area** | Conversion | Primary CTA, Secondary Link, Trust Signal |

---

## 2. Spacing & Hierarchy Scale (Desktop)

Based on a standard 8-point/16-point grid system:

- **Section Outer Padding:** `var(--space-3xl)` (64px - 80px)
- **Column Gap (Split Layout):** `var(--space-xl)` (32px - 48px)
- **Headline to Subheadline Gap:** `var(--space-s)` (16px)
- **Subheadline to CTA Gap:** `var(--space-l)` (32px)
- **Headline Font Size:** `var(--text-5xl)` to `var(--text-7xl)`
- **Subheadline Font Size:** `var(--text-lg)` to `var(--text-xl)`

---

## 3. Responsive Stacking Rules (Mobile)

```text
DESKTOP (SPLIT)              MOBILE (STACKED)
+-------------------------+  +-------------------+
| [ TEXT ]    [ VISUAL ]  |  |      [ TEXT ]     |
| H1          IMG/UI      |  |      H1           |
| SUBHEAD                 |  |      SUBHEAD      |
| CTA                     |  |                   |
+-------------------------+  |      [ CTA ]      |
                             |                   |
                             |     [ VISUAL ]    |
                             |      IMG/UI       |
                             +-------------------+
```

### Stacking Logic:
1. **The "Pitch First" Stack:** Text -> CTA -> Visual. Use when the value
   proposition is clear enough to drive a click before the visual proof.
2. **The "Visual First" Stack:** Visual -> Text -> CTA. Use when the visual is
   essential for understanding what the product/service is (e.g., e-commerce).

---

## 4. Accessibility & Hierarchy Annotations

- **H1 Requirement:** Every hero *must* have exactly one `<h1>` containing the
  primary keywords of the page.
- **CTA Weight:** The primary CTA should use the highest contrast color in the
  brand palette.
- **Scrim Gradient:** For text-on-image:
  - `linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%)`
- **Tap Targets:** Buttons must be minimum 44px height for mobile.
