# Multi-Step Wizard and Stepper System Breakdown

This breakdown demonstrates the application of the **Stepper and Wizard Design System** across two real-world enterprise web scenarios: an E-Commerce Multi-Step Checkout Wizard and a B2B SaaS Organization Onboarding Wizard.

---

## Scenario 1: E-Commerce Multi-Step Checkout Wizard (Horizontal Layout)

### Context & Goal
A high-volume B2C e-commerce checkout flow optimized for converting desktop and mobile shoppers through a 4-step linear checkout pipeline.

### Step Inventory & Hierarchy
1. **Step 1: Account & Email** (Required, Completed)
2. **Step 2: Shipping & Delivery** (Required, Active)
3. **Step 3: Payment Method** (Required, Upcoming)
4. **Step 4: Order Review & Confirmation** (Required, Upcoming)

---

### Desktop Viewport Layout Breakdown (>= 1024px)

```text
+---------------------------------------------------------------------------------------------------+
|  [Logo] Store Checkout                                                 [🔒 256-bit SSL Encrypted] |
+---------------------------------------------------------------------------------------------------+
|                                                                                                   |
|   <nav aria-label="Checkout Progress">                                                            |
|   +-------------------------------------------------------------------------------------------+   |
|   |   ( ✓ ) =============== ( 2 ) --------------- ( 3 ) --------------- ( 4 )                 |   |
|   |  Account             Shipping             Payment               Review                    |   |
|   |  john@email.com       Active              Upcoming             Upcoming                   |   |
|   +-------------------------------------------------------------------------------------------+   |
|   </nav>                                                                                          |
|                                                                                                   |
|   +---------------------------------------------+   +-----------------------------------------+   |
|   |  <main id="step-content">                   |   |  <aside aria-label="Order Summary">     |   |
|   |  <h2 tabindex="-1">Step 2: Shipping Address |   |  Order Summary (3 items)                |   |
|   |  ------------------------------------------ |   |  ----------------------------           |   |
|   |  First Name *       Last Name *             |   |  Subtotal:                      $149.00 |   |
|   |  [ John           ] [ Doe                 ] |   |  Estimated Tax:                  $11.92 |   |
|   |                                             |   |  Shipping:                         FREE |   |
|   |  Street Address *                           |   |  ----------------------------           |   |
|   |  [ 123 Main Street                        ] |   |  Total Due:                     $160.92 |   |
|   |                                             |   +-----------------------------------------+   |
|   |  City *             State *     ZIP Code *  |                                                 |
|   |  [ Austin         ] [ Texas  ▼] [ 78701   ] |                                                 |
|   |                                             |                                                 |
|   |  +---------------------------------------+  |                                                 |
|   |  | [ Back to Account ] [ Continue to Payment ]|                                               |
|   |  +---------------------------------------+  |                                                 |
|   |  </main>                                    |                                                 |
|   +---------------------------------------------+                                                 |
+---------------------------------------------------------------------------------------------------+
```

### Key Design Specs
- **Header Alignment:** Centered horizontal stepper with `2px` track connector lines.
- **Completed Step Badge:** `32x32px` solid primary green (`#16A34A`) badge with white checkmark SVG. Contains inline subtitle displaying entered account email (`john@email.com`). Clicking this badge allows returning to Step 1 without wiping form state.
- **Active Step Badge:** `32x32px` solid brand blue (`#2563EB`) badge with bold white text `2`. `aria-current="step"` applied.
- **Keyboard Routing:** Clicking "Continue to Payment" programmatically shifts keyboard focus to `<h2 tabindex="-1">Step 3: Payment Method</h2>`.

---

### Mobile Viewport Layout Breakdown (< 768px)

On narrow screens, the horizontal 4-step bar is replaced by a sticky compact progress header with an collapsible accordion drawer to prevent horizontal overflow and crowded text labels.

```text
+------------------------------------+
| [Logo] Store Checkout              |
+------------------------------------+
|  [Sticky Progress Header]          |
|  Step 2 of 4: Shipping Address     |
|  [===== Active Progress 50% =====] |
|  [ Show All Steps (▼) ]            |
+------------------------------------+
|                                    |
|  <h2 tabindex="-1">Shipping</h2>   |
|                                    |
|  First Name *                      |
|  [ John                          ] |
|                                    |
|  Last Name *                       |
|  [ Doe                           ] |
|                                    |
|  Street Address *                  |
|  [ 123 Main Street               ] |
|                                    |
|  +-------------------------------+ |
|  | [ Back ]  [ Continue (44px) ] | |
|  +-------------------------------+ |
+------------------------------------+
```

### Mobile Accordion Expansion State

When tapping "Show All Steps (▼)", an overlay accordion slides down detailing the full progress breakdown:

```text
+------------------------------------+
|  <ol>                              |
|   ( ✓ ) 1. Account Details         |
|         john@email.com             |
|   ( 2 ) 2. Shipping Address [Active]|
|   ( 3 ) 3. Payment Method          |
|   ( 4 ) 4. Review & Submit         |
|  </ol>                             |
|  [ Hide Steps (▲) ]                |
+------------------------------------+
```

---

## Scenario 2: B2B SaaS Organization Onboarding Wizard (Vertical Sidebar Layout)

### Context & Goal
An enterprise multi-tenant SaaS workspace setup wizard requiring organization details, team invitations, integrations configuration, and billing setup.

### Step Inventory & Hierarchy
1. **Step 1: Workspace Profile** (Completed)
2. **Step 2: Team Member Invitations** (Completed)
3. **Step 3: Technical Integrations** (Active - Optional)
4. **Step 4: Subscription Plan & Billing** (Upcoming)

---

### Desktop Vertical Sidebar Layout Breakdown (>= 1024px)

```text
+---------------------------------------------------------------------------------------------------+
|  Acme Corp Enterprise Portal Setup                                         Step 3 of 4 (75%)      |
+---------------------------------------------------------------------------------------------------+
|                                                                                                   |
|  +-----------------------------+  +------------------------------------------------------------+  |
|  | <nav aria-label="Sidebar">  |  | <main id="step-content">                                   |  |
|  |                             |  | <h2 tabindex="-1">Step 3: Connect Technical Integrations    |  |
|  | ( ✓ ) 1. Workspace Profile  |  | <p>Sync your existing developer tools (Optional).</p>      |  |
|  |       acme-corp.app         |  | ---------------------------------------------------------- |  |
|  |   |                         |  |                                                            |  |
|  | ( ✓ ) 2. Invite Team        |  |  +-------------------+  +-------------------+              |  |
|  |       5 members invited     |  |  | [Icon] GitHub     |  | [Icon] Slack      |              |  |
|  |   |                         |  |  | [ Connected  ✓ ]  |  | [ Connect Tool  ] |              |  |
|  | ( 3 ) 3. Integrations       |  |  +-------------------+  +-------------------+              |  |
|  |       (Optional) [ACTIVE]   |  |                                                            |  |
|  |   |                         |  |  +-------------------+  +-------------------+              |  |
|  | ( 4 ) 4. Billing Setup      |  |  | [Icon] Jira       |  | [Icon] Datadog    |              |  |
|  |       Upcoming              |  |  | [ Connect Tool  ] |  | [ Connect Tool  ] |              |  |
|  |                             |  |  +-------------------+  +-------------------+              |  |
|  |                             |  |                                                            |  |
|  |                             |  |  --------------------------------------------------------- |  |
|  |                             |  |  [ Back ]                  [ Skip / Next: Billing Setup ] |  |
|  | </nav>                      |  | </main>                                                    |  |
|  +-----------------------------+  +------------------------------------------------------------+  |
+---------------------------------------------------------------------------------------------------+
```

### Key Design Specs
- **Vertical Sidebar Advantage:** Displays persistent summary notes beneath completed steps ("acme-corp.app", "5 members invited"), providing immediate context.
- **Optional Step Treatment:** Explicit "(Optional)" text badge adjacent to Step 3 title. Primary action button changes from "Next" to "Skip / Next: Billing Setup" when no optional tools are toggled.
- **Validation Feedback:** Non-linear navigation allows clicking Step 1 to update the workspace name without losing invited team members in Step 2.
