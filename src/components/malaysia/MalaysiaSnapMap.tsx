"use client";

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { MALAYSIA_MEMBERS, MalaysiaMember } from '@/lib/malaysia/members';

interface MemberPinProps {
  member: MalaysiaMember;
  left: number;
  top: number;
  onClick: (member: MalaysiaMember) => void;
}

function MemberPin({ member, left, top, onClick }: MemberPinProps) {
  const [isHovered, setIsHovered] = useState(false);
  const pinSize = 50; // Base size of the pin
  const headRadius = pinSize * 0.4; // Radius of the circular head
  const pointLength = pinSize * 0.35; // Length of the pointy bottom

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick(member);
  };

  return (
    <div
      className="absolute cursor-pointer transition-transform duration-200 z-10"
      style={{
        left: `${left}px`,
        top: `${top}px`,
        transform: `translate(-50%, -100%) ${isHovered ? 'scale(1.15)' : 'scale(1)'}`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Pin shadow */}
      <div
        className="absolute"
        style={{
          left: '2px',
          top: `${headRadius + pointLength + 2}px`,
          width: `${pinSize * 0.15}px`,
          height: `${pinSize * 0.1}px`,
          background: 'rgba(0, 0, 0, 0.25)',
          borderRadius: '50%',
          transform: 'translateX(-50%)',
        }}
      />

      {/* Pin pointy bottom */}
      <div
        className="absolute"
        style={{
          left: '50%',
          top: `${headRadius}px`,
          width: `${pinSize * 0.15}px`,
          height: `${pointLength}px`,
          background: '#dc2626',
          clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)',
          transform: 'translateX(-50%)',
        }}
      />

      {/* Pin head with avatar */}
      <div
        className="relative bg-white rounded-full border-2 border-red-600 overflow-hidden shadow-lg"
        style={{
          width: `${headRadius * 2}px`,
          height: `${headRadius * 2}px`,
        }}
      >
        <Image
          src={member.avatarUrl}
          alt={member.name}
          width={headRadius * 2}
          height={headRadius * 2}
          className="w-full h-full object-cover"
          unoptimized
        />
        {/* Highlight effect */}
        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 50%)',
          }}
        />
      </div>

      {/* Member name tooltip on hover */}
      {isHovered && (
        <div
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded whitespace-nowrap pointer-events-none"
          style={{ zIndex: 20 }}
        >
          {member.name}
          {member.region && (
            <div className="text-gray-400 text-[10px] mt-0.5">{member.region}</div>
          )}
        </div>
      )}
    </div>
  );
}

interface MemberDetailsModalProps {
  member: MalaysiaMember | null;
  onClose: () => void;
}

function MemberDetailsModal({ member, onClose }: MemberDetailsModalProps) {
  if (!member) return null;

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <>
      <div
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="bg-gray-900 border-4 border-red-600 max-w-md w-full max-h-[90vh] overflow-y-auto flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-red-600">
            <h2 className="text-2xl text-red-400 font-bold">MEMBER PROFILE</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-red-400 text-xl transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 space-y-4">
            {/* Avatar and Name */}
            <div className="flex flex-col items-center space-y-3">
              <div className="relative w-24 h-24 rounded-full border-4 border-red-600 overflow-hidden">
                <Image
                  src={member.avatarUrl}
                  alt={member.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white">{member.name}</h3>
                {member.role && (
                  <p className="text-gray-400 text-sm mt-1">{member.role}</p>
                )}
                {member.region && (
                  <p className="text-red-400 text-xs mt-1">📍 {member.region}</p>
                )}
              </div>
            </div>

            {/* Level */}
            {member.level && (
              <div className="bg-gray-800 border-2 border-gray-700 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Level</span>
                  <span className="text-yellow-400 font-bold text-lg">Lv.{member.level}</span>
                </div>
              </div>
            )}

            {/* Bio */}
            {member.bio && (
              <div className="bg-gray-800 border-2 border-gray-700 rounded-lg p-3">
                <h4 className="text-white font-semibold mb-2">About</h4>
                <p className="text-gray-300 text-sm">{member.bio}</p>
              </div>
            )}

            {/* Stats */}
            {member.stats && (
              <div className="bg-gray-800 border-2 border-gray-700 rounded-lg p-3">
                <h4 className="text-white font-semibold mb-3">Activity Stats</h4>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <div className="text-red-400 font-bold text-xl">{member.stats.posts || 0}</div>
                    <div className="text-gray-400 text-xs mt-1">Posts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-red-400 font-bold text-xl">{member.stats.comments || 0}</div>
                    <div className="text-gray-400 text-xs mt-1">Comments</div>
                  </div>
                  <div className="text-center">
                    <div className="text-red-400 font-bold text-xl">{member.stats.likes || 0}</div>
                    <div className="text-gray-400 text-xs mt-1">Likes</div>
                  </div>
                </div>
              </div>
            )}

            {/* Joined Date */}
            {member.joinedDate && (
              <div className="bg-gray-800 border-2 border-gray-700 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Member since</span>
                  <span className="text-white text-sm">
                    {new Date(member.joinedDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-red-600 text-center">
            <p className="text-gray-500 text-sm">Press ESC to close</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default function MalaysiaSnapMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapDimensions, setMapDimensions] = useState({ width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [svgLoaded, setSvgLoaded] = useState(false);
  const [selectedMember, setSelectedMember] = useState<MalaysiaMember | null>(null);

  // Calculate map dimensions based on SVG aspect ratio
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;
        
        // SVG aspect ratio (from the actual SVG dimensions)
        const svgAspectRatio = 1317.8705 / 1561.5887; // Approximate from SVG
        
        // Calculate dimensions that fit within container
        let width, height;
        const widthByHeight = containerHeight * svgAspectRatio;
        const heightByWidth = containerWidth / svgAspectRatio;
        
        if (widthByHeight <= containerWidth) {
          height = containerHeight * 0.9; // 90% of container height
          width = height * svgAspectRatio;
        } else {
          width = containerWidth * 0.9; // 90% of container width
          height = width / svgAspectRatio;
        }
        
        setMapDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Handle mouse drag for panning
  const handleMouseDown = (e: React.MouseEvent) => {
    // Don't start dragging if clicking on a pin
    if ((e.target as HTMLElement).closest('[data-member-pin]')) {
      return;
    }
    setIsDragging(true);
    setDragStart({ x: e.clientX - translate.x, y: e.clientY - translate.y });
  };

  const handleMemberClick = (member: MalaysiaMember) => {
    setSelectedMember(member);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setTranslate({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle wheel for zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setScale((prev) => Math.max(0.8, Math.min(2.0, prev * delta)));
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center bg-gray-900 overflow-hidden relative"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      {/* Map container with transform */}
      <div
        className="relative"
        style={{
          width: `${mapDimensions.width}px`,
          height: `${mapDimensions.height}px`,
          transform: `translate3d(${translate.x}px, ${translate.y}px, 0) scale(${scale})`,
          transformOrigin: 'center center',
          transition: isDragging ? 'none' : 'transform 0.1s ease-out',
        }}
        onMouseDown={handleMouseDown}
      >
        {/* Malaysia SVG background */}
        <div className="relative w-full h-full">
          <Image
            src="/malaysia-map.svg"
            alt="Malaysia Map"
            fill
            className="object-contain"
            priority
            unoptimized
            onLoad={() => setSvgLoaded(true)}
          />
        </div>

        {/* Member pins */}
        {mapDimensions.width > 0 && mapDimensions.height > 0 &&
          MALAYSIA_MEMBERS.map((member) => (
            <div key={member.id} data-member-pin>
              <MemberPin
                member={member}
                left={member.x * mapDimensions.width}
                top={member.y * mapDimensions.height}
                onClick={handleMemberClick}
              />
            </div>
          ))}
      </div>

      {/* Zoom controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-20">
        <button
          onClick={() => setScale((prev) => Math.min(2.0, prev * 1.2))}
          className="w-10 h-10 bg-black/70 backdrop-blur-sm border-2 border-white/30 rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-colors"
          aria-label="Zoom in"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        <button
          onClick={() => setScale((prev) => Math.max(0.8, prev * 0.8))}
          className="w-10 h-10 bg-black/70 backdrop-blur-sm border-2 border-white/30 rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-colors"
          aria-label="Zoom out"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        <button
          onClick={() => {
            setTranslate({ x: 0, y: 0 });
            setScale(1);
          }}
          className="w-10 h-10 bg-black/70 backdrop-blur-sm border-2 border-white/30 rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-colors text-xs"
          aria-label="Reset view"
        >
          ↻
        </button>
      </div>

      {/* Legend - positioned below header, centered but offset to the left */}
      <div className="absolute top-16 left-1/2 -translate-x-[45%] bg-black/70 backdrop-blur-sm border-2 border-white/30 rounded-lg px-3 py-2 text-white text-sm z-20">
        <div className="font-semibold">Active Members in Malaysia</div>
        <div className="text-gray-400 text-xs mt-1">{MALAYSIA_MEMBERS.length} members online</div>
      </div>

      {/* Member Details Modal */}
      <MemberDetailsModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </div>
  );
}

