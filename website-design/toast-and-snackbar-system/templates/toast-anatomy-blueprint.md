# Template: Toast & Snackbar Anatomy Blueprint

Use this reusable HTML and CSS template as a production-ready boilerplate for your design system. It includes annotations, responsive styles, accessibility attributes, and structural variables.

---

## 1. HTML Boilerplate Structure

This markup uses the semantic Description List pattern or standard layout divs wrapped in an ARIA-compliant status container.

```html
<!-- Toast Container: Mount this once at the root of your HTML <body> -->
<div
  id="toast-queue-container"
  class="toast-container-desktop-right"
  aria-live="polite"
  aria-atomic="true"
>
  <!-- Individual Toast Template: Inject these dynamically via JS or framework -->
  <div
    class="toast-item toast-success"
    id="toast-item-001"
    role="status"
    data-autodismiss="true"
    data-duration="8000"
  >
    <!-- Visual Indicator Icon -->
    <div class="toast-icon-wrapper" aria-hidden="true">
      <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
    </div>

    <!-- Message Body Content -->
    <div class="toast-content">
      <h4 class="toast-title">Changes Saved Successfully</h4>
      <p class="toast-description">Your profile settings have been synchronized across devices.</p>
    </div>

    <!-- Interactive Action Button (Optional) -->
    <button class="toast-action-btn" type="button" aria-label="Undo settings sync">
      Undo
    </button>

    <!-- Dismiss Button -->
    <button class="toast-close-btn" type="button" aria-label="Dismiss notification">
      <svg class="toast-close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <!-- Visual Expiration Progress Bar -->
    <div class="toast-progress-bar" aria-hidden="true"></div>
  </div>
</div>
```

---

## 2. Standardized CSS Layout & Responsive Styles

This stylesheet maps to the fluid layout system and includes breakpoints that transform the desktop right-side stack into a mobile-first snackbar.

```css
/* ==========================================================================
   Toast Container & Placement Rules
   ========================================================================== */
#toast-queue-container {
  position: fixed;
  z-index: 5500;
  display: flex;
  flex-direction: column;
  gap: 12px;
  pointer-events: none; /* Allows clicks to pass through empty regions */
}

/* Placement variants */
.toast-container-desktop-right {
  top: 24px;
  right: 24px;
  width: 360px;
  max-width: 100vw;
}

.toast-container-desktop-left {
  top: 24px;
  left: 24px;
  width: 360px;
  max-width: 100vw;
}

/* ==========================================================================
   Individual Toast Item Anatomy
   ========================================================================== */
.toast-item {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
  padding: 16px;
  background-color: var(--toast-bg, #ffffff);
  border: 1px solid var(--toast-border, #e5e7eb);
  border-radius: var(--toast-radius, 8px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04);
  pointer-events: auto; /* Restores clicking within individual toasts */
  transition: transform 250ms cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms ease;
  overflow: hidden;
}

/* Entrance Animations */
.toast-item.entering {
  transform: translateX(100%);
  opacity: 0;
}

.toast-item.active {
  transform: translateX(0);
  opacity: 1;
}

.toast-item.exiting {
  transform: translateY(-20px);
  opacity: 0;
}

/* ==========================================================================
   Internal Child Elements
   ========================================================================== */
.toast-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  margin-top: 2px;
}

.toast-icon {
  width: 20px;
  height: 20px;
}

/* Color Status Variations */
.toast-success .toast-icon { color: #16a34a; }
.toast-warning .toast-icon { color: #ca8a04; }
.toast-error .toast-icon   { color: #dc2626; }
.toast-info .toast-icon    { color: #2563eb; }

.toast-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.toast-title {
  margin: 0;
  font-family: system-ui, sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
  color: #111827;
}

.toast-description {
  margin: 0;
  font-family: system-ui, sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.45;
  color: #4b5563;
}

/* CTA Action Button */
.toast-action-btn {
  flex-shrink: 0;
  background: none;
  border: none;
  font-family: system-ui, sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: var(--toast-action-link, #2563eb);
  cursor: pointer;
  padding: 6px 10px;
  margin-top: -4px;
  margin-right: -4px;
  border-radius: 4px;
  transition: background-color 150ms ease;
}

.toast-action-btn:hover {
  background-color: #f3f4f6;
  color: #1d4ed8;
}

.toast-action-btn:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}

/* Manual Dismiss Close Trigger */
.toast-close-btn {
  flex-shrink: 0;
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 4px;
  margin-top: -2px;
  margin-right: -2px;
  border-radius: 4px;
  transition: color 150ms ease, background-color 150ms ease;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toast-close-btn:hover {
  color: #4b5563;
  background-color: #f3f4f6;
}

.toast-close-btn:focus-visible {
  outline: 2px solid #4b5563;
  outline-offset: 2px;
}

.toast-close-icon {
  width: 16px;
  height: 16px;
}

/* Expiration Progress Indicator */
.toast-progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  width: 100%;
  background-color: var(--toast-action-link, #2563eb);
  transform-origin: left;
  transform: scaleX(1);
}

/* Animation for progress countdown */
.toast-item.active .toast-progress-bar {
  animation: countdown var(--duration-ms, 8000ms) linear forwards;
}

/* Pause animation on hover */
#toast-queue-container:hover .toast-progress-bar,
.toast-item:focus-within .toast-progress-bar {
  animation-play-state: paused;
}

@keyframes countdown {
  from { transform: scaleX(1); }
  to { transform: scaleX(0); }
}

/* ==========================================================================
   Responsive Adaptations (Viewport < 600px)
   ========================================================================== */
@media (max-width: 600px) {
  #toast-queue-container {
    bottom: 16px;
    top: auto !important;
    left: 16px !important;
    right: 16px !important;
    width: auto !important;
    max-width: calc(100% - 32px);
  }

  .toast-item {
    flex-direction: column; /* Stack actions below text on mobile */
    align-items: stretch;
    gap: 12px;
    padding: 16px;
  }

  .toast-icon-wrapper {
    position: absolute;
    top: 16px;
    left: 16px;
  }

  .toast-content {
    padding-left: 36px; /* Offset text column from absolute icon */
  }

  .toast-close-btn {
    position: absolute;
    top: 12px;
    right: 12px;
  }

  /* Mobile Action Group Container */
  .toast-action-btn {
    align-self: flex-end;
    width: auto;
    text-align: right;
    padding: 10px 16px;
    background-color: #f3f4f6; /* Make action more distinct on mobile */
    border-radius: 6px;
    margin-top: 4px;
  }
}
```

---

## 3. Visual Annotations for Figma or Asset Hand-offs

When designing these elements in Figma, Sketch, or Penpot, include these standard layout and spec notes to guide engineering implementation:

1. **Overlay Layer Position:** Label the primary container `#toast-queue-container` as fixed layout `(Fixed Position)` with safe-area spacing corresponding to outer margins.
2. **Animation curve description:** Note in transition specifications that any vertical shifting or expansion of the toast list uses the transition style `transition: all 300ms cubic-bezier(0.16, 1, 0.3, 1)` to prevent instant, jarring layout jerking when items are added/deleted.
3. **Contrast Verification Tag:** Append validation markers on style definitions:
   - Green text against white surface: hex `#16a34a` (passes WCAG AA 4.5:1 with size > 14px bold).
   - Blue CTA action link against white surface: hex `#2563eb` (passes WCAG AA 4.5:1 with size > 14px bold).
4. **Interactive Focus Indicators:** Ensure that active focused rings for both the Action and Dismiss buttons bypass default browser outlines, showing high-contrast outer double-rings (`outline: 2px solid offset`).
