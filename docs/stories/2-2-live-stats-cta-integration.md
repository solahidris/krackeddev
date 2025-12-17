# Story 2.2: Live Stats & CTA Integration

Status: ready-for-dev

## Story

As a Visitor,
I want to see live stats and clear Call-to-Actions for Brands,
So that I understand the platform's activity and know how to hire talent.

## Acceptance Criteria

1. **Given** I am on the landing page
2. **When** I scroll past the game hero
3. **Then** I should see a "Live Stats" section (FR-LAND-02)
4. **And** I should see a "Brand CTA" section inviting companies to post bounties (FR-LAND-04)
5. **And** these components must match the existing dark/CRT theme

## Technical Requirements

- **Module**: `src/features/landingpage`
- **Components**: `LiveStats`, `BrandCTA`.
- **Data Source**: Stats should be fetched via Server Action (can be cached/mocked initially if DB is empty).
- **Styling**: Tailwind CSS + matching "CRT" scanline aesthetic.

## Architecture Compliance

- **File Structure**:
    - `src/features/landingpage/components/live-stats.tsx`
- **Naming**: `kebab-case` filenames.
- **Barrel Files**: Ensure `index.ts` exists in `src/features/landingpage` and exports public components.
- **Type Safety**: Use generated Supabase types from `src/types/supabase.ts`.

## Dev Notes

- **Stats to Display**: "Payout Volume", "Active Bounties", "Hunters".
- **Mocking**: If `bounties` table is empty, return 0 or mock data for dev to style.
- **Theme**: Reuse the `scanlines` or neon effects from the Townhall component.

### References

- [FR-LAND-02: Live Stats](docs/prd.md#functional-requirements)
- [FR-LAND-04: Brand CTA](docs/prd.md#functional-requirements)

## Dev Agent Record

### Agent Model Used

Antigravity (System Generated)
