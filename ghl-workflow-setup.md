# GHL Workflow Setup — Booking Confirmation Emails

Both workflows follow the same pattern:
- Trigger: Customer Booked Appointment (filtered to one calendar)
- Step 1: Send Email (immediate, 0 delay)
- Step 2: Internal notification (optional — see below)
- Step 3: Apply tag

The GHL Workflow API is not publicly accessible for programmatic creation.
Use this file as your paste-ready GHL UI spec. Each workflow takes about 5 minutes to build.

---

## WORKFLOW 1 — Diagnostic Strategy Session Confirmation

### Workflow Name
`Diagnostic Strategy Session — Booking Confirmation`

### Where to build it
Automations → Workflows → + New Workflow → Start from Scratch

---

### Trigger

- Trigger type: **Customer Booked Appointment**
- Filter: **Calendar = Diagnostic Strategy Session**
  - In the trigger settings, open "Filters" and select the Diagnostic Strategy Session calendar by name
  - This ensures the workflow does not fire for AI Sprint Session or Visibility Planning Session bookings

---

### Step 1 — Send Confirmation Email (immediate)

- Action type: **Send Email**
- Delay: **0 minutes** (send immediately)
- From name: Guin White
- From email: your sending address in GHL (e.g. guin@guinwhite.com or your GHL-verified sender)
- Reply-to: guin@guinwhite.com

**Subject:**
```
Your Diagnostic Strategy Session is confirmed
```

**Preview text:**
```
Please complete the short intake before we meet.
```

**Body (paste as HTML or use rich-text editor — plain text version below):**

---

Hi {{contact.first_name}},

Your Diagnostic Strategy Session is confirmed.

Here are your session details:
- Date: {{appointment.start_time}}
- Session: Diagnostic Strategy Session
- Format: Virtual

Before we meet, please complete the pre-session intake. It takes about 10 minutes and covers your current situation, what you have already tried, and what you most want clarity on.

Complete the pre-session intake here:
https://app.guinwhite.com/diagnostic-intake.html

This is how I prepare. I will review your responses before we meet so we can use the session for diagnosis and decision-making, not background gathering.

A few notes:
- Complete it as soon as you can — ideally at least 24 hours before our session.
- Answer with what feels most true right now. Clear is useful; perfect is not required.
- If something changes before we meet, reply to this email.

If you need to reschedule, use your booking link or reply here.

Looking forward,
Guin

---

**Long-form intake URL used:** `https://app.guinwhite.com/diagnostic-intake.html`

---

### Step 2 — Apply Tag (immediate, after email)

- Action type: **Add Tag**
- Tag: `booked-diagnostic-session`
- This suppresses the contact from the Diagnostic nurture sequence (if active)

---

### Step 3 — Internal Notification (optional)

- Action type: **Send Internal Notification** (or Send Email to team member)
- To: guin.white@gmail.com
- Subject: `New booking: Diagnostic Strategy Session — {{contact.full_name}}`
- Body:

```
New Diagnostic Strategy Session booking.

Name: {{contact.full_name}}
Email: {{contact.email}}
Date: {{appointment.start_time}}

Review in GHL: {{contact.crm_link}}
```

---

### Publish checklist
- [ ] Trigger filter set to Diagnostic Strategy Session calendar only
- [ ] Email sends at 0 delay (immediately on trigger)
- [ ] Intake URL in email: https://app.guinwhite.com/diagnostic-intake.html
- [ ] Tag applied: booked-diagnostic-session
- [ ] Workflow status: Published (not Draft)

---
---

## WORKFLOW 2 — AI Build Sprint Confirmation

### Workflow Name
`AI Sprint Session — Booking Confirmation`

### Where to build it
Automations → Workflows → + New Workflow → Start from Scratch

---

### Trigger

- Trigger type: **Customer Booked Appointment**
- Filter: **Calendar = AI Sprint Session**
  - Open "Filters" in the trigger settings and select the AI Sprint Session calendar by name
  - This workflow does not fire for Diagnostic Strategy Session or Visibility Planning Session

---

### Step 1 — Send Confirmation Email (immediate)

- Action type: **Send Email**
- Delay: **0 minutes** (send immediately)
- From name: Guin White
- From email: your GHL-verified sending address
- Reply-to: guin@guinwhite.com

**Subject:**
```
You're booked for your AI Build Sprint
```

**Preview text:**
```
Takes about 10 minutes. Helps me scope the build before we start.
```

**Body (paste as plain text or rich text):**

---

Hi {{contact.first_name}},

Your AI Build Sprint is confirmed.

Here are your session details:
- Date: {{appointment.start_time}}
- Session: AI Build Sprint
- Format: Virtual

To make this sprint as effective as possible, please complete your AI Build intake before we meet:

https://app.guinwhite.com/ai-build-intake.html

This intake helps me:
- understand what you want built
- see the context and constraints around it
- come into the session already oriented, so we can move faster

A few notes:
- Complete the intake as soon as you can, ideally at least 24 hours before our session.
- If something changes, answer with what feels most true right now. Clear is helpful; perfect is not required.
- I'll review your responses before we meet so we can spend our time on decisions and implementation, not basic fact-finding.

If you need to reschedule, use your booking link or reply to this email.

Looking forward,
Guin

---

**Long-form intake URL used:** `https://app.guinwhite.com/ai-build-intake.html`

---

### Step 2 — Apply Tag (immediate, after email)

- Action type: **Add Tag**
- Tag: `booked-ai-build-sprint`

---

### Step 3 — Internal Notification (optional)

- Action type: **Send Internal Notification** (or Send Email)
- To: guin.white@gmail.com
- Subject: `New booking: AI Build Sprint — {{contact.full_name}}`
- Body:

```
New AI Build Sprint booking.

Name: {{contact.full_name}}
Email: {{contact.email}}
Date: {{appointment.start_time}}

Review in GHL: {{contact.crm_link}}
```

---

### Publish checklist
- [ ] Trigger filter set to AI Sprint Session calendar only
- [ ] Email sends at 0 delay (immediately on trigger)
- [ ] Intake URL in email: https://app.guinwhite.com/ai-build-intake.html
- [ ] Tag applied: booked-ai-build-sprint
- [ ] Workflow status: Published (not Draft)

---
---

## Calendar Isolation — Confirmed

| Workflow | Fires for | Does NOT fire for |
|---|---|---|
| Diagnostic Strategy Session — Booking Confirmation | Diagnostic Strategy Session | AI Sprint Session, Visibility Planning Session |
| AI Sprint Session — Booking Confirmation | AI Sprint Session | Diagnostic Strategy Session, Visibility Planning Session |

The Visibility Planning Session calendar should have its own separate confirmation workflow
(or use the built-in GHL calendar notification). Its intake flow is not app-gated.

---

## What GHL Cannot Do Automatically

| Item | Status |
|---|---|
| Workflow API creation | Not available — must be built in GHL UI |
| Email HTML templating | Use GHL email builder or paste plain text |
| {{contact.crm_link}} | May not be a native GHL merge tag — replace with a static link to your GHL contacts page if needed |
| {{appointment.start_time}} | Confirm exact GHL merge tag name in your account — may be {{appointment.startTime}} or {{appointment.start_date_time}} |

---

## GHL Merge Tags — Confirm These Before Publishing

GHL merge tag names vary slightly by account configuration. Before publishing each workflow, send a test booking to yourself and confirm these resolve:

- `{{contact.first_name}}` — should resolve to first name
- `{{appointment.start_time}}` — may need to be `{{appointment.startTime}}` — test first
- `{{contact.full_name}}` — may need to be `{{contact.name}}`

If any tag renders as raw text (not replaced), check GHL's merge tag list under Settings → Email → Merge Tags or in the email builder's variable picker.
