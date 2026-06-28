# Metric Composition Breakdown

This document provides two realistic examples of the Metric and Statistic System applied to different design contexts: a SaaS Dashboard and a Marketing Landing Page.

---

## 1. SaaS Dashboard KPI Header

In a dashboard, metrics are functional and comparative. The goal is to show performance at a glance.

### Visual Breakdown

| Element | Style Treatment | Logic/Purpose |
| :--- | :--- | :--- |
| **Card Container** | White background, 1px neutral-200 border, 8px radius. | Groups the metric as a single entity. |
| **Label** | 12px Semibold, uppercase, neutral-500. | "TOTAL REVENUE" - Secondary priority, placed at top. |
| **Primary Value** | 32px Bold, neutral-900. | "$128,430" - The focal point of the card. |
| **Trend Badge** | 12px Medium, Green background (10% opacity), Green text. | "+12.5%" - Indicates positive growth. |
| **Trend Icon** | 10px Arrow (↑). | Provides non-color based context for the trend. |
| **Context Text** | 12px Regular, neutral-400. | "vs. last month" - Defines the comparison period. |

### Layout Annotation
```text
[ Card ]
  TOTAL REVENUE                       <-- Label (Top)
  $128,430                            <-- Value (Large)
  [ ↑ 12.5% ] vs. last month          <-- Trend + Context
```

---

## 2. Marketing Social Proof ("By the Numbers")

In marketing, metrics are used to build trust and excitement. They are often high-contrast and "heroic" in scale.

### Visual Breakdown

| Element | Style Treatment | Logic/Purpose |
| :--- | :--- | :--- |
| **Section Theme** | Dark background (navy), white text. | Creates high impact and separation from body text. |
| **Display Value** | 64px Extra Bold, primary-accent (yellow). | "10K+" - Designed to be seen instantly while scrolling. |
| **Unit/Suffix** | 48px (slightly smaller than value). | "K+" - Condensed to maintain the "Big Number" feel. |
| **Descriptor** | 18px Medium, white (80% opacity). | "Happy Customers Worldwide" - Narrative context. |
| **Visual Anchor** | Subtle background icon or glow. | Adds "hero" energy to the stat. |

### Layout Annotation
```text
      10K+                           <-- Big Display Value
Happy Customers                      <-- Descriptive Label
   Worldwide
```

---

## 3. Responsive Adaptation

### Desktop (1440px)
Metrics are arranged in a 4-column grid (`grid-cols-4`). Spacing between metrics is `--space-xl` (32px).

### Tablet (768px)
Metrics shift to a 2-column grid (`grid-cols-2`). Value size may decrease by 15-20% to prevent wrapping.

### Mobile (375px)
Metrics stack in a single column or a 2-column grid if the values are short. Standard padding `--space-m` (16px) is used to maximize screen real estate.
