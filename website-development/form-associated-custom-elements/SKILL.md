---
name: form-associated-custom-elements
description: Standardized framework and implementation patterns for Form-Associated Custom Elements (FACE) using ElementInternals to integrate custom Web Components with native HTML form submission, constraint validation, reset callbacks, and accessibility.
---

# Form-Associated Custom Elements (FACE)

## Purpose

Standard web application UI components—such as custom star rating pickers, tag multi-selects, segmented option toggles, custom sliders, signature pads, and rich date-range inputs—frequently fail when embedded inside native HTML `<form>` elements. Common points of failure include:

1. **Missing Form Data:** Component state values are ignored by standard form submission (`<form action="...">`), `new FormData(form)`, and `form.elements` collections.
2. **Bypassed Constraint Validation:** Native HTML5 validation (`form.checkValidity()`, `form.reportValidity()`, `:invalid` CSS selectors, and native browser validation popups) cannot inspect or report errors for custom elements.
3. **Ignored Form Lifecycle Events:** Calling `form.reset()` leaves custom components displaying stale data, while wrapping components in `<fieldset disabled>` fails to disable interaction or block validation.
4. **Broken Label & Accessibility Associations:** `<label for="my-custom-input">` clicks fail to focus internal component controls, and screen readers cannot discover component role or invalid state.

The **Form-Associated Custom Elements (FACE)** specification solves these issues via `ElementInternals` (`static formAssociated = true`, `this.attachInternals()`). This skill provides the architectural protocol, implementation patterns, lifecycle handlers, and validation workflows required to build custom Web Components that behave indistinguishably from standard HTML form controls (`<input>`, `<select>`, `<textarea>`).

---

## Use Cases

Apply this skill whenever building or refactoring custom UI controls that need to participate in HTML forms:

- **Custom Star Ratings or Gauges:** Submitting numeric ratings inside feedback or checkout forms.
- **Tag Multi-Selects & Chip Inputs:** Managing array-like or comma-separated lists of values inside search, filtering, or profile forms.
- **Custom Toggle & Segmented Switches:** Replacing checkboxes or radio groups with custom-styled binary/multi-option toggles.
- **Rich Sliders & Dual-Thumb Range Pickers:** Capturing bounded numeric ranges (e.g. min/max price filters) with custom UI.
- **Signature Pads & Canvas Inputs:** Serializing base64 PNG data, SVG paths, or binary Blobs into form submissions.
- **Rich Date/Time Range Selectors:** Combining multiple dropdowns or calendar grids into a single cohesive form control value.
- **Color Pickers & Palette Swatches:** Capturing hex, RGB, or HSL values in design configuration forms.

---

## When NOT to Use

Do **NOT** use Form-Associated Custom Elements in the following scenarios:

- **Non-Interactive UI Components:** Structural containers, layout cards, modals, tooltips, accordions, or navigation menus that do not submit data to a form.
- **Standard Native Inputs with Minor CSS Styling:** If native `<input type="checkbox">`, `<input type="radio">`, or `<select>` can achieve the target design using standard CSS (`appearance: none`, accent colors, custom pseudos), use native HTML controls instead.
- **Read-Only Data Display Components:** Badges, avatars, status indicators, or statistical displays.
- **Legacy Browser Support without Polyfills:** Environments targeting Internet Explorer 11 or legacy WebKit engines without an `ElementInternals` polyfill (`element-internals-polyfill`).

---

## Inputs

Implementing or auditing a Form-Associated Custom Element requires:

1. **Value Type & Data Structure:** A clear definition of the value type (string, number, array of strings, `File`, or `FormData` key-value pairs).
2. **Validation Rules & Constraints:** Requirements for `required`, minimum/maximum values, string length, regex patterns, or custom validation functions.
3. **Form Control Attributes:** Expected HTML attributes (`name`, `disabled`, `readonly`, `value`, `required`, `tabindex`, `autofocus`).
4. **Accessibility Roles & Labels:** ARIA role mappings (`spinbutton`, `slider`, `combobox`, `radiogroup`, `checkbox`) and label associations.
5. **Component Shadow DOM / Template:** The internal HTML structure and interactive sub-elements representing the control visually.

---

## Outputs

A complete Form-Associated Custom Element implementation provides:

1. **Form Value Integration:** Seamless inclusion in `new FormData(form)`, `URLSearchParams`, and `form.submit()` payload formats.
2. **Native Constraint Validation:** Full support for `internals.setValidity()`, `checkValidity()`, `reportValidity()`, `validity`, and `validationMessage`.
3. **Form Lifecycle Callbacks:** Working implementations of `formResetCallback()`, `formDisabledCallback(disabled)`, `formStateRestoreCallback(state, mode)`, and `formAssociatedCallback(form)`.
4. **Form Property Mirroring:** JavaScript getters and setters for `form`, `name`, `type`, `value`, `validity`, `validationMessage`, `willValidate`, `checkValidity()`, and `reportValidity()`.
5. **Focus & Label Redirection:** Clicking connected `<label>` elements or calling `element.focus()` smoothly focuses the primary interactive target inside the component's Shadow DOM.

---

## Workflow

Follow this step-by-step process to build a Form-Associated Custom Element:

### Step 1: Declare Form Association & Attach Internals
In the custom element class definition, declare `static formAssociated = true` before registering the class. In the constructor, invoke `this.attachInternals()` and store the returned `ElementInternals` object as a private instance property (`#internals`).

```javascript
class CustomRatingElement extends HTMLElement {
  static formAssociated = true;
  #internals;

  constructor() {
    super();
    this.#internals = this.attachInternals();
    // ...
  }
}
```

### Step 2: Bind Form Properties and Setters
Define `name`, `value`, `disabled`, `required`, and `type` properties with getter/setter pairs. Ensure attribute reflections (`observedAttributes`) trigger corresponding state and DOM updates.

```javascript
static get observedAttributes() {
  return ['disabled', 'required', 'value', 'name'];
}

attributeChangedCallback(name, oldValue, newValue) {
  if (oldValue === newValue) return;
  if (name === 'value') {
    this.#updateValue(newValue);
  } else if (name === 'disabled' || name === 'required') {
    this.#updateState();
  }
}
```

### Step 3: Synchronize Form Value via `setFormValue()`
Whenever the internal value updates, call `this.#internals.setFormValue(value)` to pass data to the parent form.
- For standard values: pass a string, `File`, or `FormData` object.
- For empty/null states: pass `null` or `""` to omit or clear the field value.
- For complex multi-field values: pass a `FormData` instance containing multiple entries.

```javascript
#updateValue(newValue) {
  this.#value = newValue;
  // Sync with host form submission
  this.#internals.setFormValue(this.#value !== null ? String(this.#value) : null);
  // Revalidate constraints
  this.#validate();
}
```

### Step 4: Manage Constraint Validation via `setValidity()`
Call `this.#internals.setValidity(flags, message, anchor)` to participate in browser constraint validation:
- If valid: pass `{}` as the flags object.
- If invalid: pass an object with true flags (e.g., `{ valueMissing: true }`, `{ rangeUnderflow: true }`, or `{ customError: true }`), a human-readable validation error message string, and an optional focus anchor element inside Shadow DOM.

```javascript
#validate() {
  if (this.hasAttribute('required') && (this.#value === null || this.#value === 0)) {
    const focusTarget = this.shadowRoot.querySelector('[tabindex="0"]') || this;
    this.#internals.setValidity(
      { valueMissing: true },
      'Please select a rating before submitting.',
      focusTarget
    );
  } else {
    this.#internals.setValidity({});
  }
}
```

### Step 5: Implement Form Lifecycle Callbacks
Implement all 4 native form lifecycle hooks:
1. `formResetCallback()`: Restore component state to default/initial attribute values when `<form>` resets.
2. `formDisabledCallback(disabled)`: Enable or disable internal UI controls when host element or enclosing `<fieldset disabled>` toggles.
3. `formStateRestoreCallback(state, mode)`: Restore component value during browser session restore or autocomplete fill (`mode === 'restore'` or `'autocomplete'`).
4. `formAssociatedCallback(form)`: React when the control is attached to or detached from a parent `<form>`.

### Step 6: Configure Label & Focus Delegation
Ensure clicking a connected `<label for="id">` focuses the component by delegating focus or assigning `tabindex="0"` to the host or internal control.

---

## Decision Rules

| Requirement Scenario | Recommended `setFormValue()` Payload | Validation Strategy |
| :--- | :--- | :--- |
| **Single Scalar Value** (e.g. Star Rating, Toggle) | String value (`"4"` or `"on"`) | Validate required state (`valueMissing`) or range (`rangeUnderflow`, `rangeOverflow`). |
| **Multi-Value Select** (e.g. Tag Multi-Select) | String value (`"tag1,tag2"`) or `FormData` instance | Validate min/max items selected (`valueMissing`, `tooShort`). |
| **Binary Checkbox / Switch** | String value when checked (`"on"` or custom value), `null` when unchecked | Validate required state when unchecked and `required` is present. |
| **Binary / Media File Input** (e.g. Canvas Signature) | `File` or `Blob` object | Validate file size or required drawing (`valueMissing`, `typeMismatch`). |
| **Complex Composite Form Field** (e.g. Date + Time Range) | `FormData` instance with multiple keys | Validate each component part and set `customError` if range is invalid. |

---

## Constraints

1. **Browser Support:** Native support available in Chrome 77+, Firefox 93+, Safari 16.4+, Edge 77+. For legacy browsers, `element-internals-polyfill` must be loaded.
2. **Shadow DOM Focus Anchor:** When passing an anchor element to `setValidity(flags, message, anchor)`, the anchor MUST be a descendant node within the element's Shadow DOM.
3. **Property vs. Attribute Names:** Custom element class MUST define `static formAssociated = true` before instantiation; setting it dynamically on an instance or after element registration has no effect.
4. **Form Property Mirroring:** standard form methods (`checkValidity()`, `reportValidity()`) called on the host custom element MUST delegate directly to `this.#internals.checkValidity()` and `this.#internals.reportValidity()`.

---

## Non-Goals

- **Building Specific Framework Wrapper Components:** This skill focuses on native standard Web Components (`HTMLElement`), not React SyntheticEvent, Vue v-model wrappers, or Angular ControlValueAccessor wrappers.
- **CSS Styling Systems:** Providing visual UI themes, design tokens, or framework CSS resets.
- **Backend Form Handling:** Server-side parsing, database persistence, or API endpoint validation.

---

## Common Failure Patterns

### 1. Forgetting `static formAssociated = true`
- **Symptom:** `this.attachInternals()` throws a `DOMException: Failed to execute 'attachInternals' on 'Element': The result of CustomElementRegistry.get() is not form-associated`.
- **Cause:** `formAssociated` flag missing or set to `false`.
- **Fix:** Declare `static formAssociated = true;` as a static class property.

### 2. Passing Invalid Anchor to `setValidity()`
- **Symptom:** Browser throws `TypeError: Failed to execute 'setValidity' on 'ElementInternals': The anchor element is not a shadow root descendant`.
- **Cause:** Anchor node is outside the element's Shadow DOM (or is null/undefined).
- **Fix:** Query an actual child element inside `this.shadowRoot` to pass as the 3rd parameter.

### 3. Not Clearing Validity on Value Change
- **Symptom:** Component remains permanently invalid or blocks form submission even after user corrects invalid input.
- **Cause:** Component sets validity flags on error but omits calling `this.#internals.setValidity({})` when valid.
- **Fix:** Always call `this.#internals.setValidity({})` in the validation function when all constraint checks pass.

### 4. Ignoring `formResetCallback()`
- **Symptom:** Clicking `<button type="reset">` resets standard HTML inputs but custom elements retain dirty user values.
- **Cause:** Failure to implement `formResetCallback()`.
- **Fix:** Reset internal value variables and UI representation to initial default attributes inside `formResetCallback()`.

### 5. Ignoring Fieldset Disabling (`formDisabledCallback`)
- **Symptom:** Enclosing the custom element in `<fieldset disabled>` disables native controls, but the custom element remains fully interactive and clickable.
- **Cause:** Omitting `formDisabledCallback(disabled)`.
- **Fix:** Update internal interactive element `disabled` properties and host CSS states inside `formDisabledCallback`.

---

## Validation Steps

1. **Verify Form Submission (`FormData`):**
   - Fill out the custom element inside a `<form>`.
   - Execute `const data = new FormData(form); console.log(data.get(element.name));` in DevTools.
   - Confirm the submitted value matches expectation.

2. **Verify Constraint Validation (`reportValidity()`):**
   - Trigger invalid state (e.g. leave a required custom element empty).
   - Call `form.reportValidity()`.
   - Confirm the native browser validation bubble pops up pointing to the custom element's anchor, displaying the custom validation message.

3. **Verify Form Reset (`formResetCallback`):**
   - Change custom element value from default.
   - Click a reset button or execute `form.reset()`.
   - Confirm element returns visually and functionally to its initial value.

4. **Verify Fieldset Propagation (`formDisabledCallback`):**
   - Toggle the `disabled` attribute on an enclosing `<fieldset>`.
   - Confirm the custom element's interactive states, ARIA attributes, and pointer events are disabled.

5. **Verify Automated Schema:**
   - Run `node scripts/check-skills.mjs` to ensure zero schema errors.
