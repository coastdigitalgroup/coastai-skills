# Skeleton Design Blueprint

Use this blueprint to define the skeleton states for your UI components. Copy
this into your design documentation or component spec.

## 1. Component Identity
- **Name:** [e.g., User Profile Card]
- **Parent Container:** [e.g., Sidebar, Main Grid]
- **Estimated Load Time:** [Short / Medium / Long]

## 2. Bone Anatomy Matrix

| Element Name | Shape | Width | Height / Aspect Ratio | Border Radius |
| :--- | :--- | :--- | :--- | :--- |
| [e.g., Avatar] | Circle | 48px | 48px | 50% |
| [e.g., Title] | Line | 70% | 20px | 4px |
| [e.g., Meta] | Line | 40% | 14px | 4px |
| [e.g., Image] | Rect | 100% | 16/9 | 8px |

## 3. Spatial Rules (CLS Prevention)
- [ ] **Fixed Heights:** Are all containers using fixed heights or aspect
      ratios?
- [ ] **Alignment:** Do the bones follow the same Flex/Grid alignment as the
      final UI?
- [ ] **Margins/Gaps:** Are the gaps between bones identical to the final
      design?

## 4. Interaction & Motion
- **Base Color:** [e.g., #E5E7EB]
- **Shimmer Color:** [e.g., #F3F4F6]
- **Shimmer Speed:** [e.g., 1.5s linear infinite]
- **Transition Out:** [e.g., 200ms ease-in opacity]

---

# Skeleton Usability Checklist

Before finalizing a skeleton design, verify it against these criteria:

- [ ] **The 300ms Rule:** Does this load actually take long enough to warrant a
      skeleton?
- [ ] **Geometric Primitives:** Are we using simple shapes (Circles/Rects)
      rather than complex icons?
- [ ] **Simulated Flow:** For text blocks, are the line lengths varied (e.g.,
      last line shorter)?
- [ ] **Responsiveness:** Does the skeleton scale correctly on Mobile viewports?
- [ ] **Aria-Hidden:** Is the skeleton explicitly hidden from screen readers?
- [ ] **Aria-Busy:** Is the parent container marked as "busy" during the load?
- [ ] **Visual Distinction:** Is the skeleton clearly "loading" and not just a
      broken state?
