# Footer Structure Blueprint

Use this template to map out the zones and content for your site footer before
moving into high-fidelity design or implementation.

## 1. Top Tier (The Action Zone)
*Optional: Use for global calls-to-action.*

- **Headline:** [e.g., Stay updated with our weekly newsletter]
- **Action:** [e.g., Email Input + Subscribe Button]
- **Social:** [e.g., Twitter, LinkedIn, GitHub icons]

## 2. Middle Tier (The Navigation Zone)
*Organize links into 3-5 columns based on theme.*

### Column 1: [Product/Services]
- [Link 1 Name] -> [URL]
- [Link 2 Name] -> [URL]
- [Link 3 Name] -> [URL]
- [Link 4 Name] -> [URL]

### Column 2: [Resources/Support]
- [Link 1 Name] -> [URL]
- [Link 2 Name] -> [URL]
- [Link 3 Name] -> [URL]

### Column 3: [Company]
- [Link 1 Name] -> [URL]
- [Link 2 Name] -> [URL]
- [Link 3 Name] -> [URL]

## 3. Bottom Tier (The Utility Zone)
*Mandatory legal and technical links.*

- **Copyright:** © [Year] [Company Name]. All rights reserved.
- **Legal Links:** [Privacy Policy], [Terms of Service], [Cookie Policy]
- **Secondary Utils:** [Language Selector], [Back to Top Button]

---

## Technical Implementation Snippet (HTML/ARIA)

```html
<footer class="site-footer" role="contentinfo">
  <div class="footer-grid">
    <!-- Navigation Cluster -->
    <nav class="footer-nav" aria-label="Product Navigation">
      <h3 id="product-nav-label">Product</h3>
      <ul aria-labelledby="product-nav-label">
        <li><a href="/features">Features</a></li>
        <li><a href="/pricing">Pricing</a></li>
      </ul>
    </nav>

    <!-- Social Links -->
    <nav class="footer-social" aria-label="Social Media">
      <ul>
        <li>
          <a href="https://twitter.com/..." target="_blank" rel="noopener">
            <span class="sr-only">Twitter</span>
            <svg>...</svg>
          </a>
        </li>
      </ul>
    </nav>
  </div>

  <!-- Sub-footer -->
  <div class="footer-utility">
    <p>&copy; 2024 Company Name</p>
    <nav aria-label="Legal">
      <a href="/privacy">Privacy Policy</a>
    </nav>
  </div>
</footer>
```
