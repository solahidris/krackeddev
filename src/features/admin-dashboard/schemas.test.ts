import { describe, it, expect } from 'vitest';
// @ts-ignore - Schema not implemented yet
import { BountySchema } from './schemas';

describe('BountySchema', () => {
    it('should validate a valid bounty', () => {
        const validBounty = {
            title: 'Fix Login Bug',
            slug: 'fix-login-bug',
            description: 'Fix the issue where login fails.',
            reward_amount: 500,
            status: 'open',
            type: 'bug',
            company_name: 'Acme Corp',
        };
        const result = BountySchema.safeParse(validBounty);
        expect(result.success).toBe(true);
    });

    it('should fail if title is missing', () => {
        const invalidBounty = {
            description: 'No title',
            reward_amount: 100,
            status: 'open',
            type: 'feature',
        };
        const result = BountySchema.safeParse(invalidBounty);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].path).toContain('title');
        }
    });

    it('should fail if reward_amount is negative', () => {
        const invalidBounty = {
            title: 'Cheap labor',
            slug: 'cheap-labor',
            reward_amount: -100,
            status: 'open',
            type: 'feature',
        };
        const result = BountySchema.safeParse(invalidBounty);
        expect(result.success).toBe(false);
    });
});
