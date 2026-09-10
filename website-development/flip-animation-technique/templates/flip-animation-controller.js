/**
 * FLIP Animation Controller Utility
 * Lightweight, production-ready implementation of the FLIP (First, Last, Invert, Play)
 * animation technique using the Web Animations API (WAAPI).
 */

class FlipController {
  /**
   * @param {Object} options
   * @param {number} [options.duration=300] - Default animation duration in ms
   * @param {string} [options.easing='cubic-bezier(0.2, 0, 0, 1)'] - Default easing
   * @param {boolean} [options.scaleContent=true] - Whether to apply counter-scale to children
   * @param {string} [options.childSelector='.flip-content'] - Selector for inverse scale target
   */
  constructor(options = {}) {
    this.duration = options.duration || 300;
    this.easing = options.easing || 'cubic-bezier(0.2, 0, 0, 1)';
    this.scaleContent = options.scaleContent !== false;
    this.childSelector = options.childSelector || '.flip-content';
  }

  /**
   * Reads initial ("First") geometric bounding boxes for target elements.
   * @param {HTMLElement[]|NodeList} elements
   * @returns {Map<HTMLElement, DOMRect>}
   */
  readFirst(elements) {
    const firstBounds = new Map();
    const list = Array.from(elements);

    for (let i = 0; i < list.length; i++) {
      const el = list[i];
      firstBounds.set(el, el.getBoundingClientRect());
    }

    return firstBounds;
  }

  /**
   * Executes a FLIP layout transition across a DOM mutation callback.
   * @param {HTMLElement[]|NodeList} elements - Elements to animate
   * @param {Function} mutator - Synchronous function that performs the DOM layout update
   * @param {Object} [overrideOptions] - Duration, easing, or scale overrides for this call
   * @returns {Promise<void>} Resolves when all animations complete
   */
  batchFlip(elements, mutator, overrideOptions = {}) {
    const duration = overrideOptions.duration || this.duration;
    const easing = overrideOptions.easing || this.easing;
    const scaleContent = overrideOptions.scaleContent !== undefined
      ? overrideOptions.scaleContent
      : this.scaleContent;

    // Check for prefers-reduced-motion accessibility setting
    const prefersReducedMotion = typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const list = Array.from(elements);

    // If reduced motion is requested, perform mutation without motion
    if (prefersReducedMotion) {
      mutator();
      return Promise.resolve();
    }

    // 1. FIRST: Batch read initial geometry
    const firstBounds = this.readFirst(list);

    // 2. LAST: Execute DOM mutation and batch read final geometry
    mutator();

    const lastBounds = new Map();
    for (let i = 0; i < list.length; i++) {
      const el = list[i];
      lastBounds.set(el, el.getBoundingClientRect());
    }

    const animations = [];

    // 3 & 4. INVERT & PLAY
    for (let i = 0; i < list.length; i++) {
      const el = list[i];
      const first = firstBounds.get(el);
      const last = lastBounds.get(el);

      if (!first || !last) continue;

      const deltaX = first.left - last.left;
      const deltaY = first.top - last.top;
      const scaleX = last.width > 0 ? first.width / last.width : 1;
      const scaleY = last.height > 0 ? first.height / last.height : 1;

      // Skip if positioning and sizing have not changed significantly
      const hasMoved = Math.abs(deltaX) >= 0.1 || Math.abs(deltaY) >= 0.1;
      const hasScaled = Math.abs(scaleX - 1) >= 0.01 || Math.abs(scaleY - 1) >= 0.01;

      if (!hasMoved && !hasScaled) continue;

      // Container FLIP transform keyframes
      const cardKeyframes = [
        {
          transform: `translate3d(${deltaX}px, ${deltaY}px, 0px) scale(${scaleX}, ${scaleY})`
        },
        {
          transform: 'translate3d(0px, 0px, 0px) scale(1, 1)'
        }
      ];

      // Ensure transform origin is locked to top-left (0 0)
      el.style.transformOrigin = '0 0';

      const anim = el.animate(cardKeyframes, {
        duration,
        easing,
        fill: 'both'
      });

      // Inverse scale children if container resized to prevent content distortion
      if (scaleContent && hasScaled) {
        const childTarget = el.querySelector(this.childSelector);
        if (childTarget) {
          childTarget.style.transformOrigin = '0 0';
          const invScaleX = scaleX > 0 ? 1 / scaleX : 1;
          const invScaleY = scaleY > 0 ? 1 / scaleY : 1;

          childTarget.animate([
            { transform: `scale(${invScaleX}, ${invScaleY})` },
            { transform: 'scale(1, 1)' }
          ], {
            duration,
            easing,
            fill: 'both'
          });
        }
      }

      // Cleanup animation object upon finish to prevent memory overhead
      const animPromise = anim.finished.then(() => {
        anim.cancel();
      }).catch(() => {});

      animations.push(animPromise);
    }

    return Promise.all(animations).then(() => {});
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = FlipController;
}
