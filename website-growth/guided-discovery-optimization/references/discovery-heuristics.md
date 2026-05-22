# Guided Discovery Heuristics

Psychological and UX principles to guide the design of high-converting
recommendation engines.

## 1. The Paradox of Choice
*Heuristic: Limit options to increase action.*
When faced with too many choices, users experience "Analysis Paralysis" and
often choose nothing.
- **Application:** Never show more than 3 recommended products at the end of a
  quiz. Highlight ONE as the "Best Match."

## 2. The Labor Illusion (The "Calculating..." Effect)
*Heuristic: People value results more when they see the "effort" involved.*
If results appear instantly, users may trust them less than if they see a brief
animation "analyzing" their data.
- **Application:** Use a 2-3 second "Analyzing your profile..." loading state
  with a progress bar before revealing the results.

## 3. The Endowment Effect
*Heuristic: People value things more once they feel a sense of ownership.*
By answering questions about themselves, the user is "investing" in the
outcome.
- **Application:** Use "Your" and "For You" in the results (e.g., "Your Custom
  Routine," "The Best Fit For Your Home").

## 4. The Barnum Effect
*Heuristic: People believe generic personality descriptions apply specifically
to them if they believe they were tailored.*
- **Application:** Reiterate the user's own answers on the results page to
  validate the recommendation. "Because you are a [Goal] who struggles with
  [Problem]..."

## 5. Cognitive Ease
*Heuristic: Information that is easier to process feels more "true."*
- **Application:** Use icons, photos, and simple language. Avoid forcing the
  user to type or calculate numbers.

## 6. Sunk Cost Fallacy (Progressive Commitment)
*Heuristic: People are more likely to finish a task if they have already
invested effort.*
- **Application:** Place the easiest questions at the start. Once a user is 3
  questions in, they are much more likely to answer a slightly harder 4th
  question to see the result.

## 7. The Choice Architecture of Results
- **Defaulting:** Recommend a "Starter Bundle" or "Most Popular" configuration
  to reduce the number of decisions needed *after* the quiz.
- **Framing:** Frame the recommendation around the user's primary goal (e.g.,
  "This setup is optimized for [User's Goal]").
