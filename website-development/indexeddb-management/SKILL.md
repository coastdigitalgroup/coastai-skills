---
name: indexeddb-management
description: Architect, query, migrate, and debug high-performance persistent client-side database storage using the W3C IndexedDB API with promise wrappers, schema versioning, transaction lifecycle management, cursor pagination, index queries, multi-tab coordination, and storage quota persistence.
---

# IndexedDB Management

## Purpose

The IndexedDB Management skill provides a standardized engineering methodology, lifecycle controller architecture, audit checklist, and reference guide for managing persistent structured client-side storage using the W3C IndexedDB API (`window.indexedDB`).

While synchronous storage APIs like `localStorage` and `sessionStorage` are simple, they are strictly string-based, synchronous (blocking the main thread during reads/writes), limited to ~5MB per origin, and lack query indexing or transactional integrity. Conversely, IndexedDB is an asynchronous, transactional, key-value object store database native to modern web browsers that can store gigabytes of structured data (objects, Blobs, ArrayBuffers, File objects) with high-performance indexing and cursor iteration.

However, native IndexedDB presents severe developer experience and reliability challenges:
1. **Event-based callback paradigm:** The raw DOM request/event interface (`IDBOpenDBRequest`, `IDBTransaction`, `IDBRequest`) predates JavaScript Promises and Async/Await, leading to complex callback nested code.
2. **Transaction Auto-Commit Lifecycle:** IndexedDB transactions auto-commit as soon as the JavaScript event loop returns to the microtask queue without active requests pending. A single misplaced `await` or unhandled promise resolution inside a transaction will cause the transaction to close prematurely and throw `InvalidStateError` or `TransactionInactiveError`.
3. **Schema Migration Locks:** Database version upgrades (`onupgradeneeded`) acquire an exclusive schema lock across all open tabs. If secondary tabs fail to close their database connections on receiving `onversionchange`, schema migration requests in primary tabs hang indefinitely (`onblocked`).
4. **Storage Quota & Eviction Hazards:** Browsers allocate storage based on available disk space and origin security policies. Without requesting persistent storage (`navigator.storage.persist()`), data can be silently evicted under system storage pressure.

This skill equips frontend engineers to build resilient, promise-wrapped IndexedDB abstractions that handle schema migrations, multi-tab lock synchronization, cursor-based pagination, compound indexes, quota management, and transactional integrity.

---

## Use Cases

- **Offline-First Web Applications:** Storing entire document canvases, offline drafts, emails, project tasks, or form entries so users can work seamlessly without network connectivity.
- **Large Dataset Caching & Fast Client Search:** Storing large product catalogs, customer databases, or location listings locally for instant client-side filtering, fuzzy searching, and sub-millisecond table renders.
- **Binary Blob & Media Storage:** Persisting user-uploaded images, audio recordings, PDF documents, or video segments locally using native `Blob` and `ArrayBuffer` structured clone support.
- **Progressive Web App (PWA) Sync Queues:** Buffering offline mutation requests (POST/PUT/DELETE operations) in an object store queue to be replayed by background sync workers when connectivity resumes.
- **Rich Text & Code Editor Caching:** Saving historical document revisions, undo/redo state buffers, or syntax-highlighted syntax trees across sessions.

---

## When NOT to Use

- **Simple Key-Value UI Preferences:** For small, non-critical primitive values like theme mode ("dark"/"light"), sidebar collapse toggles, or simple UI settings under a few kilobytes, use `localStorage` or `sessionStorage`.
- **Ephemeral Session State:** For temporary UI state that should reset when a tab is closed (e.g., active modal state, current search input buffer), use in-memory state or `sessionStorage`.
- **Sensitive Security Credentials:** Never store unencrypted authentication tokens, secret keys, or personally identifiable financial data in IndexedDB. Any script executing on the same origin (including third-party scripts) can read IndexedDB contents.
- **Cross-Tab Resource Locks:** Do not attempt to re-invent resource mutual exclusion or single-leader election using IndexedDB flags. Use the **Web Locks API** (`navigator.locks`) or `BroadcastChannel` instead. See `cross-tab-state-synchronization`.
- **Volatile Main-Thread Animation Loops:** Do not perform IndexedDB queries during high-frequency frame renders (60fps/120fps animations). Cache query results in main-memory variables or Web Workers.

---

## Inputs

1. **Database Identity & Version:** Database name string (e.g., `"app_workspace_db"`) and positive integer schema version (e.g., `1`, `2`, `3`).
2. **Object Store Schema Definition:** Configuration objects specifying store names, primary key paths (e.g., `keyPath: "id"`), auto-increment generators, and index configurations (e.g., `{ name: "by_category", keyPath: "category", unique: false }`).
3. **Schema Migration Scripts:** Version-indexed functions executed inside the `onupgradeneeded` lifecycle to alter stores, create/delete indexes, or transform existing records.
4. **Transaction Operations:** Entity payloads, query key ranges (`IDBKeyRange`), cursor direction (`"next"`, `"prev"`), and pagination parameters (limit, skip).
5. **Multi-Tab Lifecycle Handlers:** Callbacks for handling `onversionchange` (closing stale connections when another tab initiates an upgrade) and `onblocked` (alerting users or retry logic).

---

## Outputs

1. **`IndexedDBManager` Instance:** A robust, promise-wrapped lifecycle controller class exposing typed async methods (`get`, `put`, `delete`, `query`, `paginate`, `clear`).
2. **`IDBDatabase` Connection Handle:** An active database connection managed with automatic tab-closure listeners.
3. **Transaction Results:** Resolved promises returning queried objects, records within `IDBKeyRange` bounds, or auto-generated keys.
4. **Storage Quota Statistics:** Operational metrics from `navigator.storage.estimate()` showing quota usage, remaining capacity, and persistence status (`persisted`).
5. **Telemetry & Error Events:** Custom event handles for `quotaexceeded`, `versionblocked`, and `transactionerror`.

---

## Workflow

### Step 1: Initialize Connection with Schema Migrations

Opening an IndexedDB connection requires binding handlers to `onupgradeneeded`, `onblocked`, and `onversionchange`.

```javascript
class IndexedDBManager {
  constructor(dbName, version) {
    this.dbName = dbName;
    this.version = version;
    this.db = null;
  }

  async open(migrationHandler) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onupgradeneeded = (event) => {
        const db = request.result;
        const oldVersion = event.oldVersion;
        const newVersion = event.newVersion;
        const transaction = request.transaction;

        console.log(`Upgrading IndexedDB schema from v${oldVersion} to v${newVersion}`);
        if (migrationHandler) {
          migrationHandler(db, transaction, oldVersion, newVersion);
        }
      };

      request.onblocked = () => {
        console.warn('IndexedDB opening blocked: older tab connections are keeping database open.');
      };

      request.onsuccess = () => {
        this.db = request.result;

        // Listen for version change requests triggered by OTHER tabs upgrading the DB
        this.db.onversionchange = () => {
          console.warn('Database schema version change requested elsewhere. Closing stale connection...');
          this.db.close();
          this.db = null;
        };

        resolve(this.db);
      };

      request.onerror = () => {
        reject(request.error || new Error('Failed to open IndexedDB database'));
      };
    });
  }
}
```

### Step 2: Define Object Stores and Indexes during Migration

Object stores and indexes **can only be created or modified** inside the `onupgradeneeded` event handler.

```javascript
function handleDbMigrations(db, transaction, oldVersion, newVersion) {
  // Version 1: Initial schema setup
  if (oldVersion < 1) {
    const docStore = db.createObjectStore('documents', { keyPath: 'id' });
    docStore.createIndex('by_updated_at', 'updatedAt', { unique: false });
    docStore.createIndex('by_status', 'status', { unique: false });
    docStore.createIndex('by_tags', 'tags', { unique: false, multiEntry: true });
  }

  // Version 2: Adding a compound index for optimized filtering
  if (oldVersion < 2) {
    const docStore = transaction.objectStore('documents');
    docStore.createIndex('by_status_updated', ['status', 'updatedAt'], { unique: false });
  }
}
```

### Step 3: Implement Safe Transaction Lifecycle Management

IndexedDB transactions auto-commit when control returns to the event loop and no microtasks or pending IDBRequests remain. To avoid transaction expiry, group IDB requests synchronously or wrap the entire transaction in a single Promise.

```javascript
async executeTransaction(storeNames, mode, callback) {
  if (!this.db) {
    throw new Error('IndexedDB is not open. Call open() first.');
  }

  return new Promise((resolve, reject) => {
    const tx = this.db.transaction(storeNames, mode);
    let result = null;

    tx.oncomplete = () => resolve(result);
    tx.onerror = () => reject(tx.error || new Error('Transaction failed'));
    tx.onabort = () => reject(tx.error || new Error('Transaction aborted'));

    try {
      result = callback(tx);
    } catch (err) {
      tx.abort();
      reject(err);
    }
  });
}
```

### Step 4: Perform CRUD Operations

Implement promise-wrapped methods for `get`, `put`, `delete`, and `clear`.

```javascript
async put(storeName, item) {
  return this.executeTransaction([storeName], 'readwrite', (tx) => {
    const store = tx.objectStore(storeName);
    const request = store.put(item);
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  });
}

async get(storeName, key) {
  return this.executeTransaction([storeName], 'readonly', (tx) => {
    const store = tx.objectStore(storeName);
    const request = store.get(key);
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  });
}
```

### Step 5: Implement Index Range Queries and Cursor Pagination

For querying large datasets efficiently, use `IDBKeyRange` and `openCursor` to iterate over records without loading entire stores into memory.

```javascript
async queryByIndex(storeName, indexName, range, limit = 50) {
  return this.executeTransaction([storeName], 'readonly', (tx) => {
    const store = tx.objectStore(storeName);
    const index = store.index(indexName);
    const request = index.openCursor(range, 'next');
    const results = [];

    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor && results.length < limit) {
          results.push(cursor.value);
          cursor.continue();
        } else {
          resolve(results);
        }
      };
      request.onerror = () => reject(request.error);
    });
  });
}
```

### Step 6: Request Persistent Storage and Monitor Quota

To prevent the browser from automatically purging client data under storage pressure, request persistent storage permission via `navigator.storage.persist()`.

```javascript
async function ensurePersistentStorage() {
  if (navigator.storage && navigator.storage.persist) {
    const isPersisted = await navigator.storage.persisted();
    if (!isPersisted) {
      const granted = await navigator.storage.persist();
      console.log(`Storage persistence granted: ${granted}`);
    }
  }
}

async function checkStorageQuota() {
  if (navigator.storage && navigator.storage.estimate) {
    const estimate = await navigator.storage.estimate();
    const usageMB = (estimate.usage / (1024 * 1024)).toFixed(2);
    const quotaMB = (estimate.quota / (1024 * 1024)).toFixed(2);
    const percentUsed = ((estimate.usage / estimate.quota) * 100).toFixed(1);
    console.log(`IndexedDB Quota: ${usageMB} MB / ${quotaMB} MB (${percentUsed}% used)`);
    return { usageMB, quotaMB, percentUsed };
  }
  return null;
}
```

---

## Decision Rules

| Requirement | Recommended Storage / Query Strategy | Key API / Syntax |
| :--- | :--- | :--- |
| **Lookup by Primary Unique ID** | Direct Key Get / Put | `store.get(key)` / `store.put(object)` |
| **Filtering by Single Field** | Object Store Index Query | `store.index('by_category').getAll(category)` |
| **Filtering by Multiple Conditions** | Compound Index | `store.createIndex('by_type_date', ['type', 'date'])` |
| **Array Property Matching (e.g., Tags)** | Multi-Entry Index | `store.createIndex('by_tags', 'tags', { multiEntry: true })` |
| **Range Filter (e.g., Date between X and Y)** | `IDBKeyRange.bound` with Cursor | `IDBKeyRange.bound(startDate, endDate)` |
| **Paginated Renders over 10,000+ Items** | Cursor with offset count / skip | `cursor.advance(skip)` & limit counter |
| **High-Volume Batch Insert (e.g., 5,000 items)** | Single `readwrite` Transaction | Iterate `store.put()` inside one transaction block |
| **Preventing Browser Eviction** | Persistent Storage API | `await navigator.storage.persist()` |

---

## Constraints

- **Transaction Scope & Timing:** You cannot perform external async tasks (like `fetch()` network requests or `setTimeout`) inside an active transaction. Doing so will cause the transaction to auto-commit before the async operation resolves, leading to `TransactionInactiveError`.
- **Structured Clone Limitations:** IndexedDB can store primitives, plain objects, Arrays, Dates, RegExp, Maps, Sets, Blobs, Files, and ArrayBuffers. It **cannot** store Functions, DOM elements, Symbols, or class instances with non-clonable prototype chains.
- **Single-Origin Isolation:** IndexedDB databases are strictly bounded by protocol, domain, and port. Subdomains (e.g., `app.example.com` vs `api.example.com`) cannot access each other's databases.
- **Browser Private Browsing Modes:** In private browsing modes (e.g., Firefox Private Browsing, Safari Incognito), IndexedDB may operate in an in-memory or ephemeral mode that is wiped when the window closes, or may reject `open()` requests.
- **QuotaExceededError:** If the device disk is full or the origin quota limit is reached, `store.put()` or `store.add()` will throw a `QuotaExceededError` (DOMException).

---

## Non-Goals

- **Server Sync Protocol Specification:** This skill focuses on client-side IndexedDB persistence and queries, not backend REST/GraphQL synchronization algorithms.
- **WebSQL / Deprecated Storage APIs:** WebSQL is deprecated and removed in modern browsers. This skill solely targets standard W3C IndexedDB.
- **Custom Encryption Algorithms:** Implementing custom client-side AES database layer encryption is out of scope. (Client encryption keys stored in JavaScript can be extracted by XSS).

---

## Common Failure Patterns

- **The Async Transaction Interruption Trap:** Performing `await fetch()` inside a `readwrite` transaction. The event loop microtask finishes, IndexedDB auto-commits the transaction, and the subsequent `store.put()` fails with `TransactionInactiveError`.
  *Fix:* Perform all async network/processing work *before* opening the transaction, then execute all `store.put()` operations synchronously within the transaction.
- **Unclosed Connections Blocking Schema Upgrades (`onblocked` Deadlock):** Tab A opens DB v1. User opens Tab B, which requests DB v2 (`onupgradeneeded`). Tab A does not listen for `onversionchange` and does not call `db.close()`. Tab B hangs forever in `onblocked`.
  *Fix:* Always register `db.onversionchange = () => db.close()` immediately after opening a database connection.
- **Loading Whole Store into Memory with `getAll()`:** Calling `store.getAll()` on a store containing 100,000 records or large binary Blobs, causing main-thread execution freezes and browser memory crashes.
  *Fix:* Use `openCursor()` with pagination limits or indexed key ranges.
- **Uncaught `QuotaExceededError`:** Writing large dataset batches without monitoring storage quota or catching write errors, causing unhandled promise rejections that crash the client UI.
  *Fix:* Wrap write calls in `try...catch` and monitor `navigator.storage.estimate()`.
- **Modifying Schema Outside `onupgradeneeded`:** Calling `createObjectStore` or `createIndex` inside normal runtime application code.
  *Fix:* Schema structural changes must only be executed within `onupgradeneeded`.

---

## Validation Steps

### 1. Database & Schema Initialization Test
- Open developer tools (Application -> Storage -> IndexedDB in Chrome/Edge or Storage tab in Firefox).
- Instantiate `IndexedDBManager` and call `open()`.
- Verify that the database name and version appear correctly in DevTools with all defined object stores and indexes.

### 2. Multi-Tab Schema Upgrade & Concurrency Test
- Open the web application in two separate browser tabs (Tab A and Tab B).
- Trigger a schema version bump in Tab B (e.g., increment version from 1 to 2).
- Verify in Tab A console that `db.onversionchange` fires and closes the stale connection gracefully.
- Confirm that Tab B completes its `onupgradeneeded` upgrade without triggering an `onblocked` deadlock.

### 3. CRUD & Compound Index Query Test
- Execute `put()` to insert sample objects into an object store.
- Execute an index query using `IDBKeyRange.bound()` or a compound array key `['active', timestamp]`.
- Verify that the returned records match expected filter parameters.

### 4. Quota Estimation & Persistence Test
- Execute `navigator.storage.estimate()` and log usage.
- Execute `navigator.storage.persist()` and verify that the browser returns a boolean persistence state.
