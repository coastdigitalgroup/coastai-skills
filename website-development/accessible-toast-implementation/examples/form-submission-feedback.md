# Success Feedback Example

This example demonstrates the before-and-after implementation of a toast notification triggered by a form submission.

## Scenario
A user submits a "Contact Us" form. We want to provide feedback that the message was successfully sent.

## ❌ Inaccessible Implementation (Visual Only)

In this version, the notification is just a `div` that is shown/hidden. Screen readers will not announce it because it's not a live region.

```html
<!-- The form -->
<form id="contact-form">
  <button type="submit">Send Message</button>
</form>

<!-- The visual-only toast -->
<div id="toast" class="toast hidden">
  Message sent successfully!
</div>

<script>
  document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const toast = document.getElementById('toast');
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 3000);
  });
</script>
```

**Why it fails:**
- **Screen Reader Silence:** Assitive technology is not notified that a new element appeared.
- **Timing:** 3 seconds is too fast for many users to read.
- **No Dismissal:** Users cannot manually close the toast.

---

## ✅ Accessible Implementation

This version uses `role="status"` for announcement, provides a manual close button, and handles the "Pause on Hover" requirement.

```html
<!-- 1. The persistent live region container -->
<div
  id="toast-container"
  class="toast-container"
  role="status"
  aria-live="polite"
  aria-atomic="true">
</div>

<!-- 2. The Form -->
<form id="contact-form-v2">
  <button type="submit">Send Message</button>
</form>

<script>
  const container = document.getElementById('toast-container');

  function createToast(message, duration = 5000) {
    const toast = document.createElement('div');
    toast.className = 'toast toast-success';

    // Add content and a manual dismiss button
    toast.innerHTML = `
      <span class="toast-message">${message}</span>
      <button class="toast-close" aria-label="Dismiss notification">&times;</button>
    `;

    container.appendChild(toast);

    let timeoutId;

    const startTimer = () => {
      timeoutId = setTimeout(() => {
        toast.classList.add('fade-out');
        toast.addEventListener('transitionend', () => toast.remove());
      }, duration);
    };

    const stopTimer = () => clearTimeout(timeoutId);

    // Pause timer on hover and focus
    toast.addEventListener('mouseenter', stopTimer);
    toast.addEventListener('mouseleave', startTimer);
    toast.addEventListener('focusin', stopTimer);
    toast.addEventListener('focusout', startTimer);

    // Manual dismissal
    toast.querySelector('.toast-close').addEventListener('click', () => {
      stopTimer();
      toast.remove();
    });

    startTimer();
  }

  document.getElementById('contact-form-v2').addEventListener('submit', (e) => {
    e.preventDefault();
    createToast('Message sent successfully!');
  });
</script>
```

**Key Improvements:**
- **`role="status"`:** Automatically announces new content to screen readers.
- **Manual Dismiss:** The `&times;` button allows users to clear the message.
- **Pause on Hover/Focus:** Respects users who need more time to read.
- **`aria-atomic="true"`:** Ensures the whole message is read if it updates.
