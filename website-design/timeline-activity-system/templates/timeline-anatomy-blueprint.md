# Timeline Anatomy Blueprint

This template provides a structural and CSS-logic guide for building a portable, accessible timeline component.

## 1. Structural Markup (HTML)

```html
<section class="timeline" aria-label="Activity Feed">
  <!-- Grouping Header -->
  <h2 class="timeline__group-title">Today</h2>

  <div class="timeline__list">
    <!-- Single Timeline Item -->
    <article class="timeline__item">
      <div class="timeline__track-zone">
        <div class="timeline__track-line"></div>
        <div class="timeline__marker" aria-hidden="true">
           <!-- Icon or Avatar SVG here -->
        </div>
      </div>

      <div class="timeline__content-zone">
        <header class="timeline__item-header">
          <time class="timeline__timestamp" datetime="2023-10-25T10:45:00Z">10:45 AM</time>
          <h3 class="timeline__item-title">Event Title or Subject</h3>
        </header>
        <div class="timeline__item-body">
          <p>Description of the activity or event goes here.</p>
        </div>
        <footer class="timeline__item-actions">
          <!-- Buttons or Links -->
        </footer>
      </div>
    </article>
  </div>
</section>
```

## 2. Spatial Logic (CSS/SCSS)

Use these variables to maintain the rhythm defined in the `fluid-spacing-system`.

```css
:root {
  --timeline-track-width: 2px;
  --timeline-marker-size: 32px;
  --timeline-gutter: var(--space-m); /* Space between track and content */
  --timeline-item-gap: var(--space-l); /* Vertical space between items */
}

.timeline__item {
  display: grid;
  grid-template-columns: var(--timeline-marker-size) 1fr;
  gap: var(--timeline-gutter);
  margin-bottom: var(--timeline-item-gap);
}

.timeline__track-zone {
  position: relative;
  display: flex;
  justify-content: center;
}

.timeline__track-line {
  position: absolute;
  top: 0;
  bottom: calc(-1 * var(--timeline-item-gap)); /* Extends to next item */
  width: var(--timeline-track-width);
  background-color: var(--color-neutral-200);
  z-index: 1;
}

/* Hide the last line segment */
.timeline__item:last-child .timeline__track-line {
  display: none;
}

.timeline__marker {
  position: relative;
  width: var(--timeline-marker-size);
  height: var(--timeline-marker-size);
  border-radius: 50%;
  background: var(--color-white);
  border: 2px solid var(--color-neutral-300);
  z-index: 2;
}
```

## 3. Visual Variables for States

| State | Visual Treatment |
| :--- | :--- |
| **Completed** | Track line: `var(--color-primary-500)`, Marker: `var(--color-primary-600)` |
| **Active/Current** | Marker: Pulses or has a thicker `var(--color-accent-500)` border. |
| **Pending/Future** | Track line: `dashed`, Marker: Grayscale/Lightened. |
| **Error** | Marker: `var(--color-error-600)` with Warning Icon. |

## 4. Mobile Adaptation

On small viewports (`< 600px`):
- Reduce `--timeline-gutter` to `var(--space-s)`.
- Ensure `--timeline-marker-size` remains at least `32px` for visibility.
- Content body should be full-width (avoid multi-column internal content).
