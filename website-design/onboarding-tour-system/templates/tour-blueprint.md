# Onboarding Tour Design Blueprint

Use this blueprint to design and structure semantic, accessible, and responsive onboarding tour components. It includes the structural HTML skeleton, essential layout variables, and custom CSS classes.

---

## 1. Custom CSS Custom Properties (Tokens)

Define these tokens in your central stylesheet or theme layer to maintain visual rhythm and consistent z-indices across the design system.

```css
:root {
  /* Colors */
  --tour-bg: #ffffff;
  --tour-text-primary: #111827;     /* High-contrast Slate-900 */
  --tour-text-muted: #4b5563;       /* Slate-600 */
  --tour-border: #e5e7eb;           /* Light Gray border */
  --tour-primary-cta: #2563eb;      /* Brand Blue-600 */
  --tour-primary-cta-hover: #1d4ed8;/* Brand Blue-700 */
  --tour-secondary-cta: #f3f4f6;    /* Soft Gray */
  --tour-secondary-cta-hover: #e5e7eb;

  /* Backdrop overlay */
  --tour-backdrop-color: rgba(0, 0, 0, 0.65);

  /* Spacing & Layout */
  --tour-card-width: 320px;
  --tour-border-radius: 8px;
  --tour-padding: 20px;
  --tour-arrow-size: 8px;

  /* Elevation (Staggered to sit below Toasts at z-1000) */
  --z-tour-backdrop: 900;
  --z-tour-card: 910;
}
```

---

## 2. Tour Structure HTML Blueprint

This semantic structure ensures screen readers can process the modal nature of the tour step, keeps keyboard focus constrained, and aligns with WCAG AA requirements.

```html
<!-- Backdrop Overlay (Mask) -->
<div
  class="tour-backdrop"
  aria-hidden="true"
  style="z-index: var(--z-tour-backdrop);">
</div>

<!-- Tour Card Container -->
<div
  class="tour-card"
  role="dialog"
  aria-modal="false"
  aria-labelledby="tour-title-id"
  aria-describedby="tour-desc-id"
  style="z-index: var(--z-tour-card);">

  <!-- Small arrow pointing to the anchor element -->
  <div class="tour-card-arrow tour-arrow-bottom" aria-hidden="true"></div>

  <!-- Header Section -->
  <header class="tour-card-header">
    <span class="tour-step-indicator" aria-label="Step progress">
      Step 2 of 4
    </span>
    <button
      class="tour-close-btn"
      type="button"
      aria-label="Dismiss tour"
      title="Close">
      &times;
    </button>
  </header>

  <!-- Body Content -->
  <div class="tour-card-body">
    <h3 class="tour-card-title" id="tour-title-id">
      Your Performance Pulse
    </h3>
    <p class="tour-card-description" id="tour-desc-id">
      This chart displays your real-time conversion rates. Hover over any node to view detailed, hour-by-hour metrics.
    </p>
  </div>

  <!-- Footer Actions -->
  <footer class="tour-card-footer">
    <div class="tour-left-actions">
      <button
        class="tour-btn tour-btn-link"
        type="button"
        aria-label="Skip onboarding tour">
        Skip Tour
      </button>
    </div>
    <div class="tour-right-actions">
      <button
        class="tour-btn tour-btn-secondary"
        type="button"
        aria-label="Go to previous step">
        Back
      </button>
      <button
        class="tour-btn tour-btn-primary"
        type="button"
        aria-label="Go to next step">
        Next
      </button>
    </div>
  </footer>
</div>
```

---

## 3. CSS Component Layout Rules

```css
/* Card Popover Positioning */
.tour-card {
  position: absolute;
  width: var(--tour-card-width);
  background-color: var(--tour-bg);
  color: var(--tour-text-primary);
  border: 1px solid var(--tour-border);
  border-radius: var(--tour-border-radius);
  padding: var(--tour-padding);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Header Spacing */
.tour-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tour-step-indicator {
  font-size: 12px;
  font-weight: 600;
  color: var(--tour-text-muted);
}

.tour-close-btn {
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: var(--tour-text-muted);
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Body Spacing */
.tour-card-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tour-card-title {
  font-size: 16px;
  font-weight: 700;
  margin: 0;
}

.tour-card-description {
  font-size: 14px;
  line-height: 1.5;
  color: var(--tour-text-muted);
  margin: 0;
}

/* Footer layout */
.tour-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4px;
}

.tour-right-actions {
  display: flex;
  gap: 8px;
}

/* Button Layout & Target Size compliance */
.tour-btn {
  font-size: 14px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  min-height: 36px; /* Meets layout target density */
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.tour-btn-primary {
  background-color: var(--tour-primary-cta);
  color: #ffffff;
  border: none;
}

.tour-btn-primary:hover {
  background-color: var(--tour-primary-cta-hover);
}

.tour-btn-secondary {
  background-color: var(--tour-secondary-cta);
  color: var(--tour-text-primary);
  border: 1px solid var(--tour-border);
}

.tour-btn-secondary:hover {
  background-color: var(--tour-secondary-cta-hover);
}

.tour-btn-link {
  background: transparent;
  border: none;
  color: var(--tour-text-muted);
  text-decoration: underline;
  padding: 0;
}

/* Arrow Placement */
.tour-card-arrow {
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
}

/* Arrow pointing bottom (card sits above the anchor) */
.tour-arrow-bottom {
  bottom: calc(-1 * var(--tour-arrow-size));
  left: 50%;
  transform: translateX(-50%);
  border-width: var(--tour-arrow-size) var(--tour-arrow-size) 0 var(--tour-arrow-size);
  border-color: var(--tour-bg) transparent transparent transparent;
  filter: drop-shadow(0 2px 1px rgba(0,0,0,0.05));
}
