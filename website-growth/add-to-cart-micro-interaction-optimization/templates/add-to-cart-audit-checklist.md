# Add-To-Cart Micro-Interaction Audit Checklist & Specification Template

Use this template to audit, engineer, and validate Add-To-Cart (ATC) button micro-interactions across desktop and mobile views.

---

## Part 1: Comprehensive ATC Micro-Interaction Audit Checklist

### 1. Visual & Physical Response (< 100ms)
- [ ] **Instant Feedback:** Does the CTA button visibly respond (color shift, loader, or microcopy change) within **100ms** of user tap/click?
- [ ] **Active/Pressed State:** Does the button feature an `:active` / `:focus-visible` state that gives physical tactile feedback on touchscreens?
- [ ] **No Layout Shift (Zero CLS):** Is the loader spinner or text transition engineered to preserve original button width and height dimensions?

### 2. Button State Machine & Double-Tap Defense
- [ ] **Double-Click Lockout:** Does the button disable further pointer events (`disabled` or `pointer-events: none`) immediately upon first touch?
- [ ] **Optimistic Counter Increment:** Does the header cart counter or drawer state increment optimistically before network API resolution?
- [ ] **Confirmed Success State:** Does the button transition to a clear success state ("Added to Bag!" + checkmark) for **600ms–1200ms** before resetting?
- [ ] **Timeout / Error Fallback:** If the API request exceeds 5,000ms or returns a 500/422 error, does the button gracefully exit the loading state and present a retry option?

### 3. Variant & Attribute Validation
- [ ] **Inline Error Highlighting:** If required attributes (size, color, frequency) are unselected, does the CTA shake/highlight missing pickers rather than failing silently?
- [ ] **Direct Microcopy Error:** Is explicit error text ("Please select a size") rendered directly adjacent to the CTA?
- [ ] **Focus Management:** Does clicking ATC with unselected options shift focus or scroll smoothly to the missing picker element?

### 4. Post-ATC Spatial Transition
- [ ] **Cart Drawer Auto-Open:** On both desktop and mobile, does adding an item automatically trigger the sliding cart drawer or a high-visibility notification modal?
- [ ] **Focus Trap & Overlay:** Is focus shifted appropriately to the cart drawer for screen reader and keyboard accessibility?
- [ ] **Sticky Mobile Bar Synchronization:** Is the floating mobile ATC bar synchronized bidirectionally with the primary PDP CTA button?

### 5. Accessibility & Mobile Ergonomics
- [ ] **Screen Reader ARIA Live Region:** Is there an `aria-live="polite"` element that announces "Item added to cart" or validation errors to assistive technology?
- [ ] **Aria-Busy Attribute:** Is `aria-busy="true"` set during network request processing?
- [ ] **Thumb Zone Clearance:** Does the sticky mobile ATC bar respect iOS/Android native home gesture bars using `env(safe-area-inset-bottom)`?
- [ ] **Touch Target Dimensions:** Is the ATC button touch target at least **48px x 48px** (or 100% viewport width on mobile)?

---

## Part 2: ATC Micro-Interaction Technical Specification Template

### Project Information
- **Brand / Site:** ________________________________________
- **Platform (Shopify / WooCommerce / Custom):** ________________________
- **Target Mobile Response Latency:** `< 50ms` client-side, `< 600ms` API roundtrip.

### State Machine Specification

| State Name | Trigger / Condition | Visual Appearance | ARIA Attributes | Next State |
| :--- | :--- | :--- | :--- | :--- |
| **1. Idle / Ready** | Page load or reset | Primary Brand CTA, "ADD TO BAG - $XX" | `aria-busy="false"` `disabled=false` | State 2 or State 4 |
| **2. Optimistic Loading**| User `pointerdown` / `click` | Text: "ADDING...", spinner visible, opacity 85% | `aria-busy="true"` `disabled=true` | State 3 or State 5 |
| **3. Confirmed Success**| API `200 OK` return | Green bg, checkmark icon, "ADDED TO BAG!" | `aria-live="polite"` | State 1 (after 1000ms) |
| **4. Validation Error**| Unselected variant option | Shake animation (300ms), red border | `role="alert"` | State 1 |
| **5. API Network Error**| API `500` / Stockout | Red text: "Stock Unavailable / Retry" | `role="alert"` `disabled=false` | State 1 |

---

## Part 3: Implementation Code Template (Optimistic ATC Controller)

```javascript
/**
 * Production-Grade Optimistic Add-To-Cart Controller
 */
class AddToCartController {
  constructor(config) {
    this.button = document.querySelector(config.buttonSelector);
    this.errorContainer = document.querySelector(config.errorSelector);
    this.cartCountEl = document.querySelector(config.cartCountSelector);
    this.apiUrl = config.apiUrl || '/cart/add.js';
    this.init();
  }

  init() {
    if (!this.button) return;
    this.button.addEventListener('click', (e) => this.handleSubmit(e));
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.clearError();

    // 1. Validate Variant Pickers
    const selectedVariant = this.getSelectedVariantId();
    if (!selectedVariant) {
      this.triggerValidationError("Please select a size");
      return;
    }

    // 2. Set Optimistic Loading State
    this.setLoadingState(true);
    this.optimisticUpdateCartCount(+1);

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedVariant, quantity: 1 })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.description || 'Failed to add item to cart');
      }

      // 3. Set Confirmed Success State
      this.setSuccessState();
      this.triggerCartDrawerOpen();

    } catch (error) {
      // 4. Rollback Optimistic State on Failure
      this.optimisticUpdateCartCount(-1);
      this.triggerApiError(error.message);
    }
  }

  setLoadingState(isLoading) {
    if (isLoading) {
      this.button.disabled = true;
      this.button.setAttribute('aria-busy', 'true');
      this.button.dataset.originalText = this.button.innerText;
      this.button.innerText = "ADDING...";
      this.button.classList.add('atc-loading');
    } else {
      this.button.disabled = false;
      this.button.setAttribute('aria-busy', 'false');
      this.button.innerText = this.button.dataset.originalText || "ADD TO CART";
      this.button.classList.remove('atc-loading');
    }
  }

  setSuccessState() {
    this.button.classList.remove('atc-loading');
    this.button.classList.add('atc-success');
    this.button.innerText = "✓ ADDED TO BAG!";

    setTimeout(() => {
      this.button.classList.remove('atc-success');
      this.setLoadingState(false);
    }, 1200);
  }

  triggerValidationError(message) {
    this.button.classList.add('atc-shake');
    if (this.errorContainer) {
      this.errorContainer.innerText = message;
      this.errorContainer.style.display = 'block';
    }
    setTimeout(() => this.button.classList.remove('atc-shake'), 400);
  }

  triggerApiError(message) {
    this.setLoadingState(false);
    if (this.errorContainer) {
      this.errorContainer.innerText = message;
      this.errorContainer.style.display = 'block';
    }
  }

  clearError() {
    if (this.errorContainer) {
      this.errorContainer.innerText = '';
      this.errorContainer.style.display = 'none';
    }
  }

  optimisticUpdateCartCount(delta) {
    if (!this.cartCountEl) return;
    const current = parseInt(this.cartCountEl.innerText || '0', 10);
    this.cartCountEl.innerText = Math.max(0, current + delta);
  }

  getSelectedVariantId() {
    // Replace with site-specific variant selector logic
    return window.selectedVariantId || null;
  }

  triggerCartDrawerOpen() {
    if (window.CartDrawer && typeof window.CartDrawer.open === 'function') {
      window.CartDrawer.open();
    }
  }
}
```
