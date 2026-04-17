# What You Actually Need

A calm, diagnostic web app that helps coaches, consultants, introverted founders, and solo experts stop buying the wrong solution and identify what they actually need next.

---

## Overview

Most stuck business owners do not have a motivation problem. They have a misdiagnosis problem. They keep buying the next course, coach, or rebrand when what they actually need is a sharper offer, a consistent visibility rhythm, a follow-up system, or someone to build the thing they already know they should build.

This app is a structured diagnostic tool. It asks eight targeted questions, scores the responses, and routes each user to one of five result paths with a clear, specific next step and relevant resource recommendations.

It is not a lead magnet that ends in a generic sales pitch. It is a decision tool designed to build trust through accuracy.

---

## Who It's For

- Introverted coaches, consultants, and solo experts
- Founders who are smart, overwhelmed, and tired of buying the wrong solution
- Business owners in the $50K–$500K range who already know a lot but are stuck at a specific bottleneck

---

## Diagnostic Paths

Each user lands on one of five result pages based on their score:

| Path | Core Diagnosis |
|---|---|
| **Offer Clarity** | Your business is not broken. Your offer is blurred. |
| **Visibility** | The issue is not your brilliance. It is your discoverability. |
| **Sales System** | You do not have a sales problem. You have a follow-through problem. |
| **Overwhelm** | You are not behind. You are overextended. |
| **Implementation** | You already know enough. The issue is execution friction. |

Each result page includes: short diagnosis, longer explanation, what they probably do not need, what they likely need next, a best next move this week, a primary CTA, a secondary recommendation block, and an optional affiliate disclosure.

---

## Features

- Eight diagnostic multiple-choice questions, one at a time
- Behind-the-scenes scoring that routes to five distinct result paths
- Optional email capture before results (no hard gate — skip is always available)
- Google Sheets result tracker (via Apps Script Web App endpoint)
- Automated Gmail follow-up sequences: 3 emails per diagnosis path (immediate, day 3, day 7)
- Weekly Notion summary of bottleneck distribution for audience analytics
- Fully editable monetization config: affiliate links, paid offer links, CTA copy
- Affiliate disclosure block shown only when `showAffiliate: true` per path
- Light and dark mode (system preference + manual toggle)
- Mobile-friendly, single-page static HTML — no build step, no dependencies

---

## Project Structure

```
what-you-actually-need/
├── index.html           # The entire app — HTML, CSS, and JS in one file
├── tracker-script.js    # Google Apps Script for result tracking + Gmail + Notion
├── email-sequences.md   # Human-readable copy for all 15 follow-up emails
└── README.md            # This file
```

---

## Run Locally

No build step required. Open `index.html` in any browser:

```bash
open index.html
```

Or serve it with any static server:

```bash
npx serve .
# then visit http://localhost:3000
```

The app is fully functional offline. The Google Sheets tracker and Gmail sequences require the Apps Script endpoint to be deployed (see `tracker-script.js`).

---

## Customize

All customizable content lives inside the `<script>` block in `index.html`. Look for the section labeled:

```
CUSTOMIZATION SECTION — EDIT THIS BLOCK
```

### Result copy

Find `const DIAGNOSES = { ... }`

Each of the five diagnosis keys (`offer_clarity`, `visibility`, `sales_system`, `overwhelm`, `implementation`) has:

| Field | What it controls |
|---|---|
| `pathName` | Bold headline at top of results page |
| `shortDiagnosis` | One-sentence diagnosis |
| `explanation` | Longer paragraph |
| `dontNeed` | What they probably do not need |
| `doNeed` | What they likely need next |
| `bestNextMove` | Action-oriented sentence for this week |

### CTA labels and URLs

Inside each diagnosis object:

```js
ctaLabel:    'Clarify the offer',
ctaUrl:      '#',  // ← SWAP: your URL here
ctaSupportText: 'Start with the message before you push harder on marketing.',
```

### Affiliate and tool recommendations

Each diagnosis has:

```js
primaryOffer:  { title, url, body }   // shown in the main CTA section
secondaryRec:  { title, url, body }   // shown below CTA
affiliateRec:  { title, url, body }   // shown only when showAffiliate: true
showAffiliate: false                  // ← set true to reveal affiliate block + disclosure
```

### Custom build offers

Set `primaryOffer.url` or `secondaryRec.url` to your custom build or DFY service page.

### Disclosure text

Find `const DISCLOSURE = { short, long }` and edit the two strings.

### Free resource (global)

Find `const OFFERS = { freeResource: { title, url, body } }` — shown on every result page. Override per-path with `freeResourceOverride` inside a diagnosis.

### Brand config

```js
const BRAND = {
  name: 'Quietly Influential',
  url:  'https://guinwhite.com',
};
```

---

## Monetization Notes

Every link in the app that can be monetized has a `← SWAP:` comment beside it in the script block. There are approximately 20 link slots across five paths. Search for `← SWAP:` in `index.html` to find them all.

Recommended monetization pattern:
- **Offer Clarity path** — paid diagnostic or positioning audit first
- **Visibility path** — affiliate email platform or planning product first
- **Sales System path** — affiliate CRM or DFY follow-up build first
- **Overwhelm path** — paid reset diagnostic or simplification session first
- **Implementation path** — custom AI build offer first

Affiliate disclosures appear inline, above the affiliate block, only when `showAffiliate: true` is set.

---

## Result Tracker (Google Sheets + Gmail + Notion)

See `tracker-script.js` for the full setup. Summary:

1. Deploy the script as a Google Apps Script Web App
2. Paste the Web App URL into `index.html` as `TRACKER_ENDPOINT`
3. Add your Notion integration token to `CONFIG.NOTION_TOKEN`
4. Set up two triggers: `processEmailQueue` (daily) and `weeklyNotionSummary` (weekly)

The tracker logs diagnosis, score breakdown, and optional email to a Google Sheet. If an email is captured, it automatically sends a three-email follow-up sequence via Gmail. The weekly function writes a bottleneck distribution summary to a Notion database.

Email copy lives in the `EMAIL_SEQUENCES` block inside `tracker-script.js`.

---

## Deployment

### Live URLs

| URL | Status |
|---|---|
| **https://www.guinwhite.com** | Custom domain (canonical) — active once DNS is configured |
| **https://buzzfair.github.io/what-you-actually-need/** | Default GitHub Pages URL — live now |

### Static hosting (any provider)

Upload `index.html` to any static host — Netlify, Vercel, Cloudflare Pages, GitHub Pages, or S3.

### GitHub Pages

This repository is published via GitHub Pages from the `main` branch root. The default Pages URL is:

**https://buzzfair.github.io/what-you-actually-need/**

The custom domain `www.guinwhite.com` is configured in GitHub Pages settings and via the `CNAME` file in the repo root. Once DNS is pointed correctly, `www.guinwhite.com` will serve the app and `guinwhite.com` will redirect to `www.guinwhite.com`.

### Domain configuration

The custom domain is set in two places:
- `CNAME` file in the repo root (contains `www.guinwhite.com`)
- GitHub Pages settings under Settings → Pages → Custom domain

To verify or update: go to [github.com/buzzfair/what-you-actually-need/settings/pages](https://github.com/buzzfair/what-you-actually-need/settings/pages).

---

## Notes

- This is intentionally a single-file app. No frameworks, no build tools, no dependencies.
- The scoring logic and question copy should not be changed without re-testing all five result paths.
- The app is designed to work even if the tracker endpoint is not configured — tracking fails silently and never blocks the user.
- All copy, CTAs, and monetization links can be swapped without touching the HTML structure or CSS.

---

*Built for [Guin White](https://guinwhite.com) — Quietly Influential*
