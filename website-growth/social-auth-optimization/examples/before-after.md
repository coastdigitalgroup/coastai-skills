# Social Authentication Before & After

## Scenario: B2B SaaS Platform (Project Management Tool)

**The Problem:**
A project management tool, "FocusTask," targets busy managers and developers. Their signup page consists of a 6-field manual form (Full Name, Company Email, Password, Confirm Password, Team Size, Job Role). Users are then sent an email verification link that they must click before accessing the dashboard.

**The Metrics (Before):**
- **Signup Page CVR:** 12%
- **Email Verification Drop-off:** 25% (Users never click the link)
- **Time to Dashboard:** 4 minutes 30 seconds

---

## The "After" Optimization

**The Changes:**
1.  **Provider Prioritization:** Added "Continue with Google" and "Continue with GitHub" as the primary actions.
2.  **Hierarchy Shift:** The manual form was moved below the social buttons and simplified to just "Email" (password set later).
3.  **One-Tap Implementation:** Enabled Google One-Tap for all visitors with a Google session.
4.  **Verification Bypass:** Users signing up via Social Auth are automatically verified, bypassing the "Check your inbox" step.
5.  **Progressive Profiling:** "Team Size" and "Job Role" were moved to an in-app onboarding step *after* the user sees their empty dashboard.

### Visual Comparison

**Before:**
- [Header: Create Your Account]
- [Field: Full Name]
- [Field: Work Email]
- [Field: Password (Must be 12 chars...)]
- [Field: Confirm Password]
- [Dropdown: Team Size]
- [Dropdown: Role]
- [Button: Create Account]
- [Link: Sign in with Google (small text at bottom)]

**After:**
- [Header: Get Started in Seconds]
- [Button: Continue with Google (High Contrast)]
- [Button: Continue with GitHub (Secondary Style)]
- [Divider: — or use your work email —]
- [Field: Work Email]
- [Button: Continue]
- [Google One-Tap Prompt appears in top-right corner]

---

## The Result (Measurable Outcome)

After implementing the Social Auth Optimization:
- **Signup Page CVR:** 28% (**+133% improvement**)
- **Email Verification Drop-off:** 4% (Only for the small % using manual email)
- **Time to Dashboard:** 15 seconds (**94% faster**)
- **Activation Rate:** Increased by 15% because users reached the "Aha! Moment" while their intent was still peak.
