# Diagnostic Strategy Session — Emails

This file contains two sections:
1. **Post-booking confirmation email** — sent automatically by GoHighLevel immediately after booking. Contains the intake link.
2. **Nurture email sequence** — sent to quiz result recipients to move them toward booking.

---

## POST-BOOKING EMAIL (GoHighLevel)

This email is sent by GoHighLevel immediately after a booking is confirmed. It contains the link to the long-form pre-session intake in the app.

**Where to set this up in GHL:**
Calendar → Diagnostic Strategy Session calendar → Notifications → Booking Confirmation → Edit the confirmation email template

**Subject:** Your Diagnostic Strategy Session is confirmed — one short form before we meet

**Preview text:** Takes about 10 minutes. Helps me prepare.

---

**Body copy:**

Your session is confirmed. I will be there and I will come prepared.

Before we meet, I need you to complete a short pre-session intake. It takes about 10 minutes. It covers 12 questions about your current situation, what you have already tried, and what you most want to get out of the session.

This is not optional — it is how I prepare. Without it, I am starting from scratch.

**Complete the pre-session intake here:**

[INTAKE LINK]

https://app.guinwhite.com/diagnostic-intake.html

If you have questions before the session, reply to this email.

Guin

---

**Implementation notes:**

- Replace `[INTAKE LINK]` with your actual intake URL once the domain is live.
- The canonical URL for the intake form is: `https://app.guinwhite.com/diagnostic-intake.html`
- The intake form submits to the Google Apps Script endpoint and notifies guin.white@gmail.com on completion.
- In GHL, set this as the booking confirmation email under: Calendar → Diagnostic Strategy Session → Notifications → Appointment Confirmation.
- Apply the tag `booked-diagnostic-session` on booking to suppress this contact from the nurture sequence below.

---

## NURTURE EMAIL SEQUENCE

**Scope:** Applies to four diagnosis paths: offer_clarity, sales_system, overwhelm, implementation.  
**Goal:** Move qualified leads from quiz result to booked Diagnostic Strategy Session ($297).  
**Sequence length:** 5 emails over 9 days.

---

## Email 1 — "You may be solving the wrong problem"

**Send timing:** Day 0, immediately after quiz results are delivered  
**Subject:** You may be solving the wrong problem  
**Preview text:** Your diagnosis came back. Here is what to do with it.

---

**Body copy:**

You just got your diagnosis. And if you are like most people who take this quiz, part of you already knew.

You have probably been working on this for a while. Trying things. Some of them helped. Some of them did not. And there is a version of you that has been quietly wondering whether you are solving the actual problem, or just the most visible one.

That is what this sequence is about.

Most business bottlenecks are not mysterious. They are just misidentified. A coach with a sales problem thinks they have a marketing problem, so they post more content. A consultant with a positioning problem thinks they have a lead volume problem, so they run ads. A freelancer with an implementation gap thinks they need a better strategy, so they buy another course.

The motion keeps going. The needle barely moves.

Your result flagged one specific bottleneck. That is the starting point, not the full picture. What tends to matter more is understanding why that bottleneck exists, what it is costing you in real terms, and what one clear move would actually shift it.

That is the work we do in a Diagnostic Strategy Session.

It is 60 minutes. It is $297. It is focused entirely on your situation.

More on what it actually looks like in a few days. For now, just sit with the result. See if it resonates.

**Primary CTA label:** Book a Diagnostic Strategy Session  
**Primary CTA link:** https://link.aibizconnection.com/widget/bookings/diagnostic-strategy-session

---

**Personalization notes by path:**

- **offer_clarity:** Add after "part of you already knew": "Your result pointed to offer clarity, which usually means the product exists but the positioning, the messaging, or the ICP definition is fuzzy enough that buyers hesitate."
- **sales_system:** Add after "part of you already knew": "Your result pointed to a sales system gap, which usually means leads are coming in but not converting in a reliable, repeatable way."
- **overwhelm:** Add after "part of you already knew": "Your result pointed to overwhelm, which is rarely just about having too much to do. It is usually about too many open loops, too few clear priorities, and decisions that keep getting deferred."
- **implementation:** Add after "part of you already knew": "Your result pointed to an implementation gap, which usually means you have done the thinking, you have the plan, but the thing has not been built yet."

---

## Email 2 — "What misdiagnosis looks like in business"

**Send timing:** Day 2  
**Subject:** What misdiagnosis looks like in practice  
**Preview text:** Smart people do this all the time.

---

**Body copy:**

Here is a pattern that shows up constantly.

A consultant is not closing. Their conversion rate is low, inquiries come in, calls happen, and then nothing. Their diagnosis: they need better marketing. They rewrite their website. They hire a copywriter. They start a newsletter. Six months later, the conversion rate is the same.

The problem was never marketing. They had enough attention. The sales conversation itself was broken. No clear follow-up process. No structured next step. No system for handling "I need to think about it." Marketing was the visible problem. Sales was the actual one.

Another version: a founder has positioning that shifts every few months. Their messaging does not quite land. They assume the fix is more content, more presence, more visibility. They start a podcast. Traffic goes up. Revenue does not.

The problem was not visibility. It was that they were not sure exactly who they were talking to or what made the offer distinctly worth choosing. Visibility amplified the confusion.

One more: someone has everything mapped out. The offer is clear. The audience is defined. The strategy makes sense on paper. But nothing has been built. They keep planning. The launch date keeps moving. The problem is not strategy, it is execution, and often it is a capacity or tooling issue, not a motivation one.

Misdiagnosis is not a character flaw. It is what happens when you are too close to your own situation to see the actual constraint.

That is exactly what the Diagnostic Strategy Session is designed to cut through.

**Primary CTA label:** Book a Diagnostic Strategy Session  
**Primary CTA link:** https://link.aibizconnection.com/widget/bookings/diagnostic-strategy-session

---

**Personalization notes by path:**

- **offer_clarity:** Lead with the founder/positioning example.
- **sales_system:** Lead with the consultant/conversion example.
- **overwhelm:** Add a fourth pattern: "Someone who is genuinely capable keeps starting things and not finishing them. They call it discipline. It is actually decision fatigue — too many open choices, too many half-built systems, and no clear constraint to organize around."
- **implementation:** Lead with the third example (mapped out but not built).

---

## Email 3 — "The cost of trying to fix the wrong bottleneck"

**Send timing:** Day 4  
**Subject:** The real cost of the wrong fix  
**Preview text:** Not fear, just honesty.

---

**Body copy:**

This is not about catastrophizing. It is just worth being clear-eyed about what working on the wrong problem actually costs.

The obvious cost is time. If you spend six months building a content strategy when the actual bottleneck is your sales process, you lose six months. That is real.

But there is a less obvious cost, and it tends to matter more.

When the work does not produce results, you start questioning the wrong things. You wonder if your niche is too small, if your pricing is wrong, if you are not cut out for this kind of business. You revise things that did not need revising. You second-guess decisions that were actually fine. Misdiagnosis produces not just wasted motion but accumulated self-doubt about things that were never the actual problem.

The third cost is optionality. Every month you spend on the wrong fix is a month you are not putting momentum behind the right one. That compounds.

None of this is meant to create urgency. You will make the right call about timing.

But if the quiz flagged a real bottleneck, the question worth sitting with is: how long have you already been working around it instead of directly at it? And how much longer is that approach likely to take?

A 60-minute session to get that clear is not a big investment relative to another quarter of motion in the wrong direction.

**Primary CTA label:** Book a Diagnostic Strategy Session  
**Primary CTA link:** https://link.aibizconnection.com/widget/bookings/diagnostic-strategy-session

---

**Personalization notes by path:**

- **offer_clarity:** Add: "For offer clarity issues in particular, the cost is often measured in audience trust. Every unclear message is a signal people read, even if they do not articulate it."
- **sales_system:** Add: "For sales system gaps, the math is direct: if you are converting at 10% when the system could support 25%, every 10 leads that come in is 1.5 clients you are leaving behind."
- **overwhelm:** Adjust tone: "For overwhelm specifically, the cost is not just business performance. It is the erosion of confidence in your own capacity to decide and execute. That is worth addressing before it becomes identity."
- **implementation:** Add: "For implementation gaps, the cost is usually the compounding value of the thing that has not been built yet. Every week the system is not live is a week it is not working for you."

---

## Email 4 — "What happens in a Diagnostic Strategy Session"

**Send timing:** Day 6  
**Subject:** What actually happens in the session  
**Preview text:** No fluff. Here is what it looks like.

---

**Body copy:**

Before you book something, you should know what you are getting into. Here is exactly what happens in a Diagnostic Strategy Session.

**Before the session:** You will get a short intake form. It covers your current offer, your revenue stage, what you have already tried, and where you feel stuck. The goal is to make sure the 60 minutes does not go to context-setting.

**During the session:** We start from your diagnosis and go deeper. The quiz result is a signal, not a conclusion. In the session, we figure out whether it is accurate, what is underneath it, and what one clear move would actually shift it. There is no sales pitch inside the session. It is diagnostic and strategic work.

**What you leave with:**
- A clear articulation of your actual primary bottleneck
- One specific recommended next step, with reasoning
- If applicable, a recommendation for one of the build options or a free resource that maps directly to your situation

**What it is not:** It is not a coaching call with homework. It is not a generic audit. It is not a discovery call dressed up as a strategy session.

**Why $297:** Because it is real work. An hour of focused diagnostic thinking on your specific situation has real value, and the flat rate keeps it accessible without undervaluing what goes into it.

If you have been sitting on this, that is understandable. Most people book within a week or two of the quiz, but there is no expiration on the invitation.

**Primary CTA label:** Book your session  
**Primary CTA link:** https://link.aibizconnection.com/widget/bookings/diagnostic-strategy-session

---

**Personalization notes by path:**

- **offer_clarity:** Add in the "what you leave with" section: "If your bottleneck is offer clarity, you will leave with a sharper articulation of who the offer is for, what makes it worth choosing, and what is muddying the positioning currently."
- **sales_system:** Add: "If your bottleneck is a sales system gap, you will leave with a clear view of where the system is breaking down and one concrete structural fix."
- **overwhelm:** Add: "If your primary bottleneck is overwhelm, the session usually surfaces two or three decisions that have been stalled and creates a clear ranked order for addressing them."
- **implementation:** Add: "If your bottleneck is implementation, you will leave with a clear scoped first build, including whether it is something you can handle alone or something that benefits from outside capacity."

---

## Email 5 — "Clear invitation"

**Send timing:** Day 9  
**Subject:** The invitation, plainly stated  
**Preview text:** No pressure. Just the offer.

---

**Body copy:**

You have had this email sequence for nine days now. You know what the session is. You have a sense of whether it is relevant to where you are.

So this is just the direct version.

If your diagnosis resonated, and if you have a sense that you have been working around a real bottleneck rather than directly at it, the Diagnostic Strategy Session is worth doing.

It is 60 minutes. It is $297. You leave with a clear diagnosis and one specific recommended next step.

If the timing is not right, that is a real answer. You can come back to this when it is.

If you are not sure whether the session applies to your situation, that uncertainty is actually a decent reason to book it. "I am not sure what the real problem is" is precisely what the session is for.

There is no follow-up pressure after this email. The booking link stays open. Whenever you are ready, it is there.

**Primary CTA label:** Book the Diagnostic Strategy Session  
**Primary CTA link:** https://link.aibizconnection.com/widget/bookings/diagnostic-strategy-session

---

**Personalization notes by path:**

- **offer_clarity:** Consider adding: "If you are not sure your offer is positioned as clearly as it could be, that ambiguity has a cost. It is worth getting a clear view of it."
- **sales_system:** Consider adding: "If leads are coming in and not converting the way you expect, that pattern is worth diagnosing directly."
- **overwhelm:** Softer close: "If overwhelm is making it hard to even decide about this, that is worth noting. Choosing not to engage is itself a kind of decision. A session might be the thing that creates the clarity to move."
- **implementation:** Consider adding: "If you know what needs to be built and it still has not been built, that gap usually has a specific cause. It is worth finding out what it is."

---

## Where to edit

### Booking URL
All five emails contain the placeholder `https://link.aibizconnection.com/widget/bookings/diagnostic-strategy-session`. Live booking link: https://link.aibizconnection.com/widget/bookings/diagnostic-strategy-session — confirm payment collects $297 and confirmation email fires before activating the sequence.

### Segmenting by diagnosis path in GoHighLevel

The four diagnosis paths (offer_clarity, sales_system, overwhelm, implementation) should be captured as tags at the moment the quiz is completed. The recommended tag format:

- `diag-offer-clarity`
- `diag-sales-system`
- `diag-overwhelm`
- `diag-implementation`

To send path-specific variants in GoHighLevel:
1. Create the base email as a template.
2. Use GHL's conditional content blocks (if available in your plan) to swap in path-specific paragraphs by checking the contact's diagnosis tag.
3. Alternatively, create four separate workflow branches — one per path — each using a slightly customized version of the email template. Trigger the appropriate branch based on the tag applied at quiz completion.

If you are using ConvertKit:
1. Apply a tag at opt-in based on the quiz result passed via URL parameter or webhook (e.g., `?path=offer_clarity`).
2. Use ConvertKit's conditional email blocks or create separate sequences per tag with a shared base template.
3. Use automations to route contacts into the correct sequence based on the tag.

### Suggested tags to apply per email open and click

Apply these tags in GHL using workflow triggers on email open and link click events within each nurture email:

| Email | On open | On click (CTA) |
|---|---|---|
| Email 1 | `nurture-email-1-opened` | `nurture-email-1-clicked` |
| Email 2 | `nurture-email-2-opened` | `nurture-email-2-clicked` |
| Email 3 | `nurture-email-3-opened` | `nurture-email-3-clicked` |
| Email 4 | `nurture-email-4-opened` | `nurture-email-4-clicked` |
| Email 5 | `nurture-email-5-opened` | `nurture-email-5-clicked` |
| Any CTA click | | `diagnostic-session-interest` |
| Booking confirmed | | `booked-diagnostic-session` (applied by booking workflow, not email workflow) |

Use the open and click tags to identify engaged contacts who have not yet booked. These contacts are good candidates for a manual outreach or a sixth email if you add one later. The `diagnostic-session-interest` tag can trigger a secondary workflow with a softer follow-up.
