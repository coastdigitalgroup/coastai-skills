---
name: contact-page-optimization
description:
  Audit and optimize contact pages to transform them from generic "dead ends"
  into high-converting routing hubs that qualify leads, build trust, and set
  clear expectations.
---

# Contact Page Optimization

## Purpose

The Contact Page Optimization skill provides a systematic framework for
transforming the most overlooked conversion point in the funnel. Most contact
pages are generic utilities that provide a "one-size-fits-all" form, leading to
poor lead qualification, slow response times, and user frustration. This skill
focuses on **Intent-Based Routing**—segmenting users at the point of contact to
ensure they reach the right person (Sales vs. Support) with the right
information. By optimizing for trust, transparency, and speed, this skill
directly improves Lead Quality (MQL/SQL conversion), Sales Velocity, and User
Satisfaction.

## Use Cases

- **B2B SaaS & Services:** Where "Sales" and "Support" need distinct entry
  points to avoid internal bottlenecking.
- **High-Consideration E-commerce:** Where users have technical or bulk-order
  questions before buying.
- **Complex Organizations:** With multiple departments or geographic locations
  that require precise routing.
- **Agencies & Consultants:** Looking to filter out low-budget or "out-of-scope"
  inquiries before they reach a human.

## When NOT to Use

- **Small, Single-Service Sites:** Where one person handles all inquiries and
  a simple `lead-capture-form-optimization` is sufficient.
- **Purely Support-Focused Sites:** Where the goal is ticket resolution rather
  than conversion; use help center or knowledge base optimization instead.
- **Early-Funnel Content:** Do not push a "Contact Us" call on users who are
  still in the "Unaware" or "Problem Aware" phase (focus on `lead-magnet-optimization`).

## Inputs

1. **User Intent Map:** What are the top 3-5 reasons people contact you?
   (e.g., "Request a Quote," "Technical Support," "Partnership Inquiry").
2. **Current Contact Metrics:** Form completion rate (FCR), lead quality (SQL%),
   and initial response time (IRT).
3. **Internal Routing Logic:** Who is responsible for which inquiry type?
4. **Trust Assets:** Office photos, team bios, response-time guarantees, or
   physical address/maps.

## Outputs

1. **Contact Intent Audit:** Identification of friction points where users are
   misrouted or overwhelmed.
2. **Intent-Based Routing Map:** A logic flow for how different inquiry types
   are handled (e.g., "Budget > $10k -> Sales Call").
3. **Optimized Contact Page Layout:** A high-hierarchy design that prioritizes
   high-value conversion paths.
4. **Expectation Management Specs:** Clear messaging regarding response times
   and next steps.

## Workflow

### 1. Intent Segmentation (The Routing Hub)

Replace the single "Message" box with intent-driven paths.
- **The Choice:** Use cards, buttons, or a simple dropdown to ask the user:
  "How can we help you today?"
- **The Branch:** Define unique paths for "Sales," "Support," "Media," and
  "General." Each branch should lead to a form with fields specific to that
  need.

### 2. Form Optimization for Qualification

- **Sales Path:** Ask for qualifying data (Company Size, Budget, Project Scope).
- **Support Path:** Ask for identifying data (Order #, Account Email) to reduce
  back-and-forth.
- **Progressive Disclosure:** For complex inquiries, use a multi-step form to
  reduce initial cognitive load.

### 3. Build Immediate Trust

The contact page is often where users look for proof that a company is "real."
- **Humanity:** Show a photo of the team or the office.
- **Stability:** Display a physical address and a map (even for digital
  businesses).
- **Social Proof:** Place a small testimonial or "Trusted by..." bar near the
  primary contact form.

### 4. Manage the "Silence Gap"

The #1 conversion killer is the uncertainty of when a response will arrive.
- **The Guarantee:** "We respond to all sales inquiries within 4 business hours."
- **The Alternative:** Offer "Live Chat" or "Book a Demo" (Calendly link) for
  those who don't want to wait for an email.
- **The Success State:** On submission, tell the user exactly what happens next:
  "John from our team will email you from [email@address] to schedule a call."

### 5. Review Against Decision Rules

Ensure the page balances "Ease of Access" with "Quality of Lead."

## Decision Rules

- **The High-Intent Priority:** High-value actions (e.g., "Request a Quote")
  must be visually dominant (larger cards, primary colors) compared to support
  or general links.
- **Transparency over Privacy (for Businesses):** Always show a real physical
  address or at least a headquarters city. "Stealth" contact pages reduce trust.
- **The 3-Field Rule for General:** If it's a "General Inquiry," keep it to
  Name, Email, and Message. Don't over-qualify non-sales leads.
- **Proximity of Support:** Never make a sales prospect hunt through support
  links, but never hide support so deep that it frustrates existing customers.

## Constraints

- **Backend Sync:** Form field changes must map correctly to the CRM (e.g., Salesforce, HubSpot) or ticketing system (Zendesk).
- **GDPR/Compliance:** Forms must include necessary privacy consent checkboxes and links to the privacy policy.
- **Spam Protection:** Use invisible reCAPTCHA or honeypots to prevent bot submissions without introducing user friction.

## Non-Goals

- Technical setup of CRM routing rules or automated email sequences.
- Managing live chat staffing or support team workflows.
- SEO for contact-specific keywords (e.g., "Support for [Brand]").

## Common Failure Patterns

- **The "Mystery Box":** A single form with no categorization, leading to a
  cluttered inbox and slow response times.
- **The "Contact Wall":** Forcing users to read a 10-item FAQ before revealing
   the contact form.
- **Data Greed:** Asking for a phone number and company size for a "General
  Inquiry."
- **Broken Success State:** A simple "Message Sent" alert that leaves the user
  wondering if anyone will ever read it.
- **Hidden Phone/Email:** Hiding direct contact methods so deeply that it
  implies the company is "unreachable."

## Validation Criteria

- [ ] **Sales Lead Quality (SQL%):** Measure the percentage of leads from the
  contact page that are qualified by sales.
- [ ] **Initial Response Time (IRT):** Track the reduction in time from
  submission to first human contact.
- [ ] **Form Completion Rate (FCR):** (Submissions / Page Views) * 100.
- [ ] **Support vs. Sales Ratio:** Measure if intent-based routing successfully
  separates support noise from sales opportunities.
- [ ] **User Testing:** Ask testers "How long do you expect it will take to hear
  back?" based on the Success Page copy.
