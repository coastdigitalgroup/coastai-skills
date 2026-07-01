/**
 * A safe wrapper for the View Transitions API that handles browser support
 * and progressive enhancement.
 *
 * @param {Function} updateDOM - The function that performs the DOM update.
 * @returns {Promise|void} - Returns the transition object or the result of updateDOM.
 */
export async function transitionState(updateDOM) {
  // Check for browser support
  if (!document.startViewTransition) {
    console.warn('View Transitions API not supported. Falling back to instant update.');
    return updateDOM();
  }

  // Handle prefers-reduced-motion
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motionQuery.matches) {
    return updateDOM();
  }

  // Start the transition
  const transition = document.startViewTransition(async () => {
    await updateDOM();
  });

  return transition;
}

/**
 * Example usage:
 *
 * transitionState(() => {
 *   document.querySelector('#container').innerHTML = '<p>New Content</p>';
 * });
 */
