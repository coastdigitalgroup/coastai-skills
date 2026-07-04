# Social Auth & SSO Audit Checklist

Use this checklist to evaluate the effectiveness of a website's social
authentication implementation and identify friction points.

## 1. Provider Relevance & Selection
- [ ] **Audience Match:** Are the providers offered relevant to the target
  persona? (e.g., GitHub for devs, LinkedIn for B2B, Apple for iOS users).
- [ ] **Choice Limitation:** Are there 3 or fewer providers shown by default to
  prevent decision paralysis?
- [ ] **Regional Appropriateness:** If the site has a global audience, are
  region-specific providers offered (e.g., Kakao in Korea, WeChat in China)?

## 2. Visual Hierarchy & UX
- [ ] **Path of Least Resistance:** Are social login buttons more prominent or
  equal in weight to the manual email/password form?
- [ ] **Brand Compliance:** Do buttons use the official provider logos, fonts,
  and colors?
- [ ] **Standardized Sizing:** Are all social buttons the same size and aligned
  vertically?
- [ ] **Separation:** Is there a clear visual separator (e.g., "or sign in with
  email") between SSO and manual forms?

## 3. The Onboarding Handshake (OAuth Flow)
- [ ] **Minimal Scopes:** Does the app only request the bare minimum (`email`,
  `profile`) permissions?
- [ ] **Clear Attribution:** Is the app's logo and name correctly displayed in
  the provider's permission modal?
- [ ] **Mobile Native:** Does the site use native app-switch (Universal Links)
  rather than opening an in-app browser for the login?

## 4. Friction Reduction Features
- [ ] **One-Tap / Auto-Prompt:** Is Google One-Tap or a similar "Quick Login"
  feature implemented?
- [ ] **No Immediate Verification:** If a user signs up via a verified SSO
  provider, do they bypass the "Check your email to verify" step?
- [ ] **Returning User Memory:** Does the UI highlight the provider the user
  previously used to sign in (e.g., "Last used: Google")?

## 5. Account Management & Errors
- [ ] **Email Matching:** Does the system automatically link accounts if the
  SSO email matches an existing manual account?
- [ ] **Duplicate Prevention:** If a user tries to sign up with a new SSO but the
  email exists, is there a clear "Link these accounts" flow?
- [ ] **Logout Clarity:** Does logging out of the site also clear the local SSO
  session?
- [ ] **Disconnection Path:** Can users easily disconnect a social provider from
  within their profile settings?

## 6. Performance & Analytics
- [ ] **Completion Tracking:** Is there an event trigger for "SSO Button Click"
  vs. "SSO Success"?
- [ ] **Latency Check:** Does the handshake process take less than 3 seconds to
  complete the redirect back to the app?
