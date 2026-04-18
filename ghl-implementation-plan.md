# GoHighLevel Implementation Plan — "What You Actually Need"

**Last updated:** June 2025  
**External app:** app.guinwhite.com (GitHub Pages — handles diagnosis and routing; does not move into GHL)  
**GHL handles:** Booking, payment, CRM, segmentation, automation, nurture, reminders, post-session follow-up

---

## 1. Calendars

### Visibility Planning Session
| Field | Value |
|---|---|
| Calendar name | Visibility Planning Session |
| Duration | 60 minutes |
| Price | $297 |
| Payment required | Yes — collect at booking |
| Buffer before | 10 minutes |
| Buffer after | 15 minutes |
| Max per day | 3 (adjust based on capacity) |
| Tags applied on booking | `booked-visibility-session`, `session-type-visibility` |
| Intake form | Visibility Planning Session Intake (see Section 2) |
| Notes | A booking link for this calendar already exists at https://link.aibizconnection.com/widget/bookings/visibility-planning-session — confirm payment collection is active and intake form is attached before treating it as live |

---

### Diagnostic Strategy Session
| Field | Value |
|---|---|
| Calendar name | Diagnostic Strategy Session |
| Duration | 60 minutes |
| Price | $297 |
| Payment required | Yes — collect at booking |
| Buffer before | 10 minutes |
| Buffer after | 15 minutes |
| Max per day | 3 (adjust based on capacity) |
| Tags applied on booking | `booked-diagnostic-session`, `in-nurture-diagnostic` removed, `session-type-diagnostic` |
| Intake form | Diagnostic Strategy Session Intake (see Section 2) |
| Notes | Create this calendar as a new calendar, separate from the Visibility session. Do not reuse the Visibility calendar link. |

---

**Note on AI Build Sprint:** The Build Sprint does not use a calendar. It uses a standalone inquiry form. Do not create a calendar for it. Scoping and scheduling happen after the inquiry is reviewed.

---

## 2. Forms and Surveys

### Visibility Planning Session Intake
| Field | Detail |
|---|---|
| Name | Visibility Planning Session — Pre-Session Intake |
| Purpose | Collect context before the session so time is spent on strategy, not background |
| Fields | Full name, business/practice name, current primary channel(s) for visibility, what is working now (open text), what is not working or feels unsustainable (open text), one specific outcome you want from this session (open text), anything else relevant (optional open text) |
| Where used | Attached to Visibility Planning Session calendar; sent automatically after booking confirmation |
| Required now | Yes — attach to calendar before treating as live |

---

### Diagnostic Strategy Session Intake
| Field | Detail |
|---|---|
| Name | Diagnostic Strategy Session — Pre-Session Intake |
| Purpose | Collect context on offer, stage, and previous attempts before the session |
| Fields | Full name, business/practice name, current offer(s) and price point(s) (open text), current monthly revenue range (dropdown: pre-revenue, under $2k, $2k-$5k, $5k-$10k, $10k+), diagnosis path from quiz (auto-populated if passed via URL param; otherwise dropdown: offer clarity / sales system / overwhelm / implementation), what have you already tried to address this bottleneck (open text), what would a successful outcome from this session look like (open text), anything else relevant (optional open text) |
| Where used | Attached to Diagnostic Strategy Session calendar; sent automatically after booking confirmation |
| Required now | Yes — attach to calendar before treating as live |
| Notes | If diagnosis path can be passed from the quiz app via URL parameter (e.g., `?path=offer_clarity`), use a hidden field to auto-populate. Otherwise collect it in the form dropdown. |

---

### AI Build Sprint Inquiry Form
| Field | Detail |
|---|---|
| Name | AI Build Sprint — Project Inquiry |
| Purpose | Collect enough context to scope a build engagement and determine fit |
| Fields | Full name, email, business/practice name, what needs to be built (open text — describe the system, tool, or asset), what problem does it solve or what bottleneck does it address (open text), have you had a Diagnostic Strategy Session (yes / no / in progress), current revenue range (same dropdown as above), timeline pressure if any (open text, optional), anything else (optional) |
| Where used | Standalone form, embedded on a thank-you or inquiry page; linked from post-session follow-up emails and recommendation framework |
| Required now | Yes — needed to activate the AI Build Sprint inquiry workflow |
| Notes | Not attached to a calendar. Owner reviews each submission before any scheduling occurs. |

---

### Embedded Quiz Result Capture (Optional)
| Field | Detail |
|---|---|
| Name | Quiz Result Capture — External App |
| Purpose | Capture diagnosis path and email from the external quiz app into GHL CRM without requiring the contact to fill out a separate form |
| Fields | Email (required), diagnosis path (hidden, passed via URL param), quiz completion date (auto-filled with timestamp) |
| Where used | Embedded in or linked from the quiz results page at app.guinwhite.com, or triggered via webhook |
| Required now | No — Priority 3. Manual tagging or a webhook integration can handle this initially |
| Notes | If the quiz app can fire a webhook on quiz completion, use that to create/update the contact in GHL and apply the diagnosis tag directly. The embedded form is a fallback for environments where webhook setup is not yet in place. |

---

## 3. Payments / Products

| Product | Price | Type | Required now | Notes |
|---|---|---|---|---|
| Visibility Planning Session | $297 | Fixed, collected at booking | Yes | Confirm product is attached to Visibility calendar and payment is collected before appointment is confirmed |
| Diagnostic Strategy Session | $297 | Fixed, collected at booking | Yes | Create as new product; attach to Diagnostic calendar |
| AI Build Sprint | Custom / variable | Quote-based, not collected at booking | No — billing handled separately per engagement | GHL does not natively support variable pricing at inquiry. Collect payment via invoice after scope is agreed. Note: do not attach a product to the inquiry form. |

---

## 4. Tags

A consistent tag naming system across all contacts. Use lowercase with hyphens throughout.

### Diagnosis path tags (applied at quiz completion or intake)
- `diag-offer-clarity`
- `diag-visibility`
- `diag-sales-system`
- `diag-overwhelm`
- `diag-implementation`

### Action tags (applied when specific actions are taken)
- `completed-quiz`
- `booked-visibility-session`
- `booked-diagnostic-session`
- `submitted-build-inquiry`
- `intake-form-submitted`

### Nurture stage tags
- `in-nurture-diagnostic` — applied when diagnostic nurture sequence starts
- `nurture-complete` — applied when all 5 nurture emails have been sent
- `session-complete` — applied when a session is marked complete in the calendar

### Engagement tags (applied by email workflows)
- `nurture-email-1-opened` through `nurture-email-5-opened`
- `nurture-email-1-clicked` through `nurture-email-5-clicked`
- `diagnostic-session-interest` — applied when any nurture CTA is clicked

### Post-session recommendation tags
- `recommended-build` — session outcome: AI Build Sprint recommended
- `recommended-visibility` — session outcome: Visibility Planning Session recommended
- `recommended-diagnostic` — session outcome: second Diagnostic Session recommended
- `recommended-free-resource` — session outcome: self-directed work first

---

## 5. Custom Fields

Apply these fields at the contact level. Create them under Settings > Custom Fields in GHL.

| Field name | Type | Purpose |
|---|---|---|
| Diagnosis Path | Dropdown (offer-clarity, visibility, sales-system, overwhelm, implementation) | Primary bottleneck identified by quiz or session; used for segmentation and routing |
| Quiz Completion Date | Date | When the contact completed the quiz; used to calculate nurture send timing and for reporting |
| Session Type Booked | Dropdown (visibility-planning, diagnostic-strategy, none) | Which paid session the contact has booked; drives automation branching |
| Build Inquiry Submitted | Checkbox / Yes-No | Whether the contact has submitted an AI Build Sprint inquiry form |
| Post-Session Recommendation | Text (short) | Owner-entered field after session completion; records what was recommended (e.g., "AI Build Sprint — follow-up sequence") |
| Primary Bottleneck | Text (short) | Owner-entered summary of the primary constraint identified in the session; used in post-session summary template and CRM notes |

---

## 6. Pipeline and Opportunity Stages

**Pipeline name:** What You Actually Need — Clients

One pipeline covering all contacts who have taken a paid action or are in active nurture toward one.

| Stage | Description |
|---|---|
| 1. Quiz completed | Contact completed the external quiz; diagnosis tag applied; may or may not be in nurture |
| 2. Nurture active | Contact is in the 5-email diagnostic nurture sequence |
| 3. Session booked | Contact has booked and paid for a Diagnostic Strategy Session or Visibility Planning Session |
| 4. Session complete | Session has occurred; post-session recommendation has been logged in CRM |
| 5. Build inquiry submitted | Contact has submitted the AI Build Sprint inquiry form |
| 6. Build scoped | Build engagement has been scoped and quoted; awaiting client confirmation |
| 7. Active client | Engagement is underway (Build Sprint in progress) |
| 8. Closed / not a fit | Contact did not convert after full nurture, or session revealed mismatch |

**Notes:**
- Create this as a single pipeline with manual stage movement. Do not auto-advance stages by default — stage transitions should reflect actual status, not automation assumptions.
- The exception: auto-advance from Stage 2 to Stage 3 when the `booked-diagnostic-session` or `booked-visibility-session` tag is applied.

---

## 7. Workflows

### a. Quiz Result Capture
**Trigger:** Form submission (embedded quiz result capture form) or webhook from app.guinwhite.com  
**Action sequence:**
1. Create or update contact with email and quiz completion date
2. Apply `completed-quiz` tag
3. Apply appropriate diagnosis path tag based on form field or webhook payload (e.g., `diag-offer-clarity`)
4. Set custom field: Diagnosis Path
5. Set custom field: Quiz Completion Date (today)
6. Move contact to pipeline Stage 1 (Quiz completed)
7. If diagnosis path is `diag-visibility`: add to Visibility nurture workflow (separate — not covered by this document)
8. If diagnosis path is any of the four non-visibility paths: add to Diagnostic Session Nurture workflow (Workflow e)

**Tags applied:** `completed-quiz`, one diagnosis path tag  
**Emails sent:** None — nurture workflow handles email

---

### b. Visibility Session Booking Confirmation
**Trigger:** Calendar booking confirmed — Visibility Planning Session calendar  
**Action sequence:**
1. Apply tags: `booked-visibility-session`, `session-type-visibility`
2. Move contact to pipeline Stage 3 (Session booked)
3. Send email: Visibility Session Confirmation (see Section 8)
4. Wait until 24 hours before appointment start time
5. Send email: Visibility Session Prep Reminder
6. Notify owner: new Visibility Planning Session booked (name, date, time)

**Tags applied:** `booked-visibility-session`, `session-type-visibility`  
**Emails sent:** Confirmation, 24-hour prep reminder

---

### c. Diagnostic Session Booking Confirmation
**Trigger:** Calendar booking confirmed — Diagnostic Strategy Session calendar  
**Action sequence:**
1. Apply tags: `booked-diagnostic-session`, `session-type-diagnostic`
2. Remove tag: `in-nurture-diagnostic` (stop nurture sequence if active)
3. Move contact to pipeline Stage 3 (Session booked)
4. Send email: Diagnostic Session Confirmation (see Section 8)
5. Wait until 24 hours before appointment start time
6. Send email: Diagnostic Session Prep Reminder
7. Notify owner immediately: new Diagnostic Strategy Session booked (name, date, time, diagnosis path if available)

**Tags applied:** `booked-diagnostic-session`, `session-type-diagnostic`  
**Emails sent:** Confirmation, 24-hour prep reminder  
**Notes:** Owner notification should include the contact's Diagnosis Path custom field value if populated.

---

### d. AI Build Sprint Inquiry Received
**Trigger:** Form submission — AI Build Sprint Inquiry form  
**Action sequence:**
1. Apply tag: `submitted-build-inquiry`
2. Set custom field: Build Inquiry Submitted = Yes
3. Move contact to pipeline Stage 5 (Build inquiry submitted)
4. Send email: AI Build Sprint Inquiry Acknowledgment (see Section 8)
5. Notify owner immediately: new Build inquiry submitted (name, email, form responses)

**Tags applied:** `submitted-build-inquiry`  
**Emails sent:** Inquiry acknowledgment  
**Notes:** Owner reviews each submission manually before any next step. No automated scheduling.

---

### e. Diagnostic Session Nurture
**Trigger:** Tag applied: `completed-quiz` AND diagnosis path is NOT `diag-visibility`  
**Prerequisite:** Contact does not already have `booked-diagnostic-session` tag  
**Action sequence:**
1. Apply tag: `in-nurture-diagnostic`
2. Send Email 1 (Day 0 — immediate)
3. Wait 2 days
4. Send Email 2
5. Wait 2 days (Day 4)
6. Send Email 3
7. Wait 2 days (Day 6)
8. Send Email 4
9. Wait 3 days (Day 9)
10. Send Email 5
11. Apply tag: `nurture-complete`
12. Remove tag: `in-nurture-diagnostic`

**Exit condition:** If `booked-diagnostic-session` tag is applied at any point during the sequence, exit the workflow immediately and do not send remaining emails. The booking confirmation workflow (c) takes over.

**Tags applied:** `in-nurture-diagnostic` at start; `nurture-complete` at end  
**Emails sent:** 5-email sequence (see diagnostic-session-emails.md for full copy)

---

### f. Post-Session Follow-Up
**Trigger:** Session status = Complete (calendar event marked complete) for either Diagnostic or Visibility session  
**Action sequence:**
1. Apply tag: `session-complete`
2. Move contact to pipeline Stage 4 (Session complete)
3. Wait 30 minutes (allows owner time to log post-session notes)
4. Send email: Post-Session Summary Template (personalized with owner-entered CRM fields — see upsell framework)
5. Internal prompt to owner: log Post-Session Recommendation and Primary Bottleneck custom fields
6. Branch on Post-Session Recommendation custom field:
   - If `recommended-build`: apply tag `recommended-build`; ensure Build Inquiry Form link is included in follow-up
   - If `recommended-visibility`: apply tag `recommended-visibility`
   - If `recommended-diagnostic`: apply tag `recommended-diagnostic`
   - If `recommended-free-resource`: apply tag `recommended-free-resource`

**Tags applied:** `session-complete`, one recommended-* tag based on outcome  
**Emails sent:** Post-session summary with upsell routing  
**Notes:** The post-session email template should pull from the Post-Session Recommendation and Primary Bottleneck custom fields. If these fields are not populated by owner before the email sends, the email will have empty slots. Consider adding a 60-minute delay (instead of 30 minutes) to give owner more time to complete notes before the automation fires.

---

## 8. Email Templates

Full copy for nurture emails 1-5 lives in `diagnostic-session-emails.md`. Templates listed here are the additional system emails needed for booking and follow-up flows.

| Template name | Workflow used in | Purpose |
|---|---|---|
| Visibility Session Confirmation | Workflow b | Confirms booking, covers logistics, sets expectations for what to bring |
| Visibility Session Prep Reminder | Workflow b | 24-hour reminder with any prep notes or intake form link if not yet submitted |
| Diagnostic Session Confirmation | Workflow c | Confirms booking, covers logistics, references intake form |
| Diagnostic Session Prep Reminder | Workflow c | 24-hour reminder; remind them to complete intake if not submitted; short note on what to expect |
| AI Build Sprint Inquiry Acknowledgment | Workflow d | Confirms receipt of inquiry; sets expectation for owner response timeline (suggested: within 2 business days) |
| Post-Session Summary Template | Workflow f | Sends diagnosis summary and recommended next step; uses custom fields for personalization; includes CTA for next offer |
| Nurture Email 1 — You may be solving the wrong problem | Workflow e | See diagnostic-session-emails.md |
| Nurture Email 2 — What misdiagnosis looks like in practice | Workflow e | See diagnostic-session-emails.md |
| Nurture Email 3 — The real cost of the wrong fix | Workflow e | See diagnostic-session-emails.md |
| Nurture Email 4 — What actually happens in the session | Workflow e | See diagnostic-session-emails.md |
| Nurture Email 5 — The invitation, plainly stated | Workflow e | See diagnostic-session-emails.md |

---

## 9. Thank-You / Confirmation Pages

| Event | Page | Notes |
|---|---|---|
| Visibility Planning Session booked | `visibility-planning-session.html` — existing thank-you section | Confirm that the GHL calendar redirects to this page after booking confirmation |
| Diagnostic Strategy Session booked | `diagnostic-thankyou.html` | New page to create; should confirm booking, mention intake form, set expectations for the session |
| AI Build Sprint inquiry submitted | `build-thankyou.html` | New page to create; confirm inquiry received, state response timeline, do not set price expectations before scope conversation |

---

## 10. Internal Notifications

| Event | Notification method | Timing | Content |
|---|---|---|---|
| New Diagnostic Session booking | Email or SMS to owner | Immediate | Contact name, session date/time, diagnosis path (if available), link to CRM contact |
| New AI Build Sprint inquiry | Email or SMS to owner | Immediate | Contact name, email, full inquiry form responses, link to CRM contact |
| Session marked complete | Internal GHL task or email prompt | Within 30 minutes of completion | Prompt owner to log Post-Session Recommendation and Primary Bottleneck fields before automated follow-up fires |

---

## 11. Recommended Build Order

### Priority 1 — Required to take bookings and payment

- [ ] Confirm Visibility Planning Session calendar is fully active: payment collection enabled, intake form attached, confirmation workflow live
- [ ] Create Diagnostic Strategy Session calendar (new — separate from Visibility)
- [ ] Create Visibility Planning Session product ($297) and attach to calendar
- [ ] Create Diagnostic Strategy Session product ($297) and attach to calendar
- [ ] Create Visibility Planning Session Intake form and attach to Visibility calendar
- [ ] Create Diagnostic Strategy Session Intake form and attach to Diagnostic calendar
- [ ] Build Visibility Session Booking Confirmation workflow (Workflow b)
- [ ] Build Diagnostic Session Booking Confirmation workflow (Workflow c)
- [ ] Write and upload: Visibility Session Confirmation email template
- [ ] Write and upload: Visibility Session Prep Reminder email template
- [ ] Write and upload: Diagnostic Session Confirmation email template
- [ ] Write and upload: Diagnostic Session Prep Reminder email template

### Priority 2 — Required for lead capture and nurture

- [ ] Create AI Build Sprint Inquiry form (standalone)
- [ ] Build AI Build Sprint Inquiry Received workflow (Workflow d)
- [ ] Write and upload: AI Build Sprint Inquiry Acknowledgment email template
- [ ] Load nurture email copy from `diagnostic-session-emails.md` into 5 GHL email templates
- [ ] Build Diagnostic Session Nurture workflow (Workflow e)
- [ ] Set up quiz result capture: either webhook from app.guinwhite.com or embedded GHL form (Workflow a)
- [ ] Confirm diagnosis path tags are being applied correctly at quiz completion
- [ ] Create thank-you pages: `diagnostic-thankyou.html`, `build-thankyou.html`

### Priority 3 — Optional; improves segmentation and operations

- [ ] Create all custom fields (Section 5)
- [ ] Create the "What You Actually Need — Clients" pipeline with all 8 stages (Section 6)
- [ ] Build Post-Session Follow-Up workflow (Workflow f)
- [ ] Write and upload: Post-Session Summary email template
- [ ] Wire pipeline stage advancement to booking and session-complete triggers
- [ ] Set up engagement tags on email open/click events within nurture workflow
- [ ] Build embedded quiz result capture form as fallback if webhook is not available

---

## A note on the external app

The external app at app.guinwhite.com does not need to be rebuilt in GHL. GHL handles booking, payment, CRM, and automation. The app handles diagnosis and routing.

The integration point between the two is simple: when a contact completes the quiz, their email and diagnosis path need to land in GHL so the correct tag is applied and the correct nurture path starts. This can happen via a GHL form embedded in the results page, a webhook fired from the app, or manual import. Which method to use depends on the technical setup of app.guinwhite.com.
