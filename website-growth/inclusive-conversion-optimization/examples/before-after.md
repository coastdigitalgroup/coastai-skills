# Example: Inclusive Checkout Optimization

## Scenario

**The Business:** "EcoHome," a sustainable home goods e-commerce retailer.
**The Problem:** High abandonment rate (18%) on the final "Review & Pay" page.
Heatmaps showed users were clicking the "Pay" button, but nothing was
happening.
**The Discovery:** The "Pay" button was disabled until a "Terms & Conditions"
checkbox was checked. However, the error message for the missing checkbox only
appeared as a red border around the checkbox itself, which was located far
from the "Pay" button. Additionally, the checkbox lacked an ARIA label,
making it invisible to screen reader users.

## The Before

- **Validation:** Visual only (red border on the field).
- **Hierarchy:** Terms & Conditions checkbox buried at the bottom of a long column.
- **Accessibility:** Button state was `disabled`, which many screen readers
  don't announce or explain.
- **Outcome:** Users with low vision or those using screen readers couldn't
  identify why the "Pay" button wasn't working.

## The After (Inclusive Optimization Applied)

1.  **Redundant Signaling:** Added a text error message directly above the "Pay"
    button: "Please accept the Terms & Conditions to proceed."
2.  **Focus Management:** When a user clicks "Pay" without checking the box,
    the focus is automatically moved to the checkbox, and the screen reader
    announces the error.
3.  **Active State over Disabled:** Instead of disabling the button (which
    prevents interaction and feedback), the button remained active but
    triggered a clear, accessible error message if the form was incomplete.
4.  **Touch Target:** Increased the checkbox clickable area to 44x44px.

## Measurable Results

- **Conversion Rate (CVR) Lift:** 4.2% increase in overall checkout completion.
- **Checkout Abandonment:** Dropped from 18% to 13.5%.
- **Customer Support Tickets:** 60% reduction in "I can't click the pay
  button" inquiries.
- **Market Expansion:** A noticeable uptick in conversions from users with
  "High Contrast Mode" enabled and those using screen readers.
