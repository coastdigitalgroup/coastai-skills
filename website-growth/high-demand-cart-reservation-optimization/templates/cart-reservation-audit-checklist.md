# High-Demand Cart Reservation Audit Checklist & Spec Template

Use this template to audit, design, and validate inventory reservation mechanics, checkout queues, and hold expiration flows for limited-edition launches, flash sales, and high-concurrency drops.

---

## 1. Inventory Hold & Lock Audit

| Check Area | Audit Question | Pass / Fail / NA | Corrective Action |
| :--- | :--- | :--- | :--- |
| **Lock Timing** | Is stock reserved upon "Add to Cart" / Queue entry, or delayed until checkout? | [ ] | Move hold reservation trigger to "Add to Cart" or Queue entry to prevent mid-checkout stockouts. |
| **Hold Duration** | Is hold timer between 8 and 15 minutes? | [ ] | Adjust hold lease duration (recommend 10 minutes for standard e-commerce drops). |
| **Server Sync** | Is timer calculated using server timestamps rather than client `setInterval`? | [ ] | Pass `server_expires_at` ISO string from API; sync client countdown to server clock. |
| **Navigation Persistence**| Does timer remain unchanged when navigating between pages/steps? | [ ] | Store session reservation token and remaining duration in persistent store (SessionStorage / Redis). |
| **Atomic Lock API** | Does backend use atomic locks (e.g. Redis `SET ... NX`) to prevent double-allocation? | [ ] | Implement atomic lease check on line-item mutation endpoint. |

---

## 2. UI Transparency & Queue Experience

| Check Area | Audit Question | Pass / Fail / NA | Corrective Action |
| :--- | :--- | :--- | :--- |
| **Queue Position** | If concurrency exceeds threshold, is queue position or wait time displayed? | [ ] | Add linear progress bar and dynamic wait estimate ("Queue Position #240 - ~2 mins"). |
| **Sticky Hold Banner** | Is reservation banner persistently visible at top of viewport across all checkout steps? | [ ] | Mount sticky banner (`position: sticky; top: 0; z-index: 1000`) with high-contrast text. |
| **Mobile Safety Margin**| Does timer UI avoid covering mobile checkout CTAs or form fields? | [ ] | Apply `env(safe-area-inset-bottom)` padding and test on 375px viewport screens. |
| **Accessibility (ARIA)** | Is timer updated accessibly via `aria-live="polite"` at 1-min intervals? | [ ] | Add hidden screen-reader status container with polite live region updates. |
| **Price & Variant Lock** | Are price and variant attributes locked during the active hold window? | [ ] | Freeze line-item price and variant selection once reservation token is issued. |

---

## 3. Expiration Warning & Stock Recovery Audit

| Check Area | Audit Question | Pass / Fail / NA | Corrective Action |
| :--- | :--- | :--- | :--- |
| **2-Min Warning** | Is a subtle notification displayed when 2 minutes remain on the hold? | [ ] | Trigger inline alert modal/toast at `t - 120s`. |
| **1-Touch Extension** | Is a single 3-minute extension option offered to active users? | [ ] | Provide "Extend Hold (+3 mins)" button if user is focused on checkout form fields. |
| **Form Data Retention**| Are customer address and credit card fields preserved if timer expires? | [ ] | Retain populated form state in browser memory so user can re-reserve with 1 click. |
| **Stock Release Protocol**| Upon timer expiration, is freed stock offered instantly to queue/waitlist buyers? | [ ] | Implement immediate background release cron/queue worker to re-assign un-purchased stock. |
| **Manual Release CTA** | Is an "Exit Drop / Release Hold" link available for users who decide not to buy? | [ ] | Add small link in cart drawer allowing users to voluntarily release hold for others. |

---

## 4. Technical Specification Blueprint for Engineers

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "CartReservationState",
  "type": "object",
  "properties": {
    "reservation_id": { "type": "string", "example": "res_8f93a10c" },
    "sku": { "type": "string", "example": "KINETIC-JACKET-BLK-L" },
    "quantity_reserved": { "type": "integer", "default": 1 },
    "created_at": { "type": "string", "format": "date-time" },
    "server_expires_at": { "type": "string", "format": "date-time" },
    "status": {
      "type": "string",
      "enum": ["QUEUED", "HELD", "WARNING", "EXPIRED", "COMPLETED"]
    },
    "extension_claimed": { "type": "boolean", "default": false },
    "queue_position": { "type": "integer", "nullable": true }
  },
  "required": ["reservation_id", "sku", "server_expires_at", "status"]
}
```
