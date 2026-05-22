# What You Actually Need

A calm, diagnostic web app that helps coaches, consultants, introverted founders, and solo experts stop buying the wrong solution and identify what they actually need next.

**Live app:** [app.guinwhite.com](https://app.guinwhite.com)
**Fallback:** [buzzfair.github.io/what-you-actually-need](https://buzzfair.github.io/what-you-actually-need/)

---

## What It Does

Eight targeted questions. One of five result paths. A specific diagnosis, a free resource, and a recommended next step — not a generic pitch.

The app is a decision tool designed to build trust through accuracy. It is not a lead magnet.

---

## Who It's For

Introverted coaches, consultants, and solo experts in the $50K–$500K range who are stuck at a specific bottleneck and buying the wrong solutions.

---

## Diagnostic Paths

| Path | Core Diagnosis |
|---|---|
| **Offer Clarity** | Your business is not broken. Your offer is blurred. |
| **Visibility** | The issue is not your brilliance. It is your discoverability. |
| **Sales System** | You do not have a sales problem. You have a follow-through problem. |
| **Overwhelm** | You are not behind. You are overextended. |
| **Implementation** | You already know enough. The issue is execution friction. |

Each result includes: diagnosis, explanation, what to stop pursuing, what to do instead, a best next move, a primary CTA, a free resource link, and a secondary recommendation.

---

## Architecture

### App owns the user experience

| File | Role |
|---|---|
| `index.html` | Full diagnostic app — 8-question quiz, scoring, 5 result paths, routing logic |
| `visibility-planning-session.html` | Offer page — Visibility Planning Session |
| `diagnostic-strategy-session.html` | Offer page — Diagnostic Strategy Session |
| `ai-build-sprint.html` | Offer page — AI Build Sprint |
| `diagnostic-intake.html` | Long-form pre-session intake (12 questions, standalone) |
| `ai-build-intake.html` | Long-form pre-sprint intake (12 questions, standalone) |
| `diagnostic-thankyou.html` | Post-intake confirmation page — Diagnostic session |
| `build-thankyou.html` | Post-intake confirmation page — AI Build Sprint |
| `offer-clarity-mini-audit.html` | Free resource — Offer Clarity path |
| `calm-visibility-rhythm-planner.html` | Free resource — Visibility path |
| `noise-reduction-reset.html` | Free resource — Overwhelm path |
| `execution-friction-finder.html` | Free resource — Implementation path |
| `follow-up-leak-finder.html` | Free resource — Sales System path |

### GHL owns the backend

GoHighLevel handles:
- Booking calendars and payment collection
- Short intake questions at booking (6 questions per session)
- CRM contact creation and tagging
- Post-booking confirmation emails (with app intake link)
- Nurture email sequences
- Workflow automation

**Do not rebuild any user-facing experience inside GHL.** The app handles everything the user sees.

### Google Sheets / Apps Script owns response logging

Long-form intake submissions (both Diagnostic and AI Build) post to a shared Apps Script web app endpoint. The script routes by `form_type`, logs to the appropriate sheet tab, and sends an owner notification email.

- Sheet: [What You Actually Need — Responses](https://docs.google.com/spreadsheets/d/1VN7oqBFcjxT4MmiLOR4D09upGW8KzqREZWHslmyQZt4/edit)
- Script source: `tracker-script.js`
- Sheet tabs: `Results`, `Diagnostic Intake`, `AI Build Intake`

---

## Paid Offers

| Offer | Price | Booking |
|---|---|---|
| Visibility Planning Session | 60 min · $297 · virtual | [Book](https://link.aibizconnection.com/widget/bookings/visibility-planning-session) |
| Diagnostic Strategy Session | 60 min · $297 · virtual | [Book](https://link.aibizconnection.com/widget/bookings/diagnostic-strategy-session) |
| AI Build Sprint | Starting at $750 · fixed scope · virtual | [Book](https://link.aibizconnection.com/widget/bookings/ai-sprint-session) |

---

## Two-Stage Intake Architecture

Both paid sessions use a two-stage intake system:

**Stage 1 — GHL (at booking)**
Six short questions collected inside GoHighLevel when the person books. Minimal friction. Purpose: basic qualification and context.

**Stage 2 — App (post-booking)**
Long-form intake linked in the GHL booking confirmation email. 12 questions. Hosted in the app. Submissions go to Google Sheets and trigger an owner notification.

| Session | Long-form intake URL |
|---|---|
| Diagnostic Strategy Session | `https://app.guinwhite.com/diagnostic-intake.html` |
| AI Build Sprint | `https://app.guinwhite.com/ai-build-intake.html` |

---

## Key Config Locations

### index.html — top-level CONFIG block (~line 965)

```js
const CONFIG = {
  visibilitySession: {
    bookingUrl: '...',   // GHL booking link
  },
  diagnosticSession: {
    bookingUrl: '...',   // GHL booking link
    intakeUrl:  'diagnostic-intake.html',
  },
  aiBuild: {
    bookingUrl: '...',   // GHL booking link
    intakeUrl:  'ai-build-intake.html',
  },
}
```

All three booking URLs are live. Search for `EDIT THIS` in any file to find editable values.

### diagnostic-strategy-session.html — page-level config (~line 1353)

```js
const DIAGNOSTIC_BOOKING_URL = '...';  // wires all CTAs on the page
```

### ai-build-sprint.html — page-level config (~line 913)

```js
const AI_BUILD_BOOKING_URL = '...';    // wires all CTAs on the page
```

### diagnostic-intake.html and ai-build-intake.html — intake config

```js
const INTAKE_ENDPOINT = '...';         // Apps Script Web App URL
const SHEET_TAB_NAME  = '...';         // sheet tab name (must match tracker-script.js)
```

---

## tracker-script.js — Routing Table

| form_type | Handler | Sheet Tab |
|---|---|---|
| (default / quiz result) | `handleQuizResult()` | Results |
| `diagnostic_intake` | `handleIntakeSubmission()` | Diagnostic Intake |
| `ai_build_intake` | `handleAiBuildIntake()` | AI Build Intake |

---

## Deployment

### Hosting

GitHub Pages, branch: `main`, root directory.

| URL | Status |
|---|---|
| `https://app.guinwhite.com` | Live — custom domain, HTTPS enforced |
| `https://buzzfair.github.io/what-you-actually-need/` | Live fallback |

### Custom domain

- `CNAME` file at repo root contains: `app.guinwhite.com`
- DNS: `app.guinwhite.com` CNAME → `www.buzzfair.github.io`
- Do not delete the `CNAME` file — GitHub Pages will lose the custom domain

### Run locally

No build step. Open any file directly in a browser or use a static server:

```bash
npx serve .
```

---

## GHL Implementation Status

| Item | Status |
|---|---|
| Visibility Planning Session calendar | Live |
| Diagnostic Strategy Session calendar | Live |
| AI Sprint Session calendar | Live |
| Diagnostic confirmation workflow + email | Live |
| AI Build Sprint confirmation workflow + email | Live |
| Short intake forms (6 questions per session) | Live |
| Apps Script — all three handlers active | Live |

See `ghl-workflow-setup.md` for full copy-paste workflow specs.
See `ghl-implementation-plan.md` for full GHL architecture notes.
See `diagnostic-session-emails.md` for Diagnostic confirmation email + nurture sequence.
See `ai-build-sprint-emails.md` for AI Build confirmation email + short intake questions.

---

## Design Notes

- Single-page static HTML files — no framework, no build tool, no dependencies
- Embedded CSS and JS per file
- Design tokens: warm stone palette (`#f5f3ef` bg, `#8e4f6a` primary)
- Typography: Zodiak display + Work Sans body
- Light and dark mode (system preference + manual toggle)
- Mobile-first, psychologically safe, non-coercive tone throughout
- Voice: direct, intelligent, grounded, incisive, slightly contrarian, non-promotional

---

*Built for [Guin White](https://guinwhite.com)*

---

## Uptime Monitoring

A GitHub Actions workflow runs every 30 minutes and checks all critical pages.

**File:** `.github/workflows/uptime.yml`
**Schedule:** Every 30 minutes, 24/7
**Pages monitored:**
- `https://app.guinwhite.com/` — homepage / main app
- `https://app.guinwhite.com/diagnostic-strategy-session.html`
- `https://app.guinwhite.com/ai-build-sprint.html`
- `https://app.guinwhite.com/visibility-planning-session.html`
- `https://app.guinwhite.com/diagnostic-intake.html`
- `https://app.guinwhite.com/ai-build-intake.html`
- `https://link.aibizconnection.com/widget/bookings/ai-sprint-session` — GHL booking page (3 retries, 20s timeout)

**How you get alerted:** If any page returns a non-success status, the workflow automatically opens a GitHub Issue labeled `uptime` with the failed page, timestamp, and a direct link to the run log. Duplicate issues are suppressed — only one open issue at a time. Issues close automatically on recovery.

**View run history:** [github.com/buzzfair/what-you-actually-need/actions](https://github.com/buzzfair/what-you-actually-need/actions)

**Trigger manually:** Go to Actions → Uptime Monitor → Run workflow.

---

## Affiliate Links — Current Status

All affiliate cards are live. Each result path shows one affiliate recommendation block with an inline disclosure. `showAffiliate` must be `true` in the diagnosis object for the block to render.

| Path | Card | Program | Status |
|---|---|---|---|
| Offer Clarity | `affiliateRec` | Think Like a Strategist (Introvert Media) | Live |
| Visibility | `affiliateRec` | Quso.ai | Live |
| Sales System | `secondaryRec` | Client Connector — AI Biz Connection | Live |
| Sales System | `affiliateRec` | 3-6 Month Evergreen Email Sequence (Introvert Media) | Live |
| Overwhelm | `affiliateRec` | Productive AF (Introvert Media) | Live |
| Implementation | `affiliateRec` | ClickUp AI Super Agents Course (Introvert Media) | Live |

### How to update an affiliate link

1. Open `index.html`
2. Find the diagnosis object for the path you want to update
3. Replace the `url` value in `affiliateRec` or `secondaryRec`
4. Set `showAffiliate: true` if it is not already
5. Commit and push — GitHub Pages deploys automatically

### Repo notes

- Scoring logic: A → offer_clarity, B → visibility, C → sales_system, D (Q1/Q5/Q7) → overwhelm, D (Q2/Q3/Q4/Q6/Q8) → implementation
- Tiebreak priority: offer_clarity > visibility > sales_system > overwhelm > implementation
- Tracker endpoint fails silently — never blocks the user
