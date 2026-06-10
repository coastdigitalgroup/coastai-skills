# Timeline Accessibility and Rhythm

This reference guide details the requirements for making timelines accessible and visually balanced.

## 1. Semantic Markup (WCAG 2.1)

Timelines are often complex sequences. Use these ARIA roles and HTML elements to ensure screen reader compatibility:

- **The Feed Container:** Use `<section aria-label="[Context] timeline">`.
- **Individual Items:** Use `<article>` to represent each discrete event.
- **Timestamps:** Always use the `<time>` element with a valid `datetime` attribute.
  - *Example:* `<time datetime="2023-10-25T10:45">10:45 AM</time>`
- **Decorative Elements:** The track line and marker icons should be hidden from screen readers if they are redundant to the text.
  - *Example:* `<div class="marker" aria-hidden="true"></div>`
- **Interactive Items:** If a timeline item is clickable, ensure it has a proper focus state and is keyboard-navigable.

## 2. Color and Contrast (WCAG AA)

- **Informational Icons:** If an icon conveys the status (e.g., Error/Success), it must meet a **3:1** contrast ratio against its background.
- **Text:** All event titles and descriptions must meet a **4.5:1** contrast ratio.
- **Don't Rely on Color Alone:** An error event should not just be "red." It must also include a text label (e.g., "Error:") or a distinct icon (e.g., an "X" or "!") to support color-blind users.

## 3. Spatial Rhythm (The "Breathing Room")

Follow the 4px or 8px grid system for consistent vertical rhythm:

- **Marker-to-Title:** 12px - 16px (Horizontal)
- **Title-to-Body:** 4px - 8px (Vertical)
- **Item-to-Item:** 24px - 48px (Vertical)
- **Group-to-Group:** 64px+ (Vertical)

## 4. Typography Scale

Align timeline typography with your `fluid-typography-system`:

- **Group Headers (Today/Yesterday):** Small Caps or Bold, slightly muted color (e.g., `text-sm`, `font-bold`, `uppercase`).
- **Event Title:** Bold or Semi-bold (e.g., `text-base`, `font-semibold`).
- **Timestamp:** Finer, lighter weight (e.g., `text-xs`, `color-neutral-500`).
- **Body Text:** Standard readability weight (e.g., `text-sm`, `line-height-relaxed`).
