/**
 * ShortcutManager Utility
 * A reusable class for managing keyboard shortcuts with context awareness
 * and cross-platform support.
 */
class ShortcutManager {
  constructor(options = {}) {
    this.shortcuts = new Map();
    this.isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    this.ignoredElements = options.ignoredElements || 'input, textarea, select, [contenteditable="true"]';

    this.handleKeyDown = this.handleKeyDown.bind(this);
    window.addEventListener('keydown', this.handleKeyDown);
  }

  /**
   * Register a new shortcut
   * @param {string} key - The key (e.g., 's', 'Enter', '/')
   * @param {Object} options - Configuration { mod: true, shift: false, alt: false, desc: 'Save' }
   * @param {Function} callback - The function to run
   */
  register(key, options, callback) {
    const id = this._getShortcutId(key.toLowerCase(), options);
    this.shortcuts.set(id, { key, options, callback });
  }

  unregister(key, options) {
    const id = this._getShortcutId(key.toLowerCase(), options);
    this.shortcuts.delete(id);
  }

  handleKeyDown(e) {
    // Check for focus in input elements
    if (e.target.closest(this.ignoredElements)) {
      // Only allow Escape to propagate through if focused in input
      if (e.key !== 'Escape') return;
    }

    const key = e.key.toLowerCase();
    const isMod = this.isMac ? e.metaKey : e.ctrlKey;
    const isShift = e.shiftKey;
    const isAlt = e.altKey;

    const id = this._getShortcutId(key, { mod: isMod, shift: isShift, alt: isAlt });
    const registration = this.shortcuts.get(id);

    if (registration) {
      e.preventDefault();
      registration.callback(e);
    }
  }

  _getShortcutId(key, { mod = false, shift = false, alt = false }) {
    return `${mod ? 'mod+' : ''}${shift ? 'shift+' : ''}${alt ? 'alt+' : ''}${key}`;
  }

  destroy() {
    window.removeEventListener('keydown', this.handleKeyDown);
    this.shortcuts.clear();
  }

  /**
   * Returns a list of all registered shortcuts for use in a help menu
   */
  getShortcutList() {
    return Array.from(this.shortcuts.values()).map(s => ({
      label: s.options.desc || 'Unknown Action',
      keys: this._formatShortcut(s)
    }));
  }

  _formatShortcut(s) {
    const parts = [];
    if (s.options.mod) parts.push(this.isMac ? '⌘' : 'Ctrl');
    if (s.options.shift) parts.push('Shift');
    if (s.options.alt) parts.push('Alt');
    parts.push(s.key.toUpperCase());
    return parts.join('+');
  }
}

// Export usage example:
/*
const shortcuts = new ShortcutManager();
shortcuts.register('s', { mod: true, desc: 'Save Project' }, () => console.log('Saving...'));
shortcuts.register('?', { desc: 'Show Help' }, () => showHelpModal());
*/
