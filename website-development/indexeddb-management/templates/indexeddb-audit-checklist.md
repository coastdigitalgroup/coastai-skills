# IndexedDB Implementation Audit Checklist

Use this checklist when reviewing client-side IndexedDB database architectures, data persistence layers, schema migrations, and offline storage systems.

---

## 1. Schema & Migration Architecture

- [ ] **Positive Integer Versioning:** Is the database version declared as a strictly positive integer (`1`, `2`, `3`) rather than a float or string?
- [ ] **Isolated Migration Lifecycle:** Are all `createObjectStore`, `deleteObjectStore`, `createIndex`, and `deleteIndex` calls strictly contained inside the `onupgradeneeded` event handler?
- [ ] **Incremental Version Guards:** Are migrations checked sequentially using `if (oldVersion < N)` logic to support upgrade paths from any legacy version?
- [ ] **Primary Key Definition:** Does every object store define an explicit `keyPath` or `autoIncrement` generator?
- [ ] **Index Strategy:** Are indexes created only for properties that require frequent filtering, sorting, or uniqueness enforcement?
- [ ] **Multi-Entry Array Indexing:** Are array fields (e.g., tags, categories) indexed with `{ multiEntry: true }` so individual array elements can be queried?

---

## 2. Transaction Integrity & Event Loop Safety

- [ ] **No Async Network/Timer Breaks in Transactions:** Are external async operations (`fetch()`, `setTimeout()`, `Promise.all()` from outside IDB) excluded from inside active IDB transactions to prevent auto-commit dropouts?
- [ ] **Batch Writes in Single Transaction:** Are high-volume record updates grouped inside a single `readwrite` transaction rather than opening a separate transaction per record?
- [ ] **Readonly Mode Default:** Are queries and read operations explicitly opened in `'readonly'` mode to maximize browser concurrency?
- [ ] **Explicit Transaction Error Handlers:** Do transactions listen to both `onerror` and `onabort` events to catch and bubble failure states properly?
- [ ] **Promise Abstraction Wrap:** Are DOM `IDBRequest` events cleanly wrapped in Promise handles with `resolve` and `reject` paths?

---

## 3. Multi-Tab & Concurrency Safeguards

- [ ] **`onversionchange` Binding:** Does the active `IDBDatabase` handle register a `db.onversionchange = () => db.close()` callback immediately upon connection open?
- [ ] **`onblocked` User Notification/Retry:** Does `indexedDB.open()` handle the `onblocked` event gracefully when another open tab delays schema upgrade execution?
- [ ] **No Cross-Tab Lock Reinvention:** Does the application avoid using IndexedDB object stores as ad-hoc distributed locks, delegating cross-tab coordination to `navigator.locks` or `BroadcastChannel`?

---

## 4. Performance & Memory Management

- [ ] **Cursor Pagination for Large Collections:** Are large stores (>1,000 items) queried via `openCursor()` with offset skips and limit caps instead of loading full collections into main memory via `getAll()`?
- [ ] **Key Range Bound Querying:** Are range queries scoped using `IDBKeyRange.bound()`, `IDBKeyRange.only()`, or `IDBKeyRange.lowerBound()` to leverage index tree lookups?
- [ ] **Connection Lifecycle:** Are inactive connections closed when no longer needed or on application tear-down?

---

## 5. Storage Quota & Persistence Safeguards

- [ ] **Quota Error Handling:** Are `put()` and `add()` operations wrapped in `try...catch` blocks to capture `QuotaExceededError` (DOMException)?
- [ ] **Storage Estimation:** Does the application inspect `navigator.storage.estimate()` to monitor client storage consumption and warn users before quota exhaustion?
- [ ] **Persistence Request:** Is `navigator.storage.persist()` called for critical offline applications to prevent automated browser data eviction under disk pressure?
- [ ] **Fallback Degradation:** If IndexedDB is blocked (e.g., restricted browser privacy settings or incognito restrictions), does the application fall back gracefully without unhandled exceptions?

---

## 6. Data Security & Clone Integrity

- [ ] **Structured Clone Verification:** Are all objects saved to IndexedDB verified to contain only clonable data (no DOM elements, functions, or uncloneable class prototypes)?
- [ ] **No Sensitive Credential Storage:** Are unencrypted JWTs, session tokens, passwords, or sensitive financial items excluded from IndexedDB?
- [ ] **Data Sanitization on Read:** Is user-generated content retrieved from IndexedDB sanitized before being interpolated into DOM elements (XSS prevention)?
