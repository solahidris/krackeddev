"use client";

import React from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface UserGrowthChartProps {
    data: { date: string; count: number }[];
}

export function UserGrowthChart({ data }: UserGrowthChartProps) {
    return (
        <div className="w-full h-[300px] md:h-[400px] border rounded-lg bg-card p-4">
            <h3 className="text-lg font-semibold mb-4">User Growth</h3>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#38b2ac" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#38b2ac" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="date" stroke="#9ca3af" tick={{ fontSize: 10 }} />
                    <YAxis stroke="#9ca3af" tick={{ fontSize: 10 }} />
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f3f4f6' }}
                    />
                    <Area type="monotone" dataKey="count" stroke="#38b2ac" fillOpacity={1} fill="url(#colorCount)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
