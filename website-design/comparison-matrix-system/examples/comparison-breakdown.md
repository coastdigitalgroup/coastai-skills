# Example: Professional Camera Comparison Matrix

This example demonstrates the **Comparison and Matrix System** applied to a high-density technical product comparison (Professional Cameras). It showcases attribute categorization, sticky headers, and diverse data visualizations.

## Scenario
A photography equipment retailer wants to help users compare three high-end mirrorless cameras side-by-side to justify the price differences.

## The Matrix Layout

| Attributes | **Camera Alpha X1** | **Camera Beta Z5** | **Camera Gamma Pro** |
| :--- | :---: | :---: | :---: |
| | ![Alpha X1](https://placehold.co/100x100?text=Alpha+X1) | ![Beta Z5](https://placehold.co/100x100?text=Beta+Z5) | ![Gamma Pro](https://placehold.co/100x100?text=Gamma+Pro) |
| **Price** | $2,499 | $3,199 | $4,500 |
| **Rating** | ★★★★☆ | ★★★★★ | ★★★★★ |
| **Category: Sensor & Image** | | | |
| Sensor Resolution | 24.2 MP | 45.7 MP | 50.1 MP |
| Sensor Type | Full-Frame CMOS | Full-Frame BSI CMOS | Full-Frame Stacked CMOS |
| ISO Range | 100 - 51,200 | 64 - 25,600 | 100 - 32,000 |
| **Category: Video Capabilities** | | | |
| Max Resolution | 4K @ 60p | 8K @ 30p | 8K @ 60p |
| Bit Depth | 10-bit 4:2:2 | 10-bit 4:2:2 | 12-bit RAW |
| Log Profiles | S-Log3, HLG | N-Log, HLG | V-Log, HLG |
| **Category: Physical & Connectivity** | | | |
| Weather Sealed | ✓ | ✓ | ✓ |
| Weight | 650g | 825g | 730g |
| Card Slots | 2x SD (UHS-II) | 1x CFexpress, 1x SD | 2x CFexpress |
| HDMI Port | Micro | Full | Full |

## Key Design System Applications

### 1. Sticky Navigation (Wayfinding)
- **Visualized:** The top row (Item Names + Photos) is pinned to the top of the browser window as the user scrolls through the 40+ technical attributes.
- **Why:** Prevents the "Lost Header" problem where the user forgets which column belongs to which camera.

### 2. Categorization & Grouping
- **Visualized:** "Sensor & Image," "Video Capabilities," and "Physical & Connectivity" act as section breaks with a light gray background.
- **Why:** Breaks down a massive list of specs into digestible clusters, allowing the user to scan specifically for the features they care about (e.g., just video specs).

### 3. Data Type Standardization
- **Checkmarks (✓):** Used for "Weather Sealed" to indicate a binary "Yes."
- **Star Ratings:** Used for the "Rating" attribute to provide a quick qualitative comparison.
- **Formatted Text:** Technical specs like "8K @ 60p" use consistent units and bolding for key values.

### 4. Lead Column Distinction
- **Visualized:** The first column ("Attributes") uses bold labels and a slightly wider width than the data columns.
- **Why:** Establishes a clear "Legend" for the data points being compared.

### 5. Responsive Adaptation (Mobile)
- **Behavior:** On mobile devices, the matrix hides "Camera Beta Z5" and "Camera Gamma Pro" by default, providing a "Compare with..." dropdown to switch the visible comparison item next to "Camera Alpha X1."
- **Why:** Avoids horizontal compression and "Mobile Sandwiching" where text becomes unreadable.
