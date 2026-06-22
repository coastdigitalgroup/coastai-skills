# Keyboard Shortcut References

## Cross-Platform Modifiers

When implementing shortcuts, users expect different modifier keys depending on
their operating system.

| Platform | Primary Modifier (Mod) | Secondary Modifier |
| :--- | :--- | :--- |
| **macOS** | `Command` (⌘) | `Shift` or `Option` (⌥) |
| **Windows** | `Control` (Ctrl) | `Shift` or `Alt` |
| **Linux** | `Control` (Ctrl) | `Shift` or `Alt` |

### Implementation Snippet

```javascript
const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

// On keydown:
const isPrimaryMod = isMac ? event.metaKey : event.ctrlKey;
```

## `event.key` vs `event.code`

- **`event.key`**: Returns the value of the key pressed, taking into account the
  keyboard layout and modifier state (e.g., `"s"`, `"S"`, `"Enter"`, `"?"`).
  **Recommended for most shortcuts.**
- **`event.code`**: Returns the physical key on the keyboard (e.g., `"KeyS"`,
  `"Digit1"`). Use this for games or shortcuts tied to physical position
  (like WASD).

## ARIA Attributes

### `aria-keyshortcuts`

This attribute informs assistive technologies about the shortcuts available for
an element.

- **Value**: A space-separated list of modifiers and keys.
- **Modifiers**: `Control`, `Alt`, `Shift`, `Meta`.
- **Example**: `<button aria-keyshortcuts="Control+S">Save</button>`

Note: Adding `aria-keyshortcuts` does not *create* the shortcut; it only
*documents* it for screen readers. You must still implement the logic in JS.

## Forbidden Shortcuts (Browser Defaults)

Avoid overriding these unless you are building a full desktop-equivalent
environment (like a cloud IDE):

- `Ctrl/Cmd + T`: New Tab
- `Ctrl/Cmd + W`: Close Tab
- `Ctrl/Cmd + N`: New Window
- `Ctrl/Cmd + L`: Focus Address Bar
- `Ctrl/Cmd + R`: Reload Page
- `Ctrl/Cmd + F`: Find in Page (unless you provide a superior custom search)

## Best Practices

1. **Esc to Close**: Always use the `Escape` key to close modals, menus, and
   cancel pending actions.
2. **Discoverability**: Provide a shortcut (usually `?`) to display a help
   overlay listing all available shortcuts.
3. **Input Neutrality**: Never trigger single-letter shortcuts when an input or
   textarea is focused.
4. **Consistency**: Use standard conventions (e.g., `Ctrl+Z` for Undo, `Ctrl+S`
   for Save).
