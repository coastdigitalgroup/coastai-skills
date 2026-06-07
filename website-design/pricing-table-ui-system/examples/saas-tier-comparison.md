# Example: SaaS Pricing Grid Breakdown

This example demonstrates how the Pricing Table UI System is applied to a
standard B2B SaaS product (a Project Management Tool) to improve clarity and
drive conversion toward the "Professional" tier.

## The Design Challenge

The company has three plans: **Basic**, **Professional**, and **Enterprise**.
Originally, all three plans were presented as identical cards with 15+ features
listed in each. Users were struggling to differentiate between the value of the
Professional plan and the Enterprise plan.

## Applied UI Patterns

### 1. Tier Anatomy & Hierarchy

- **Tier 1 (Basic):** Left-aligned, standard card with a white background and
  neutral CTA ("Get Started").
- **Tier 2 (Professional):** **Highlighted.** The card has a subtle primary
  brand border, a "Most Popular" badge at the top, and a high-contrast primary
  CTA button. The card is slightly taller (8px) than the others.
- **Tier 3 (Enterprise):** Right-aligned, dark background card to indicate a
  premium shift. The CTA is "Contact Sales" to differentiate the sales-led
  motion from the self-serve tiers.

### 2. Feature Filtering

Instead of listing all 15 features, the cards now only show the "Value
Differentiators":
- **Basic:** "Up to 5 Projects," "Basic Reporting," "Community Support."
- **Professional:** "**Everything in Basic, plus:** Unlimited Projects,"
  "Advanced Analytics," "Custom Fields," "Priority Email Support."
- **Enterprise:** "**Everything in Pro, plus:** Single Sign-On (SSO)," "SLA
  Guarantees," "Dedicated Success Manager."

### 3. Billing Toggle Design

A centered toggle switch sits above the grid:
- **State A:** "Monthly"
- **State B:** "Yearly (**Save 20%**)" (The discount is highlighted in a small
  green pill).
- **Behavior:** When switched to Yearly, the large price numbers (e.g., "$29")
  smoothly animate to the discounted amount (e.g., "$24").

### 4. Responsive Adaptation

- **Desktop (1024px+):** A 3-column grid where all cards have equal heights
  (using Flexbox `stretch`).
- **Tablet (768px):** A 2-column grid for the self-serve plans (Basic & Pro),
  with the Enterprise plan taking up the full width below them.
- **Mobile (375px):** A single-column vertical stack. To prevent excessive
  scrolling, the feature lists are collapsed into "Show Features" accordions
  for the Basic and Enterprise plans, while the Professional plan remains
  expanded.

## Visual Breakdown (Annotation)

1.  **Badge:** Top-center "Most Popular" (High contrast).
2.  **Price:** 48px Bold Headline (Max prominence).
3.  **Billing Text:** 14px Muted text ("per user/month").
4.  **CTA:** 100% Width Button (Primary vs. Outline styles).
5.  **Divider:** Subtle horizontal rule between header and features.
6.  **Feature Icons:** Solid green checkmarks for "included" items.
