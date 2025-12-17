# API Contracts

**Runtime:** Next.js Edge Runtime
**Base URL:** `/api`

## Jobs API

### `GET /api/jobs`
Fetch paginated list of jobs with filters.

**Parameters (Query):**
*   `limit`: Number (Default: 10)
*   `cursor`: Number (Offset-based, Default: 0)
*   `search`: String (Matches title or company)
*   `location`: String (Partial match)
*   `type`: String (Exact match `employmentType`)
*   `salary_min`: Number (Returns jobs with `salaryMin` >= value)

**Response:**
```json
{
  "data": [
    {
      "id": "string",
      "title": "string",
      "company": "string",
      // ...job fields
    }
  ],
  "nextCursor": number | null
}
```

### `GET /api/jobs/filters`
Fetch available filter options for frontend.

**Response:**
```json
{
  "locations": ["string", "string"], // Distinct, sorted, non-null
  "types": ["string", "string"]      // Distinct, sorted, non-null
}
```

### `GET /api/jobs/[id]`
(Inferred from file structure `src/app/api/jobs/[id]/route.ts`)
Fetch single job details.
