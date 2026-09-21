# Trade-In & Trade-Up Optimization Checklist & UI Template

Use this comprehensive audit checklist, scoring system, and code template to evaluate, design, and deploy high-converting trade-in workflows on product detail pages (PDPs), cart drawers, and checkout screens.

---

## Part 1: Trade-In & Trade-Up Audit Checklist

Score each item from **0 to 2**:
- `0` = Absent or severely deficient
- `1` = Partially implemented with friction
- `2` = Fully optimized and frictionless

### 1. PDP Buy Box & Net Price Framing
- [ ] **Effective Net Pricing Display:** Is effective net pricing displayed inside the primary buy box alongside full retail price (e.g., *"As low as $499 after up to $700 trade-in credit"*)? (Score: `__` / 2)
- [ ] **Proximity of Trade-In Trigger:** Is the trade-in CTA trigger button placed within 40px of the primary "Add to Cart" button? (Score: `__` / 2)
- [ ] **Financing Stack Clarity:** Does monthly installment messaging reflect trade-in deductions (e.g., *"Or $21/mo after $700 trade-in credit"*)? (Score: `__` / 2)
- [ ] **Visual Distinction:** Is the trade-in option visually styled as an interactive value-add badge or card rather than plain text? (Score: `__` / 2)

### 2. Instant Valuation Modal & Quiz UX
- [ ] **Rapid Step Count:** Is the condition appraisal quiz limited to 3 steps or fewer (Model ➔ Spec ➔ Condition)? (Score: `__` / 2)
- [ ] **Visual Condition Cards:** Are physical condition tiers (Flawless, Good, Fair) presented with high-resolution photo examples rather than abstract descriptions? (Score: `__` / 2)
- [ ] **Searchable Model Selection:** Can customers quickly find their old device model using auto-complete search or logo grids? (Score: `__` / 2)
- [ ] **Instant Quote Calculation:** Is the trade-in credit calculated instantly on-screen without requiring email submission or account creation? (Score: `__` / 2)
- [ ] **1-Click Apply CTA:** Does the modal include a single prominent button to apply the trade-in credit and add the new product to the cart? (Score: `__` / 2)

### 3. Post-Checkout Logistics & Reassurance
- [ ] **Grace Period Guarantee:** Is it explicitly stated that customers can keep their current device until the new one arrives (14-day post-delivery grace period)? (Score: `__` / 2)
- [ ] **Pre-Paid Return Kit:** Is pre-paid return packaging/label explicitly promised with no hidden return shipping fees? (Score: `__` / 2)
- [ ] **Data Security Certification:** Is certified data wiping / privacy protection explicitly highlighted near the CTA? (Score: `__` / 2)
- [ ] **Price Lock Guarantee:** Is the trade-in valuation guaranteed for 14–30 days from the order date? (Score: `__` / 2)

### 4. Cart & Checkout Line-Item Transparency
- [ ] **Explicit Line-Item Deduction:** Is the trade-in item rendered as a dedicated negative line item in the cart drawer (e.g., `Trade-In: iPhone 13 Pro (-$450.00)`)? (Score: `__` / 2)
- [ ] **Net Total Recalculation:** Is the final "Total Due Today" prominently recalculated in the cart drawer footer? (Score: `__` / 2)
- [ ] **1-Click Trade-In Edit/Remove:** Can customers easily edit or cancel their trade-in selection directly inside the cart drawer without clearing the primary product? (Score: `__` / 2)

---

## Audit Scoring & Assessment Matrix

| Total Score | Maturity Level | Diagnosis & Action Plan |
| :--- | :--- | :--- |
| **26 – 32** | **Optimal (High Conversion)** | Excellent trade-in integration. Focus on expanding eligible trade-in catalog and optimizing reverse logistics turn-around time. |
| **18 – 25** | **Moderate (High Drop-Off)** | Trade-in option exists but suffers from friction. Simplify condition forms, surface net pricing higher in the buy box, and clarify grace period terms. |
| **0 – 17** | **Deficient (Sticker Shock)** | Severe upgrade friction. Implement effective net pricing callouts, instant valuation modals, and cart drawer line items immediately. |

---

## Part 2: PDP Buy Box & Trade-In Modal Code Snippet

Embed this responsive HTML/CSS snippet directly into the PDP Buy Box to display effective net pricing and launch the instant valuation modal.

```html
<!-- PDP Buy Box Trade-In Widget -->
<div class="tradein-buybox-widget" style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin-bottom: 16px;">
  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
    <span style="font-size: 13px; font-weight: 700; color: #2563eb; text-transform: uppercase; letter-spacing: 0.5px;">Trade-In & Save</span>
    <span style="font-size: 12px; background-color: #dbeafe; color: #1e40af; padding: 2px 8px; border-radius: 12px; font-weight: 600;">Up to $450 Off</span>
  </div>

  <div style="margin-bottom: 12px;">
    <div style="font-size: 22px; font-weight: 800; color: #0f172a;">
      $449.00 <span style="font-size: 14px; color: #64748b; font-weight: 400; text-decoration: line-through;">$899.00</span>
    </div>
    <div style="font-size: 13px; color: #334155; margin-top: 2px;">
      Effective net price after trade-in credit.
    </div>
  </div>

  <button type="button" onclick="document.getElementById('tradein-modal').style.display='flex'" style="width: 100%; padding: 12px 16px; background-color: #ffffff; border: 1.5px solid #2563eb; color: #2563eb; font-size: 14px; font-weight: 700; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.2s ease;">
    <span>🔄 Estimate Trade-In Credit</span>
  </button>

  <div style="display: flex; items: center; gap: 12px; margin-top: 12px; font-size: 12px; color: #475569;">
    <div>📦 Keep old device until new arrives</div>
    <div>🔒 Certified data wipe</div>
  </div>
</div>

<!-- Instant Valuation Modal -->
<div id="tradein-modal" style="display: none; position: fixed; inset: 0; background-color: rgba(15, 23, 42, 0.6); backdrop-filter: blur(4px); z-index: 9999; align-items: center; justify-content: center; padding: 16px;">
  <div style="background-color: #ffffff; width: 100%; max-width: 480px; border-radius: 12px; padding: 24px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); font-family: -apple-system, BlinkMacSystemFont, sans-serif; position: relative;">
    <button type="button" onclick="document.getElementById('tradein-modal').style.display='none'" style="position: absolute; top: 16px; right: 16px; background: none; border: none; font-size: 20px; color: #64748b; cursor: pointer;">✕</button>

    <h3 style="font-size: 18px; font-weight: 700; color: #0f172a; margin-top: 0; margin-bottom: 4px;">Select Your Current Device</h3>
    <p style="font-size: 13px; color: #64748b; margin-bottom: 16px;">Get an instant guaranteed trade-in credit applied to your order.</p>

    <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px;">
      <label style="font-size: 13px; font-weight: 600; color: #334155;">Model
        <select style="width: 100%; margin-top: 4px; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px;">
          <option>Aura Studio Pro II ($450 Credit)</option>
          <option>Aura Studio Pro I ($250 Credit)</option>
          <option>Other Brand / Model (Up to $200 Credit)</option>
        </select>
      </label>

      <label style="font-size: 13px; font-weight: 600; color: #334155;">Physical Condition
        <select style="width: 100%; margin-top: 4px; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px;">
          <option>Flawless — Like new, pristine body & pads</option>
          <option selected>Good — Minor micro-wear, 100% functional</option>
          <option>Fair — Visible denting/wear, fully functional</option>
        </select>
      </label>
    </div>

    <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 12px; margin-bottom: 20px; text-align: center;">
      <div style="font-size: 12px; color: #166534; font-weight: 600;">Estimated Trade-In Credit</div>
      <div style="font-size: 28px; font-weight: 800; color: #15803d; margin: 2px 0;">-$450.00</div>
      <div style="font-size: 13px; color: #166534;">Your Net Total Today: <strong>$449.00</strong></div>
    </div>

    <button type="button" onclick="alert('Trade-In applied!'); document.getElementById('tradein-modal').style.display='none';" style="width: 100%; padding: 14px; background-color: #2563eb; color: #ffffff; font-size: 15px; font-weight: 700; border: none; border-radius: 6px; cursor: pointer;">
      Apply $450.00 Credit & Add to Cart
    </button>
  </div>
</div>
```
