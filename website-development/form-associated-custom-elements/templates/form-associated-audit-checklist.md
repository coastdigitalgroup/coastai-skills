# Form-Associated Custom Element (FACE) Audit Checklist

Use this checklist to inspect, test, and audit custom Web Components for complete compatibility with native HTML form submission, constraint validation, lifecycle events, and accessibility standards.

---

## 1. Class Declaration & Registration

- [ ] **Static Association Flag:** Does the component class declare `static formAssociated = true;` as a static class property before component registration?
- [ ] **Internals Attachment:** Is `this.attachInternals()` invoked in the class `constructor()` and stored in a private/instance property?
- [ ] **Custom Element Definition:** Is the custom element defined via `customElements.define('my-element', MyElement)` without throwing registration errors?

---

## 2. Form Submission & `FormData` Integration

- [ ] **Value Synchronization (`setFormValue`):** Does the component call `internals.setFormValue(value)` whenever its internal state changes?
- [ ] **`FormData` Retrieval:** Does `new FormData(form).get(element.name)` return the expected value format (string, File, or FormData entries)?
- [ ] **Empty State Handling:** Does the component set `internals.setFormValue(null)` or `""` when cleared/unselected so blank values submit predictably?
- [ ] **Name Attribute Mirroring:** Does changing or removing the `name` attribute update the form submission key dynamically?

---

## 3. Constraint Validation & Error Reporting

- [ ] **Validity State Mirroring:** Does `element.validity` return the native `ValidityState` object from `internals.validity`?
- [ ] **`checkValidity()` Integration:** Does `form.checkValidity()` return `false` when the component is in an invalid state (e.g. `required` and unselected)?
- [ ] **`reportValidity()` & Bubble Target:** Does `form.reportValidity()` display the native browser validation popup anchored to the component's internal focus target?
- [ ] **Validity Reset:** Does `internals.setValidity({})` execute when invalid input is corrected, clearing the error flags?
- [ ] **Focus Anchor descendant check:** Is the 3rd parameter passed to `setValidity(flags, message, anchor)` a descendant node inside `shadowRoot` (or omitted)?

---

## 4. Form Lifecycle Callbacks

- [ ] **Form Reset (`formResetCallback`):** Does calling `form.reset()` or clicking a reset button restore the component's value and visual UI to its default initial state?
- [ ] **Fieldset Disabling (`formDisabledCallback`):** Enclosing the component in `<fieldset disabled>` disables component interaction, updates `tabindex="-1"`, and applies appropriate disabled CSS styling.
- [ ] **Session Restore (`formStateRestoreCallback`):** Does browser page restoration or autocomplete restore state via `formStateRestoreCallback(state, mode)`?
- [ ] **Form Association (`formAssociatedCallback`):** Does the component react appropriately when dynamically appended to or removed from a `<form>` element?

---

## 5. Standard Form Control Property Mirroring

- [ ] **Property Getters/Setters:** Does the component expose native form getters/setters for:
  - [ ] `form` (returns parent `HTMLFormElement` or `null`)
  - [ ] `name`
  - [ ] `type`
  - [ ] `value`
  - [ ] `disabled`
  - [ ] `required`
  - [ ] `validity`
  - [ ] `validationMessage`
  - [ ] `willValidate`
  - [ ] `checkValidity()`
  - [ ] `reportValidity()`

---

## 6. Accessibility & ARIA Integration

- [ ] **Label Association:** Does clicking a `<label for="element-id">` transfer focus directly to the component or its primary interactive control?
- [ ] **ARIA Role & States:** Does the interactive element inside Shadow DOM expose appropriate ARIA roles (`slider`, `spinbutton`, `checkbox`, `combobox`) and updated ARIA state attributes (`aria-valuenow`, `aria-checked`, `aria-disabled`, `aria-invalid`)?
- [ ] **Keyboard Navigation:** Can the component be operated using standard keyboard keys (`Tab`, `Space`, `Enter`, `Arrow` keys, `Home`, `End`)?
- [ ] **Focus Visible Indicator:** Is a clear focus ring displayed when navigating via keyboard (`:focus-visible`)?
