import { BountyInput } from './schemas';

export interface ActionResult<T> {
    data: T | null;
    error: string | null;
}

export type BountyInputData = BountyInput;

export interface AnalyticsData {
    totalUsers: number;
    locationDistribution: { name: string; value: number }[];
    stackDistribution: { name: string; value: number }[];
    roleDistribution: { name: string; value: number }[];
    userGrowth: { date: string; count: number }[];
}
