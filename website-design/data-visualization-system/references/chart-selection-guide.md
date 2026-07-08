# Chart Selection Guide

Choosing the wrong chart type can obscure the truth or make data impossible to read. Use this guide to match your data's primary goal to the most effective visualization.

## 1. Comparison
*Goal: Show how values compare to each other or over time.*

| Goal | Best Chart | Why? |
| :--- | :--- | :--- |
| **Trend over Time** | **Line Chart** | Shows the "shape" of change and continuity. |
| **Discrete Time Periods** | **Column Chart** | Better for comparing specific months or years as units. |
| **Between Categories** | **Horizontal Bar** | Easiest for the eye to compare lengths; handles long labels well. |
| **Many Categories** | **Ranked List** | If you have 20+ items, a simple ranked list with bars is best. |

## 2. Composition
*Goal: Show how a total is broken down into parts.*

| Goal | Best Chart | Why? |
| :--- | :--- | :--- |
| **Part-to-Whole (Simple)** | **Donut Chart** | Best for 2-3 categories. Donut (hollow) is easier to read than Pie. |
| **Part-to-Whole (Complex)**| **Stacked Bar** | Better for comparing compositions across multiple categories. |
| **Flow/Process** | **Waterfall** | Shows how an initial value is affected by gains and losses. |

## 3. Distribution & Relationship
*Goal: Show how data points are spread or how they correlate.*

| Goal | Best Chart | Why? |
| :--- | :--- | :--- |
| **Frequency/Spread** | **Histogram** | Shows where data "bunches" up (e.g., age groups). |
| **Correlation** | **Scatter Plot** | Shows if one variable affects another (e.g., Price vs. Quality). |
| **3-Variable Correlation** | **Bubble Chart** | Uses X, Y, and Bubble Size to show three dimensions. |

## 4. Selection Flowchart (Mental Model)

1. **Do you have Time?**
   - Yes: Use a **Line Chart**.
   - No: Go to Step 2.
2. **Are you comparing Categories?**
   - Yes, and labels are short: Use **Column Chart**.
   - Yes, and labels are long: Use **Horizontal Bar Chart**.
   - No: Go to Step 3.
3. **Are you showing a Part-to-Whole?**
   - Yes, < 3 categories: Use **Donut Chart**.
   - Yes, > 3 categories: Use **Stacked Bar Chart**.
4. **Is it about Correlation?**
   - Yes: Use a **Scatter Plot**.

## 5. Summary of Constraints

- **Never** use 3D charts. They distort data and are harder to read.
- **Avoid** Pie charts for comparison; the human eye is poor at comparing angles.
- **Limit** the use of dual Y-axes; they are often misleading and confusing to users.
