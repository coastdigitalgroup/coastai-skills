# Accessibility Checkpoints for File Uploads

Implementing an accessible file uploader requires combining standard HTML elements with ARIA patterns to support keyboard navigation and assistive technology.

## 1. Semantic Structure

### The Native Input
The base must always be an `<input type="file">`. Even if you use a custom drop zone, the native input provides:
- Standard interaction for mobile devices.
- Standard "Choose File" dialog logic.
- Built-in MIME type filtering via the `accept` attribute.

### Labeling
The input MUST have an associated `<label>`. If the input is visually hidden, the label can act as the primary click target.
```html
<label for="avatar">Upload Avatar</label>
<input type="file" id="avatar" class="visually-hidden">
```

## 2. ARIA Roles and States

### Drop Zone Region
Use `role="region"` and `aria-labelledby` to define the drop zone as a significant area of the page.
```html
<div role="region" aria-labelledby="upload-heading" ondrop="...">
  <h2 id="upload-heading">Drag and drop files</h2>
</div>
```

### Real-time Announcements
Use a hidden `aria-live` region to communicate events that happen without a page reload:
- **`aria-live="polite"`**: Use for success messages (e.g., "File uploaded") or non-critical info.
- **`aria-live="assertive"`**: Use for critical errors that prevent progress (e.g., "File too large").

### Removing Files
Each "Remove" button in a preview list must have a descriptive label that identifies *which* file is being removed.
```html
<button aria-label="Remove image01.jpg">Remove</button>
```

## 3. Keyboard Interactions

- **Tabbing**: The custom upload trigger (button or label) must be in the tab order.
- **Activation**: Pressing `Enter` or `Space` on the trigger must open the native file selection dialog.
- **Escape**: If a custom preview modal is used, it must be closable via the `Esc` key.

## 4. Technical Gotchas

### Prevent Default Behavior
You must call `event.preventDefault()` on `dragover` and `drop` events. If you don't, dropping a file will cause the browser to navigate to the file's URL, losing all unsaved page state.

### Memory Management
When using `URL.createObjectURL` for previews, the browser keeps the file in memory until the page is closed or `URL.revokeObjectURL()` is called.
- **Rule**: Always revoke the URL when the preview is removed from the DOM.

### Input Value Sync
If a user selects a file, deletes it in your custom UI, and then tries to select the *same* file again, the `change` event on the native input will not fire because the value hasn't changed.
- **Fix**: Clear the input value (`input.value = ''`) after processing the files.
