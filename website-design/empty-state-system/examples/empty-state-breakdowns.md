# Empty State System: Design Breakdowns

This document analyzes two distinct types of empty states: **Zero-Results
Search** (a failure-to-find state) and **First-Run Dashboard** (an onboarding
state).

---

## Example 1: Zero-Results Search (E-commerce)

**Scenario:** A user searches for "Red Waterproof Boots" on a footwear site, but
the combination of filters and keywords yields no matches.

### The Breakdown

1.  **The Visual (Anchor):**
    - A stylized, low-contrast magnifying glass icon.
    - Purpose: Quickly signals "Search" context without being visually heavy.
2.  **The Headline (Context):**
    - "No matches found for 'Red Waterproof Boots'."
    - Purpose: Validates the user's input and confirms the system is working.
3.  **The Body (Helpfulness):**
    - "Try adjusting your filters or searching for something more general like
      'Waterproof Boots'."
    - Purpose: Reduces friction by suggesting a specific pivot.
4.  **Secondary Action (Discovery):**
    - **Button:** "Clear All Filters" (Primary Weight).
    - **Links:** "View Best Sellers", "New Arrivals".
    - Purpose: Prevents a dead-end by guiding the user back into the catalog.

### Decision Rule Applied

- **Direct vs. Indirect:** Since the user cannot "create" boots, the focus is on
  **Indirect Discovery** (Clear filters, Best sellers).

---

## Example 2: First-Run Dashboard (SaaS)

**Scenario:** A new user has just logged into a Task Management app. Their "My
Projects" view is empty.

### The Breakdown

1.  **The Visual (Anchor):**
    - A friendly illustration of a person organizing a clean workspace.
    - Purpose: Sets a positive, aspirational tone for onboarding.
2.  **The Headline (Context):**
    - "Organize your first project."
    - Purpose: Focuses on the _benefit_ (organizing) rather than the _absence_
      (empty).
3.  **The Body (Onboarding):**
    - "Projects help you keep your team aligned and your tasks on track. Create
      a project from scratch or start with a template."
    - Purpose: Explains the value proposition and lowers the barrier to entry.
4.  **Primary Action (Onboarding):**
    - **Button:** "Create New Project" (High Visibility).
    - **Text Link:** "Browse Templates".
    - Purpose: Provides a single, clear path to the core product experience.

### Decision Rule Applied

- **The One-Action Rule:** The "Create New Project" button is the singular
  focus, ensuring the user knows exactly how to start.

---

## Comparison Table

| Feature            | Zero-Results Search    | First-Run Dashboard      |
| :----------------- | :--------------------- | :----------------------- |
| **Tone**           | Helpful & Corrective   | Aspirational & Welcoming |
| **Primary Goal**   | Return to Browsing     | Initial Creation         |
| **Visual Element** | Functional Icon        | Descriptive Illustration |
| **CTA Strategy**   | "Reset" or "Explore"   | "Create" or "Start"      |
| **Success Metric** | Search Refinement Rate | Time to First Creation   |
