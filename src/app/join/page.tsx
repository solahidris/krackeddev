'use client';

import React, { useState, useRef, useEffect } from 'react';
import PageHero from '@/components/PageHero';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Zap } from 'lucide-react';

export default function JoinCommunityPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    background: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  // Handle browser autofill
  useEffect(() => {
    const checkAutofill = () => {
      if (nameRef.current && nameRef.current.value !== formData.name) {
        setFormData(prev => ({ ...prev, name: nameRef.current?.value || '' }));
      }
      if (emailRef.current && emailRef.current.value !== formData.email) {
        setFormData(prev => ({ ...prev, email: emailRef.current?.value || '' }));
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
          title="Welcome to the Community!" 
          subtitle="You're now part of the Kracked Dev community."
        />
        <div className="container mx-auto px-4 mt-10">
          <Card className="max-w-md mx-auto border-neon-cyan/50 bg-black/80 shadow-[0_0_30px_rgba(0,243,255,0.1)]">
            <CardContent className="pt-8 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-neon-cyan/10 flex items-center justify-center mb-6">
                <CheckCircle className="w-8 h-8 text-neon-cyan" />
              </div>
              <p className="text-2xl font-bold mb-4 text-white">Thank you for joining!</p>
              <p className="text-muted-foreground mb-6">We'll send you a welcome email with next steps and community access details.</p>
              <Button variant="cyberpunk" asChild className="w-full">
                <a href="https://x.com/i/communities/1983062242292822298" target="_blank" rel="noopener noreferrer">Return to Base</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pb-20 relative overflow-hidden">
      <PageHero 
        title="Join the Kracked Dev Community" 
        subtitle="Connect with other developers and level up together."
      />

      <div className="container mx-auto px-4 mt-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start max-w-6xl mx-auto">
          
          {/* Form */}
          <div className="md:col-span-3">
            <Card className="border-white/10 bg-black/60 backdrop-blur-md">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-purple via-neon-pink to-neon-purple" />
              <CardHeader>
                <CardTitle className="text-2xl font-mono">Join Community Form</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} method="POST" className="space-y-6" autoComplete="on">
                  <div className="group">
                    <label htmlFor="name" className="block text-xs font-mono text-neon-purple mb-2 uppercase tracking-wider group-focus-within:text-neon-pink transition-colors">
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
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-none focus:outline-none focus:border-neon-pink focus:bg-white/10 transition-all text-white placeholder:text-white/20 font-mono"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="group">
                    <label htmlFor="email" className="block text-xs font-mono text-neon-purple mb-2 uppercase tracking-wider group-focus-within:text-neon-pink transition-colors">
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
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-none focus:outline-none focus:border-neon-pink focus:bg-white/10 transition-all text-white placeholder:text-white/20 font-mono"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div className="group">
                    <label htmlFor="background" className="block text-xs font-mono text-neon-purple mb-2 uppercase tracking-wider group-focus-within:text-neon-pink transition-colors">
                      Experience Level
                    </label>
                    <div className="relative">
                      <select
                        id="background"
                        name="background"
                        value={formData.background}
                        onChange={handleChange}
                        autoComplete="off"
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-none focus:outline-none focus:border-neon-pink focus:bg-white/10 transition-all text-white appearance-none font-mono"
                      >
                        <option value="" className="bg-black text-muted-foreground">Select your experience level</option>
                        <option value="beginner" className="bg-black text-white">Beginner</option>
                        <option value="intermediate" className="bg-black text-white">Intermediate</option>
                        <option value="advanced" className="bg-black text-white">Advanced</option>
                        <option value="professional" className="bg-black text-white">Professional</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">▼</div>
                    </div>
                  </div>

                  <Button type="submit" size="lg" variant="cyberpunk" className="w-full mt-4 h-12 text-lg">
                    Join Community
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Benefits */}
          <div className="md:col-span-2">
            <Card className="bg-transparent border-none shadow-none">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-neon-cyan font-mono uppercase tracking-widest text-sm mb-4 border-b border-neon-cyan/30 pb-2 inline-block w-full">
                  What You'll Get
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <ul className="space-y-6">
                  <li className="flex items-start gap-4 group">
                    <div className="h-8 w-8 rounded-none border border-neon-cyan flex items-center justify-center flex-shrink-0 bg-neon-cyan/10 group-hover:bg-neon-cyan group-hover:text-black transition-colors">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm mb-1 group-hover:text-neon-cyan transition-colors">Access to exclusive Discord community with 500+ developers</h4>
                      <p className="text-xs text-muted-foreground">Instant access to high-value projects.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 group">
                    <div className="h-8 w-8 rounded-none border border-neon-cyan flex items-center justify-center flex-shrink-0 bg-neon-cyan/10 group-hover:bg-neon-cyan group-hover:text-black transition-colors">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                       <h4 className="font-bold text-white text-sm mb-1 group-hover:text-neon-cyan transition-colors">Weekly community talks and networking events</h4>
                       <p className="text-xs text-muted-foreground">Network with elite developers.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 group">
                    <div className="h-8 w-8 rounded-none border border-neon-cyan flex items-center justify-center flex-shrink-0 bg-neon-cyan/10 group-hover:bg-neon-cyan group-hover:text-black transition-colors">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                       <h4 className="font-bold text-white text-sm mb-1 group-hover:text-neon-cyan transition-colors">Share projects and get feedback from peers</h4>
                       <p className="text-xs text-muted-foreground">Mentorship from industry veterans.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 group">
                    <div className="h-8 w-8 rounded-none border border-neon-cyan flex items-center justify-center flex-shrink-0 bg-neon-cyan/10 group-hover:bg-neon-cyan group-hover:text-black transition-colors">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                       <h4 className="font-bold text-white text-sm mb-1 group-hover:text-neon-cyan transition-colors">Early access to bootcamps and hackathons</h4>
                       <p className="text-xs text-muted-foreground">Earn while you learn.</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </main>
  );
}
