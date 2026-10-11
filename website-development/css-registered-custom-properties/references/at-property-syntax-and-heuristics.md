# W3C CSS Properties and Values API Syntax and Heuristics

Technical reference for declaring, typing, and animating CSS custom properties using W3C `@property` rules and JavaScript `CSS.registerProperty()`.

---

## 1. Syntax Descriptor Specification

The `syntax` descriptor defines the data type of the custom property. Valid syntax strings take one of the following formats:

| Syntax String | Accepted Value Types | Example Valid Values | Example Invalid Values |
| :--- | :--- | :--- | :--- |
| `"<color>"` | Named colors, hex, rgb, rgba, hsl, hsla, oklch, light-dark() | `#3b82f6`, `rgb(0 0 0 / 0.5)`, `transparent` | `10px`, `bold`, `100%` |
| `"<angle>"` | Angular dimensions | `0deg`, `180deg`, `1.57rad`, `0.5turn`, `200grad` | `0` (unitless), `10px`, `red` |
| `"<length>"` | Spatial distance dimensions | `0px`, `1.5rem`, `10vw`, `100vh`, `calc(100% - 20px)` | `0` (unitless zero in strict mode), `red` |
| `"<percentage>"` | Percentages | `0%`, `50.5%`, `100%` | `0`, `10px`, `#fff` |
| `"<number>"` | Floating-point real numbers | `0`, `1`, `3.14159`, `-0.5` | `10px`, `50%` |
| `"<integer>"` | Whole integer numbers | `0`, `42`, `-10` | `3.14`, `10px` |
| `"<transform-function>"` | CSS transform functions | `rotate(45deg)`, `scale(1.2)`, `translateY(10px)` | `matrix(...)` (unless matching), `10px` |
| `"<time>"` | Duration values | `0s`, `200ms`, `1.5s` | `0` (unitless), `10px` |
| `"<resolution>"` | Screen resolution units | `96dpi`, `3dppx`, `300dpcm` | `100%`, `10px` |
| `"<custom-ident>"` | Unquoted author identifier keywords | `small`, `primary`, `active-tab` | `"quoted-string"` |
| `"*"` | Universal syntax (untyped token stream) | Any valid CSS token stream | None (accepts all valid tokens) |

---

## 2. Multi-Valued Syntax Combinations

Syntaxes can be combined using list multipliers and alternations:

```css
/* Accepts either a length OR a percentage */
@property --responsive-size {
  syntax: "<length> | <percentage>";
  inherits: false;
  initial-value: 16px;
}

/* Space-separated list of colors (e.g. for multiple gradient stops) */
@property --palette-list {
  syntax: "<color>+";
  inherits: false;
  initial-value: #000000 #ffffff;
}

/* Comma-separated list of lengths */
@property --padding-multi {
  syntax: "<length>#";
  inherits: false;
  initial-value: 10px, 20px;
}
```

---

## 3. Browser Interpolation Mechanics

### Discrete vs Continuous Interpolation

1. **Untyped Variables (`syntax: "*"`):**
   When an untyped variable is updated in a CSS transition or animation, the browser treats it as a discrete token stream. The transition remains unchanged during the animation duration and snaps instantaneously to the target value at 50% time completion (or 0% depending on timing function).

2. **Typed Variables (`syntax: "<color>"`, `"<angle>"`, etc.):**
   When a custom property is registered with an explicit syntax, the browser parses the initial and target values into numeric/color vectors. During transition calculation, the browser interpolates values smoothly on each frame:
   $$\text{Current Value} = \text{Start Value} + (\text{End Value} - \text{Start Value}) \times t$$
   Where $t$ is the elapsed easing factor from the transition timing function.

---

## 4. JavaScript Registration API (`CSS.registerProperty`)

```javascript
// Feature detection check
if ('registerProperty' in CSS) {
  try {
    CSS.registerProperty({
      name: '--accent-angle',
      syntax: '<angle>',
      inherits: false,
      initialValue: '0deg'
    });
  } catch (error) {
    if (error.name === 'InvalidModificationError') {
      // Property was already registered with different properties
      console.warn('--accent-angle re-registration attempted');
    }
  }
}
```

### JS Property Property Name Rules

- `name`: Must begin with two dashes `--`.
- `syntax`: Must match valid W3C syntax string. Defaults to `"*"` if omitted in JS descriptor.
- `inherits`: Boolean (`true` or `false`). Mandatory parameter in JS registration.
- `initialValue`: Mandatory string matching `syntax` if `inherits` is set or if `syntax` is not `*`. Note camelCase naming in JavaScript object (`initialValue` vs CSS `initial-value`).
