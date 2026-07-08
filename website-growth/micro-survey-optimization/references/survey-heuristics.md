# Micro-Survey Heuristics & Best Practices

To maximize the quality of qualitative data while protecting the user experience, follow these core heuristics.

## 1. The "Rule of One"
- **One Question:** Never ask more than one question at a time in an on-site pop-up. If you need more data, use the first question to "filter" the user into a specific second question, or send them to a dedicated landing page.
- **One Goal:** Each survey should solve for a single "Insight Gap" (e.g., Clarity, Trust, or Intent).

## 2. Phrasing for Honesty
Avoid "Leading Questions" that push the user toward a specific answer.

- **Bad (Leading):** "How much did you enjoy our new checkout process?" (Assumes they enjoyed it).
- **Good (Neutral):** "How would you rate your experience with the checkout process today?"
- **Better (Specific):** "Was there anything that made it difficult to complete your purchase today?"

## 3. The Behavioral Trigger Matrix
Match the trigger to the intent of the page.

| Page Type | Goal | Recommended Trigger |
| :--- | :--- | :--- |
| **Landing Page** | Intent Validation | 15-30 seconds on page |
| **Pricing Page** | Objection Identification | Exit-intent or 60% scroll |
| **Checkout** | Friction Identification | 60-90 seconds (Inactivity) |
| **Success Page** | Driver Identification | Immediate (Post-conversion) |
| **Blog/Article** | Content Quality | 75% scroll depth |

## 4. Qualitative to Quantitative Translation
The goal of a micro-survey is not just to collect quotes, but to identify patterns.

- **Coding Responses:** Use a "Coding Frame" to categorize open-ended responses.
- **Sentiment Analysis:** (Optional) Use automated tools to gauge if responses are positive, negative, or neutral.
- **Gap Analysis:** Compare what users *say* (survey) with what they *do* (analytics). If users say they like the price but aren't buying, the issue may be "Trust" or "Value Proposition," not "Price."

## 5. Mobile UX Constraints
On-site surveys are significantly more intrusive on mobile devices.

- **Screen Real Estate:** Ensure the survey covers no more than 30-40% of the screen.
- **Tap Targets:** Ensure buttons and close icons are at least 44x44px.
- **Avoid Overlays:** Use "Slide-in" modals that sit at the bottom of the screen rather than centering over the content.
