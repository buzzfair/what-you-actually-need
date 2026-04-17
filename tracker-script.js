/**
 * ============================================================
 *  WHAT YOU ACTUALLY NEED — Tracker + Email + Notion Summary
 *  Google Apps Script Web App
 *
 *  This file does three things:
 *    1. doPost()               — receives quiz results, logs to sheet
 *    2. sendFollowUpEmail()    — sends diagnosis-specific email via Gmail
 *    3. weeklyNotionSummary()  — writes weekly distribution to Notion DB
 *
 * ============================================================
 *  SETUP INSTRUCTIONS (one-time, ~5 minutes)
 * ============================================================
 *
 *  STEP 1 — Open your sheet:
 *    https://docs.google.com/spreadsheets/d/1VN7oqBFcjxT4MmiLOR4D09upGW8KzqREZWHslmyQZt4/edit
 *
 *  STEP 2 — Click Extensions → Apps Script
 *
 *  STEP 3 — Delete all existing code. Paste this entire file.
 *
 *  STEP 4 — Fill in CONFIG below:
 *    - SENDER_NAME         your name as it appears in outgoing email
 *    - NOTION_TOKEN        your Notion Internal Integration token (see below)
 *    - NOTION_DATABASE_ID  copy from your Notion database URL
 *
 *  STEP 5 — Deploy as Web App:
 *    Deploy → New deployment
 *    Type: Web app | Execute as: Me | Who has access: Anyone
 *    Authorize when prompted. Copy the Web App URL.
 *
 *  STEP 6 — Paste the Web App URL into index.html:
 *    const TRACKER_ENDPOINT = 'https://script.google.com/macros/s/.../exec';
 *
 *  STEP 7 — Set up the weekly Notion trigger:
 *    Apps Script → Triggers (clock icon) → Add Trigger
 *    Function: weeklyNotionSummary | Time-driven | Week timer | Monday 9am
 *
 *  STEP 8 — Get a Notion Integration Token:
 *    Go to https://www.notion.so/my-integrations → New integration
 *    Name it "Quiz Tracker" | Select your workspace | Copy the token
 *    Then open your Notion database → ... menu → Add connections → Quiz Tracker
 *
 * ============================================================
 */


/* ============================================================
   CONFIG — EDIT THESE VALUES
============================================================ */

var CONFIG = {

  // ── Sheet settings
  SHEET_NAME:        'Results',          // tab name in your spreadsheet

  // ── Sender settings (used in follow-up emails)
  SENDER_NAME:       'Guin',             // ← your name as shown in From field
  SENDER_SUBJECT_PREFIX: '',             // ← optional prefix, e.g. '[WYAN] ' — leave '' to omit

  // ── Notion integration (for weekly summary)
  // Get token at https://www.notion.so/my-integrations
  NOTION_TOKEN:       '',                // ← PASTE your Notion Internal Integration token
  NOTION_DATABASE_ID: 'dbd6723d28b44944842f6ecd3797bc5e', // ← your Weekly Bottleneck Summary DB

  // ── Email delay settings (in days)
  EMAIL_2_DELAY_DAYS: 3,
  EMAIL_3_DELAY_DAYS: 7,

};


/* ============================================================
   EMAIL SEQUENCES
   One entry per diagnosis key. Edit subject lines and body
   copy here. Use \n for line breaks. Keep [YOUR LINK HERE]
   as a placeholder until you have real URLs to swap in.

   To swap in a real link: replace [YOUR LINK HERE] with the URL.
   To disable an email: set enabled: false.
============================================================ */

var EMAIL_SEQUENCES = {

  /* ── OFFER CLARITY ──────────────────────────────────────── */
  offer_clarity: {
    email1: {
      enabled: true,
      subject: 'Your offer is blurred (here is what that means)',
      body: [
        'Your quiz result is: Offer Clarity.',
        '',
        'That does not mean you have a bad offer. It means the offer you have is not yet landing the way it should.',
        '',
        'Here is the short version of your diagnosis: You likely do not have a motivation problem. You have an articulation problem. People cannot trust what they cannot quickly understand.',
        '',
        'The single move that matters most right now is not more content, more traffic, or more visibility. It is getting sharper on what your offer actually is, who it is for, and how to say it in language that meets your buyer where they already are.',
        '',
        'Until that is clear, everything else — the marketing, the sales conversations, the content — is working against a current you do not need to fight.',
        '',
        'The clearest next step is to work on your positioning before anything else. I have put together something that can help you do that:',
        '',
        '[YOUR LINK HERE]',  // ← SWAP: offer clarity resource or session link
        '',
        'Guin',
      ].join('\n'),
    },
    email2: {
      enabled: true,
      delayDays: 3,
      subject: 'The real reason smart people have unclear offers',
      body: [
        'Three days ago you found out your bottleneck is offer clarity.',
        '',
        'Here is the assumption I want to push back on: most people in your situation assume the problem is that they have not found the right words yet. So they rewrite their homepage. They try a new bio. They ask people what they do and tinker with however those people describe it back.',
        '',
        'That is not wrong, exactly. But it is downstream of the real issue.',
        '',
        'The real issue is usually not language. It is scope.',
        '',
        'When an offer tries to serve too many people, solve too many problems, or position itself at too many levels simultaneously, no amount of clever copy fixes it. The words blur because the thinking behind them is still blurred.',
        '',
        'The useful question to sit with is not "how do I say this better?" It is "what am I actually promising, and who specifically is ready to pay for exactly that?"',
        '',
        'One reframe that tends to help: stop trying to describe what you do and start describing the moment your buyer is in when they most need you. The problem they are naming. The thing they have already tried. The outcome they have started to believe is out of reach for them.',
        '',
        'If your offer is named and shaped around that specific moment, it stops needing explanation.',
        '',
        'You do not have a marketing problem yet. Do not let yourself treat it like one.',
        '',
        'Guin',
      ].join('\n'),
    },
    email3: {
      enabled: true,
      delayDays: 7,
      subject: 'What an unclear offer actually costs you',
      body: [
        'If nothing changes with your offer clarity, here is what continues:',
        '',
        'You keep producing content that does not convert because it is pointing at something people cannot quite see. You keep having sales conversations where you work too hard to explain the value instead of confirming it. You keep attracting the wrong clients, or clients who undervalue the work, because the signal you are sending is not yet precise enough to self-select well.',
        '',
        'None of this means you are doing something wrong. It means you are missing one structural thing that, once in place, makes most of the other effort start paying off.',
        '',
        'The clearest next step is to get your offer sharp before you do anything else at scale. That means nailing the positioning, the language, the specific problem you solve, and who you solve it for.',
        '',
        'If you want help doing that, this is where to start:',
        '',
        '[YOUR LINK HERE]',  // ← SWAP: offer clarity session or resource link
        '',
        'Guin',
      ].join('\n'),
    },
  },

  /* ── VISIBILITY ─────────────────────────────────────────── */
  visibility: {
    email1: {
      enabled: true,
      subject: 'Your result: a visibility problem (not the kind you think)',
      body: [
        'Your quiz result is: Visibility.',
        '',
        'This is not a signal that your work is not good enough or that you need to completely rethink your approach. Here is the actual diagnosis: You may already have something valuable. The problem is that too few right people are consistently encountering it.',
        '',
        'The move that matters most right now is not louder marketing, not a social media overhaul, not forcing yourself onto platforms that drain you. It is building a visibility rhythm that fits how you actually work and how your buyers actually build trust.',
        '',
        'You do not need to be everywhere. You need to be findable, consistently, in the right places.',
        '',
        'Here is where I would point you first:',
        '',
        '[YOUR LINK HERE]',  // ← SWAP: visibility resource, workshop, or platform affiliate
        '',
        'Guin',
      ].join('\n'),
    },
    email2: {
      enabled: true,
      delayDays: 3,
      subject: 'The visibility advice that keeps backfiring on introverts',
      body: [
        'The most common thing people do when they discover visibility is their bottleneck is they try to post more.',
        '',
        'More LinkedIn content. More newsletters. More showing up. More.',
        '',
        'And then it becomes exhausting, they pull back, and the inconsistency becomes its own problem. The audience they were trying to build never quite forms because the signal kept going quiet.',
        '',
        'Here is the assumption worth challenging: visibility is not about volume. It is about consistency and proximity to the right people.',
        '',
        'Introverted experts often do better with depth than breadth. One channel, done well and regularly, outperforms five channels done inconsistently. A twenty-minute genuine conversation with a potential referral partner is worth more than a week of posts that nobody saves.',
        '',
        'The reframe that tends to help: instead of asking "how do I get more visible?" ask "where are my actual buyers already paying attention, and what would it take for me to show up there reliably?"',
        '',
        'Reliably is the operative word. The trust that turns a stranger into a buyer is built through repeated, low-pressure encounters with your thinking over time. You do not need a lot of people to see you. You need the right people to see you more than once.',
        '',
        'That is a much more manageable problem than it probably feels right now.',
        '',
        'Guin',
      ].join('\n'),
    },
    email3: {
      enabled: true,
      delayDays: 7,
      subject: 'The slow bleed of inconsistent visibility',
      body: [
        'Here is what the visibility gap tends to look like over time if it does not get addressed:',
        '',
        'The work stays good. The clients who do find you are often happy. But the pipeline stays unpredictable. You go through cycles of feast and scramble that feel like a personal failure but are actually just a structural gap. Referrals come in occasionally but not in a way you can count on. You keep starting things and stopping things because nothing has had enough time to compound.',
        '',
        'The businesses that break this pattern are not usually the loudest ones. They are the ones that picked a simple, sustainable visibility strategy and showed up for it long enough to let it work.',
        '',
        'The next step for you is to build a visibility rhythm that fits your nervous system and your schedule, and then protect it from yourself when you get busy or discouraged.',
        '',
        'If you want to work on that with some support, here is where to go:',
        '',
        '[YOUR LINK HERE]',  // ← SWAP: visibility planning product or session link
        '',
        'Guin',
      ].join('\n'),
    },
  },

  /* ── SALES SYSTEM ───────────────────────────────────────── */
  sales_system: {
    email1: {
      enabled: true,
      subject: 'Your diagnosis: the follow-through gap',
      body: [
        'Your quiz result is: Sales System.',
        '',
        'This is often misread as a confidence problem or a persuasion problem. It is neither. Here is the actual diagnosis: Interest is leaking after the first conversation, click, inquiry, or moment of resonance. The gap is not persuasion. It is structure.',
        '',
        'The most important move right now is not to get better at selling. It is to build a system that does not rely on your memory, your mood, or your ability to follow up perfectly every time.',
        '',
        'You do not need a more aggressive script. You need a humane, repeatable process: follow-up structure, clear sequencing, simple invitations, and a way to stay in front of warm prospects without it feeling like chasing.',
        '',
        'That is very buildable. And it tends to change revenue faster than almost anything else.',
        '',
        'Here is the first step:',
        '',
        '[YOUR LINK HERE]',  // ← SWAP: sales system build, CRM affiliate, or DFY service
        '',
        'Guin',
      ].join('\n'),
    },
    email2: {
      enabled: true,
      delayDays: 3,
      subject: 'Why "I just need to be better at follow-up" keeps failing',
      body: [
        'Most people who identify with the sales system problem tell themselves some version of the same thing: I just need to be more disciplined about following up.',
        '',
        'And then they are not. And they feel bad about it. And the leads keep going cold.',
        '',
        'The assumption worth challenging here is that follow-up is a discipline problem. It is not. It is a systems problem.',
        '',
        'If following up requires you to remember who to contact, know what to say, decide when to reach out, and overcome the ambient awkwardness of reaching out to someone who has gone quiet — that is too many variables. You will fail at it consistently not because you lack discipline but because you have designed something that requires too much from you in the wrong moment.',
        '',
        'The micro-action that makes a real difference: map out what actually happens after someone expresses interest in working with you. Not what you intend to happen. What actually happens. Most people find that the answer is: not much, and not consistently.',
        '',
        'Once you can see the gap, you can fill it. A simple CRM, a two-touch follow-up sequence, a clear calendar link, a templated message you can send without overthinking it — these are not complicated. They just need to exist and be used.',
        '',
        'The goal is not a slick sales machine. It is a process that works even when you are tired, distracted, or a little bit dreading the inbox.',
        '',
        'Guin',
      ].join('\n'),
    },
    email3: {
      enabled: true,
      delayDays: 7,
      subject: 'What the leak is costing you',
      body: [
        'Here is the picture if the follow-through gap stays open:',
        '',
        'Warm leads go cold. Not because they were not interested, but because the moment passed and there was nothing in place to keep the conversation alive. People who were ready to buy from you ended up buying from someone else who followed up once. Revenue stays lower than it should be relative to the interest you are actually generating.',
        '',
        'And the harder part: you start to believe you are bad at sales when the real problem is structural. That story gets expensive over time.',
        '',
        'The good news is that this is one of the most correctable problems in a solo business. A few simple pieces of structure make an enormous difference. You do not need a complicated sales process. You need a reliable one.',
        '',
        'If you want help building it, here is where to start:',
        '',
        '[YOUR LINK HERE]',  // ← SWAP: DFY sales build or CRM recommendation
        '',
        'Guin',
      ].join('\n'),
    },
  },

  /* ── OVERWHELM ──────────────────────────────────────────── */
  overwhelm: {
    email1: {
      enabled: true,
      subject: 'You are not behind. You are overextended.',
      body: [
        'Your quiz result is: Overwhelm.',
        '',
        'This is worth distinguishing carefully from burnout or laziness, which is how it often gets misread. Here is the actual diagnosis: You may be carrying too many inputs, too many options, or too many open loops. That creates drag, second-guessing, and false urgency.',
        '',
        'The move that matters most right now is not another strategy, framework, or productivity system. It is reduction. Triage. Getting the field of view narrow enough that the next obvious move becomes visible again.',
        '',
        'Until you do that, more information will make things worse, not better.',
        '',
        'Here is where I would point you:',
        '',
        '[YOUR LINK HERE]',  // ← SWAP: clarity session booking or simplification resource
        '',
        'Guin',
      ].join('\n'),
    },
    email2: {
      enabled: true,
      delayDays: 3,
      subject: 'The thing that is making you feel more behind than you are',
      body: [
        'Here is the assumption that tends to trap smart, overwhelmed people: if I could just get organized, I could finally move forward.',
        '',
        'So they spend time reorganizing their notes, building a new dashboard, outlining a new system. And it works for about four days. Then the drag returns.',
        '',
        'The thing worth examining is not your organization system. It is your decision debt.',
        '',
        'Decision debt is what accumulates when you have left too many things in an open, unresolved state. The project you have not decided whether to continue or kill. The offer idea you have not said yes or no to. The client situation you have not addressed. The strategy you are still evaluating.',
        '',
        'Every open loop takes up cognitive space whether or not you are actively thinking about it. And the accumulation of those loops is usually what creates the feeling of being behind, even when the actual workload is manageable.',
        '',
        'One useful micro-action: make a short list of everything that is sitting in an unresolved state in your business. Not your to-do list. Just the things where you have not made a decision yet. Then go through each one and either decide, defer with a specific date, or delete it entirely.',
        '',
        'You will not fix overwhelm by doing more. You will fix it by carrying less.',
        '',
        'Guin',
      ].join('\n'),
    },
    email3: {
      enabled: true,
      delayDays: 7,
      subject: 'What overextension looks like in a year',
      body: [
        'If the overextension does not get addressed, here is the trajectory:',
        '',
        'The pace stays unsustainable. The things that matter most keep getting pushed by the things that feel most urgent. Decisions that should be simple continue to take longer than they should. Good opportunities arrive and you do not have the bandwidth to respond to them well. The business works, but it costs more than it should and grows slower than it could.',
        '',
        'Overextension is not usually dramatic. It is just a slow, grinding inefficiency that sits on top of everything you are trying to build.',
        '',
        'The way out is not more discipline or better time management. It is fewer things, more deliberately chosen, executed in a simpler operating rhythm.',
        '',
        'If you want help figuring out what to cut, what to keep, and what to actually focus on, here is where to go:',
        '',
        '[YOUR LINK HERE]',  // ← SWAP: reset diagnostic session or triage resource
        '',
        'Guin',
      ].join('\n'),
    },
  },

  /* ── IMPLEMENTATION ─────────────────────────────────────── */
  implementation: {
    email1: {
      enabled: true,
      subject: 'You already know what to do. Something else is in the way.',
      body: [
        'Your quiz result is: Implementation.',
        '',
        'This one is important to name correctly. Here is the diagnosis: You likely understand what to do. The problem is that the plan is not translating into action with enough ease, structure, or support.',
        '',
        'The move that matters most right now is not more information. More research, more courses, more thinking will not fix an implementation problem. They will deepen it.',
        '',
        'What you need is build support — better scaffolding, faster activation, or someone who can turn the idea into a working asset, workflow, or tool. The thinking is done. Now something needs to actually get built.',
        '',
        'Here is where I would point you first:',
        '',
        '[YOUR LINK HERE]',  // ← SWAP: AI build sprint or implementation offer
        '',
        'Guin',
      ].join('\n'),
    },
    email2: {
      enabled: true,
      delayDays: 3,
      subject: 'Why knowing what to do is not the problem',
      body: [
        'The assumption I want to push back on: most people with an implementation problem believe they need more clarity before they can move forward.',
        '',
        'So they keep researching. They refine the plan. They take one more course, read one more case study, build one more outline. And the thing they need to build stays unbuilt.',
        '',
        'Here is what is usually actually happening: the clarity is already there. What is missing is a forcing function — a structure, a deadline, a collaborator, a piece of accountability that makes it more uncomfortable to not do the thing than to do it.',
        '',
        'Or the gap is more practical than that. The plan exists but no one has turned it into an actual deliverable yet. The landing page is still in a doc. The workshop is still in a voice memo. The offer is still in a Notion page nobody visits.',
        '',
        'The useful reframe is this: knowledge is not an asset until it is deployed. A plan that stays a plan is not progress. It is a form of procrastination that feels productive.',
        '',
        'One micro-action worth trying: take the one thing you have been planning the longest and give yourself a constrained window to ship a rough version of it. Not a polished version. A version that exists. A draft that someone could read. A page that is live. A session you have actually booked.',
        '',
        'The gap between knowing and doing is almost never filled by more knowing. It is filled by doing something small and real, fast.',
        '',
        'Guin',
      ].join('\n'),
    },
    email3: {
      enabled: true,
      delayDays: 7,
      subject: 'The cost of knowing and not building',
      body: [
        'Here is what the implementation gap looks like over time:',
        '',
        'The ideas keep coming. The plans keep getting refined. But the things that would actually change the business — the new offer, the lead magnet, the course, the system, the process — stay in their pre-built state. You stay at the same level of capacity, same constraints, same ceiling, while the ideas for what could change it accumulate without ever becoming real.',
        '',
        'This is one of the quieter forms of stuck. It does not feel like failure because it always looks like thinking, planning, or preparing. But the compound effect of not shipping is significant.',
        '',
        'The path forward is not more information. It is getting something into existence that currently does not exist. That usually means bringing in support, structure, or accountability to close the gap between the plan and the thing.',
        '',
        'If you want help turning what you already know into something that actually works for you, here is where to go:',
        '',
        '[YOUR LINK HERE]',  // ← SWAP: AI build sprint or done-for-you implementation
        '',
        'Guin',
      ].join('\n'),
    },
  },

};


/* ============================================================
   FUNCTION 1 — doPost()
   Receives quiz result from the web app, logs to sheet,
   and schedules follow-up emails if an email was provided.
============================================================ */

function doPost(e) {
  try {
    var data       = JSON.parse(e.postData.contents);
    var sheet      = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEET_NAME);
    var timestamp  = new Date().toISOString();
    var diagnosis  = data.diagnosis  || '';
    var label      = data.label      || '';
    var scores     = data.scores     || '';
    var email      = data.email      || '';

    // Log the result row
    sheet.appendRow([timestamp, diagnosis, label, scores, email]);

    // Schedule follow-up emails if an email address was provided
    if (email && email.indexOf('@') > -1 && EMAIL_SEQUENCES[diagnosis]) {
      scheduleFollowUps(email, diagnosis);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}


/* ============================================================
   FUNCTION 2 — scheduleFollowUps()
   Creates time-based triggers to send emails 2 and 3.
   Email 1 is sent immediately. Emails 2 and 3 are time-delayed
   via ScriptProperties (since triggers can't carry arbitrary data,
   we use PropertiesService to queue the sends).
============================================================ */

function scheduleFollowUps(email, diagnosis) {
  var seq = EMAIL_SEQUENCES[diagnosis];
  if (!seq) return;

  // Email 1 — send immediately
  if (seq.email1 && seq.email1.enabled) {
    sendEmail(email, seq.email1.subject, seq.email1.body);
  }

  // Emails 2 and 3 — queue via Properties and create a polling trigger
  var props = PropertiesService.getScriptProperties();
  var queue = JSON.parse(props.getProperty('EMAIL_QUEUE') || '[]');

  var now = new Date();

  if (seq.email2 && seq.email2.enabled) {
    var sendAt2 = new Date(now.getTime() + (CONFIG.EMAIL_2_DELAY_DAYS * 24 * 60 * 60 * 1000));
    queue.push({ email: email, diagnosis: diagnosis, emailNum: 2, sendAt: sendAt2.toISOString() });
  }

  if (seq.email3 && seq.email3.enabled) {
    var sendAt3 = new Date(now.getTime() + (CONFIG.EMAIL_3_DELAY_DAYS * 24 * 60 * 60 * 1000));
    queue.push({ email: email, diagnosis: diagnosis, emailNum: 3, sendAt: sendAt3.toISOString() });
  }

  props.setProperty('EMAIL_QUEUE', JSON.stringify(queue));

  // Ensure the daily queue processor trigger exists
  ensureQueueProcessorTrigger();
}


/* ============================================================
   FUNCTION 3 — processEmailQueue()
   Runs daily. Checks the queue and sends any emails that are due.
   Set this up as a daily trigger (see SETUP INSTRUCTIONS above),
   or it is created automatically via ensureQueueProcessorTrigger().
============================================================ */

function processEmailQueue() {
  var props = PropertiesService.getScriptProperties();
  var queue = JSON.parse(props.getProperty('EMAIL_QUEUE') || '[]');
  var now   = new Date();
  var remaining = [];

  queue.forEach(function(item) {
    var sendAt = new Date(item.sendAt);
    if (now >= sendAt) {
      // Time to send
      var seq = EMAIL_SEQUENCES[item.diagnosis];
      if (seq) {
        var emailData = seq['email' + item.emailNum];
        if (emailData && emailData.enabled) {
          sendEmail(item.email, emailData.subject, emailData.body);
        }
      }
    } else {
      remaining.push(item);
    }
  });

  props.setProperty('EMAIL_QUEUE', JSON.stringify(remaining));
}


/* ============================================================
   FUNCTION 4 — sendEmail()
   Sends one email via Gmail. Plain text.
============================================================ */

function sendEmail(toAddress, subject, body) {
  var fullSubject = CONFIG.SENDER_SUBJECT_PREFIX + subject;
  try {
    GmailApp.sendEmail(toAddress, fullSubject, body, {
      name: CONFIG.SENDER_NAME,
    });
  } catch (err) {
    // Log errors to the spreadsheet for visibility
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEET_NAME);
    sheet.appendRow([new Date().toISOString(), 'EMAIL_ERROR', err.message, '', toAddress]);
  }
}


/* ============================================================
   FUNCTION 5 — ensureQueueProcessorTrigger()
   Creates a daily trigger for processEmailQueue() if one
   does not already exist. Safe to call multiple times.
============================================================ */

function ensureQueueProcessorTrigger() {
  var triggers = ScriptApp.getProjectTriggers();
  var exists   = triggers.some(function(t) {
    return t.getHandlerFunction() === 'processEmailQueue';
  });
  if (!exists) {
    ScriptApp.newTrigger('processEmailQueue')
      .timeBased()
      .everyDays(1)
      .atHour(8)
      .create();
  }
}


/* ============================================================
   FUNCTION 6 — weeklyNotionSummary()
   Reads the Results sheet for the past 7 days, counts
   diagnosis distribution, and appends a row to your
   Notion Weekly Bottleneck Summary database.

   Run on a weekly trigger (Monday 9am) or manually anytime.
============================================================ */

function weeklyNotionSummary() {
  if (!CONFIG.NOTION_TOKEN || CONFIG.NOTION_TOKEN === '') {
    Logger.log('Notion token not set. Add it to CONFIG.NOTION_TOKEN.');
    return;
  }

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEET_NAME);
  var data  = sheet.getDataRange().getValues();

  // Calculate date range: last 7 days
  var now       = new Date();
  var weekAgo   = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
  var weekStart = Utilities.formatDate(weekAgo, 'UTC', 'yyyy-MM-dd');
  var weekLabel = Utilities.formatDate(weekAgo, 'UTC', 'MMM d') + ' – ' + Utilities.formatDate(now, 'UTC', 'MMM d, yyyy');

  // Count by diagnosis (skip header row)
  var counts = { offer_clarity: 0, visibility: 0, sales_system: 0, overwhelm: 0, implementation: 0 };
  var totalResponses = 0;
  var emailsCaptured = 0;

  for (var i = 1; i < data.length; i++) {
    var row       = data[i];
    var timestamp = new Date(row[0]);
    var diagnosis = row[1];
    var email     = row[4];

    if (timestamp >= weekAgo && timestamp <= now) {
      totalResponses++;
      if (diagnosis && counts.hasOwnProperty(diagnosis)) {
        counts[diagnosis]++;
      }
      if (email && email.toString().indexOf('@') > -1) {
        emailsCaptured++;
      }
    }
  }

  // Determine top bottleneck
  var topKey = 'offer_clarity', topVal = -1;
  var labelMap = {
    offer_clarity: 'Offer Clarity',
    visibility:    'Visibility',
    sales_system:  'Sales System',
    overwhelm:     'Overwhelm',
    implementation:'Implementation',
  };
  Object.keys(counts).forEach(function(key) {
    if (counts[key] > topVal) { topVal = counts[key]; topKey = key; }
  });

  // Build Notion page payload
  var pageData = {
    parent: { database_id: CONFIG.NOTION_DATABASE_ID },
    properties: {
      'Week':             { title:  [{ text: { content: weekLabel } }] },
      'Week Start':       { date:   { start: weekStart } },
      'Total Responses':  { number: totalResponses },
      'Offer Clarity':    { number: counts.offer_clarity },
      'Visibility':       { number: counts.visibility },
      'Sales System':     { number: counts.sales_system },
      'Overwhelm':        { number: counts.overwhelm },
      'Implementation':   { number: counts.implementation },
      'Emails Captured':  { number: emailsCaptured },
      'Top Bottleneck':   { select: { name: labelMap[topKey] } },
    },
  };

  // POST to Notion API
  var options = {
    method:             'post',
    contentType:        'application/json',
    headers: {
      'Authorization':  'Bearer ' + CONFIG.NOTION_TOKEN,
      'Notion-Version': '2022-06-28',
    },
    payload: JSON.stringify(pageData),
    muteHttpExceptions: true,
  };

  var response = UrlFetchApp.fetch('https://api.notion.com/v1/pages', options);
  var result   = JSON.parse(response.getContentText());

  if (result.object === 'error') {
    Logger.log('Notion error: ' + result.message);
  } else {
    Logger.log('Weekly summary written to Notion: ' + weekLabel + ' (' + totalResponses + ' responses)');
  }
}


/* ============================================================
   FUNCTION 7 — doGet()
   Simple health check — visit the Web App URL in a browser
   to confirm the script is deployed and running.
============================================================ */

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'Quiz tracker is running.' }))
    .setMimeType(ContentService.MimeType.JSON);
}
