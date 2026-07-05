# Social Authentication Audit & Implementation Checklist

Use this checklist to evaluate and optimize the social authentication experience on your website or application.

## 1. Provider Selection & Audience Match
- [ ] **Audience Analysis:** Have you identified the top 2-3 platforms where your users already have active sessions (e.g., Google for Workspace users, GitHub for devs, Apple for iOS users)?
- [ ] **Provider Pruning:** Are you limiting the number of providers to 3 or fewer to avoid choice paralysis?
- [ ] **Mandatory Apple Auth:** If you have an iOS app and offer social auth, is "Sign in with Apple" implemented?
- [ ] **SSO for Enterprise:** If targeting Enterprise, is there a clear "Single Sign-On" or "SAML" path distinct from consumer social login?

## 2. UI/UX & Visual Hierarchy
- [ ] **The "Social-First" Rule:** Are social login buttons placed *above* the manual email/password form?
- [ ] **Visual Distinction:** Is the primary provider (e.g., Google) more visually prominent than secondary ones?
- [ ] **Brand Compliance:** Do the buttons follow the provider's official branding guidelines (logo, color, "Continue with..." text)?
- [ ] **Mobile Touch Targets:** Are social buttons at least 44px tall and easy to tap with a thumb?
- [ ] **Divider Clarity:** Is there a clear visual separator (like a "— or —" line) between social and manual options?

## 3. Friction Reduction (Interaction Cost)
- [ ] **One-Tap Implementation:** Is a "One-Tap" prompt (like Google One-Tap) enabled for returning or session-active users?
- [ ] **Autofill Utilization:** After a user clicks social auth, are you automatically pulling their name and avatar to pre-fill their profile?
- [ ] **Verification Bypass:** Are social-auth users automatically marked as "Verified" to skip the email confirmation step?
- [ ] **Smart Login Memory:** Does the system remember which provider the user used last and highlight it on their return?

## 4. Trust & Security
- [ ] **Minimum Scope:** Are you requesting *only* the minimum necessary permissions (`email` and `profile`)?
- [ ] **Privacy Link:** Is there a link to your Privacy Policy and Terms near the auth buttons?
- [ ] **Account Merging:** If a user signs up with Google and later tries to log in with the same email via a different provider, do you have a path to merge the accounts securely?
- [ ] **Error Handling:** If a social auth fails (e.g., user cancels the popup), do you show a helpful message and allow them to try another method immediately?

## 5. Performance & Measurement
- [ ] **Time-to-Auth:** Have you measured the time difference between manual signup and social signup?
- [ ] **Provider Breakdown:** Are you tracking which social providers are used most frequently to inform future UI updates?
- [ ] **Verification Drop-off:** Are you monitoring the bounce rate at the "Email Verification" step for non-social users?
