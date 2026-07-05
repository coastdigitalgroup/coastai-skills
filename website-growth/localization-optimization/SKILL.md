---
name: localization-optimization
description:
  Audit and optimize the website experience for international audiences by
  adapting language, currency, payment methods, and cultural context. Trigger
  this skill when international traffic has significantly lower conversion rates
  than the home market or when expanding into new regional territories.
---

# Localization Optimization

## Purpose

The Localization Optimization skill provides a systematic framework for closing the "International Conversion Gap." Many websites treat international traffic as a secondary audience, leading to friction caused by language barriers, unfamiliar currency formats, missing local payment methods, and cultural disconnects. This skill focuses on moving beyond simple translation to "Transcreation" and functional localization, ensuring that users in any region feel the product is designed specifically for them.

## Use Cases

- **Global SaaS Expansion:** Improving conversion rates for users in non-English speaking markets.
- **Cross-Border E-commerce:** Reducing cart abandonment by offering local currencies and preferred regional payment providers (e.g., iDEAL in the Netherlands, Pix in Brazil).
- **Regional Lead Generation:** Adapting forms and messaging to match local business customs and regulatory requirements (e.g., GDPR in the EU).
- **Multi-Regional Content Hubs:** Ensuring that international users are automatically routed to the most relevant regional content.

## When NOT to Use

- **Single-Market Businesses:** If your operations, shipping, or service delivery are strictly limited to one country.
- **Brand Awareness Stages (Top-of-Funnel):** While awareness matters, this skill is focused on conversion. If the goal is just "being seen" globally, focus on general SEO first.
- **Early Alpha/Beta:** When the product-market fit is still being established in the core market, premature localization can add unnecessary technical debt.

## Inputs

1. **Traffic & Conversion Data by Locale:** Analytics showing sessions, bounce rate, and CVR broken down by country and browser language.
2. **Target Market Profiles:** Cultural nuances, preferred payment methods, and dominant languages for the expansion region.
3. **Current Localization State:** Audit of existing translations (if any), currency detection capabilities, and regional URL structure (subfolders, subdomains, or ccTLDs).
4. **Legal & Compliance Requirements:** Regional data privacy laws, tax display requirements (e.g., VAT inclusion), and consumer protection rules.

## Outputs

1. **Localization Friction Audit:** Identification of "broken" international experiences (e.g., untranslated error messages, US-only zip code fields).
2. **Regional Payment & Currency Roadmap:** Recommendations for integrating top-tier local payment methods and auto-currency detection.
3. **Transcreation Guide:** Strategic adjustments to messaging, imagery, and social proof to fit local cultural values.
4. **Technical Localization Spec:** Requirements for hreflang tags, CDN routing, and locale-detection logic.

## Workflow

### 1. Identify the "International Leak"

Analyze the conversion delta between your "Home" market and international markets.
- Calculate the **Localization Gap**: `(Home Market CVR - International Market CVR)`.
- Prioritize regions where traffic is high but the gap is widest.

### 2. Functional Localization (The "Utility" Fix)

Remove the technical barriers that prevent a transaction from even starting.
- **Currency Parity:** Implement auto-detection based on IP to show prices in the user's local currency.
- **Payment Localization:** Integrate the "Big 3" local payment methods for the target region (e.g., Alipay for China, Klarna for DACH region).
- **Form Adaptation:** Remove US-specific requirements like "State" or "Zip Code" for regions that don't use them.

### 3. Linguistic Optimization (Translation vs. Transcreation)

Audit the quality of the language.
- **Move Beyond Machine Translation:** Audit key conversion pages (Hero, Pricing, Checkout) for "awkward" or literal translations that erode trust.
- **Transcreation:** Re-write headlines to use local idioms or address regional pain points that may differ from the core market.
- **Consistency:** Ensure that error messages, buttons, and help text are all translated; a single English popup on a Japanese site breaks the "Trust Bubble."

### 4. Cultural & Visual Alignment

Adjust the "Look and Feel" to match regional expectations.
- **Social Proof Relevance:** Replace US customer logos/testimonials with regional ones for users in that specific market.
- **Imagery Audit:** Ensure models and lifestyle shots reflect the diversity and cultural norms of the target region.
- **Hierarchy of Values:** Some cultures value "Innovation" (US), while others value "Stability" (Germany) or "Community" (Japan). Adjust the messaging hierarchy accordingly.

### 5. Review Against Decision Rules

Verify that the localized experience is seamless, trustworthy, and performant.

## Decision Rules

- **The Trust Bubble Rule:** Once a user enters a localized path, they must never see "Home" market content (untranslated strings, US-only links) until they exit the funnel.
- **Default to Locale:** If you can detect a user's location, default to their currency and language immediately (with an easy-to-find switcher for corrections).
- **Transcreation Over Translation:** Headlines and CTAs must be adapted for impact, not just translated for accuracy.
- **Localized Social Proof:** One testimonial from a local customer in the user's language is more valuable than ten high-profile testimonials from a foreign market.
- **Price Transparency:** Always show prices in the format the user expects (e.g., including VAT in the UK/EU, excluding it in the US).

## Constraints

- **Data Privacy:** Localization must comply with regional data laws (GDPR, LGPD, CCPA) which may require changes to cookie banners and data storage.
- **Technical Latency:** Dynamic locale detection and high-res localized assets must not significantly increase Page Load Time (LCP).
- **Regulatory Truth:** Pricing and shipping claims must be legally accurate for each specific region.

## Non-Goals

- Providing the actual translation services or managing a fleet of translators.
- Building the technical internationalization (i18n) framework in the codebase.
- Managing international logistics, shipping carriers, or customs duties.

## Common Failure Patterns

- **The "Google Translate" Fail:** Relying entirely on low-quality machine translation for high-intent pages, which signals a lack of investment in the market.
- **Currency Confusion:** Showing a price in a foreign currency but forcing the checkout in the home currency, leading to "Sticker Shock" from exchange fees.
- **The US-Centric Form:** Requiring a "State" and "Zip Code" for every user, causing frustration for users in countries with different address formats.
- **Hidden Switchers:** Placing the language/region switcher at the very bottom of a long page where it can't be found.
- **Mixed-Language Experience:** Having a translated landing page that links to an untranslated (English) app or checkout.

## Validation Criteria

- [ ] **CVR Lift by Locale:** Measure the conversion rate increase within specific target countries after localization.
- [ ] **Bounce Rate by Region:** Track the reduction in bounce rates for international visitors on localized landing pages.
- [ ] **Payment Method Adoption:** Monitor the percentage of users choosing the new local payment methods.
- [ ] **Customer Support volume:** A decrease in "Do you ship to...?" or "How much is this in [Currency]?" tickets.
