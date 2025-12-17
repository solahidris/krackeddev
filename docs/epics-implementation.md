---
stepsCompleted: [1, 2, 3, 4]
inputDocuments: ['docs/prd.md', 'docs/architecture.md']
---

# krackeddevs-docs - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for krackeddevs-docs, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: Users can sign up/login using GitHub OAuth (to verify developer identity).
FR2: Users can sign up/login using Email/Password.
FR3: New Users must complete an Onboarding flow capturing: "Current Role" (e.g., Student, Junior), "Stack" (e.g., React), and "Location" (State/City).
FR4: Users must explicit consent to PDPA/Privacy Policy during sign-up.
FR-LAND-01 (Game Hero): The specific Hero Section of the homepage MUST embed the "Santan Island" game view, inviting immediate interaction/play. Scrolling down reveals the rest of the site.
FR-LAND-02 (Live Stats): Display real-time (or cached) counters for: Total Payout Volume (RM), Active Bounties, Total Bounty Hunters (Registered Devs).
FR-LAND-03 (Navigation): Clear visual cues/cards directing users to: "Start Hunting" (Bounty Board), "Find Talent" (Brand CTA), "Latest Jobs" (Preview of Job Board).
FR-LAND-04 (Brand CTA): A prominent section inviting Companies to "Post a Rare Bounty" or "Hiring?" linking to the concierge form.
FR-LAND-05 (Job Preview): Display a dynamic list of the 3 most recent "Active" Job Openings (if any).
FR5: Developers can view their own Profile stats (Wins, Earnings - populated by Admin).
FR6: Public Users can view a Developer's Profile (Read-only).
FR7: The System must automatically fetch and display the user's GitHub Contribution Graph (Last 12 months), Top Languages (by byte count), and Pinned Repositories on their profile.
FR8: Public Users can view a list of "Active" Bounties (Searchable/Filterable by Tag).
FR9: Guests (Non-logged in) are prompted to Login when clicking "View Details" on a Bounty.
FR10: Authenticated Developers can view full Bounty Details (Description, Price, Tech Stack).
FR11: Developers can submit a solution by providing a GitHub Pull Request URL (Mandatory field).
FR12: Developers can view the status of their submission (Submitted -> Under Review -> Accepted/Rejected).
FR13: Admins can Create/Edit/Delete Bounties (CRUD).
FR14: Admins can view a list of all Submissions.
FR15: Admins can mark a Submission as "Approved" or "Rejected" with a mandatory comment.
FR16: Admins can mark a Bounty as "Paid" (recording the Transaction Ref # manually).
FR-ADM-01 (User Mgmt): Admins can "Ban" or "Suspend" users to prevent login (Spam/Abuse mitigation).
FR17: Users can access the "Santan Island" game via a dedicated nav link.
FR18: The System must authenticate the Game Session (passing User ID to the game iframe/canvas) so game progress saves to the User.

### NonFunctional Requirements

NFR1: The Public Marketplace pages must achieve a Green Score (LCP < 2.5s) on Mobile to ensure Google SEO indexing.
NFR2: "Santan Island" initial load must be < 3 seconds on 4G networks to prevent user drop-off.
NFR3: General API responses should be < 300ms.
NFR4: All personally identifiable information (PII) must be encrypted at rest (PDPA).
NFR5: Strict Row-Level Security (RLS) or Middleware checks must prevent Cross-Tenant data access.
NFR6: No manual bank details stored in the database for Phase 1.
NFR7: 99.9% availability for the Public Job Board.
NFR8: The embedded game must gracefully handle mobile browser resizing without crashing.

### Additional Requirements

- **Starter Template**: Use `create-next-app` + `shadcn` + `supabase` (Hybrid Clean Build). First story MUST be project initialization.
- **UI/UX Strategy**: **RETAIN EXISTING UI/UX/THEME**. Do not rebuild or re-style existing components unless functionally broken.
- **Game Integration**: Implemented via Iframe + PostMessage + Supabase Edge Functions.
- **API Pattern**: Use Next.js Server Actions (Mutations) + RLS (Fetching). No Express/Rest API.
- **State Management**: Zustand (Client) + React Query (Server).
- **Deployment**: Front-end on Vercel, Backend on Supabase Cloud.
- **Naming Pattern**: `kebab-case` for all files, `snake_case` for DB tables/columns.
- **Auth Provider**: Supabase Auth (GitHub OAuth).
- **Game Bridge Security**: `window.postMessage` protocol with `KRACKED_AUTH_SYNC` event.
- **Mobile Strategy**: Responsive Web / PWA only (No native app).
- **Admin Dashboard**: Requires specific feature-sliced folder structure (`src/features/admin-dashboard`).

### FR Coverage Map

FR1: Epic 1 - GitHub OAuth Login
FR2: Epic 1 - Email/Password Login
FR3: Epic 1 - Onboarding Flow
FR4: Epic 1 - PDPA Consent
FR-LAND-01: Epic 2 - Game Hero Embed
FR-LAND-02: Epic 2 - Live Stats
FR-LAND-03: Epic 2 - Navigation
FR-LAND-04: Epic 2 - Brand CTA
FR-LAND-05: Epic 2 - Job Preview
FR5: Epic 3 - Developer Own Stats
FR6: Epic 3 - Public Profile View
FR7: Epic 3 - GitHub Graph & Stats
FR8: Epic 5 - Active Bounty List
FR9: Epic 5 - Value Wall (Login Prompt)
FR10: Epic 5 - Bounty Details
FR11: Epic 5 - Submission (PR URL)
FR12: Epic 5 - Submission Status
FR13: Epic 4 - Bounty CRUD
FR14: Epic 5 - View Submissions
FR15: Epic 5 - Approve/Reject Logic
FR16: Epic 5 - Manual Payout Logic
FR-ADM-01: Epic 4 - User Ban/Suspend
FR17: Epic 6 - Game Page Access
FR18: Epic 6 - Game Session Auth

## Epic List

### Epic 1: User Authentication & Onboarding
**Goal:** Establish the secure foundation (Project Init) where users can register, log in, and complete their profile onboarding with role/stack details.
**FRs covered:** FR1, FR2, FR3, FR4
**Implementation Notes:**
- Includes project initialization (hybrid clean build).
- Includes GitHub/Email Auth setup.
- Includes Onboarding Flow UI/Logic.
- Includes PDPA Consent.

### Epic 2: Public Landing & Discovery
**Goal:** Captivate new users with the "Game Hero" experience and direct them to hunting or hiring opportunities.
**FRs covered:** FR-LAND-01, FR-LAND-02, FR-LAND-03, FR-LAND-04, FR-LAND-05
**Implementation Notes:**
- "Santan Island" Game Hero Embed.
- Live Real-time/Cached Stats.
- Navigation and Brand Call-to-Actions.
- Job Previews.

### Epic 3: Developer Profiles & Portfolio
**Goal:** Empower developers to showcase their identity through synced GitHub stats and verified "Wins."
**FRs covered:** FR5, FR6, FR7
**Implementation Notes:**
- Public and Private Profile views.
- GitHub Graph Sync integration.
- Top Languages calculation.
- "Wins" & "Earnings" stats display.

### Epic 4: Admin Operations Basics
**Goal:** Enable Admins to manage the system inventory (Bounties) and user access.
**FRs covered:** FR13, FR-ADM-01
**Implementation Notes:**
- Bounty CRUD operations.
- User management (Ban/Suspend).

### Epic 5: Bounty Marketplace Core
**Goal:** Enable the full transaction loop: searching, viewing details, submitting work, and Admin verification/payout.
**FRs covered:** FR8, FR9, FR10, FR11, FR12, FR14, FR15, FR16
**Implementation Notes:**
- Active Bounty Listing with Search/Filter.
- Detailed Bounty views (Auth vs Guest).
- Submission Flow (GitHub PR URL).
- Admin Verification & Manual Payout Recording.

### Epic 6: Santan Island Game Integration
**Goal:** Integrate the external "Santan Island" game with seamless authentication and state syncing.
**FRs covered:** FR17, FR18
**Implementation Notes:**
- Dedicated Game Page.
- Authentication Bridge (PostMessage) logic.

<!-- Repeat for each epic in epics_list (N = 1, 2, 3...) -->

## Epic {{N}}: {{epic_title_N}}

{{epic_goal_N}}

<!-- Repeat for each story (M = 1, 2, 3...) within epic N -->

### Story {{N}}.{{M}}: {{story_title_N_M}}

As a {{user_type}},
I want {{capability}},
So that {{value_benefit}}.

**Acceptance Criteria:**

<!-- for each AC on this story -->

**Given** {{precondition}}
**When** {{action}}
**Then** {{expected_outcome}}
**And** {{additional_criteria}}

<!-- End story repeat -->

## Epic 1: User Authentication & Onboarding

**Goal:** Establish the secure foundation (Project Init) where users can register, log in, and complete their profile onboarding with role/stack details.

### Story 1.1: Project Structure Audit & Initialization

As a Developer,
I want the project structure to follow the feature-sliced design (src/features),
So that the codebase is scalable and aligns with the agreed Architecture.

**Acceptance Criteria:**

**Given** the current codebase
**When** I audit the directory structure
**Then** `src/features` directory should exist
**And** `src/components/ui` should contain the shared Shadcn components
**And** Supabase configuration should be verified as functional

### Story 1.2: Authentication Refactor (Feature-Sliced)

As a User,
I want to sign up and login using Email or GitHub,
So that I can access the platform securely with my identity verification.

**Acceptance Criteria:**

**Given** I am on the Login page
**When** I click "Login with GitHub"
**Then** I should be redirected to GitHub and authenticated back to the app (FR1)
**And** my user record should be created in `auth.users`
**And** the changes/audit should confirm the logic resides in `src/features/auth`

**Given** I am on the Login/Signup page
**When** I enter a valid email and password
**Then** I should be authenticated successfully (FR2)
**And** I must have consented to PDPA (FR4)

### Story 1.3: Onboarding Flow Implementation

As a New User,
I want to complete my profile details (Role, Stack, Location),
So that I can be accurately matched with relevant bounties.

**Acceptance Criteria:**

**Given** a user logs in for the first time
**When** they attempt to access the dashboard
**Then** they should be redirected to the /onboarding route (FR3)

**Given** I am on the onboarding form
**When** I enter my Role (e.g. Junior), Stack (e.g. React), and Location
**Then** this data should be saved to my profile record
**And** the implementation should reside in `src/features/onboarding`

## Epic 2: Public Landing & Discovery

**Goal:** Captivate new users with the "Game Hero" experience and direct them to hunting or hiring opportunities.

### Story 2.1: Landing Page Refactor

As a Developer,
I want to move the landing page logic into a dedicated feature module,
So that the codebase remains organized and I can maintain the UI separately from the routing.

**Acceptance Criteria:**

**Given** the existing `src/app/page.tsx`
**When** I refactor the code
**Then** a new `src/features/landingpage` directory should exist
**And** it should contain the `TownhallV2` and `SplitTextAnimation` components
**And** `src/app/page.tsx` should import the main landing container from the feature
**And** the UI and animation behavior must remain exactly the same as before

### Story 2.2: Live Stats & CTA Integration

As a Visitor,
I want to see live stats and clear Call-to-Actions for Brands,
So that I understand the platform's activity and know how to hire talent.

**Acceptance Criteria:**

**Given** I am on the landing page
**When** I scroll past the game hero
**Then** I should see a "Live Stats" section (FR-LAND-02)
**And** I should see a "Brand CTA" section inviting companies to post bounties (FR-LAND-04)
**And** these components must match the existing dark/CRT theme

### Story 2.3: Navigation & Job Preview

As a User,
I want clear navigation to other parts of the site (Jobs, Game),
So that I can explore the platform easily.

**Acceptance Criteria:**

**Given** I am on the homepage
**When** I interact with the navigation elements
**Then** I should be able to navigate to the Job Board (FR-LAND-03)
**And** I should see a preview of recent active jobs (FR-LAND-05)
**And** external links (like game) should work correctly in new tabs if required

## Epic 3: Developer Profiles & Portfolio

**Goal:** Empower developers to showcase their identity through synced GitHub stats and verified "Wins."

### Story 3.1: Profile Feature Refactor

As a Developer,
I want to organize the profile logic into a scalable feature module,
So that I can easily extend the profile capabilities without cluttering the app directory.

**Acceptance Criteria:**

**Given** the existing `ProfileScene` in `src/app/profile/page.tsx`
**When** I refactor the code
**Then** a new `src/features/profiles` directory should exist
**And** it should contain the `ProfileScene` and related components
**And** the route `src/app/profile/page.tsx` should serve as a wrapper
**And** the UI should remain consistent with the existing theme

### Story 3.2: GitHub Stats Integration

As a User,
I want my profile to automatically show my GitHub stats,
So that I don't have to manually update my portfolio.

**Acceptance Criteria:**

**Given** a user has linked their GitHub account
**When** they view their profile
**Then** the system should fetch their contribution graph and top languages from GitHub (FR7)
**And** this data should be displayed in the profile scene
**And** this should be implemented using Server Actions in `src/features/profiles/actions.ts`

### Story 3.3: Stats & Wins Display

As a User,
I want to see my "Wins" and "Earnings" on my profile,
So that I can demonstrate my track record on the platform.

**Acceptance Criteria:**

**Given** a user has verified boundy wins
**When** any user views their profile (FR6)
**Then** the "Wins" and "Earnings" counters should reflect the database values (FR5)
**And** these stats should be pulled from the `profiles` table

## Epic 4: Admin Operations Basics

**Goal:** Enable Admins to manage the system inventory (Bounties) and user access.

### Story 4.1: Admin Layout & Security

As an Admin,
I want a dedicated dashboard area that is secure and separate from the public site,
So that I can perform sensitive operations safely.

**Acceptance Criteria:**

**Given** a user is logged in
**When** they attempt to access `/admin/dashboard`
**Then** the system should check if their role is 'admin'
**And** if not, they should be redirected to the home page (FR-ADM-02) - *implied requirement*
**And** the implementation should be in `src/features/admin-dashboard` and `src/app/(admin)`

### Story 4.2: Bounty Management (CRUD)

As an Admin,
I want to create, edit, and delete bounties,
So that I can keep the marketplace up to date.

**Acceptance Criteria:**

**Given** I am on the Admin Dashboard
**When** I fill out the "Create Bounty" form
**Then** a new bounty record should be created in the database (FR13)

**Given** an existing bounty
**When** I edit the details
**Then** the changes should be saved

### Story 4.3: User Management

As an Admin,
I want to view a list of users and ban them if necessary,
So that I can protect the platform from bad actors.

**Acceptance Criteria:**

**Given** I am on the User Management page
**When** I click "Ban" on a user
**Then** their account status should be updated to 'banned' (FR-ADM-01)
**And** they should be prevented from logging in

## Epic 5: Bounty Marketplace Core

**Goal:** Enable the full transaction loop: searching, viewing details, submitting work, and Admin verification/payout.

### Story 5.1: Bounty Board Refactor

As a Developer,
I want to refactor the current "Jobs" page into a "Bounty Board" feature,
So that it aligns with the domain language and new architecture.

**Acceptance Criteria:**

**Given** the existing `src/app/jobs` page
**When** I refactor it
**Then** the logic should move to `src/features/bounty-board`
**And** the UI should display the list of active bounties (FR8)
**And** clicking a bounty should show details (FR10) forcing login if guest (FR9)
**And** the term "Job" in the UI can remain if preferred, but backend/code should use "Bounty"

### Story 5.2: Submission Flow

As a Developer,
I want to submit my solution via a GitHub PR URL,
So that I can claim the bounty.

**Acceptance Criteria:**

**Given** I am viewing a bounty details page
**When** I click "Submit Solution"
**Then** I should see a form requiring a valid URL
**And** submitting it should create a record in `bounty_submissions` (FR11)
**And** I should see my submission status change to "Submitted" (FR12)

### Story 5.3: Verification Logic

As an Admin,
I want to approve or reject submissions,
So that I can verify the quality of work.

**Acceptance Criteria:**

**Given** I am viewing a submission
**When** I click "Approve" or "Reject"
**Then** I must provide a comment
**And** the submission status should create (FR15)
**And** if approved, I should be able to mark it as "Paid" with a transaction reference (FR16)

## Epic 6: Santan Island Game Integration

**Goal:** Integrate the external "Santan Island" game with seamless authentication and state syncing.

### Story 6.1: Game Bridge Implementation

As a Developer,
I want a secure bridge between the React App and the Game Iframe,
So that I can pass the user's authentication token to the game.

**Acceptance Criteria:**

**Given** the game is loaded in an iframe
**When** the app receives a request for token
**Then** it should post the current session token to the iframe via `postMessage`
**And** it should restrict this communication to the trusted game origin (FR18)
**And** implementation should represent `src/features/game-bridge`

### Story 6.2: Game Page Refactor

As a User,
I want to access the game page directly,
So that I can play "Santan Island".

**Acceptance Criteria:**

**Given** I click the "Game" link in navigation
**When** the page loads
**Then** the verified `src/features/game-bridge` component should mount
**And** the game should load within the iframe (FR17)
