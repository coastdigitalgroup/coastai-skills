# Example: SaaS Dashboard Analytics Breakdown

This example demonstrates the application of the **Data Visualization System** to a standard SaaS "Executive Overview" dashboard, transforming raw data into actionable insights while maintaining accessibility.

## Scenario
A project manager needs to see user growth, revenue by plan type, and system uptime on a single page.

## 1. User Growth (Trend Analysis)
- **Data Relationship:** Comparison over time (12 months).
- **Selected Chart:** Line Chart.
- **System Application:**
    - **Optical Normalization:** 16:9 aspect ratio to avoid exaggerating small growth spurts.
    - **Labeling:** Every 3rd month labeled on X-axis (Jan, Apr, Jul, Oct) to reduce clutter.
    - **Interaction:** Hovering over the line reveals a tooltip with the exact user count and % change from the previous month.
    - **Accessibility:** Line uses a solid 2px stroke with a distinct color (Primary Blue) and a secondary encoding: a subtle circular marker at each data point.

## 2. Revenue by Plan (Composition)
- **Data Relationship:** Part-to-whole (Basic, Pro, Enterprise).
- **Selected Chart:** Donut Chart (3 categories).
- **System Application:**
    - **The "Pie Chart" Rule:** Only 3 categories used.
    - **Direct Labeling:** Instead of a separate legend, labels and percentages (e.g., "Pro: 45%") are placed directly next to the segments.
    - **Color Palette:** High-contrast, colorblind-safe colors (Blue, Orange, Teal).
    - **Interaction:** Clicking a segment highlights it and filters a secondary "Recent Transactions" table below.

## 3. System Uptime (Status Distribution)
- **Data Relationship:** Distribution/Status over 30 days.
- **Selected Chart:** Heatmap/Status Grid (a row of 30 bars).
- **System Application:**
    - **Semantic Coloring:** Green for 100%, Yellow for partial outage, Red for major outage.
    - **Double Encoding:** Each bar has an `aria-label` stating the date and status (e.g., "Oct 12: 99.9% Uptime, Healthy").
    - **Responsive Strategy:** On mobile, the 30-day view collapses to the last 7 days with a "View Full History" link.

## 4. Feature Usage (Category Comparison)
- **Data Relationship:** Comparison between categories (Top 5 features).
- **Selected Chart:** Horizontal Bar Chart.
- **System Application:**
    - **Sorting Logic:** Sorted from most-used feature to least-used.
    - **Zero-Baseline:** X-axis starts at 0.
    - **Direct Labeling:** Feature names are placed to the left of the bars, right-aligned for readability.

---

## Visual Comparison: Before vs. After

| Feature | "Generic" Implementation | Data Visualization System Applied |
| :--- | :--- | :--- |
| **Growth Chart** | Spaghetti lines with 10 variables. | Simplified to 3 core series; "Small Multiples" for others. |
| **Color** | Random palette from a CSS library. | 3:1 contrast compliant; double-encoded with symbols. |
| **Axes** | Auto-scaled Y-axis starting at 5k. | Y-axis starts at 0 to show true growth scale. |
| **Mobile** | Tiny, unreadable chart that overflows. | Truncated X-axis; horizontal scroll for bar charts. |
| **Access** | Images without alt text. | Accompanied by hidden-but-accessible <table> summary. |
