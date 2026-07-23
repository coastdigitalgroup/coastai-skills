# Example: SaaS Dashboard Onboarding Tour Breakdown

This example demonstrates how to design a 4-step guided onboarding tour for a SaaS metrics and workspace dashboard. It breaks down each step's layout context, the targeted anchor element, backdrop cutout mechanics, and popover bubble positioning.

---

## The Onboarding Happy Path Sequence

```text
[Step 1: Dashboard Welcome] -> [Step 2: Metrics Card] -> [Step 3: Primary Action] -> [Step 4: Help & Docs]
(Viewport Centered)             (Left-Rail Anchor)       (Top-Right Header Button)  (Bottom-Right Sticky)
```

### Step 1: The Welcome Gateway
- **Intent:** Welcome the user and set the expectations for the tour.
- **Anchor Element:** None (Viewport-centered Modal mode).
- **Backdrop Mask:** Solid dark fill `#000000` with `55%` opacity. No cutout.
- **Popover Positioning:** Dead center of the viewport (`fixed` alignment).
- **Popover Layout:**
  - **Title:** "Welcome to Acme Analytics!"
  - **Body:** "Let's take 60 seconds to explore your workspace so you can start tracking and improving your core conversion metrics."
  - **Progress:** "Step 1 of 4"
  - **Action Bar:**
    - Left Action: "Skip Tour" (Link style, low-contrast neutral gray)
    - Right Action: "Let's Go!" (Primary Button style, high-contrast Acme Blue)

---

### Step 2: Highlighting the Core Metric (Value-First)
- **Intent:** Point out the primary data visualization panel so the user understands what they are tracking.
- **Anchor Element:** `#main-metrics-card` (The main Line Chart component).
- **Backdrop Mask:** Dark fill with a rounded rectangular cutout (`clip-path` with 8px border-radius) around the metrics card.
- **Anchor Padding Buffer:** `8px` gap on all sides of the card.
- **Popover Positioning:** `Bottom-Center` relative to the metrics card (offset `16px` vertically).
- **Popover Layout:**
  - **Title:** "Your Performance Pulse"
  - **Body:** "This chart displays your real-time conversion rates. Hover over any node to view detailed, hour-by-hour metrics."
  - **Progress:** "Step 2 of 4"
  - **Action Bar:**
    - Left Action: "Skip"
    - Right Action: "Next" (Primary Button) / "Back" (Tertiary outline button)

```text
+--------------------------------------------------------+
|  [Main Metrics Card - Highlighted Anchor]               |
+--------------------------------------------------------+
                           | (16px vertical gap)
                           v
                     +-----------+
                     |    /\     | <-- Directional Arrow
                     |  [Popover] |
                     +-----------+
```

---

### Step 3: Guiding to the Primary Value Action
- **Intent:** Direct the user to the core utility button ("Add Integration") so they learn how to import data.
- **Anchor Element:** `#header-add-integration-btn` (Primary CTA in top-right page header).
- **Backdrop Mask:** Cutout mask around the button.
- **Anchor Padding Buffer:** `4px` gap on all sides.
- **Popover Positioning:** `Left-Center` of the button (offset `12px` horizontally) with a right-pointing arrow.
- **Popover Layout:**
  - **Title:** "Connect Your Tools"
  - **Body:** "Click here to link your existing data sources (Stripe, HubSpot, Google Analytics) to populate your dashboard in seconds."
  - **Progress:** "Step 3 of 4"
  - **Action Bar:**
    - Left Action: "Skip"
    - Right Action: "Next" / "Back"

---

### Step 4: Empowering Self-Service Help
- **Intent:** Teach the user where to find self-guided documentation so they are never stuck.
- **Anchor Element:** `#sticky-help-trigger` (Floating question mark icon in the bottom-right corner).
- **Backdrop Mask:** Cutout around the floating action button.
- **Anchor Padding Buffer:** `6px` circular gap.
- **Popover Positioning:** `Top-Right` of the trigger (offset `16px` vertically/horizontally) with a diagonal arrow pointing to the bottom-right corner.
- **Popover Layout:**
  - **Title:** "Always Here to Help"
  - **Body:** "Need support or deep-dive guides? Tap here to search our documentation hub or chat directly with our engineering team."
  - **Progress:** "Step 4 of 4"
  - **Action Bar:**
    - Left Action: (None - final step)
    - Right Action: "Finish Tour" (Primary Button) / "Back" (Tertiary Button)

---

## Responsive Pivot (Mobile Fallback Execution)

On viewports under `768px`, the horizontal floating layout transitions as follows:

1. **Overlay Mask:** Disabled to prevent clipping glitches and visual scrolling issues on mobile devices.
2. **Anchor Element:** No physical cutouts.
3. **Tour Popover Container:** Position transitions to a fixed **Bottom Sheet Drawer** sliding up from the bottom of the viewport.
4. **Visual Association:** Instead of a pointer arrow, the bottom sheet uses a micro-tag inside the header (e.g., `"Highlighting: Connect Tools"`) to orient the user.

```text
+-----------------------------------------+
| [Viewport Header]                       |
|                                         |
|  *Backdrop disabled on Mobile*          |
|                                         |
+-----------------------------------------+
| [Mobile Bottom Sheet]                   |
| --------------------------------------- |
|  HIGHLIGHTING: CONNECT TOOLS            |
|  Connect Your Tools                     |
|  Click the primary action button to     |
|  link your existing data sources.       |
|                                         |
|  [Skip]                 [Back] [Next]   |
+-----------------------------------------+
```
