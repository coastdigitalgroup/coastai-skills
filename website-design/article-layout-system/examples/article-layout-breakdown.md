# Example: Long-Form Editorial Layout

This example demonstrates the application of the **Article Layout System** to a
technical blog post. It highlights how container widths, vertical rhythm, and
editorial elements create a high-quality reading experience.

## 1. The Golden Container (Measure)

The layout uses a centered column with a strict `max-width` to ensure optimal
readability.

- **Desktop Width:** `680px` (approx. 70 characters per line).
- **Desktop Side Gutter:** `120px` to allow for "Pull Quotes" to hang slightly
  into the margin.
- **Mobile Width:** `100%` with `20px` horizontal padding.

## 2. Vertical Rhythm Analysis

The spacing follows a "2x Top / 1x Bottom" rule for headings to preserve the
relationship between the title and its content.

- **Paragraph to Paragraph:** `1.5rem` (equal to the line height).
- **Heading 2 (Top Margin):** `4rem` (creates a clear break from the previous
  section).
- **Heading 2 (Bottom Margin):** `1.5rem` (links the heading to the following
  text).
- **Media to Text:** `3rem` (allows the image to "breathe").

## 3. Editorial Components

To prevent visual fatigue, the article includes several "breaks":

### A. The Pull Quote (The "Margin-Hang")
On desktop, the pull quote is centered but set slightly wider than the body
text (`800px` vs `680px`).
> "The secret to a great reading experience isn't the font choice, but the
> space between the lines."

### B. The Technical Callout
A light-blue background box with a 4px left border, used for "Pro-tips."
- **Background:** `--color-info-light`
- **Padding:** `1.5rem`
- **Font:** Sans-serif (provides a visual shift from the serif body text).

### C. The Image Grid
Instead of a single large image, two related screenshots are placed side-by-side
within a container that is wider than the text (`900px`).

## 4. Mobile Adaptation

As the screen narrows, the layout transforms:
- **Font Size:** Scales from `20px` (desktop) to `18px` (mobile) using `clamp()`.
- **Pull Quote:** Moves from "Margin-hanging" to "Inline" with a distinct top/bottom
  border.
- **Table of Contents:** Becomes a sticky "Jump to Section" button at the bottom
  of the viewport.

## 5. Visual Breakdown

```text
[   Progress Bar (Fixed Top)   ]
--------------------------------
[      Article Title (H1)      ]
[      Reading Time: 8 min     ]
--------------------------------
[        Intro Paragraph       ]
--------------------------------
[      Wide Image (Full-Bleed) ]
--------------------------------
[        Body Paragraph        ]
[        Body Paragraph        ]
--------------------------------
[   H2: The Core Concept       ]
[        Body Paragraph        ]
[  > Pull Quote (Slightly Wide)]
[        Body Paragraph        ]
--------------------------------
[   [!] Pro-tip Callout (Box)  ]
--------------------------------
[        Body Paragraph        ]
--------------------------------
[   Table of Contents (Sticky) ]
```
