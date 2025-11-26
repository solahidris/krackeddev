'use client';

import React, { useState, useRef, useEffect } from 'react';
import PageHero from '@/components/PageHero';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Terminal, Code } from 'lucide-react';

export default function BootcampSignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  // Handle browser autofill
  useEffect(() => {
    const checkAutofill = () => {
      if (nameRef.current && nameRef.current.value !== formData.name) {
        setFormData(prev => ({ ...prev, name: nameRef.current?.value || '' }));
      }
      if (emailRef.current && emailRef.current.value !== formData.email) {
        setFormData(prev => ({ ...prev, email: emailRef.current?.value || '' }));
      }
      if (phoneRef.current && phoneRef.current.value !== formData.phone) {
        setFormData(prev => ({ ...prev, phone: phoneRef.current?.value || '' }));
      }
    };

    const timer1 = setTimeout(checkAutofill, 100);
    const timer2 = setTimeout(checkAutofill, 500);
    const timer3 = setTimeout(checkAutofill, 1000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.open('https://x.com/i/communities/1983062242292822298', '_blank', 'noopener,noreferrer');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    setFormData(prev => ({
      ...prev,
      [input.name]: input.value,
    }));
  };

  const handleAnimationStart = (e: React.AnimationEvent<HTMLInputElement>) => {
    if (e.animationName === 'onAutoFillStart') {
      const input = e.currentTarget;
      setFormData(prev => ({
        ...prev,
        [input.name]: input.value,
      }));
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen pb-20">
        <PageHero 
          title="Registration Submitted!" 
          subtitle="We'll be in touch soon."
        />
        <div className="container mx-auto px-4 mt-10">
          <Card className="max-w-md mx-auto border-neon-secondary/50 bg-black/80 shadow-[0_0_30px_rgba(0,143,17,0.1)]">
            <CardContent className="pt-8 text-center flex flex-col items-center">
               <div className="w-16 h-16 rounded-full bg-neon-secondary/10 flex items-center justify-center mb-6">
                <CheckCircle className="w-8 h-8 text-neon-secondary" />
              </div>
              <p className="text-lg mb-4 text-white">Thank you for your interest in the Vibe Code Bootcamp!</p>
              <p className="text-muted-foreground">Our team will contact you shortly with next steps.</p>
              <Button variant="cyberpunk" asChild className="w-full mt-6 border-neon-secondary text-neon-secondary hover:bg-neon-secondary/10">
                <a href="https://x.com/i/communities/1983062242292822298" target="_blank" rel="noopener noreferrer">Return to HQ</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pb-20 overflow-hidden">
      <PageHero 
        title="Vibe Code Bootcamp" 
        subtitle="Sign up for the 28-day bootcamp"
      >
        <Badge variant="outline" className="text-lg py-2 px-6 border-neon-accent text-neon-accent shadow-[0_0_10px_rgba(240,240,240,0.3)]">
          RM 999 / 28 days
        </Badge>
      </PageHero>

      <div className="container mx-auto px-4 mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          
          {/* Curriculum Column */}
          <div>
             <div className="flex items-center gap-3 mb-6">
               <Terminal className="w-6 h-6 text-neon-primary" />
               <h2 className="text-2xl font-bold text-white font-mono uppercase">28-Day Protocol</h2>
             </div>
             
             <div className="space-y-6">
                {/* Week 1 */}
                <Card className="bg-black/40 border-white/10 hover:border-neon-primary/30 transition-colors">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge className="bg-neon-primary text-black font-bold hover:bg-neon-primary/80">Week 1</Badge>
                      <h3 className="font-semibold text-lg text-white">Foundation & First Projects</h3>
                    </div>
                    <ul className="space-y-3 ml-2 text-sm text-muted-foreground font-mono">
                      <li className="flex items-start gap-3">
                        <div className="h-1.5 w-1.5 rounded-full bg-neon-primary mt-2 flex-shrink-0" />
                        <span><strong>Day 1-2:</strong> Environment setup, Git, Deployment</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="h-1.5 w-1.5 rounded-full bg-neon-primary mt-2 flex-shrink-0" />
                        <span><strong>Day 3-4:</strong> Portfolio Site (HTML/CSS/JS)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="h-1.5 w-1.5 rounded-full bg-neon-primary mt-2 flex-shrink-0" />
                        <span><strong>Day 5-7:</strong> Simple API with Node.js</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Week 2 */}
                <Card className="bg-black/40 border-white/10 hover:border-neon-secondary/30 transition-colors">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge className="bg-neon-secondary text-white font-bold hover:bg-neon-secondary/80">Week 2</Badge>
                      <h3 className="font-semibold text-lg text-white">Full-Stack Applications</h3>
                    </div>
                    <ul className="space-y-3 ml-2 text-sm text-muted-foreground font-mono">
                      <li className="flex items-start gap-3">
                        <div className="h-1.5 w-1.5 rounded-full bg-neon-secondary mt-2 flex-shrink-0" />
                        <span><strong>Day 8-10:</strong> React Task App + API</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="h-1.5 w-1.5 rounded-full bg-neon-secondary mt-2 flex-shrink-0" />
                        <span><strong>Day 11-12:</strong> Database & Auth (PostgreSQL)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="h-1.5 w-1.5 rounded-full bg-neon-secondary mt-2 flex-shrink-0" />
                        <span><strong>Day 13-14:</strong> CI/CD Pipeline Deployment</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Week 3 */}
                <Card className="bg-black/40 border-white/10 hover:border-neon-accent/30 transition-colors">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge className="bg-neon-accent text-black font-bold hover:bg-neon-accent/80">Week 3</Badge>
                      <h3 className="font-semibold text-lg text-white">AI & Automation</h3>
                    </div>
                    <ul className="space-y-3 ml-2 text-sm text-muted-foreground font-mono">
                      <li className="flex items-start gap-3">
                        <div className="h-1.5 w-1.5 rounded-full bg-neon-accent mt-2 flex-shrink-0" />
                        <span><strong>Day 15-17:</strong> AI Chatbot (OpenAI API)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="h-1.5 w-1.5 rounded-full bg-neon-accent mt-2 flex-shrink-0" />
                        <span><strong>Day 18-19:</strong> Automation Scripts</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="h-1.5 w-1.5 rounded-full bg-neon-accent mt-2 flex-shrink-0" />
                        <span><strong>Day 20-21:</strong> Workflow Tools</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                 {/* Week 4 */}
                <Card className="bg-black/40 border-white/10 hover:border-white/30 transition-colors">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="outline" className="border-white text-white font-bold">Week 4</Badge>
                      <h3 className="font-semibold text-lg text-white">Capstone & Portfolio</h3>
                    </div>
                    <ul className="space-y-3 ml-2 text-sm text-muted-foreground font-mono">
                      <li className="flex items-start gap-3">
                        <div className="h-1.5 w-1.5 rounded-full bg-white mt-2 flex-shrink-0" />
                        <span><strong>Day 22-28:</strong> Capstone Project & Graduation</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
             </div>
          </div>

          {/* Form Column */}
          <div>
            <div className="sticky top-24">
               <Card className="border-neon-primary/30 bg-black/80 backdrop-blur-xl shadow-[0_0_50px_rgba(0,255,65,0.05)]">
                <CardHeader>
                  <CardTitle className="text-2xl font-mono uppercase tracking-widest text-neon-primary flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    Initiate Signup
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} method="POST" className="space-y-6" autoComplete="on">
                    <div className="space-y-4">
                      <div className="group">
                        <label htmlFor="name" className="block text-xs font-mono text-muted-foreground mb-1 uppercase tracking-wider group-focus-within:text-neon-primary transition-colors">
                          Full Name
                        </label>
                        <input
                          ref={nameRef}
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onInput={handleInput}
                          onAnimationStart={handleAnimationStart}
                          autoComplete="name"
                          autoCapitalize="words"
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-sm focus:outline-none focus:border-neon-primary focus:bg-white/10 transition-all text-white font-mono placeholder:text-white/20"
                          placeholder="ENTER NAME"
                        />
                      </div>

                      <div className="group">
                        <label htmlFor="email" className="block text-xs font-mono text-muted-foreground mb-1 uppercase tracking-wider group-focus-within:text-neon-primary transition-colors">
                          Email Address
                        </label>
                        <input
                          ref={emailRef}
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onInput={handleInput}
                          onAnimationStart={handleAnimationStart}
                          autoComplete="email"
                          inputMode="email"
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-sm focus:outline-none focus:border-neon-primary focus:bg-white/10 transition-all text-white font-mono placeholder:text-white/20"
                          placeholder="ENTER EMAIL"
                        />
                      </div>

                      <div className="group">
                        <label htmlFor="phone" className="block text-xs font-mono text-muted-foreground mb-1 uppercase tracking-wider group-focus-within:text-neon-primary transition-colors">
                          Phone Number
                        </label>
                        <input
                          ref={phoneRef}
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          onInput={handleInput}
                          onAnimationStart={handleAnimationStart}
                          autoComplete="tel"
                          inputMode="tel"
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-sm focus:outline-none focus:border-neon-primary focus:bg-white/10 transition-all text-white font-mono placeholder:text-white/20"
                          placeholder="+60"
                        />
                      </div>
                    </div>

                    <Button type="submit" size="lg" variant="cyberpunk" className="w-full h-12 text-lg shadow-[0_0_20px_rgba(0,255,65,0.2)] hover:shadow-[0_0_30px_rgba(0,255,65,0.4)]">
                      Confirm Enrollment
                    </Button>
                    
                    <p className="text-xs text-center text-muted-foreground mt-4 font-mono">
                      Limited spots available for the next cohort.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}
