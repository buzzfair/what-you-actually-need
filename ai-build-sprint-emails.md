# AI Build Sprint — GHL Implementation Notes

This file covers everything needed to complete the GHL side of the AI Build Sprint booking flow.

---

## POST-BOOKING CONFIRMATION EMAIL (GoHighLevel)

Sent automatically by GoHighLevel immediately after a booking is confirmed and payment is collected.

**Where to set this up in GHL:**
Calendar → AI Sprint Session → Notifications → Appointment Confirmation → Edit confirmation email template

**Subject:** Your AI Build Sprint is booked — one short form before we begin

**Preview text:** Takes about 10 minutes. Helps me scope the build before we start.

---

**Body copy:**

Your session is booked. I'll be there and I'll come prepared.

Before we begin, I need you to complete a short pre-sprint intake. It takes about 10 minutes. It covers what you want built, the outcome you're after, the tools already in play, your timeline, and what a successful sprint would look like for you.

This is not optional — it's how I prepare so we can use the session well from the start.

**Complete your AI Build Sprint intake here:**

[INTAKE LINK]

https://app.guinwhite.com/ai-build-intake.html

If you have questions before the session, reply to this email.

Guin

---

**Implementation notes:**

- Replace `[INTAKE LINK]` with: `https://app.guinwhite.com/ai-build-intake.html`
- Set as the booking confirmation email under: Calendar → AI Sprint Session → Notifications → Appointment Confirmation
- Apply the tag `booked-ai-build-sprint` on booking confirmation
- The long-form intake POSTs to the Google Apps Script endpoint in `tracker-script.js`
- On submission, the script logs responses to the `AI Build Intake` sheet tab and sends a notification email to guin.white@gmail.com

---

## SHORT-FORM BOOKING INTAKE FOR GOHIGHLEVEL

These 6 questions are collected inside GHL at the time of booking. Keep this form short — the detailed intake happens in the app after booking.

**Where to attach in GHL:**
Calendar → AI Sprint Session → Forms/Intake → attach a custom form to this calendar

---

**Question 1**
What do you want to build during or as a result of this sprint?
*(Open text — short answer)*

**Question 2**
What outcome are you hoping this build will create for your business?
*(Open text — short answer)*

**Question 3**
How clear is the scope right now?
*(Single select)*
- I know exactly what I want built
- I know the general direction, but not the full scope
- I have the problem, but not the solution yet
- I'm not fully sure yet

**Question 4**
What have you already tried so far?
*(Open text — short answer, optional)*

**Question 5**
What timeline feels most realistic for this?
*(Single select)*
- As soon as possible
- Within the next 2 weeks
- Within the next 30 days
- I'm exploring, but not ready yet

**Question 6**
What would make this session feel like a clear win for you?
*(Open text — short answer)*

---

## WHAT GHL SHOULD DO AFTER BOOKING

When a booking is confirmed on the AI Sprint Session calendar:

1. Collect payment ($750 minimum — confirm product is attached and payment required before confirmation)
2. Apply tag: `booked-ai-build-sprint`
3. Send the booking confirmation email above (with the intake link)
4. Move contact to pipeline Stage 3 (Session booked) if using the pipeline

Optional workflow additions:
- Send a reminder 24 hours before the session
- Apply tag `intake-submitted` when the long-form intake is completed (requires a webhook or manual tag from Google Apps Script)
- Notify owner (guin.white@gmail.com) on booking — GHL can send an internal notification or you can rely on the Apps Script email on intake submission

---

## GOOGLE SHEET SETUP

Open: https://docs.google.com/spreadsheets/d/1VN7oqBFcjxT4MmiLOR4D09upGW8KzqREZWHslmyQZt4/edit

Add a new tab called: **AI Build Intake**

The Apps Script will auto-create headers on the first submission, or you can add them manually:

| Column | Field |
|---|---|
| A | Timestamp |
| B | Full Name |
| C | Email |
| D | Website |
| E | What Built |
| F | Outcome |
| G | Readiness |
| H | Already Tried |
| I | Tools |
| J | Timeline |
| K | Investment |
| L | Success Definition |
| M | Need Type |

---

## APPS SCRIPT DEPLOYMENT

The intake submission logic is already in `tracker-script.js` under `handleAiBuildIntake()`.

To activate it:

1. Open your Google Sheet
2. Click Extensions → Apps Script
3. Replace all existing code with the updated `tracker-script.js`
4. Click Deploy → Manage Deployments → create a new deployment (or update the existing one)
5. Confirm the Web App URL matches what is set in `ai-build-intake.html`:
   ```
   const AI_BUILD_INTAKE_ENDPOINT = 'https://script.google.com/macros/s/...your-url.../exec';
   ```
   The current file uses the same endpoint as the quiz tracker. This works — `doPost()` routes by `form_type`. No new deployment is needed unless you want a separate script.

---

## WHAT IS STILL PLACEHOLDER

| Item | Status |
|---|---|
| AI Build Sprint booking link | **Live** — `https://link.aibizconnection.com/widget/bookings/ai-sprint-session` |
| Long-form intake page | **Live** — `https://app.guinwhite.com/ai-build-intake.html` |
| Apps Script endpoint | **Live** — reuses existing tracker endpoint, routes by `form_type: 'ai_build_intake'` |
| GHL short-form intake | **Pending** — paste 6 questions above into GHL calendar form |
| GHL confirmation email | **Pending** — paste email copy above into calendar notification settings |
| Payment product in GHL | **Pending** — confirm $750+ product is attached to AI Sprint Session calendar |
| Apps Script redeployment | **Pending** — paste updated tracker-script.js and redeploy as a new version |
