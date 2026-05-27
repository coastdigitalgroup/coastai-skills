# Table Anatomy Blueprint

Use this template to define the structural rules for a new table component.

## 1. Structural Containers
- **Container:** `max-width: 100%`, `overflow-x: auto`.
- **Caption:** `text-align: left`, `margin-bottom: --space-s`.

## 2. Header (`<thead>`)
- **Background:** `[Insert Color Token]`
- **Text Style:** `[Insert Typography Token]`
- **Height:** `[Insert Height, e.g., 40px]`
- **Border:** `[Insert Border Style]`

## 3. Cells (`<th>`, `<td>`)
- **Horizontal Padding:** `[Insert Spacing Token, e.g., --space-m]`
- **Vertical Padding:** `[Insert Spacing Token based on density]`
- **Font Size:** `[Insert Token]`

## 4. Column Map Spec
Use this table to document the "Rules of the Road" for each column.

| Column Name | Data Type | Alignment | Width (Fixed/Fluid) | Truncate? |
| ----------- | --------- | --------- | ------------------- | --------- |
|             |           |           |                     |           |
|             |           |           |                     |           |
|             |           |           |                     |           |

## 5. Interaction Styles
- **Hover:** `background-color: [Color]`
- **Selected:** `background-color: [Color]`, `border-left: 4px solid [Color]`
- **Focus (Keyboard):** `outline: 2px solid [Color]`, `outline-offset: -2px`

## 6. Empty State Template
- **Message:** "No [Entity] found matching your criteria."
- **Action:** [Button: Clear Filters]
