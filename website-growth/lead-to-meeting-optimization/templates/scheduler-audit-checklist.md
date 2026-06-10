# Lead-to-Meeting Audit Checklist

Use this checklist to identify friction and latency in your current demo or
consultation booking flow.

## 1. The Transition (Form to Calendar)

- [ ] **Instant Action:** Is the user presented with a calendar *immediately*
  after submitting the form?
- [ ] **No Email Requirement:** Can the user book a meeting without having to
  open their inbox first?
- [ ] **Data Persistence:** Does the scheduler pre-fill the user's name and
  email so they don't have to enter it twice?
- [ ] **URL Redirect:** If using a separate page, is the redirect fast (< 1s)
  and clearly labeled (e.g., "Finding the best available rep...")?

## 2. The Scheduler UI/UX

- [ ] **Mobile Responsiveness:** Is the calendar widget easy to use on a mobile
  device without horizontal scrolling?
- [ ] **Time Zone Detection:** Does the tool automatically detect the user's
  local time zone and display it prominently?
- [ ] **Availability Scoping:** Does the calendar limit availability to the next
  5-7 business days to create urgency?
- [ ] **Contrast & Visibility:** Is the "Confirm" or "Schedule" button visually
  distinct from the calendar grid?
- [ ] **Buffer Times:** Are there at least 15-minute buffers between meetings
  to prevent reps from being late or rushed?

## 3. Routing & Qualification

- [ ] **Automated Routing:** Is the lead automatically assigned to a specific
  rep (Round Robin or Territory-based) before the calendar loads?
- [ ] **Qualification Logic:** Does the form filter out "unqualified" leads
  (e.g., students, competitors) before showing the calendar?
- [ ] **Fallback Path:** If no reps are available in the next 3 days, is there
  a "Request a Custom Time" option?

## 4. Post-Booking Gratification

- [ ] **Instant Confirmation:** Does the user land on a success page that
  confirms the exact date and time immediately?
- [ ] **Humanization:** Does the confirmation include a photo and brief bio of
  the person they are meeting with?
- [ ] **Meeting Agenda:** Is there a clear "What to Expect" section or bulleted
  list of outcomes for the call?
- [ ] **Calendar Invitations:** Is a calendar invite sent to the user's email
  within 60 seconds of booking?
- [ ] **Reminder Strategy:** Is there a plan for a 24-hour and 1-hour reminder
  (email or SMS)?

## 5. Performance Metrics

- [ ] **Form-to-Booking Rate:** Target > 40%.
- [ ] **Booking-to-Meeting (Show Rate):** Target > 80%.
- [ ] **Mobile Booking Rate:** Is the conversion rate on mobile within 20% of
  desktop?
