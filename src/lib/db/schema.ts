import { pgTable, uuid, text, integer, timestamp, index, boolean } from 'drizzle-orm/pg-core';

// ============================================
// PROFILES TABLE
// Matches: supabase/migrations/001_create_profiles_table.sql
// ============================================
export const profiles = pgTable(
  'profiles',
  {
    id: uuid().primaryKey(), // References auth.users(id) - managed by Supabase
    username: text(),
    fullName: text('full_name'),
    avatarUrl: text('avatar_url'),
    email: text(),
    provider: text(),
    githubUrl: text('github_url'),
    bio: text(),
    level: integer().default(1),
    xp: integer().default(0),
    role: text().default('user').notNull(), // 'user' | 'admin'
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    usernameIdx: index('profiles_username_idx').on(table.username),
  })
);

// ============================================
// PAGE VIEWS TABLE
// Matches: supabase/migrations/002_create_page_views_table.sql
// ============================================
export const pageViews = pgTable(
  'page_views',
  {
    id: uuid().primaryKey().defaultRandom(),
    pagePath: text('page_path').notNull(),
    visitorId: text('visitor_id'),
    userAgent: text('user_agent'),
    referrer: text(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    pagePathIdx: index('page_views_page_path_idx').on(table.pagePath),
    createdAtIdx: index('page_views_created_at_idx').on(table.createdAt),
    visitorIdIdx: index('page_views_visitor_id_idx').on(table.visitorId),
  })
);

// ============================================
// JOBS TABLE
// For job board/listings functionality
// ============================================
export const jobs = pgTable(
  'jobs',
  {
    id: text().primaryKey(), // External job ID from source (e.g., "88959607")
    title: text().notNull(),
    company: text().notNull(),
    companyLogo: text('company_logo'),
    description: text().notNull(),
    location: text().notNull(),
    isRemote: boolean('is_remote').default(false),
    salaryMin: integer('salary_min'), // Minimum salary in MYR
    salaryMax: integer('salary_max'), // Maximum salary in MYR
    employmentType: text('employment_type'), // "Full time", "Part time", "Contract", etc.
    sourceUrl: text('source_url'), // Original job posting URL
    sourceSite: text('source_site'), // "JobStreet", "LinkedIn", etc.
    postedAt: timestamp('posted_at', { withTimezone: true }),
    scrapedAt: timestamp('scraped_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
    isActive: boolean('is_active').default(true),
  },
  (table) => ({
    companyIdx: index('jobs_company_idx').on(table.company),
    locationIdx: index('jobs_location_idx').on(table.location),
    isActiveIdx: index('jobs_is_active_idx').on(table.isActive),
    postedAtIdx: index('jobs_posted_at_idx').on(table.postedAt),
    sourceSiteIdx: index('jobs_source_site_idx').on(table.sourceSite),
  })
);
