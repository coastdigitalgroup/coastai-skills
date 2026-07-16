# Contextual Help Breakdown

This example demonstrates how a complex SaaS dashboard uses different levels of micro-help to guide users through a sophisticated data entry task.

## The Problem
A user is setting up a "Dynamic Pricing Rule." The interface requires technical parameters that are not immediately obvious to non-experts.

## The Solution
We apply the **Tooltip and Hint System** to provide layered assistance.

### 1. The Icon-Label Tooltip (Utility)
- **Anchor:** A simple "Filter" icon button in the toolbar.
- **Problem:** On its own, the icon might be confused with "Search" or "Sort."
- **Applied Skill:** A tooltip appears on hover/focus that says "Advanced Filters."
- **Result:** Clarity for all users without adding text labels that would clutter the high-density toolbar.

### 2. The Definition Tooltip (Education)
- **Anchor:** The term "Liquidity Threshold" within a sentence.
- **Problem:** Users may not know the specific financial definition used by the platform.
- **Applied Skill:** The term is underlined with a dotted line. On hover, a tooltip provides a one-sentence definition.
- **Result:** Users learn while they work without leaving the flow.

### 3. The Inline Hint (Critical Instruction)
- **Anchor:** A "Minimum Margin" input field.
- **Problem:** This field has a strict business rule: it cannot be lower than the "Base Cost" plus 5%.
- **Applied Skill:** An inline hint is placed directly below the label: "Must be at least 5% above Base Cost."
- **Result:** The user sees the requirement *before* they make a mistake, preventing an error state.

### 4. The Coach Mark (Onboarding)
- **Anchor:** The "Activate Rule" button.
- **Problem:** A new user might be afraid to click "Activate" without knowing what happens next.
- **Applied Skill:** A high-contrast coach mark (with a pulse animation) points to the button with the text: "Ready to go live? Activating will apply this rule to all active listings immediately."
- **Result:** Reduces friction and anxiety for first-time users.

## Visual Hierarchy & Placement
- **Tooltips:** Positioned `top-center` to avoid blocking the user's view of the next line of text.
- **Hints:** Muted color (gray-600) to distinguish them from primary labels but enough contrast (4.5:1) for legibility.
- **Coach Marks:** Brand color background to grab attention in a quiet UI.
