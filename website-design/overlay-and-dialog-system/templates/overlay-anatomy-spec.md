# Overlay Anatomy Spec

Use this template to define the structure and behavior of any overlay (Modal,
Drawer, or Popover) during the design handoff process.

---

## 1. Component Identification

- **Overlay Type:** [Modal | Drawer | Popover]
- **Internal Name:** (e.g., `user-profile-editor`)
- **Trigger:** (e.g., `Edit Button` in `Header`)

## 2. Anatomy & Hierarchy

- **Header:**
  - [ ] Title (Required): [Text]
  - [ ] Subtitle (Optional): [Text]
  - [ ] Close Button (Required): [Icon/Button Type]
- **Body Content:**
  - [ ] Content Type: [Form | Information | List | Media]
  - [ ] Scrolling: [Content Scrolls / Entire Overlay Scrolls / No Scroll]
- **Footer / Actions:**
  - [ ] Primary Action: [Label] (e.g., "Save Changes")
  - [ ] Secondary Action: [Label] (e.g., "Cancel")
  - [ ] Tertiary Action: [Label] (e.g., "Delete")

## 3. Layout & Spacing

- **Internal Padding:** (e.g., 24px / `--space-m`)
- **Gaps between elements:** (e.g., 16px / `--space-s`)
- **Max Width (Desktop):** (e.g., 600px for Modal, 400px for Drawer)
- **Max Height:** (e.g., 90% of Viewport)

## 4. Visual Layering

- **Z-Index Layer:** [Overlay | Modal | Popover]
- **Backdrop / Scrim:**
  - [ ] Visible (Opacity: 0.5)
  - [ ] Invisible (But still blocks interaction)
  - [ ] None (Allows interaction with background)
- **Elevation / Shadow:** (e.g., `shadow-xl`)

## 5. Behavior & Interaction

- **Click Outside to Close:** [Yes | No]
- **Escape Key to Close:** [Yes | No]
- **Focus Target on Open:** (e.g., First input field or Close button)
- **Focus Return on Close:** [Trigger Element]

## 6. Responsive Adaptation

- **Tablet Strategy:** [Keep Desktop Layout | Transform to Mobile]
- **Mobile Strategy:**
  - [ ] Full-screen
  - [ ] Bottom Drawer
  - [ ] Centered Modal
- **Mobile Max Width:** 100%
