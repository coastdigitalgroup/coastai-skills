# Localization Readiness Audit Checklist

Use this checklist to audit a website's readiness for international expansion and to identify conversion friction points for existing international traffic.

## 1. Technical & Foundation
- [ ] **Hreflang Tags:** Are `rel="alternate" hreflang="x"` tags correctly implemented in the `<head>` to prevent SEO cannibalization?
- [ ] **URL Structure:** Is the regional structure clear? (e.g., `example.com/de/`, `de.example.com`, or `example.de`).
- [ ] **Locale Detection:** Does the site automatically detect the user's language/region based on browser headers or IP?
- [ ] **Switcher Accessibility:** Is the language/region switcher easy to find (usually top-right or footer) and present on every page?
- [ ] **CDN Performance:** Are assets served from local edge servers to ensure fast LCP for international users?

## 2. Functional Localization (The Utility Fixes)
- [ ] **Currency Display:** Are prices shown in the local currency?
- [ ] **Currency Format:** Is the formatting correct for the locale? (e.g., `$1,234.56` in US vs. `1.234,56 €` in Germany).
- [ ] **Local Payments:** Are the top 3 preferred regional payment methods offered in the checkout?
- [ ] **Address Fields:** Do forms adapt to local address formats (removing "State" requirements for non-US/Canada)?
- [ ] **Date/Time Formats:** Are dates shown in the local format (DD/MM/YYYY vs. MM/DD/YYYY)?

## 3. Linguistic Quality (Translation & Transcreation)
- [ ] **Full Funnel Coverage:** Are error messages, tooltips, and confirmation emails also translated?
- [ ] **Transcreated Headers:** Do headlines use local idioms and address regional pain points rather than literal translations?
- [ ] **Brand Voice Consistency:** Does the tone of voice remain consistent across different languages?
- [ ] **Glossary Usage:** Is there a defined glossary to ensure technical terms are translated consistently?

## 4. Cultural & Trust Signals
- [ ] **Localized Social Proof:** Are customer logos and testimonials relevant to the specific region?
- [ ] **Imagery Relevance:** Do lifestyle photos and models reflect the cultural diversity of the target market?
- [ ] **Regulatory Trust:** Are region-specific trust signals present (e.g., GDPR/CCPA compliance, local security certifications)?
- [ ] **Contact Options:** Are local support hours or regional phone numbers provided?

## 5. Checkout & Conversion
- [ ] **Sticker Shock Prevention:** Are taxes (VAT/GST) and shipping costs calculated and shown early in the flow?
- [ ] **Home Currency Lock:** Does the final "Pay" step happen in the local currency to avoid bank exchange fees?
- [ ] **Localized CTA:** Are buttons translated using action-oriented verbs that make sense in the local culture?

---

### Audit Scoring
*   **0-10 Points:** US/Home Market Only. High friction for all international users.
*   **11-20 Points:** Basic Translation. Users can browse but will struggle to buy.
*   **21-25 Points:** Fully Localized. The site feels "native" to the user's region.
