/**
 * Wizard Controller Template
 * A lightweight orchestrator for multi-step frontend sequences.
 */
class WizardController {
  constructor(options) {
    this.form = document.querySelector(options.formSelector);
    this.steps = Array.from(document.querySelectorAll(options.stepSelector));
    this.announcer = document.querySelector(options.announcerSelector);
    this.nextBtn = document.querySelector(options.nextBtnSelector);
    this.backBtn = document.querySelector(options.backBtnSelector);
    this.currentStep = 0;
    this.onStepChange = options.onStepChange || (() => {});

    this.init();
  }

  init() {
    this.nextBtn.addEventListener('click', () => this.next());
    this.backBtn.addEventListener('click', () => this.back());
    this.updateUI();
  }

  next() {
    if (this.validateStep(this.currentStep)) {
      if (this.currentStep < this.steps.length - 1) {
        this.currentStep++;
        this.updateUI();
      } else {
        this.submit();
      }
    }
  }

  back() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.updateUI();
    }
  }

  validateStep(index) {
    const step = this.steps[index];
    const inputs = step.querySelectorAll('input, select, textarea');
    let isStepValid = true;

    inputs.forEach(input => {
      if (!input.checkValidity()) {
        isStepValid = false;
        input.setAttribute('aria-invalid', 'true');
        // Trigger custom error UI here
      } else {
        input.removeAttribute('aria-invalid');
      }
    });

    return isStepValid;
  }

  updateUI() {
    this.steps.forEach((step, index) => {
      step.hidden = index !== this.currentStep;
      if (index === this.currentStep) {
        // Focus management: move focus to step container or first input
        const firstInput = step.querySelector('input, h2');
        if (firstInput) {
          if (firstInput.tagName === 'H2') {
            firstInput.setAttribute('tabindex', '-1');
          }
          firstInput.focus();
        }

        // Accessibility announcement
        if (this.announcer) {
          this.announcer.textContent = `Step ${index + 1} of ${this.steps.length}: ${step.getAttribute('aria-label') || 'New Step'}`;
        }
      }
    });

    // Toggle button visibility/labels
    if (this.backBtn) this.backBtn.hidden = this.currentStep === 0;
    if (this.nextBtn) {
      this.nextBtn.textContent = this.currentStep === this.steps.length - 1 ? 'Submit' : 'Next';
    }

    this.onStepChange(this.currentStep);
  }

  submit() {
    const formData = new FormData(this.form);
    console.log('Wizard Data:', Object.fromEntries(formData));
    // Perform final validation and send to API
  }
}

export default WizardController;
