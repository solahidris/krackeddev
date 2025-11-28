'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import InfoPanel from '@/components/InfoPanel';
import { Button } from '@/components/ui/button';
import { ArrowRight, Trophy, Gamepad2 } from 'lucide-react';

export default function HomeClient() {
  const [isHoveringBounties, setIsHoveringBounties] = useState(false);
  return (
    <main className="min-h-screen pb-20 overflow-hidden">
      {/* Hero Section */}
      <PageHero 
        title="Want to be a Kracked Dev?" 
        subtitle="A community of cracked developers who want to level up together."
      >
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 pt-6 w-full">
          <Button size="lg" variant="cyberpunk" asChild className="h-12 md:h-14 text-sm md:text-base px-6 md:px-8 w-full sm:w-auto font-mono uppercase tracking-widest">
            <Link href="https://x.com/i/communities/1983062242292822298" target="_blank" rel="noopener noreferrer">
              Join Community <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
          <div 
            className="relative w-full sm:w-auto"
            onMouseEnter={() => setIsHoveringBounties(true)}
            onMouseLeave={() => setIsHoveringBounties(false)}
          >
            <Button 
              variant="outline" 
              size="lg" 
              asChild 
              className="h-12 md:h-14 text-sm md:text-base px-6 md:px-8 w-full sm:w-auto border-2 border-neon-secondary/50 text-neon-secondary bg-neon-secondary/5 hover:bg-neon-secondary/10 hover:border-neon-secondary hover:text-white hover:shadow-[0_0_20px_rgba(43,138,26,0.6)] transition-all font-mono uppercase tracking-widest relative overflow-hidden"
            >
              <Link href="/hackathon">
                <Trophy className="w-4 h-4 mr-2" />
                Bug Bounties
              </Link>
            </Button>
            {/* Money Kaching Effect */}
            {isHoveringBounties && (
              <div className="absolute inset-0 pointer-events-none overflow-visible z-10">
                {[...Array(8)].map((_, i) => {
                  // Spread horizontally a bit, but all go upward
                  const horizontalSpread = (i - 3.5) * 20; // Spread from -70px to +70px
                  const upwardDistance = -120; // Negative Y means upward
                  const delay = i * 0.04;
                  const symbols = ['💰', '💵', '💴', '💶', '💷', '💸', '$', 'RM'];
                  const symbol = symbols[i % symbols.length];
                  
                  return (
                    <span
                      key={i}
                      className="absolute left-1/2 bottom-0 text-2xl font-bold text-neon-secondary"
                      style={{
                        animation: `money-pop-up 1.2s ease-out ${delay}s forwards`,
                        transformOrigin: 'center bottom',
                        filter: 'drop-shadow(0 0 10px rgba(43, 138, 26, 1))',
                        '--final-x': `${horizontalSpread}px`,
                        '--final-y': `${upwardDistance}px`,
                      } as React.CSSProperties & { [key: string]: string }}
                    >
                      {symbol}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
          <Button 
            variant="outline" 
            size="lg" 
            asChild 
            className="h-12 md:h-14 text-sm md:text-base px-6 md:px-8 w-full sm:w-auto border-2 border-neon-accent/50 text-neon-accent bg-neon-accent/5 hover:bg-neon-accent/10 hover:border-neon-accent hover:text-white hover:shadow-[0_0_20px_rgba(240,240,240,0.4)] transition-all font-mono uppercase tracking-widest"
          >
            <Link href="/game">
              <Gamepad2 className="w-4 h-4 mr-2" />
              Explore Games
            </Link>
          </Button>
        </div>
      </PageHero>

      {/* Bootcamp Section */}
      {/* <div className="container mx-auto px-4 md:px-6 lg:px-8 mt-12 md:mt-16 lg:mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <InfoPanel title="Vibe Code Bootcamp">
            <p className="text-base md:text-lg mb-6 text-muted-foreground leading-relaxed">Turn random vibes into real output in 28 days. No CS degree, just cracked execution.</p>
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex items-center gap-3 group">
                 <div className="h-2 w-2 rounded-full bg-neon-primary shadow-[0_0_10px_var(--neon-primary)] group-hover:scale-150 transition-transform" />
                 <span className="text-sm md:text-base text-foreground group-hover:text-neon-primary transition-colors">Real-world projects</span>
              </div>
              <div className="flex items-center gap-3 group">
                 <div className="h-2 w-2 rounded-full bg-neon-secondary shadow-[0_0_10px_var(--neon-secondary)] group-hover:scale-150 transition-transform" />
                 <span className="text-sm md:text-base text-foreground group-hover:text-neon-secondary transition-colors">Mentorship from industry leaders</span>
              </div>
              <div className="flex items-center gap-3 group">
                 <div className="h-2 w-2 rounded-full bg-neon-accent shadow-[0_0_10px_var(--neon-accent)] group-hover:scale-150 transition-transform" />
                 <span className="text-sm md:text-base text-foreground group-hover:text-neon-accent transition-colors">Earn "Cracked Dev" status</span>
              </div>
            </div>
            <div className="flex justify-center">
              <Button 
                size="lg" 
                variant="cyberpunk" 
                asChild 
                className="h-12 md:h-14 text-sm md:text-base px-6 md:px-8"
              >
                <Link href="/signup/bootcamp">
                  More Info
                </Link>
              </Button>
            </div>
          </InfoPanel>

          <div className="flex flex-col gap-6">
             <Card className="border-red-500/30 bg-red-950/10 backdrop-blur-sm hover:border-red-500/50 transition-colors group">
                <CardHeader className="pb-2">
                  <CardTitle className="text-red-500 flex items-center gap-2 text-lg">
                    <XCircle className="w-5 h-5" />
                    <span className="font-mono tracking-tighter">SYSTEM_STATUS: OFFLINE</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="opacity-70 mb-4 text-sm font-mono">Struggling with tutorials. No real projects. 0 income.</p>
                  <div className="rounded border border-red-500/20 bg-black/40 p-4 font-mono text-xs text-red-400 group-hover:animate-pulse overflow-x-auto">
                    <pre className="opacity-70">Error: Skills not found</pre>
                    <pre className="opacity-70">Warning: Bank account empty</pre>
                    <pre>{`const skills = [];`}</pre>
                    <pre>{`const income = 0;`}</pre>
                  </div>
                </CardContent>
             </Card>

             <Card className="border-neon-primary/30 bg-black/60 backdrop-blur-sm hover:border-neon-primary/50 transition-colors relative overflow-hidden group">
                <div className="absolute inset-0 bg-neon-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <CardHeader className="pb-2">
                  <CardTitle className="text-neon-primary flex items-center gap-2 text-lg">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-mono tracking-tighter">SYSTEM_STATUS: ONLINE</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="opacity-90 mb-4 text-sm font-mono">Shipping apps. Solving problems. Getting paid.</p>
                  <div className="rounded border border-neon-primary/20 bg-black/40 p-4 font-mono text-xs text-neon-primary shadow-[0_0_10px_rgba(0,255,65,0.05)] overflow-x-auto">
                    <pre className="text-neon-primary">Success: Deployment complete</pre>
                    <pre>{`const skills = ['Fullstack', 'AI', 'Auto'];`}</pre>
                    <pre>{`const income = 5000; // MYR`}</pre>
                  </div>
                </CardContent>
             </Card>
          </div>
        </div>
      </div> */}
    </main>
  );
}

