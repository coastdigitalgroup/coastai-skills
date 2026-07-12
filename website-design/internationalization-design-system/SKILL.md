---
name: internationalization-design-system
description:
  Design a systematic framework for global-ready interfaces, addressing
  bi-directional (RTL) layouts, localized typography, and cultural iconography
  to ensure a seamless experience across languages and regions.
---

# Internationalization Design System

## Purpose

The Internationalization (i18n) Design System skill provides a methodology for
designing interfaces that are ready for a global audience. It moves beyond
simple translation to address the **spatial**, **typographic**, and **visual**
implications of different languages and cultures. This system ensures that
layouts are flexible enough to accommodate varying text lengths, that
bi-directional (Right-to-Left) layouts are correctly mirrored, and that visual
cues remain culturally appropriate.

## Use Cases

- Designing a global SaaS platform or e-commerce site for multi-region release.
- Adapting an existing English-only interface for RTL languages (Arabic, Hebrew,
  Persian).
- Establishing typographic standards for non-Latin scripts (CJK, Cyrillic,
  Devanagari).
- Auditing UI components for "expansion-readiness" (handling text growth in
  German or Finnish).
- Creating icon sets that avoid culturally specific or directional bias.

## When NOT to Use

- **Single-Region/Single-Language Sites:** Where there is no plan for future
  expansion and local conventions are strictly known.
- **Purely Visual Narrative Sites:** Where the design is an artistic expression
  that relies on fixed, non-reflowing spatial relationships.
- **Content-Only Translation:** If the task is strictly translating copy
  without changing the UI or layout behavior.

## Inputs

1. **Target Language List:** Which languages and scripts need to be supported?
2. **Reading Direction:** Does the language flow LTR (Left-to-Right) or RTL
   (Right-to-Left)?
3. **Typography Assets:** Localized font stacks that maintain the brand's
   voice across scripts.
4. **Cultural Context:** Region-specific conventions for colors, symbols, and
   data formats (dates, currency).
5. **Layout Breakpoints:** From the `responsive-grid-system`.

## Outputs

1. **Bi-directional (RTL) Mirroring Spec:** A map of which elements flip and
   which remain fixed (e.g., progress bars vs. media controls).
2. **Typographic Scale Matrix:** Adjusted font sizes and line heights for
   different script families.
3. **Expansion Blueprint:** UI patterns designed to handle +/- 40% text length
   variance.
4. **Iconography Logic:** Guidelines for mirrored vs. non-mirrored icons.
5. **Localization Design Tokens:** Logical properties (e.g., `padding-inline-start`)
   defined in the design spec.

## Workflow

### 1. Design for Text Expansion

Never assume a label will stay short. Languages like German or Italian can be
30-50% longer than English.
- **Flexible Containers:** Avoid fixed-width buttons or cards; use `min-width`
  or `fit-content`.
- **Text Wrapping:** Ensure UI elements (like tabs or menu items) can wrap
  gracefully or transition to an "overflow" menu.
- **Dynamic Centering:** If text expands, ensure it doesn't overlap adjacent
  elements.

### 2. Implement RTL Mirroring Logic

For Right-to-Left languages, the "mental model" of the page flips:
- **Layout Mirroring:** The sidebar moves from Left to Right; the Logo moves
  from top-left to top-right.
- **Logical Properties:** Annotate designs using "Start" and "End" instead of
  "Left" and "Right."
- **Navigation Flow:** Back buttons in LTR (pointing left) must point right
  in RTL to indicate "Back to the previous state."

### 3. Localize Typography and Vertical Rhythm

Non-Latin scripts have different heights, densities, and legibility requirements:
- **CJK (Chinese, Japanese, Korean):** Requires slightly larger base sizes and
  more generous line height (leading) due to character complexity.
- **Arabic:** Features tall ascenders and deep descenders; increase
  vertical spacing to prevent "clashing" between lines.
- **Fallback Stacks:** Define system font fallbacks that match the weight and
  x-height of your primary brand font as closely as possible.

### 4. Audit Iconography Directionality

Not everything flips in RTL:
- **Mirror:** Directional icons (arrows, planes, bicycles), progress bars,
  and icons representing "forward/back" movement.
- **Don't Mirror:** Clockwise/counter-clockwise icons (clocks, reload), media
  playback controls (Play, Pause, Seek), and "checkmarks" (which are universal).
- **Numbers:** Most RTL regions use Western Arabic numerals (1, 2, 3), which
  still read LTR even within RTL text.

### 5. Establish Data Formatting Standards

- **Date & Time:** Clearly define DD/MM/YYYY vs MM/DD/YYYY to avoid confusion.
- **Currency:** Define if the symbol precedes or follows the amount (e.g., $10
  vs 10 €).
- **Calendars:** Some regions use different starting days of the week (Monday
  vs Sunday).

## Decision Rules

- **The Mirroring Rule:** If a UI element represents "direction" or "time"
  (moving forward), it MUST be mirrored in RTL. If it represents a physical
  object (like a camera or a clock), it usually remains fixed.
- **The "35% Buffer" Rule:** Always leave 35% empty space in buttons and
  labels during the English design phase to account for expansion.
- **Script-Specific Sizing:** If a script is highly complex (e.g., Devanagari),
  increase the font-size by 10-15% compared to the Latin equivalent for
  legibility.
- **Cultural Sensitivity:** Avoid icons that are Western-centric (e.g., a
  piggy bank for savings, which is inappropriate in many cultures).

## Constraints

- **Accessibility:** Text expansion must not hide interactive elements or
  cause horizontal overflow. Contrast ratios must be maintained across all
  localized versions.
- **Responsiveness:** Layouts must remain stable when switching directions.
  Use `padding-inline` and `margin-inline` in specifications.
- **Hierarchy:** The primary CTA must remain the most prominent element,
  regardless of the reading direction.

## Common Failure Patterns

- **The "Expansion Break":** Hard-coded widths that cause translated text to
  be cut off or overlap.
- **Lazy Mirroring:** Mirroring icons that shouldn't be (like a "Play" button
  or a clock), which confuses users.
- **The "English-First" Trap:** Designing a tight, minimalist UI in English
  that becomes completely unusable in languages with long words.
- **Missing Fallbacks:** Not specifying fonts for non-Latin scripts, resulting
  in "Tofu" (broken character boxes).
- **Inconsistent Alignment:** Mixing mirrored layout with un-mirrored text
  alignment, creating a jagged, unpolished feel.

## Validation Criteria

- [ ] Layout is successfully mirrored for RTL viewports (Sidebar/Logo swap).
- [ ] UI components handle 40% text expansion without breaking or overlapping.
- [ ] Typographic scale is adjusted for script complexity (e.g., line-height
      increases for Arabic/CJK).
- [ ] Iconography follows the "Mirroring vs. Fixed" logic.
- [ ] Designs use logical properties (Start/End) instead of absolute (Left/Right).
- [ ] Date, currency, and number formats are localized correctly.
- [ ] Fallback font stacks are defined for all target scripts.
