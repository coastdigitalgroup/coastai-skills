# Example: E-commerce Checkout Flow

This breakdown shows the application of the Step Progress System to a standard
three-step e-commerce checkout process.

## 1. Task Mapping & Chunking

The checkout is divided into three logical chunks to reduce cognitive load:

1.  **Shipping:** Name, address, and delivery speed selection.
2.  **Payment:** Credit card details or alternative payment methods.
3.  **Review:** Final summary of the order before the binding purchase action.

## 2. Progress Indicator Configuration

- **Pattern:** Horizontal Stepper (Desktop) / Numeric Indicator (Mobile).
- **Labels:** "Shipping," "Payment," "Review."

## 3. Visual State Application

### Step 1: Shipping (Current State)
- **Visuals:** Step circle is bold (primary color), label is high-contrast.
- **Backdrop:** Rest of the page is focused on shipping fields.
- **Indicator:** Step 1/3.

### Step 2: Payment (Pending State)
- **Visuals:** Step circle is a light gray outline, label is muted gray.
- **Status:** Locked until Shipping is valid.

### Step 3: Review (Pending State)
- **Visuals:** Step circle is light gray, label is muted gray.

## 4. Navigation & Feedback Logic

- **Action:** "Continue to Payment" (Primary CTA).
- **Action:** "Return to Cart" (Secondary Text Link).
- **Validation:** If a required field in Shipping is missing, the "Shipping" step
  in the indicator turns Red with an exclamation mark (!) icon until fixed.

## 5. Mobile Adaptation

- **Transition:** On screens < 768px, the horizontal stepper disappears.
- **New Indicator:** A persistent sticky header appears: `Step 1 of 3: Shipping`.
- **Spacing:** Fields stack vertically to ensure 44px touch targets for inputs.

## 6. Completion

- After clicking "Place Order" on Step 3, the user is redirected to a
  `Thank You` page.
- **Note:** This page is *not* part of the 1-2-3 stepper; it is the final
  destination.
