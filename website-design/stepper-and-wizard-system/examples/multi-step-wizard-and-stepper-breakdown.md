# Multi-Step Wizard and Stepper System Breakdown

This breakdown illustrates a production-grade multi-step checkout and onboarding wizard layout. It demonstrates linear vs branching step management, field chunking, action dock positioning, responsive layout adaptation, and accessible focus management.

---

## 1. Structural Architecture & Layout Diagram

### Desktop Layout ($\ge 1024\text{px}$)
```text
+-----------------------------------------------------------------------------------+
|  [Logo / Brand Header]                                  [Save Draft & Exit]       |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  NAV: Progress Indicator (aria-label="Checkout Progress")                         |
|  +-----------------------------------------------------------------------------+  |
|  | (✓) 1. Account     ===>  (2) Shipping     --->  (3) Payment  ---> (4) Review |  |
|  |     Completed             Active                 Upcoming        Upcoming   |  |
|  +-----------------------------------------------------------------------------+  |
|                                                                                   |
|  MAIN PANEL CANVAS (max-width: 720px; centered)                                   |
|  +-----------------------------------------------------------------------------+  |
|  |  H2: Step 2: Shipping & Delivery Options                                   |  |
|  |  Subtext: Choose where you would like your package delivered.                |  |
|  |                                                                             |  |
|  |  [Field Group: Saved Addresses Dropdown]                                    |  |
|  |  [Field Group: Street Address, Suite/Apt]                                   |  |
|  |  [Field Group: City / State / ZIP - Subgrid Layout]                         |  |
|  |                                                                             |  |
|  |  [Selection Cards: Standard ($5) vs Express ($15)]                         |  |
|  +-----------------------------------------------------------------------------+  |
|                                                                                   |
|  ACTION DOCK (Persistent Bottom Row)                                              |
|  +-----------------------------------------------------------------------------+  |
|  | [ < Back to Account ]                               [ Continue to Payment > ] |  |
|  +-----------------------------------------------------------------------------+  |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

---

### Mobile Layout ($< 768\text{px}$)
```text
+------------------------------------------+
| [Logo]                     [Save Draft]  |
+------------------------------------------+
| COMPACT STEPPER HEADER                   |
| Step 2 of 4: Shipping & Delivery         |
| [===================       ] (50% bar)   |
+------------------------------------------+
| MAIN PANEL CANVAS (100% width)           |
|                                          |
| H2: Shipping & Delivery                  |
|                                          |
| [Street Address Input]                   |
| [City Input]                             |
| [State / ZIP Inputs]                     |
|                                          |
| [Delivery Method Cards]                  |
|                                          |
+------------------------------------------+
| FIXED BOTTOM ACTION DOCK                 |
| +--------------------------------------+ |
| | [< Back]    [ Continue to Payment >] | |
| +--------------------------------------+ |
+------------------------------------------+
```

---

## 2. Step Mechanics & State Matrix

| Step Index | Step Label | Accessible State | Header Indicator Visual | Interactive Capability |
| :--- | :--- | :--- | :--- | :--- |
| **Step 1** | Account Details | `Completed` | Green background, Check icon `(✓)`, bold text | Clickable button (allows returning to edit) |
| **Step 2** | Shipping & Delivery | `Active` (`aria-current="step"`) | High-contrast primary ring, numbered badge `(2)` | Active focus context (non-clickable button) |
| **Step 3** | Payment Info | `Upcoming` / `Incomplete` | Muted grey badge `(3)`, low-contrast text | Disabled in linear flow; non-clickable |
| **Step 4** | Review & Place Order | `Upcoming` / `Incomplete` | Muted grey badge `(4)`, low-contrast text | Disabled in linear flow; non-clickable |

---

## 3. Responsive Adaptation Strategy

1. **Desktop ($\ge 1024\text{px}$):**
   - Full horizontal stepper bar with numbered circles, step titles, and step subtext.
   - Panel container constrained to $720\text{px}$ maximum width centered on canvas.
   - Action buttons placed inline within the panel footer.

2. **Tablet ($768\text{px} - 1023\text{px}$):**
   - Horizontal stepper hides subtext, keeping step titles and numbered badges.
   - Panel expands to fill available tablet width with $32\text{px}$ side padding.

3. **Mobile ($< 768\text{px}$):**
   - Horizontal stepper list hidden (`display: none`).
   - Replaced by sticky compact header: textual step counter (`Step 2 of 4`) and $4\text{px}$ height percentage progress bar.
   - Action dock pinned to viewport bottom (`position: fixed; bottom: 0`) to optimize touch ergonomics.

---

## 4. Interaction & Accessibility Flow

```text
User Fills Step 2 Form
        │
        ▼
Clicks "Continue to Payment"
        │
        ├──[ Client-side Validation Fails ]──► Highlight Invalid Fields
        │                                      Announce errors via aria-live
        │                                      Move focus to first invalid input
        │
        └──[ Client-side Validation Passes ]──► Persist Step 2 State
                                               Update aria-current="step" to Step 3
                                               Shift focus to Step 3 <h2> Heading
                                               Scroll viewport to panel top
```
