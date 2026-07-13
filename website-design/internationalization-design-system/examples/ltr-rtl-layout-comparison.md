# LTR vs. RTL Layout Comparison

This example demonstrates how a standard dashboard interface mirrors when
transitioning from a Left-to-Right (LTR) locale to a Right-to-Left (RTL) locale.

## Scenario: User Dashboard Card

### LTR (English) Configuration

In an LTR interface, the visual gravity pulls to the top-left.

1.  **Avatar:** Positioned in the top-left corner.
2.  **User Name & Role:** Left-aligned, following the avatar.
3.  **Status Badge:** Positioned in the top-right corner.
4.  **Action Buttons:** "Edit" (Secondary) and "Message" (Primary) are
    right-aligned in the footer.
5.  **Progress Bar:** Fills from left to right.

### RTL (Arabic) Configuration

When mirrored, the visual gravity shifts to the top-right.

1.  **Avatar:** Flips to the top-right corner.
2.  **User Name & Role:** Right-aligned, following the avatar.
3.  **Status Badge:** Flips to the top-left corner.
4.  **Action Buttons:** Mirror their order. "Message" (Primary) and "Edit"
    (Secondary) are now left-aligned in the footer, but the "Message" button
    remains in the "conclusion" position (now the far left).
5.  **Progress Bar:** Fills from right to left.

## Visual Breakdown

| Element           | LTR Property           | RTL Property           | Logic Type  |
| :---------------- | :--------------------- | :--------------------- | :---------- |
| Sidebar Nav       | `left: 0;`             | `right: 0;`            | Mirror      |
| "Back" Arrow      | Points Left (←)        | Points Right (→)       | Directional |
| Progress Bar      | `transform-origin: left;`| `transform-origin: right;`| Directional |
| Form Labels       | `text-align: left;`    | `text-align: right;`   | Mirror      |
| "Search" Icon     | Leading (Left)         | Leading (Right)        | Mirror      |
| Media Player Play | Points Right (▶)       | Points Right (▶)       | Static      |

## Key Adjustments

### 1. The "Back" vs. "Forward" Logic
In LTR, "Forward" is Right. In RTL, "Forward" is Left.
- **Example:** A "Next Page" button in a pagination component should point
  **Left** in an Arabic interface because that is the direction of progress.

### 2. Form Alignment
- In RTL, the labels and the input text should both be right-aligned.
- Help text and error messages must also shift to the right to maintain
  proximity to the start of the text.

### 3. Iconography Exceptions
Notice the **Media Player Play** button above.
- Why is it static? Because standard media controls (Play, Pause, Fast Forward)
  are universal symbols tied to the physical direction of tape/film in
  international hardware standards. Flipping them would confuse users.
- **Other Static Icons:** Clocks (hands move clockwise globally), Checkmarks,
  and brand logos (unless specifically localized).
