---
name: third-party-embed-optimization
description:
  Optimize the loading and execution of third-party embeds (YouTube, Maps, Chat)
  using facades and lazy-loading to improve Core Web Vitals.
---

# Third-Party Embed Optimization

## Purpose

The Third-Party Embed Optimization skill provides a protocol for reducing the
performance impact of heavy third-party widgets. By replacing immediate iFrame
loading with "facades" (static previews) or intersection-based loading,
websites can significantly reduce Total Blocking Time (TBT), Largest Contentful
Paint (LCP), and network payload without losing functionality.

## Use Cases

- **Video Players:** YouTube, Vimeo, or Wistia embeds that load MBs of JS.
- **Maps:** Google Maps or Mapbox iFrames that block the main thread.
- **Customer Support:** Chat bubbles (Intercom, Drift, Zendesk) that aren't
  needed until a user interacts.
- **Social Feeds:** Twitter/X or Instagram embeds that pull in massive
  dependencies.

## When NOT to Use

- **Critical Content:** If the embed is the primary content above the fold and
  immediate playback/interaction is the core user intent (e.g., a video-only
  landing page).
- **Lightweight Scripts:** If the third-party script is truly minimal (rare for
  UI widgets) and already optimized.
- **Tracking/Analytics:** This skill is for UI-based embeds; non-visual
  tracking scripts should be managed via Tag Managers or specialized loading
  patterns.

## Inputs

1. **Embed Source:** The original iFrame or `<script>` snippet provided by the
   vendor.
2. **Interaction Trigger:** How should the full embed be loaded? (e.g., Click,
   Hover, or Scroll into view).
3. **Placeholder Assets:** A thumbnail image, icon, or CSS-based preview that
   resembles the final widget.

## Outputs

1. **Facade Component:** A lightweight HTML/CSS structure that mimics the
   third-party widget.
2. **Lazy-Loading Logic:** JavaScript that swaps the facade for the real embed
   upon the specified trigger.
3. **Resource Hints:** `<link rel="preconnect">` or `dns-prefetch` tags to warm
   up connections to third-party domains.

## Workflow

### 1. Audit the Cost

Identify the performance cost using DevTools (Network and Performance tabs).
Look for "Long Tasks" caused by third-party domains.

### 2. Implement a Facade (Static Preview)

- Create a `<div>` or `<button>` that matches the dimensions of the embed.
- Use a high-quality thumbnail (e.g., YouTube's `img.youtube.com` assets).
- Overlay a "Play" or "Interaction" icon to indicate it is interactive.

### 3. Add Resource Hints

Add `preconnect` tags for the third-party domain and its CDN to the `<head>`.
This speeds up the eventual load when the user interacts.

```html
<link rel="preconnect" href="https://www.youtube-nocookie.com">
<link rel="preconnect" href="https://googleads.g.doubleclick.net">
```

### 4. Implement the Swap Logic

- **On Click:** Replace the facade with the actual `<iframe>` when the user
  clicks the preview.
- **On Scroll:** Use `IntersectionObserver` to start loading the script/iFrame
  when the user is nearing the element (e.g., 400px away).

### 5. Prevent Layout Shift

Ensure the facade and the final embed have identical dimensions (`width` and
`height`) to prevent Cumulative Layout Shift (CLS) during the swap.

## Decision Rules

- **Use "Click-to-Load" if:** The widget is heavy and not everyone will use it
  (e.g., a chat bubble or a detailed map).
- **Use "Scroll-to-Load" if:** The content is a natural part of the page flow
  but isn't immediately visible (e.g., a video halfway down an article).
- **Use Native `loading="lazy"`:** On standard iFrames if browser support is
  sufficient and the performance gain of a facade isn't required.

## Constraints

- **Accessibility:** Facades must be keyboard-accessible (use a `<button>` as
  the container) and have appropriate `aria-label` text (e.g., "Play Video").
- **Privacy:** Using facades can prevent third-party cookies from being set
  until the user explicitly interacts, aiding in GDPR/CCPA compliance.

## Non-Goals

- Replacing the functionality of the third-party widget itself.
- Managing server-side proxying of third-party assets.
- General JavaScript minification or bundling (covered by other skills).

## Common Failure Patterns

- **No Interaction Indicator:** Users don't realize the facade is interactive
  because it lacks a "Play" button icon.
- **Layout Jumps:** The facade is 300px tall but the loaded iFrame is 450px,
  causing a jump.
- **Loss of Features:** Forgetting to include `allowfullscreen` or specific
  vendor attributes when dynamically creating the iFrame.
- **Missing Accessibility:** Using a non-focusable `<div>` for the facade,
  preventing keyboard users from ever loading the content.

## Validation Steps

- [ ] **Lighthouse Audit:** Run a report and check for "Reduce the impact of
      third-party code" and "Total Blocking Time" improvements.
- [ ] **Network Tab Check:** Verify that third-party scripts/iFrames are NOT
      downloaded until the trigger occurs.
- [ ] **Keyboard Test:** Ensure you can "activate" the facade using only the
      `Tab` and `Enter/Space` keys.
- [ ] **CLS Check:** Use the "Layout Shift Regions" overlay in DevTools to
      ensure the swap is seamless.
