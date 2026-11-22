# IndexedDB Heuristics and Browser Behavior Reference

A technical reference detailing internal browser behavior, transaction lifecycle mechanics, indexing algorithms, storage eviction heuristics, and cross-browser gotchas for the W3C IndexedDB API.

---

## 1. Transaction Auto-Commit Mechanics & Event Loop Timing

The most critical behavioral distinction in IndexedDB is that **transactions auto-commit automatically** as soon as control returns to the browser event loop and no pending DOM requests remain active in the microtask queue.

### How Auto-Commit Works
1. When `db.transaction(stores, mode)` is invoked, the browser creates a transaction object in the `active` state.
2. Every request placed on an object store or index (e.g., `store.get()`, `store.put()`) creates an `IDBRequest` object that registers pending async work within that transaction.
3. Once a request completes, its `onsuccess` callback is executed as a microtask.
4. **Crucial Rule:** If the current microtask task finishes and no new requests (`store.get()`, `store.put()`, etc.) have been queued synchronously, the browser automatically transitions the transaction state to `committing` -> `finished`.
5. Any subsequent attempt to call `store.put()` on that transaction handle will throw `DOMException: InvalidStateError` or `TransactionInactiveError`.

### The `await` Trap
```javascript
// ❌ WRONG: Causes TransactionInactiveError
const tx = db.transaction(['docs'], 'readwrite');
const store = tx.objectStore('docs');

const doc = await store.get('doc_123'); // IDB request finishes, microtask completes
const remoteData = await fetch('/api/sync'); // 🛑 BROWSER AUTO-COMMITS TRANSACTION HERE!

store.put({ ...doc, ...remoteData }); // 💥 Throws TransactionInactiveError!
```

```javascript
// ✅ CORRECT: Separate external async work from IDB transaction execution
const remoteData = await fetch('/api/sync'); // Fetch outside transaction first

const tx = db.transaction(['docs'], 'readwrite');
const store = tx.objectStore('docs');
store.put({ id: 'doc_123', ...remoteData }); // Synchronous within transaction
```

---

## 2. Structured Clone Algorithm Capabilities & Limits

IndexedDB uses the W3C **Structured Clone Algorithm** to serialize objects stored in object stores. Unlike `JSON.stringify()`, structured cloning preserves rich JavaScript primitives and binary data without string conversions.

### Supported Data Types
- **Primitives:** `number`, `string`, `boolean`, `null`, `undefined`, `BigInt`.
- **Objects & Arrays:** Plain objects, Arrays, `Map`, `Set`.
- **Built-in Objects:** `Date`, `RegExp`.
- **Binary Data:** `ArrayBuffer`, `TypedArray` (`Uint8Array`, `Float32Array`), `DataView`.
- **File & Blob Objects:** Native `Blob`, `File`, `FileList`.
- **Circular References:** Objects referencing themselves are handled cleanly without infinite recursion errors.

### Unsupported Data Types (Will Throw `DataCloneError`)
- **Functions & Methods:** Functions attached to objects are stripped or throw `DataCloneError`.
- **DOM Nodes:** Elements, `DocumentFragment`, `Window`, or `Event` instances cannot be cloned.
- **Symbols:** `Symbol()` keys or values cannot be cloned.
- **Class Prototypes:** Objects lose their custom class prototype chains upon retrieval (they return as plain objects with `Object.prototype`).
- **`WeakMap` & `WeakSet`:** Cannot be enumerated or cloned.

---

## 3. Indexes & Key Range Query Heuristics

Indexes enable fast binary search tree lookups on object properties without scanning every record.

### Index Types & Performance Matrix

| Index Pattern | Definition Syntax | Performance | Use Case |
| :--- | :--- | :--- | :--- |
| **Single Field** | `store.createIndex('by_status', 'status')` | $O(\log N)$ | Simple equality matching (`IDBKeyRange.only('active')`). |
| **Compound Key** | `store.createIndex('by_type_date', ['type', 'date'])` | $O(\log N)$ | Multi-column filtering & sorting (`IDBKeyRange.bound(['pdf', 1000], ['pdf', 2000])`). |
| **Multi-Entry Array** | `store.createIndex('by_tags', 'tags', { multiEntry: true })` | $O(M \log N)$ | Individual element matching for array properties (`tags: ['js', 'web']`). |
| **Unique Constraint** | `store.createIndex('by_email', 'email', { unique: true })` | $O(\log N)$ | Enforcing uniqueness across store records. Throws `ConstraintError` on duplicate. |

### `IDBKeyRange` Construction Rules
- `IDBKeyRange.only(val)`: Matches records where index equals `val`.
- `IDBKeyRange.lowerBound(val, open)`: Matches records where index $\ge \text{val}$ (or $> \text{val}$ if `open` is `true`).
- `IDBKeyRange.upperBound(val, open)`: Matches records where index $\le \text{val}$ (or $< \text{val}$ if `open` is `true`).
- `IDBKeyRange.bound(lower, upper, lowerOpen, upperOpen)`: Matches records bounded within a closed or open range.

---

## 4. Storage Quotas, Persistence & Eviction Policies

Browsers handle origin storage capacity dynamically based on total available device disk space.

### Storage Modes: Best-Effort vs Persistent
1. **Best-Effort Storage (Default):**
   - The browser allocates storage dynamically.
   - If device disk space becomes critically low, the browser's eviction algorithm will automatically wipe entire origins (including all IndexedDB databases, Cache Storage, and Service Worker caches).
   - Eviction follows a **Least Recently Used (LRU)** policy by origin.
2. **Persistent Storage:**
   - Requested via `navigator.storage.persist()`.
   - When granted, the browser promises **never to evict** the origin's IndexedDB or Cache data under disk pressure. Data can only be deleted manually by the user clearing site settings.

### Storage Allocation Limits per Browser Engine

| Browser Engine | Best-Effort Allocation Limit | Eviction Threshold |
| :--- | :--- | :--- |
| **Chromium (Chrome, Edge, Brave)** | Up to 80% of total disk space per origin (capped by device space). | LRU origin wipe when disk space drops below ~2GB. |
| **Gecko (Firefox)** | Up to 10% of total disk space per origin (max 2GB per origin by default). | LRU eviction prompt when global disk usage exceeds 50%. |
| **WebKit (Safari Desktop/iOS)** | Up to 1GB base limit; prompts user or throws error on expansion without user interaction. | Wipes origin data after 7 days of non-use if site was not added to Home Screen or explicitly visited. |

---

## 5. Multi-Tab Schema Upgrade Concurrency & Lock Protocol

When an application opens an IndexedDB database with a version higher than the existing database on disk, the browser initiates a schema upgrade transaction (`onupgradeneeded`).

### The Version Upgrade Locking Protocol
1. Tab B requests `indexeddb.open("app_db", 2)`. Existing DB on disk is v1.
2. The browser places an **exclusive schema upgrade lock** on `"app_db"`.
3. The browser dispatches an `onversionchange` event to **all other open connections** on the same origin (e.g., Tab A).
4. **If Tab A responds by calling `db.close()`:** The browser releases Tab A's read lock. Tab B executes `onupgradeneeded` and upgrades the database successfully.
5. **If Tab A fails to close its connection:** Tab B's open request is stalled in the `onblocked` state indefinitely, creating a multi-tab deadlock!

### Required Multi-Tab Boilerplate
```javascript
// Register immediately on EVERY active connection
db.onversionchange = () => {
  db.close(); // Release lock immediately so upgrading tab can proceed
  alert('Application was updated in another tab. Reloading page...');
  window.location.reload();
};
```
