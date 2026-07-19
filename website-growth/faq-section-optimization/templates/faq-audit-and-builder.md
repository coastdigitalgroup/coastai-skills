# FAQ Section Audit & Copywriter Builder Template

This toolkit provides actionable templates to audit your existing landing/pricing page FAQs, rewrite them using the "Objective-Driven" model, and export search-engine-ready structured schema.

---

## Part 1: FAQ Section Friction & Content Audit

Use this scoring checklist to evaluate whether your current FAQ section is actively driving conversions or acting as a passive dead-end.

### 1. Strategic Relevance & Objection Alignment
- [ ] **Data-Backed Questions:** Are all questions derived from real customer support queries, sales feedback, or exit surveys? (No guesswork).
- [ ] **No Vanity Questions:** Has every self-congratulatory, marketing-led question (e.g., *"Why are we the best option?"*) been eliminated?
- [ ] **Objection Mapping:** Does each FAQ target a specific, documented user anxiety or purchase barrier (e.g., Price, Security, Setup, Support)?

### 2. Copywriting & Directness
- [ ] **The 7-Word Rule:** Does the absolute, direct answer (e.g., *"Yes, you can..."* or *"Absolutely. All servers are..."*) appear within the first 7 words of the text?
- [ ] **Jargon-Free Specificity:** Are all vague assurances (e.g., *"highly secure," "super fast"*) replaced with concrete details and numbers?
- [ ] **The Paragraph Limit:** Are all answers kept under 60-80 words? (Longer explanations must link to dedicated support pages).

### 3. Funnel Flow & Interactivity (UX)
- [ ] **Contextual Routing CTAs:** Does every FAQ answer contain an active text link or micro-CTA to keep the user moving forward in the funnel?
- [ ] **Accordion Pattern:** Are questions contained in clean, collapsible accordion panels to prevent scroll fatigue?
- [ ] **Visual Proximity:** Is the FAQ block placed immediately above or wrapped adjacent to the final "safety net" CTA on the page?
- [ ] **Mobile Tap Targets:** Are the accordion triggers at least 48px high on mobile viewports, with chevrons/icons pushed to the far right?

---

## Part 2: "Objective-Driven" FAQ Copy Builder

Use this structural blueprint to rewrite your FAQs. Complete one table for each of your 4–8 selected questions.

| Structural Component | Copywriting Instructions | Your Drafted Content |
| :--- | :--- | :--- |
| **Stage & Theme** | Define the funnel stage (Pricing, Checkout, PDP) and theme (Billing, Integration, Security). | *e.g., Pricing Page - Integration* |
| **Identified Objection** | State the exact customer worry or barrier you are addressing. | *e.g., Fear that syncing with existing Slack channels will spam the team.* |
| **Customer-Led Question** | Write the question in the first-person, using the exact phrasing a customer would use. | *e.g., "Will connecting the Slack integration send alerts to all our channels?"* |
| **The 7-Word Answer** | Write a direct, clear response. **The answer (Yes/No/Absolutely) must fit in the first 7 words.** | *e.g., "No. Alerts are fully customizable by channel."* |
| **Specific Supporting Details** | Add 1-2 sentences of specific proof, technical specifications, or logistical details (Max 50 words). | *e.g., "You can select which specific channels receive notifications, choose to digest alerts daily, or mute notifications during non-working hours."* |
| **Contextual Action CTA** | Provide a high-intent link or button leading to a guide, document, or relevant platform page. | *e.g., "[Read our Slack Integration Guide & Setup FAQ →](/docs/slack-setup)"* |

---

## Part 3: FAQPage JSON-LD Schema Boilerplate

To trigger Google's rich snippets, populate this boilerplate with your final FAQ copy and inject it into the `<head>` of your HTML document.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "INSERT_QUESTION_1_HERE",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "INSERT_ANSWER_1_HERE <a href='https://yourdomain.com/target-link-1'>Read our full guide</a>."
      }
    },
    {
      "@type": "Question",
      "name": "INSERT_QUESTION_2_HERE",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "INSERT_ANSWER_2_HERE <a href='https://yourdomain.com/target-link-2'>Use our calculator</a>."
      }
    },
    {
      "@type": "Question",
      "name": "INSERT_QUESTION_3_HERE",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "INSERT_ANSWER_3_HERE <a href='https://yourdomain.com/target-link-3'>See our security specs</a>."
      }
    }
  ]
}
</script>
```

### Schema Rules to Avoid Google Penalties:
1.  **Exact Matching:** The text in the JSON-LD schema *must* match the visual text displayed on the webpage exactly. If they differ, Google may flag the page for deceptive practices.
2.  **HTML Links Allowed:** You can include HTML anchor tags (`<a href="...">`) inside the `"text"` field of the accepted answer to preserve your contextual routing CTAs in search results. Use single quotes (`'`) for HTML attributes to avoid breaking the JSON formatting.
3.  **No Promotional Links:** Do not use anchor tags with promotional or keyword-stuffed anchor text (e.g., "buy cheap shoes"). Keep the link anchors natural and functional (e.g., "view refund policy").
