# Sticky Header & Top Bar System Examples

This document demonstrates real-world architectural breakdowns of the **Sticky Header & Top Bar System** applied across two high-volume website paradigms: an **E-Commerce Multi-Tier Top Bar Stack** and a **SaaS Shrink-on-Scroll & Smart Reveal Header**.

---

## Example 1: E-Commerce Multi-Tier Sticky Top Bar Stack

### Context & Goal
An international retail e-commerce brand requires a high-converting top bar stack comprising three distinct tiers:
1. **Tier 1: Global Promo Announcement Bar** (Free shipping progress calculator + promo countdown timer).
2. **Tier 2: Utility Navigation Bar** (Currency/region picker, store locator, customer support, tracking order link).
3. **Tier 3: Primary Sticky Header** (Brand logo, multi-category mega menu, instant search bar, account sign-in, cart drawer trigger with item badge).

### Architectural Breakdown & Scroll Behavior

```text
=============================================================================
[ Tier 1: Global Promo Bar ] Free shipping on orders over $75!  [Close X]
=============================================================================
[ Tier 2: Utility Bar ] Store Locator | Help | 🇺🇸 USD ($) | Order Status
=============================================================================
[ Tier 3: Primary Nav ] [LOGO]  Shop  New  Sale   [ Search Input ]  👤  🛒(3)
=============================================================================
~~~~~~~~~~~~~~~~~~~~~~~ USER SCROLLS DOWN (scrollY > 60px) ~~~~~~~~~~~~~~~~~~~
=============================================================================
[ Tier 3: Primary Sticky Header ] [LOGO]  Shop  New  Sale  [🔍]  👤  🛒(3)
=============================================================================
```

#### Scroll State Transition Mechanics
- **At Top of Page (`scrollY === 0`):** All 3 tiers are rendered in document flow. Total height: `124px` (`36px` Promo + `32px` Utility + `56px` Primary Nav).
- **Initial Scroll (`scrollY > 36px`):** Tier 1 (Promo Bar) scrolls naturally out of view.
- **Lock-to-Sticky Threshold (`scrollY > 68px`):** Tier 2 (Utility Bar) scrolls out of view. Tier 3 (Primary Navigation) locks to the top of the viewport using `position: sticky; top: 0; z-index: 1000;`.
- **Scrolled Compact State (`scrollY > 120px`):** Primary Navigation adds `.is-scrolled` class, adding a subtle backdrop blur (`backdrop-filter: blur(12px)`), solid white glass background (`background: rgba(255, 255, 255, 0.92)`), elevation box shadow (`box-shadow: 0 4px 16px rgba(0,0,0,0.06)`), and collapsing search input into a compact icon button to optimize space.

#### Mobile Viewport Breakdown (< 768px)
- **Tier 1 (Promo Bar):** Compact single line text (`Free shipping over $75`) sticky above primary nav or static.
- **Tier 2 (Utility Bar):** Hidden from top stack; utility links moved inside Mobile Hamburger Drawer.
- **Tier 3 (Primary Nav):** Fixed single row height of **56px** containing:
  - Left: Hamburger Menu Trigger (`aria-expanded="false" aria-controls="mobile-nav-drawer"`)
  - Center: Brand Logo (`max-height: 28px`)
  - Right: Search Toggle Icon + Cart Icon Badge (`aria-label="Shopping Cart with 3 items"`)

---

## Example 2: SaaS Product Landing Page (Shrink-on-Scroll & Smart Reveal)

### Context & Goal
A SaaS platform landing page requires a sleek, modern header that maximizes hero media canvas visibility while maintaining instant navigation access without cluttering the screen.

### Architectural Breakdown & Scroll Mechanics

```text
--- TOP OF PAGE STATE (scrollY < 50px) ---
+---------------------------------------------------------------------------+
| [LOGO] Acme.io    Features  Integrations  Pricing  Docs   [Login] [Get Started] |
+---------------------------------------------------------------------------+
  Padding: 1.5rem 3rem | Height: 80px | Background: Transparent

--- SCROLL DOWN STATE (Scrolling down past 200px) ---
  [Header slides UP smoothly via transform: translateY(-100%);]
  Allows 100% focused reading of hero video, feature charts, and copy.

--- SCROLL UP REVEAL STATE (User scrolls UP by > 15px) ---
+---------------------------------------------------------------------------+
| [LOGO] Acme.io    Features  Integrations  Pricing  Docs   [Login] [Get Started] |
+---------------------------------------------------------------------------+
  Padding: 0.75rem 3rem | Height: 60px | Background: Glassmorphic Blur
  Box Shadow: 0 4px 20px rgba(0,0,0,0.08) | Transform: translateY(0)
```

#### Code Logic Pattern (JavaScript Scroll Controller)

```javascript
class SmartHeaderController {
  constructor(headerElement, options = {}) {
    this.header = headerElement;
    this.threshold = options.threshold || 100;
    this.lastScrollY = 0;
    this.ticking = false;

    this.init();
  }

  init() {
    window.addEventListener('scroll', () => this.onScroll(), { passive: true });
  }

  onScroll() {
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this.update();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  update() {
    const currentScrollY = window.scrollY;

    // 1. Elevation state
    if (currentScrollY > 20) {
      this.header.classList.add('is-scrolled');
    } else {
      this.header.classList.remove('is-scrolled');
    }

    // 2. Hide / Reveal state
    if (currentScrollY > this.threshold) {
      if (currentScrollY > this.lastScrollY && currentScrollY - this.lastScrollY > 10) {
        // Scrolling down -> Hide header
        this.header.classList.add('is-hidden');
      } else if (this.lastScrollY - currentScrollY > 10) {
        // Scrolling up -> Reveal header
        this.header.classList.remove('is-hidden');
      }
    } else {
      this.header.classList.remove('is-hidden');
    }

    this.lastScrollY = currentScrollY;
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const headerEl = document.querySelector('.site-header');
  if (headerEl) new SmartHeaderController(headerEl);
});
```

#### CSS Implementation & Motion Rules

```css
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 80px;
  background-color: rgba(255, 255, 255, 0);
  backdrop-filter: blur(0px);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              height 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              background-color 0.3s ease,
              box-shadow 0.3s ease;
}

/* Scrolled glass state */
.site-header.is-scrolled {
  height: 60px;
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
}

/* Scroll down hidden state */
.site-header.is-hidden {
  transform: translateY(-100%);
}

/* Anchor offset fix */
:target, [id] {
  scroll-margin-top: calc(80px + 1.5rem);
}

/* Reduced motion preference override */
@media (prefers-reduced-motion: reduce) {
  .site-header {
    transition: none !important;
  }
}
```

---

## Key Takeaways & Design Rules

1. **Never obscure target anchors:** Always set `scroll-margin-top: calc(var(--sticky-header-height) + 1rem)` on heading tags and anchor targets.
2. **Throttle scroll events:** Always wrap scroll listener calculations in `requestAnimationFrame` to maintain smooth 60fps scrolling performance without triggering layout thrashing.
3. **Respect user intent:** Provide immediate header re-appearance when scrolling up even slightly (10px–15px buffer) so users never feel "lost" without navigation.
4. **Maintain WCAG AA keyboard focus visibility:** Ensure skip links and focus rings remain fully unclipped and visible when navigating sticky top bars using keyboard controls.
