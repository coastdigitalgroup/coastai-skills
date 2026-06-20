# Hero Anatomy Blueprint

Use this blueprint to define the structural requirements of a Hero section before moving into high-fidelity design or development.

---

## 1. Composition Selection
*Check the box for the chosen pattern:*

- [ ] **Split (50/50):** Best for product demos/clarity.
- [ ] **Centered Stack:** Best for punchy, minimal messaging.
- [ ] **Immersive (Full Bleed):** Best for brand-heavy, cinematic impact.
- [ ] **Layered Offset:** Best for modern, high-depth UI.

---

## 2. Element Inventory
*Define the content for each pillar:*

| Pillar | Content/Requirement | Notes |
| :--- | :--- | :--- |
| **Headline (H1)** | [Enter Headline Here] | Max 10-12 words. Clear > Clever. |
| **Subheadline** | [Enter Supporting Text] | Max 2-3 lines. Address pain point. |
| **Primary CTA** | [Button Label] | Action-oriented (e.g., "Start Free"). |
| **Secondary CTA** | [Button Label/Link] | Optional. Less prominent. |
| **Primary Asset** | [Image/Video/Illustration] | Aspect Ratio: [e.g., 16:9] |
| **Trust Signal** | [e.g., Star rating, Logos] | Optional supporting proof. |

---

## 3. Visual Layering Strategy
*Define the stacking order and visual treatments:*

- **Background:** (e.g., Solid #000, Linear Gradient, Video Loop)
- **Legibility Layer:** (e.g., 20% Black Scrim, Radial Blur)
- **Foreground Content:** (e.g., White text, Primary brand color CTA)

---

## 4. Responsive Adaptation Rules

### Desktop (1440px)
- **Alignment:** [Left / Center / Right]
- **Grid Columns:** [e.g., 6 content / 6 asset]
- **Vertical Padding:** [e.g., 120px Top/Bottom]

### Tablet (768px)
- **Transition Rule:** [e.g., Change Split to Vertical Stack]
- **H1 Scaling:** [e.g., Scale to 80% of desktop size]
- **Asset Treatment:** [e.g., Keep asset but move below CTA]

### Mobile (375px)
- **Prioritization:** [e.g., Hide Trust Signals, stack CTA full-width]
- **H1 Scaling:** [e.g., Scale to 60% of desktop size]
- **Padding:** [e.g., 60px Top/Bottom]

---

## 5. Accessibility & Performance Checklist
- [ ] **Contrast:** H1 and Body text pass WCAG AA (4.5:1).
- [ ] **Semantics:** Page contains exactly one `<h1>` (this hero headline).
- [ ] **Touch Targets:** All buttons are minimum 44x44px.
- [ ] **CLS Protection:** Aspect ratio for asset is defined (e.g., `aspect-ratio: 16/9`).
- [ ] **Messaging:** Does it pass the "5-second test"?
