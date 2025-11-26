'use client';

import React, { useState, useRef, useEffect } from 'react';
import PageHero from '@/components/PageHero';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Radio, Users, Lightbulb } from 'lucide-react';

export default function TalksSignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    talkInterest: '',
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
          title="Registration Successful!" 
          subtitle="You're signed up for Community Talks"
        />
        <div className="container mx-auto px-4 mt-10">
          <Card className="max-w-md mx-auto border-neon-accent/50 bg-black/80 shadow-[0_0_30px_rgba(240,240,240,0.1)]">
            <CardContent className="pt-8 text-center flex flex-col items-center">
               <div className="w-16 h-16 rounded-full bg-neon-accent/10 flex items-center justify-center mb-6">
                <CheckCircle className="w-8 h-8 text-neon-accent" />
              </div>
              <p className="text-lg mb-4 text-white">Thank you for registering!</p>
              <p className="text-muted-foreground">We'll send you updates about upcoming talks and events.</p>
              <Button variant="cyberpunk" asChild className="w-full mt-6 border-neon-accent text-neon-accent hover:bg-neon-accent/10">
                <a href="https://x.com/i/communities/1983062242292822298" target="_blank" rel="noopener noreferrer">Return to Hub</a>
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
        title="Kracked Talks" 
        subtitle="Join our community talks and learn from industry experts"
      />

      <div className="container mx-auto px-4 mt-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start max-w-6xl mx-auto">
          
          {/* Form */}
          <div className="md:col-span-3">
             <Card className="border-white/10 bg-black/60 backdrop-blur-md">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-accent via-neon-secondary to-neon-accent" />
              <CardHeader>
                <CardTitle className="text-2xl font-mono uppercase tracking-widest flex items-center gap-2">
                  <Radio className="w-5 h-5 text-neon-accent" />
                  Register for Access
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} method="POST" className="space-y-6" autoComplete="on">
                  <div className="group">
                    <label htmlFor="name" className="block text-xs font-mono text-neon-accent mb-2 uppercase tracking-wider group-focus-within:text-neon-secondary transition-colors">
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
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-none focus:outline-none focus:border-neon-secondary focus:bg-white/10 transition-all text-white placeholder:text-white/20 font-mono"
                      placeholder="ENTER NAME"
                    />
                  </div>

                  <div className="group">
                    <label htmlFor="email" className="block text-xs font-mono text-neon-accent mb-2 uppercase tracking-wider group-focus-within:text-neon-secondary transition-colors">
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
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-none focus:outline-none focus:border-neon-secondary focus:bg-white/10 transition-all text-white placeholder:text-white/20 font-mono"
                      placeholder="ENTER EMAIL"
                    />
                  </div>

                  <div className="group">
                    <label htmlFor="talkInterest" className="block text-xs font-mono text-neon-accent mb-2 uppercase tracking-wider group-focus-within:text-neon-secondary transition-colors">
                      Which topic interests you most?
                    </label>
                    <div className="relative">
                      <select
                        id="talkInterest"
                        name="talkInterest"
                        value={formData.talkInterest}
                        onChange={handleChange}
                        autoComplete="off"
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-none focus:outline-none focus:border-neon-secondary focus:bg-white/10 transition-all text-white appearance-none font-mono"
                      >
                        <option value="" className="bg-black text-muted-foreground">SELECT TOPIC</option>
                        <option value="math-engineering" className="bg-black text-white">Math & Engineering</option>
                        <option value="automation" className="bg-black text-white">Automation</option>
                        <option value="business-value" className="bg-black text-white">Business Value</option>
                        <option value="all" className="bg-black text-white">All Topics</option>
                      </select>
                       <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">▼</div>
                    </div>
                  </div>

                  <Button type="submit" size="lg" variant="cyberpunk" className="w-full mt-4 h-12 text-lg border-neon-accent text-neon-accent hover:bg-neon-accent/10 hover:shadow-[0_0_20px_rgba(240,240,240,0.3)]">
                    Sign Up for Talks
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Expectations */}
          <div className="md:col-span-2">
            <Card className="bg-transparent border-none shadow-none">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-neon-accent font-mono uppercase tracking-widest text-sm mb-4 border-b border-neon-accent/30 pb-2 inline-block w-full">
                  What to Expect
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <ul className="space-y-6">
                  <li className="flex items-start gap-4 group">
                    <div className="h-8 w-8 rounded-none border border-neon-accent flex items-center justify-center flex-shrink-0 bg-neon-accent/10 group-hover:bg-neon-accent group-hover:text-black transition-colors">
                      <Lightbulb className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm mb-1 group-hover:text-neon-accent transition-colors">Expert Insights</h4>
                      <p className="text-xs text-muted-foreground">Learn directly from industry leaders.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 group">
                    <div className="h-8 w-8 rounded-none border border-neon-accent flex items-center justify-center flex-shrink-0 bg-neon-accent/10 group-hover:bg-neon-accent group-hover:text-black transition-colors">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                       <h4 className="font-bold text-white text-sm mb-1 group-hover:text-neon-accent transition-colors">Network</h4>
                       <p className="text-xs text-muted-foreground">Connect with other cracked developers.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 group">
                    <div className="h-8 w-8 rounded-none border border-neon-accent flex items-center justify-center flex-shrink-0 bg-neon-accent/10 group-hover:bg-neon-accent group-hover:text-black transition-colors">
                      <Radio className="w-4 h-4" />
                    </div>
                    <div>
                       <h4 className="font-bold text-white text-sm mb-1 group-hover:text-neon-accent transition-colors">Real Projects</h4>
                       <p className="text-xs text-muted-foreground">Case studies on real-world business value.</p>
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
