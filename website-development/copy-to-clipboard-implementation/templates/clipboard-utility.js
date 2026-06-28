/**
 * A robust utility for copying text to the system clipboard with
 * accessibility and error handling in mind.
 *
 * @param {string} text - The text to be copied.
 * @param {Object} callbacks - Optional success and error callbacks.
 */
async function copyToClipboard(text, { onSuccess, onError } = {}) {
  // Check for Clipboard API support
  if (!navigator.clipboard) {
    console.error('Clipboard API not available');
    if (onError) onError('API_UNAVAILABLE');
    return;
  }

  // Check for secure context (required by most browsers for Clipboard API)
  if (!window.isSecureContext) {
    console.error('Clipboard access requires a secure context (HTTPS)');
    if (onError) onError('NOT_SECURE_CONTEXT');
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    if (onSuccess) onSuccess();
  } catch (err) {
    console.error('Clipboard write failed', err);
    if (onError) onError(err);
  }
}

/**
 * Example usage:
 *
 * copyToClipboard('https://example.com/share', {
 *   onSuccess: () => {
 *     showVisualFeedback();
 *     announceToScreenReader('Link copied to clipboard');
 *   },
 *   onError: (reason) => {
 *     showErrorMessage('Unable to copy link');
 *   }
 * });
 */
export { copyToClipboard };
