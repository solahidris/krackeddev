"use client";

import React, { useMemo, useState } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

const GEO_URL = "/malaysia-states.json";

interface AnalyticsMapProps {
    data: { name: string; value: number }[];
}

export function AnalyticsMap({ data }: AnalyticsMapProps) {
    const [position, setPosition] = useState({ coordinates: [109, 4] as [number, number], zoom: 1 });
    const [tooltipContent, setTooltipContent] = useState<string | null>(null);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

    const colorScale = useMemo(() => {
        const max = Math.max(...data.map(d => d.value), 1);
        return scaleLinear<string>()
            .domain([0, max])
            .range(["#2d3748", "#38b2ac"]); // Cyberpunk-ish teal range
    }, [data]);

    function handleZoomIn() {
        if (position.zoom >= 4) return;
        setPosition(pos => ({ ...pos, zoom: pos.zoom * 1.5 }));
    }

    function handleZoomOut() {
        if (position.zoom <= 0.5) return; // Allow zooming out more (0.5x)
        setPosition(pos => ({ ...pos, zoom: pos.zoom / 1.5 }));
    }

    function handleMoveEnd(position: { coordinates: [number, number]; zoom: number }) {
        setPosition(position);
    }

    return (
        <div className="w-full h-[300px] md:h-[400px] border rounded-lg bg-card p-4 flex flex-col relative overflow-hidden">
            <h3 className="text-lg font-semibold mb-2 md:mb-4 text-left">User Distribution (Malaysia)</h3>

            {/* Zoom Controls */}
            <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                <Button variant="secondary" size="icon" onClick={handleZoomIn} className="h-8 w-8">
                    <Plus className="h-4 w-4" />
                </Button>
                <Button variant="secondary" size="icon" onClick={handleZoomOut} className="h-8 w-8">
                    <Minus className="h-4 w-4" />
                </Button>
            </div>

            {/* Custom Tooltip */}
            {tooltipContent && (
                <div
                    className="absolute z-20 pointer-events-none bg-popover text-popover-foreground px-3 py-2 rounded-md shadow-md text-sm border border-border"
                    style={{
                        left: tooltipPos.x + 10,
                        top: tooltipPos.y + 10
                    }}
                >
                    {tooltipContent}
                </div>
            )}

            <div
                className="w-full h-full cursor-grab active:cursor-grabbing touch-none" // prevent scroll on mobile when dragging map
                onMouseMove={(e) => {
                    // Update tooltip position relative to container
                    // This is a bit expensive but gives the "following" effect
                    // Optimization: throttle if needed, but for this simple map it's fine
                    const rect = e.currentTarget.getBoundingClientRect();
                    setTooltipPos({
                        x: e.clientX - rect.left,
                        y: e.clientY - rect.top
                    });
                }}
            >
                <ComposableMap
                    projection="geoMercator"
                    projectionConfig={{
                        scale: 3500,
                        center: [109, 4]
                    }}
                    width={800}
                    height={400}
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <ZoomableGroup
                        zoom={position.zoom}
                        center={position.coordinates}
                        onMoveEnd={handleMoveEnd}
                        minZoom={0.5}
                        maxZoom={4}
                    >
                        <Geographies geography={GEO_URL}>
                            {({ geographies }) =>
                                geographies.map((geo) => {
                                    // Match state name from geo properties to our data
                                    const stateName = geo.properties.name || geo.properties.STATE; // Fallback for diff geojson
                                    const cur = data.find(s => s.name.toLowerCase().includes(stateName?.toLowerCase()));
                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            fill={cur ? colorScale(cur.value) : "#1a202c"}
                                            stroke="#4a5568"
                                            strokeWidth={0.5}
                                            style={{
                                                default: { outline: "none" },
                                                hover: { fill: "#4fd1c5", outline: "none" },
                                                pressed: { outline: "none" },
                                            }}
                                            onMouseEnter={() => {
                                                setTooltipContent(`${stateName}: ${cur?.value || 0} Users`);
                                            }}
                                            onMouseLeave={() => {
                                                setTooltipContent(null);
                                            }}
                                            // Handle Touch for Tooltip (Mobile)
                                            onTouchStart={() => {
                                                setTooltipContent(`${stateName}: ${cur?.value || 0} Users`);
                                            }}
                                        />
                                    );
                                })
                            }
                        </Geographies>
                    </ZoomableGroup>
                </ComposableMap>
            </div>
            {/* Legend/Info */}
            <div className="absolute bottom-4 left-4 flex flex-wrap items-center gap-2 text-[10px] md:text-xs text-muted-foreground p-1 md:p-2 bg-background/80 rounded border">
                <div className="flex items-center">
                    <span className="w-2 h-2 md:w-3 md:h-3 bg-[#38b2ac] rounded-full inline-block mr-1"></span>
                    <span>Active</span>
                </div>
                <div className="flex items-center ml-2">
                    <span className="w-2 h-2 md:w-3 md:h-3 bg-[#1a202c] rounded-full inline-block mr-1 border border-gray-600"></span>
                    <span>No Users</span>
                </div>
            </div>
        </div>
    );
}
