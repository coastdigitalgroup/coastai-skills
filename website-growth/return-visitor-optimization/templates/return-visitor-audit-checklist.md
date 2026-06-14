# Return Visitor Optimization: Audit & Implementation Checklist

Use this checklist to identify "leaks" in your multi-session conversion funnel
and prioritize features that recognize and reward returning users.

## 1. The Persistence Audit (Functional Baseline)

Persistence is the foundation of return visitor trust. If the site "forgets"
the user, they have to work harder to convert.

- [ ] **Cart Persistence:** Does the cart save for at least 30 days for
  non-logged-in users?
- [ ] **Form State Recovery:** If a user starts a multi-step form and returns,
  is their previous progress saved (via LocalStorage or session)?
- [ ] **Search Memory:** Does the search bar show "Recent Searches" to
  save the user from re-typing?
- [ ] **Login Recognition:** Does the site offer a "Log In" shortcut for
  returning users instead of only "Sign Up"?

## 2. The Recognition Audit (Messaging & UI)

Once the site remembers the user, it should acknowledge them to build
momentum.

- [ ] **Hero Personalization:** Is the headline different for someone who
  has visited 3+ times vs. a first-timer?
- [ ] **"Recently Viewed" Section:** Is there a dedicated row on the
  homepage or category pages for items they previously looked at?
- [ ] **Progressive Disclosure:** Are you still showing the "Intro Video"
  to someone who has already seen it?
- [ ] **Interest-Based Nav:** Are the navigation items or featured
  categories re-ordered based on the user's previous clicks?

## 3. The Momentum Audit (Next Steps)

Ensure the return experience pushes the user to the *next* logical step
in the funnel.

- [ ] **CTA Evolution:** Does the CTA move from "Learn More" (Awareness)
  to "Start Trial" (Evaluation) for repeat visitors?
- [ ] **Pricing Reinforcement:** If a user has viewed the pricing page,
  is there a "Price Guarantee" or "FAQ" specifically for them on the homepage?
- [ ] **Abandonment Recovery (On-Site):** Is there a subtle "Welcome Back"
  top-bar offering a small incentive to finish an abandoned cart?

## 4. Implementation Priority Matrix

| Feature | Effort | Impact | Priority |
| :--- | :---: | :---: | :---: |
| Persistent Cart | Low | High | P0 |
| "Recently Viewed" Row | Med | High | P1 |
| Hero Headline Personalization| Med | Med | P2 |
| Recent Search History | Low | Med | P2 |
| "Resume" Pop-over (Contextual)| High| High | P1 |

## 5. Technical Requirements Check

- [ ] **Privacy Consent:** Does our tracking logic respect the user's
  cookie/privacy choices?
- [ ] **Cache Bypassing:** Have we ensured that personalized banners
  aren't being served to the wrong users via CDN caching?
- [ ] **Mobile Parity:** Does all of the above work on mobile, where
  the "Fat Finger" rule and session fragmentation are most prevalent?
