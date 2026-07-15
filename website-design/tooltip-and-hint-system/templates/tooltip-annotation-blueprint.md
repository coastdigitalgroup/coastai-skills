# Tooltip and Hint Annotation Blueprint

Use this template to document the behavior and requirements for contextual
help elements when handing over designs to developers.

---

## Component Specification: [Component Name]

### 1. General Identification
- **Trigger Element:** (e.g., Save Button, Info Icon, "Tax ID" Label)
- **Help Pattern:** [ ] Tooltip (Text only) | [ ] Infotip (Rich) | [ ] Inline Hint (Persistent)
- **Content Source:** (e.g., Static text, CMS-driven, System calculation)

### 2. Interaction & Triggering
- **Activation Mode:** [ ] Hover [ ] Focus [ ] Click/Tap [ ] Persistent
- **Appearance Delay:** (Standard: 300ms)
- **Dismissal Method:** [ ] Blur/Mouse-out [ ] `Escape` Key [ ] "Close" Button (Infotips only)

### 3. Visual & Spatial
- **Preferred Position:** [ ] Top [ ] Bottom [ ] Left [ ] Right
- **Flipping Logic:** [ ] Enable Collision Detection (Flip if off-screen)
- **Max Width:** (e.g., Tooltip: 180px, Infotip: 300px)
- **Arrow/Pointer:** [ ] Required [ ] Not Required

### 4. Content Content
- **Header (Optional):**
- **Body Text:**
- **Link/CTA (Infotips only):**

### 5. Accessibility (A11y)
- **ARIA Role:** [ ] `tooltip` [ ] `dialog` (for rich Infotips)
- **ARIA Attribute:**
  - `aria-label` (If tooltip is the name: e.g., icon buttons)
  - `aria-describedby` (If tooltip is an additional description)
- **Focus Management:** [ ] Ensure trigger is in tab order (tabindex="0")

---

## Global Implementation Tokens

*Copy these tokens into your project variables.*

| Token Name | Value | Purpose |
| :--- | :--- | :--- |
| `--help-z-index` | 1000 | Highest level (Top Layer) |
| `--help-delay-in` | 300ms | Prevents visual jitter on hover |
| `--help-duration` | 150ms | Smooth fade/scale transition |
| `--help-bg` | #1a1a1a | High-contrast background |
| `--help-text` | #ffffff | High-contrast foreground |
| `--help-radius` | 4px | Small corner rounding |
