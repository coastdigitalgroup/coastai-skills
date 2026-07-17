---
name: stockout-recovery-optimization
description:
  Audit and optimize product-out-of-stock flows and back-in-stock alerts to
  minimize abandonment rates, capture high-intent subscribers, and recover
  revenue through alternative product matching and frictionless notification channels.
---

# Stockout Recovery Optimization

## Purpose

The Stockout Recovery Optimization skill provides a systematic framework for transforming out-of-stock product pages and listings from conversion "dead ends" into active retention and revenue hubs. When high-demand inventory sells out, most websites present a passive "Sold Out" badge and disable action buttons, resulting in immediate user abandonment and high bounce rates. By implementing frictionless back-in-stock notifications, personalized alternative product routing, and transparent restock expectations, this skill recovers lost sales, captures high-intent customer contact information, and minimizes customer frustration.

## Use Cases

- **E-commerce Product Pages (PDPs):** Where specific sizes, colors, or core items are temporarily unavailable but slated for restock.
- **Product Listing Pages (PLPs) and Category Walls:** Managing user expectations and discovery pathways when navigating grids containing out-of-stock items.
- **High-Demand Product Launches / Drops:** Managing sudden inventory exhaustion while preserving purchase intent and building a pre-interest list for the next launch.
- **Subscription / Reorder Services:** Offering fallback options to recurring customers whose regular products are temporarily unavailable.

## When NOT to Use

- **Permanently Discontinued Items:** Do not use back-in-stock alerts if the product will never return; instead, implement 301 redirects to the newest model or closest category page, accompanied by discontinued announcements.
- **Highly Custom / Bespoke Goods:** Where items are one-of-a-kind (e.g., original art, customized jewelry) and cannot be replicated or restocked.
- **B2B Complex Services:** This skill is focused on physical product inventory or standardized digital goods. For custom consulting or software, use standard lead forms and contact-routing optimizations.
- **Fast-Moving Trend Items with Low Restock Chance:** If an item is a seasonal clearances clearance or fast-fashion run that will not be remade, do not build a notify list; guide them immediately to new arrivals.

## Inputs

1. **Inventory Status Data:** Restock schedule (timeline, likelihood, and batch sizes) and historical stockout frequency.
2. **Current Page Performance:** Bounce rates on out-of-stock Product Detail Pages (PDPs), click-through rates on alternative products, and abandonment rates when selection reveals a sold-out variant (e.g., size out of stock).
3. **Notification Setup:** Existing notification mechanisms (e.g., Email, SMS, Web Push) and their respective baseline opt-in and conversion rates.
4. **Product Graph / Catalog Data:** Availability of similar/alternative items, including matching attributes (color, price range, functionality, brand).

## Outputs

1. **Stockout Experience Audit:** Diagnostic assessment highlighting where friction occurs on out-of-stock PDPs and PLPs.
2. **Frictionless Back-in-Stock Interface Spec:** UI/UX specification for variant-level and product-level alert triggers, including fields, CTA messaging, and confirmation states.
3. **Restock Timeline Copy Guidelines:** Guidance on what and when to communicate regarding restock schedules.
4. **Alternative Recommendation Logic:** Setup guidelines for displaying "Similar Items In Stock" that prevent browser abandonment.
5. **Post-Opt-In Engagement Flow:** Trigger and confirmation communication maps to maintain buyer excitement during the wait.

## Workflow

### 1. Identify Stockout Touchpoints & Segment Availability

Map out how a user learns a product or specific variant is out of stock.
- **Multi-Variant Check:** Ensure that when a user selects a sold-out variant (e.g., Shoe Size 10), the primary "Add to Cart" button dynamically transforms into a primary "Notify Me When Available" button, rather than just displaying a grayed-out button or general sold-out text.
- **PLP Treatment:** Do not hide out-of-stock items completely unless they won't be restocked for months. Instead, keep them visible at the bottom of the collection grid with a clear, subtle "Restocking Soon - Sign Up for Alerts" badge.

### 2. Design the Frictionless Notification Interface

Maximize subscription rates by reducing interaction costs.
- **The One-Click Opt-In:** For logged-in users, provide a single-click button "Notify Me" that uses their account email/phone number instantly, without showing a form or input fields.
- **Inline Single-Input Form:** For guest users, show a single-field input (Email or SMS) right on the PDP in place of the quantity selector/Add to Cart button. Never open a heavy multi-step modal or ask for non-essential information (like name or billing zip code) just to register an alert.
- **Dynamic Channels:** Offer a choice between Email and SMS. SMS often drives a 3-4x higher click-through rate upon restock due to immediacy.

### 3. Communicate Timelines and Build "Product Anticipation"

Turn uncertainty into anticipation.
- **Restock Certainty Badges:** If the restock date is known, state it clearly (e.g., "Arriving October 15th" or "Next Batch Ships in 2 Weeks"). If unknown, use expectation messaging: "Expected restock within 3-4 weeks."
- **Exclusivity Copy:** Reframe the wait as an opportunity: "Join the priority list to get early access before we sell out again."

### 4. Implement Smart "In-Stock Alternatives"

Do not let the page end at the stockout barrier.
- **Dynamic Substitution Grid:** Position a "Similar Items In Stock" carousel immediately below the notification form. Optimize recommendations based on:
  - Same size (if size-specific stockout occurred).
  - Same price point (within +/- 15%).
  - Same primary category or visual style.
- **Direct "Add to Cart" on Alternatives:** Ensure the recommended alternatives have quick-add buttons to bypass additional page-loads.

### 5. Close the Loop (The Recovery Flow)

Ensure high-intent buyers convert the moment inventory touches the warehouse.
- **Transactional Priority:** Treat back-in-stock notifications as high-priority transactional alerts, bypassing general marketing queue delays. Send the alert within 15 minutes of stock availability.
- **Scarcity Reinforcement:** In the notification email/SMS, remind the user of high demand: "We've restocked, but quantities are limited. Complete your order now to secure your item." Use direct deep-linking that auto-adds the restocked item to their cart upon clicking.

## Decision Rules

- **The Variant Priority Rule:** If a product has multiple variants (e.g., sizes), the out-of-stock alert form must appear inline and match the specific variant selected. A generic "notify me" form that asks the user to manually type their size reduces opt-in rates by over 40%.
- **Notification Visibility Rule:** The "Notify Me" CTA must occupy the exact visual real estate as the primary "Add to Cart" button. Do not relegate it to a small text link below the fold.
- **SMS vs. Email Priority:** If SMS is enabled, make it the default or equal-weight option. For time-sensitive, limited-drop products, SMS is the primary channel due to open-speed heuristics.
- **The "High-Intent First" Rule:** Never gate the restock alert behind a marketing newsletter signup checkbox. Keep the transactional alert consent completely independent to maximize conversion and legal compliance.

## Constraints

- **ERP & Inventory Lag:** Recovery emails must coordinate with live inventory counts. If restock quantity is less than 10 units, do not trigger alerts to the entire list at once; use tiered matching based on opt-in timestamp to avoid "double-out-of-stock" frustration.
- **Compliance Rules (TCPA & GDPR):** SMS alert sign-ups must explicitly conform to TCPA guidelines (double-opt-in, clear terms, independent of purchase). Email alerts must comply with GDPR guidelines (clear consent for this transactional alert, with no pre-checked marketing subscription boxes).

## Non-Goals

- Managing physical warehouse logistics, supplier lead times, or restocking operations.
- Designing full-scale, multi-tier email marketing newsletters.
- Implementing real-time warehouse ERP database integrations.

## Common Failure Patterns

- **The "Dead End" PDP:** Displaying a disabled "Sold Out" button with no way to subscribe, forcing the user to leave the site to buy from a competitor.
- **Variant Amnesia:** Forcing the user to select their size *again* inside the alert popup, even though they already selected it on the PDP variant picker.
- **False Promises (Ghost Restocks):** Triggering an automatic "Back in stock!" email for a single returned item, which is bought by the first clicker, leaving the remaining 99 subscribers to land on an out-of-stock page again.
- **Data Greed:** Demanding a user's full name, phone number, and physical address just to send them an email alert when a shirt is restocked.

## Validation Criteria

- **Notification Opt-in Rate (OIR):** (Users who submit a restock alert / Total unique visitors to out-of-stock PDPs) * 100. Target: >12% for core items.
- **Recovered Revenue Rate (RRR):** (Revenue generated from restock notification link clicks / Total valuation of out-of-stock notifications sent) * 100. Target: >15% conversion within 48 hours of alert.
- **Bounce Rate Reduction on Out-of-Stock PDPs:** Comparative analysis of bounce rates on out-of-stock PDPs before and after implementing smart recommendations and alerts. Target: >20% reduction.
- **Alternative Purchase Rate:** Percentage of users who land on an out-of-stock PDP but purchase a recommended alternative during the same session. Target: >5%.
