# Avatar Specification Blueprint

Use these standardized tokens and structures to implement avatars across the
design system.

## 1. Dimensional Scale (Tokens)

| Token | Size (px) | Internal Scale (rem) | Primary Use Case |
| :--- | :--- | :--- | :--- |
| `avatar-xs` | 24px | 1.5rem | Inline text, threaded comments |
| `avatar-sm` | 32px | 2rem | List items, secondary nav |
| `avatar-md` | 48px | 3rem | Primary nav, card headers |
| `avatar-lg` | 80px | 5rem | Search results, profiles |
| `avatar-xl` | 128px | 8rem | Hero profiles, account settings |

## 2. Presence Indicator Placement

Status indicators should be positioned absolutely relative to the avatar
container.

```css
.avatar-container {
  position: relative;
  display: inline-block;
}

.status-indicator {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 25%; /* Proportional to avatar */
  height: 25%;
  border: 2px solid var(--surface-background); /* Creates a cutout effect */
  border-radius: 50%;
}
```

## 3. Stacking Logic (CSS Pattern)

Use this pattern for overlapping avatars in a group.

```css
.avatar-stack {
  display: flex;
  flex-direction: row-reverse; /* Allows z-index to flow naturally */
  justify-content: flex-end;
}

.avatar-stack .stack-item {
  margin-left: -0.5rem; /* Adjust based on overlap requirement */
  border: 2px solid var(--surface-background);
  transition: transform 0.2s ease;
}

.avatar-stack .stack-item:hover {
  transform: translateY(-4px);
  z-index: 10; /* Bring hovered item to front */
}
```

## 4. Fallback Initial Generator Logic

If an image is missing, use this logic to generate the fallback:

1.  **Extract Initials:**
    - If `full_name` exists: `[FirstCharOfFirstWord][FirstCharOfLastWord]`
    - If only `username` exists: `[FirstTwoChars]`
2.  **Assign Background Color:**
    - Use a hash of the `user_id` or `email` to pick a color from a predefined
      accessible palette.
    - Ensure `color-contrast(bg-color vs white)` is >= 4.5:1.
3.  **Typography:**
    - Font size should be 40-45% of the total avatar diameter.
    - Font weight should be `Bold` or `Semibold`.
