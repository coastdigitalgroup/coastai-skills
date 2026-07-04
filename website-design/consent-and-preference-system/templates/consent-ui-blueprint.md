# Consent UI Blueprint

Use this blueprint to structure the two primary components of a consent system: the global notification banner and the detailed preference center.

## 1. Global Consent Banner (Floating Variant)

| Region | Component | Role | Requirement |
| :--- | :--- | :--- | :--- |
| **Container** | `div.consent-banner` | Wrapper | `fixed`, `bottom: 0`, `z-index: 9999` |
| **Header** | `h3.text-sm` | Context | "We value your privacy" |
| **Body** | `p.text-xs` | Info | Explain purpose of data collection |
| **Action 1** | `button.btn-primary` | Commit | "Accept All" |
| **Action 2** | `button.btn-outline` | Dismiss | "Reject All" (or "Only Necessary") |
| **Action 3** | `a.link` | Entry | "Manage Preferences" |

### Responsive Stacking
- **Desktop:** Horizontal layout or compact 320px floating box.
- **Mobile:** Full-width bottom sheet or vertical button stack.

---

## 2. Preference Center Modal

| Region | Component | Detail |
| :--- | :--- | :--- |
| **Backdrop** | `.modal-overlay` | 40% Opacity Scrim, blocks background clicks. |
| **Modal Header** | `.modal-title` | "Privacy Preference Center" + Close (X) |
| **Category List** | `.category-item` | Title + Toggle Switch + Description |
| **Toggle** | `input[type="checkbox"]` | Role="switch", Aria-checked="true/false" |
| **Footer Actions** | `.flex.gap-4` | "Save My Choices" (Primary) |

### Preference Category Template (Annotated)

```html
<!-- Example of a single category entry -->
<div class="category-group">
  <div class="category-header">
    <div class="category-info">
      <h4>Performance Cookies</h4>
      <p>These cookies allow us to count visits and traffic sources.</p>
    </div>
    <div class="toggle-container">
      <!-- Ensure id matches label for accessibility -->
      <input type="checkbox" id="cat-performance" class="toggle-input">
      <label for="cat-performance" class="toggle-label">Enable</label>
    </div>
  </div>
  <details class="category-details">
    <summary>View Cookies</summary>
    <ul>
      <li>Google Analytics (_ga) - 2 years</li>
      <li>Hotjar (_hjSession) - 30 mins</li>
    </ul>
  </details>
</div>
```

---

## 3. Persistent Privacy Trigger (Footer)

Place this within the `site-footer-system` structure:

```html
<nav aria-label="Legal">
  <ul>
    <li><a href="/privacy">Privacy Policy</a></li>
    <li><a href="/terms">Terms of Service</a></li>
    <!-- Trigger that re-opens the Consent Modal -->
    <li><button type="button" class="trigger-preferences">Cookie Settings</button></li>
  </ul>
</nav>
```

---

## 4. Interaction & State Rules

1. **Initial State:** Non-essential toggles set to `false`.
2. **Hover State:** Toggle switches change background color on hover.
3. **Focus State:** Clear focus ring around the currently active toggle or button.
4. **Transition:** Modal should fade-in/scale-up; Banner should slide-in from bottom.
