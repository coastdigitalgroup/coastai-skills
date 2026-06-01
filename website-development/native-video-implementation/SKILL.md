---
name: native-video-implementation
description:
  Implement and debug self-hosted HTML5 video to ensure high performance,
  cross-browser compatibility, and full accessibility.
---

# Native Video Implementation

## Purpose

The Native Video Implementation skill provides a technical protocol for
delivering high-quality video content using the native HTML5 `<video>` element.
It focuses on optimizing loading performance, ensuring responsive behavior, and
providing an accessible experience for all users without the overhead of heavy
third-party players.

## Use Cases

- Implementing an auto-playing, looped hero background video.
- Adding a functional video player for product demonstrations or tutorials.
- Migrating from GIF-based animations to high-performance silent videos.
- Auditing existing video implementations for accessibility (captions, controls)
  and performance (preloading, codecs).

## When NOT to Use

- **Third-Party Hosting:** If the business requires the analytics, CDN, and
  adaptive bitrate streaming of services like YouTube, Vimeo, or Wistia, use
  `third-party-embed-optimization` instead.
- **Complex Streaming:** For Live Streaming or Netflix-style adaptive streaming
  (HLS/DASH), a dedicated player library (like Video.js or Shaka Player) is
  usually required.
- **Simple Animations:** Use CSS animations or SVGs for lightweight UI
  transitions.

## Inputs

1. **Source Assets:** Video files in multiple formats (ideally MP4 and WebM).
2. **Usage Context:** Is it a background decoration, a primary content piece, or
   a small UI loop?
3. **Accessibility Assets:** VTT files for captions and subtitles.
4. **Poster Image:** A high-quality static image to show before the video loads.

## Outputs

1. **Optimized HTML Markup:** A `<video>` element with multiple `<source>` tags
   and appropriate attributes.
2. **CSS Integration:** Responsive styling using `aspect-ratio` and object-fit
   containment.
3. **Preload Strategy:** Configuration for `preload` and `fetchpriority`
   attributes.
4. **Accessible Metadata:** Implementation of `<track>` elements for captions
   and ARIA labels.

## Workflow

### 1. Prepare the Assets

- Ensure you have at least two formats: **WebM** (best compression for modern
  browsers) and **MP4** (universal fallback).
- Generate a **Poster Image** that matches the first frame of the video to
  prevent a "black box" while loading.

### 2. Implement the Semantic Structure

- Use the `<video>` tag with a fallback message for very old browsers.
- Place `<source>` tags inside, with the most efficient format (WebM) first.
- Include a `<track>` element for captions if the video contains speech.

### 3. Configure Attributes based on Intent

- **For Hero Backgrounds:** Use `autoplay`, `muted`, `loop`, and `playsinline`.
  Note: Browsers will not autoplay video unless it is `muted`.
- **For Content Video:** Include `controls` and ensure `preload="metadata"` to
  save bandwidth.

### 4. Apply Responsive Styles

- Use `aspect-ratio` on the video container to prevent Cumulative Layout Shift
  (CLS).
- Use `width: 100%; height: auto;` to ensure it scales with the layout.
- Use `object-fit: cover` for background videos to ensure they fill the space.

### 5. Optimize Loading

- Use `preload="none"` for videos below the fold or behind user interaction.
- Use `preload="metadata"` as a standard default to get dimensions and duration.
- Apply `fetchpriority="high"` only for critical hero videos.

## Decision Rules

- **Silent Loop vs. GIF:** Always prefer a muted `<video>` over a GIF. Video
  files are often 80-90% smaller than equivalent GIFs.
- **Muted vs. Unmuted:** Never autoplay unmuted video. It is a major
  accessibility violation and is blocked by most browsers.
- **Internal vs. External Captions:** Use external `.vtt` files via the
  `<track>` element for maximum searchability and accessibility control.

## Constraints

- **Autoplay Policy:** Browsers require `muted` and `playsinline` attributes for
  automatic playback.
- **Mobile Support:** Always include `playsinline` to prevent iPhones from
  automatically forcing the video into fullscreen mode.
- **Accessibility:** All informative videos must have a text alternative
  (captions or a transcript).

## Non-Goals

- Building custom JavaScript-driven UI controls (this focuses on native controls
  and attributes).
- Handling server-side video transcoding or encoding.
- Implementing DRM (Digital Rights Management).

## Common Failure Patterns

- **The "Black Box":** Forgetting the `poster` attribute, leading to a blank
  space until the video downloads.
- **Infinite Loading:** Using `preload="auto"` on multiple videos, saturating
  the user's bandwidth.
- **Accessibility Gap:** Providing video with audio but no captions.
- **Layout Shift:** Not defining an aspect ratio or dimensions, causing content
  to jump when the video metadata loads.
- **Format Inefficiency:** Only providing MP4, missing out on 30%+ bandwidth
  savings from WebM.

## Validation Criteria

- [ ] **Network Check:** Verify that the browser downloads the WebM version if
      supported.
- [ ] **Autoplay Test:** Ensure the background video plays automatically across
      Chrome, Safari, and Firefox.
- [ ] **Mobile Check:** Verify the video plays "inline" on iOS rather than
      opening the native player.
- [ ] **CLS Check:** Verify zero layout shift using Lighthouse or DevTools.
- [ ] **Accessibility Audit:** Confirm captions are available and the video can
      be paused via keyboard.
