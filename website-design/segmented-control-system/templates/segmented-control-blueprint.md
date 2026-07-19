# Template: Segmented Control Blueprint

This blueprint provides a production-ready, fully accessible, and responsive template for implementing a **Segmented Control** (Button Group toggle). It contains semantic HTML templates (for both Radio Group and Tablist contexts), a modern CSS layout configuration, and precise visual specification annotations.

---

## 1. HTML Templates

### Pattern A: Radio Group Context (Form Inputs / Micro-filters)
Use this template when the segmented control edits a value inside a form, filters a single data set, or updates configuration variables.

```html
<!-- Segmented Control Track -->
<div
  class="segmented-control"
  role="radiogroup"
  aria-label="Select pricing cycle"
  data-segmented-control
>
  <!-- Active sliding background element (managed via CSS & optional JS) -->
  <span class="segmented-control__indicator" aria-hidden="true" data-indicator></span>

  <!-- Segment Option 1 (Active) -->
  <button
    type="button"
    class="segmented-control__button segmented-control__button--active"
    role="radio"
    aria-checked="true"
    tabindex="0"
    data-value="monthly"
  >
    Monthly
  </button>

  <!-- Segment Option 2 (Inactive) -->
  <button
    type="button"
    class="segmented-control__button"
    role="radio"
    aria-checked="false"
    tabindex="-1"
    data-value="annual"
  >
    Annual <span class="segmented-control__badge">-20%</span>
  </button>

  <!-- Segment Option 3 (Inactive) -->
  <button
    type="button"
    class="segmented-control__button"
    role="radio"
    aria-checked="false"
    tabindex="-1"
    data-value="lifetime"
  >
    Lifetime
  </button>
</div>
```

### Pattern B: Tablist Context (View Swapping / Panel Controllers)
Use this template when switching between distinct view panels (e.g., "Grid vs. List" layouts).

```html
<!-- Tablist Navigation Track -->
<div
  class="segmented-control"
  role="tablist"
  aria-label="View mode selection"
>
  <span class="segmented-control__indicator" aria-hidden="true" data-indicator></span>

  <button
    type="button"
    id="tab-grid"
    class="segmented-control__button segmented-control__button--active"
    role="tab"
    aria-selected="true"
    aria-controls="panel-grid"
    tabindex="0"
  >
    <svg class="segmented-control__icon" aria-hidden="true" viewBox="0 0 16 16" width="16" height="16">
      <rect x="2" y="2" width="5" height="5" rx="1" fill="currentColor"/>
      <rect x="9" y="2" width="5" height="5" rx="1" fill="currentColor"/>
      <rect x="2" y="9" width="5" height="5" rx="1" fill="currentColor"/>
      <rect x="9" y="9" width="5" height="5" rx="1" fill="currentColor"/>
    </svg>
    Grid View
  </button>

  <button
    type="button"
    id="tab-list"
    class="segmented-control__button"
    role="tab"
    aria-selected="false"
    aria-controls="panel-list"
    tabindex="-1"
  >
    <svg class="segmented-control__icon" aria-hidden="true" viewBox="0 0 16 16" width="16" height="16">
      <rect x="2" y="3" width="12" height="2" rx="0.5" fill="currentColor"/>
      <rect x="2" y="7" width="12" height="2" rx="0.5" fill="currentColor"/>
      <rect x="2" y="11" width="12" height="2" rx="0.5" fill="currentColor"/>
    </svg>
    List View
  </button>
</div>

<!-- Associated View Panels -->
<div id="panel-grid" role="tabpanel" aria-labelledby="tab-grid">
  <!-- Grid Items Go Here -->
</div>
<div id="panel-list" role="tabpanel" aria-labelledby="tab-list" hidden>
  <!-- List Items Go Here -->
</div>
```

---

## 2. Modern CSS Stylesheet

This CSS provides a robust, zero-CLS layout. It supports a static active indicator layout by default, and can easily adapt to a dynamic sliding indicator using modern CSS grid/flex or coordinate transforms.

```css
/* Custom Properties for Global Theme Alignment */
:root {
  --sc-track-bg: #f1f5f9;
  --sc-track-padding: 4px;
  --sc-track-radius: 12px;
  --sc-button-radius: 8px;
  --sc-button-padding-v: 8px;
  --sc-button-padding-h: 16px;
  --sc-font-size: 14px;

  --sc-text-default: #475569;
  --sc-text-active: #0f172a;
  --sc-text-disabled: #94a3b8;

  --sc-indicator-bg: #ffffff;
  --sc-indicator-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
  --sc-focus-ring: 2px solid #2563eb;
}

/* Dark Mode Overrides (Optional) */
@media (prefers-color-scheme: dark) {
  :root {
    --sc-track-bg: #1e293b;
    --sc-text-default: #94a3b8;
    --sc-text-active: #f8fafc;
    --sc-indicator-bg: #334155;
    --sc-indicator-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  }
}

/* 1. Track Layout */
.segmented-control {
  position: relative;
  display: inline-flex;
  width: 100%;
  max-width: 480px;
  background-color: var(--sc-track-bg);
  padding: var(--sc-track-padding);
  border-radius: var(--sc-track-radius);
  user-select: none;
  isolation: isolate; /* Ensures active indicator sits below button text layers */
  box-sizing: border-box;
}

/* 2. Individual Segment Button */
.segmented-control__button {
  position: relative;
  flex: 1 1 0%; /* Ensures equal horizontal distribution */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 36px; /* Touch target minimum height inside 44px track */
  padding: var(--sc-button-padding-v) var(--sc-button-padding-h);
  font-family: inherit;
  font-size: var(--sc-font-size);
  font-weight: 500;
  line-height: 1.25;
  color: var(--sc-text-default);
  background: transparent;
  border: none;
  border-radius: var(--sc-button-radius);
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  transition: color 0.15s ease, opacity 0.15s ease;
  z-index: 2; /* Sits above the active indicator background */
}

/* Hover State (Subtle highlight) */
.segmented-control__button:hover:not(:disabled):not(.segmented-control__button--active) {
  color: var(--sc-text-active);
  opacity: 0.85;
}

/* Active / Selected Button State */
.segmented-control__button--active {
  color: var(--sc-text-active);
  font-weight: 600;
}

/* Focus State Configuration (Excludes mouse users with :focus-visible) */
.segmented-control__button:focus-visible {
  outline: var(--sc-focus-ring);
  outline-offset: 2px;
  z-index: 3; /* Lift focus ring above other components */
}

/* Disabled State */
.segmented-control__button:disabled {
  color: var(--sc-text-disabled);
  cursor: not-allowed;
  opacity: 0.5;
}

/* Integrated Mini Badge */
.segmented-control__badge {
  display: inline-flex;
  align-items: center;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 6px;
  background-color: #dcfce7; /* Green tint */
  color: #15803d;
  border-radius: 9999px;
  line-height: 1;
}

/* Supporting Icon Styling */
.segmented-control__icon {
  flex-shrink: 0;
  width: 14px;
  height: 14px;
  color: inherit;
}

/* 3. Physical Sliding Indicator */
.segmented-control__indicator {
  position: absolute;
  top: var(--sc-track-padding);
  bottom: var(--sc-track-padding);
  left: var(--sc-track-padding);
  background-color: var(--sc-indicator-bg);
  border-radius: var(--sc-button-radius);
  box-shadow: var(--sc-indicator-shadow);
  z-index: 1; /* Sits behind text, above track */

  /* Slide transform speed - matches transition framework */
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), width 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 4. Motion Accessibility (Reduced motion override) */
@media (prefers-reduced-motion: reduce) {
  .segmented-control__indicator {
    transition: none !important; /* Disables slider slide effect */
  }
  .segmented-control__button {
    transition: none !important;
  }
}
```

---

## 3. Dynamic Sliding Indicator JavaScript Boilerplate

To implement a frictionless, fully responsive "sliding track" effect without hardcoding widths, attach this vanilla JS listener to update the active indicator's coordinates dynamically on state changes.

```javascript
document.addEventListener("DOMContentLoaded", () => {
  const controls = document.querySelectorAll("[data-segmented-control]");

  controls.forEach((control) => {
    const indicator = control.querySelector("[data-indicator]");
    const buttons = control.querySelectorAll(".segmented-control__button");

    function updateIndicator(activeButton) {
      if (!indicator || !activeButton) return;

      // Calculate relative coordinates
      const trackRect = control.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();

      const leftOffset = buttonRect.left - trackRect.left;
      const width = buttonRect.width;

      // Apply hardware accelerated transition transforms
      indicator.style.width = `${width}px`;
      indicator.style.transform = `translateX(${leftOffset}px)`;
    }

    // Initialize position on load
    const activeBtn = control.querySelector(".segmented-control__button--active");
    if (activeBtn) {
      updateIndicator(activeBtn);
    }

    // Attach click events to handle visual transition
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => {
          b.classList.remove("segmented-control__button--active");
          b.setAttribute("aria-checked", "false");
          b.setAttribute("tabindex", "-1");
        });

        btn.classList.add("segmented-control__button--active");
        btn.setAttribute("aria-checked", "true");
        btn.setAttribute("tabindex", "0");

        updateIndicator(btn);
        btn.focus();
      });
    });

    // Recalculate on screen resize to prevent alignment breakage
    window.addEventListener("resize", () => {
      const active = control.querySelector(".segmented-control__button--active");
      if (active) updateIndicator(active);
    });
  });
});
```
