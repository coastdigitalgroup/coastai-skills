# Store Locator Blueprint & Annotation Template

This blueprint provides a reusable, highly structured HTML structure, CSS layout, and spatial annotations designed for modern Store Locator interfaces. It includes ARIA tags for keyboard/screen-reader accessibility and responsive styling configurations.

---

## 1. Blueprint HTML Structure

Copy and customize this semantic HTML skeleton. It includes the necessary layout elements, accessibility attributes, and bidirectional anchors.

```html
<!-- Store Locator Container -->
<div class="store-locator-system" id="apex-locator">

  <!-- Accessibility Skip Link -->
  <a href="#locator-results-list" class="skip-to-results-link">Skip map and go to locations list</a>

  <!-- Mobile Viewport Tabs (Hidden on Desktop) -->
  <div class="locator-mobile-tabs" role="tablist" aria-label="Locator views">
    <button id="tab-list" class="tab-button active" role="tab" aria-selected="true" aria-controls="panel-list">
      List View (<span id="results-count-badge">0</span>)
    </button>
    <button id="tab-map" class="tab-button" role="tab" aria-selected="false" aria-controls="panel-map">
      Map View
    </button>
  </div>

  <!-- Main Content Layout Grid -->
  <div class="locator-main-layout">

    <!-- Sidebar Pane (List, Queries & Filters) -->
    <aside id="panel-list" class="locator-sidebar" role="tabpanel" aria-labelledby="tab-list">

      <!-- Search & Filter Header (Sticky) -->
      <header class="locator-header">
        <h1 class="locator-title">Find a Location</h1>

        <!-- Search Controls Form -->
        <form class="locator-search-form" role="search" aria-label="Location search">
          <div class="input-group">
            <label for="locator-search-input" class="visually-hidden">Enter address, city, or zip code</label>
            <input
              type="search"
              id="locator-search-input"
              placeholder="Enter City, State, or Postal Code"
              autocomplete="address-line1"
              required
            />
            <button type="button" class="geolocation-btn" aria-label="Find locations near my current position">
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24"><!-- Crosshair Icon --></svg>
            </button>
            <button type="submit" class="search-submit-btn">Search</button>
          </div>

          <!-- Quick Facet Filters -->
          <div class="filter-row">
            <div class="filter-select-wrapper">
              <label for="filter-radius" class="visually-hidden">Search Radius</label>
              <select id="filter-radius">
                <option value="10">10 Miles</option>
                <option value="25" selected>25 Miles</option>
                <option value="50">50 Miles</option>
              </select>
            </div>

            <div class="filter-checkbox-group">
              <label class="filter-chip">
                <input type="checkbox" id="filter-corporate" />
                <span>Flagships Only</span>
              </label>
              <label class="filter-chip">
                <input type="checkbox" id="filter-rentals" />
                <span>Gear Rentals</span>
              </label>
            </div>
          </div>
        </form>

        <!-- Dynamic Results Counter & Announcements (ARIA Live) -->
        <div class="locator-results-status" aria-live="polite" id="locator-announcements">
          <p class="results-summary">Showing 3 locations near <strong>Seattle, WA</strong></p>
        </div>
      </header>

      <!-- Results Scroll Area -->
      <div class="locator-results-list" id="locator-results-list" tabindex="-1">

        <!-- Result Card A (Active/Selected) -->
        <article
          class="location-card active"
          id="store-card-001"
          data-marker-id="marker-001"
          tabindex="0"
          aria-selected="true"
        >
          <div class="card-header">
            <span class="location-badge corporate">Corporate Flagship</span>
            <span class="location-distance" aria-label="0.8 miles away">0.8 mi</span>
          </div>
          <h2 class="location-name">Apex Flagship - Seattle</h2>
          <address class="location-address">
            500 Pine St, Seattle, WA 98101
          </address>
          <div class="location-status open">
            <span class="status-dot"></span>
            <strong>Open Now</strong> &middot; Closes at 8:00 PM
          </div>
          <div class="card-actions">
            <a href="https://maps.google.com?daddr=500+Pine+St+Seattle+WA+98101" class="btn btn-primary" target="_blank" rel="noopener">
              Get Directions
            </a>
            <a href="tel:+12065550190" class="btn btn-secondary">
              Call Store
            </a>
            <a href="/locations/seattle-flagship" class="card-details-link">
              View Details <span class="visually-hidden">about Apex Flagship Seattle</span>
            </a>
          </div>
        </article>

        <!-- Result Card B (Standard) -->
        <article
          class="location-card"
          id="store-card-002"
          data-marker-id="marker-002"
          tabindex="0"
          aria-selected="false"
        >
          <div class="card-header">
            <span class="location-badge dealer">Authorized Dealer</span>
            <span class="location-distance" aria-label="4.5 miles away">4.5 mi</span>
          </div>
          <h2 class="location-name">Pacific Outfitters</h2>
          <address class="location-address">
            1200 Westlake Ave N, Seattle, WA 98109
          </address>
          <div class="location-status closed">
            <span class="status-dot"></span>
            <strong>Closed</strong> &middot; Opens tomorrow at 9:00 AM
          </div>
          <div class="card-actions">
            <a href="https://maps.google.com?daddr=1200+Westlake+Ave+N+Seattle+WA+98109" class="btn btn-primary" target="_blank" rel="noopener">
              Get Directions
            </a>
            <a href="tel:+12065550143" class="btn btn-secondary">
              Call Store
            </a>
          </div>
        </article>

      </div>
    </aside>

    <!-- Map Pane -->
    <section id="panel-map" class="locator-map-container" role="tabpanel" aria-labelledby="tab-map">
      <!-- Hidden Title for Landmarks -->
      <h2 class="visually-hidden">Interactive Map Locations</h2>

      <!-- Interactive Map Frame (Leaflet/Mapbox/Google Target) -->
      <div id="locator-map-canvas" class="map-canvas" aria-hidden="true">
        <!-- Interactive map initialized here -->
      </div>

      <!-- Search-This-Area Floating Trigger (Hidden until map is panned) -->
      <button class="search-area-btn hidden" id="search-area-btn">
        Search this area
      </button>

      <!-- Visual instructions overlay for mobile (revealed on single-touch attempts) -->
      <div class="map-gesture-overlay hidden" id="map-gesture-overlay">
        <p>Use two fingers to move the map</p>
      </div>
    </section>

  </div>
</div>
```

---

## 2. Layout & Responsive CSS Styling (CSS Variables & Grids)

Use this production-ready CSS block. It implements independent scrolling sidebars, responsive breakpoints, mobile tab toggling, and layout-shift mitigations.

```css
/* Core Custom Properties for Spatial System */
:root {
  --locator-sidebar-width: 420px;
  --locator-header-bg: #ffffff;
  --locator-border-color: #e2e8f0;
  --color-open: #10b981;
  --color-closed: #ef4444;
  --color-active-glow: rgba(59, 130, 246, 0.15);
  --space-m: 1.5rem;
  --space-s: 1rem;
  --space-xs: 0.5rem;
  --min-touch-target: 44px;
}

/* Master Layout Wrapper */
.store-locator-system {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 80vh; /* Controlled viewport height */
  min-height: 500px;
  border: 1px solid var(--locator-border-color);
  font-family: system-ui, -apple-system, sans-serif;
  overflow: hidden;
  position: relative;
}

/* Skip Navigation Link */
.skip-to-results-link {
  position: absolute;
  top: -100px;
  left: 10px;
  background: #2563eb;
  color: white;
  padding: 10px 15px;
  border-radius: 4px;
  z-index: 9999;
  font-weight: bold;
  text-decoration: none;
}
.skip-to-results-link:focus {
  top: 10px;
}

/* Desktop Dual Pane Layout */
.locator-main-layout {
  display: grid;
  grid-template-columns: var(--locator-sidebar-width) 1fr;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* Sidebar Column Layout */
.locator-sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
  border-right: 1px solid var(--locator-border-color);
  background: #ffffff;
  overflow: hidden;
  position: relative;
}

/* Sticky Header containing Inputs and Filters */
.locator-header {
  padding: var(--space-m);
  border-bottom: 1px solid var(--locator-border-color);
  background: var(--locator-header-bg);
  flex-shrink: 0; /* Prevents vertical collapsing */
}

/* Scrollable Location List Panel */
.locator-results-list {
  flex-grow: 1;
  overflow-y: auto; /* Independent list scroll */
  padding: var(--space-m);
  background: #f8fafc;
  scroll-behavior: smooth;
  outline: none; /* Focus outline managed programmatically */
}

/* Location Card Styling */
.location-card {
  background: #ffffff;
  border: 1px solid var(--locator-border-color);
  border-radius: 8px;
  padding: var(--space-s);
  margin-bottom: var(--space-s);
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;
  position: relative;
}

.location-card:hover {
  border-color: #cbd5e1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.location-card.active {
  border-color: #2563eb;
  background-color: var(--color-active-glow);
  box-shadow: 0 0 0 1px #2563eb;
}

.location-card:focus-visible {
  outline: 3px solid #3b82f6;
  outline-offset: 2px;
}

/* Mobile Tabs Control (Default: Hidden) */
.locator-mobile-tabs {
  display: none;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  border-bottom: 1px solid var(--locator-border-color);
  background: #ffffff;
  flex-shrink: 0;
}

.tab-button {
  padding: 12px;
  text-align: center;
  font-size: 0.95rem;
  font-weight: bold;
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
}

.tab-button.active {
  border-bottom-color: #2563eb;
  color: #2563eb;
}

/* Map Canvas Container */
.locator-map-container {
  height: 100%;
  width: 100%;
  position: relative;
  background: #e2e8f0; /* Backdrop to minimize flash on load */
}

.map-canvas {
  height: 100%;
  width: 100%;
}

/* Floating Controls Layer */
.search-area-btn {
  position: absolute;
  top: var(--space-s);
  left: 50%;
  transform: translateX(-50%);
  background: #ffffff;
  border: 1px solid var(--locator-border-color);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;
  z-index: 1000;
  transition: opacity 0.2s, transform 0.2s;
}

.search-area-btn.hidden {
  opacity: 0;
  pointer-events: none;
  transform: translateX(-50%) translateY(-10px);
}

/* Mobile Gesture Avoidance Overlay */
.map-gesture-overlay {
  position: absolute;
  inset: 0;
  background: rgba(15, 23, 42, 0.7);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  font-weight: bold;
  opacity: 1;
  transition: opacity 0.3s;
  pointer-events: none;
}

.map-gesture-overlay.hidden {
  opacity: 0;
}

/* RESPONSIVE BREAKPOINT - MOBILE TABLET PANELS */
@media (max-width: 768px) {
  .store-locator-system {
    height: 90vh; /* Taller viewport limits on mobile screens */
  }

  .locator-mobile-tabs {
    display: grid; /* Reveal tab switcher */
  }

  .locator-main-layout {
    grid-template-columns: 1fr; /* Stack layout to full-width */
  }

  /* Hide list pane when Map tab is selected */
  .store-locator-system:not(.show-map) .locator-map-container {
    display: none;
  }

  /* Hide map pane when List tab is selected */
  .store-locator-system.show-map .locator-sidebar {
    display: none;
  }
}
```
