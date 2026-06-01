# CLS Audit & Mitigation Checklist

Use this template to audit and fix Cumulative Layout Shift (CLS) issues on a per-page basis.

## 1. Detection
- [ ] **Desktop Score:** (Target < 0.1) Current: _______
- [ ] **Mobile Score:** (Target < 0.1) Current: _______
- [ ] **Chrome DevTools Rendering Tab:** "Layout Shift Regions" enabled?
- [ ] **Performance Panel:** Layout Shift events identified and mapped to DOM elements?

## 2. Image & Media Optimization
- [ ] Do all `<img>` tags have `width` and `height` attributes?
- [ ] Are `<video>` elements using `poster` images and explicit dimensions?
- [ ] Is `aspect-ratio` applied to fluid containers?
- [ ] Are responsive images (`srcset`) using the same aspect ratio for all variants?

## 3. Third-Party & Dynamic Content
- [ ] Are ad slots wrapped in containers with a defined `min-height`?
- [ ] Are iFrame embeds (YouTube, Google Maps) constrained by aspect-ratio containers?
- [ ] Are social media widgets (Twitter/X feeds, Instagram embeds) pre-sized?
- [ ] Do you have a strategy for "No-Fill" ad states (keep the gap)?

## 4. Typography & Fonts
- [ ] Is `font-display: swap` used in `@font-face`?
- [ ] Have fallback font metrics been adjusted using `size-adjust` and `ascent-override`?
- [ ] Is the primary layout CSS loaded early to prevent FOUC (Flash of Unstyled Content)?

## 5. UI Transitions & Interaction
- [ ] Are all programmatic layout changes triggered by user interaction?
- [ ] Are "Success/Error" messages injected into the DOM within 500ms of the trigger?
- [ ] If using Skeleton Screens, do they accurately match the final component's height?

## 6. CSS Layout Strategy
- [ ] Is `content-visibility: auto` used for long content-heavy sections?
- [ ] If so, is `contain-intrinsic-size` defined to prevent scroll-jump?
- [ ] Are you avoiding using `height: auto` on containers that host late-loading JS components?

---

**Audit Performed by:** ____________________
**Date:** ____________________
**Page URL:** ____________________
