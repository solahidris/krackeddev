"use client";

import React from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface TechStackChartProps {
    data: { name: string; value: number }[];
}

export function TechStackChart({ data }: TechStackChartProps) {
    return (
        <div className="w-full h-[250px] md:h-[400px] border rounded-lg bg-card p-4">
            <h3 className="text-lg font-semibold mb-4">Top Tech Stacks</h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#374151" />
                    <XAxis type="number" stroke="#9ca3af" tick={{ fontSize: 10 }} />
                    <YAxis
                        dataKey="name"
                        type="category"
                        stroke="#9ca3af"
                        width={75}
                        tick={{ fontSize: 11 }}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f3f4f6' }}
                        cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                    />
                    <Bar dataKey="value" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
