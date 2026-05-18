# Example: Multi-Step Registration Form Breakdown

This example demonstrates the Form Design System applied to a complex user
onboarding flow. By breaking the form into logical steps and applying consistent
visual hierarchy, we reduce cognitive load and increase completion rates.

## The Problem

A SaaS platform has a 12-field registration form. In its original state, it was
a single-column wall of text with mixed label alignments, small touch targets,
and vague error messages. Drop-off rates were high, especially on mobile.

## The Solution: Systematic Form Design

### 1. Spatial Organization (Multi-Step)

Instead of a single "wall," the form is divided into three thematic steps:

- **Step 1: Account Basics** (Email, Password)
- **Step 2: Profile Details** (Full Name, Job Title, Industry)
- **Step 3: Company Info** (Company Name, Size, Website)

### 2. Field Anatomy Applied

Each field in Step 1 follows the standard anatomy:

```text
[Label: Email Address]
[Input: (type="email") placeholder="e.g., alex@company.com"]
[Helper Text: We'll send a verification link to this address.]
[Error State (Hidden): Please enter a valid email address.]
```

### 3. Visual Hierarchy of Actions

At the bottom of Step 2, the actions are prioritized:

- **Primary Action (Level 1):** "Continue to Company Info" (Filled Button, Brand
  Color).
- **Secondary Action (Level 2):** "Back to Account Basics" (Outlined Button or
  Text Link).

### 4. Selection Control Decision

For "Industry" (Step 2) and "Company Size" (Step 3):

- **Company Size:** 4 options (1-10, 11-50, 51-200, 201+).
  - _Decision:_ **Radio Buttons**. The user can see all options at once,
    reducing the interaction cost of a dropdown.
- **Industry:** 25 options.
  - _Decision:_ **Searchable Select (Dropdown)**. Avoids overwhelming the page
    with a long list of radios.

### 5. Responsive Adaptation

On **Desktop (1200px)**:

- Step 1 and 2 fields use a 2-column grid to save vertical space where related
  (e.g., First Name and Last Name on the same line).

On **Mobile (375px)**:

- All fields stack into a **Single Column**.
- Labels remain **Top-Aligned**.
- Touch targets for Radio Buttons are expanded to a full-width "Tile" pattern
  (min-height 48px).

## Results of the System

- **Scannability:** Users process the form 40% faster due to consistent
  top-aligned labels.
- **Accessibility:** Keyboard users can navigate the multi-step flow using
  standard tab patterns and clear focus rings.
- **Trust:** Contextual help text reduces anxiety about data privacy and
  requirements.
