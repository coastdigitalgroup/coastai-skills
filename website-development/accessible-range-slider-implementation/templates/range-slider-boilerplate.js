/**
 * Accessible Dual Range Slider Class Wrapper
 *
 * Reusable Vanilla JavaScript class that binds to a dual range slider layout,
 * managing collision detection, active progress track visual updates, dynamic
 * focus/hover z-index stacking to prevent deadlocks, and screen-reader accessibility.
 *
 * @example
 * // HTML Markup:
 * // <div class="range-slider" id="mySlider">
 * //   <div class="slider-fill" data-slider-fill></div>
 * //   <input type="range" data-slider-min min="0" max="100" value="20">
 * //   <input type="range" data-slider-max min="0" max="100" value="80">
 * // </div>
 *
 * // JS initialization:
 * const mySlider = new DualRangeSlider(document.getElementById('mySlider'), {
 *   minGap: 5,
 *   valueFormatter: (val) => `$${val}`
 * });
 */
export class DualRangeSlider {
  /**
   * Create a DualRangeSlider instance.
   * @param {HTMLElement} containerElement - The parent container element.
   * @param {Object} options - Configuration options.
   * @param {number} [options.minGap=0] - The minimum allowed gap between min and max handles.
   * @param {function(number): string} [options.valueFormatter] - Formatter function for screen-reader (aria-valuetext) announcements.
   * @param {function(number, number): void} [options.onChange] - Callback fired on every input/change event.
   */
  constructor(containerElement, options = {}) {
    if (!containerElement) {
      throw new Error('DualRangeSlider requires a valid container element.');
    }

    this.container = containerElement;
    this.options = {
      minGap: options.minGap ?? 0,
      valueFormatter: options.valueFormatter ?? ((val) => String(val)),
      onChange: options.onChange ?? null,
    };

    // Find children by attributes or default selectors
    this.inputMin = this.container.querySelector('[data-slider-min]') || this.container.querySelectorAll('input[type="range"]')[0];
    this.inputMax = this.container.querySelector('[data-slider-max]') || this.container.querySelectorAll('input[type="range"]')[1];
    this.trackFill = this.container.querySelector('[data-slider-fill]') || this.container.querySelector('.slider-fill');

    if (!this.inputMin || !this.inputMax) {
      throw new Error('DualRangeSlider requires two native <input type="range"> elements inside the container.');
    }

    this._boundSync = this.sync.bind(this);
    this._boundZIndexMin = () => this.updateZIndex(this.inputMin);
    this._boundZIndexMax = () => this.updateZIndex(this.inputMax);

    this.init();
  }

  /**
   * Initializes listeners and sets up initial view state.
   */
  init() {
    // Synchronize inputs on sliding
    this.inputMin.addEventListener('input', this._boundSync);
    this.inputMax.addEventListener('input', this._boundSync);

    // Swap stacking priority on hover/focus to prevent deadlocks
    this.inputMin.addEventListener('mouseover', this._boundZIndexMin);
    this.inputMax.addEventListener('mouseover', this._boundZIndexMax);

    this.inputMin.addEventListener('focus', this._boundZIndexMin);
    this.inputMax.addEventListener('focus', this._boundZIndexMax);

    this.inputMin.addEventListener('input', this._boundZIndexMin);
    this.inputMax.addEventListener('input', this._boundZIndexMax);

    // Initial state setup
    this.sync();
  }

  /**
   * Handles slider value collision, syncs progress bar filling, and updates accessibility text.
   * @param {Event} [event] - The native browser input event.
   */
  sync(event) {
    let valMin = parseInt(this.inputMin.value, 10);
    let valMax = parseInt(this.inputMax.value, 10);
    const minGap = this.options.minGap;

    // Collision Resolution
    if (valMax - valMin < minGap) {
      if (event && event.target === this.inputMin) {
        this.inputMin.value = valMax - minGap;
        valMin = valMax - minGap;
      } else {
        this.inputMax.value = valMin + minGap;
        valMax = valMin + minGap;
      }
    }

    // Calculate percentage range
    const rangeMin = parseInt(this.inputMin.min, 10) || 0;
    const rangeMax = parseInt(this.inputMin.max, 10) || 100;
    const totalRange = rangeMax - rangeMin;

    const leftPercent = ((valMin - rangeMin) / totalRange) * 100;
    const rightPercent = 100 - (((valMax - rangeMin) / totalRange) * 100);

    // Update active highlight progress track
    if (this.trackFill) {
      this.trackFill.style.left = `${leftPercent}%`;
      this.trackFill.style.right = `${rightPercent}%`;
    }

    // Set high-quality formatted text for screen readers
    const formattedMin = this.options.valueFormatter(valMin);
    const formattedMax = this.options.valueFormatter(valMax);

    this.inputMin.setAttribute('aria-valuetext', formattedMin);
    this.inputMax.setAttribute('aria-valuetext', formattedMax);

    // Fire onChange callback
    if (this.options.onChange) {
      this.options.onChange(valMin, valMax);
    }
  }

  /**
   * Adjusts z-index hierarchy so focused or hovered handles are grabbable.
   * @param {HTMLInputElement} activeInput - The active input range.
   */
  updateZIndex(activeInput) {
    if (activeInput === this.inputMin) {
      this.inputMin.style.zIndex = '10';
      this.inputMax.style.zIndex = '9';
    } else {
      this.inputMin.style.zIndex = '9';
      this.inputMax.style.zIndex = '10';
    }
  }

  /**
   * Cleans up registered listeners.
   */
  destroy() {
    this.inputMin.removeEventListener('input', this._boundSync);
    this.inputMax.removeEventListener('input', this._boundSync);

    this.inputMin.removeEventListener('mouseover', this._boundZIndexMin);
    this.inputMax.removeEventListener('mouseover', this._boundZIndexMax);

    this.inputMin.removeEventListener('focus', this._boundZIndexMin);
    this.inputMax.removeEventListener('focus', this._boundZIndexMax);

    this.inputMin.removeEventListener('input', this._boundZIndexMin);
    this.inputMax.removeEventListener('input', this._boundZIndexMax);
  }
}
