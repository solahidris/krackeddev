'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useJobBoard } from '@/app/context/JobBoardContext';
import { ExternalLink, MapPin, Briefcase, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  salary?: string;
  techStack: string[];
  description: string;
  applyUrl: string;
  postedDate: string;
}

interface JobCardProps {
  job: Job;
  onView?: () => void;
}

export function JobCard({ job, onView }: JobCardProps) {
  const { viewJob, applyToJob } = useJobBoard();
  const [viewed, setViewed] = useState(false);
  const [applied, setApplied] = useState(false);

  const handleView = () => {
    if (!viewed) {
      viewJob(job.id);
      setViewed(true);
      onView?.();
    }
  };

  const handleApply = () => {
    if (!applied) {
      applyToJob(job.id);
      setApplied(true);
      window.open(job.applyUrl, '_blank');
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Remote':
        return 'text-zinc-600';
      case 'Full-time':
        return 'text-blue-400';
      case 'Part-time':
        return 'text-yellow-400';
      case 'Contract':
        return 'text-purple-400';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      onClick={handleView}
      className="cursor-pointer"
    >
      <Card className="border-zinc-700/30 bg-black/40 backdrop-blur-md hover:border-zinc-600/40 transition-all h-full flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-zinc-50 mb-1">{job.title}</h3>
              <p className="text-zinc-600 font-mono text-sm">{job.company}</p>
            </div>
            {viewed && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-zinc-600"
              >
                <Zap className="w-5 h-5" />
              </motion.div>
            )}
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {job.location}
            </div>
            <div className={`flex items-center gap-1 ${getTypeColor(job.type)}`}>
              <Briefcase className="w-3 h-3" />
              {job.type}
            </div>
            {job.salary && (
              <div className="text-zinc-600 font-mono">{job.salary}</div>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex-1">
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{job.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {job.techStack.slice(0, 5).map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
            {job.techStack.length > 5 && (
              <Badge variant="outline" className="text-xs">
                +{job.techStack.length - 5}
              </Badge>
            )}
          </div>
          <div className="text-xs text-muted-foreground font-mono">
            Posted {job.postedDate}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            variant="cyberpunk"
            className="w-full"
            onClick={(e) => {
              e.stopPropagation();
              handleApply();
            }}
            disabled={applied}
          >
            {applied ? (
              <>
                <Zap className="w-4 h-4" />
                Applied! +50 XP
              </>
            ) : (
              <>
                <ExternalLink className="w-4 h-4" />
                Apply Now
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

