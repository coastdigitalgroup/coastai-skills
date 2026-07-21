# B2B ABM Personalization Audit & Mapping Template

Use this comprehensive checklist and mapping matrix to plan, audit, and optimize a personalized account-based experience. Run this process before writing any code or configuring triggers in your personalization platform.

---

## Part 1: Personalization Readiness Checklist

### 1. Account Intel & Data Layer Accuracy
- [ ] **Data Provider Connected:** A reverse-IP intelligence engine (e.g., Clearbit, 6sense, Demandbase) is successfully integrated with the website's frontend.
- [ ] **Match Rate Audited:** Baseline match rate has been verified in analytics. (Target: >30% of anonymous traffic resolved to domains).
- [ ] **Deterministic Parameters Configured:** UTM and query parameters are mapped for outbound email and ad campaigns to bypass IP resolution limitations (e.g., `?utm_account_id=Otech&utm_vertical=finance`).
- [ ] **Consent Management Integrated:** Personalization logic respects cookie consent rules (e.g., does not fire lookup pixels if the user declines processing).

### 2. Performance & CLS Remediation
- [ ] **Anti-Flicker Snippet Installed:** An anti-flicker script or loading state wrapper is implemented to hide un-personalized text while lookup occurs (max 400ms timeout).
- [ ] **Fixed Height Selectors:** Element containers for headlines, logos, and case studies have fixed minimum heights configured in CSS (`min-height`) to prevent layout shifts.
- [ ] **API Timeout Guard:** The JavaScript lookup functions include a hard `Promise.race` fallback to trigger default styling if the provider API fails to resolve within 400ms.

---

## Part 2: Dynamic Component Swapping Strategy

Identify which specific DOM elements are targetable and ensure they have clean semantic class names or data-attributes.

| Page Zone | DOM Selector | Default Control Content | Personalization Target / Asset |
| :--- | :--- | :--- | :--- |
| **Hero Title** | `h1.hero-title` | "Automate and Scale Your Operations" | Vertical pain point or Company Name greeting |
| **Hero Body** | `p.hero-desc` | "We help modern teams sync data across platforms securely and reliably." | Compliance standard (SOC2/HIPAA) or specific vertical integration |
| **Trust Bar** | `div.logo-grid` | [Generic SMB/Startup Logos A, B, and C] | Sector-specific peer logos (e.g., Finance giants, Retailers) |
| **Case Study** | `section.proof` | General customer quote highlighting quick setup and setup ease | Highly quantitative vertical study highlighting ROI / scale |
| **Primary CTA** | `a.cta-btn` | "Start 14-Day Free Trial" (Requires full sign-up form flow) | "Talk to our Architect" or "Schedule [Company Name] Strategy Call" |

---

## Part 3: Segment Mapping Matrix (Template)

Use this matrix to map visitor characteristics (attributes resolved via IP or UTM) to target messaging and assets.

```text
Visitor Attribute  -->  Target Dynamic Elements & Swaps
==================================================================================
SEGMENT 1: Financial Services ( resolved via IP: `company.category.industry == "Diversified Financials" / "Banks"` )
----------------------------------------------------------------------------------
* Hero Headline    -->  "Enterprise Financial Data Syncing & PCI Compliance"
* Hero Sub-head    -->  "Secure high-throughput pipelines with zero-trust architectures and end-to-end encryption."
* Trust Logo Bar   -->  Show Logos: [Global Bank X], [Fintech Leader Y], [Asset Manager Z]
* Case Study Proof -->  "How Apex Capital scaled transactions by 400% without a single compliance audit exception."
* Primary CTA Link -->  Redirect to Custom Booking Page with PCI Security FAQ
----------------------------------------------------------------------------------

SEGMENT 2: Healthcare & Life Sciences ( resolved via IP: `company.category.industry == "Biotechnology" / "Health Care"` )
----------------------------------------------------------------------------------
* Hero Headline    -->  "HIPAA-Compliant Operational Workflows"
* Hero Sub-head    -->  "Synchronize patient records and legacy hospital software safely inside our private cloud infrastructure."
* Trust Logo Bar   -->  Show Logos: [Health System A], [Pharma Brand B], [Diagnostic Corp C]
* Case Study Proof -->  "How Mayo Health Group automated data transfers and saved clinical staff 1,200 hours monthly."
* Primary CTA Link -->  Direct routing to HIPPA Specialist calendar (Instant AE Meeting Booking)
----------------------------------------------------------------------------------

SEGMENT 3: Tier-1 Strategic Account ( resolved via IP: `company.name == "OmniTech Corp"` )
----------------------------------------------------------------------------------
* Hero Headline    -->  "Custom Scaling Architecture Built for OmniTech Corp"
* Hero Sub-head    -->  "Accelerate your enterprise microservices and secure Kubernetes clusters with custom SLAs."
* Trust Logo Bar   -->  Show Logos: [Global Tech Peer A], [Global Tech Peer B], [Global Tech Peer C]
* Case Study Proof -->  "How Enterprise Tech Giant reduced container security threats by 99.4% in 30 days."
* Primary CTA Link -->  1-click inline Calendly scheduler routed to OmniTech's dedicated Account Executive (No Form)
----------------------------------------------------------------------------------

DEFAULT / FALLBACK ( served when API errors out, lookup fails, or visitor does not match segments )
----------------------------------------------------------------------------------
* Hero Headline    -->  "Scale and Secure Your Core Operations"
* Hero Sub-head    -->  "The operational control plane for secure engineering, finance, and operations teams."
* Trust Logo Bar   -->  Show standard verified high-growth customer logos
* Case Study Proof -->  Display our most popular high-read/high-conversion general customer case study
* Primary CTA Link -->  "Start Free Trial" (Navigates to standard self-guided trial onboarding flow)
==================================================================================
```

---

## Part 4: Post-Launch Validation Scorecard

Run this audit weekly for the first 30 days post-launch to monitor performance and safety.

```text
+-----------------------------------------------------------------------------+
| ABM PERSONALIZATION WEEKLY SCORECARD                                         |
+-----------------------------------------------------------------------------+
| Date Checked: _______________                  Reviewer: _________________  |
|                                                                             |
| [ ] Performance Guardrail: Check Lighthouse Speed Index.                    |
|     Target: < 2.5s   |  Actual: _____s                                      |
|                                                                             |
| [ ] Layout Stability: Verify CLS value on personalized page.                 |
|     Target: < 0.10   |  Actual: _____                                       |
|                                                                             |
| [ ] Match Accuracy check: Inspect 10 resolved session replays (e.g. Hotjar). |
|     Did the page render correct peer logos?  [ ] Yes   [ ] No               |
|                                                                             |
| [ ] Fallout verification: Verify error logs show 100% of failed IP lookups  |
|     smoothly rendered the Default Fallback.  [ ] Yes   [ ] No               |
|                                                                             |
| [ ] Conversion Check: Compare Target Segment Conversion vs. Default:        |
|     Personalized Segment CR: ____%  |  Default CR: ____%                    |
|     Relative Lift: _____%                                                   |
+-----------------------------------------------------------------------------+
```
