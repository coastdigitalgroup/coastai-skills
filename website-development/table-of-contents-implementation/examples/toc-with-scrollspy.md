# Example: Sticky Table of Contents with Scrollspy

This example demonstrates a common documentation-style layout where a Table of
Contents remains sticky in a sidebar and highlights the active section as the
user scrolls.

## Scenario

A technical blog post with several long sections. We want to improve navigation
by providing a ToC that:

1. Stays visible while reading.
2. Allows jumping to sections without being covered by the sticky header.
3. Shows the reader their current position.

## Before (Static Links)

Users have to scroll back to the top to navigate, and jump links are covered by
 the site's header.

```html
<!-- Site Header -->
<header style="position: sticky; top: 0; height: 60px; background: white;">
  Logo
</header>

<main>
  <!-- ToC is at the top and scrolls away -->
  <nav>
    <ul>
      <li><a href="#intro">Introduction</a></li>
      <li><a href="#setup">Setup</a></li>
    </ul>
  </nav>

  <h2 id="intro">Introduction</h2>
  <p>...</p>
  <!-- Problem: Clicking #setup lands exactly at the top,
       but the 60px header covers the H2 title. -->
  <h2 id="setup">Setup</h2>
  <p>...</p>
</main>
```

## After (Robust Implementation)

### 1. The Layout (HTML)

```html
<div class="page-wrapper">
  <!-- Sidebar ToC -->
  <aside class="sidebar">
    <nav class="toc" aria-label="Table of Contents">
      <ul id="toc-list">
        <li><a href="#intro" class="toc-link">Introduction</a></li>
        <li><a href="#setup" class="toc-link">Project Setup</a></li>
        <li><a href="#config" class="toc-link">Configuration</a></li>
        <li><a href="#usage" class="toc-link">Basic Usage</a></li>
      </ul>
    </nav>
  </aside>

  <!-- Main Content -->
  <article class="content">
    <h2 id="intro">Introduction</h2>
    <section>...</section>

    <h2 id="setup">Project Setup</h2>
    <section>...</section>

    <h2 id="config">Configuration</h2>
    <section>...</section>

    <h2 id="usage">Basic Usage</h2>
    <section>...</section>
  </article>
</div>
```

### 2. The Styling (CSS)

```css
/* Prevent header clipping */
h2[id] {
  scroll-margin-top: 80px; /* Header height + buffer */
}

/* Sticky sidebar */
.sidebar {
  position: sticky;
  top: 100px;
  height: fit-content;
}

/* Active state styling */
.toc-link.is-active {
  color: #007bff;
  font-weight: bold;
  border-left: 2px solid #007bff;
  padding-left: 0.5rem;
}

/* Smooth scrolling */
@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}
```

### 3. The Scrollspy (JavaScript)

```javascript
window.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    root: null,
    // Trigger when heading is in the top 20% of the viewport
    rootMargin: '-10% 0px -80% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const tocLink = document.querySelector(`.toc-link[href="#${id}"]`);

      if (entry.isIntersecting) {
        // Remove active class from all links
        document.querySelectorAll('.toc-link').forEach(link => {
          link.classList.remove('is-active');
          link.removeAttribute('aria-current');
        });

        // Add to current
        tocLink.classList.add('is-active');
        tocLink.setAttribute('aria-current', 'location');
      }
    });
  }, observerOptions);

  // Track all H2s that have an ID
  document.querySelectorAll('article h2[id]').forEach(section => {
    observer.observe(section);
  });
});
```

## Key Improvements

- **No Overlap:** `scroll-margin-top` ensures headings land perfectly below the
  sticky header.
- **Orientation:** The `.is-active` class provides a "You are here" signal.
- **Accessibility:** `aria-current="location"` communicates the active section
  to assistive technology.
- **Performance:** `IntersectionObserver` handles tracking without firing
  hundreds of events on scroll.
