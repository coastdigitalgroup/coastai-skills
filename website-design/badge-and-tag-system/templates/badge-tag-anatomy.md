# Badge and Tag Anatomy Template

Use this template to define the structure and styling for badges and tags in your design system.

## 1. Component Anatomy

| Zone | Description | Requirement |
| :--- | :--- | :--- |
| **Container** | The background shape (Pill or Rounded). | Must have at least 8px horizontal padding. |
| **Leading Icon** | Optional icon for status clarity. | 12px-14px size; must be same color as text. |
| **Label** | The 1-2 word text content. | WCAG AA Contrast (4.5:1 minimum). |
| **Trailing Action** | The "X" for removable tags. | Minimum 24px interactive hit zone. |

## 2. Structural Blueprint (CSS-ish)

```css
.badge-tag-base {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem; /* 4px */
  padding: 0.125rem 0.5rem; /* 2px 8px */
  font-size: 0.75rem; /* 12px */
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
}

.badge--pill {
  border-radius: 9999px;
}

.tag--rounded {
  border-radius: 4px;
}
```

## 3. Placement Template

### Card Overlay
- **Position:** Absolute (Top: 12px, Left: 12px).
- **Z-Index:** 10 (ensure it sits above image).

### Title Inline
- **Position:** Relative.
- **Vertical Alignment:** Middle or Baseline.
- **Spacing:** `margin-left: 8px` from the title text.

### Tag Group (Filter/Metadata)
- **Container:** Flexbox.
- **Gap:** 8px (Horizontal and Vertical).
- **Behavior:** `flex-wrap: wrap`.

## 4. Annotation Checklist

When handing off to developers, annotate the following:
- [ ] **Semantic Role:** Is this Success, Warning, Error, or Info?
- [ ] **Interactive Type:** Is it Static, Link, or Removable?
- [ ] **Dynamic Data:** How should it handle a label longer than 15 characters? (Truncate vs. Wrap).
- [ ] **Alt Text:** Does the icon need a label for screen readers? (e.g., "Status: Active").
