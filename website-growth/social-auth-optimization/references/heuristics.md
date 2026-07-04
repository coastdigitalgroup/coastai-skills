# Social Auth & SSO Heuristics

Reference guide for the psychological and technical principles behind high-
conversion authentication flows.

## 1. The Fitts's Law of Forms
The time to acquire a target is a function of the distance to and size of the
target. Social login buttons provide a larger, more distinct "target" than
individual form fields (Email, Name, Password), reducing the physical and
cognitive effort required to start the process.

## 2. Reducing Interaction Cost
Interaction cost is the sum of mental and physical efforts that the users must
deploy in order to interact with a product to reach their goals.
- **Manual Signup:** High cost (Typing, recall, validation errors).
- **Social Auth:** Low cost (Recognition over recall, single click).

## 3. The "Halo Effect" and Borrowed Trust
By placing buttons for Google, Apple, or Microsoft on your signup page, you
subconsciously transfer some of the trust and security associated with those
behemoths to your own platform. Users feel more secure clicking a button they
recognize than entering their password into a site they just discovered.

## 4. Google One-Tap & The "Zeigarnik Effect"
Google One-Tap utilizes a small, non-obstructive UI to prompt users who are
already signed into Google. This leverages the "Zeigarnik Effect" (people
remember uncompleted tasks better) by making the "Login" task feel like a
nearly-finished process that only requires one final confirmation.

## 5. Mobile OS Constraints (Apple's Rule)
Apple's App Store Review Guideline 4.8 states: "Apps that use a third-party or
social login service to set up or authenticate the user's primary account with
the app must also offer Sign in with Apple as an equivalent option." Failure to
follow this results in immediate app rejection.

## 6. The Privacy Paradox
Users express concern about privacy, yet frequently use social login for
convenience. To mitigate this:
- **Be Transparent:** Clearly state that you will "never post to their profile."
- **Be Minimal:** Use the "Least Privilege" principle—only ask for data you
  absolutely need to create the account.

## 7. Return-to-Intent (RTI)
The most common technical failure in social auth is losing the user's original
destination. A high-conversion flow always stores the `redirect_url` before
sending the user to the IdP, ensuring they land exactly where they intended
(e.g., the specific product page or the cart) after authentication.
