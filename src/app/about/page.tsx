'use client';

import React from 'react';
import PageHero from '@/components/PageHero';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Terminal, Users, Zap, Target } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="min-h-screen pb-20 overflow-hidden">
      <PageHero 
        title="About Kracked Devs" 
        subtitle="Building the future of tech, one line of code at a time."
      />

      <div className="container mx-auto px-4 py-10 relative z-10">
        {/* Mission Section */}
        <Card className="mb-12 border-white/10 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-md overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,143,17,0.15)_0%,transparent_70%)] pointer-events-none" />
          <CardContent className="pt-12 pb-12 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 text-center">
              Our Mission
            </h2>
            <p className="text-lg md:text-xl opacity-80 max-w-3xl mx-auto text-center font-light text-blue-100 leading-relaxed">
              We're a community of developers who believe in turning ideas into reality. 
              No CS degree required—just passion, execution, and the drive to ship real projects 
              that solve real problems.
            </p>
          </CardContent>
        </Card>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="border-white/10 bg-black/60 backdrop-blur-sm hover:border-neon-primary/50 transition-colors group">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Terminal className="w-6 h-6 text-neon-primary group-hover:scale-110 transition-transform" />
                <CardTitle className="text-xl">Code First</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground group-hover:text-white/90 transition-colors">
                We believe in shipping over talking. Real projects, real deployments, real value.
              </p>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-black/60 backdrop-blur-sm hover:border-neon-secondary/50 transition-colors group">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-6 h-6 text-neon-secondary group-hover:scale-110 transition-transform" />
                <CardTitle className="text-xl">Community Driven</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground group-hover:text-white/90 transition-colors">
                Together we level up. Share knowledge, collaborate on projects, and grow as a team.
              </p>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-black/60 backdrop-blur-sm hover:border-neon-accent/50 transition-colors group">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Zap className="w-6 h-6 text-neon-accent group-hover:scale-110 transition-transform" />
                <CardTitle className="text-xl">Fast Execution</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground group-hover:text-white/90 transition-colors">
                Move fast, break things, learn faster. No bureaucracy, just results.
              </p>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-black/60 backdrop-blur-sm hover:border-neon-primary/50 transition-colors group">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Target className="w-6 h-6 text-neon-primary group-hover:scale-110 transition-transform" />
                <CardTitle className="text-xl">Value Focused</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground group-hover:text-white/90 transition-colors">
                Every line of code should solve a problem. Every project should create value.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <Card className="border-white/10 bg-black/60 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">By The Numbers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-neon-primary mb-2">500+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Active Members</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-neon-secondary mb-2">120+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Projects Shipped</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-neon-accent mb-2">28</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Day Bootcamp</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

