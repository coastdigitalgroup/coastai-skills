# Multi-Step Wizard and Stepper Applied Examples

This document demonstrates the application of the `stepper-and-wizard-system` across two distinct real-world design problems: a B2B SaaS Account Onboarding Wizard and an E-Commerce Checkout Stepper.

---

## Example 1: B2B SaaS Account Setup Wizard (Branching Workflow)

### Context & Design Problem
A enterprise cloud platform requires newly registered organizations to complete a 4-step setup flow before accessing their dashboard:
1. Workspace Details
2. Plan & Billing
3. Team Invitations (Dynamic Branching)
4. Integration Connections

If the organization selects an "Enterprise Plan" in Step 2, a conditional "SSO & Security Policy" sub-step is dynamically inserted between Step 2 and Step 3.

---

### Desktop Visual Breakdown (`> 1024px`)

#### Layout Architecture
The desktop view uses a **Vertical Sidebar Stepper** on the left (`width: 280px`) paired with a main form canvas (`flex: 1`).

```text
+-----------------------------------------------------------------------------------+
| Acme SaaS Setup                                         [ Save Draft ] [ Need Help? ] |
+-------------------------------+---------------------------------------------------+
| STEPPER NAVIGATION            | MAIN FORM CANVAS                                  |
|                               |                                                   |
| (✓) 1. Workspace Details      | Step 2: Select Plan & Billing                     |
|     Completed (Acme Corp)     | Choose the plan that best fits your team          |
|                               |                                                   |
| (2) 2. Plan & Billing         | +--------------------+   +----------------------+ |
|     Active                    | | Pro ($49/mo)       |   | Enterprise (Custom)  | |
|                               | | [ Select Plan ]    |   | [✓ Selected ]        | |
| ( ) 3. SSO & Security         | +--------------------+   +----------------------+ |
|     * Dynamically inserted    |                                                   |
|                               |  Notice: Selecting Enterprise adds security setup |
| ( ) 4. Team Invitations       |                                                   |
|                               | ------------------------------------------------- |
| ( ) 5. Integrations           | [ ← Back ]                     [ Continue to SSO → ]|
+-------------------------------+---------------------------------------------------+
```

#### Step State Anatomy in Vertical Sidebar
1. **Step 1 (Completed):**
   - Node: `32x32px` solid primary circle (`#2563EB`) with centered white checkmark icon (`#FFFFFF`).
   - Connector Track: `2px` solid line (`#2563EB`) extending vertically to Step 2 node.
   - Text Label: "1. Workspace Details" in `14px` weight 600 (`#0F172A`).
   - Summary Badge: "Completed (Acme Corp)" in `12px` muted text (`#64748B`).
   - Interaction: Keyboard focusable link (`<a>`) with `href="#step-1"`.
2. **Step 2 (Active / Current):**
   - Node: `32x32px` circle with `2px` solid primary border (`#2563EB`), white background, bold text `"2"` inside (`#2563EB`).
   - Attribute: `aria-current="step"`.
   - Connector Track: `2px` dashed neutral line (`#CBD5E1`) extending to Step 3 node.
3. **Step 3 (Inserted Dynamic Step):**
   - Node: `32x32px` circle with neutral fill (`#F1F5F9`) and dashed border (`#94A3B8`).
   - Label: "3. SSO & Security" with badge "Dynamic".
   - Announcement: Announced to screen readers via `aria-live="polite"` when Enterprise tier was toggled in Step 2.

---

### Mobile Viewport Adaptation (`< 640px`)

On mobile viewports (`375px`), the left vertical sidebar is hidden to prevent vertical clutter. It collapses into a **Header Sticky Summary Bar** with an expandable drawer.

```text
+--------------------------------------------------+
| Step 2 of 5: Plan & Billing           [ Details ▼]|
| [=====================------------------] 40%    |
+--------------------------------------------------+
| Main Form Canvas                                 |
|                                                  |
| Select Plan & Billing                            |
| Choose the plan that best fits your team         |
|                                                  |
| [ Pro Tier ($49/mo) ]                            |
| [ Enterprise Tier (Selected) ]                   |
|                                                  |
| ------------------------------------------------ |
| [ ← Back ]                   [ Continue to SSO → ]
+--------------------------------------------------+
```

---

## Example 2: E-Commerce Checkout Stepper (Linear Flow)

### Context & Design Problem
An e-commerce store needs a high-converting, 4-step linear checkout workflow:
1. Shipping Address
2. Delivery Options
3. Payment Method
4. Review & Place Order

The flow must prevent jumping ahead to payment before shipping is entered, while allowing users to click back to step 1 to edit their shipping address without losing entered data.

---

### Desktop Visual Breakdown (`> 1024px`)

#### Horizontal Stepper Top Bar

```text
+-------------------------------------------------------------------------------------------------+
|                                                                                                 |
|   (✓) Shipping   ==========   (2) Delivery   ----------   ( ) Payment   ----------   ( ) Review |
|   Completed                   Active                      Pending                    Pending    |
|                                                                                                 |
+-------------------------------------------------------------------------------------------------+
```

#### Spatial Metrics & Tokens
- **Container Height:** `88px` padding top/bottom `20px`.
- **Node Spacing:** Equal grid column widths (`calc(100% / 4)`).
- **Connector Line:** Positioned top `36px` (vertically centered with the 32px node center). `height: 2px`.
  - Left Connector (Step 1 to Step 2): `#2563EB` (Solid Active).
  - Middle Connectors (Step 2 to Step 3, Step 3 to Step 4): `#E2E8F0` (Inactive Neutral).

#### Accessibility & Keyboard Mapping
- **Completed Node 1 (Shipping):**
  - Markup: `<button type="button" class="stepper__node-btn" aria-label="Step 1: Shipping Address, Completed. Click to edit.">`
  - Keyboard Focus: Focus outline `2px solid #2563EB`, offset `2px`.
- **Active Node 2 (Delivery):**
  - Markup: `<div class="stepper__node" aria-current="step">`
  - Screen Reader Output: *"Step 2 of 4: Delivery Options, Current Step"*.
- **Pending Node 3 (Payment):**
  - Markup: `<div class="stepper__node stepper__node--disabled" aria-disabled="true">`
  - Non-interactive until Step 2 is validated.

---

### Form Validation Failure & Error State Handling

If the user attempts to click "Proceed to Payment" without selecting a shipping speed in Step 2:

```text
+-------------------------------------------------------------------------------------------------+
|                                                                                                 |
|   (✓) Shipping   ==========   (!) Delivery   ----------   ( ) Payment   ----------   ( ) Review |
|   Completed                   Error                       Pending                    Pending    |
|                                                                                                 |
+-------------------------------------------------------------------------------------------------+
|  [!] Please select a delivery option to continue.                                                |
+-------------------------------------------------------------------------------------------------+
```

- **Node State Shift:** Step 2 node background turns error red (`#DC2626`) with a white exclamation icon (`!`).
- **Focus Shift:** Focus is automatically directed to the error alert banner (`tabindex="-1"`) and announced via `aria-live="assertive"`.
- **Label Color:** Text label updates to bold red (`#DC2626`) to satisfy dual visual cue guidelines.
