# ElementInternals & Constraint Validation Reference

This document provides deep technical details, W3C specification behaviors, and browser mechanics for building Form-Associated Custom Elements (FACE) using the `ElementInternals` API.

---

## 1. `ElementInternals` API Summary

When `static formAssociated = true;` is declared on a custom element class, calling `this.attachInternals()` returns an `ElementInternals` object. This object grants private access to internal form control interfaces without exposing internal state methods directly on the public element instance.

### Key Methods

| Method | Signature | Purpose |
| :--- | :--- | :--- |
| `setFormValue()` | `setFormValue(value, state?)` | Synchronizes the element's submitted value with the parent `<form>`. Value can be a `string`, `File`, `FormData` instance, or `null`. Optional `state` parameter stores state for session restore. |
| `setValidity()` | `setValidity(flags, message?, anchor?)` | Updates the element's constraint validation status. `flags` is a `ValidityStateFlags` dictionary. `message` is displayed in native browser error bubbles. `anchor` is an internal Shadow DOM node used for bubble positioning. |
| `checkValidity()` | `checkValidity(): boolean` | Evaluates if the element satisfies its constraints without displaying UI popups. Fires an `invalid` event if false. |
| `reportValidity()` | `reportValidity(): boolean` | Evaluates constraints, fires an `invalid` event if false, and pops up the native browser error message pointing to the `anchor`. |

### Key Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `form` | `HTMLFormElement \| null` | Reference to the enclosing `<form>` element, or `null` if unattached. |
| `labels` | `NodeList` | List of associated `<label>` elements pointing to this custom element via `for="id"` or nesting. |
| `validity` | `ValidityState` | Read-only boolean flag dictionary reflecting the validity state set by `setValidity()`. |
| `validationMessage` | `string` | The error message string configured during the last `setValidity()` call. |
| `willValidate` | `boolean` | Indicates whether the element will be evaluated during form submission (returns `false` if `disabled` or not form-associated). |
| `states` | `CustomStateSet` | Read-only set for managing custom CSS pseudo-classes (`:state(...)`). |

---

## 2. Constraint Validation Flags (`ValidityStateFlags`)

When invoking `internals.setValidity(flags, message, anchor)`, the first argument is an object specifying which validation criteria failed. To mark the element as valid, pass `{}` as the flags object.

```javascript
// Example: Setting a valueMissing error
internals.setValidity(
  { valueMissing: true },
  'This custom field is required.',
  shadowFocusTarget
);

// Example: Clearing all error flags (Marking element as valid)
internals.setValidity({});
```

### Supported Validation Flags

| Flag | Trigger Scenario | Standard Equivalent |
| :--- | :--- | :--- |
| `valueMissing` | Control is `required` but value is null, empty string, or zero-length array. | `<input required>` |
| `typeMismatch` | Value does not conform to expected format (e.g. invalid email format in custom input). | `<input type="email">` |
| `patternMismatch` | Value does not match a required Regular Expression pattern. | `<input pattern="...">` |
| `tooLong` | String length exceeds configured maximum length constraint. | `<input maxlength="...">` |
| `tooShort` | String length is shorter than configured minimum length constraint. | `<input minlength="...">` |
| `rangeUnderflow` | Numeric or date value is below configured minimum limit. | `<input min="...">` |
| `rangeOverflow` | Numeric or date value exceeds configured maximum limit. | `<input max="...">` |
| `stepMismatch` | Value does not align with allowed step increments. | `<input step="...">` |
| `badInput` | User input cannot be converted to expected value type. | `<input type="number">` with text |
| `customError` | Business logic validation failed (set via `setValidity({ customError: true }, msg)`). | `input.setCustomValidity(msg)` |

---

## 3. Shadow DOM Validation Anchor Rules

The 3rd argument to `setValidity(flags, message, anchor)` specifies which element inside the Shadow DOM should anchor the browser's native validation popup and receive focus when validation fails.

### Anchor Constraints & Requirements

1. **Descendant Rule:** `anchor` MUST be an `HTMLElement` or `SVGElement` node located **inside** the component's `shadowRoot`. Passing an element outside the shadow tree throws a `TypeError`.
2. **Focusability:** The anchor node SHOULD have a valid `tabindex="0"` or be a natively focusable element (e.g., `<button>`, `<input>`) so keyboard focus moves smoothly to it.
3. **Optionality:** If omitted, the browser defaults to positioning the popup bubble near the host custom element itself.

```javascript
// Correct: Anchor is a child within Shadow DOM
const focusableControl = this.shadowRoot.querySelector('.rating-slider');
this.#internals.setValidity({ rangeUnderflow: true }, 'Value too low', focusableControl);
```

---

## 4. Form Lifecycle Callbacks Mechanics

Form-Associated Custom Elements automatically receive notifications from the browser when form state changes occur:

```javascript
class CustomInput extends HTMLElement {
  static formAssociated = true;

  // 1. Triggered on form.reset()
  formResetCallback() {
    this.value = this.getAttribute('value') || '';
  }

  // 2. Triggered when host or parent <fieldset disabled> toggles
  formDisabledCallback(disabled) {
    this.shadowRoot.querySelector('input').disabled = disabled;
    this.setAttribute('aria-disabled', String(disabled));
  }

  // 3. Triggered on browser session restore or autocomplete fill
  formStateRestoreCallback(state, mode) {
    // mode is either 'restore' or 'autocomplete'
    if (state) this.value = state;
  }

  // 4. Triggered when connected to or disconnected from <form>
  formAssociatedCallback(form) {
    if (form) console.log('Attached to form:', form.id);
  }
}
```

---

## 5. Label Association & Focus Redirection

Custom Elements associated with HTML `<label for="element-id">` elements benefit from automatic label linkage:

1. **`internals.labels` NodeList:** Access all linked `<label>` elements via `this.#internals.labels`.
2. **Click Forwarding:** When a user clicks a connected `<label>`, the browser automatically delegates focus to the host custom element. Ensure your custom element handles focus by defining a `focus()` method or placing `tabindex="0"` on the Shadow DOM container.

```javascript
focus(options) {
  // Direct focus to primary interactive control in Shadow DOM
  const target = this.shadowRoot.querySelector('[tabindex="0"]') || this;
  target.focus(options);
}
```

---

## 6. Browser Engine Compatibility & Polyfills

Form-Associated Custom Elements (`ElementInternals`) are natively supported across all modern browsers:
- **Chrome / Edge:** Version 77+
- **Firefox:** Version 93+
- **Safari:** Version 16.4+ (iOS & macOS)

For environments requiring support for older WebKit or legacy browser versions, include the framework-agnostic `element-internals-polyfill` prior to custom element definitions.
