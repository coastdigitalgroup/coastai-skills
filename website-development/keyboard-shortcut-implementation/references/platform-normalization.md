# Platform Normalization & Keyboard Events

## Modifier Key Mapping

| Logical Modifier | Mac Property | Windows/Linux Property |
| :--- | :--- | :--- |
| **Primary Modifier** | `event.metaKey` (⌘) | `event.ctrlKey` (Ctrl) |
| **Secondary Modifier** | `event.altKey` (⌥) | `event.altKey` (Alt) |
| **Tertiary Modifier** | `event.ctrlKey` (⌃) | N/A (usually reserved for OS) |
| **Shift** | `event.shiftKey` | `event.shiftKey` |

## `event.key` vs `event.code`

### `event.key` (Recommended for Shortcuts)
- **What it is:** The value of the key pressed, taking into account the keyboard layout and modifier state.
- **Example:** Pressing "S" results in `key: "s"`. Pressing `Shift + S` results in `key: "S"`.
- **Why use it:** It is what the user *sees* on their key. If a user has a French AZERTY keyboard, `event.key` for the first letter key will be "a", whereas on QWERTY it will be "q".

### `event.code` (Recommended for Games/Layout-dependent tools)
- **What it is:** The physical position of the key on the keyboard, regardless of the characters produced.
- **Example:** The key to the right of "Tab" is always `code: "KeyQ"`, even if the user's layout produces an "A".
- **Why use it:** Use this when the physical arrangement of keys matters (e.g., WASD movement).

## Common `event.key` Values

- **Navigation:** `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`, `Home`, `End`, `PageUp`, `PageDown`
- **Actions:** `Enter`, `Tab`, `Escape`, `Backspace`, `Delete`, `Space` (Note: older browsers might return `" "` for Space)
- **Function Keys:** `F1` through `F12`

## Detection Helper (Vanilla JS)

```javascript
const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

function isModKey(event) {
  return isMac ? event.metaKey : event.ctrlKey;
}
```

## WCAG 2.1 Success Criterion 2.1.4: Character Key Shortcuts

If a keyboard shortcut is implemented in web content using only letter (including upper- and lower-case letters), punctuation, number, or symbol characters, then at least one of the following is true:

1. **Turn off:** A mechanism is available to turn the shortcut off;
2. **Remap:** A mechanism is available to remap the shortcut to include one or more non-printable keyboard keys (e.g., Ctrl, Alt);
3. **Active only on focus:** The keyboard shortcut for a user interface component is only active when that component has focus.
