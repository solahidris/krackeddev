# Story 4.4: Admin Analytics Dashboard

## Background
The admin dashboard needs to provide insights into the user base to help with decision making and community understanding.

## Requirements
1.  **Malaysia User Map**: Interactive map of Malaysia showing user distribution across the 14 states.
2.  **Tech Stack Analytics**: Bar or Pie chart showing the most popular tech stacks among users.
3.  **User Growth**: Line chart showing user registration trends over time.
4.  **Job Role Distribution**: Pie chart showing the distribution of developer roles (Junior, Senior, etc.).

## Technical Implementation
-   **Backend**: 
    -   New Server Action: `getAnalyticsData()` in `src/features/admin-dashboard/actions.ts`.
    -   Aggregation logic to count users by location, stack, role, and date.
-   **Frontend**:
    -   Use `Recharts` for charts (standard in React).
    -   Use `react-simple-maps` or similar lightweight mapping for the world/region map. Or just a simple list if mapping is too complex for now, but user asked for a "map". I'll use a simple SVG map or a list if map libraries are heavy. Given the "WOW" factor requirement, a map is better.
    -   Components: `AnalyticsMap`, `TechStackChart`, `UserGrowthChart`, `RoleDistributionChart`.

## Design
-   Cyberpunk/Dark theme consistent with the rest of the app.
-   Responsive grid layout for the dashboard.
