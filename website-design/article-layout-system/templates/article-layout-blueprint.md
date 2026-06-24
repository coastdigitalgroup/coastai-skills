# Article Layout Blueprint

This template provides a structural and CSS blueprint for implementing a
reading-optimized article page.

## 1. HTML Anatomy

```html
<article class="article">
  <!-- Progress Indicator -->
  <div class="article__progress" aria-hidden="true"></div>

  <!-- Header Section -->
  <header class="article__header">
    <div class="article__meta">
      <span class="article__category">Design Systems</span>
      <span class="article__read-time">6 min read</span>
    </div>
    <h1 class="article__title">The Anatomy of a Perfect Reading Experience</h1>
    <p class="article__lead">A lead paragraph that sets the stage in a slightly larger font size.</p>
  </header>

  <!-- Sticky Wayfinding (Desktop only) -->
  <aside class="article__toc-container">
    <nav class="article__toc">
      <h3>On this page</h3>
      <ul>
        <li><a href="#section-1">The Golden Ratio</a></li>
        <li><a href="#section-2">Vertical Rhythm</a></li>
      </ul>
    </nav>
  </aside>

  <!-- Body Content -->
  <div class="article__content">
    <p>Body paragraphs start here...</p>

    <h2 id="section-1">The Golden Ratio</h2>
    <p>Further explanation...</p>

    <blockquote class="article__pull-quote">
      "Design is not just what it looks like and feels like. Design is how it works."
    </blockquote>

    <div class="article__callout article__callout--info">
      <h4>Pro Tip</h4>
      <p>Use a line-height of 1.5 to 1.6 for optimal readability.</p>
    </div>

    <figure class="article__figure article__figure--wide">
      <img src="example.jpg" alt="A descriptive caption">
      <figcaption>Figure 1: Comparison of different line lengths.</figcaption>
    </figure>
  </div>
</article>
```

## 2. CSS Specification (Variables)

```css
:root {
  /* The "Measure" (Container width) */
  --article-text-width: 65ch;
  --article-wide-width: 90ch;
  --article-full-width: 100%;

  /* Vertical Rhythm */
  --article-space-xs: 0.75rem;
  --article-space-sm: 1.5rem;   /* 1x base */
  --article-space-md: 3rem;     /* 2x base */
  --article-space-lg: 4.5rem;   /* 3x base */

  /* Typography */
  --article-body-size: 1.25rem; /* 20px base */
  --article-body-leading: 1.6;
}

.article__content {
  display: grid;
  grid-template-columns: 1fr min(var(--article-text-width), calc(100% - 2rem)) 1fr;
}

/* All direct children stay in the center column by default */
.article__content > * {
  grid-column: 2;
  margin-top: 0;
  margin-bottom: var(--article-space-sm);
}

/* Headings have more space above than below */
.article__content h2 {
  margin-top: var(--article-space-md);
  margin-bottom: var(--article-space-xs);
}

/* Pull quotes and Wide images break the container slightly */
.article__pull-quote,
.article__figure--wide {
  grid-column: 1 / 4;
  justify-self: center;
  max-width: var(--article-wide-width);
  width: 100%;
}
```

## 3. Decision Matrix for Content Blocks

| Element | Max Width | Spacing (Top/Bottom) | Visual Style |
| :--- | :--- | :--- | :--- |
| **Body Text** | 65ch | 0 / 1.5rem | Serif or highly legible Sans |
| **H2 / H3** | 65ch | 3rem / 0.75rem | Bold, high contrast |
| **Pull Quote** | 85ch | 3rem / 3rem | Italic, Larger size, centered |
| **Callout Box**| 65ch | 2rem / 2rem | Background color + border |
| **Wide Media**| 90ch | 3rem / 3rem | Captioned, centered |

## 4. Accessibility Checklist

- [ ] Body text contrast is at least 4.5:1.
- [ ] Font size is at least 1rem (16px).
- [ ] Headings follow a logical `h1` -> `h2` -> `h3` hierarchy.
- [ ] Pull quotes and callouts are accessible to screen readers.
- [ ] Links within text are underlined or highly distinct.
