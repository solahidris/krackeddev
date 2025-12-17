# Kracked Devs (KD) - Business Requirements Document (BRD)

**Version:** 2.0  
**Date:** December 2025  
**Document Status:** DRAFT  
**Project Code:** KD-PIVOT-2025

| Revision | Date | Description | Author |
| :--- | :--- | :--- | :--- |
| 1.0 | Oct 2025 | Original Whitepaper Thesis (The Pivot) | Kracked Devs |
| 2.0 | Dec 2025 | Functional Requirements Specification | Analyst Agent |

---

## 1. Executive Summary

Kracked Devs is executing a strategic pivot from a "Top 1% Elite" talent marketplace to an **"AI-Augmented Guild"** that transforms "median" developers into elite performers. By leveraging **Agentic AI workflows** (Cursor, Claude 3.7 Sonnet) and government-subsidized upskilling (MDEC, HRD Corp), KD aims to solve the Malaysian SME productivity crisis by supplying "Senior-grade" output at "Mid-level" costs.

This BRD defines the functional and non-functional requirements for the **Kracked Devs Platform 2.0**, prioritizing community engagement, gamification, and the "Bounty" task model to solve the "Cold Start Problem" before scaling the full hiring marketplace.

## 2. Project Scope & Strategic Goals

### 2.1 Core Justification

* **The Problem**: SMEs cannot afford Senior Talent (RM 15k+), and "Median" developers lack architectural expertise.
* **The Solution**: An "AI-Augmented" marketplace where developers are upskilled and vetted through paid "Bounties" before being matched with employers.
* **Strategic Goal**: Build a high-trust, high-activity community ("Developer Kaki" style) to capture supply and demand *before* monetizing via recruitment.

### 2.2 Target Audience

1. **Developers (The "Median 99%"):** Mid-level Malaysian devs, students, and active "Developer Kaki" members looking for extra income and upskilling.
2. **SMEs / Brands:** Companies needing quick tasks done (Bounties) or full-time hires, priced out of MNC talent.
3. **KD Admins:** Curators of jobs, bounties, and community standards.

---

## 3. Functional Requirements (Prioritized)

### 3.1 Authentication & Onboarding

* **REQ-AUTH-01 (Sign Up/Login):** Users MUST be able to register and login using **GitHub** (OAuth) or **Email/Password**.
* **REQ-AUTH-02 (Link GitHub):** Users who register via Email MUST have the option to link their GitHub account later in their settings to enable developer features.
* **REQ-ONB-01 (Location Data):** During registration (or first login), users MUST select:
  * Nationality: "Malaysian" or "Non-Malaysian".
  * *If Malaysian:* Select **State** (Dropdown) and **City** (Text/Dropdown).
* **REQ-ONB-02 (Professional Status):** User selects Work Status:
  * Options: Working Full-time, Business Owner, Part-time.
* **REQ-ONB-03 (Role & Seniority):**
  * **Work Type:** Dropdown of tech roles (e.g., Frontend, Backend, Fullstack, Mobile, DevOps, AI/ML, Designer, PM).
  * **Expert Level:** Self-rated (Junior, Mid, Senior, Elite).
* **REQ-AUTH-03 (Role-Based Access):**
  * *Developer:* Can submit bounties, apply for jobs, view Bootcamp.
  * *Company:* Can post Rare Bounties (subject to approval), post Jobs.
  * *Admin:* Full system access, curation, bounty creation.

### 3.2 Developer Profile (The "Verified Career Ledger")

* **REQ-PROF-01 (Profile View):** A public-facing profile page for each developer.
* **REQ-PROF-02 (GitHub Integration):** System MUST fetch and display public GitHub data (e.g., Contribution Graph, Top Languages, Pinned Repos) to validate skills.
* **REQ-PROF-03 (Stats Display):** Display KD-specific stats:
  * Bounties Won.
  * Total Earnings (RM).
  * Rank/Badge (e.g., "Top Hunter").

### 3.3 The Bounty System (Core Engagement Loop)

* **REQ-BNTY-01 (Bounty Listing):** A central page listing all active "mini task" projects.
  * Filter by: Category (Frontend, Backend, Design), Reward Type, Status.
* **REQ-BNTY-02 (Bounty Types):**
  * **Type A: Normal Bounty (Standard):** Created by KD Admin. Reward ~RM 150. (Low friction, community building).
  * **Type B: Rare Bounty (Premium):** Submitted by Brands/Companies. Reward RM 300+. (Real-world business tasks).
* **REQ-BNTY-03 (Submission Flow):** Developers submit work MUST provide a **GitHub Repository URL**.
  * *Note:* Code auditing agents will eventually scan this repo (Future scope), but initially manual/semi-automated review.
* **REQ-BNTY-04 (History & Winners):** Display a list of past bounties and their winners to build social proof.
* **REQ-BNTY-05 (Company CTA):** A prominent Call-to-Action section for Brands: *"Have a task? Post a Rare Bounty"* (Lead gen form for "Mini games," "Landing pages," etc.).
* **REQ-BNTY-06 (Leaderboard):** "Top Bounty Hunters" ranking based on wins and earnings to drive competition.
* **REQ-BNTY-01 (Bounty Listing):** A central page listing all active "mini task" projects.
  * Filter by: Category (Frontend, Backend, Design), Reward Type, Status.
* **REQ-BNTY-02 (Bounty Types):**
  * **Type A: Normal Bounty (Standard):** Created by KD Admin. Reward ~RM 150. (Low friction, community building).
  * **Type B: Rare Bounty (Premium):** Submitted by Brands/Companies. Reward RM 300+. (Real-world business tasks).
* **REQ-BNTY-03 (Submission Flow):** Developers submit work MUST provide a **GitHub Repository URL**.
  * *Note:* Code auditing agents will eventually scan this repo (Future scope), but initially manual/semi-automated review.
* **REQ-BNTY-04 (History & Winners):** Display a list of past bounties and their winners to build social proof.
* **REQ-BNTY-05 (Company CTA):** A prominent Call-to-Action section for Brands: *"Have a task? Post a Rare Bounty"* (Lead gen form for "Mini games," "Landing pages," etc.).
* **REQ-BNTY-06 (Leaderboard):** "Top Bounty Hunters" ranking based on wins and earnings to drive competition.

### 3.4 Community Hub

* **REQ-COMM-01 (Social Aggregation):** Centralized dashboard linking to KD's presence on:
  * Twitter / X
  * Discord (Primary community chat)
  * Facebook Group
  * TikTok
* **REQ-COMM-02 (Community Stats):** Live counters for Total Members, Active Bounties, Total Payouts to demonstrate growth.
* **REQ-COMM-03 (Featured Projects):** A showcase section for "Best of KD" community projects (curated by Admin).
* **REQ-COMM-04 (Content Submission):** Form for members to submit white papers, blog posts, or show-and-tell projects for review.

### 3.5 KD Job Board

* **REQ-JOB-01 (Job Listing):** A clean board for full-time/contract roles.
* **REQ-JOB-02 (Company Submission):** Brands can submit job postings via a form.
* **REQ-JOB-03 (Curation Workflow):** Listings do NOT go live immediately. They enter a "Pending" state for KD Admin curation/approval to ensure quality and prevent spam.

### 3.6 Bootcamp (Future Tease)

* **REQ-EDU-01 (Bootcamp Landing):** Informational section teasing upcoming cohorts.
* **REQ-EDU-02 (Programs):**
  * *Vibe Code Bootcamp:* Focus on "vibes" + AI tools, low-code/fast-code.
  * *Startup Bootcamp:* "Venture Builder" track for founders.
* **REQ-EDU-03 (Waitlist):** Email capture for interested users.

### 3.7 Game World ("Santan Island")

* **REQ-GAME-01 (Standalone App):** A 2D top-down browser game (RPG style) separate from the main web app initially.
* **REQ-GAME-02 (Exploration):** Players navigate a pixel-art island ("Santan Island").
* **REQ-GAME-03 (Discovery):** Interaction points in the game link back to the main website's Bounties, Jobs, and Community features. (Gamified navigation).

### 3.8 Admin Dashboard (Management Core)

* **REQ-ADM-01 (Analytics Dashboard):** Admin-only view displaying:
  * Total Users (New vs Returning).
  * Bounty Stats (Active, Completed, Total Payouts).
  * Job Stats (Posted, Filled).
  * Site Traffic/Engagement metrics.
* **REQ-ADM-02 (Content Management):**
  * *Jobs:* Approve, Reject, or Edit company job postings.
  * *Bounties:* Create Normal Bounties, Approve/Reject Rare Bounties.
  * *Users:* Ban/Suspend users, Verify stats manually if needed.
  * *Community:* Manage Featured Projects and Content submissions.

---

## 4. Non-Functional Requirements

### 4.1 UI/UX Design ("Premium & Dynamic")

* **Aesthetics:** High-contrast, "Hacker/Cyberpunk" or Clean "Linear-style" design. Dark mode priority.
* **Responsiveness:** Mobile-first for Bounty browsing; Desktop-optimized for Submission and Profile management.
* **Animations:** Micro-interactions (hover effects, success confetti) to make the platform feel "Cracked" (alive/energetic).

### 4.2 Security & Performance

* **SEC-01:** GitHub OAuth ensures secure identity management.
* **SEC-02:** Admin validation required for all user-generated content (Jobs, Rare Bounties) to prevent spam.
* **PERF-01:** Static generation (Next.js) for Landing, Job Board, and Bounty Lists for SEO and speed.

---

## 5. Business Rules & Monetization (Context)

* **Placement Fee:** The platform's long-term revenue is 15-20% of annual salary for successful job matches (facilitated by the Job Board).
* **Grant Usage:** Bounties and Bootcamps are loss leaders or subsidized by MDEC/HRD Corp grants to acquire user base (CAC reduction).
* **Bounty Fees:** Companies posting "Rare Bounties" pay a platform fee (e.g., 20% on top of the reward) for access to the developer pool.

---

## 6. Implementation Roadmap

### Phase 1: MVP (The "Bounty Board")

* Authentication (GitHub/Email)
* User Profile (Basic GitHub stats)
* Bounty Listing & Submission (Normal Type)
* Community Hub (Links)

### Phase 2: Growth (The "Marketplace")

* Job Board & Company Portal
* Rare Bounties (Company submission)
* Leaderboards & Gamification features

### Phase 3: Expansion (The "Ecosystem")

* Santan Island Integration
* Bootcamp Learning Management System (LMS)
* "Kracked OS" for project management (SaaS pivot)
