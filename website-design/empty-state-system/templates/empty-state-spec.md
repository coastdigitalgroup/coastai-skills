# Empty State Component Specification

Use this template to document and hand off empty state designs to developers.
This ensures all functional and accessibility requirements are captured.

## 1. Context & Trigger

- **Component Name:** `[e.g., EmptyProjectList]`
- **Trigger Condition:** `[e.g., projects.length === 0 && !loading]`
- **Parent Container:** `[e.g., Main Dashboard Grid]`

## 2. Structural Requirements

| Element           | Description/Copy           | Implementation Notes                      |
| :---------------- | :------------------------- | :---------------------------------------- |
| **Visual Anchor** | `[File Path or Icon Name]` | Set `aria-hidden="true"`.                 |
| **Headline (H3)** | `[Headline Copy]`          | Keep under 50 characters.                 |
| **Body Text**     | `[Instructional Copy]`     | Max 2 sentences.                          |
| **Primary CTA**   | `[Button Text]`            | `variant="primary"`. Trigger: `[Action]`. |
| **Secondary CTA** | `[Link or Button Text]`    | `variant="ghost"`. Trigger: `[Action]`.   |

## 3. Responsive Behavior

- **Mobile (<768px):** Elements stack vertically. Center text and buttons.
  Illustration size reduces by 25%.
- **Desktop (>1024px):** Max width of container: 600px. Standard spacing:
  `fluid-spacing-system`.

## 4. Accessibility Specs

- **Role:** `role="status"` (for dynamic updates) or `role="region"` with
  `aria-label`.
- **Focus Management:** If triggered by a search/filter, maintain focus in the
  search input. If it's a page load, the container should be reachable via
  keyboard.
- **Contrast:** Ensure all text passes WCAG AA (4.5:1).

## 5. Interaction States

- **Hover/Active:** Follow `interactive-state-system`.
- **Loading:** This component should NOT be visible while `isLoading` is true.

---

### Implementation Snippet (Example)

```html
<div class="empty-state-container" role="status">
  <!-- Visual Anchor -->
  <img src="/assets/ill-empty.svg" alt="" aria-hidden="true" />

  <!-- Content -->
  <div class="empty-state-content">
    <h3>[Headline]</h3>
    <p>[Context and benefit-driven instruction]</p>

    <!-- Actions -->
    <div class="empty-state-actions">
      <button class="btn btn-primary">[Primary Action]</button>
      <a href="#" class="btn btn-link">[Secondary Action]</a>
    </div>
  </div>
</div>
```
