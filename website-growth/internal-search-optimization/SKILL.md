---
name: internal-search-optimization
description:
  Audit and optimize site search to improve product/content findability, reduce
  zero-results scenarios, and increase conversion rates for high-intent users.
  Trigger this skill when search exit rates are high or when users struggle to
  locate items that are known to be in the catalog.
---

# Internal Search Optimization

## Purpose

The Internal Search Optimization skill provides a systematic framework for
improving the site search experience. Internal searchers often convert at 2-3x
the rate of non-searchers because they represent the highest-intent segment of
your audience. This skill focuses on reducing "Search Friction" by improving
search bar visibility, result relevancy, and discovery-driven recovery for "no
results" queries. By aligning search results with user intent, this skill
directly improves Search Conversion Rate and reduces Search Exit Rate.

## Use Cases

- E-commerce sites where users rely on search to find specific SKUs or
  categories.
- Content-heavy sites (blogs, documentation, resource hubs) where navigation is
  complex.
- Sites with high "Search Exit Rates" (users leaving immediately after seeing
  search results).
- Large product catalogs where filtering alone is insufficient for discovery.
- Situations where search analytics show a high volume of "Zero Results"
  queries.

## When NOT to Use

- **Very Small Sites:** If a site has fewer than 20-30 pages or products, a
  robust search system may be overkill compared to better navigation.
- **Single-Purpose Landing Pages:** Pages designed for a single conversion goal
  where search would be a distraction from the primary CTA.
- **Non-Searchable Apps:** Utility tools or dashboards where data is purely
  relational and accessed via dedicated UI views rather than keyword search.

## Inputs

1. **Search Analytics:** Data on top search terms, terms with no results, and
   click-through rates (CTR) on results.
2. **Search UI Context:** Current placement, design, and mobile behavior of the
   search input.
3. **Product/Content Metadata:** The quality of titles, descriptions, and tags
   used by the search engine.
4. **Current Search Engine Capabilities:** Knowledge of whether the system
   supports "fuzzy matching," synonyms, or federated results.

## Outputs

1. **Search Experience Audit:** Identification of UX friction (e.g., hidden
   search bar) and relevancy gaps.
2. **Relevancy & Synonym Map:** A list of common user terms to map to official
   product/content names.
3. **Zero-Results Recovery Strategy:** Design recommendations for transforming
   dead-ends into discovery moments.
4. **UI/UX Optimization Specs:** Improved designs for auto-suggest, mobile
   search drawers, and results page layout.

## Workflow

### 1. Audit Search Visibility & UX

Evaluate how easily a high-intent user can start their journey.

- **The "High-Contrast" Bar:** Is the search bar immediately visible on both
  desktop and mobile, or is it hidden behind a magnifying glass icon?
- **Mobile Thumb-Zone:** On mobile, does tapping search open a dedicated
  full-screen interface with a focused keyboard?
- **Placeholder Text:** Does the placeholder guide the user? (e.g., "Search for
  'running shoes'..." vs. "Search").

### 2. Analyze Relevancy & Metadata

Ensure the "Search-to-Result" match is accurate.

- **Query-to-Product Mapping:** Check top search terms. Do they return the most
  relevant items first?
- **Synonym Tuning:** Identify common alternative terms (e.g., "sofa" vs.
  "couch") and ensure the search engine treats them as identical.
- **Handling Typos:** Test common misspellings. Does the system provide "Did you
  mean...?" or use fuzzy matching?

### 3. Optimize the Auto-Suggest Experience

Reduce the interaction cost of typing.

- **Visual Auto-Suggest:** Provide instant results (images, prices, categories)
  as the user types.
- **Recent & Popular Searches:** Show the user's previous searches or trending
  terms to speed up the entry.
- **Category Scoping:** Allow users to search within a specific category (e.g.,
  "Search in Electronics").

### 4. Implement Zero-Results Recovery

Eliminate dead-ends in the user journey.

- **The "Smart Fallback":** If zero results are found, never show a blank page.
  Display:
  - Popular categories or best-sellers.
  - "Did you mean...?" suggestions.
  - Contact options for help.
- **Search Term Normalization:** Strip unnecessary characters or plurals to try
  and find a partial match.

### 5. Review Against Decision Rules

Verify that the search strategy aligns with conversion heuristics.

## Decision Rules

- **The "Results Over Pages" Rule:** Prioritize actual product/content cards
  over "Page" results in the auto-suggest dropdown.
- **Speed is a Feature:** Search results and auto-suggestions must appear in
  under 200ms to feel "instant."
- **Persistent Input:** The search query should remain in the search box on the
  results page so users can easily refine it.
- **The 5-Result Minimum:** On a results page, aim to show at least 5 results
  above the fold on desktop by balancing image size and metadata.

## Common Failure Patterns

- **The "Invisible" Search:** Hiding the search input behind an icon on desktop,
  forcing an extra click for high-intent users.
- **The Dead-End:** A "No results found" page with no further links or
  recommendations.
- **Relevancy Drift:** Showing thousands of irrelevant results because the
  engine is using "OR" logic (any word matches) instead of "AND" logic (all
  words match).
- **Mobile Keyboard Conflict:** Not using the correct input type, causing the
  mobile keyboard to block the search results as they appear.

## Validation Methods

- **Search Conversion Rate:** Measure the percentage of users who search and
  subsequently convert. Compare this to the site-wide average.
- **Search Exit Rate:** The percentage of users who leave the site from the
  search results page. Goal: Decrease.
- **Time to First Click:** How long it takes a user to click a result after
  searching. Goal: Decrease.
- **Zero-Results Rate:** The percentage of total searches that return no
  results. Goal: Decrease via synonym mapping and typo handling.
