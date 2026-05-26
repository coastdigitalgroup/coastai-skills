# Example: Converting a Media Card to RTL

This example demonstrates how to convert a standard "Media Card" component from
using physical CSS properties (left/right) to logical properties that support
both Left-to-Right (LTR) and Right-to-Left (RTL) layouts seamlessly.

## Before: Physical Properties (LTR-only)

In this version, the layout is hardcoded to work for LTR. If `dir="rtl"` is
applied to the parent, the layout remains stuck on the left.

### HTML
```html
<div class="card">
  <img src="avatar.jpg" class="card-image" alt="User Profile">
  <div class="card-content">
    <h3 class="card-title">John Doe</h3>
    <p class="card-text">Software Engineer based in New York.</p>
    <button class="card-button">
      View Profile
      <span class="icon-arrow-right">→</span>
    </button>
  </div>
</div>
```

### CSS
```css
.card {
  display: flex;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
}

.card-image {
  width: 100px;
  height: 100px;
  margin-right: 16px; /* Physical Right */
}

.card-content {
  text-align: left; /* Physical Left */
}

.card-button {
  padding-left: 12px; /* Physical Left */
  padding-right: 20px; /* Physical Right */
}

.icon-arrow-right {
  margin-left: 8px; /* Physical Left */
}
```

---

## After: Logical Properties (Bi-directional)

By replacing physical properties with logical ones, the card now adapts
automatically when the `dir` attribute changes.

### HTML
```html
<!-- Simply change dir="rtl" on the parent or html tag -->
<div class="card" dir="rtl">
  <img src="avatar.jpg" class="card-image" alt="User Profile">
  <div class="card-content">
    <h3 class="card-title">John Doe</h3>
    <p class="card-text">Software Engineer based in New York.</p>
    <button class="card-button">
      View Profile
      <span class="icon-arrow-right">→</span>
    </button>
  </div>
</div>
```

### CSS
```css
.card {
  display: flex;
  border: 1px solid #ccc;
  /* Logical corner radii */
  border-radius: 8px;
  /* If you wanted specific corners:
     border-start-start-radius: 8px;
  */
  overflow: hidden;
}

.card-image {
  width: 100px;
  height: 100px;
  /* Logical Inline End (Right in LTR, Left in RTL) */
  margin-inline-end: 16px;
}

.card-content {
  /* Logical Start (Left in LTR, Right in RTL) */
  text-align: start;
}

.card-button {
  /* Logical Inline Paddings */
  padding-inline-start: 12px;
  padding-inline-end: 20px;
}

.icon-arrow-right {
  /* Logical Inline Start */
  margin-inline-start: 8px;
}

/* Handle the directional icon */
[dir="rtl"] .icon-arrow-right {
  display: inline-block;
  transform: scaleX(-1);
}
```

## Key Improvements
1.  **Reduced CSS Size:** We no longer need separate `.rtl-card` classes or
    overrides.
2.  **Automatic Adaptation:** The layout "just works" when the user switches
    languages.
3.  **Future Proof:** New properties added to the card will follow the logical
    pattern, preventing regressions in RTL mode.
