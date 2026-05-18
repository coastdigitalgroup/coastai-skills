# Internal Search Heuristics & Patterns

A reference for common UX and technical patterns that drive search-based growth.

## UX Heuristics for Search

### 1. The "Focused Mobile Search" Pattern

On mobile devices, a search icon or small bar should never just expand. It
should trigger a full-screen overlay.

- **Why:** This removes all distractions and provides maximum space for
  auto-suggestions.
- **Action:** Shift the header content up and present a clear list of "Trending"
  or "Recent" searches immediately.

### 2. Federated Search Results

Don't just show products. Group results by intent.

- **Transactional Intent:** Specific Products (with Add-to-Cart buttons).
- **Navigational Intent:** Categories or Brand Pages.
- **Informational Intent:** Help Articles, Guides, or Blog Posts.

### 3. The "Query Persistence" Rule

Users often need to refine their search. If they search for "red Nike shoes" and
get 0 results, keeping "red Nike shoes" in the search box allows them to easily
delete "red" to broaden the search.

### 4. Visual Scent (Auto-suggest Thumbnails)

Including a small 40x40px thumbnail in the auto-suggest dropdown increases the
"Scent of Information." It allows users to verify they are on the right track
before they even click "Enter."

---

## Technical Optimization Patterns

### Synonym Mapping (The "Thesaurus" Pattern)

Create a mapping for common industry terms that users might use interchangeably:

- `Activewear` -> `Gym clothes`, `Workout gear`, `Yoga pants`
- `Sofa` -> `Couch`, `Settee`, `Loveseat`
- `Contact` -> `Support`, `Help`, `Email us`

### Typo Tolerance (Levenshtein Distance)

Implement a search engine that calculates the "distance" between strings.

- **Level 1:** One character difference (e.g., `iphone` vs `iphne`).
- **Level 2:** Two characters difference (e.g., `iphone` vs `ipone`).
- _Note:_ Be careful with short words (e.g., `cat` vs `bat`), where typo
  tolerance can cause irrelevant results.

### Query Normalization

Before sending a query to the database, the system should:

1. **Lowercase everything.**
2. **Strip punctuation** (e.g., `Men's` -> `Mens`).
3. **Handle Plurals** (e.g., `Shoes` -> `Shoe`).
4. **Remove Stop Words** (e.g., `the`, `a`, `for` - though keep them if they
   are part of a specific brand name).

---

## "Zero Results" Recovery UI Checklist

If the system returns 0 results, the page must include:

1. **The Query:** "No results for 'XYZ'."
2. **A Typo Check:** "Did you mean 'ABC'?"
3. **Broadening Advice:** "Try using fewer keywords or more general terms."
4. **Discovery Content:** A "Best Sellers" or "Recommended for You" grid.
5. **Search Support:** A prominent "Chat with us" or "Call Support" link.
