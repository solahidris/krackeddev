"use client";

import React, { useMemo } from 'react';

interface ContributionData {
  date: string; // YYYY-MM-DD format
  count: number; // Number of contributions on this date
}

interface ProfileHeatmapProps {
  contributions?: ContributionData[];
  year?: number;
}

// Generate mock data if none provided (for demo purposes)
const generateMockContributions = (year: number): ContributionData[] => {
  const contributions: ContributionData[] = [];
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);
  
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    // Random contributions (0-5) with some days having more activity
    const dayOfWeek = d.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const baseCount = isWeekend ? 0 : Math.floor(Math.random() * 3);
    const randomBoost = Math.random() < 0.1 ? Math.floor(Math.random() * 3) : 0;
    const count = Math.min(baseCount + randomBoost, 5);
    
    contributions.push({
      date: d.toISOString().split('T')[0],
      count,
    });
  }
  
  return contributions;
};

// Get color intensity based on contribution count
const getColorIntensity = (count: number): string => {
  if (count === 0) return 'bg-green-900/20'; // Very light green for no contributions
  if (count === 1) return 'bg-green-700/40'; // Light green
  if (count === 2) return 'bg-green-600/60'; // Medium green
  if (count === 3) return 'bg-green-500/80'; // Darker green
  if (count === 4) return 'bg-green-400'; // Even darker green
  return 'bg-green-300'; // Brightest green for 5+ contributions
};

// Get week start date (Sunday)
const getWeekStart = (date: Date): Date => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  return new Date(d.setDate(diff));
};

export const ProfileHeatmap: React.FC<ProfileHeatmapProps> = ({ 
  contributions, 
  year = new Date().getFullYear() 
}) => {
  // Generate or use provided contributions
  const contributionData = useMemo(() => {
    if (contributions && contributions.length > 0) {
      return contributions;
    }
    return generateMockContributions(year);
  }, [contributions, year]);

  // Create a map for quick lookup
  const contributionMap = useMemo(() => {
    const map = new Map<string, number>();
    contributionData.forEach(({ date, count }) => {
      map.set(date, count);
    });
    return map;
  }, [contributionData]);

  // Generate weeks (52 weeks)
  const weeks = useMemo(() => {
    const weeksArray: Date[][] = [];
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);
    
    // Find the first Sunday of the year (or before)
    let currentDate = getWeekStart(startDate);
    
    for (let week = 0; week < 52; week++) {
      const weekDays: Date[] = [];
      for (let day = 0; day < 7; day++) {
        const dayDate = new Date(currentDate);
        dayDate.setDate(currentDate.getDate() + day);
        if (dayDate <= endDate && dayDate >= new Date(year, 0, 1)) {
          weekDays.push(dayDate);
        }
      }
      if (weekDays.length > 0) {
        weeksArray.push(weekDays);
      }
      currentDate.setDate(currentDate.getDate() + 7);
    }
    
    return weeksArray;
  }, [year]);

  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Get month labels for weeks
  const getMonthLabel = (weekIndex: number): string | null => {
    if (weeks[weekIndex] && weeks[weekIndex].length > 0) {
      const firstDay = weeks[weekIndex][0];
      if (firstDay.getDate() <= 7) {
        return monthLabels[firstDay.getMonth()];
      }
    }
    return null;
  };

  return (
    <div className="w-full p-4">
      <div className="bg-gray-800/50 border border-green-500/30 rounded-lg p-6">
        <h3 className="text-xl font-bold text-green-400 mb-4">Contribution Activity</h3>
        
        {/* Legend */}
        <div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-green-900/20 border border-green-700/30 rounded-sm" />
            <div className="w-3 h-3 bg-green-700/40 border border-green-600/30 rounded-sm" />
            <div className="w-3 h-3 bg-green-600/60 border border-green-500/30 rounded-sm" />
            <div className="w-3 h-3 bg-green-500/80 border border-green-400/30 rounded-sm" />
            <div className="w-3 h-3 bg-green-400 border border-green-300/30 rounded-sm" />
          </div>
          <span>More</span>
        </div>

        {/* Heatmap Grid */}
        <div className="overflow-x-auto">
          <div className="flex gap-1 min-w-max">
            {/* Day labels column */}
            <div className="flex flex-col gap-1 pr-2">
              <div className="h-4" /> {/* Spacer for month labels */}
              {dayLabels.map((day, idx) => (
                <div
                  key={day}
                  className="h-3 text-xs text-gray-400 flex items-center"
                  style={{ height: '11px' }}
                >
                  {idx % 2 === 1 ? day : ''}
                </div>
              ))}
            </div>

            {/* Weeks */}
            <div className="flex gap-1">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1 relative">
                  {/* Month label */}
                  {getMonthLabel(weekIndex) && (
                    <div className="h-4 text-xs text-gray-400 mb-1">
                      {getMonthLabel(weekIndex)}
                    </div>
                  )}
                  {!getMonthLabel(weekIndex) && <div className="h-4" />}
                  
                  {/* Days in week */}
                  {dayLabels.map((_, dayIndex) => {
                    const dayDate = week[dayIndex];
                    if (!dayDate) {
                      return <div key={dayIndex} className="w-3 h-3" />;
                    }
                    
                    const dateStr = dayDate.toISOString().split('T')[0];
                    const count = contributionMap.get(dateStr) || 0;
                    const colorClass = getColorIntensity(count);
                    
                    return (
                      <div
                        key={dayIndex}
                        className={`w-3 h-3 ${colorClass} border border-green-700/20 rounded-sm cursor-pointer hover:border-green-400 hover:scale-110 transition-all relative group`}
                        title={`${dayDate.toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}: ${count} contribution${count !== 1 ? 's' : ''}`}
                      >
                        {/* Tooltip on hover */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 border border-green-500 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none z-10 transition-opacity">
                          {dayDate.toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}: {count} contribution{count !== 1 ? 's' : ''}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-6 pt-4 border-t border-green-500/30">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-400">
                {contributionData.reduce((sum, d) => sum + d.count, 0)}
              </div>
              <div className="text-xs text-gray-400 mt-1">Total Contributions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">
                {contributionData.filter(d => d.count > 0).length}
              </div>
              <div className="text-xs text-gray-400 mt-1">Days Active</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">
                {Math.round((contributionData.filter(d => d.count > 0).length / contributionData.length) * 100)}%
              </div>
              <div className="text-xs text-gray-400 mt-1">Activity Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
