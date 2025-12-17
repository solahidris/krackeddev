# Data Models

**Source:** `src/lib/db/schema.ts`
**ORM:** Drizzle ORM
**Database:** PostgreSQL (Supabase)

## Core Tables

### `profiles`
User profiles synced with Supabase Auth.
*   `id`: UUID (PK, references auth.users)
*   `username`: Text (Indexed)
*   `full_name`: Text
*   `avatar_url`: Text
*   `email`: Text
*   `provider`: Text
*   `github_url`: Text
*   `bio`: Text
*   `level`: Integer (Default: 1)
*   `xp`: Integer (Default: 0)
*   `timestamps`: `created_at`, `updated_at`

### `jobs`
Job listings for the board.
*   `id`: Text (PK, External ID)
*   `title`: Text
*   `company`: Text (Indexed)
*   `company_logo`: Text
*   `description`: Text
*   `location`: Text (Indexed)
*   `is_remote`: Boolean
*   `salary_min`: Integer
*   `salary_max`: Integer
*   `employment_type`: Text
*   `source_url`: Text
*   `source_site`: Text (Indexed)
*   `timestamps`: `posted_at`, `scraped_at`, `updated_at`
*   `is_active`: Boolean (Indexed)

### `page_views`
Simple analytics tracking.
*   `id`: UUID (PK)
*   `page_path`: Text (Indexed)
*   `visitor_id`: Text (Indexed)
*   `user_agent`: Text
*   `referrer`: Text
*   `created_at`: Timestamp (Indexed)

## Types
Derived TypeScript interfaces exported from `src/types/database.ts`:
*   `Profile`
*   `PageView`
*   `BountySubmissionRow` (Note: Table definition not found in `schema.ts`, only type interface exists. **Discrepancy**)
