# Fullstack resume — corrected copy

Paste into the Google Doc (`Ayomide Odewale - Fullstack Developer`) and re-export
over `static/resume.pdf`. This is the interim fix; from Part B this file is
generated from `src/data/resume/roles.ts` instead of maintained by hand.

> **Email:** still the Gmail address. `ayomideodewale.com` has **no MX records**,
> so `ayomide@ayomideodewale.com` cannot receive mail today. Switch only after
> mail is configured on the domain — see the note at the bottom.

---

**AYOMIDE ODEWALE**
Fullstack Software Engineer

+234 903 245 4463 · Lagos, Nigeria · Open to remote (UTC+1)
ayomide.odewale1@gmail.com · ayomideodewale.com
github.com/maestroharyor · linkedin.com/in/ayomide-odewale

---

## PROFESSIONAL SUMMARY

Fullstack engineer with 7+ years building and operating production systems, mostly
in fintech. Experience spans multi-tenant SaaS architecture, payment and transaction
systems, and the infrastructure that runs them. Currently building the learning
platform behind an 11-campus academy in Tokyo, and specialising in cloud
architecture, with AWS Solutions Architect Associate in progress.

## SKILLS

- **Languages:** TypeScript, JavaScript, Go, Python, PHP
- **Frontend:** React, Next.js, Vue, Svelte/SvelteKit, TailwindCSS
- **Backend:** Node.js, Express, Django, REST, GraphQL
- **Data:** PostgreSQL, MongoDB, MySQL, Prisma
- **Cloud & Infrastructure:** AWS, Terraform, Docker, GitHub Actions, Vercel, DigitalOcean

## EXPERIENCE

**Full Stack Engineer** | Kikokushijo Academy (Tokyo, Japan · Remote) | Jan 2026 – Present

- Build and maintain the learning platform for an English academy running 11+ campuses across Tokyo, Yokohama and Chiba, plus a distance-learning cohort studying from anywhere in the world.
- Shipped real-time collaborative features including a multi-user lesson whiteboard and attendance tracking across in-person and remote sessions.
- Built a no-code form builder so staff can create and change forms without engineering involvement.
- Own the deploy path: environments, releases, the data layer and hosting configuration.

`TypeScript` `React` `Node.js` `MongoDB` `Prisma`

**Mobile App Developer** | Xedla Pay (Kwara, Nigeria) | Contract, concurrent | Jan 2023 – Present

- Author AWS infrastructure as code with Terraform, including the production S3 buckets and remote state backend, with versioning, server-side encryption and public-access blocking.
- Build and ship cross-platform mobile applications in Flutter against the platform's APIs.

`Flutter` `Dart` `Terraform` `AWS`

**Frontend Developer** | BPOSeats (Cebu, Philippines · Remote) | Oct 2023 – Apr 2026

- Led frontend development for the company's internal platform in Vue.js and SCSS, building the responsive component set used across the product.
- Built server-side features in Django and Django REST Framework, and profiled and rewrote the slowest API endpoints.
- Introduced MJML for transactional email so templates render consistently across major email clients.

`Vue.js` `JavaScript` `SCSS` `Django` `Figma`

**Senior Software Developer** | Helppo Africa (Lagos, Nigeria) | May 2023 – Nov 2023

- Led development on a financial platform serving over 10,000 active users.
- Designed and integrated REST and GraphQL APIs for the web and mobile clients.
- Implemented payment processing and transaction management, including the security controls around them.

`TypeScript` `Angular` `Ionic` `Node.js` `TailwindCSS`

**Frontend Developer** | Summitech Computing Ltd (Lagos, Nigeria · Remote) | Oct 2022 – May 2023

- Built and maintained frontend for enterprise software products, engineering reusable component libraries adopted across multiple products.
- Worked on the API layer alongside the frontend, including database query performance.

`JavaScript` `TypeScript` `React.js` `Bootstrap`

**Frontend Developer** | VeendHQ (Wyoming, USA) | Contract | Feb 2022 – Oct 2022

- Built and maintained fintech platforms serving over 15,000 users at a Techstars '23 company.
- Used server-side rendering and static generation in Next.js where it helped load performance.
- Contributed to the React Native mobile app against the same APIs.

`React.js` `Next.js` `React Native` `TypeScript`

**Senior Software Developer** | Fovero Digital Technologies (Lagos, Nigeria) | Part-time | Feb 2020 – Jan 2022

- Led design and delivery of web and mobile software for agency clients, from scoping through release.
- Ran the infrastructure side end to end: provisioning, deployment, DNS, certificates and uptime.
- Mentored junior developers and ran code review.

`JavaScript` `Python` `PHP`

**IT Instructor** | New Horizons Computer Learning Centers (Lagos, Nigeria) | Oct 2019 – Feb 2020

- Designed and delivered training on core programming concepts.
- Built and deployed client web applications in HTML, CSS, JavaScript and PHP.

`JavaScript` `HTML` `CSS` `PHP`

## PROJECTS

- **MosesTab** (mosestab.com) — Tenant-scoped church management SaaS: members, events, attendance, child check-in and giving. Per-church Stripe Connect accounts and payouts, SMS text-to-give over Twilio. `React` `TypeScript` `Next.js` `Stripe`
- **Braandly** (braandly.com) — Multi-tenant brand management SaaS. Workspace-scoped data across 85 models, a versioned public REST API, a hand-built OAuth 2.1 server and an MCP server exposing 102 tools. Sole author of the backend. `Next.js` `Express` `MongoDB` `Redis`
- **BringVan** (bringvan.com) — UK moving-company directory built on programmatic SEO: generated location and company pages, faceted search, contact-click attribution. `Next.js`
- **healthcheck-service** (github.com/MaestroHaryor/healthcheck-service) — Self-hosted uptime monitor in Go. Checks one endpoint on a schedule and alerts to Slack and email. `Go`

## EDUCATION

University of Ilorin, Nigeria — B.Sc. Physiology, 2019

## CERTIFICATIONS

AWS Solutions Architect Associate (SAA-C03) — in progress
Planned: CompTIA Security+ · AWS Security Specialty

---

## What changed, and why

- **Dates** now match LinkedIn at month level. VeendHQ `2021 – 2022` → `Feb 2022 – Oct 2022`, and Fovero `2020 – 2021` → `Feb 2020 – Jan 2022` so the two sit adjacent with no phantom gap in January 2022.
- **Kikokushijo Academy added** as the current role; **BPOSeats closed** at Apr 2026. It previously read "2023 – Present", implying a three-year stretch that ended months ago.
- **Fovero** is Senior Software Developer, not Lead or Founder — matching LinkedIn, so the two surfaces can be compared without a title discrepancy. Company name is now "Fovero Digital Technologies", also LinkedIn's form.
- **Invented percentages removed.** The old version ended 16 of 17 bullets in a round number. Five were incoherent on their face, including frontend work "reducing server response time by 30%" and "reducing vulnerabilities by 25%". Three checkable figures remain: 10,000+ users at Helppo, 15,000+ at VeendHQ, 11+ campuses at Kikokushijo. The ratio now sits below one bullet in three, deliberately — every number left is one you can defend.
- **Projects section added**, so Braandly and MosesTab appear without sitting in Experience next to a full-time role.
- **"6+ years" → 7+.** Earliest role is October 2019.
- **Go, Terraform and AWS surfaced.** They were in Skills with nothing behind them; Terraform now has a bullet naming what it provisions, and Go appears via the tooling in Projects.
- **Four MTA certifications removed.** Microsoft retired the programme in 2022, so they read as expired entry-level credentials with nothing since.
- **"Abilities and Interests" removed** — "Solving Puzzles" and "Active Learning" read junior and cost space.
- **LINKS block folded into the header.** In all four current PDFs the heading renders at the bottom of the page while the URLs appear mid-document, jammed after the Summitech section.

## Claims corrected against source

Before publishing, the product repositories were read rather than taken from the
marketing sites. Three things changed as a result:

- **Xedla's Terraform.** The draft claimed "provision and manage AWS: VPC, EC2,
  RDS, IAM, S3". In the repo, the S3 buckets and remote state backend are real
  and applied; the VPC/EC2/ECS/IAM module is written and validated but, by its
  own README, **never applied**; and **RDS appears nowhere** — the product runs on
  MongoDB. The bullet now claims only what is applied.
- **MosesTab traction.** "47+ churches, 4,800+ members, 6 countries" is not
  substantiated by anything in the codebase, and the marketing site itself quotes
  different, larger figures. All of it is out until you can source real numbers
  from the production database or Stripe.
- **Braandly "solo".** Git history shows two collaborators contributing in
  bounded windows, alongside ~85% of frontend commits from you and sole authorship
  of the backend, the link-in-bio app and the MCP server. "Built solo" is gone.

## Two things to action

1. **Email.** `ayomideodewale.com` currently has **no MX records**, so `ayomide@ayomideodewale.com` would silently drop everything sent to it. Set up mail on the domain first (Google Workspace, Fastmail, Zoho), confirm delivery, then swap the address here and on LinkedIn. Until then the Gmail address is the correct one to publish.
2. **Summitech and New Horizons.** Two bullets are written around gaps: who Summitech's enterprise products served, and the class size or audience at New Horizons. Both would be stronger with the specifics.
