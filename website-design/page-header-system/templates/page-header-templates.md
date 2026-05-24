# Page Header Templates

These templates provide a structural foundation for implementing page headers
with proper semantics and accessibility.

## 1. Dashboard Header Template (HTML/CSS Structure)

```html
<header class="page-header page-header--dashboard">
  <!-- 1. Wayfinding -->
  <nav class="breadcrumb" aria-label="Breadcrumb">
    <ol>
      <li><a href="/dashboard">Home</a></li>
      <li><a href="/projects" aria-current="page">Projects</a></li>
    </ol>
  </nav>

  <div class="page-header__main">
    <div class="page-header__content">
      <!-- 2. Title & Identity -->
      <h1 class="page-header__title">Project Alpha</h1>

      <!-- 3. Metadata & Status -->
      <div class="page-header__meta">
        <span class="badge badge--success">Active</span>
        <span class="text-muted">Updated 5m ago</span>
      </div>
    </div>

    <!-- 4. Actions -->
    <div class="page-header__actions">
      <button class="btn btn--secondary">Settings</button>
      <button class="btn btn--primary">Launch Project</button>
    </div>
  </div>
</header>
```

---

## 2. Article Header Template (Centered)

```html
<header class="page-header page-header--article">
  <div class="page-header__container">
    <!-- Wayfinding -->
    <a href="/blog" class="back-link">← Back to Blog</a>

    <!-- Title -->
    <h1 class="article-title">The Future of Web Design</h1>

    <!-- Metadata -->
    <div class="article-meta">
      <img src="avatar.jpg" alt="Author Name" class="avatar">
      <div class="article-meta__text">
        <p class="author-name">Alex Rivera</p>
        <p class="publish-date">October 12, 2023 • 5 min read</p>
      </div>
    </div>
  </div>
</header>
```

---

## 3. Structural Checklist for Custom Headers

Use this checklist when building a new page header variation:

- [ ] **Semantic Wrapper:** Is it wrapped in a `<header>` tag?
- [ ] **Single H1:** Does it contain the unique `<h1>` for the page?
- [ ] **Nav Role:** Do breadcrumbs use `<nav>` with a descriptive `aria-label`?
- [ ] **Flexbox/Grid:** Does the layout use a responsive container that handles
      wrapping?
- [ ] **Action Priority:** Is the primary action visually distinct (CSS class)?
- [ ] **Z-Index:** If sticky, does it have a defined z-index and background
      color?
- [ ] **Safe Space:** Is there enough padding (spacing tokens) to prevent
      crowding?
