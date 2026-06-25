# Logo Grid Blueprint: Responsive Trust Bar

This template provides a production-ready structure for a responsive logo grid that implements optical normalization and grayscale-to-color hover effects.

## 1. Structure (HTML)
Use a semantic `section` with a list-based or div-based grid.

```html
<section class="trust-bar">
  <div class="container">
    <h2 class="trust-bar__title">Trusted by industry leaders</h2>

    <div class="logo-grid">
      <!-- Logic: Add classes for optical adjustment (wide, square, tall) -->

      <div class="logo-grid__item wide">
        <img src="logos/google.svg" alt="Google" loading="lazy">
      </div>

      <div class="logo-grid__item square">
        <img src="logos/slack.svg" alt="Slack" loading="lazy">
      </div>

      <div class="logo-grid__item wide">
        <img src="logos/netflix.svg" alt="Netflix" loading="lazy">
      </div>

      <div class="logo-grid__item tall">
        <img src="logos/starbucks.svg" alt="Starbucks" loading="lazy">
      </div>

      <div class="logo-grid__item square">
        <img src="logos/airbnb.svg" alt="Airbnb" loading="lazy">
      </div>

      <div class="logo-grid__item wide">
        <img src="logos/stripe.svg" alt="Stripe" loading="lazy">
      </div>
    </div>
  </div>
</section>
```

## 2. Layout & Normalization (CSS)

```css
:root {
  /* Spacing Tokens */
  --logo-grid-gap: 2rem;
  --logo-max-height: 48px;
  --logo-opacity: 0.6;
  --logo-hover-opacity: 1;
}

.trust-bar {
  padding: 4rem 0;
  background-color: #f9f9f9;
  text-align: center;
}

.trust-bar__title {
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #666;
  margin-bottom: 3rem;
}

.logo-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Mobile default */
  gap: var(--logo-grid-gap);
  align-items: center; /* Vertical alignment */
  justify-items: center; /* Horizontal alignment */
  max-width: 1100px;
  margin: 0 auto;
}

/* Responsive Grid Scaling */
@media (min-width: 640px) {
  .logo-grid { grid-template-columns: repeat(3, 1fr); }
}

@media (min-width: 1024px) {
  .logo-grid { grid-template-columns: repeat(6, 1fr); }
}

/* Normalization Item */
.logo-grid__item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80px; /* Cell height for the horizon line */
}

.logo-grid__item img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: var(--logo-max-height);
  filter: grayscale(100%);
  opacity: var(--logo-opacity);
  transition: all 0.3s ease;
}

/* Hover Effect */
.logo-grid__item:hover img {
  filter: grayscale(0%);
  opacity: var(--logo-hover-opacity);
}

/* Optical Sizing Overrides */
.logo-grid__item.square img {
  max-height: calc(var(--logo-max-height) * 0.75);
}

.logo-grid__item.wide img {
  max-width: 160px; /* Prevent wide logos from becoming tiny */
}
```

## 3. Implementation Checklist
- [ ] **SVG preferred:** Ensure all logos are SVGs for infinite scalability and small file size.
- [ ] **Zero padding:** Ensure the SVG viewport (`viewBox`) is cropped tightly to the logo edges.
- [ ] **Lazy Loading:** Add `loading="lazy"` to all logos to improve initial page load speed.
- [ ] **Accessibility:** Confirm every `<img>` has a clear `alt` attribute or the parent section has a descriptive `aria-label`.
- [ ] **The "Squint Test":** Verify that no logo looks significantly heavier or larger than its neighbors when viewed with blurry vision.
