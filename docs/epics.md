---
stepsCompleted: [1, 2, 3, 4]
inputDocuments: ['docs/prd.md', 'docs/architecture.md']
status: complete
---

# krackeddevs-docs - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for krackeddevs-docs, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

| ID | Requirement |
| :--- | :--- |
| FR-LAND-01 | The Hero Section of the homepage MUST embed the "Santan Island" game view. |
| FR-LAND-02 | Display real-time counters for Total Payout Volume, Active Bounties, and Total Bounty Hunters. |
| FR-LAND-03 | Clear visual navigation cards directing to Bounty Board, Brand CTA, and Latest Jobs. |
| FR-LAND-04 | Prominent CTA section for Companies to "Post a Rare Bounty" or "Hiring?". |
| FR-LAND-05 | Display a dynamic list of the 3 most recent "Active" Job Openings. |
| FR1 | Users can sign up/login using GitHub OAuth (to verify developer identity). |
| FR2 | Users can sign up/login using Email/Password. |
| FR3 | New Users must complete an Onboarding flow capturing: "Current Role", "Stack", and "Location". |
| FR4 | Users must explicit consent to PDPA/Privacy Policy during sign-up. |
| FR5 | Developers can view their own Profile stats (Wins, Earnings - populated by Admin). |
| FR6 | Public Users can view a Developer's Profile (Read-only). |
| FR7 | The System must automatically fetch and display the user's GitHub Contribution Graph, Top Languages, and Pinned Repositories. |
| FR8 | Public Users can view a list of "Active" Bounties (Searchable/Filterable by Tag). |
| FR9 | Guests (Non-logged in) are prompted to Login when clicking "View Details" on a Bounty. |
| FR10 | Authenticated Developers can view full Bounty Details (Description, Price, Tech Stack). |
| FR11 | Developers can submit a solution by providing a **GitHub Pull Request URL** (Mandatory field). |
| FR12 | Developers can view the status of their submission (Submitted -> Under Review -> Accepted/Rejected). |
| FR13 | Admins can Create/Edit/Delete Bounties (CRUD). |
| FR14 | Admins can view a list of all Submissions. |
| FR15 | Admins can mark a Submission as "Approved" or "Rejected" with a mandatory comment. |
| FR16 | Admins can mark a Bounty as "Paid" (recording the Transaction Ref # manually). |
| FR-ADM-01 | Admins can "Ban" or "Suspend" users to prevent login (Spam/Abuse mitigation). |
| FR17 | Users can access the "Santan Island" game via a dedicated nav link. |
| FR18 | The System must authenticate the Game Session (passing User ID to the game iframe/canvas) so game progress saves to the User. |

### NonFunctional Requirements

NFR1: Performance - Core Web Vitals (LCP < 2.5s) on Mobile for Public Marketplace pages.
NFR2: Performance - Game load time < 3 seconds on 4G networks.
NFR3: Security - PDPA Data Privacy (PII Encrypted at rest).
NFR4: Security - Access Control (RLS) preventing Cross-Tenant data access.
NFR5: Reliability - 99.9% uptime for Public Job Board.

### Additional Requirements

- **Starter Template:** "Hybrid Clean Build" using `create-next-app` + `shadcn` + `supabase`.
- **Game Bridge:** Iframe + PostMessage + Supabase Edge Functions for Auth Sync.
- **State Management:** Zustand (Client) + React Query (Server/Hydration).
- **Naming Convention:** Strict `kebab-case` for all filenames.
- **Directory Structure:** Feature-Sliced Design (`src/features/*`).
- **Deployment:** Vercel (Frontend) + Supabase (Backend).

### FR Coverage Map

| Epic ID | Epic Name | Functional Requirements | Non-Functional Requirements |
| :--- | :--- | :--- | :--- |
| **EPIC-0** | Public Landing Page | FR-LAND-01, FR-LAND-02, FR-LAND-03, FR-LAND-04, FR-LAND-05 | NFR1 |
| **EPIC-1** | Core Authentication & Onboarding | FR1, FR2, FR3, FR4 | NFR3, NFR4 |
| **EPIC-2** | Developer Profile & Portfolio | FR5, FR6, FR7 | - |
| **EPIC-3** | Bounty Marketplace & Submissions | FR8, FR9, FR10, FR11, FR12 | NFR1, NFR5 |
| **EPIC-4** | Admin Dashboard & Operations | FR13, FR14, FR15, FR16, FR-ADM-01 | NFR4 |
| **EPIC-5** | Santan Island Game Integration | FR17, FR18 | NFR2 |

## Epic List

### EPIC-0: Public Landing Page

**Goal:** Create an engaging, high-converting entry point that showcases the platform's unique value through the embedded game and live statistics.

- **Scope:** Game Hero Section, Live Stats Display, Navigation Cards, Brand CTA, Job Preview.
- **Value:** First impression drives user acquisition; differentiates from traditional job boards.
- **Complexity:** Medium (Game embed integration, real-time stats aggregation).

### EPIC-1: Core Authentication & Onboarding

**Goal:** Enable secure user access via GitHub/Email and capture essential developer data to personalize the experience.

- **Scope:** Sign Up/Login (Email + GitHub), Onboarding Wizard (Role, Stack, Location), Privacy Consent.
- **Value:** Essential for platform security and basic user identification.
- **Complexity:** Medium (3rd party Auth + Form Wizard).

### EPIC-2: Developer Profile & Portfolio

**Goal:** Provide developers with a space to showcase their platform verification and GitHub activity.

- **Scope:** Profile View, Stats Display (Wins/Earnings), GitHub Contribution Graph integration.
- **Value:** Proof of work for developers; trust signal for future clients.
- **Complexity:** Medium (External API integration).

### EPIC-3: Bounty Marketplace & Submissions

**Goal:** The core "Marketplace" where developers find work and owners get solutions.

- **Scope:** Bounty List (Public), Filtering, Detailed View (Gated), Submission Logic (PR URL), Status Tracking.
- **Value:** The primary revenue generating mechanism and user value prop.
- **Complexity:** High (Data relationships, Search, Logic gates).

### EPIC-4: Admin Dashboard & Operations

**Goal:** Enable platform admins to manage the marketplace efficiently.

- **Scope:** Bounty Cloud CRUD, Submission Review Interface, Manual Payment Recording.
- **Value:** Critical for "Concierge" operations model.
- **Complexity:** Medium (CRUD heavy, simplified logic).

### EPIC-5: Santan Island Game Integration

**Goal:** Connect the gamified "Santan Island" experience with the main platform.

- **Scope:** Game Container (iframe), Auth Bridge (postMessage), Session Management.
- **Value:** Unique differentiator; drives engagement.
- **Complexity:** Medium (Cross-origin communication, specific security handlers).

## User Stories Breakdown

### EPIC-0: Public Landing Page

#### STORY-0.1: Game Hero Section Integration

**As a** Visitor
**I want to** immediately see and interact with the "Santan Island" game in the hero section
**So that** I'm intrigued by the unique platform experience and want to explore further.

**Acceptance Criteria:**

- [ ] Hero section (above the fold) embeds the Santan Island game via iframe.
- [ ] Game is interactive immediately (no login required for basic exploration).
- [ ] Smooth scroll transition from game to the next section.
- [ ] Mobile-responsive: Game scales appropriately or shows a static preview with "Play on Desktop" message.
- [ ] Loading state: Show skeleton/spinner while game loads.

#### STORY-0.2: Live Platform Statistics

**As a** Visitor
**I want to** see real-time platform statistics
**So that** I can gauge the platform's activity and credibility.

**Acceptance Criteria:**

- [ ] Display three key metrics:
  - Total Payout Volume (RM) - formatted with currency.
  - Active Bounties (Count).
  - Total Bounty Hunters / Registered Developers (Count).
- [ ] Stats are fetched from the database (cached for performance, updated every 5-10 minutes).
- [ ] Visual design: Use large, bold numbers with icons for each metric.
- [ ] Animation: Numbers count up on first view (optional polish).

#### STORY-0.3: Navigation & Call-to-Actions

**As a** Visitor
**I want** clear navigation options after viewing the hero
**So that** I can quickly find what I'm looking for (hunt bounties, post jobs, etc.).

**Acceptance Criteria:**

- [ ] Three prominent navigation cards/buttons:
  - "Start Hunting" → Links to `/bounties`.
  - "Find Talent" (Brand CTA) → Links to concierge form or `/post-bounty`.
  - "Latest Jobs" → Links to `/jobs` or job preview section.
- [ ] Cards include icons and brief descriptions.
- [ ] Hover effects for interactivity.
- [ ] Mobile: Stack vertically, maintain touch-friendly sizing.

#### STORY-0.4: Job Openings Preview

**As a** Visitor (especially Developers)
**I want to** see the latest job openings on the landing page
**So that** I can quickly assess opportunities without navigating away.

**Acceptance Criteria:**

- [ ] Display the 3 most recent "Active" job postings.
- [ ] Each job card shows: Job Title, Company Name, Location, Posted Date.
- [ ] "View All Jobs" link at the bottom of the section.
- [ ] If no jobs exist: Show "Coming Soon" or hide section gracefully.
- [ ] Jobs are fetched server-side for SEO (SSR/SSG).

### EPIC-1: Core Authentication & Onboarding

#### STORY-1.1: GitHub Authentication

**As a** Developer
**I want to** sign up or log in using my GitHub account
**So that** I can verify my identity as a developer and quickly access the platform without remembering another password.

**Acceptance Criteria:**

- [ ] Users see a "Sign in with GitHub" button on the Login/Register page.
- [ ] Clicking the button redirects to GitHub OAuth flow.
- [ ] Upon successful return:
  - If new user: Create account in Supabase `auth.users` and redirect to Onboarding Wizard.
  - If existing user: Log in and redirect to Dashboard.
- [ ] System captures GitHub Username and Avatar URL.
- [ ] Error handling: Show friendly error if OAuth fails or is cancelled.

#### STORY-1.2: Email & Password Authentication

**As a** User
**I want to** sign up using my email and password
**So that** I have an alternative login method if I prefer not to connect GitHub immediately.

**Acceptance Criteria:**

- [ ] Login/Register form includes Email and Password fields.
- [ ] Password strength validation (min 8 chars).
- [ ] "Sign Up" triggers Supabase Auth email confirmation flow.
- [ ] "Log In" authenticates valid credentials.
- [ ] Appropriate error messages (invalid email, wrong password).

#### STORY-1.3: New User Onboarding Wizard

**As a** New User
**I want to** complete a profile setup wizard after signing up
**So that** the platform knows my role, tech stack, and location.

**Acceptance Criteria:**

- [ ] Triggered immediately after first successful sign-up (GitHub or Email).
- [ ] **Step 1:** Select "Current Role" (e.g., Frontend, Backend, Fullstack, Student) from a dropdown.
- [ ] **Step 2:** Select "Tech Stack" (multi-select, e.g., React, Node, Python).
- [ ] **Step 3:** Enter "Location" (City/Country).
- [ ] All fields are mandatory.
- [ ] "Complete Setup" button saves data to `public.profiles` table.
- [ ] User cannot access main app features until onboarding is complete.

#### STORY-1.4: Privacy Policy Consent

**As a** User
**I want to** explicitly agree to the Privacy Policy during sign-up
**So that** I am informed about how my data is handled and the platform stays compliant.

**Acceptance Criteria:**

- [ ] Checkbox "I agree to the Terms & Privacy Policy" present on Sign-up form.
- [ ] For GitHub Auth: Consent step or integrated into the initial click action (with clear text).
- [ ] System records the timestamp of consent in the user record.
- [ ] User cannot register without agreeing.

### EPIC-2: Developer Profile & Portfolio

#### STORY-2.1: Developer Dashboard & Stats

**As a** Developer
**I want to** see my performance stats (Wins, Earnings) on my dashboard
**So that** I can track my success on the platform.

**Acceptance Criteria:**

- [ ] Dedicated "Dashboard" view after login.
- [ ] Display "Total Earnings" (Currency format, e.g., $1,200).
- [ ] Display "Bounties Won" (Count).
- [ ] Data is read-only for the user (sourced from `public.profiles` or aggregation of `submissions`).
- [ ] Empty state handling (e.g., "Win your first bounty to see stats!").

#### STORY-2.2: Public Developer Profile

**As a** Public User
**I want to** view a Developer's profile page
**So that** I can evaluate their skills, tech stack, and credibility.

**Acceptance Criteria:**

- [ ] Accessible via a public route (e.g., `/developer/[username]`).
- [ ] Displays Public Info: Avatar, Username, Role, Tech Stack, Location.
- [ ] Displays "Bounties Won" as a trust signal.
- [ ] **Privacy:** Does NOT show email, phone, or exact earnings (unless public toggle exists - assume private for MVP).
- [ ] Responsive design for mobile viewing.

#### STORY-2.3: Enhanced GitHub Portfolio Display

**As a** User looking at a Profile
**I want to** see the developer's GitHub contribution graph, top languages, and pinned repositories
**So that** I can verify their active coding habits, tech stack expertise, and notable projects.

**Acceptance Criteria:**

- [ ] **Contribution Graph:** Fetches and renders the standard "heatmap" (green squares) for the last 12 months.
- [ ] **Top Languages:** Displays a visual breakdown (pie chart or bar chart) of the developer's top programming languages by byte count from their public repos.
- [ ] **Pinned Repositories:** Shows up to 6 pinned repos with:
  - Repository name and description.
  - Star count and primary language.
  - Link to the GitHub repo.
- [ ] **Error Handling:** Graceful fallback if GitHub API rate limits are hit or username is invalid (show cached data or "Unavailable" message).
- [ ] **Performance:** All GitHub data loads asynchronously without blocking the main page render.
- [ ] **Privacy:** Only display public GitHub data; respect user's GitHub privacy settings.

### EPIC-3: Bounty Marketplace & Submissions

#### STORY-3.1: Public Bounty Board (List View)

**As a** Public User
**I want to** view a list of active bounties filtered by tech stack
**So that** I can find opportunities that match my skills.

**Acceptance Criteria:**

- [ ] Publicly accessible route `/bounties`.
- [ ] Displays list of specific bounties with summary card (Title, Prize Amount, Tags/Stack, "Open" Status).
- [ ] **Search/Filter:** Allow filtering by Tech Stack (e.g., "React", "Python") and searching by keyword.
- [ ] **Pagination/Infinite Scroll:** Handle lists > 20 items efficiently.

#### STORY-3.2: Bounty Details Gating

**As a** Guest User
**I want to** be prompted to login when I try to view full bounty details
**So that** the platform protects the value of the details for registered developers.

**Acceptance Criteria:**

- [ ] Clicking "View Details" on a card:
  - If **Logged Out:** Redirect to Login Page with a return_url.
  - If **Logged In:** Navigate to `/bounties/[id]`.
- [ ] The full details page includes: Detailed Description, Acceptance Criteria, Repository Access Instructions.

#### STORY-3.3: Solution Submission

**As a** Developer
**I want to** submit my work via a GitHub Pull Request URL
**So that** I can claim the bounty and get reviewed.

**Acceptance Criteria:**

- [ ] "Submit Solution" button on the Bounty Details page.
- [ ] Submission Form contains:
  - **GitHub Pull Request URL** (Validated regex for `github.com/.../pull/...`).
  - Comments (Optional).
- [ ] System validates that the user hasn't already submitted for this specific bounty (if one submission per user rule applies) or allows updates.
- [ ] **Success:** Transition user to a "Submission Received" state/page.

#### STORY-3.4: My Submissions Tracking

**As a** Developer
**I want to** see the status of all my submitted bounties
**So that** I know if I need to take action or if I've won.

**Acceptance Criteria:**

- [ ] "My Submissions" tab in the Developer Dashboard.
- [ ] List displaying: Bounty Title, Date Submitted, Current Status (Pending, Under Review, Accepted, Rejected).
- [ ] Visual indicators for status (e.g., Yellow for Pending, Green for Accepted).

### EPIC-4: Admin Dashboard & Operations

#### STORY-4.1: Bounty Management (CRUD)

**As an** Admin
**I want to** create, edit, and delete bounties
**So that** I can manage the jobs available on the marketplace.

**Acceptance Criteria:**

- [ ] Accessible only to users with `role: admin`.
- [ ] Form to Create/Edit Bounty: Title, Description, Price, Tags/Stack, Status (Open/Closed).
- [ ] List view of all bounties with quick status toggle.
- [ ] Soft delete or "Archive" option for removing bounties.

#### STORY-4.2: Submission Review & Feedback

**As an** Admin
**I want to** review submissions and mark them as Approved or Rejected
**So that** I can quality control the work before payment.

**Acceptance Criteria:**

- [ ] Admin Submission List: Filter by Status (Pending, Under Review).
- [ ] Review Interface: Link to GitHub PR, Field for "Admin Feedback".
- [ ] Action Buttons: "Approve" and "Reject".
- [ ] "Reject" requires a mandatory feedback comment.
- [ ] Status update triggers a notification (email or UI) to the developer.

#### STORY-4.3: Manual Payment Recording

**As an** Admin
**I want to** mark a bounty submission as "Paid" and record a reference number
**So that** the system tracks which developers have been compensated.

**Acceptance Criteria:**

- [ ] Action available only for "Approved" submissions.
- [ ] Input field for "Transaction Reference / Receipt ID".
- [ ] Clicking "Mark as Paid" updates the submission status to "Paid" and the bounty status to "Closed" (if single winner).
- [ ] Updates the Developer's "Total Earnings" stats.

#### STORY-4.4: User Management (Ban/Suspend)

**As an** Admin
**I want to** ban or suspend users who violate platform rules
**So that** I can maintain platform quality and prevent spam/abuse.

**Acceptance Criteria:**

- [ ] Admin Dashboard includes a "User Management" section.
- [ ] List view of all users with search/filter capabilities.
- [ ] Action buttons for each user: "Ban" and "Suspend".
- [ ] **Ban:** Permanently prevents user login; marks account as `status: banned`.
- [ ] **Suspend:** Temporarily prevents login; requires setting a suspension duration or manual reactivation.
- [ ] Banned/Suspended users see a clear error message when attempting to login.
- [ ] **Audit Trail:** System logs who performed the action and when (for accountability).
- [ ] **Reactivation:** Admin can "Unban" or "Unsuspend" users if needed.

### EPIC-5: Santan Island Game Integration

#### STORY-5.1: Game Container & Access

**As a** User
**I want to** access the "Santan Island" game from the main navigation
**So that** I can play the game without leaving the platform.

**Acceptance Criteria:**

- [ ] "Santan Island" link in the main navigation bar.
- [ ] Clicking the link opens a dedicated page `/game`.
- [ ] The page embeds the external game URL via an HTML `iframe`.
- [ ] Responsive container (Desktop focused, but playable on mobile if game supports it).

#### STORY-5.2: Game Authentication Bridge

**As a** Player
**I want** my game session to be automatically authenticated
**So that** my progress and rewards are saved to my account.

**Acceptance Criteria:**

- [ ] Implement `postMessage` communication between Parent App (Next.js) and Child Iframe (Game).
- [ ] On Load: Parent sends a secure `AUTH_TOKEN` or `USER_ID` to the Iframe.
- [ ] Game validates the token with the Supabase Backend (via Edge Function or API).
- [ ] If validation fails: Game shows "Guest Mode" or "Login Required" error.

#### STORY-5.3: Syncing Game Progress

**As a** Player
**I want** my in-game actions (e.g., leveling up) to reflect on my main profile
**So that** I feel rewarded for playing.

**Acceptance Criteria:**

- [ ] Game sends specific events (e.g., `LEVEL_UP`, `ACHIEVEMENT_UNLOCKED`) to Next.js app via `postMessage`.
- [ ] Next.js app verifies the event origin.
- [ ] Next.js app updates the User's Profile stats (if applicable) or stores activity log.
- [ ] **Security:** Ensure events cannot be spoofed by manual console injection (Origin check + Server-side validation).
