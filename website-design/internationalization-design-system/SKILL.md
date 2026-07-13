---
name: internationalization-design-system
description:
  Design and implement a systematic framework for global-ready interfaces,
  addressing spatial logic (RTL mirroring), script-specific typography, and
  iconography directionality to ensure a seamless experience across all locales.
---

# Internationalization Design System

## Purpose

The Internationalization (i18n) Design System skill provides a methodology for
designing interfaces that are structurally and visually prepared for global
deployment. While `localization-optimization` (website-growth) handles cultural
messaging and currency, this system focuses on the **spatial and structural
integrity** of the UI. It ensures that layouts don't break when text expands
(e.g., German), that spatial logic remains intuitive when mirrored (RTL
languages like Arabic or Hebrew), and that typography remains legible across
diverse scripts.

## Use Cases

- Designing global SaaS products that support multiple languages and regions.
- Preparing a website for expansion into Right-to-Left (RTL) markets.
- Establishing a typography system that supports non-Latin scripts (CJK, Arabic,
  Indic).
- Creating flexible component libraries that handle variable text lengths
  without breaking.
- Auditing existing designs for "i18n-readiness" before development begins.

## When NOT to Use

- **Single-Market Websites:** If the business exclusively serves a single
  language and region with no plans for expansion.
- **Brand-Only Landing Pages:** Where visual impact is achieved through highly
  specific, non-replicable typography or "locked" layouts that cannot adapt.
- **Micro-Sites:** Where the overhead of an i18n system exceeds the value of a
  quick, point-localized fix.

## Inputs

1. **Locale Map:** Which languages and regions are being targeted?
2. **Script Profile:** Does the project include RTL (Arabic/Hebrew), CJK (Chinese/
   Japanese/Korean), or Vertical scripts?
3. **Text Expansion Data:** Estimated expansion percentages per language
   (e.g., German expands ~30% vs. English).
4. **Existing Components:** The `card-ui-system`, `site-navigation-system`, and
   `form-design-system` that need to be adapted.

## Outputs

1. **Mirroring Logic Spec:** Rules for which elements flip in RTL and which
   remain static.
2. **Multi-Script Font Stack:** A defined hierarchy of typefaces for different
   language families.
3. **Adaptive Layout Blueprint:** Designs showing "Safe Zones" for text expansion
   and flexible container behavior.
4. **Directional Iconography Map:** Identification of icons that require flipping
   (e.g., arrows) vs. icons that are universal (e.g., checkmarks).

## Workflow

### 1. Define the Spatial Direction (LTR vs. RTL)

Determine the "Reading Gravity" for each target locale:
- **Mirroring Strategy:** Most UI elements (sidebars, back buttons, progress bars)
  should mirror their position and direction in RTL.
- **Static Elements:** Keep elements that represent physical hardware (e.g.,
  media player controls like Play/Fast Forward) or international standards (e.g.,
  clocks) in their original LTR orientation.

### 2. Establish Typography for Script Diversity

Different scripts have different vertical heights and densities:
- **Line Height (Leading) Adjustment:** Non-Latin scripts (like Arabic or Thai)
  often require 20–30% more line-height to prevent ascenders and descenders from
  clashing.
- **Baseline Alignment:** Ensure that when mixing scripts (e.g., English text
  next to Japanese), the visual baseline or center-alignment is optically
  balanced.

### 3. Design for Text Expansion

Prevent "Layout Breaking" caused by translated text length:
- **The "30% Rule":** Design all containers (buttons, cards, navigation) to
  handle at least 30% more text than the English baseline.
- **Dynamic Growth:** Use `min-width` and `height: auto` instead of fixed
  dimensions. Avoid "Locked" horizontal navigation; use wrapping or "More"
  menus for expanded links.

### 4. Handle Directional Iconography

Identify icons that convey a sense of time or progress:
- **Flippable:** Arrows (back/forward), progress bars, and icons representing
  writing/reading (pencils, magnifying glasses if they imply a scan path).
- **Non-Flippable:** Universal symbols (Search, Settings, Checkmarks) or
  asymmetrical brand logos.

### 5. Build Responsive & Adaptive Grids

- **Logical Properties:** Design using "Start" and "End" terminology (CSS
  Logical Properties) instead of "Left" and "Right."
- **Stacking Order:** Ensure that multi-column layouts stack in a way that
  preserves the reading order of the locale (e.g., Column 1 is on the Right in
  RTL mobile views).

## Decision Rules

- **The Reading Order Rule:** The primary navigation and "Back" actions should
  always sit at the "Start" of the reading path (Top-Left for LTR, Top-Right for
  RTL).
- **Icon Mirroring:** If an icon represents direction or movement through time,
  flip it. If it represents a physical object or a universal action, keep it.
- **Expansion vs. Truncation:** Prefer wrapping or expanding containers over
  truncating text with ellipses, as truncation can change the meaning or
  remove critical context in some languages.
- **Number Formatting:** Ensure that large numbers and dates use the correct
  regional delimiters (e.g., 1.000,00 vs 1,000.00).

## Constraints

- **Accessibility:** Color contrast must be maintained across all localized
  themes. Mirroring must not break the DOM focus order (ensure `tabindex`
  logical flow matches the visual layout).
- **Responsiveness:** Layouts must be fluid enough to handle both expansion
  (long German words) and contraction (short Chinese characters) without
  creating excessive whitespace or crowding.
- **Typography:** Ensure that selected fonts for non-Latin scripts support the
  same weight ranges (Bold, Regular, Light) as the primary brand font.

## Common Failure Patterns

- **The "Left-Aligned" RTL:** Mirroring the text but keeping the "Submit" button
  on the right, forcing the user's eye to travel across the screen
  unnecessarily.
- **Hard-Coded Widths:** Buttons that look perfect in English but cut off the
  text in German or French.
- **LTR-Only Icons:** Using a "Forward Arrow" that points Right in an Arabic
  interface, confusing the user's sense of progress.
- **Broken Vertical Rhythm:** Using the same line-height for English and Arabic,
  causing the complex Arabic characters to look crowded and illegible.

## Validation Criteria

- [ ] UI layout mirrors correctly when the `dir="rtl"` attribute is applied.
- [ ] Typography for all target scripts is tested for legibility and vertical
      clash.
- [ ] All components (buttons, cards, headers) handle a 30% text expansion
      without breaking.
- [ ] Directional icons (arrows, progress) are correctly flipped in RTL views.
- [ ] Keyboard navigation (Tab order) follows the visual reading order in both
      LTR and RTL.
- [ ] Logical spacing/margins (Start/End) are used instead of fixed Left/Right.
