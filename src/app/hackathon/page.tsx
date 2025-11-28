'use client';

import React, { useState, useEffect, useRef } from 'react';
import PageHero from '@/components/PageHero';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Trophy, Bug, Star, Code2, Globe, Gamepad2, Award, ArrowRight, Users, Briefcase, FileCode, CheckCircle2, Clock, Zap, Sparkles, Code, Heart, Rocket } from 'lucide-react';

export default function HackathonPage() {
  const [isScopeOpen, setIsScopeOpen] = useState(false);
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [comingSoonBounty, setComingSoonBounty] = useState<number | null>(null);
  
  // Twitter intent URLs with contextually appropriate tweet messages
  const createTwitterUrl = (message: string) => {
    const tweetText = encodeURIComponent(`${message} #KrackedHackathon @masterofnone @solahidris_`);
    return `https://twitter.com/intent/tweet?text=${tweetText}`;
  };
  
  const twitterUrls = {
    joinHackathon: createTwitterUrl("I want to join the hackathon! Ready to compete for RM 1,200 + job opportunities. Who else is joining?"),
    startBounty: createTwitterUrl("I'm starting Bug Bounty #001 - Landing Page Build! Excited to build something amazing."),
    joinLeaderboard: createTwitterUrl("I want to get on that leaderboard! Joining the hackathon now. See you at the top!"),
    contactUs: createTwitterUrl("I have questions about the hackathon. Can someone help me out?"),
    registerFinal: createTwitterUrl("I'm ready to level up! Registering for the hackathon - RM 1,200 + job opportunities await!")
  };
  const [developersCount, setDevelopersCount] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);
  const [companiesCount, setCompaniesCount] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateNumber(200, setDevelopersCount, 2000);
            animateNumber(50, setProjectsCount, 2000);
            animateNumber(10, setCompaniesCount, 2000);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [hasAnimated]);

  const animateNumber = (target: number, setter: (value: number) => void, duration: number) => {
    const start = 0;
    const startTime = performance.now();

    const updateNumber = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(start + (target - start) * easeOutQuart);
      
      setter(current);

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      } else {
        setter(target);
      }
    };

    requestAnimationFrame(updateNumber);
  };

  return (
    <main className="min-h-screen pb-20 overflow-hidden">
      <PageHero 
        title="Want to be a Kracked Dev?" 
        subtitle="A community of cracked developers who want to level up together."
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          <Button 
            size="lg" 
            variant="cyberpunk" 
            asChild
            className="font-mono uppercase tracking-widest border-zinc-700/50 text-zinc-600 hover:bg-zinc-800/30 hover:text-zinc-50"
          >
            <a href={twitterUrls.joinHackathon} target="_blank" rel="noopener noreferrer">
              Join Community
            </a>
          </Button>
          <Button 
            size="lg" 
            variant="cyberpunk" 
            asChild
            className="font-mono uppercase tracking-widest border-zinc-700/50 text-zinc-600 hover:bg-zinc-800/30 hover:text-zinc-50"
          >
            <a href="#bug-bounties">
              Bug Bounties
            </a>
          </Button>
        </div>
      </PageHero>

      {/* Bug Bounty Cards Section */}
      <div id="bug-bounties" className="min-h-screen flex items-center justify-center relative z-10">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 w-full py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <Card className="h-full group transition-all duration-300 border-white/5 hover:border-white/20 hover:bg-white/5 relative opacity-75 flex flex-col">
            <div className="absolute top-2 right-2">
              <Badge className="bg-zinc-700 text-zinc-50 font-mono text-xs">FINISHED</Badge>
            </div>
            <CardHeader>
              <CardTitle className="text-xl mb-2 text-zinc-50 flex items-center gap-2">
                <Code2 className="w-6 h-6 text-zinc-50/70" />
                Bug Bounty #001
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-zinc-50/70">
                <span>Creative Web Design & Frontend</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="mb-4 transition-colors text-muted-foreground group-hover:text-zinc-50/90">
                Showcase your creativity! Build innovative web designs and frontend implementations. Be bold and creative!
              </p>
            </CardContent>
            <CardFooter className="flex gap-2 mt-auto">
              <Button variant="cyberpunk" size="lg" asChild className="flex-1 border-zinc-600/50 text-zinc-50 hover:bg-zinc-800/30 hover:text-zinc-50 font-mono uppercase">
                <a href="https://x.com/masterofnone/status/1992914421883248878?s=20" target="_blank" rel="noopener noreferrer">
                  FINISHED
                </a>
              </Button>
            </CardFooter>
          </Card>

          <Card className="h-full group transition-all duration-300 border-2 border-green-700 bg-black/90 hover:border-green-600 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] relative flex flex-col">
            <div className="absolute top-2 right-2">
              <Badge className="bg-green-700 text-zinc-50 font-mono text-xs shadow-[0_0_10px_rgba(34,197,94,0.2)]">ACTIVE</Badge>
            </div>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="border-green-700 text-green-700 shadow-[0_0_10px_rgba(34,197,94,0.2)]">
                  RM 150
                </Badge>
              </div>
              <CardTitle className="text-xl mb-2 text-green-700 flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-green-700/70" />
                Bug Bounty #002
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-zinc-50/70">
                <span>Gamified Tech Job Board</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="mb-4 transition-colors text-zinc-50 font-semibold group-hover:text-green-700">
                Community voted for a "Gamified Tech Job Board" theme. Winner gets RM150! Build something epic & submit your PR 🌟
              </p>
            </CardContent>
            <CardFooter className="flex gap-2 mt-auto">
              <Button 
                variant="cyberpunk" 
                size="lg" 
                asChild
                onClick={() => window.open('https://x.com/solahidris_/status/1993586176419414145?s=20', '_blank')}
                className="flex-1 border-2 border-green-700 text-green-700 bg-green-700/10 hover:bg-green-700/20 hover:text-zinc-50 font-mono uppercase font-bold"
              >
                <a href="https://x.com/solahidris_/status/1993586176419414145?s=20" target="_blank" rel="noopener noreferrer">
                  Start Bug Bounty #002
                </a>
              </Button>
            </CardFooter>
          </Card>

          <Card className="h-full group transition-all duration-300 border-white/5 hover:border-white/20 hover:bg-white/5 relative opacity-75 flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="border-zinc-600/50 text-zinc-50 text-xs">
                  TBA
                </Badge>
              </div>
              <CardTitle className="text-xl mb-2 text-zinc-50 flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-zinc-50/70" />
                Bug Bounty #003
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-zinc-50/70">
                <span>Game Dev Design</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="mb-4 transition-colors text-muted-foreground group-hover:text-zinc-50/90">
                Coming soon. Game development projects and creative challenges.
              </p>
            </CardContent>
            <CardFooter className="justify-end mt-auto">
              <Button 
                variant="cyberpunk" 
                size="sm" 
                onClick={() => setComingSoonBounty(3)} 
                className="border-zinc-700/50 text-zinc-50 hover:bg-zinc-800/20"
              >
                Coming Soon
              </Button>
            </CardFooter>
          </Card>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="min-h-screen flex items-center justify-center relative z-10">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 w-full py-12">
          <Card className="border-white/10 bg-black/80 backdrop-blur-xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-700 via-green-600 to-green-700" />
          <CardHeader>
            <CardTitle className="text-center text-2xl font-mono uppercase tracking-widest text-green-700">How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-none border-2 border-green-700 flex items-center justify-center mx-auto mb-4 bg-green-700/20 text-green-700 font-mono text-2xl font-bold shadow-[0_0_10px_rgba(34,197,94,0.3)]">
                  1
                </div>
                <h3 className="font-bold text-green-700 mb-2 font-mono">Register & Join</h3>
                <p className="text-sm text-zinc-50/80">Sign up for free and join the hackathon community</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-none border-2 border-green-700 flex items-center justify-center mx-auto mb-4 bg-green-700/20 text-green-700 font-mono text-2xl font-bold shadow-[0_0_10px_rgba(34,197,94,0.3)]">
                  2
                </div>
                <h3 className="font-bold text-green-700 mb-2 font-mono">Choose Bug Bounty</h3>
                <p className="text-sm text-zinc-50/80">Pick a challenge that matches your skills</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-none border-2 border-green-700 flex items-center justify-center mx-auto mb-4 bg-green-700/20 text-green-700 font-mono text-2xl font-bold shadow-[0_0_10px_rgba(34,197,94,0.3)]">
                  3
                </div>
                <h3 className="font-bold text-green-700 mb-2 font-mono">Build & Submit</h3>
                <p className="text-sm text-zinc-50/80">Create your solution and submit for review</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-none border-2 border-green-700 flex items-center justify-center mx-auto mb-4 bg-green-700/20 text-green-700 font-mono text-2xl font-bold shadow-[0_0_10px_rgba(34,197,94,0.3)]">
                  4
                </div>
                <h3 className="font-bold text-green-700 mb-2 font-mono">Win Prizes</h3>
                <p className="text-sm text-zinc-50/80">Earn credits, get hired, and level up</p>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>

        {/* Scoring Method */}
        {/* <Card className="border-neon-primary/30 bg-black/60 mb-16 md:mb-20">
          <CardHeader>
            <CardTitle className="text-neon-primary flex items-center gap-2">
              <Award className="w-5 h-5" />
              Scoring Method
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 p-4 bg-red-500/10 border-l-2 border-red-500 rounded-none">
              <p className="text-red-400 font-mono text-sm flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <strong>Limited Time:</strong> Registration closes soon. Join now to secure your spot!
              </p>
            </div>
            <p className="text-muted-foreground mb-8">Earn points from multiple sources! Your final score combines base points with category bonuses. Top 10 participants earn enhanced visibility with partner companies and automatic interview opportunities.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 font-mono mb-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full border-2 border-neon-primary flex items-center justify-center mb-4 bg-gradient-to-br from-neon-primary/20 to-neon-primary/5 shadow-[0_0_20px_rgba(0,255,65,0.3)] hover:shadow-[0_0_30px_rgba(0,255,65,0.5)] transition-all">
                  <Trophy className="w-10 h-10 text-neon-primary" />
                </div>
                <div className="text-base font-bold text-neon-primary mb-1">Bounty Completion</div>
                <div className="text-xs text-muted-foreground">Base points vary by bounty difficulty</div>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full border-2 border-neon-secondary flex items-center justify-center mb-4 bg-gradient-to-br from-neon-secondary/20 to-neon-secondary/5 shadow-[0_0_20px_rgba(0,143,17,0.3)] hover:shadow-[0_0_30px_rgba(0,143,17,0.5)] transition-all">
                  <Sparkles className="w-10 h-10 text-neon-secondary" />
                </div>
                <div className="text-base font-bold text-neon-secondary mb-1">Creativity Bonus</div>
                <div className="text-xs text-muted-foreground">+50% for most innovative solutions</div>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full border-2 border-neon-accent flex items-center justify-center mb-4 bg-gradient-to-br from-neon-accent/20 to-neon-accent/5 shadow-[0_0_20px_rgba(240,240,240,0.3)] hover:shadow-[0_0_30px_rgba(240,240,240,0.5)] transition-all">
                  <Code className="w-10 h-10 text-neon-accent" />
                </div>
                <div className="text-base font-bold text-neon-accent mb-1">Technical Excellence</div>
                <div className="text-xs text-muted-foreground">+30% for best code quality</div>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full border-2 border-neon-primary flex items-center justify-center mb-4 bg-gradient-to-br from-neon-primary/20 to-neon-primary/5 shadow-[0_0_20px_rgba(0,255,65,0.3)] hover:shadow-[0_0_30px_rgba(0,255,65,0.5)] transition-all">
                  <Heart className="w-10 h-10 text-neon-primary" />
                </div>
                <div className="text-base font-bold text-neon-primary mb-1">Community Impact</div>
                <div className="text-xs text-muted-foreground">+20% for helping others</div>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full border-2 border-white/40 flex items-center justify-center mb-4 bg-gradient-to-br from-white/20 to-white/5 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all">
                  <Rocket className="w-10 h-10 text-zinc-50" />
                </div>
                <div className="text-base font-bold text-zinc-50 mb-1">Early Submission</div>
                <div className="text-xs text-muted-foreground">+10% bonus for early submissions</div>
              </div>
            </div>
            <div className="p-4 bg-gradient-to-r from-neon-primary/10 via-neon-secondary/10 to-neon-accent/10 border-l-2 border-neon-primary rounded-none">
              <p className="text-sm font-mono text-zinc-50">
                <strong className="text-neon-primary">How it works:</strong> Complete bounties to earn base points, then stack bonuses for creativity, technical quality, community help, and early submissions. Multiple ways to win!
              </p>
            </div>
            <div className="mt-6 p-4 bg-neon-primary/10 border-l-2 border-neon-primary">
              <p className="text-sm font-mono text-neon-primary">
                <strong>Top 10 Bonus:</strong> Enhanced visibility with partner companies + automatic interview opportunities
              </p>
            </div>
          </CardContent>
        </Card> */}

        {/* Social Proof Section */}
        {/* <Card className="border-neon-secondary/30 bg-black/60 mb-16 md:mb-20">
          <CardHeader>
            <CardTitle className="text-neon-secondary flex items-center gap-2">
              <Users className="w-5 h-5" />
              Join the Competition
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white/5 rounded-none border border-white/10">
                <div className="text-4xl font-bold text-neon-primary mb-2 font-mono">{developersCount}+</div>
                <p className="text-sm text-muted-foreground">Developers Competing</p>
              </div>
              <div className="text-center p-6 bg-white/5 rounded-none border border-white/10">
                <div className="text-4xl font-bold text-neon-secondary mb-2 font-mono">{projectsCount}+</div>
                <p className="text-sm text-muted-foreground">Projects Submitted</p>
              </div>
              <div className="text-center p-6 bg-white/5 rounded-none border border-white/10">
                <div className="text-4xl font-bold text-neon-accent mb-2 font-mono">{companiesCount}</div>
                <p className="text-sm text-muted-foreground">Partner Companies</p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-neon-secondary/10 border-l-2 border-neon-secondary">
              <p className="text-sm text-muted-foreground italic">
                "The hackathon helped me land my dream job. The exposure and networking opportunities are incredible!" - Previous Winner
              </p>
            </div>
          </CardContent>
        </Card> */}

      {/* Leaderboard Section */}
      <div className="min-h-screen flex items-center justify-center relative z-10">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 w-full py-12">
          <Card className="border-white/10 bg-black/80 backdrop-blur-xl overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-700 via-green-600 to-green-700" />
          <CardHeader>
            <div className="text-center text-2xl font-mono uppercase tracking-widest flex items-center justify-center gap-3">
              <Code2 className="w-6 h-6 text-green-700" />
              <CardTitle className="text-green-700">Leaderboard</CardTitle>
              <Code2 className="w-6 h-6 text-green-700" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="border-b border-white/10 hover:bg-white/5">
                    <TableHead className="w-[100px] text-green-700 font-mono">Rank</TableHead>
                    <TableHead className="text-green-700 font-mono">Name</TableHead>
                    <TableHead className="text-green-700 font-mono">Project</TableHead>
                    <TableHead className="text-green-700 font-mono">Focus</TableHead>
                    <TableHead className="text-right text-green-700 font-mono">Points</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { rank: 1, name: "Ali Z.", project: "Auto-Receipt AI", focus: "Automation", points: "1,250" },
                    { rank: 2, name: "Sarah M.", project: "VibeMatch", focus: "Social", points: "980" },
                    { rank: 3, name: "Ken T.", project: "CryptoTracker MY", focus: "Finance", points: "850" },
                    { rank: 4, name: "Mei Ling", project: "Pasar Malam Maps", focus: "Geo", points: "720" },
                    { rank: 5, name: "Rajiv K.", project: "Math Solver Bot", focus: "Education", points: "690" },
                  ].map((row) => (
                    <TableRow key={row.rank} className="border-b border-white/5 hover:bg-white/5 transition-colors font-mono text-sm">
                      <TableCell className="font-bold text-green-700">#{row.rank}</TableCell>
                      <TableCell className="font-bold text-zinc-50">{row.name}</TableCell>
                      <TableCell className="text-zinc-50/80">{row.project}</TableCell>
                      <TableCell><Badge variant="secondary" className="bg-green-700/20 text-green-700 border border-green-700/40 text-sm font-medium px-3 py-1 rounded-none">{row.focus}</Badge></TableCell>
                      <TableCell className="text-right font-bold text-green-700">{row.points}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-6 text-center">
              <p className="text-zinc-50/80 mb-4 font-mono">Want to see your name here?</p>
              <Button size="lg" variant="cyberpunk" asChild className="font-mono uppercase tracking-widest border-green-700 text-green-700 hover:bg-green-700/20 hover:text-green-600">
                <a href={twitterUrls.joinLeaderboard} target="_blank" rel="noopener noreferrer">
                  Join Now <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="min-h-screen flex items-center justify-center relative z-10">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 w-full py-12">
          <div className="relative overflow-hidden w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-green-700/20 via-green-600/20 to-green-700/20 blur-3xl" />
          <Card className="relative border-2 border-green-700/50 bg-black/90 backdrop-blur-xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-700 via-green-600 to-green-700" />
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-4 font-mono uppercase tracking-widest">
                Ready to Level Up?
              </h2>
              <p className="text-xl text-zinc-50/90 mb-8 max-w-2xl mx-auto">
                Join the hackathon and compete for RM 1,200 + job opportunities with partner companies
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" variant="cyberpunk" asChild className="h-14 px-10 text-lg font-mono uppercase tracking-widest border-green-700 text-green-700 hover:bg-green-700/20 hover:text-green-600">
                  <a href={twitterUrls.registerFinal} target="_blank" rel="noopener noreferrer">
                    Register for Hackathon <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="lg" onClick={() => setIsRulesOpen(true)} className="h-14 px-10 text-lg border border-green-700/50 text-green-700 hover:bg-green-700/10 hover:text-green-600">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
          </div>
        </div>
      </div>

      {/* Hackathon Rules & Concept Dialog */}
      <Dialog open={isRulesOpen} onOpenChange={setIsRulesOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-[#050505] border-neon-primary/30">
          <DialogHeader>
            <DialogTitle className="text-2xl font-mono text-neon-primary uppercase tracking-tight">How the Hackathon Works</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Get creative, complete bounties, earn rewards, and get noticed by companies.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 mt-4 font-mono text-sm">
            {/* Concept Section */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-zinc-50 border-b border-neon-primary/30 pb-1 flex items-center gap-2">
                <Zap className="w-5 h-5 text-neon-primary" />
                The Concept
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                We'll be releasing <strong className="text-neon-primary">bounties</strong> - specific tasks and challenges for you to tackle. 
                Your mission? <strong className="text-neon-secondary">Be crazy and creative!</strong> Think outside the box, push boundaries, 
                and show us what you're capable of.
              </p>
            </div>

            {/* Rewards Section */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-zinc-50 border-b border-neon-primary/30 pb-1 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-neon-primary" />
                How You Get Rewarded
              </h3>
              <div className="space-y-3">
                <div className="p-4 bg-neon-primary/10 rounded-none border-l-2 border-neon-primary">
                  <h4 className="font-semibold text-neon-primary mb-2">Category-Based Scoring</h4>
                  <p className="text-sm text-muted-foreground">
                    Earn points from multiple sources: <strong>Bounty Completion</strong> (base points), <strong>Creativity Bonus</strong> (+50%), 
                    <strong>Technical Excellence</strong> (+30%), <strong>Community Impact</strong> (+20%), and <strong>Early Submission</strong> (+10%).
                  </p>
                </div>
                <div className="p-4 bg-neon-secondary/10 rounded-none border-l-2 border-neon-secondary">
                  <h4 className="font-semibold text-neon-secondary mb-2">Cash Rewards</h4>
                  <p className="text-sm text-muted-foreground">
                    Top performers earn real money! More bounties = more opportunities to win.
                  </p>
                </div>
                <div className="p-4 bg-neon-accent/10 rounded-none border-l-2 border-neon-accent">
                  <h4 className="font-semibold text-neon-accent mb-2">Company Visibility</h4>
                  <p className="text-sm text-muted-foreground">
                    Top 10 participants get <strong className="text-zinc-50">automatic interviews</strong> with partner companies. 
                    Your work will be showcased to industry leaders and potential employers.
                  </p>
                </div>
              </div>
            </div>

            {/* How It Works */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-zinc-50 border-b border-neon-primary/30 pb-1 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-neon-primary" />
                The Process
              </h3>
              <ol className="space-y-3 list-decimal list-inside text-muted-foreground">
                <li className="pl-2"><strong className="text-zinc-50">Bounties are released</strong> - We'll announce new challenges regularly</li>
                <li className="pl-2"><strong className="text-zinc-50">You choose your challenge</strong> - Pick bounties that match your skills and interests</li>
                <li className="pl-2"><strong className="text-zinc-50">Be creative and build</strong> - Go wild! The crazier and more innovative, the better</li>
                <li className="pl-2"><strong className="text-zinc-50">Submit your work</strong> - Show us what you've built</li>
                <li className="pl-2"><strong className="text-zinc-50">Get rewarded</strong> - Earn points, win money, and get noticed by companies</li>
              </ol>
            </div>

            {/* Key Points */}
            <div className="pt-4 border-t border-white/10">
              <h3 className="text-lg font-semibold mb-3 text-zinc-50">Key Points</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-neon-primary mt-1">✓</span>
                  <span>Multiple bounties will be released - stay tuned for new challenges</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neon-primary mt-1">✓</span>
                  <span>Creativity and innovation are highly valued - don't hold back!</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neon-primary mt-1">✓</span>
                  <span>Every submission earns participation points, even if you don't win</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neon-primary mt-1">✓</span>
                  <span>Top performers get cash rewards AND job opportunities</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="text-xs text-muted-foreground uppercase tracking-wider text-center mb-4">
                <strong className="text-neon-primary">Ready to get started?</strong> Check out Bug Bounty #001 or wait for new challenges!
              </p>
              <div className="flex justify-center">
                <Button 
                  variant="cyberpunk" 
                  onClick={() => {
                    setIsRulesOpen(false);
                    setTimeout(() => setIsScopeOpen(true), 300);
                  }}
                  className="border-neon-primary text-neon-primary hover:bg-neon-primary hover:text-zinc-950 font-mono uppercase"
                >
                  View Bug Bounty #001 Details
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bug Bounty Scope Dialog */}
      <Dialog open={isScopeOpen} onOpenChange={setIsScopeOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-[#050505] border-neon-accent/30">
          <DialogHeader>
            <DialogTitle className="text-2xl font-mono text-neon-accent uppercase tracking-tight">Bug Bounty #001: Creative Web Design & Frontend</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Showcase your creativity! Build and submit creative web designs and frontend implementations. Be bold, be innovative, and push the boundaries of web design. All submissions are reviewed by our team.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 mt-4 font-mono text-sm">
            {/* Scope Section */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-zinc-50 border-b border-white/10 pb-1">What We're Looking For</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-neon-primary mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Creative Design Elements
                  </h4>
                  <ul className="space-y-1 list-none text-muted-foreground pl-6 border-l border-neon-primary/20">
                    <li>• Unique and innovative visual designs</li>
                    <li>• Creative use of animations and interactions</li>
                    <li>• Bold color schemes and typography choices</li>
                    <li>• Original layout concepts and compositions</li>
                    <li>• Creative UI/UX solutions that stand out</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-neon-secondary mb-2 flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    Frontend Implementation
                  </h4>
                  <ul className="space-y-1 list-none text-muted-foreground pl-6 border-l border-neon-secondary/20">
                    <li>• Clean, well-structured frontend code</li>
                    <li>• Responsive design and mobile compatibility</li>
                    <li>• Performance optimization and fast loading</li>
                    <li>• Accessibility (a11y) best practices</li>
                    <li>• Modern frontend technologies and frameworks</li>
                    <li>• Smooth animations and transitions</li>
                  </ul>
                </div>
                <div className="p-3 bg-neon-accent/10 rounded-none border-l-2 border-neon-accent">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-neon-accent">Remember:</strong> Be crazy and creative! The more innovative and unique your submission, the better your chances of winning. We're looking for designs that push boundaries and showcase your creative vision.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                <strong>System Note:</strong> Winner will be selected based on creativity, technical execution, and overall impact. Verification and code review required.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Coming Soon Dialog */}
      <Dialog open={comingSoonBounty !== null} onOpenChange={(open) => !open && setComingSoonBounty(null)}>
        <DialogContent className="max-w-md bg-[#050505] border-neon-primary/30">
          <DialogHeader>
            <DialogTitle className="text-2xl font-mono text-neon-primary uppercase tracking-tight text-center">
              Bug Bounty #{comingSoonBounty}
            </DialogTitle>
            <DialogDescription className="text-center text-muted-foreground">
              {comingSoonBounty === 2 && "Gamified Tech Job Board"}
              {comingSoonBounty === 3 && "Game Dev Design"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 mt-4 text-center">
            <div className="w-20 h-20 rounded-none border-2 border-neon-primary flex items-center justify-center mx-auto bg-neon-primary/10">
              {comingSoonBounty === 2 ? (
                <Briefcase className="w-10 h-10 text-neon-primary" />
              ) : (
                <Clock className="w-10 h-10 text-neon-primary" />
              )}
            </div>
            <div>
              {comingSoonBounty === 2 ? (
                <>
                  <h3 className="text-xl font-bold text-zinc-50 mb-2 font-mono">Active Now!</h3>
                  <p className="text-muted-foreground mb-4">
                    Community voted for a "Gamified Tech Job Board" theme. Winner gets RM150! Build something epic & submit your PR 🌟
                  </p>
                  <Button
                    variant="cyberpunk"
                    onClick={() => {
                      window.open('https://x.com/solahidris_/status/1993586176419414145?s=20', '_blank');
                      setComingSoonBounty(null);
                    }}
                    className="mt-4"
                  >
                    View Bounty Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-zinc-50 mb-2 font-mono">Coming Soon</h3>
                  <p className="text-muted-foreground">
                    {comingSoonBounty === 3 && "Game development projects and creative challenges are coming soon. Get ready!"}
                  </p>
                </>
              )}
            </div>
            <div className="pt-4 border-t border-white/10">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                Join the hackathon now to be notified when this bounty launches!
              </p>
            </div>
            <Button 
              variant="cyberpunk" 
              className="w-full font-mono uppercase tracking-widest"
              onClick={() => setComingSoonBounty(null)}
            >
              Got It
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
