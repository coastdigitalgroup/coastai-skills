# Stepper and Wizard Anatomy and UX Rules Reference

## 1. Physical Component Anatomy

```text
[ HORIZONTAL STEPPER ANATOMY ]

   (1) =============== (2) --------------- (3) --------------- (4)
   [A]      [B]        [C]                  [D]
 Account            Shipping             Payment              Review
 Complete            Active              Upcoming            Upcoming
   [E]                [F]                  [G]

Anatomy Legend:
[A] Completed Step Badge Node (32x32px Circle with Checkmark Icon)
[B] Active Connector Track (2px Solid High-Contrast Line)
[C] Active Step Badge Node (32x32px Circle with Numeric Index & Focus Ring)
[D] Incomplete Track Connector (2px Muted Line)
[E] Primary Step Title Label (14px Semi-Bold Typography)
[F] Active State Indicator Badge / Color Highlight
[G] Secondary State Summary Text (Optional Value Preview)
```

---

## 2. Step Count & Cognitive Load Thresholds

| Step Count | Classification | Recommended Stepper Layout Pattern | UX Recommendation |
| :--- | :--- | :--- | :--- |
| **1 - 2 Steps** | Low Complexity | **Single Page or Multi-Section Form** | Do not use a wizard; standard form fieldsets suffice. |
| **3 - 5 Steps** | Ideal Wizard Range | **Horizontal Stepper Bar or Vertical Sidebar** | Peak conversion performance. Users maintain mental model easily. |
| **6 - 8 Steps** | High Complexity | **Vertical Sidebar Stepper with Collapsible Sub-groups** | Group related steps into parent sections (e.g., Section A: Personal -> Steps 1 & 2). |
| **9+ Steps** | Critical Complexity | **Process Decomposition Required** | Split into separate saved sub-applications or modular tasks. |

---

## 3. Comprehensive State & Contrast Matrix

To guarantee WCAG AA compliance across light and dark themes, adhere to the following color contrast metrics:

| Step State | Circle Fill Token | Circle Border Token | Icon / Number Token | Text Label Token | Minimum Non-Text Contrast | Minimum Text Contrast |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Upcoming / Incomplete** | `#FFFFFF` (`#1E293B`) | `#94A3B8` (`#475569`) | `#64748B` (`#94A3B8`) | `#64748B` (`#94A3B8`) | 3:1 against background | 4.5:1 against background |
| **Active / Current** | `#2563EB` (`#3B82F6`) | `#2563EB` (`#3B82F6`) | `#FFFFFF` (`#FFFFFF`) | `#0F172A` (`#F8FAFC`) | 3:1 against background | 4.5:1 against background |
| **Completed** | `#16A34A` (`#22C55E`) | `#16A34A` (`#22C55E`) | `#FFFFFF` (`#FFFFFF`) | `#0F172A` (`#F8FAFC`) | 3:1 against background | 4.5:1 against background |
| **Optional** | `#F8FAFC` (`#0F172A`) | `#CBD5E1` (`#334155`) | `#64748B` (`#94A3B8`) | `#475569` (`#CBD5E1`) | 3:1 against background | 4.5:1 against background |
| **Error / Invalid** | `#FEF2F2` (`#450A0A`) | `#DC2626` (`#EF4444`) | `#DC2626` (`#EF4444`) | `#991B1B` (`#FCA5A5`) | 3:1 against background | 4.5:1 against background |

---

## 4. Keyboard Navigation & Focus Management Protocols

1. **Top-Level Navigation Sequence:**
   - Navigable step links (`<a href="#step-1">` or `<button>`) must be included in natural `Tab` key sequence order inside the `<nav>` region.
   - Non-navigable future steps in linear flows must use `tabindex="-1"` or `disabled` attribute to prevent keyboard traps.

2. **Step Advancement Focus Routing:**
   - When the user clicks "Continue" or presses `Enter`, perform client-side validation on the current step.
   - If valid, update the active step container and programmatically call `element.focus()` on the step's primary heading (`<h2 tabindex="-1">Step Title</h2>`).
   - If invalid, shift focus directly to the first invalid input element (`input[aria-invalid="true"]`) and trigger inline field error messages.

3. **Screen Reader Announcement Hooks:**
   - Active step must possess `aria-current="step"`.
   - Hidden text elements (`<span class="sr-only">Step 1 of 4: Completed</span>`) ensure screen reader users hear state context without visual clutter.
