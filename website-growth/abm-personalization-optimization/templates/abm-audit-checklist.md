# ABM Landing Page Personalization Audit & Mapping Template

Use this checklist and mapping framework to evaluate, design, and implement an Account-Based Marketing (ABM) personalization strategy for high-value target accounts and industry segments.

---

## Part 1: ABM Landing Page Audit Checklist

Evaluate your current landing page to identify personalization gaps and friction points.

### 1. Above-the-Fold Alignment (The Hook)
- [ ] **First Impression (3-Second Rule):** Does the visitor immediately see their company name, industry, or specific tech stack represented?
- [ ] **Dynamic Title (H1):** Is there a placeholder or structured variable to dynamically inject the company name or vertical?
- [ ] **Dynamic Hero Visual:** Does the main screenshot or background image align with the visitor's industry (e.g., showing medical compliance visualizations for healthcare, high-volume transactional metrics for e-commerce)?

### 2. Trust and Authority (Social Proof)
- [ ] **Logo Grid Segmentation:** Are the client logos on the page filtered to show peers *in the same vertical* as the visiting account?
- [ ] **Role-Matched Testimonials:** Does the testimonial quote come from a persona that matches the target reader (e.g., if the reader is a CTO, is the testimonial from another CTO)?
- [ ] **Objection-Neutralizing Copy:** Are the key trust badges (e.g., SOC2 Type II, HIPAA, PCI-DSS) updated dynamically based on industry-specific security anxieties?

### 3. Friction & Flow (The Conversion)
- [ ] **Enrichment Pre-filling:** Are form fields (Company Name, Employee Count, Industry) pre-filled via IP-lookup/CRM data to minimize manual typing?
- [ ] **Custom CTA Wording:** Is the CTA button copy personalized to the company name or vertical (e.g., "Request [Company]'s Customs Report")?
- [ ] **High-Value Lead Routing:** Are Tier-1 visitors instantly routed to a dedicated calendar widget rather than a generic booking form?
- [ ] **Champion Pitch Kit:** Is there a highly visible secondary CTA offering an "Internal Business Case Guide" or "CFO Pitch Deck"?

### 4. Technical Performance & Fallbacks
- [ ] **Zero-Flicker Implementation:** Does the script load and execute fast enough (<300ms) to prevent visual layout shifts (CLS) or page flickering?
- [ ] **Safe Default Fallbacks:** If the enrichment database fails, does the page seamlessly display a high-converting generic fallback without raw code tokens like `{{company}}`?
- [ ] **ISP Filtering:** Are generic internet service providers (e.g., Comcast, AT&T, Verizon) explicitly filtered out to avoid showing "The leading platform for Comcast employees"?

---

## Part 2: Segment Personalization Mapping Template

Use this mapping matrix to plan the dynamic elements of your personalized ABM page.

| Target Cohort / Segment | Trigger Criteria (IP/UTM/Parameter) | Dynamic H1 Headline | Featured Client Logos | Featured Testimonial | Primary CTA Copy | Secondary "Pitch Kit" |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Example: Tier 1 Target** *(e.g., Snowflake)* | `company_domain == snowflake.com` | "Streamline Dev Operations Built Specifically for **Snowflake**" | AWS, GCP, Databricks, Stripe | Chief Architect at Stripe: *"SentryFlow optimized our scaling by 40%."* | "Request Snowflake's Tailored Briefing" | "Download the Snowflake CFO Business Case" |
| **Example: Fintech Sector** | `industry == banking_and_finance` | "The Data Compliance Engine Trusted by **FinTech Innovators**" | Barclays, Stripe, Plaid, Brex | CCO at Global Bank: *"We halved our compliance audit prep time."* | "Schedule Your FinTech Walkthrough" | "Get the FinTech Compliance Playbook" |
| **Example: Healthcare Sector** | `industry == healthcare_and_lifesciences` | "HIPAA-Compliant Compliance Tracking for **Healthcare Leaders**" | Pfizer, Oscar Health, Mayo Clinic | Head of Patient Security: *"Zero compliance leaks in 36 months."* | "Book HIPAA Security Review" | "Download HIPAA Approval Checklist" |
| **Fallback / Guest** | *enrichment_failed == true* | "Real-Time Data Compliance and Anomaly Detection for Modern Enterprises" | Stripe, Zoom, Pfizer, AWS | VP of Ops at Zoom: *"Scale compliance effortlessly."* | "Book a Free Consultation" | "Get the Enterprise Pricing & Security Kit" |

---

## Part 3: Step-by-Step Implementation Tracker

Track your progress from strategy through code implementation.

- [ ] **Step 1: Account Definition & Scoring** — Finalize the Target Account List (TAL) and segment into Tiers.
- [ ] **Step 2: Enrichment Setup** — Connect the IP-lookup / reverse-DNS enrichment script to the landing page.
- [ ] **Step 3: Define Fallback Values** — Program hard fallbacks for all dynamic text variables (e.g., "your organization").
- [ ] **Step 4: Design Layout Variations** — Create visual assets, logos, and case study modules for each industry vertical.
- [ ] **Step 5: Code Dynamic Replacement** — Write client-side JS or set up edge-rewriting rules to swap DOM elements.
- [ ] **Step 6: Integrate CRM Forms** — Configure hidden fields in forms to accept enriched metadata on submission.
- [ ] **Step 7: QA and Load-Testing** — Verify replacement speeds on 3G connections and ensure layout stability.
- [ ] **Step 8: Monitor and Iterate** — Review conversion rates by segment weekly.
