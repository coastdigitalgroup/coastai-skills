/**
 * A robust utility for copying text to the clipboard with ARIA-ready feedback.
 *
 * @param {string} text - The text to be copied.
 * @param {HTMLElement} buttonElement - The button that triggered the action.
 * @param {HTMLElement} statusElement - The ARIA-live region for announcements.
 * @param {Object} options - Configuration for labels and timeouts.
 */
export async function copyToClipboard(text, buttonElement, statusElement, options = {}) {
    const {
        successText = 'Copied!',
        errorText = 'Failed',
        announcementSuccess = 'Copied to clipboard',
        announcementError = 'Failed to copy',
        timeout = 2000
    } = options;

    const originalText = buttonElement.innerText;

    try {
        if (!navigator.clipboard) {
            throw new Error('Clipboard API not available');
        }

        await navigator.clipboard.writeText(text);

        // Success state
        buttonElement.innerText = successText;
        if (statusElement) statusElement.textContent = announcementSuccess;

        setTimeout(() => {
            buttonElement.innerText = originalText;
            if (statusElement) statusElement.textContent = '';
        }, timeout);

        return true;
    } catch (err) {
        // Error state
        buttonElement.innerText = errorText;
        if (statusElement) statusElement.textContent = announcementError;

        setTimeout(() => {
            buttonElement.innerText = originalText;
            if (statusElement) statusElement.textContent = '';
        }, timeout);

        console.error('Copy failed:', err);
        return false;
    }
}
