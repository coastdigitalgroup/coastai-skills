# Social Authentication Heuristics & Trust Patterns

## 1. Password Fatigue & The "Path of Least Resistance"
Users are 30% more likely to sign up for a service if they can do so using an existing identity. The cognitive load of creating a new, unique password (and remembering it) is a primary driver of registration abandonment.

## 2. The Reciprocity of Trust
Social authentication leverages the existing trust a user has with a provider (like Google or Apple) and transfers it to your platform. This is a form of "Trust by Association."

## 3. Permission Paradox
The more permissions you ask for, the less trust you receive.
- **High Trust:** Asking for `email` and `name` only.
- **Low Trust:** Asking for `access to contacts`, `calendar`, or `post on behalf of`.
Always start with the absolute minimum scope. You can ask for additional permissions later (Progressive Profiling) once the user has experienced value.

## 4. The iOS Apple Mandate
Apple's App Store Review Guideline 4.8 states: "If you provide any third-party or social login service... you must also offer Sign in with Apple as an equivalent option." Even if you are purely web-based, offering Apple Auth significantly improves conversion for Safari and iPhone users.

## 5. One-Tap & The "Surprise and Delight" Factor
Google One-Tap can increase signup conversion by up to 2x by removing the need for a user to even click a button. It presents a "Welcome back" or "Get started" prompt the moment they land, making the barrier to entry nearly invisible.
