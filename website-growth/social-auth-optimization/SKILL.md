---
name: social-auth-optimization
description:
  Audit and optimize social authentication (SSO) to reduce registration
  friction, eliminate password fatigue, and increase signup completion rates.
---

# Social Authentication Optimization

## Purpose

The Social Authentication Optimization skill provides a framework for reducing
friction and "cognitive load" during the signup and login processes. By
leveraging existing identity providers (Google, Apple, Microsoft, GitHub), this
skill aims to maximize Signup Completion Rate and Login Success Rate. It
replaces high-friction manual forms with "one-click" or "one-tap" experiences,
directly addressing the leading cause of funnel drop-off: password fatigue.

## Use Cases

- **SaaS Platforms:** Especially those targeting professional audiences
  (Google/Microsoft) or developers (GitHub).
- **Mobile-First Apps:** Where typing on a virtual keyboard is a major barrier
  and "Sign in with Apple" is expected.
- **E-commerce Sites:** Looking to speed up the transition from "Cart" to
  "Customer" by bypassing long guest forms.
- **High-Frequency Apps:** Where users frequently log in and out, and need a
  seamless way to re-authenticate.

## When NOT to Use

- **High-Security Banking/Military Systems:** Where third-party identity
  dependencies may introduce unacceptable security risks or compliance issues.
- **Hyper-Niche Internal Tools:** Where an organization's specific LDAP or
  SAML-based IAM system is the mandatory standard.
- **Early Alpha Products:** If the user base is so small that the development
  overhead of multiple OAuth integrations outweighs the friction reduction.

## Inputs

1. **Signup Drop-off Data:** Analytics showing where users leave the
   registration flow (e.g., at the "Create Password" field).
2. **Target Audience Profile:** Knowledge of which platforms your users already
   use (e.g., B2B users on LinkedIn/Microsoft, Gen Z on Google/Apple).
3. **Current Authentication UI:** Screenshots of the existing login and signup
   screens.
4. **Login Failure Logs:** Data on password reset requests and "Incorrect
   Password" attempts.

## Outputs

1. **Prioritized Provider List:** A recommendation of which social logins to
   implement based on audience and region.
2. **"One-Tap" Implementation Plan:** Strategy for deploying browser-native
   features like Google One-Tap or Apple's automatic sign-in.
3. **UI/UX Optimization Specs:** Wireframes or guidance for the placement,
   hierarchy, and styling of social auth buttons.
4. **"Duplicate Account" Mitigation Strategy:** Flowcharts for handling users
   who accidentally create multiple accounts with different providers.

## Workflow

### 1. Identify Target Identity Providers (IdPs)

Match your audience to the most relevant providers:
- **Universal:** Google (highest reach across all demographics).
- **Professional/B2B:** Microsoft (Azure AD), LinkedIn.
- **Developer/Technical:** GitHub, GitLab.
- **Consumer/Mobile:** Apple, Meta (Facebook).

### 2. Audit the Placement & Hierarchy

Ensure social auth is the "Path of Least Resistance":
- **Primary vs. Secondary:** Social buttons should be more prominent than the
  traditional email/password form for new signups.
- **The "Rule of 2":** Avoid "Login Wall Fatigue" by limiting choices to the
  top 2-3 providers relevant to your users.
- **Visual Balance:** Buttons should use official brand colors and logos to
  leverage established trust.

### 3. Minimize Permission Overreach

Audit the OAuth "Scopes" you are requesting:
- **The "Basic-Only" Rule:** Only ask for `email` and `profile/name`.
- **Deferred Requesting:** If you need additional permissions (e.g., Google
  Drive access), ask for them *after* the user is onboarded, not during signup.

### 4. Implement "One-Tap" and Native Auth

Move beyond buttons to automatic recognition:
- **Google One-Tap:** Implement the floating prompt that offers to sign the
  user in without them leaving the current page.
- **Apple/Credential Manager:** Use the browser's native credential manager
  support to provide a biometric (FaceID/TouchID) login experience.

### 5. Review Against Decision Rules

Verify the proposed implementation against the heuristics below.

## Decision Rules

- **The "Pre-flight" Recognition Rule:** If a user is already signed into a
  compatible provider in their browser, the social auth option should be
  visually highlighted as the "Recommended" path.
- **The "Email Match" Merger:** Always attempt to automatically link accounts
  if a user logs in via a social provider using an email address that already
  exists in your system (with a secure confirmation step).
- **Mobile First:** On iOS and Android devices, "Sign in with Apple" and "Sign
  in with Google" should be the most prominent options, ideally using the OS
  native SDKs.
- **One Primary Action:** Do not overwhelm the user with 5+ social buttons. Use
  a "Show more" link if you must support many providers.

## Constraints

- **Brand Guidelines:** All social login buttons must strictly adhere to the
  visual guidelines of the provider (e.g., Apple's specific button height and
  logo usage).
- **Terms of Service:** Implementations must comply with provider TOS (e.g.,
  Apple's requirement that any app offering social logins must also offer "Sign
  in with Apple").
- **Privacy Policy:** Must clearly state how third-party data is used and
  provide a way for users to disconnect their accounts.

## Non-Goals

- Implementation of the underlying OAuth2/OpenID Connect protocols.
- Security auditing of the identity providers themselves.
- Custom styling that violates brand identity requirements of providers.

## Common Failure Patterns

- **The "Permissions Scare":** Asking for "Write access" or "Contact list"
  access during the initial signup, causing 50%+ bounce rates.
- **The "Duplicate Account" Trap:** Allowing a user to create two separate
  accounts because they used Google once and LinkedIn the next time.
- **The "Button Soup":** Showing 6 identical-looking social buttons, leading to
  decision paralysis.
- **Broken Return-to-Page:** Failing to redirect the user back to their
  original destination after the social auth handshake.

## Validation Criteria

- [ ] **Signup Completion Rate:** Measure the % increase in users completing
  registration compared to the email-only baseline.
- [ ] **Time-to-Authenticate:** Measure the reduction in seconds from "Click
  Signup" to "Dashboard Access."
- [ ] **Password Reset Volume:** Monitor for a decrease in "Forgot Password"
  requests as more users move to SSO.
- [ ] **Returning User Success Rate:** Measure how many returning users
  successfully log in on their first attempt without error.
