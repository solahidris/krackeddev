---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
inputDocuments:
  - docs/brd.md
documentCounts:
  briefs: 1
  research: 0
  brainstorming: 0
  projectDocs: 0
workflowType: 'prd'
lastStep: 11
project_name: 'krackeddevs-docs'
user_name: 'Muhaiminjuhari'
date: '2025-12-12'
---

# Product Requirements Document - krackeddevs-docs

**Author:** Muhaiminjuhari
**Date:** 2025-12-12

## Executive Summary

**Vision:**
Kracked Devs is an "AI-Augmented Guild" marketplace designed to democratize engineering excellence. It bridges the gap between Malaysian SMEs needing affordable, high-quality talent and "median" developers seeking career growth. By leveraging Agentic AI tools and a rigorous "Talent Transformation" upskilling model, Kracked Devs manufactures elite output from local talent, subsidized by government grants (MDEC, HRD Corp).

**Problem Solved:**
SMEs are priced out of the top 1% talent market, while the vast majority of local developers lack the architectural expertise to deliver senior-level results. Existing platforms are either too expensive (Toptal) or too noisy (JobStreet/FB Groups).

**Target Audience:**

1. **Developers:** Mid-level Malaysian devs and students attracted organically by the high-value bounty program, bootcamps, and job placement opportunities.
2. **SMEs / Brands:** Cost-conscious companies needing vetted, high-trust technical execution.

### What Makes This Special

**The "Talent Transformation" Moat:**
Unlike traditional recruiters that just match existing supply, Kracked Devs *upgrades* the supply.

* **Active Upskilling:** Developers undergo AI-agentic workflow training.
* **Proof-of-Work:** Skills are validated through real-world "Bounties" (paid mini-tasks) before full placement.
* **Gamified Ecosystem:** "Santan Island" provides a unique, engaging way to discover opportunities.
* **Concierge Trust:** Initially manual payment and high-touch operations ensure trust verification before automation, solving the "Cold Start" problem.

## Project Classification

**Technical Type:** Web Application (Marketplace) + SaaS Dashboard features
**Domain:** EdTech (Upskilling) & Recruitment (Hiring)
**Complexity:** Medium-High

* *Note on Payments:* Manual processing for MVP (Concierge model) to reduce initial technical risk.
**Project Context:** Greenfield - New Project

## Success Criteria

### User Success

* **Engagement Liquidity:** Developers see active competition, targeting an average of **15 submissions per bounty**.
* **Financial Validation:** High-performing developers successfully earn payouts, validating their "Elite" journey.

### Business Success

* **Market Validation:** Reaching a Total Payout Volume (TPV) of **RM 10,000.00** from Rare Bounties.
* **Concierge Trust:** 100% successful manual payout processing (0 errors/disputes) to build initial brand trust.

### Technical Success

* **Platform Reliability:** 99.9% uptime for core listing and profile pages.
* **Data Integrity:** 100% accurate capture of GitHub Repo URLs during submission (Critical for manual review).

### Measurable Outcomes

1. **Metric:** Avg Submissions Per Bounty | **Target:** >15
2. **Metric:** Total Payout Volume (TPV) | **Target:** RM 10,000.00
3. **Metric:** Payout Speed (Manual) | **Target:** <48 hours after approval

## Product Scope

### MVP - Minimum Viable Product (Concierge Phase)

* **Authentication:** GitHub/Email Auth + Expanded Onboarding (Location, Role, Seniority).
* **Developer Profile:** Public view with GitHub graph and Manual Stats (Earnings/Wins).
* **Bounty Board:** Read-only list for Users. Admin-controlled posting. Submission via Repo URL form.
* **Payments:** **MANUAL (Concierge).** All transactions processed off-platform/manual bank transfer.
* **Community Hub:** Aggregation dashboard with links to Discord/Socials.

### Growth Features (Post-MVP)

* **Automated Payments:** Integrated Payment Gateway (Stripe/ToyyibPay).
* **Company Dashboard:** Self-service bounty posting and applicant management.
* **Santan Island:** The 2D Gamified World.
* **Bootcamp Integration:** Dedicated LMS modules.

### Vision (Future)

* **Kracked OS:** End-to-end Hiring SaaS.
* **AI Agents:** Automated Code Review and Matchmaking Agents.

## User Journeys

### Journey 1: Aif - From "Tutorial Hell" to Paid Pro

Aif is a junior React developer who feels stuck. He can build simple apps but fails technical interviews for senior roles. He sees a link on Twitter for Kracked Devs.
**The Journey:**

1. **Discovery:** He lands on the site, sees a "Normal Bounty" for a *Landing Page Component* (Reward: RM 150).
2. **Action:** He signs up via GitHub. The "Onboarding" asks for his stack (React) and status (Junior).
3. **The Challenge:** He views the bounty details. It requires "clean code" and "Tailwind." He codes it locally.
4. **Submission:** He pushes to his public GitHub repo and pastes the URL into the Kracked Devs submission form.
5. **The Win:** 24 hours later, he gets an email: "Submission Accepted." He replies with his bank details. Two days later, RM 150 hits his Maybank account.
6. **Outcome:** He sees his Kracked Profile update: "1 Win, RM 150 Earned." He feels validated.

### Journey 2: Sarah - The Skeptical Founder

Sarah runs a boutique marketing agency. She needs a custom calculator for a client's site but can't afford an agency retainer. She's burned by Upwork freelancers ghosting her.
**The Journey:**

1. **Request:** She clicks "Post a Common Bounty" (concierge form) on Kracked Devs. She describes the task.
2. **Concierge Service:** She gets a WhatsApp/Email from the Kracked Admin (You) confirming the specs and price (RM 300).
3. **Trust:** She transfers the funds to Kracked Devs' escrow account (manual bank transfer).
4. **Delivery:** 3 days later, she receives a link to the completed code (hosted demo). It works perfectly.
5. **Outcome:** She didn't have to interview anyone. The "Guild" guaranteed the quality.

### Journey 3: The Admin (Ops) - The Wizard Behind the Curtain

You are operating the platform to ensure trust.
**The Journey:**

1. **Triage:** You see Sarah's bounty request come in via the Admin Dashboard. You approve it and post it live.
2. **Validation:** Aif submits his Repo URL. You click the link, inspect the code standard. It looks good. You mark it "Approved."
3. **Payout:** You verify Sarah's payment is in bank. You manually transfer RM 150 to Aif.
4. **Closure:** You mark the Bounty as "Completed" in the dashboard. The system updates the stats automatically.

### Journey Requirements Summary

* **Onboarding:** granular skill/level capture.
* **Submission System:** Field for "GitHub Repo URL" is mandatory.
* **Admin Dashboard:** Needs "Approve/Reject" flow for Bounties and Submissions, plus basic **User Management** (Ban/Suspend).
* **Notifications:** Email triggers for "Submission Received" and "Bounty Approved."
* **Landing Page:** Must capture attention immediately with the Game positioned in the Hero Section.

## Domain-Specific Requirements

### Fintech & Marketplace Compliance (High Complexity)

**Key Concern:** Funds Handling (Escrow) & Fraud Prevention.

* **Operational Model (MVP):** "Facilitator" Model.
  * **Out of Scope:** Real-time payment processing, automated escrow, in-app wallet.
  * **In Scope:** Status tracking only (Pending -> Approved -> Paid).
* **Legal Disclaimer:** Terms of Service MUST explicitly state "Kracked Devs acts solely as a facilitator/matching platform and does not function as a bank or regulated financial institution."
* **Brand Verification (Anti-Fraud):**
  * **Manual Vetting Process:** Brand submits form -> Admin contacts manually -> Contract Signed -> Funds Transferred to generic Business Account -> Admin toggles "Rare Bounty" to Active.

### Data Privacy & EdTech (Medium Complexity)

**Key Concern:** PDPA Compliance (Malaysia).

* **Scope:** Operations are strictly within Malaysia for MVP.
* **Sensitive Data:** Real Names, Email Addresses, and potentially Bank Details (collected manually via email/WhatsApp for winners).
* **Requirement:**
  * **Data Minimization:** The system should NOT store bank account numbers in the database for MVP. This data is collected logically "Just-in-Time" via manual outreach for payouts to minimize breach risk.
  * **Consent:** Explicit checkbox for PDPA consent during Registration and Bounty Submission.

### Implementation Considerations

* **Audit Trail:** Even if payments are manual, the database must track "Who marked this as paid and when" for operational reconciliation.
* **Manual Workflows:** The "Admin Dashboard" needs fields to input "Contract Ref #" or "Transaction Ref #" (text fields) to link off-platform actions to on-platform records.

## Innovation & Novel Patterns

### Detected Innovation Areas

**1. "Game-First" Discovery (Santan Island)**

* **Concept:** Standard job boards are lists; Kracked Devs makes "job hunting" an exploration game.
* **Novelty:** Gamifying the *discovery layer* of a marketplace. Users find bounties by talking to NPCs or finding "scrolls" on an island, rather than filtering a table.
* **Hypothesis:** This reduces "application fatigue" and increases engagement time.

**2. Supply-Side Talent Manufacturing**

* **Concept:** Most recruiters match existing supply. Kracked Devs *creates* new elite supply.
* **Novelty:** The business model integrates **Upskilling (Bootcamp)** with **Verification (Bounties)** as a single pipeline. It solves the "Chicken and Egg" quality problem of marketplaces.

### Validation Approach

* **Santan Island:** Track "Time Spent on Island" vs "Applications Submitted." If users spend 10 mins playing but 0 mins applying, it's a distraction.
* **Talent Manufacturing:** Track "Graduation Rate" -> "Bounty Win Rate." We need to prove that our "Graduates" win more bounties than random sign-ups.

### Risk Mitigation

* **Gamification Backfire:** If busy devs find the game annoying, we provide a "Quick List View" toggle (standard UI) as a fallback.
* **Review Bottleneck:** "Talent Manufacturing" requires heavy manual grading. Mitigation: High standards for automated linters/tests in submission forms (Post-MVP).

## Web Application & SaaS Requirements

### Project-Type Overview

Kracked Devs is a **Hybrid Web Application**:

* **Public Side:** High-performance, SEO-optimized Marketplace (Next.js SSR).
* **Private Side:** Authenticated Dashboard (SaaS) for Devs, Brands, and Admins.
* **Game Integration:** "Santan Island" runs as an embedded experience within the app.

### Technical Architecture Considerations

* **Framework:** **Next.js (App Router)** is mandatory to ensure Server-Side Rendering (SSR) for all Bounty pages (critical for SEO).
* **Mobile Strategy:** **Responsive Web / PWA.** No native mobile app for MVP. The UI must be fully functional on mobile browsers (Chrome/Safari on iOS/Android).
* **Game Integration:** "Santan Island" (External Build) will be integrated via Component/Canvas embed or Iframe, sharing Auth state with the main app.

### Authentication & Permissions (RBAC)

* **Auth Methods:**
  * **Developers:** GitHub OAuth (Primary) - crucial for portfolio data.
  * **Brands/Admins:** Email + Password.
* **Role-Based Access Control (RBAC):**
  * **Public:** Read-only access to Job Board and Talent Profiles (limited view).
  * **Developer:** Apply for Bounties, Edit Profile, View Earnings.
  * **Brand (SME):** Post Bounties (Concierge), View Submissions (Read-only initially for MVP). *Single Login per Company (No Teams yet).*
  * **Admin:** Full CRUD on Bounties, Users, and Payouts.

### Implementation Considerations

* **SEO Strategy:**
  * Dynamic `og:image` generation for shared Bounty links (Social Cards).
  * Structured Data (JSON-LD) for `JobPosting` schema to appear in Google Jobs.
* **Performance:**
  * Core Web Vitals green score is required (LCP < 2.5s).
  * Lazy loading for the "Santan Island" game assets to prevent blocking the main thread.

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** "Concierge Revenue MVP."

* **Goal:** Prove commercial demand (RM 10k TPV) and "Talent Transformation" effectiveness before automating operations.
* **Resource Requirements:** 1-2 Full Stack Engineers + 1 Ops/Admin (Manual Verification).

### MVP Feature Set (Phase 1)

**Core User Journeys Supported:**

* **Developer:** Sign up, Build Profile, View Bounty, Submit Repo, Get Paid (Manual), View Stats.
* **Brand (Concierge):** Request Bounty (Off-platform form), Pay (Bank Transfer), Receive Code (Email/Link).
* **Admin:** Post Bounty, Verify Submission, Mark Paid.

**Must-Have Capabilities:**

* **Authentication:** GitHub/Email.
* **Bounty Board:** Public SEO-optimized listing.
* **Manual Logic:** "Submit URL" form (No complex file upload).
* **Basic Profile:** GitHub Graph + "Wins" counter (Manually incremented by Admin).
* **Landing Page:** "Game Hero" section, Live Stats (Payouts/Hunters), and Brand CTA.
* **Santan Island:** Basic Embed (Iframe/Canvas) - Single Player exploration as the **Hero Section**.

### Post-MVP Features

**Phase 2: Growth (Automated Scale)**

* **Payment Gateway:** Stripe/ToyyibPay integration for automated payouts.
* **Brand Dashboard:** Self-service posting, candidate review, and invoicing.
* **Automated Contracts:** Dynamic PDF generation for "Work for Hire" agreements.

**Phase 3: Expansion**

* **Kracked OS:** AI Agents for code review and auto-matching.
* **Santan Multiplayer:** Real-time social features.

### Risk Mitigation Strategy

* **Operational Bottleneck (Admin):**
  * *Risk:* You (Admin) get overwhelmed by manual checks.
  * *Mitigation:* High minimum bounty price (RM 150+) reduces volume but maintains value. No "RM 5 micro-tasks."
* **Trust/Fraud:**
  * *Risk:* Brands don't pay.
  * *Mitigation:* Upfront operational escrow (Manual Bank Transfer) before bounty goes live.

## Functional Requirements

### FR Area 1: Authentication & Onboarding

* **FR1:** Users can sign up/login using GitHub OAuth (to verify developer identity).
* **FR2:** Users can sign up/login using Email/Password.
* **FR3:** New Users must complete an Onboarding flow capturing: "Current Role" (e.g., Student, Junior), "Stack" (e.g., React), and "Location" (State/City).
* **FR4:** Users must explicit consent to PDPA/Privacy Policy during sign-up.

### FR Area 1a: Public Landing Page (The Hook)

* **FR-LAND-01 (Game Hero):** The specific Hero Section of the homepage MUST embed the "Santan Island" game view, inviting immediate interaction/play. Scrolling down reveals the rest of the site.
* **FR-LAND-02 (Live Stats):** Display real-time (or cached) counters for:
  * Total Payout Volume (RM).
  * Active Bounties.
  * Total Bounty Hunters (Registered Devs).
* **FR-LAND-03 (Navigation):** Clear visual cues/cards directing users to:
  * "Start Hunting" (Bounty Board).
  * "Find Talent" (Brand CTA).
  * "Latest Jobs" (Preview of Job Board).
* **FR-LAND-04 (Brand CTA):** A prominent section inviting Companies to "Post a Rare Bounty" or "Hiring?" linking to the concierge form.
* **FR-LAND-05 (Job Preview):** Display a dynamic list of the 3 most recent "Active" Job Openings (if any).

### FR Area 2: User Profiles (The "CV")

* **FR5:** Developers can view their own Profile stats (Wins, Earnings - populated by Admin).
* **FR6:** Public Users can view a Developer's Profile (Read-only).
* **FR7:** The System must automatically fetch and display the user's GitHub Contribution Graph (Last 12 months), **Top Languages** (by byte count), and **Pinned Repositories** on their profile.

### FR Area 3: Bounty Marketplace

* **FR8:** Public Users can view a list of "Active" Bounties (Searchable/Filterable by Tag).
* **FR9:** Guests (Non-logged in) are prompted to Login when clicking "View Details" on a Bounty.
* **FR10:** Authenticated Developers can view full Bounty Details (Description, Price, Tech Stack).
* **FR11:** Developers can submit a solution by providing a **GitHub Pull Request URL** (Mandatory field).
* **FR12:** Developers can view the status of their submission (Submitted -> Under Review -> Accepted/Rejected).

### FR Area 4: Admin Dashboard (Ops Core)

* **FR13:** Admins can Create/Edit/Delete Bounties (CRUD).
* **FR14:** Admins can view a list of all Submissions.
* **FR15:** Admins can mark a Submission as "Approved" or "Rejected" with a mandatory comment.
* **FR16:** Admins can mark a Bounty as "Paid" (recording the Transaction Ref # manually).
* **FR-ADM-01 (User Mgmt):** Admins can "Ban" or "Suspend" users to prevent login (Spam/Abuse mitigation).

### FR Area 5: "Santan Island" Game Integration

* **FR17:** Users can access the "Santan Island" game via a dedicated nav link.
* **FR18:** The System must authenticate the Game Session (passing User ID to the game iframe/canvas) so game progress saves to the User.

### FR Area 6: Future Requirements (Phase 2 - Planned)

* **FR-FUT-01 (Job Board):** Full Job Board with "Apply Now" (ATS integration) and Company Dashboard. *Captured from BRD for future Roadmap.*
* **FR-FUT-02 (Community Content):** "Featured Projects" showcase and "Content Submission" forms are explicitly deferred to Phase 2 to reduce MVP scope.

## Non-Functional Requirements

### Performance

* **Core Web Vitals:** The Public Marketplace pages must achieve a **Green Score (LCP < 2.5s)** on Mobile to ensure Google SEO indexing.
* **Game Load Time:** "Santan Island" initial load must be **< 3 seconds** on 4G networks to prevent user drop-off.
* **API Latency:** General API responses should be < 300ms.

### Security

* **Data Privacy (PDPA):** All personally identifiable information (PII) must be encrypted at rest.
* **Access Control:** Strict Row-Level Security (RLS) or Middleware checks must prevent Cross-Tenant data access (e.g., A Student cannot access any Admin route).
* **Payment Safety:** No manual bank details stored in the database for Phase 1 (collected manually to reduce liability).

### Reliability

* **Uptime:** 99.9% availability for the Public Job Board (Standard Cloud/Vercel SLA).
* **Game Stability:** The embedded game must gracefully handle mobile browser resizing without crashing.
