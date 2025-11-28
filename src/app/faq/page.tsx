'use client';

import React from 'react';
import PageHero from '@/components/PageHero';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function FAQPage() {
  const createTwitterUrl = (message: string) => {
    const tweetText = encodeURIComponent(`${message} #KrackedHackathon @masterofnone @solahidris_`);
    return `https://twitter.com/intent/tweet?text=${tweetText}`;
  };

  const contactUsUrl = createTwitterUrl("I have questions about the hackathon. Can someone help me out?");

  return (
    <main className="min-h-screen pb-20 overflow-hidden">
      <PageHero 
        title="Frequently Asked Questions" 
        subtitle="Find answers to common questions about our hackathon and community."
      />

      <div className="container mx-auto px-4 py-10 relative z-10 max-w-4xl">
        <Card className="border-white/10 bg-black/80 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-mono uppercase tracking-widest flex items-center justify-center gap-2">
              <HelpCircle className="w-6 h-6 text-neon-primary" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-white/5 rounded-none border-l-2 border-neon-primary">
              <h3 className="font-bold text-zinc-50 mb-2 font-mono">Do I need experience to participate?</h3>
              <p className="text-sm text-muted-foreground">No! The hackathon is open to developers of all skill levels. Beginners are welcome and can learn from the community.</p>
            </div>
            <div className="p-4 bg-white/5 rounded-none border-l-2 border-neon-secondary">
              <h3 className="font-bold text-zinc-50 mb-2 font-mono">How long does it take?</h3>
              <p className="text-sm text-muted-foreground">Each bug bounty has its own timeline. Most challenges can be completed in 1-2 weeks, but you can work at your own pace.</p>
            </div>
            <div className="p-4 bg-white/5 rounded-none border-l-2 border-neon-accent">
              <h3 className="font-bold text-zinc-50 mb-2 font-mono">What if I don't win?</h3>
              <p className="text-sm text-muted-foreground">Even if you don't win, you'll gain valuable experience, build your portfolio, and network with industry professionals. Participation points still count!</p>
            </div>
            <div className="p-4 bg-white/5 rounded-none border-l-2 border-neon-primary">
              <h3 className="font-bold text-zinc-50 mb-2 font-mono">How are winners selected?</h3>
              <p className="text-sm text-muted-foreground">Winners are selected based on code quality, innovation, and impact. Points are multiplied by ranking multipliers for final scores.</p>
            </div>
          </CardContent>
          <CardFooter className="justify-center">
            <Button variant="ghost" asChild className="border border-white/10 hover:bg-white/5">
              <a href={contactUsUrl} target="_blank" rel="noopener noreferrer">
                Still have questions? Contact Us
              </a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}

