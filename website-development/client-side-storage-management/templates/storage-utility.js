/**
 * StorageManager.js
 * A robust wrapper for localStorage with JSON support, error handling,
 * and Time-To-Live (TTL) expiration.
 */

const StorageManager = {
  /**
   * Set a value in storage
   * @param {string} key - The key to store the value under
   * @param {any} value - The value to store (will be JSON stringified)
   * @param {number} ttl - Time to live in milliseconds (optional)
   * @returns {boolean} - Success or failure
   */
  set(key, value, ttl = null) {
    const payload = {
      data: value,
      expiry: ttl ? Date.now() + ttl : null,
    };
    const stringified = JSON.stringify(payload);

    try {
      localStorage.setItem(key, stringified);
      return true;
    } catch (error) {
      if (error.name === 'QuotaExceededError') {
        console.warn('StorageManager: Quota exceeded. Attempting to clear expired items...');
        this.clearExpired();
        // Try again once after clearing expired with the same payload
        try {
          localStorage.setItem(key, stringified);
          return true;
        } catch (retryError) {
          console.error('StorageManager: Still exceeding quota after cleanup.');
        }
      }
      console.error('StorageManager Error (set):', error);
      return false;
    }
  },

  /**
   * Get a value from storage
   * @param {string} key - The key to retrieve
   * @param {any} defaultValue - Value to return if key not found or expired
   * @returns {any}
   */
  get(key, defaultValue = null) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return defaultValue;

      const payload = JSON.parse(raw);

      // Check for expiration
      if (payload.expiry && Date.now() > payload.expiry) {
        this.remove(key);
        return defaultValue;
      }

      return payload.data !== undefined ? payload.data : payload;
    } catch (error) {
      console.error('StorageManager Error (get):', error);
      return defaultValue;
    }
  },

  /**
   * Remove an item from storage
   * @param {string} key
   */
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('StorageManager Error (remove):', error);
    }
  },

  /**
   * Clear all items in storage
   */
  clear() {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('StorageManager Error (clear):', error);
    }
  },

  /**
   * Iterates through all storage and removes expired items
   */
  clearExpired() {
    // Collect keys first to avoid mutation issues while iterating
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      keys.push(localStorage.key(i));
    }

    keys.forEach(key => {
      this.get(key); // The get method naturally purges expired items
    });
  },

  /**
   * Checks if storage is available
   * @returns {boolean}
   */
  isAvailable() {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
};

export default StorageManager;
