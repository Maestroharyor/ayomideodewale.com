# LinkedIn update — paste-ready

LinkedIn can't be edited from the repo, so this is the copy and the checklist.

**Zero date or title changes.** LinkedIn is the source of truth and its timeline
is already continuous; the resumes and the website were brought into line with
it, not the other way round. Xedla Pay stays off, as agreed.

---

## 1. Headline

```
Fullstack & Platform Engineer | TypeScript, Node, Go | AWS, Terraform, Docker | 7 years in fintech
```

97 characters, inside the 220 limit. Append ` | AWS SAA in progress` if you want
the cert signalled now.

The current headline — _Fullstack Software Developer | Cloud Engineer | Solutions
Architect | AI Engineer_ — claims four titles, three of which nothing on the
profile supports. No experience entry mentions cloud, architecture or AI, and the
certifications are entry-level Microsoft courses. "Solutions Architect" with no
architecture role and no AWS cert costs credibility on the one title you can
fully defend. The analytics agree: 4 search appearances, 16 profile views.

Softer alternative if "Platform" feels like a stretch:

```
Fullstack Engineer | TypeScript, Node, Go | AWS, Terraform | 7 years in fintech
```

## 2. About

First two lines carry the weight — LinkedIn truncates there.

```
Fullstack engineer, 7+ years building and running production systems, mostly in
fintech. I've shipped platforms serving 15,000+ users and I build and operate
multi-tenant SaaS products of my own.

Most of my work is TypeScript: Node and Express behind React and Next.js, with
MongoDB or Postgres underneath. Lately I write a fair amount of Go, mainly small
self-hosted tools: an uptime monitor, a keep-alive service, a notes server on the
standard library.

I own things end to end, which increasingly means the infrastructure too. I
provision AWS with Terraform, run Docker and CI pipelines, and I'm working through
AWS Solutions Architect Associate, with Security+ and AWS Security Specialty after
that.

Seven years of shipping taught me the interesting problems are rarely in the UI.
They're in how services talk to each other, who's allowed to do what, and what the
blast radius is when something breaks. Payment flows, multi-tenant access control
and platforms at scale mean I've had to answer those in practice rather than in
theory.

I'm open to remote roles with teams in the UK, US, Canada and Europe, and I work
from Lagos on UTC+1.

More at ayomideodewale.com.
```

Notes:

- The last line covers what the Open To filter can't: remote contractor and EOR
  arrangements need no sponsorship, and the filter alone won't surface you for them.
- Fixes the grammar error in the current About: _"30k people who **learns** from
  me"_ → _who learn from me_, if you keep that sentence anywhere.

## 3. Experience descriptions

All seven roles currently have a title, company, dates and skill tags, and **not
one has a description**. The section a recruiter actually reads is empty across
your entire career. This is the highest-value hour available to you.

### Full Stack Engineer · Kikokushijo Academy

`Jan 2026 – Present · Tokyo, Japan · Remote`

```
Building and maintaining the learning platform behind a 20-year-old English
academy serving returnee and bilingual students across 11+ campuses in Tokyo,
Yokohama and Chiba, plus a distance-learning cohort studying from anywhere in the
world.

• Shipped a collaborative whiteboard for live lessons, with real-time multi-user editing
• Built attendance tracking across in-person and remote sessions
• Built a no-code form builder so staff can create and change forms without engineering involvement
• Work across separate student and parent portals, each with its own access model
• Own the deploy path: environments, releases and the data layer

TypeScript · React · Node.js · MongoDB · Prisma
```

### Frontend Developer · BPOSeats

`Oct 2023 – Apr 2026 · Cebu, Central Visayas, Philippines · Remote`

```
Led frontend design and development for the company's internal platform, and took
on backend and email infrastructure work alongside it.

• Built and maintained the UI in Vue.js and SCSS, including the responsive component set used across the product
• Improved cross-platform usability and accessibility
• Built server-side features in Django and Django REST Framework, and profiled and rewrote the slowest API endpoints
• Introduced MJML for transactional email so templates render consistently across major clients

Vue.js · JavaScript · SCSS · Django · Figma
```

### Senior Software Developer · Helppo Africa Limited

`May 2023 – Nov 2023 · Lagos, Nigeria · Hybrid`

```
Led development on a financial platform serving over 10,000 active users.

• Designed and integrated REST and GraphQL APIs for the web and mobile clients
• Implemented payment processing and transaction management, including the security controls around them
• Built the mobile experience in Ionic and Angular against the same backend
• Led the team through delivery: scoping, review and release

TypeScript · JavaScript · Angular · Ionic · Node.js · TailwindCSS
```

### Frontend Developer · Summitech Computing Ltd

`Oct 2022 – May 2023 · Lagos, Nigeria · Remote`

```
Built and maintained frontend for enterprise software products.

• Engineered reusable component libraries adopted across multiple products
• Worked on the API layer alongside the frontend, including database query performance
• Worked in two-week sprints with planning and retrospectives

JavaScript · TypeScript · React.js · Bootstrap
```

> Gap: who these enterprise products served (client type or sector) would sharpen
> the opening line. Left generic rather than invented.

### Frontend Developer · VeendHQ

`Feb 2022 – Oct 2022 · Contract`

```
Contract engineer on fintech platforms serving over 15,000 users, at a Techstars
'23 company.

• Built product surfaces in React and Next.js, using server-side rendering and static generation where it helped load performance
• Contributed to the mobile app in React Native against the same APIs
• Wrote unit tests and worked through the defects that reached production

React.js · Next.js · React Native · JavaScript · TypeScript
```

### Senior Software Developer · Fovero Digital Technologies

`Feb 2020 – Jan 2022 · Part-time · Lagos, Nigeria`

```
Led design and delivery of software for agency clients across web and mobile.

• Led a small team through scoping, build and release on client projects
• Mentored junior developers and ran code review
• Worked directly with clients to gather requirements and define scope
• Ran the infrastructure side: provisioning, deployment, DNS, certificates and uptime

JavaScript · Python · PHP
```

### IT Instructor · New Horizons Computer Learning Centers

`Oct 2019 – Feb 2020 · Lagos, Nigeria`

```
Taught programming fundamentals and built web applications for clients.

• Designed and delivered training on core programming concepts
• Built and deployed client web applications in HTML, CSS, JavaScript and PHP

JavaScript · HTML · CSS · PHP
```

> Gap: class size or audience would make the first bullet concrete.

## 4. Projects section

Add via **Add section → Additional → Projects**. Not Experience — that is the
whole point. The same facts in Experience next to a full-time role read as two
employers; in Projects they read as an engineer who builds things.

```
MosesTab — mosestab.com
Tenant-scoped church management SaaS: members, groups, events, attendance, child
check-in and giving. Every church gets its own Stripe Connect account and payouts,
plus SMS text-to-give over a provisioned Twilio number.

Braandly — braandly.com
Multi-tenant brand management platform for teams and agencies. Workspace-scoped
data across 85 models, a versioned public REST API, a hand-built OAuth 2.1
authorization server, and an MCP server exposing 102 tools.

BringVan — bringvan.com
UK moving-company directory built as a programmatic SEO surface: generated
location and company pages, faceted search, and contact-click attribution.

healthcheck-service — github.com/MaestroHaryor/healthcheck-service
Self-hosted uptime monitor written in Go. Checks one endpoint on a schedule
and alerts to Slack and email.
```

Keep each to two or three lines; LinkedIn truncates aggressively here.

## 5. Settings checklist

- [ ] **Open To → United Kingdom, United States, Canada + two European countries.**
      Currently set to Nigeria, so recruiters searching outside Nigeria will not
      match you regardless of the Remote flag. LinkedIn caps at ~5 locations and
      does not accept "Europe" as a region. Netherlands, Ireland and Germany are
      the usual picks for remote-friendly English-language hiring.
      **Still needs your decision: which two.**
- [ ] **Ensure Remote is selected** as a work type.
- [ ] **Reconsider "Recruiters only."** It hides the badge from your current
      employer, but also suppresses the public open-to-work signal.
- [ ] **Name to normal case.** "AYOMIDE ODEWALE" reads as shouting and is a
      common spam signal.
- [ ] **Skills: add Go, Terraform, AWS and Docker**, and reorder so Go sits near
      the top. Then trim from 48 to 15–20 and **remove "Claude Skills"**, which is
      not a professional skill and is currently one of the two surfaced first.
      Move Flutter down unless mobile is a target.
- [ ] **Services: trim to engineering only.** Remove Graphic Design, Web Design
      and UX Design, or hide the section — it currently positions you as a
      freelancer for hire, which pulls against a full-time search.
- [ ] **Prune certifications.** 14 entry-level Microsoft entries from 2022 is
      volume without weight, and MTA was retired in 2022. Prune so AWS SAA stands
      out when it lands.
- [ ] **Add a banner.** Default grey with an "Enhance cover image" prompt is free
      real estate at the top of the profile, and blank reads as unfinished.
- [ ] **Push past 500 connections.** Below 500 LinkedIn shows the exact number,
      which reads as a thin network and limits reach by network distance.

## 6. A note on numbers

Do not publish "47+ churches, 4,800+ members, 6 countries" anywhere. Those figures
came from the marketing site, and nothing in the MosesTab codebase substantiates
them — the site's own about page quotes different, larger numbers. Source real
figures from the production database or the Stripe dashboard before using any.

The two user numbers that **are** safe are the ones tied to employment: 10,000+
active users at Helppo and 15,000+ at VeendHQ.

## 7. Not a settings change, but worth knowing

Recent posts are getting 13–15 impressions, 148 over seven days. The content is
good and on-topic for engineering hiring, so this is a distribution problem, not a
content problem. Posting into a 340-connection network caps reach before the
algorithm gets a say, which is the other reason the connection count matters.
