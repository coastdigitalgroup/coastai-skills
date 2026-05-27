# Reference: Video Performance and Formats

## Modern Video Codecs

| Format | Codec | Browser Support | Notes |
| :--- | :--- | :--- | :--- |
| **WebM** | VP9 / AV1 | ~95% (Modern) | Best compression; use as primary source. |
| **MP4** | H.264 (AVC) | 100% (Universal) | Use as the mandatory fallback source. |
| **OGG** | Theora | ~70% (Legacy) | Largely deprecated; no longer recommended. |

## Preloading Strategies

The `preload` attribute tells the browser how much data to download when the
page loads.

- `preload="none"`: The browser downloads nothing until the user clicks "Play".
  - **Best for:** Videos far below the fold or in secondary tabs.
- `preload="metadata"`: The browser only downloads enough to get dimensions,
  first frame, and duration.
  - **Best for:** Most standard video implementations.
- `preload="auto"`: The browser starts downloading the whole file immediately.
  - **Best for:** Critical hero videos or the "primary" content of a page.

## Mobile-Specific Implementation

To ensure video works correctly on mobile devices (specifically iOS), use these
attributes:

1.  **`playsinline`**: Prevents the video from automatically entering fullscreen
    mode when it starts playing.
2.  **`muted`**: Required for `autoplay` to work. Without this, Safari and
    Chrome will block the video from starting.

## Accessibility (WCAG 2.2)

- **SC 1.2.2 (Captions - Prerecorded):** Provide captions for all pre-recorded
  audio content in synchronized media.
- **SC 1.2.3 (Audio Description or Media Alternative):** Provide an alternative
  for time-based media or audio description for the video.
- **SC 2.2.2 (Pause, Stop, Hide):** For any auto-playing, looping content that
  lasts more than 5 seconds, provide a mechanism for the user to pause it.
