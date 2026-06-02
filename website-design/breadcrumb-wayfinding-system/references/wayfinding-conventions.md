# Reference: Wayfinding Conventions

Common symbols and patterns used in modern web wayfinding.

## Separator Symbols

| Symbol | Name | Tone | Best For... |
| :---: | :--- | :--- | :--- |
| `>` | Greater Than | Standard | E-commerce, General utility |
| `/` | Forward Slash | Technical | Documentation, SaaS, Developer tools |
| `→` | Right Arrow | Directional | Step-based flows (though use with caution) |
| `»` | Double Chevron | Classic | Legacy systems, deep directories |

## Common Breadcrumb Types

### 1. Location-Based (Hierarchy)
Reflects the site's folder structure.
*Example:* `Home > Shop > Men > Shoes`

### 2. Attribute-Based (Faceted)
Reflects the filters applied by the user.
*Example:* `Home > Shoes > Red > Size 10`

### 3. Path-Based (History)
*Note: Generally discouraged.* Reflects the user's specific journey.
*Example:* `Home > Search Results > Product Page`

## Truncation Patterns

### The "Ellipsis Dropdown"
When intermediate levels are collapsed, clicking the `...` reveals a vertical menu of the hidden parents.

### The "Scroll Fade"
On mobile, the breadcrumbs are in a single line that overflows horizontally. A subtle CSS `linear-gradient` mask on the right edge indicates more content.
```css
.breadcrumb-container {
  overflow-x: auto;
  white-space: nowrap;
  mask-image: linear-gradient(to right, black 80%, transparent 100%);
}
```
