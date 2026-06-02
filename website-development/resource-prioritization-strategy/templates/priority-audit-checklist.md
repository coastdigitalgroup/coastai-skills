# Resource Prioritization Audit Checklist

Use this checklist to audit a page's loading strategy and identify opportunities for optimization using prioritization hints.

## 1. LCP Identification
- [ ] Identify the Largest Contentful Paint (LCP) element in DevTools.
- [ ] Is the LCP an image?
  - [ ] If YES, is it discovered via HTML `<img>` or CSS `background-image`?
  - [ ] If YES, does it have `fetchpriority="high"`?
- [ ] Is the LCP a text block?
  - [ ] If YES, is the required font preloaded?

## 2. Resource Discovery (Late Discovery)
- [ ] Search CSS for `url()` references to critical assets (fonts, hero images).
  - [ ] Are these preloaded in the HTML `<head>`?
- [ ] Check if critical assets are being loaded by JavaScript (e.g., dynamic imports).
  - [ ] Can they be preloaded or marked with `modulepreload`?

## 3. Script Loading
- [ ] Review all `<script>` tags in the `<head>`.
  - [ ] Are they all either `async` or `defer`?
  - [ ] If any are blocking, is there a specific technical reason why?
- [ ] Identify third-party loaders (GTM, HubSpot, etc.).
  - [ ] Are they deferred or preconnected?

## 4. Connection Warming
- [ ] Identify all unique third-party domains in the Network tab.
  - [ ] Do the 1-2 most critical ones (e.g., an image CDN) have `preconnect` hints?
  - [ ] Do secondary ones have `dns-prefetch`?

## 5. Over-prioritization Check
- [ ] Count the number of `<link rel="preload">` tags.
  - [ ] Are there more than 5? (If so, consider trimming).
- [ ] Check the DevTools console.
  - [ ] Are there any "Preload not used" warnings?
- [ ] Verify that non-critical images (below the fold) have `loading="lazy"` and **not** `fetchpriority="high"`.

## 6. Speculative Loading
- [ ] Identify the most common "Next Page" for this page.
  - [ ] Are the critical assets for that next page being `prefetch`-ed?

---

### Audit Summary Template

| Resource | Current Priority | Suggested Change | Rationale |
| :--- | :--- | :--- | :--- |
| `hero.webp` | Low | `fetchpriority="high"` | Primary LCP asset |
| `brand.woff2` | Discovered Late | `preload` | Fix FOUT/CLS |
| `analytics.js` | Blocking | `defer` | Reduce TBT |
| `api.cdn.com` | No hint | `preconnect` | Faster handshake |
