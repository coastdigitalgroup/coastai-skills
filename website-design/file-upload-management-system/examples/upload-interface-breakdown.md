# Upload Interface Breakdown: Multi-Asset Media Gallery

This example demonstrates the application of the **File Upload and Management System** to a media asset uploader for a marketing CMS. It shows the transition from the initial "Drop Zone" to a "Batch Upload Queue" with various states.

## 1. Initial State: The Drop Zone
The user is presented with a large, inviting area at the top of the "Media Library" page.

- **Visual Pattern:** Contained Drop Zone (Dashed Border).
- **Hierarchy:** Primary CTA within the zone ("Browse Files") is a high-contrast button.
- **Affordance:** The text "Drag and drop images here" is centered in a muted `secondary-text` color.
- **Iconography:** A large, central "Cloud Upload" icon indicates the action.

## 2. Interaction: Drag-Over Feedback
As the user drags three JPG files over the zone:

- **State Shift:** The dashed border turns a solid brand-blue.
- **Visual Cue:** The background of the zone shifts to a very light blue (10% opacity).
- **Text Update:** The label changes to "Drop to start uploading."

## 3. Active State: The Upload Queue
Once dropped, a list appears below the drop zone. Each file is represented by a "Queue Item" card.

### File 1: `product-hero-01.jpg` (Uploading)
- **Thumbnail:** A generic "Image" placeholder icon.
- **Metadata:** "2.4 MB" displayed next to the title.
- **Progress:** A horizontal bar at 45% completion.
- **Actions:** A "Cancel" (X) button on the far right.

### File 2: `brand-guidelines.pdf` (Error)
- **Thumbnail:** A red "PDF" file icon.
- **Metadata:** "15.8 MB" (Text in red).
- **Feedback:** A small "!" icon and text: "Exceeds 10MB limit."
- **Actions:** A "Remove" button to clear the failed item.

### File 3: `team-photo.png` (Success)
- **Thumbnail:** A small 48x48px preview of the actual image.
- **Metadata:** "1.1 MB" with a green checkmark icon.
- **Feedback:** "Upload Complete."
- **Actions:** A "Copy Link" icon and a "Bin" (Delete) icon.

## 4. Final State: Library Update
As files complete, they move from the "Queue" (Temporary) into the "Media Grid" (Persistent).

- **Transition:** The "Success" item fades out of the queue and appears as the first item in the Media Grid below.
- **Grid Layout:** 1:1 aspect ratio cards showing the full image preview, title, and "Edit" action.

## Responsive Adaptation (Mobile View)

- **The Trigger:** The large drop zone becomes a full-width, 80px tall button with the text "Upload Media."
- **The Queue:** Items stack vertically. The progress bar takes up the full width below the file name.
- **Thumb Targets:** The "Cancel" and "Remove" buttons are enlarged to 44x44px for easy tapping.
