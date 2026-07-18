# Example Case Study: Overhauling the Demo Booking Funnel

This case study shows how a B2B SaaS company specializing in inventory management software ("StockSync") redesigned and optimized its self-guided booking journey. By resolving multiple friction points, StockSync unlocked a dramatic increase in sales meetings without sacrificing qualification standards.

---

## The Scenario

### The Company
* **Product:** StockSync (B2B Inventory Management SaaS)
* **Average Contract Value (ACV):** $12,000 / year
* **Primary Conversion Goal:** Schedule a 30-minute discovery & demo call with an Account Executive.

### The Initial Funnel Setup (Before)
1. **The Call to Action:** A generic button in the navigation header reading "Request a Demo".
2. **The Landing Page:** A long, uninspiring page containing an embedded 3rd-party calendar iframe.
3. **The Qualification Form (Friction Point 1):** The widget was configured with 11 required fields:
   - First Name
   - Last Name
   - Business Email
   - Phone Number
   - Company Name
   - Website URL
   - Job Title
   - Monthly Shipping Volume (dropdown)
   - Current ERP/Accounting Software (dropdown)
   - Country (dropdown)
   - "How can we help?" (text area)
4. **The Calendar Grid (Friction Point 2):** The calendar booking window allowed prospects to select slots up to **60 days in advance**.
5. **The Confirmation Screen (Friction Point 3):** After booking, the iframe displayed a generic, grey text card: *"Your meeting is scheduled. Thank you."*
6. **The Calendar Invitation (Friction Point 4):** Sent automatically via the scheduling system, titled `"StockSync Sales Demo - [My Company Name]"` with no meeting link or agenda included in the body.

---

## Baseline Performance Metrics (The Problem)

- **Landing Page Views:** 1,200 / month
- **Widget Loads:** 1,000 / month
- **Form/Booking Exits (Drop-off):** 600 / month (60% Abandonment)
- **Completed Bookings:** 400 / month
- **Meeting Show-up Rate:** 55% (Only 220 out of 400 bookings actually attended the call)
- **Qualified Pipeline Generated:** 110 SQLs / month

The primary pipeline leak was double-sided: 60% of people who wanted to book a demo backed out because of the grueling 11-field form or the uninviting calendar grid. Furthermore, because bookings could be made up to 2 months in advance and invitations were poorly branded with no reminder flows, nearly half of all schedulers failed to show up.

---

## The Optimization Protocol (After)

To plug these leaks, StockSync implemented the **Meeting Scheduling Optimization Protocol** over a 2-week period.

### Step 1: Consolidated Form Fields & Enrichment
StockSync connected their booking system to a CRM enrichment provider (Clearbit). They eliminated 7 manual questions, keeping only the bare minimum:
- **First & Last Name** (Combined into a single "Full Name" field, parsed by the CRM).
- **Business Email** (The enrichment tool automatically pulls Company Name, URL, ERP software, and employee count in the background using the domain).
- **Current Shipping Volume** (Retained as a single critical qualifying question to route the lead).

*Result:* Total fields reduced from 11 to 3.

### Step 2: Visual Choice Architecture Configuration
StockSync updated their booking widget availability window:
- **Max Booking Horizon:** Reduced from 60 days to **7 days**. Users could only see slots for the current week and the following week.
- **Buffer Times:** Added a mandatory 15-minute buffer before and after meetings to ensure AEs was never rushed.
- **Timezone Detection:** Configured the widget to explicitly call out timezone detection in bold text: *"All times shown in your local timezone (**EST**)"*.

### Step 3: Redirection and Post-Conversion Momentum
StockSync disabled the default in-widget confirmation card and enabled **Custom Redirection URL**:
- Successful bookers were immediately redirected to `/demo-confirmed/`.
- This custom success page included a 90-second, high-energy video from the Head of Customer Success welcoming the prospect and walking through the exact agenda.
- Below the video, the page featured 3 customer logos from their specific industry and a link to a "Prep Guide" PDF.

### Step 4: Revamped Meeting invitations & Reminder Cadence
The invitation and reminder communications were restructured for professionalism and expectation setting:
- **Calendar Invite Title:** Updated from `"StockSync Sales Demo"` to `"[Company Name] <> StockSync: Custom Demo & Inventory Assessment"`.
- **Invite Body:** Added a clear, bulleted agenda:
  - *00:00 - 05:00:* Discussing your current inventory hurdles.
  - *05:00 - 20:00:* Customized walkthrough of StockSync based on your ERP.
  - *20:00 - 30:00:* Q&A and next steps.
  - *Meeting Link:* Prominently highlighted at the top.
- **Transactional Reminder Triggers:**
  - *24 Hours Before:* Personalized plain-text email from the assigned AE: *"Hi [Name], looking forward to our call tomorrow. I noticed you use NetSuite as your ERP. I'll make sure to showcase our native NetSuite sync. Let me know if you'd like to invite anyone else from your operations team."*
  - *1 Hour Before:* Automated SMS trigger (with opt-out): *"Hi [Name], your StockSync assessment starts in 1 hour. Tap here to join: [Link]. See you soon!"*

---

## Optimized Funnel Performance Metrics (The Outcome)

After running the optimized scheduling experience for 30 days, the results were audited:

| Metric | Before Overhaul | After Overhaul | Lift / Change |
| :--- | :---: | :---: | :---: |
| **Landing Page Views** | 1,200 | 1,200 | *Baseline Same* |
| **Widget Loads** | 1,000 | 1,050 | +5% |
| **Widget Booking Abandonment** | 60% | 18% | **-42% Drop-off** |
| **Completed Bookings** | 400 | 861 | **+115% Total Bookings** |
| **Attendee Show-up Rate** | 55% | 84% | **+29% Show-up Rate** |
| **Attended Sales Meetings** | 220 | 723 | **+228% Attended Calls** |
| **Qualified Pipeline Generated** | 110 SQLs | 360 SQLs | **+227% Pipeline Growth** |

### Key Takeaways
By treating the scheduling widget as a conversion funnel rather than an administrative default, StockSync more than doubled completed bookings. Combining this with a robust confirmation redirect, personalized reminder sequence, and tight availability constraints successfully drove show-up rates from a poor 55% to an industry-leading 84%.

The resulting sales pipeline grew by **227%** without any increase in marketing spend or raw traffic acquisition.
