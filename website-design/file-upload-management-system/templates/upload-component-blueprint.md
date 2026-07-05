# File Upload Component Blueprint

This template provides the structural and behavioral annotations for a reusable file uploader.

## 1. The Drop Zone (Trigger)

```text
[ CONTAINER: .upload-dropzone ]
[ BORDER: 2px dashed --border-color ]
[ PADDING: --space-xl ]
[ RADIUS: --radius-m ]
[ ALIGNMENT: Center ]

+---------------------------------------+
|                                       |
|          [ ICON: upload-cloud ]       |
|                                       |
|    "Drag & drop files here or [Browse]"|
|                                       |
|    [ TEXT: .support-text ]            |
|    "Supported: JPG, PNG, PDF (Max 10MB)"|
|                                       |
+---------------------------------------+
```

### Annotations:
- **Focus State:** On Tab, apply `--focus-ring`.
- **Active State (Drag-over):** Apply `--color-primary` to border and `--color-primary-light` to background.
- **Hidden Input:** Use a visually hidden `<input type="file">` linked to the "Browse" button.

---

## 2. The Queue Item (List Item)

```text
[ CONTAINER: .upload-item ]
[ DISPLAY: Flex (Center-aligned) ]
[ PADDING: --space-m ]
[ BORDER-BOTTOM: 1px solid --border-muted ]

+---+  +-------------------------+  +---+
| T |  | My-Product-Photo.jpg    |  | X |
| H |  | [ PROGRESS BAR ]  45%   |  |   |
+---+  +-------------------------+  +---+
 (A)             (B)                 (C)
```

### Components:
- **(A) Thumbnail/Icon:** 48x48px container. Show `file-type` icon or image preview.
- **(B) Content Area:**
  - **Filename:** `text-truncate` for long names.
  - **Progress Bar:** High-contrast bar (4px height). Color changes based on status (Blue=Upload, Green=Success, Red=Error).
- **(C) Action Zone:**
  - **Button:** 32x32px (min 44px hit area). Icon: `close` (cancel) or `trash` (delete).

---

## 3. Feedback Messaging (Inline Errors)

```text
[ CONTAINER: .upload-error ]
[ DISPLAY: Flex ]
[ COLOR: --color-error ]
[ FONT-SIZE: --font-s ]

+---------------------------------------+
| [!] "File 'huge-video.mp4' is too     |
|      large. Max size is 100MB."       |
+---------------------------------------+
```

---

## 4. Accessibility (ARIA Attributes)

| Element | Attribute | Value |
| :--- | :--- | :--- |
| Container | `role` | `region` |
| Container | `aria-label` | `"File Upload"` |
| Drop Zone | `aria-describedby` | `[ID of support-text]` |
| Progress Bar | `role` | `progressbar` |
| Progress Bar | `aria-valuenow` | `[0-100]` |
| Status Message | `aria-live` | `polite` |
| Action Button | `aria-label` | `"Cancel upload for [filename]"` |
