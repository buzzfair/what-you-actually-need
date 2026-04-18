# GHL Booking Form Fields — Short-Form Intake Questions

These questions are added directly to the GHL calendar booking forms.
They appear at the time of booking, before payment is collected.
Keep them as-is — they are intentionally short. The detailed intake happens in the app after booking.

---

## How to add these in GHL

1. Go to **Calendars** in the left nav
2. Find the calendar → click **Edit** (pencil icon) or open **Settings**
3. Navigate to the **Forms** tab (may also be labeled "Custom Fields", "Questions", or "Additional Questions")
4. Click **Add Field** or **Add Question** for each field below
5. Set field type, label, and required toggle
6. For single-select fields, add each option in the exact order listed
7. **Drag to reorder** so fields appear in the numbered sequence shown
8. Save → test with a booking to confirm fields render

---

## CALENDAR 1 — Diagnostic Strategy Session

### Field 1
**Label:** What's the main situation, challenge, or decision you want support with in this session?
**Field type:** Long text (paragraph)
**Required:** Yes

---

### Field 2
**Label:** What have you already tried so far?
**Field type:** Long text (paragraph)
**Required:** Yes

---

### Field 3
**Label:** What feels most true right now?
**Field type:** Single select (radio buttons or dropdown)
**Required:** Yes
**Options (in this order):**
1. I need clarity on what's actually going on
2. I know the issue, but I'm unsure what to do next
3. I'm overwhelmed and need a grounded strategy
4. I need an outside perspective on a specific decision

---

### Field 4
**Label:** What would make this session feel like a clear win for you?
**Field type:** Long text (paragraph)
**Required:** Yes

---

### Field 5
**Label:** How urgent is this right now?
**Field type:** Single select (radio buttons or dropdown)
**Required:** No
**Options (in this order):**
1. I need direction as soon as possible
2. I'd like clarity within the next 2 weeks
3. I'm planning ahead for the next 30 days
4. I'm exploring and not in a rush

---

### Field 6
**Label:** Is there anything important you want me to know before we meet?
**Field type:** Long text (paragraph)
**Required:** No

---

### Required vs optional summary — Diagnostic

| # | Field | Required |
|---|---|---|
| 1 | Main situation / challenge / decision | Yes |
| 2 | What you've already tried | Yes |
| 3 | What feels most true right now | Yes |
| 4 | What a win looks like | Yes |
| 5 | Urgency | No |
| 6 | Anything else to know | No |

---
---

## CALENDAR 2 — AI Sprint Session

### Field 1
**Label:** What do you want to build during or as a result of this sprint?
**Field type:** Long text (paragraph)
**Required:** Yes

---

### Field 2
**Label:** What outcome are you hoping this build will create for your business?
**Field type:** Long text (paragraph)
**Required:** Yes

---

### Field 3
**Label:** How clear is the scope right now?
**Field type:** Single select (radio buttons or dropdown)
**Required:** Yes
**Options (in this order):**
1. I know exactly what I want built
2. I know the general direction, but not the full scope
3. I have the problem, but not the solution yet
4. I'm not fully sure yet

---

### Field 4
**Label:** What have you already tried so far?
**Field type:** Long text (paragraph)
**Required:** Yes

---

### Field 5
**Label:** What timeline feels most realistic for this?
**Field type:** Single select (radio buttons or dropdown)
**Required:** Yes
**Options (in this order):**
1. As soon as possible
2. Within the next 2 weeks
3. Within the next 30 days
4. I'm exploring, but not ready yet

---

### Field 6
**Label:** What would make this session feel like a clear win for you?
**Field type:** Long text (paragraph)
**Required:** Yes

---

### Required vs optional summary — AI Sprint

| # | Field | Required |
|---|---|---|
| 1 | What to build | Yes |
| 2 | Intended outcome | Yes |
| 3 | Scope clarity | Yes |
| 4 | What you've already tried | Yes |
| 5 | Timeline | Yes |
| 6 | What a win looks like | Yes |

---

## GHL field type notes

GHL calendar booking forms support:
- **Text** — single-line short answer
- **Large Text / Paragraph** — multi-line long answer (use this for all "long text" fields above)
- **Radio** — single select, displayed as radio buttons (use for all single-select fields above)
- **Dropdown** — single select, displayed as a dropdown (alternative to radio — either works)
- **Checkbox** — multi-select (not used here)

If GHL does not offer a "Large Text" type on the calendar form specifically (some GHL versions restrict this), use the standard Text field. The answer will still save and appear in CRM contact notes.

If field label character limits apply in your GHL version, shorten the label slightly. The question meaning should not change. Longest label in this spec: "What's the main situation, challenge, or decision you want support with in this session?" (87 characters).

---

## After adding fields

1. Send yourself a test booking for each calendar
2. Confirm all 6 fields appear in the correct order
3. Confirm required fields block submission if left empty
4. Confirm responses appear on the contact record in GHL after submission
5. Tag the contact `booked-diagnostic-session` or `booked-ai-build-sprint` in the post-booking workflow (see `ghl-workflow-setup.md`)
