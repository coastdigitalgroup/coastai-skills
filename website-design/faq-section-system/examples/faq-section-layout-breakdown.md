# FAQ Section Layout Breakdown

This example demonstrates how to apply the `faq-section-system` to solve real-world pre-purchase friction and customer support discovery on a SaaS Pricing and Product Landing Page.

---

## Scenario Overview

**Product:** CloudFlow Enterprise SaaS Platform
**Page Location:** Immediately following the main Pricing Tier comparison table on the `/pricing` landing page.
**Goal:** Address pre-purchase objections regarding billing cycles, enterprise security compliance, data migration, and cancellation terms while providing an effortless contact fallback for enterprise leads.

---

## Layout Structure & Composition Matrix

```text
========================================================================================
SECTION CONTAINER (max-width: 1200px, padding: 5rem 1.5rem)
========================================================================================
┌──────────────────────────────────────────────────────────────────────────────────────┐
│ SECTION HEADER (Centered)                                                            │
│ Eyebrow: "GOT QUESTIONS?" (0.875rem, font-weight: 700, letter-spacing: 0.1em)         │
│ Title: "Frequently Asked Questions" (2.25rem, font-weight: 700)                      │
│ Subtitle: "Everything you need to know about plans, billing, and security."          │
└──────────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────────────┐
│ INTERACTIVE FILTER & SEARCH BAR                                                      │
│ [ Search Input: "Search questions (e.g. SOC2, cancellation)..."               🔍 ]   │
│                                                                                      │
│ Category Chips: [ All (12) ]  [ Billing & Plans (4) ]  [ Security (3) ]  [ Tech (5) ]│
└──────────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────────────┐
│ SPLIT 2-COLUMN LAYOUT (Desktop >= 1024px)                                            │
├──────────────────────────────────────────┬───────────────────────────────────────────┤
│ LEFT COLUMN (Sticky Sidebar, 320px)      │ RIGHT COLUMN (Accordion List, 800px)      │
│                                          │                                           │
│  [📌 Quick Jump Categories]              │  [Q1: Can I change my plan at any time?+] │
│  • General & Billing                     │  ┌──────────────────────────────────────┐ │
│  • Security & Compliance                 │  │ Answer: Yes, you can upgrade or      │ │
│  • Integration & Technical               │  │ downgrade your plan at any time...   │ │
│  • Support & SLA                         │  └──────────────────────────────────────┘ │
│                                          │  [Q2: Is my data encrypted at rest?   +] │
│  ┌────────────────────────────────────┐  │  [Q3: Do you offer custom SLAs?      +] │
│  │ 💬 Still have questions?           │  │  [Q4: What happens when trial ends?  +] │
│  │ Can't find the answer you need?    │  │  [Q5: How does team seat pricing work+] │
│  │ Our team is here to help 24/7.     │  │  [Q6: Are there setup fees?          +] │
│  │ [ Contact Sales ] [ Live Chat ]    │  │                                           │
│  └────────────────────────────────────┘  │                                           │
└──────────────────────────────────────────┴───────────────────────────────────────────┘
```

---

## Detailed Component & Spatial Specs

### 1. Header Block & Category Filter Controls
- **Eyebrow:** Uppercase track-spaced text (`letter-spacing: 0.1em; color: var(--color-primary-600)`).
- **Search Field:**
  - Height: `48px`
  - Border: `1px solid var(--border-neutral)`
  - Radius: `8px`
  - Icon: Leading 20x20px search magnifier svg icon.
  - Live filter response: Hides non-matching details nodes immediately and highlights text matches.
- **Category Chips:**
  - Container gap: `8px` flex wrap.
  - Active chip: `background: #2563EB; color: #FFFFFF; font-weight: 600; padding: 6px 16px; border-radius: 999px`.
  - Focus Ring: `2px solid #2563EB; outline-offset: 2px`.

### 2. Accordion Question Row Geometry
- **Container Boundary:** `border: 1px solid var(--border-subtle); border-radius: 12px; margin-bottom: 12px; background: #FFFFFF`.
- **Question Summary Trigger (`<summary>`):**
  - Minimum vertical touch target: `52px`.
  - Padding: `1rem 1.5rem`.
  - Flex layout: `display: flex; justify-content: space-between; align-items: center; cursor: pointer`.
  - Typography: `font-size: 1.125rem; font-weight: 600; color: #0F172A`.
  - Indicator Icon: 20x20px plus/minus or chevron icon rotating `180deg` on `details[open]`.
- **Answer Container (`.faq-answer`):**
  - Padding: `0 1.5rem 1.5rem 1.5rem`.
  - Border top: `1px solid var(--border-subtle)` (optional divider).
  - Typography: `font-size: 1rem; line-height: 1.625; color: #334155`.
  - Paragraph measure max-width: `68ch`.

### 3. Contact Support Fallback CTA Card
- **Background:** Subtle neutral or primary light tint (`#F8FAFC` or `#EFF6FF`).
- **Border:** `1px solid #DBEAFE`.
- **Border Radius:** `16px`.
- **Padding:** `2rem`.
- **Actions:**
  - Primary Action Button: "Contact Sales" (`background: #2563EB; color: #FFFFFF; font-weight: 600; min-height: 44px`).
  - Secondary Action Link: "Chat with Support" (`color: #2563EB; text-decoration: underline`).

---

## Responsive Adaptation Model

| Screen Width | Layout Mode | Category Chips Behavior | Sidebar Behavior |
| :--- | :--- | :--- | :--- |
| **Desktop (≥1024px)** | 2-Column Split (320px / 800px) | Horizontal Flex Row | Sticky left sidebar (`position: sticky; top: 2rem`) |
| **Tablet (768px–1023px)**| 1-Column Stack | Horizontal Flex Wrap | Inline support card anchored below accordion list |
| **Mobile (<768px)** | 1-Column Stack | Horizontally scrollable overflow track | Full-width support card at bottom of section |

---

## WCAG 2.1 AA Accessibility Validation Matrix

- **Disclosure Semantics:** Native HTML `<details>` and `<summary>` elements guarantee native keyboard operation (`Space`/`Enter`) and screen reader disclosure state announcements without custom JS hacks.
- **Color Contrast:**
  - Summary Question Text (`#0F172A` on `#FFFFFF`): **15.8:1** (Exceeds AA 4.5:1 requirement).
  - Answer Body Text (`#334155` on `#FFFFFF`): **8.9:1** (Exceeds AA 4.5:1 requirement).
  - Active Category Chip (`#FFFFFF` on `#2563EB`): **4.6:1** (Exceeds AA 4.5:1 requirement).
- **Focus Indicators:** Unclipped 2px solid primary ring (`#2563EB`) with 2px outline-offset on all interactive summaries, inputs, and chips.
