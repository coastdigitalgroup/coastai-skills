# Example: Search Experience Breakdown (E-commerce)

This example demonstrates the application of the `search-interface-system` to a high-intent e-commerce journey, transitioning from a header trigger to a rich autocomplete and finally to a high-density results page.

## 1. The Search Trigger (Header)

In this scenario, search is the primary navigation method for users.

- **Pattern:** Persistent Bar.
- **Visuals:**
  - Width: 100% of the middle column in the header.
  - Background: White (high contrast against a light gray header).
  - Icon: Magnifying glass on the left; "Search" text as a placeholder.
  - Shortcut Hint: A small `[ / ]` or `[ K ]` badge on the right of the bar.

## 2. The Autocomplete Dropdown (Active Typing)

As the user types "run...", the system provides instant context.

- **Anatomy:**
  - **Category: Products (3 items)**
    - Item 1: [Thumbnail] Running Shoes - Pegasus 40 ($130)
    - Item 2: [Thumbnail] Trail Running Shorts ($45)
    - Item 3: [Thumbnail] Performance Socks ($15)
  - **Category: Categories (2 items)**
    - "Running Gear"
    - "Men's Running Apparel"
  - **Category: Help (1 item)**
    - "Running shoe size guide"
- **Visual Feedback:** The matching string "run" is **bolded** in every result title.
- **Selection:** The first result has a subtle light-blue background, indicating it is the "Active" selection for an `Enter` keypress.

## 3. The Search Results Page (SERP)

After pressing `Enter`, the user is taken to a dedicated results view.

- **Header Section:**
  - Breadcrumb: `Home > Search Results`
  - Title: `Results for "Running Shoes"` (shows 42 items).
- **Layout:**
  - **Left Sidebar:** Filters (Size, Color, Brand) using `filter-and-sort-system`.
  - **Main Content:** A 3-column grid of product cards.
- **Snippet Highlighting:** Below each product title, a short description shows the matching term: "...Engineered for **running** on roads, these **shoes** provide..."

## 4. Mobile Adaptation

On a mobile device (375px viewport):

- **Trigger:** Only a magnifying glass icon is visible in the top right.
- **Interaction:** Tapping the icon triggers a slide-up animation.
- **The Mode:** The header and navigation disappear, replaced by a large input at the top and the keyboard at the bottom.
- **Recent Searches:** Before the user types, the overlay shows "Recent Searches" and "Trending Now" to reduce typing effort.

---

## Analysis of Success

| Feature | Design Decision | Rationale |
| :--- | :--- | :--- |
| **Persistent Bar** | Visible by default | High-intent users don't have to "find" the search tool. |
| **Categorized Suggestions** | Grouped by type | Helps users pivot between buying a product and reading a guide. |
| **Query Echo** | Repeating "Running Shoes" | Confirms the system understood the user's intent. |
| **Full-screen Mobile** | Focus Mode | Minimizes distraction and maximizes screen space for the keyboard. |
| **Keyboard Shortcuts** | `Enter` and `Arrows` | Enables power-user speed and ensures accessibility. |
