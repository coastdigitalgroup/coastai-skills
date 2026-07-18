# Meeting Scheduling Audit Checklist

This reusable template is designed for growth marketers, product managers, and CRO specialists to audit and optimize on-site meeting scheduling experiences. Use this checklist to identify friction points, streamline forms, configure visual elements, and establish high-converting confirmation flows.

---

## 1. Discovery & Entry Point Audit

Evaluate how users find and initiate the scheduling process.

- [ ] **High-Contrast Call to Action:** Is the booking button visually distinct from other secondary navigation links?
- [ ] **Action-Oriented Copy:** Does the button use benefit-centric copy (e.g., "Schedule an Assessment" or "Book a Demo") rather than passive text (e.g., "Contact" or "Submit")?
- [ ] **Contextual Placements:** Are booking CTAs placed near high-intent content (e.g., pricing tables, feature breakdowns, testimonial grids)?
- [ ] **Visual Context:** Does the landing page explain *what* the meeting is, *who* it is with, and *how long* it will last prior to loading the scheduling widget?

---

## 2. Form & Data Qualification Audit

Analyze the questionnaire attached to the scheduling widget.

- [ ] **Minimal Field Count:** Is the form restricted to 4 or fewer manual input fields?
- [ ] **CRM Auto-population:** If the user already filled out a lead form on the current visit, are those values passed to the scheduling widget automatically via URL parameters to prevent duplicate entry?
- [ ] **Smart Field Enrichment:** Are demographic questions (e.g., company revenue, country, job role) handled by backend tools (Clearbit, ZoomInfo) instead of manual form inputs?
- [ ] **No Optional Fields:** Have all non-essential and optional fields been removed?
- [ ] **Mobile-Friendly Inputs:** Are standard form fields (like email or phone) configured with appropriate semantic HTML input types (e.g., `type="email"`, `type="tel"`) to trigger correct mobile keyboards?

---

## 3. Calendar Choice Architecture Audit

Evaluate the layout, dates, and times presented to the user inside the widget.

- [ ] **Reasonable Horizon Limit:** Is the booking horizon constrained to a maximum of 7–14 days in advance? (Preventing long-term bookings that suffer from 50%+ no-show rates).
- [ ] **Buffer Time Configuration:** Are buffer times (e.g., 15 minutes) configured before and after slots to prevent double-bookings and ensure reps are on time?
- [ ] **Slot-Clumping / Grouping:** Is the scheduling widget set to group available slots together rather than presenting a massive, overwhelming grid of empty slots?
- [ ] **Explicit Timezone Detection:** Does the widget auto-detect the user's timezone, and is that timezone clearly displayed on the interface?
- [ ] **Responsive Embed:** Is the calendar embed fully responsive on mobile devices, loading cleanly without horizontal scrollbars?

---

## 4. Post-Booking Confirmation & Momentum Audit

Assess what happens immediately after the user selects a slot and hits confirm.

- [ ] **Custom URL Redirection:** Does the widget automatically redirect the user to a custom, native `/booking-confirmed/` page instead of displaying the default 3rd-party success message?
- [ ] **Value Reinforcement Video/Copy:** Does the success page feature a short video or text clarifying the agenda, expectations, and the representative's profile?
- [ ] **Add to Calendar Shortcut:** Are quick-action buttons provided to allow users to easily add the meeting to Google Calendar, Outlook, or Apple Calendar?
- [ ] **Co-worker Invite Option:** Is there an easy input or link on the success page allowing the booker to invite their colleagues to the meeting?

---

## 5. Booking Attendance & Show-up Cadence Audit

Verify the automation emails and SMS reminders dispatched prior to the call.

- [ ] **Branded Calendar Invitation:** Is the calendar invite sent within 60 seconds, titled with user-centric branding (e.g., `"[Company] <> [Prospect] Inventory Optimization Assessment"`)?
- [ ] **Meeting Details Included:** Does the invite include the direct video meeting link (Zoom, Google Meet, Teams) and the bulleted agenda in the invite body?
- [ ] **24-Hour Personalized Reminder:** Is a personalized reminder email scheduled for 24 hours before the meeting, recapping the value of attending?
- [ ] **1-Hour Urgent Reminder:** Is a short, high-contrast email or SMS notification sent 1 hour before the call with the direct joining link?
- [ ] **Easy Cancellation/Rescheduling:** Are cancellation and reschedule links accessible in all invitations and reminders to prevent frustrating "ghosting" behavior?
