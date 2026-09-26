# CSS Scope & Nesting Heuristics and Browser Behavior Reference

## 1. W3C `@scope` Specification Mechanics

The W3C CSS Scoping Module Level 1 introduces `@scope` to establish scoping roots and scoping limits in CSS without DOM mutation or shadow DOM tree detachment.

### Syntax Anatomy

```css
@scope (<scoping-root>) [to (<scoping-limit>)] {
  /* Scoped style rules */
}
```

- **Scoping Root (`<scoping-root>`):** A CSS selector identifying the element(s) at the top of the scoped DOM subtree. Inside the `@scope` block, the `:scope` pseudo-class matches this root element.
- **Scoping Limit (`<scoping-limit>`):** An optional CSS selector defining the boundary ("donut hole") where scoping stops. The limit element and all its descendants are excluded from the scope.

### The `:scope` Pseudo-Class vs. The `&` Parent Nesting Selector

Inside an `@scope` block:
- `:scope` represents the matched scoping root element.
- `&` represents the scoping root selector syntax.
- `:scope` has a specificity equal to a pseudo-class (`0,1,0`).

```css
@scope (.card) {
  /* Targets .card itself with specificity 0,1,0 */
  :scope {
    background: white;
  }

  /* Targets .card.active if & is combined */
  &.active {
    border-color: blue;
  }

  /* Targets descendant .title inside .card */
  .title {
    font-size: 1.25rem;
  }
}
```

---

## 2. Scoping Proximity vs. Cascade Layers & Specificity

When two CSS rules target the same element with equal specificity, standard CSS resolves the conflict by source order (last rule wins). However, `@scope` introduces **Scoping Proximity** into the W3C Cascade algorithm.

### The Cascade Order (W3C Specification)

1. Origin & Importance (`!important`)
2. Context (Host vs Light DOM)
3. Cascade Layers (`@layer`)
4. **Scoping Proximity** (Closer scope root in DOM hierarchy wins!)
5. Specificity
6. Order of Appearance

### How Scoping Proximity Works

When two rules match an element, the rule associated with the **nearer ancestor scoping root** in the DOM tree takes precedence, **regardless of stylesheet order**.

```html
<div class="scope-root" id="outer" data-theme="light">
  <p class="target">Light text</p>

  <div class="scope-root" id="inner" data-theme="dark">
    <p class="target">Dark text</p> <!-- Matches BOTH light and dark scope rules! -->
  </div>
</div>
```

```css
/* Rule A (Source Order 1) */
@scope ([data-theme="dark"]) {
  .target { color: cyan; }
}

/* Rule B (Source Order 2) */
@scope ([data-theme="light"]) {
  .target { color: black; }
}
```

**Result for `<p class="target">` inside `#inner`:**
- Rule A scoping root (`#inner`) is **1 step away** in the DOM tree.
- Rule B scoping root (`#outer`) is **2 steps away** in the DOM tree.
- **Rule A wins** because `#inner` is closer in DOM proximity, despite Rule B appearing second in the CSS!

---

## 3. Native CSS Nesting Rules & Specificity Traps

Native CSS Nesting allows grouping CSS rules hierarchically.

### The `:is()` Specificity Rule

In the W3C CSS Nesting Module, a nested selector block behaves as if the parent selector is wrapped in `:is(...)`.

```css
/* Input CSS */
.card, #featured-card {
  .title {
    color: red;
  }
}

/* Equivalent Parsed Rule */
:is(.card, #featured-card) .title {
  color: red;
}
```

**Specificity Trap:** `:is()` takes on the specificity of its **most specific argument**. Therefore, `.card .title` in the block above gains a specificity of `1,1,0` (from `#featured-card` + `.title`), even when matching a plain `.card` element without an ID!

### Declaration Position Gotcha

Always place direct property declarations **before** nested rules:

```css
/* RECOMMENDED */
.button {
  background-color: blue; /* Declared at top */
  color: white;

  &:hover {
    background-color: darkblue;
  }
}
```

---

## 4. Browser Support Matrix

| Feature | Chrome / Edge | Firefox | Safari | iOS Safari |
| :--- | :--- | :--- | :--- | :--- |
| **Native CSS Nesting (`&`)** | 112+ | 117+ | 16.5+ | 16.5+ |
| **Relaxed Nesting Syntax** | 120+ | 117+ | 17.2+ | 17.2+ |
| **W3C Native `@scope`** | 118+ | 128+ | 17.4+ | 17.4+ |
| **Scoping Proximity** | 118+ | 128+ | 17.4+ | 17.4+ |
