/**
 * ShortcutManager Blueprint
 * A reusable vanilla JS class for managing keyboard shortcuts with
 * platform normalization and context awareness.
 */

class ShortcutManager {
  constructor() {
    this.shortcuts = new Map();
    this.isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    this.handleKeydown = this.handleKeydown.bind(this);

    // Default ignore elements
    this.ignoreTags = ['INPUT', 'TEXTAREA', 'SELECT'];
  }

  /**
   * Register a shortcut
   * @param {string} key - The event.key value (e.g., 'k', 'Enter')
   * @param {Object} options - { mod: boolean, shift: boolean, alt: boolean }
   * @param {Function} callback - Function to execute
   */
  register(key, options, callback) {
    const keyId = key.toLowerCase();
    this.shortcuts.set(keyId, { options, callback });
  }

  start() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  stop() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown(event) {
    // Context Check: Ignore if user is typing
    if (this.ignoreTags.includes(document.activeElement.tagName) ||
        document.activeElement.isContentEditable) {
      // Only allow Escape to leak through if needed, or handle specifically
      if (event.key !== 'Escape') return;
    }

    const pressedKey = event.key.toLowerCase();
    const shortcut = this.shortcuts.get(pressedKey);

    if (shortcut) {
      const { options, callback } = shortcut;

      const modMatch = options.mod ? (this.isMac ? event.metaKey : event.ctrlKey) : true;
      const shiftMatch = options.shift ? event.shiftKey : !event.shiftKey;
      const altMatch = options.alt ? event.altKey : !event.altKey;

      if (modMatch && shiftMatch && altMatch) {
        event.preventDefault();
        callback(event);
      }
    }
  }
}

// Usage Example:
/*
const shortcuts = new ShortcutManager();

shortcuts.register('k', { mod: true }, () => {
  console.log('Search Triggered');
});

shortcuts.register('escape', {}, () => {
  console.log('Cancel/Close Triggered');
});

shortcuts.start();
*/
