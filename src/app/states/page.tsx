"use client";

import React from "react";
import { States } from "@/components/States";
import "@/styles/jobs.css";

export default function StatesPage() {
  return (
    <main className="h-screen w-full bg-gray-900 relative overflow-hidden">
      {/* CRT Scanline Overlay */}
      <div className="scanlines fixed inset-0 pointer-events-none z-50"></div>
      <States />
    </main>
  );
}
