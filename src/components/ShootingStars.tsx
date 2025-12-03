"use client";

import React, { useEffect } from 'react';

export const ShootingStars = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute h-[2px] w-[100px] bg-gradient-to-r from-transparent via-white to-transparent"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transform: `rotate(-45deg)`,
            animation: `shooting-star ${Math.random() * 3 + 2}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
            opacity: 0,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes shooting-star {
          0% {
            transform: translateX(0) translateY(0) rotate(-45deg);
            opacity: 1;
          }
          20% {
             opacity: 1;
          }
          100% {
            transform: translateX(-500px) translateY(500px) rotate(-45deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

