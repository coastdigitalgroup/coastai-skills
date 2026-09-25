# Quantity Break Heuristics, Behavioral Economics & Accessibility Reference

This reference document outlines the underlying behavioral psychology principles, mathematical pricing rules, visual hierarchy heuristics, and ARIA accessibility standards for designing high-conversion multi-buy volume discount systems.

---

## 1. Behavioral Economics & Persuasion Heuristics

### Unit Price Anchoring (The Division Friction Principle)
When consumers evaluate multi-pack products (e.g., a 6-pack for $180), the human brain instinctively attempts mental division ($180 \div 6 = \$30$) to compare the offer against the single-unit price ($40). Mental math introduces cognitive friction. If the calculation feels effortful, the consumer defaults to the simplest choice: buying 1 unit or leaving.

- **Heuristic Rule:** Eliminate cognitive division by displaying the calculated per-unit price as the dominant visual headline in the tier card: **"$30.00 / ea"**.
- **Psychological Impact:** Reduces cognitive processing load by 80%, transferring focus directly to the per-unit savings.

---

### The Decoy Effect (Asymmetric Dominance)
The Decoy Effect occurs when consumers change their preference between two options when presented with a third, strategically framed option (the "decoy").

- **Application in Quantity Breaks:**
  - Option A (Target): 3 Tubs @ $32.30/ea ($96.90 Total) — 15% Off
  - Option B (Decoy/Anchor): 1 Tub @ $38.00/ea ($38.00 Total) — 0% Off
  - Option C (Extreme): 6 Tubs @ $28.50/ea ($171.00 Total) — 25% Off
- **Mechanism:** Option A (3-pack) becomes asymmetric in perceived value when placed between the full-price single unit (Option B) and the high-commitment 6-pack (Option C). Option C serves as an extreme anchor, making Option A feel like the sensible, middle-ground compromise ("Goldilocks Zone").

---

### Pre-Selection Default Bias (Status Quo Effect)
Decisional inertia dictates that humans tend to accept the default option presented to them rather than actively changing it.

- **Heuristic Rule:** Always load the PDP with Tier 2 ("Most Popular") pre-selected.
- **Empirical Impact:** Defaulting to Tier 2 increases Tier 2 adoption by 35% to 50% compared to loading an unselected blank state or defaulting to Tier 1.

---

### Value Framing: Dollar Savings vs. Percentage Off
Prospect Theory (Kahneman & Tversky) demonstrates that humans perceive losses and gains non-linearly depending on framing.

- **The Rule of 100:**
  - For total package prices **under $100**, percentage savings (e.g., *"SAVE 20%"*) often feel larger than dollar savings (*"SAVE $8"*).
  - For total package prices **over $100**, absolute dollar savings (e.g., *"SAVE $60"*) feel significantly larger than percentage savings (*"SAVE 25%"*).
- **Optimal Framing Combination:** Present both in a unified badge: **"SAVE $60 (25% OFF)"**.

---

## 2. Quantitative Pricing Rules & Margin Safety Math

### Contribution Margin Floor Formula
Volume discounting must never sacrifice net gross profit dollars for top-line revenue volume.

The Net Contribution Profit ($CP$) for quantity $Q$ at discount rate $d$ is:

$$CP(Q) = Q \cdot P_{\text{retail}} \cdot (1 - d) - Q \cdot C_{\text{cogs}} - S_{\text{base}} - (Q - 1) \cdot F_{\text{pick}}$$

Where:
- $P_{\text{retail}}$ = Full retail price per unit
- $d$ = Decimal discount rate (e.g., 0.15 for 15% off)
- $C_{\text{cogs}}$ = Unit cost of goods sold
- $S_{\text{base}}$ = Base order fulfillment and outbound shipping cost
- $F_{\text{pick}}$ = Incremental pick/pack fulfillment fee per additional unit

#### Margin Safety Inequality Constraint
For any volume tier $Q_k$ where $Q_k > Q_1$:

$$CP(Q_k) > CP(Q_1)$$

If $CP(Q_k) \le CP(Q_1)$, the tier pricing is mathematically defective, as selling more units yields fewer or equal net profit dollars than selling 1 unit.

---

## 3. Accessible UI & ARIA Design Patterns

Multi-tier quantity selectors must be fully accessible to screen readers and keyboard-only users.

### ARIA Radio Group Pattern
Quantity break tier cards should be implemented semantically as a radio group (`role="radiogroup"`).

```html
<div role="radiogroup" aria-labelledby="quantity-break-label">
  <span id="quantity-break-label" class="sr-only">Select Quantity Tier</span>

  <!-- Tier 1 -->
  <div
    role="radio"
    aria-checked="false"
    tabindex="-1"
    aria-labelledby="tier-1-title tier-1-price"
    class="quantity-tier-card"
  >
    <span id="tier-1-title">1 Pack</span>
    <span id="tier-1-price">$38.00 each</span>
  </div>

  <!-- Tier 2 (Selected Default) -->
  <div
    role="radio"
    aria-checked="true"
    tabindex="0"
    aria-labelledby="tier-2-title tier-2-badge tier-2-price"
    class="quantity-tier-card selected"
  >
    <span id="tier-2-badge" class="badge">Most Popular</span>
    <span id="tier-2-title">3 Pack</span>
    <span id="tier-2-price">$32.30 each - Save 15%</span>
  </div>
</div>
```

### Keyboard Navigation Standards
- **Tab Key:** Focuses the currently selected radio card inside the group.
- **Arrow Keys (Up/Down/Left/Right):** Cycles focus and active selection between adjacent tier cards.
- **Spacebar:** Selects the currently focused tier card.
- **Screen Reader Announcements:** When focus changes, screen readers must announce the tier name, badge status, effective per-unit price, and total savings.
