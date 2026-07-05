---
name: social-auth-optimization
description:
  Audit and optimize Social Authentication (OIDC/OAuth) and "One-Tap" sign-in
  flows to reduce password fatigue, eliminate email verification friction, and
  increase signup conversion rates.
---

# Social Authentication & SSO Optimization

## Purpose

The Social Authentication & SSO Optimization skill provides a framework for
reducing the "Registration Friction" that causes users to abandon a site at the
signup or login gate. By leveraging trusted third-party identity providers
(Google, Apple, Microsoft, GitHub) and modern browser features like "One-Tap"
dialogs, this skill aims to eliminate password creation, reduce form-filling
time, and bypass the "verification email" bottleneck. It directly improves
Signup Conversion Rate (CVR) and reduces Time-to-First-Action.

## Use Cases

- **SaaS Platforms:** Especially those targeting professional users who prefer
  SSO (Google Workspace, Microsoft Entra ID).
- **Mobile-First E-commerce:** Where typing passwords and switching to email
  apps to verify accounts leads to high bounce rates.
- **Consumer Content Sites:** Where a high-friction signup wall prevents users
  from accessing "gated" value.
- **High-Frequency Apps:** Where users frequently forget passwords and need a
  frictionless re-entry path.

## When NOT to Use

- **High-Sensitivity Security Apps:** Banking or medical platforms that may
  require specific multi-factor authentication (MFA) protocols not supported by
  standard social auth.
- **Privacy-First Platforms:** Where users may not want to link their social
  identity to the service (e.g., sensitive health support or whistleblowing
  tools).
- **Internal/Legacy Systems:** Where user identities are strictly managed via a
  private Active Directory with no external access.

## Inputs

1. **Authentication Analytics:** Conversion rate of the signup page, password
   reset frequency, and drop-off rate at the "Verify your email" step.
2. **Current Auth Options:** A list of existing login methods (e.g., Email/Pass
   only, or limited social options).
3. **Target Audience Tech Stack:** Knowledge of what accounts your users
   already have (e.g., Developers use GitHub; Corporate users use Microsoft).
4. **Login/Signup UI:** Screenshots of the current auth modal or page across
   mobile and desktop.

## Outputs

1. **Social Auth Audit:** Identification of missing high-value providers and
   hierarchy issues (e.g., social login buried at the bottom).
2. **Provider Recommendation Map:** A prioritized list of providers based on
   audience persona (e.g., B2B vs. B2C).
3. **Optimized Auth UI Spec:** Layout guidance for "One-Tap" prompts and social
   button placement.
4. **Data Privacy & Scope Plan:** Recommendations for the "minimum viable
   permissions" to request from the user to maintain trust.

## Workflow

### 1. Audit for "Verification Leaks"

Identify where users are bouncing because of traditional auth requirements.
- **The Email Verification Wall:** Do you require users to leave your site and
  check their inbox before they can use the product?
- **Password Complexity Bounce:** Are users abandoning the form when they see
  "Must contain 1 symbol and 1 uppercase letter"?
- **Mobile Typing Cost:** Measure the time-to-complete for a manual form vs. a
  social login.

### 2. Match Providers to Personas

Don't just add every social icon. Select the ones that match your user's "Primary
Identity."
- **B2B / Professional:** Prioritize Google and Microsoft (LinkedIn as secondary).
- **Developer / Technical:** Prioritize GitHub and Google.
- **Consumer / Mobile:** Prioritize Apple (mandatory for iOS apps with social
  auth) and Google.
- **Creative:** Prioritize Adobe or Apple.

### 3. Optimize Visual Hierarchy

The "Social over Form" rule:
- **Primary Buttons:** Make the most common social provider (usually Google) the
  largest and most prominent button.
- **Visual Subordination:** Place the traditional "Email/Password" form below or
  behind a divider (e.g., "— or —").
- **Smart Recency:** If a user previously logged in with Google, show ONLY the
  Google button prominently on their next visit.

### 4. Implement "One-Tap" and Autolayout

Reduce interaction cost to zero.
- **Google One-Tap / FedCM:** Implement the floating prompt that appears in the
  top right of the screen (on desktop) or bottom (on mobile). Google has moved
  this flow to the browser-native Federated Credential Management (FedCM) API;
  legacy One-Tap integrations that don't use FedCM are being deprecated in
  Chrome and will fail silently in third-party-cookie-restricted contexts, so
  verify the FedCM migration status before relying on this pattern.
- **Credential Management API:** Allow the browser to automatically sign the
  user back in if they have a saved session.
- **The "Pre-Filled" Flow:** If a user clicks a social button, ensure any data
  returned (Name, Email, Avatar) is used to pre-fill their profile so they never
  type it.

### 5. Review Against Decision Rules

Verify the strategy against the authentication growth heuristics.

## Decision Rules

- **The "One-Tap" Priority:** If the user is in a supported browser, the
  "One-Tap" or "Sign in with..." prompt should trigger automatically after 2-3
  seconds on the landing page or signup page.
- **The iOS "Apple Rule":** If you offer any third-party social auth on an iOS
  app, you MUST offer "Sign in with Apple" as an option.
- **Minimum Scope:** Only ask for `email` and `profile`. Asking for `contacts`
  or `post to feed` permissions at signup will tank conversion.
- **Contextual Placement:** On mobile, place social login buttons within the
  "Natural" thumb zone (bottom half of the screen).

## Constraints

- **Platform Terms:** Social auth implementation must comply with provider
  terms (e.g., Google's Branding Guidelines for button colors/logos).
- **Data Integrity:** Ensure that social identities are correctly mapped to a
  unique user ID to prevent duplicate accounts if a user later tries to login
  with email.
- **Security Standards:** Implementation must follow OAuth 2.0 and OpenID
  Connect (OIDC) security best practices to prevent account takeover risks.

## Non-Goals

- Implementing the technical backend for OAuth handshake or JWT management.
- Designing multi-factor authentication (MFA) or password recovery workflows.
- Managing Enterprise SSO/SAML integrations for specific client organizations.

## Common Failure Patterns

- **The "Icon Cloud":** Offering 10 different social providers, leading to
  choice paralysis and a cluttered UI.
- **Burying the Benefit:** Placing social login buttons at the very bottom of a
  long registration form.
- **Scope Creep:** Requesting too many permissions (e.g., "View your files")
  which triggers a scary browser warning and causes abandonment.
- **The "Dead End" Social:** Allowing a user to log in via social but then
  forcing them to fill out a 10-field "Profile" form immediately after.
- **Mobile Scaling:** Using social buttons that are too small for easy tapping
  on small screens.

## Validation Criteria

- [ ] **Signup Conversion Rate (CVR):** Measure the percentage of users who
  successfully reach the "Welcome" dashboard after landing on the signup page.
- [ ] **Time-to-Completion:** Measure the reduction in time from landing on the
  signup page to successful account creation.
- [ ] **Verification Bounce Rate:** Track the reduction in users who drop off at
  the "Verify Email" step.
- [ ] **Account Merge Rate:** Monitor if users are creating duplicate accounts
  and implement "Email-Matching" logic to merge them.
