/**
 * IndexedDBManager - Production-grade, zero-dependency promise wrapper for IndexedDB.
 *
 * Features:
 * - Schema version migrations and upgrade management.
 * - Multi-tab version conflict handling (onversionchange & onblocked).
 * - Safe transaction execution without microtask auto-commit dropouts.
 * - Index range queries (IDBKeyRange) and paginated cursor iteration.
 * - Storage quota monitoring and persistence requests.
 */

export class IndexedDBManager {
  /**
   * @param {string} dbName - The name of the IndexedDB database.
   * @param {number} version - Positive integer schema version.
   */
  constructor(dbName, version = 1) {
    if (!dbName || typeof dbName !== 'string') {
      throw new Error('IndexedDBManager requires a valid database name string.');
    }
    if (!Number.isInteger(version) || version < 1) {
      throw new Error('IndexedDBManager requires a positive integer database version.');
    }

    this.dbName = dbName;
    this.version = version;
    this.db = null;
    this.isOpening = false;
  }

  /**
   * Check if IndexedDB is supported in the current runtime environment.
   * @returns {boolean}
   */
  static isSupported() {
    return typeof window !== 'undefined' && 'indexedDB' in window && window.indexedDB !== null;
  }

  /**
   * Open the database connection and execute migration callbacks if needed.
   * @param {Function} [migrationCallback] - Callback function (db, transaction, oldVersion, newVersion)
   * @returns {Promise<IDBDatabase>}
   */
  async open(migrationCallback) {
    if (this.db) {
      return this.db;
    }

    if (!IndexedDBManager.isSupported()) {
      throw new Error('IndexedDB API is not supported in this environment.');
    }

    return new Promise((resolve, reject) => {
      this.isOpening = true;
      const request = window.indexedDB.open(this.dbName, this.version);

      request.onupgradeneeded = (event) => {
        const db = request.result;
        const transaction = request.transaction;
        const oldVersion = event.oldVersion;
        const newVersion = event.newVersion;

        if (migrationCallback && typeof migrationCallback === 'function') {
          try {
            migrationCallback(db, transaction, oldVersion, newVersion);
          } catch (migrationErr) {
            transaction.abort();
            reject(new Error(`IndexedDB migration failed: ${migrationErr.message}`));
          }
        }
      };

      request.onblocked = () => {
        console.warn(`[IndexedDBManager] Opening "${this.dbName}" blocked. Close open tabs running older schema versions.`);
      };

      request.onsuccess = () => {
        this.db = request.result;
        this.isOpening = false;

        // Multi-tab locking safeguard: close database if another tab upgrades schema
        this.db.onversionchange = () => {
          console.warn(`[IndexedDBManager] Schema upgrade detected in another tab. Closing connection for "${this.dbName}".`);
          this.close();
        };

        resolve(this.db);
      };

      request.onerror = () => {
        this.isOpening = false;
        reject(request.error || new Error(`Failed to open IndexedDB database "${this.dbName}".`));
      };
    });
  }

  /**
   * Close the active database connection.
   */
  close() {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }

  /**
   * Execute an IDB transaction wrapped in a Promise.
   * @param {string|string[]} storeNames - Name or array of store names.
   * @param {'readonly'|'readwrite'} mode - Transaction mode.
   * @param {Function} callback - Function(tx) executing IDB requests synchronously.
   * @returns {Promise<any>}
   */
  async executeTx(storeNames, mode, callback) {
    if (!this.db) {
      throw new Error('[IndexedDBManager] Database connection is not open. Call open() first.');
    }

    const stores = Array.isArray(storeNames) ? storeNames : [storeNames];

    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(stores, mode);
      let resultValue = null;

      tx.oncomplete = () => resolve(resultValue);
      tx.onerror = () => reject(tx.error || new Error('IndexedDB transaction failed.'));
      tx.onabort = () => reject(tx.error || new Error('IndexedDB transaction aborted.'));

      try {
        resultValue = callback(tx);
      } catch (err) {
        tx.abort();
        reject(err);
      }
    });
  }

  /**
   * Insert or update a single record in an object store.
   * @param {string} storeName - Target object store name.
   * @param {Object} item - Object payload to store.
   * @param {any} [key] - Optional key if keyPath is not defined on store.
   * @returns {Promise<any>} - Generated or specified primary key.
   */
  async put(storeName, item, key) {
    return this.executeTx(storeName, 'readwrite', (tx) => {
      const store = tx.objectStore(storeName);
      const req = key !== undefined ? store.put(item, key) : store.put(item);
      return new Promise((resolve, reject) => {
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      });
    });
  }

  /**
   * Insert or update multiple records in a single transactional batch.
   * @param {string} storeName - Target object store name.
   * @param {Object[]} items - Array of objects to store.
   * @returns {Promise<any[]>} - Array of primary keys.
   */
  async putBatch(storeName, items) {
    if (!Array.isArray(items) || items.length === 0) {
      return [];
    }

    return this.executeTx(storeName, 'readwrite', (tx) => {
      const store = tx.objectStore(storeName);
      const promises = items.map(item => {
        return new Promise((resolve, reject) => {
          const req = store.put(item);
          req.onsuccess = () => resolve(req.result);
          req.onerror = () => reject(req.error);
        });
      });
      return Promise.all(promises);
    });
  }

  /**
   * Retrieve a single record by primary key.
   * @param {string} storeName - Target object store name.
   * @param {any} key - Primary key value.
   * @returns {Promise<Object|null>}
   */
  async get(storeName, key) {
    return this.executeTx(storeName, 'readonly', (tx) => {
      const store = tx.objectStore(storeName);
      const req = store.get(key);
      return new Promise((resolve, reject) => {
        req.onsuccess = () => resolve(req.result !== undefined ? req.result : null);
        req.onerror = () => reject(req.error);
      });
    });
  }

  /**
   * Retrieve all records from an object store.
   * Note: Avoid using on massive datasets (>10,000 items); use paginate() instead.
   * @param {string} storeName - Target object store name.
   * @param {number} [limit] - Optional max items limit.
   * @returns {Promise<Object[]>}
   */
  async getAll(storeName, limit) {
    return this.executeTx(storeName, 'readonly', (tx) => {
      const store = tx.objectStore(storeName);
      const req = limit ? store.getAll(null, limit) : store.getAll();
      return new Promise((resolve, reject) => {
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => reject(req.error);
      });
    });
  }

  /**
   * Query records matching an index value or IDBKeyRange.
   * @param {string} storeName - Target object store name.
   * @param {string} indexName - Name of defined index.
   * @param {any|IDBKeyRange} range - Value or IDBKeyRange filter.
   * @param {number} [limit=100] - Maximum records to retrieve.
   * @returns {Promise<Object[]>}
   */
  async queryByIndex(storeName, indexName, range = null, limit = 100) {
    const keyRange = range instanceof IDBKeyRange || range === null ? range : IDBKeyRange.only(range);

    return this.executeTx(storeName, 'readonly', (tx) => {
      const store = tx.objectStore(storeName);
      const index = store.index(indexName);
      const req = index.openCursor(keyRange, 'next');
      const results = [];

      return new Promise((resolve, reject) => {
        req.onsuccess = (event) => {
          const cursor = event.target.result;
          if (cursor && results.length < limit) {
            results.push(cursor.value);
            cursor.continue();
          } else {
            resolve(results);
          }
        };
        req.onerror = () => reject(req.error);
      });
    });
  }

  /**
   * Paginate over records using a cursor with offset skip and limit.
   * @param {string} storeName - Target object store name.
   * @param {Object} options - Options object: { indexName, range, direction, skip, limit }
   * @returns {Promise<{ items: Object[], hasMore: boolean }>}
   */
  async paginate(storeName, { indexName = null, range = null, direction = 'next', skip = 0, limit = 20 } = {}) {
    return this.executeTx(storeName, 'readonly', (tx) => {
      const store = tx.objectStore(storeName);
      const target = indexName ? store.index(indexName) : store;
      const req = target.openCursor(range, direction);

      const items = [];
      let skipped = 0;
      let hasMore = false;

      return new Promise((resolve, reject) => {
        req.onsuccess = (event) => {
          const cursor = event.target.result;
          if (!cursor) {
            resolve({ items, hasMore: false });
            return;
          }

          if (skip > 0 && skipped < skip) {
            const advanceCount = skip - skipped;
            skipped = skip;
            cursor.advance(advanceCount);
            return;
          }

          if (items.length < limit) {
            items.push(cursor.value);
            cursor.continue();
          } else {
            hasMore = true;
            resolve({ items, hasMore: true });
          }
        };
        req.onerror = () => reject(req.error);
      });
    });
  }

  /**
   * Delete a single record by key.
   * @param {string} storeName - Target object store name.
   * @param {any} key - Primary key value.
   * @returns {Promise<void>}
   */
  async delete(storeName, key) {
    return this.executeTx(storeName, 'readwrite', (tx) => {
      const store = tx.objectStore(storeName);
      const req = store.delete(key);
      return new Promise((resolve, reject) => {
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    });
  }

  /**
   * Clear all records from an object store.
   * @param {string} storeName - Target object store name.
   * @returns {Promise<void>}
   */
  async clear(storeName) {
    return this.executeTx(storeName, 'readwrite', (tx) => {
      const store = tx.objectStore(storeName);
      const req = store.clear();
      return new Promise((resolve, reject) => {
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    });
  }

  /**
   * Estimate current storage usage and available quota.
   * @returns {Promise<{ usageBytes: number, quotaBytes: number, usageMB: string, quotaMB: string, percentUsed: string }|null>}
   */
  static async getStorageEstimate() {
    if (typeof navigator !== 'undefined' && navigator.storage && navigator.storage.estimate) {
      const est = await navigator.storage.estimate();
      const usageBytes = est.usage || 0;
      const quotaBytes = est.quota || 0;
      return {
        usageBytes,
        quotaBytes,
        usageMB: (usageBytes / (1024 * 1024)).toFixed(2),
        quotaMB: (quotaBytes / (1024 * 1024)).toFixed(2),
        percentUsed: quotaBytes > 0 ? ((usageBytes / quotaBytes) * 100).toFixed(1) : '0'
      };
    }
    return null;
  }

  /**
   * Request persistent storage to prevent automatic browser data eviction.
   * @returns {Promise<boolean>}
   */
  static async requestPersistence() {
    if (typeof navigator !== 'undefined' && navigator.storage && navigator.storage.persist) {
      const isPersisted = await navigator.storage.persisted();
      if (isPersisted) {
        return true;
      }
      return await navigator.storage.persist();
    }
    return false;
  }
}
