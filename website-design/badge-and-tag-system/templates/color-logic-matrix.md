# Template: Color Logic Matrix

A standardized mapping for semantic colors to ensure consistency in status communication.

| Semantic State | Color Hue | Usage | Accessibility Pairing |
| :--- | :--- | :--- | :--- |
| **Neutral** | Grey | Metadata, Draft, Archived | Grey-700 on Grey-100 |
| **Success** | Green | Completed, Paid, Verified | Green-900 on Green-100 |
| **Warning** | Yellow/Amber | Pending, Low Stock, Expiring | Brown-900 on Yellow-100 |
| **Error** | Red | Overdue, Failed, Cancelled | Red-900 on Red-100 |
| **Info** | Blue/Indigo | New, Featured, Processing | Blue-900 on Blue-100 |

## Design Rules for Color

1.  **Don't Rely on Hue Alone:** Every semantic color state must be accompanied by a label or icon.
2.  **Maintain Lightness Contrast:** Ensure the "900" level text has enough contrast against the "100" level background.
3.  **The "Alert" Exception:** Only use Red for states that require immediate user correction or signify a hard failure.
4.  **Brand Integration:** The "Info" color should typically align with your brand's primary action color.
