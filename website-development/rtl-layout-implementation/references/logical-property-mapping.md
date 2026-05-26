# Reference: CSS Logical Properties Mapping

Use this table as a quick reference for converting physical (fixed-direction)
CSS properties to logical (direction-aware) properties.

## 1. Box Model (Margins, Padding, Borders)

| Physical Property | Logical Property | Description |
| :--- | :--- | :--- |
| `margin-left` | `margin-inline-start` | Margin on the start side of the line. |
| `margin-right` | `margin-inline-end` | Margin on the end side of the line. |
| `margin-top` | `margin-block-start` | Margin on the top of the block. |
| `margin-bottom` | `margin-block-end` | Margin on the bottom of the block. |
| `padding-left` | `padding-inline-start` | Padding on the start side of the line. |
| `padding-right` | `padding-inline-end` | Padding on the end side of the line. |
| `border-left` | `border-inline-start` | Border on the start side of the line. |
| `border-right` | `border-inline-end` | Border on the end side of the line. |

## 2. Positioning

| Physical Property | Logical Property | Description |
| :--- | :--- | :--- |
| `left` | `inset-inline-start` | Absolute position from the start side. |
| `right` | `inset-inline-end` | Absolute position from the end side. |
| `top` | `inset-block-start` | Absolute position from the top. |
| `bottom` | `inset-block-end` | Absolute position from the bottom. |

## 3. Sizing

| Physical Property | Logical Property | Description |
| :--- | :--- | :--- |
| `width` | `inline-size` | Size in the direction of text flow. |
| `height` | `block-size` | Size perpendicular to text flow. |
| `min-width` | `min-inline-size` | Minimum size in text direction. |
| `max-height` | `max-block-size` | Maximum size in block direction. |

## 4. Border Radius

| Physical (LTR) | Logical Property |
| :--- | :--- |
| `border-top-left-radius` | `border-start-start-radius` |
| `border-top-right-radius` | `border-start-end-radius` |
| `border-bottom-left-radius` | `border-end-start-radius` |
| `border-bottom-right-radius` | `border-end-end-radius` |

## 5. Typography & Miscellaneous

| Physical Value | Logical Value | Property |
| :--- | :--- | :--- |
| `left` | `start` | `text-align`, `clear`, `float` |
| `right` | `end` | `text-align`, `clear`, `float` |

## Browser Behavior & Gotchas

### 1. The Scrollbar
Browsers automatically move the vertical scrollbar to the **left** side of the
viewport in RTL mode. Do not attempt to override this unless you have a
specific, highly unusual UX requirement.

### 2. Box Shadow Offset
Horizontal `box-shadow` offsets are **physical**.
`box-shadow: 10px 0 0 red;` will always put the shadow on the physical right.
In RTL, you must manually invert the value if the shadow should follow the
direction:
```css
[dir="rtl"] .element {
  box-shadow: -10px 0 0 red;
}
```

### 3. Background Images
`background-position: left top;` is physical. Use percentages or keywords:
`background-position: inline-start 0;` (where supported) or simply percentages:
`background-position: 0% 0%;` (LTR) vs `background-position: 100% 0%;` (RTL).
Alternatively, use CSS Logical Properties for `background-position` where browser
support allows.
