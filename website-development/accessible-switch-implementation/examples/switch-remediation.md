# Switch Remediation Example

This example demonstrates how to transform a highly inaccessible, custom `div`-based toggle switch into a robust, ARIA-compliant, keyboard-accessible toggle switch component.

---

## The "Before" Code (Inaccessible)

This custom toggle switch is visually appealing but has major accessibility flaws:
- Built with a `<div>` which is not in the tab order (keyboard users cannot reach it).
- Lacks a screen reader role, meaning blind users hear only the static text with no indication of interactivity.
- Communicates its state (`active` vs `inactive`) using CSS classes only, which is invisible to screen readers.
- Cannot be activated with `Space` or `Enter`.
- Focus outlines are hidden, and it has no high-contrast mode fallback.

```html
<!-- INACCESSIBLE DIV-BASED SWITCH -->
<div class="setting-row">
  <span class="setting-title">Enable Dark Mode</span>

  <div class="bad-switch" id="theme-switch" onclick="toggleTheme()">
    <div class="bad-thumb"></div>
  </div>
</div>

<style>
  .setting-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: sans-serif;
    max-width: 300px;
  }
  .bad-switch {
    width: 50px;
    height: 24px;
    background-color: #ccc;
    border-radius: 12px;
    position: relative;
    cursor: pointer;
  }
  .bad-switch.active {
    background-color: #4CAF50;
  }
  .bad-thumb {
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    position: absolute;
    top: 2px;
    left: 2px;
    transition: left 0.2s;
  }
  .bad-switch.active .bad-thumb {
    left: 28px;
  }
</style>

<script>
  function toggleTheme() {
    const el = document.getElementById('theme-switch');
    el.classList.toggle('active');
    // Actual logic to change theme...
  }
</script>
```

---

## The "After" Code (Accessible & Fully Compliant)

We remediate the switch by using a native `<button>` element with `role="switch"`.
- The `<button>` natively accepts focus and is reachable via the `Tab` key.
- The `role="switch"` informs screen readers of the type of element.
- The `aria-checked` attribute tells assistive technology whether the setting is On or Off.
- Keyboard interactions (`Space` and `Enter`) are handled natively by the `<button>`.
- Added CSS `:focus-visible` styles to ensure keyboard users have a high-visibility ring.
- Included high-contrast mode fallbacks using `@media (forced-colors: active)`.
- Implemented a touch target size of 44x44px.

```html
<!-- ACCESSIBLE BUTTON-BASED SWITCH -->
<div class="setting-row">
  <span id="label-theme" class="setting-title">Enable Dark Mode</span>

  <button type="button"
          role="switch"
          id="theme-switch-btn"
          aria-checked="false"
          aria-labelledby="label-theme"
          class="accessible-switch">
    <span class="switch-thumb"></span>
  </button>
</div>

<style>
  :root {
    --switch-width: 50px;
    --switch-height: 26px;
    --thumb-size: 20px;
    --thumb-gap: 3px;
  }

  .setting-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: sans-serif;
    max-width: 300px;
    padding: 8px 0;
  }

  .setting-title {
    font-size: 1rem;
    color: #1e293b;
  }

  /* Accessible Switch Base */
  .accessible-switch {
    width: var(--switch-width);
    height: var(--switch-height);
    background-color: #94a3b8; /* Outlined inactive background (Contrast: 3.5:1) */
    border: 2px solid transparent;
    border-radius: 9999px;
    position: relative;
    cursor: pointer;
    padding: 0;
    transition: background-color 0.2s ease, border-color 0.2s ease;

    /* Ensure touch target meets the 44px height standard */
    box-sizing: content-box;
    min-height: var(--switch-height);
  }

  /* Click/Tap size expander for perfect WCAG 2.5.8 touch targets */
  .accessible-switch::after {
    content: '';
    position: absolute;
    top: -9px;
    bottom: -9px;
    left: -9px;
    right: -9px;
  }

  /* Thumb Style */
  .switch-thumb {
    display: block;
    width: var(--thumb-size);
    height: var(--thumb-size);
    background-color: #ffffff;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: var(--thumb-gap);
    transform: translateY(-50%);
    transition: left 0.2s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  }

  /* Switch States */
  .accessible-switch[aria-checked="true"] {
    background-color: #059669; /* Active Green (Contrast: 3.2:1 against light) */
  }

  .accessible-switch[aria-checked="true"] .switch-thumb {
    left: calc(var(--switch-width) - var(--thumb-size) - var(--thumb-gap));
  }

  /* High Visibility Focus Ring */
  .accessible-switch:focus-visible {
    outline: 2px solid #2563eb;
    outline-offset: 4px;
    border-color: #1e3a8a;
  }

  /* Forced Colors (High Contrast) Fallback */
  @media (forced-colors: active) {
    .accessible-switch {
      border: 2px solid ButtonText;
    }
    .accessible-switch[aria-checked="true"] .switch-thumb {
      background-color: Highlight;
    }
  }
</style>

<script>
  const themeSwitch = document.getElementById('theme-switch-btn');

  themeSwitch.addEventListener('click', () => {
    // 1. Get current state
    const isChecked = themeSwitch.getAttribute('aria-checked') === 'true';
    const nextState = !isChecked;

    // 2. Update ARIA state
    themeSwitch.setAttribute('aria-checked', String(nextState));

    // 3. Trigger functional logic
    if (nextState) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  });
</script>
```

---

## Remediation Checklist & Differences

| Feature | Before (Inaccessible) | After (Accessible) |
|---|---|---|
| **Semantic Element** | `<div>` (unstructured) | `<button>` (natively interactive) |
| **Tab Accessibility** | Ignored (skipped in keyboard order) | Focusable (receives focus automatically) |
| **Screen Reader Announcement** | None (read only as raw text) | Announces as *"Enable Dark Mode, switch, off/on"* |
| **Keyboard Activation** | None | Handles `Space` and `Enter` keys natively |
| **Active States** | `.active` CSS class | `aria-checked="true/false"` state |
| **Focus Indication** | No outline | Visible 2px focus ring with high contrast |
| **High Contrast Fallback** | Invisible state changes | Outlined borders mapping to system colors |
| **Touch Target Area** | 50x24px (fails 44px min height) | Expanded to 44x44px virtual clickable area |
