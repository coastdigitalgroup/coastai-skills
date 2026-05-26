# Reference: Common Schema.org Patterns for Rich Snippets

Implementing structured data (JSON-LD) is one of the most effective ways to increase SERP real estate and build immediate trust. Below are the most common patterns used in Search Snippet Optimization.

## 1. Product & Reviews (E-commerce)
Triggers star ratings, price, and availability. This is a critical trust signal for shoppers.

```json
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Organic Espresso Beans",
  "image": "https://example.com/photos/1x1/photo.jpg",
  "description": "Bold, dark roast coffee beans...",
  "brand": {
    "@type": "Brand",
    "name": "CoffeeRoaster"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "850"
  },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "USD",
    "price": "18.00",
    "availability": "https://schema.org/InStock"
  }
}
```

## 2. FAQ (Informational / Services)
Occupies significant vertical space and provides immediate answers to user questions.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "Do you offer free shipping?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Yes, we offer free standard shipping on all orders over $50 within the US."
    }
  }, {
    "@type": "Question",
    "name": "Are the beans roasted to order?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "All of our coffee is roasted in small batches daily and shipped within 24 hours."
    }
  }]
}
```

## 3. How-To (Guides / Tutorials)
Great for "Top of Funnel" content. Can trigger image carousels or numbered steps in the SERP.

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Brew the Perfect Espresso",
  "step": [
    {
      "@type": "HowToStep",
      "text": "Grind 18g of beans to a fine consistency."
    },
    {
      "@type": "HowToStep",
      "text": "Tamp the grounds evenly into the portafilter."
    }
  ]
}
```

## Best Practices for Rich Snippets
- **Match the Page:** Structured data must accurately reflect the content visible on the page. Adding fake reviews or prices can lead to a manual penalty.
- **JSON-LD Format:** Prefer JSON-LD over Microdata or RDFa, as it is recommended by Google and easier to maintain.
- **Required Fields:** Always check the Google Search Central documentation for the specific "Required" vs. "Recommended" fields for each type.
- **Validation:** Use the [Rich Results Test](https://search.google.com/test/rich-results) after every deployment.
