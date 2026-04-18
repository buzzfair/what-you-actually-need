# GHL Setup Checklist — What You Actually Need

Complete source of truth for all GoHighLevel configuration.
Work through items in order. Each section is self-contained.

**Live intake URLs (confirmed HTTP 200):**
- Diagnostic intake: https://app.guinwhite.com/diagnostic-intake.html
- AI Build intake:   https://app.guinwhite.com/ai-build-intake.html

---

## ITEM 1 — AI Sprint Session: Booking Confirmation Email

**Where:** Automations → Workflows → New Workflow → Start from Scratch
(or open existing "AI Sprint Session — Booking Confirmation" if already created)

**Trigger:** Customer Booked Appointment
**Filter:** Calendar = AI Sprint Session (not Diagnostic, not Visibility)
**Email step delay:** 0 (immediate)

---

### Subject
```
You're booked for your AI Build Sprint
```

### Body
```
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
```

**After email step → Add Tag:** `booked-ai-build-sprint`

**Checklist:**
- [ ] Trigger filter: AI Sprint Session calendar only
- [ ] Email delay: 0
- [ ] Intake URL in body: https://app.guinwhite.com/ai-build-intake.html
- [ ] Tag: booked-ai-build-sprint
- [ ] Workflow published

---

## ITEM 2 — Diagnostic Strategy Session: 24-Hour Reminder Email

**Where:** Automations → Workflows → New Workflow → Start from Scratch
(separate workflow from the booking confirmation)

**Trigger:** Appointment Reminder
**Filter:** Calendar = Diagnostic Strategy Session only
**Timing:** 24 hours before appointment start time

---

### Subject
```
Reminder: Your Diagnostic Strategy Session with Guin
```

### Body
```
Hi {{contact.first_name}},

This is a reminder about your upcoming Diagnostic Strategy Session.

Here are your session details:
- Date: {{appointment.start_time}}
- Session: Diagnostic Strategy Session
- Format: Virtual

Before we meet:
If you haven't completed your Diagnostic intake yet, please take a few minutes to do that now:

https://app.guinwhite.com/diagnostic-intake.html

Your responses help me:
- understand the situation you're in
- see what you've already tried
- focus our time on clarity, strategy, and next steps

If you need to reschedule, you can use the reschedule link in your original confirmation email or reply here and let me know.

Talk soon,
Guin
```

**This is in addition to the booking confirmation email — not instead of it.**

**Checklist:**
- [ ] Trigger: Appointment Reminder
- [ ] Filter: Diagnostic Strategy Session calendar only
- [ ] Timing: 24 hours before appointment
- [ ] Intake URL in body: https://app.guinwhite.com/diagnostic-intake.html
- [ ] Workflow published
- [ ] Separate from the booking confirmation workflow

---

## ITEM 3 — Diagnostic Strategy Session: Short-Form Booking Questions

**Where:** Calendars → Diagnostic Strategy Session → Edit → Forms / Additional Questions tab

Add these 6 fields in order. Drag to reorder after adding.

---

**Field 1**
Label: What's the main situation, challenge, or decision you want support with in this session?
Type: Long text (paragraph)
Required: Yes

**Field 2**
Label: What have you already tried so far?
Type: Long text (paragraph)
Required: Yes

**Field 3**
Label: What feels most true right now?
Type: Single select (radio or dropdown)
Required: Yes
Options:
1. I need clarity on what's actually going on
2. I know the issue, but I'm unsure what to do next
3. I'm overwhelmed and need a grounded strategy
4. I need an outside perspective on a specific decision

**Field 4**
Label: What would make this session feel like a clear win for you?
Type: Long text (paragraph)
Required: Yes

**Field 5**
Label: How urgent is this right now?
Type: Single select (radio or dropdown)
Required: No
Options:
1. I need direction as soon as possible
2. I'd like clarity within the next 2 weeks
3. I'm planning ahead for the next 30 days
4. I'm exploring and not in a rush

**Field 6**
Label: Is there anything important you want me to know before we meet?
Type: Long text (paragraph)
Required: No

**Checklist:**
- [ ] All 6 fields added to Diagnostic Strategy Session calendar
- [ ] Fields in correct order (drag to reorder)
- [ ] Fields 1–4 marked required, 5–6 optional
- [ ] Test booking confirms fields appear and save to contact record

---

## ITEM 4 — Diagnostic Strategy Session: Calendar Invite Description

**Where:** Calendars → Diagnostic Strategy Session → Edit → Event/Appointment tab
(look for "Event Description", "Calendar Description", or "Appointment Notes")

**Event title:**
```
Diagnostic Strategy Session with Guin
```

**Location:**
```
Virtual – see meeting link in your confirmation email
```

**Description:**
```
Thank you for booking a Diagnostic Strategy Session.

Purpose:
This session is for a clear, grounded look at what's actually happening in your business, what's in the way, and what's most worth doing next.

We'll focus on:
- understanding your current situation and context
- clarifying what's really going on (not just the surface problem)
- identifying the most leveraged next moves
- outlining what to stop, start, or change

Before we meet:
- Please complete your Diagnostic intake form (link in your confirmation email) at least 24 hours before our session.
- Have any relevant notes, numbers, or key dates handy so you don't have to go looking mid-call.

What to expect:
- This is a working session, not a pitch.
- We'll move between zoomed-out context and specific, practical recommendations.
- You'll leave with a clearer understanding of your situation and concrete next steps.

If you need to reschedule:
Use the reschedule link in your confirmation email or contact Guin directly.
```

**Checklist:**
- [ ] Title set: Diagnostic Strategy Session with Guin
- [ ] Location set
- [ ] Description saved
- [ ] Meeting link (Zoom/Google Meet) connected via calendar integration
- [ ] Test booking confirms invite description appears correctly

---

## ITEM 5 — AI Sprint Session: 24-Hour Reminder Email

**Where:** Automations → Workflows → New Workflow → Start from Scratch
(separate workflow from the booking confirmation)

**Trigger:** Appointment Reminder
**Filter:** Calendar = AI Sprint Session only
**Timing:** 24 hours before appointment start time

---

### Subject
```
Reminder: Your AI Build Sprint with Guin
```

### Body
```
Hi {{contact.first_name}},

This is a reminder about your upcoming AI Build Sprint.

Here are your session details:
- Date: {{appointment.start_time}}
- Session: AI Build Sprint
- Format: Virtual

Before we meet:
If you haven't completed your AI Build intake yet, please take a few minutes to do that now:

https://app.guinwhite.com/ai-build-intake.html

Your responses help me:
- understand what you want built
- see the constraints and context around it
- focus our time on decisions, implementation, and shipping something useful

If you need to reschedule, you can use the reschedule link in your original confirmation email or reply here and let me know.

Talk soon,
Guin
```

**This is in addition to the booking confirmation email — not instead of it.**

**Checklist:**
- [ ] Trigger: Appointment Reminder
- [ ] Filter: AI Sprint Session calendar only
- [ ] Timing: 24 hours before appointment
- [ ] Intake URL in body: https://app.guinwhite.com/ai-build-intake.html
- [ ] Workflow published
- [ ] Separate from the booking confirmation workflow

---

## ITEM 6 — AI Sprint Session: Calendar Invite Description

**Where:** Calendars → AI Sprint Session → Edit → Event/Appointment tab

**Event title:**
```
AI Build Sprint with Guin
```

**Location:**
```
Virtual – see meeting link in your confirmation email
```

**Description:**
```
Thank you for booking an AI Build Sprint.

Purpose:
This session is for building or significantly advancing one specific AI-powered asset, workflow, or system in your business.

We'll focus on:
- clarifying what you want built and why
- mapping the constraints, tools, and dependencies
- making key decisions quickly
- implementing or prototyping as much as possible in the time we have

Before we meet:
- Please complete your AI Build intake form (link in your confirmation email) at least 24 hours before our session.
- Have any relevant logins, links, and existing assets handy so we can move straight into decisions and implementation.

What to expect:
- This is a working sprint, not a high-level overview.
- We'll alternate between making decisions, structuring the build, and implementing live.
- You'll leave with a concrete build, prototype, or clearly defined implementation plan.

If you need to reschedule:
Use the reschedule link in your confirmation email or contact Guin directly.
```

**Checklist:**
- [ ] Title set: AI Build Sprint with Guin
- [ ] Location set
- [ ] Description saved
- [ ] Meeting link (Zoom/Google Meet) connected via calendar integration
- [ ] Test booking confirms invite description appears correctly

---

## ITEM 7 — AI Sprint Session: Short-Form Booking Questions

(Also documented in ghl-booking-form-fields.md)

**Where:** Calendars → AI Sprint Session → Edit → Forms / Additional Questions tab

**Field 1:** What do you want to build during or as a result of this sprint? · Long text · Required
**Field 2:** What outcome are you hoping this build will create for your business? · Long text · Required
**Field 3:** How clear is the scope right now? · Single select · Required
  Options: I know exactly what I want built / I know the general direction, but not the full scope / I have the problem, but not the solution yet / I'm not fully sure yet
**Field 4:** What have you already tried so far? · Long text · Required
**Field 5:** What timeline feels most realistic for this? · Single select · Required
  Options: As soon as possible / Within the next 2 weeks / Within the next 30 days / I'm exploring, but not ready yet
**Field 6:** What would make this session feel like a clear win for you? · Long text · Required

---

## Master Checklist

| Item | Status |
|---|---|
| AI Sprint Session — booking confirmation email | [ ] Done |
| Diagnostic Strategy Session — booking confirmation email | [ ] Done |
| Diagnostic Strategy Session — 24-hour reminder email | [ ] Done |
| AI Sprint Session — 24-hour reminder email | [ ] Done |
| Diagnostic Strategy Session — 6 short-form booking questions | [ ] Done |
| AI Sprint Session — 6 short-form booking questions | [ ] Done |
| Diagnostic Strategy Session — calendar invite description | [ ] Done |
| AI Sprint Session — calendar invite description | [ ] Done |
| Test booking: Diagnostic (questions + confirmation + reminder scheduled + invite) | [ ] Done |
| Test booking: AI Sprint (questions + confirmation + reminder scheduled + invite) | [ ] Done |

---

## Merge Tag Notes

Test these with a real booking — GHL tag names vary by account version:

| Expected tag | May also be |
|---|---|
| `{{contact.first_name}}` | usually consistent |
| `{{appointment.start_time}}` | `{{appointment.startTime}}` |
| `{{contact.full_name}}` | `{{contact.name}}` |

If a tag renders as raw text in the email, check GHL Settings → Email → Merge Tags or use the variable picker in the email builder.

---

## Related Files

| File | Contents |
|---|---|
| ghl-workflow-setup.md | Full workflow architecture spec |
| ghl-booking-form-fields.md | Full field spec for both calendars |
| diagnostic-session-emails.md | Nurture sequence (5 emails) |
| ai-build-sprint-emails.md | AI Build confirmation copy + short-form questions |
