/**
 * FormAssociatedBaseElement.js
 * Production-ready base class / template for building Form-Associated Custom Elements (FACE).
 * Encapsulates ElementInternals, form submission, constraint validation, lifecycle callbacks,
 * and property mirroring according to the W3C Specification.
 */

export class FormAssociatedBaseElement extends HTMLElement {
  /**
   * MUST be static formAssociated = true for browser to attach ElementInternals form capability
   */
  static formAssociated = true;

  // Private instance fields
  #internals;
  #defaultValue = null;
  #value = null;
  #disabled = false;
  #required = false;

  static get observedAttributes() {
    return ['name', 'value', 'disabled', 'required'];
  }

  constructor() {
    super();
    // Attach ElementInternals instance
    this.#internals = this.attachInternals();
  }

  connectedCallback() {
    // Record initial default value from attribute for form reset
    if (this.hasAttribute('value')) {
      this.#defaultValue = this.getAttribute('value');
      if (this.#value === null) {
        this.#value = this.#defaultValue;
      }
    }
    this.syncFormState();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case 'value':
        this.#value = newValue;
        this.syncFormState();
        break;
      case 'disabled':
        this.#disabled = this.hasAttribute('disabled');
        this.onDisabledChange(this.#disabled);
        this.syncFormState();
        break;
      case 'required':
        this.#required = this.hasAttribute('required');
        this.validateConstraint();
        break;
      case 'name':
        // Name attribute changed, form association re-syncs automatically
        break;
    }
  }

  // ===========================================================================
  // Standard Form Control Property Mirroring
  // ===========================================================================

  /**
   * Reference to parent <form> element or null if unconnected
   */
  get form() {
    return this.#internals.form;
  }

  /**
   * Form element name attribute
   */
  get name() {
    return this.getAttribute('name');
  }
  set name(val) {
    if (val) this.setAttribute('name', val);
    else this.removeAttribute('name');
  }

  /**
   * Control value
   */
  get value() {
    return this.#value;
  }
  set value(val) {
    this.#value = val;
    if (val !== null && val !== undefined) {
      this.setAttribute('value', String(val));
    } else {
      this.removeAttribute('value');
    }
    this.syncFormState();
  }

  /**
   * Disabled state
   */
  get disabled() {
    return this.#disabled;
  }
  set disabled(val) {
    if (val) this.setAttribute('disabled', '');
    else this.removeAttribute('disabled');
  }

  /**
   * Required state
   */
  get required() {
    return this.#required;
  }
  set required(val) {
    if (val) this.setAttribute('required', '');
    else this.removeAttribute('required');
  }

  /**
   * ElementInternals ValidityState object
   */
  get validity() {
    return this.#internals.validity;
  }

  /**
   * Current error message string
   */
  get validationMessage() {
    return this.#internals.validationMessage;
  }

  /**
   * Returns true if element will participate in form validation
   */
  get willValidate() {
    return this.#internals.willValidate;
  }

  /**
   * Triggers validity check without showing native error bubble
   * @returns {boolean}
   */
  checkValidity() {
    return this.#internals.checkValidity();
  }

  /**
   * Triggers validity check AND displays browser validation bubble if invalid
   * @returns {boolean}
   */
  reportValidity() {
    return this.#internals.reportValidity();
  }

  /**
   * Access to raw ElementInternals object
   */
  get internals() {
    return this.#internals;
  }

  // ===========================================================================
  // Form Lifecycle Callbacks (Native Hooks)
  // ===========================================================================

  /**
   * Invoked when parent form is reset via form.reset() or reset button
   */
  formResetCallback() {
    this.value = this.#defaultValue;
    this.onFormReset();
  }

  /**
   * Invoked when disabled state of component or parent <fieldset disabled> changes
   * @param {boolean} disabled
   */
  formDisabledCallback(disabled) {
    this.#disabled = disabled;
    this.onDisabledChange(disabled);
  }

  /**
   * Invoked during browser session restore or autocomplete fill
   * @param {string|FormData|File} state
   * @param {'restore'|'autocomplete'} mode
   */
  formStateRestoreCallback(state, mode) {
    if (state !== null && state !== undefined) {
      this.value = state;
    }
  }

  /**
   * Invoked when connected to or disconnected from a parent <form>
   * @param {HTMLFormElement|null} form
   */
  formAssociatedCallback(form) {
    // Override in subclass if needed
  }

  // ===========================================================================
  // State Synchronization & Validation Methods
  // ===========================================================================

  /**
   * Updates ElementInternals value and triggers constraint validation check.
   * Can accept a String, File, or FormData instance.
   */
  syncFormState() {
    if (this.#value !== null && this.#value !== undefined && this.#value !== '') {
      // Sync form submission value
      this.#internals.setFormValue(this.#value);
    } else {
      // Clear form value when empty
      this.#internals.setFormValue(null);
    }
    this.validateConstraint();
  }

  /**
   * Evaluates validation rules and updates ElementInternals validity
   */
  validateConstraint() {
    const isMissing = this.#required && (this.#value === null || this.#value === '' || this.#value === undefined);

    if (isMissing) {
      const anchor = this.getValidationFocusAnchor();
      this.#internals.setValidity(
        { valueMissing: true },
        this.getCustomValidationMessage('valueMissing') || 'Please fill out this field.',
        anchor
      );
    } else {
      // Clear all error validity flags
      this.#internals.setValidity({});
    }
  }

  // ===========================================================================
  // Extension Hooks for Subclasses
  // ===========================================================================

  /**
   * Subclasses can override to return custom validation messages per error key
   * @param {string} errorKey
   * @returns {string|null}
   */
  getCustomValidationMessage(errorKey) {
    return null;
  }

  /**
   * Subclasses should override to return the Shadow DOM node to anchor validation tooltips
   * @returns {HTMLElement|undefined}
   */
  getValidationFocusAnchor() {
    return this.shadowRoot ? (this.shadowRoot.querySelector('[tabindex="0"]') || undefined) : undefined;
  }

  /**
   * Subclasses can override to handle UI updates on disabled changes
   * @param {boolean} disabled
   */
  onDisabledChange(disabled) {
    // Override in subclass
  }

  /**
   * Subclasses can override to handle custom UI cleanup on form reset
   */
  onFormReset() {
    // Override in subclass
  }
}
