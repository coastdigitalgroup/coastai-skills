# List-to-Detail Morphing Example

This example demonstrates how to use the View Transitions API to morph a product image from a list item into a hero image on a detail page.

## Before (Without View Transitions)

When a user clicks a product, the app immediately swaps the DOM. The user sees a jarring jump as the list disappears and the detail view appears.

```javascript
// Traditional state update
function showDetails(productId) {
  const product = data.find(p => p.id === productId);
  renderDetailView(product); // Jarring jump
}
```

## After (With View Transitions)

By using `document.startViewTransition` and `view-transition-name`, the browser can animate the image from its old position to its new one.

### 1. The CSS (Applied to both list and detail images)

We assign a unique `view-transition-name` to the element that persists. Note that in a real list, you would apply this dynamically only to the item being clicked.

```css
/* detail.css */
.hero-image {
  view-transition-name: product-hero;
}

/* list.css */
/* Dynamically applied when clicking */
.is-transitioning {
  view-transition-name: product-hero;
}
```

### 2. The JavaScript (Handling the transition)

```javascript
async function showDetails(productId, clickedElement) {
  const product = data.find(p => p.id === productId);

  // 1. Add the transition name to the clicked image
  const img = clickedElement.querySelector('img');
  img.style.viewTransitionName = 'product-hero';

  // 2. Start the transition
  const transition = document.startViewTransition(() => {
    // 3. Remove the name from the old image (optional, as it's being removed)
    img.style.viewTransitionName = '';

    // 4. Update the DOM
    renderDetailView(product);

    // The new hero image in the detail view already has
    // view-transition-name: product-hero in its CSS.
  });

  // Optional: Handle the transition lifecycle
  try {
    await transition.finished;
    console.log('Transition complete');
  } catch (e) {
    console.error('Transition failed or was skipped');
  }
}
```

## Multi-Page App (MPA) Example

For standard page navigations, you only need CSS.

### Page A (index.html)
```html
<style>
  @view-transition { navigation: auto; }
  .thumbnail { view-transition-name: product-hero; }
</style>
<a href="detail.html"><img src="item.jpg" class="thumbnail"></a>
```

### Page B (detail.html)
```html
<style>
  @view-transition { navigation: auto; }
  .hero { view-transition-name: product-hero; }
</style>
<img src="item.jpg" class="hero">
```

The browser will automatically animate the image from Page A to its new position on Page B.
