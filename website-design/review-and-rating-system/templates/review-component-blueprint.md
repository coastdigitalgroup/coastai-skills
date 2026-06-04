# Review Component Blueprint

This blueprint defines the structural zones and annotation requirements for a
complete Review and Rating component.

## 1. Summary Block Structure (Container: `.review-summary`)

```text
[ PRIMARY SCORE ] (e.g., 4.5)
[ STAR RATING ICONS ] (aria-label: "4.5 out of 5 stars")
[ TOTAL COUNT ] (e.g., "1,200 Reviews")

[ DISTRIBUTION HISTOGRAM ]
  (Row 5) [ 5-Star Label ] [ Progress Bar ] [ % or Count ]
  (Row 4) [ 4-Star Label ] [ Progress Bar ] [ % or Count ]
  (Row 3) [ 3-Star Label ] [ Progress Bar ] [ % or Count ]
  (Row 2) [ 2-Star Label ] [ Progress Bar ] [ % or Count ]
  (Row 1) [ 1-Star Label ] [ Progress Bar ] [ % or Count ]

[ ACTION ]
  [ BUTTON: "Write a Review" ]
```

## 2. Review Card Structure (Container: `.review-card`)

```text
+-------------------------------------------------------+
| [ STAR ICONS ] [ VERIFIED BADGE ]       [ DATE ]      |
|                                                       |
| [ REVIEW TITLE / HEADLINE ]                           |
|                                                       |
| [ REVIEW BODY TEXT (Line-clamped if very long) ]      |
|                                                       |
| [ USER IMAGES (THUMBNAILS) ]                          |
|                                                       |
| [ REVIEWER NAME / AVATAR ]                            |
|                                                       |
| [ HELPFULNESS VOTING: (Yes / No) ]       [ REPORT ]   |
+-------------------------------------------------------+
```

## 3. Interaction & States

| Element | Interaction | Visual Feedback |
| :--- | :--- | :--- |
| **Distribution Bar** | Click (Filter) | Background highlight / Active chip |
| **Helpful Icon** | Click | Increment count / Change icon color |
| **Write Button** | Click | Open Overlay/Modal (Form) |
| **Star (Form)** | Hover / Focus | Fill star color on current + previous |

## 4. Accessibility Annotations

- **Stars:** Use `<span role="img" aria-label="4.2 out of 5 stars">` for
  static stars.
- **Rating Bars:** Use `<progress>` or `role="progressbar"` with `aria-valuenow`
  and `aria-valuemax="100"`.
- **Helpful Vote:** Use `<button aria-pressed="false" aria-label="Mark as helpful">`.
- **Images:** Ensure `alt` text is either the reviewer's description or
  "User-uploaded photo of [Product Name]".
- **Sorting/Filtering:** Use `aria-live="polite"` on the review list container
  so screen readers announce when the list updates after a filter change.
