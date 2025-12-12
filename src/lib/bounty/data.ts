import { Bounty } from "./types";

export const bounties: Bounty[] = [
  {
    id: "1",
    slug: "kracked-devs-landing-page",
    title: "Kracked Devs Landing Page",
    description:
      "Create a creative, standout landing page design for Kracked Devs – a vibrant developer community.",
    longDescription: `## Bounty Description

Create a creative, standout landing page design for "Kracked Devs" – a vibrant developer community dedicated to leveling up skills, tackling bounties, and building epic projects together.

## What We're Looking For

- Creative and unique design concept
- Modern, developer-focused aesthetic
- Clear value proposition for the community
- Responsive design for all devices
- Engaging visuals and animations

## How to Submit

Submit mockups, code, links, or previews in the comments of the bounty post. The most creative and coolest concept wins!

## Judging Criteria

- Creativity and originality
- Visual appeal and design quality
- User experience and usability
- Technical implementation (if code is provided)
- Alignment with Kracked Devs brand and mission`,
    reward: 100,
    difficulty: "beginner",
    status: "completed",
    tags: ["design", "landing-page", "ui", "frontend", "creative"],
    requirements: [
      "Create a standout landing page design",
      "Make it creative and visually appealing",
      "Submit via X post reply with mockups/code/links",
    ],
    repositoryUrl: "https://github.com/solahidris/krackeddev",
    bountyPostUrl: "https://x.com/masterofnone/status/1992362597862240318",
    submissionPostUrl: "https://x.com/masterofnone/status/1992914421883248878",
    createdAt: "2025-11-20T10:00:00Z",
    deadline: "2025-11-23T21:00:00+08:00",
    completedAt: "2025-11-23T21:00:00+08:00",
    winner: {
      name: "Zafran Udin",
      xHandle: "zafranudin_z",
      xUrl: "https://x.com/zafranudin_z",
    },
    submissions: [],
  },
  {
    id: "2",
    slug: "gamified-tech-job-board",
    title: "Build a Gamified Tech Job Board for Kracked Devs",
    description:
      "Implement gamification features into a tech job board – points, badges, leaderboards for job applications, postings, or hires.",
    longDescription: `## Bounty Description

The @KrackedDev community has voted for a "Gamified Tech Job Board" theme. Build something epic – implement gamification features into a tech job board.

## Features to Implement

- **Points System** - Earn points for various activities
- **Badges** - Achievement badges for milestones
- **Leaderboards** - Rankings for job applications, postings, or hires
- **Gamification Elements** - Make job hunting fun and engaging

## Technical Requirements

- Contribute directly to the repo via Pull Request
- Follow the existing codebase patterns (Next.js App Router, Tailwind, TypeScript)
- Make it creative, functional, and standout!

## How to Submit

1. Fork the repository
2. Implement your gamification features
3. Submit a Pull Request to the main repo
4. Share your PR link on X tagging @KrackedDevs

## Repository

https://github.com/solahidris/krackeddev`,
    reward: 150,
    difficulty: "intermediate",
    status: "completed",
    tags: ["gamification", "job-board", "nextjs", "typescript", "fullstack"],
    requirements: [
      "Implement gamification features (points, badges, leaderboards)",
      "Submit via Pull Request to the repo",
      "Make it creative and functional",
      "Follow existing codebase patterns",
    ],
    repositoryUrl: "https://github.com/solahidris/krackeddev",
    bountyPostUrl: "https://x.com/solahidris_/status/1993586176419414145",
    submissionPostUrl: "https://x.com/iffathaikal1/status/1995088727497158927",
    createdAt: "2025-11-24T10:00:00Z",
    deadline: "2025-11-30T23:59:59+08:00",
    completedAt: "2025-11-30T23:59:59+08:00",
    winner: {
      name: "Iffat Haikal",
      xHandle: "iffathaikal1",
      xUrl: "https://x.com/iffathaikal1",
      submissionUrl: "https://x.com/iffathaikal1/status/1995088727497158927",
    },
    submissions: [],
  },
  {
    id: "3",
    slug: "github-profile-widget",
    title: "Build a Kracked Devs Profile GitHub Widget",
    description:
      "Build a customizable GitHub widget for Kracked Devs profiles with OAuth, contribution graph, themes, and live preview.",
    longDescription: `## Bounty Description

New day, new bounty! Build a customizable GitHub widget for Kracked Devs profiles.

## Features Required

- **OAuth to GitHub** - Secure authentication flow
- **Fetch & Render Contribution Graph** - Display the user's GitHub contribution data
- **In-Profile Editor** with:
  - Themes (Colors, Size, Layout, Shapes)
  - Live Preview
- **Output** - Embeddable component on the Kracked Devs Profile

Ship something you'd use on your own profile! Make it creative, functional, and impressive.

## How to Submit

Reply to the bounty post with:
1. **Screen Recording** (3–5 min) showing:
   - GitHub connect flow
   - Contribution graph rendering
   - Editing features in action
2. **Public Repo Link** with README and setup instructions
3. Tag @KrackedDevs

## Bonus Points

- Live demo URL
- Short bullets on stack/features used`,
    reward: 150,
    difficulty: "advanced",
    status: "completed",
    tags: ["github", "oauth", "widget", "react", "api", "profile"],
    requirements: [
      "Implement GitHub OAuth authentication",
      "Fetch and render GitHub contribution graph",
      "Build in-profile editor with themes and live preview",
      "Create embeddable component for profiles",
      "Submit with screen recording and public repo",
    ],
    repositoryUrl: "https://github.com/solahidris/krackeddev",
    bountyPostUrl: "https://x.com/KrackedDevs/status/1996442362634174677",
    submissionPostUrl: "https://x.com/masterofnone/status/1997925687320342770",
    createdAt: "2025-12-01T10:00:00Z",
    deadline: "2025-12-07T23:59:00+08:00",
    completedAt: "2025-12-07T23:59:00+08:00",
    winner: {
      name: "Akmal Alif",
      xHandle: "4kmal4lif",
      xUrl: "https://x.com/4kmal4lif",
    },
    submissions: [],
  },
  {
    id: "4",
    slug: "viral-food-directory-map",
    title: "Viral Food Directory (Map Edition)",
    description:
      "Build a map-first web app to discover viral food spots, powered by reviews from Google plus one other source.",
    longDescription: `## Bounty Description

Create a map-first web app to discover viral food spots, powered by reviews from Google plus one other source (e.g. Yelp, TripAdvisor, Foursquare).

## Must-Have Features

### Map & List View
- Interactive map with pins for food spots
- Synced list view that updates with map interactions

### Place Page
Each place should display:
- Name and address
- Tags/categories
- Must-try item recommendation
- Operating hours
- Price range
- Photos

### Search & Filters
- "Near me" location-based search
- "Open now" filter
- Category filters (e.g., cafe, restaurant, street food)
- Price range filter

### Discovery Features
- Show distance from user
- Simple "Trending" sort algorithm
- Aggregate rating combining Google + one extra review source

## Technical Requirements

- Build a functional web app (any stack welcome)
- Integrate Google Places/Maps API
- Integrate at least one additional review source API
- Mobile-responsive design

## How to Submit

1. Deploy a live demo
2. Create a public repository with clear README
3. Reply to the bounty post on X with your links
4. Tag @KrackedDevs

## Judging Criteria

- Functionality and feature completeness
- UI/UX design quality
- Code quality and documentation
- Creative implementation of "Trending" algorithm
- Overall polish and attention to detail`,
    reward: 200,
    difficulty: "advanced",
    status: "active",
    tags: ["maps", "api", "food", "fullstack", "google-places", "react"],
    requirements: [
      "Map with pins + synced list view",
      "Place page with name, address, tags, must-try item, hours, price, and photo",
      "Search and filters (near me, open now, category, price)",
      "Show distance and simple 'Trending' sort",
      "Aggregate rating using Google + one extra review source",
      "Live demo + public repo + short README",
    ],
    repositoryUrl: "https://github.com/solahidris/krackeddev",
    bountyPostUrl: "https://x.com/KrackedDevs",
    createdAt: "2025-12-12T10:00:00+08:00",
    deadline: "2025-12-17T23:59:00+08:00",
    submissions: [],
  },
];

export function getBountyBySlug(slug: string): Bounty | undefined {
  return bounties.find((b) => b.slug === slug);
}

export function getActiveBounties(): Bounty[] {
  return bounties.filter((b) => b.status === "active");
}

export function getAllBounties(): Bounty[] {
  return bounties;
}

export function getBountiesByStatus(status: Bounty["status"]): Bounty[] {
  return bounties.filter((b) => b.status === status);
}

export function getCompletedBounties(): Bounty[] {
  return bounties.filter((b) => b.status === "completed");
}
