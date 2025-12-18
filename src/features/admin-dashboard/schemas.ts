import { z } from 'zod';

export const BountySchema = z.object({
    title: z.string().min(1, 'Title is required'),
    slug: z.string().min(1, 'Slug is required'),
    description: z.string().optional(), // Short summary
    long_description: z.string().optional(), // Full Markdown details
    reward_amount: z.number().min(0, 'Reward amount must be positive'),
    status: z.enum(['draft', 'open', 'pending', 'completed']).default('draft'),
    type: z.string().min(1, 'Type is required'),
    company_name: z.string().optional(),
    skills: z.array(z.string()).default([]),

    // New fields
    difficulty: z.enum(['beginner', 'intermediate', 'advanced', 'expert']).default('intermediate'),
    deadline: z.string().optional(), // ISO string from date picker
    requirements: z.array(z.string()).default([]),
    repository_url: z.string().url().optional().or(z.literal('')),
});

export type BountyInput = z.infer<typeof BountySchema>;
