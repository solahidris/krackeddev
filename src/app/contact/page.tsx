'use client';

import React, { useState } from 'react';
import PageHero from '@/components/PageHero';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, you would send this to your backend
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (submitted) {
    return (
      <main className="min-h-screen pb-20">
        <PageHero 
          title="Message Sent" 
          subtitle="We'll get back to you soon."
        />
        <div className="container mx-auto px-4 mt-10">
          <Card className="max-w-md mx-auto border-neon-primary/50 bg-black/80 shadow-[0_0_30px_rgba(0,255,65,0.1)]">
            <CardContent className="pt-8 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-neon-primary/10 flex items-center justify-center mb-6">
                <CheckCircle className="w-8 h-8 text-neon-primary" />
              </div>
              <p className="text-2xl font-bold mb-4 text-white">Thank you!</p>
              <p className="text-muted-foreground mb-6">We've received your message and will respond as soon as possible.</p>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pb-20 relative overflow-hidden">
      <PageHero 
        title="Get In Touch" 
        subtitle="Have a question? We'd love to hear from you."
      />

      <div className="container mx-auto px-4 mt-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="md:col-span-2">
            <Card className="border-white/10 bg-black/60 backdrop-blur-md">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-primary via-neon-secondary to-neon-primary" />
              <CardHeader>
                <CardTitle className="text-2xl font-mono">Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="group">
                    <label htmlFor="name" className="block text-xs font-mono text-neon-primary mb-2 uppercase tracking-wider group-focus-within:text-neon-secondary transition-colors">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-none focus:outline-none focus:border-neon-primary focus:bg-white/10 transition-all text-white placeholder:text-white/20 font-mono"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="group">
                    <label htmlFor="email" className="block text-xs font-mono text-neon-primary mb-2 uppercase tracking-wider group-focus-within:text-neon-secondary transition-colors">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-none focus:outline-none focus:border-neon-primary focus:bg-white/10 transition-all text-white placeholder:text-white/20 font-mono"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div className="group">
                    <label htmlFor="subject" className="block text-xs font-mono text-neon-primary mb-2 uppercase tracking-wider group-focus-within:text-neon-secondary transition-colors">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-none focus:outline-none focus:border-neon-primary focus:bg-white/10 transition-all text-white placeholder:text-white/20 font-mono"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div className="group">
                    <label htmlFor="message" className="block text-xs font-mono text-neon-primary mb-2 uppercase tracking-wider group-focus-within:text-neon-secondary transition-colors">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-none focus:outline-none focus:border-neon-primary focus:bg-white/10 transition-all text-white placeholder:text-white/20 font-mono resize-none"
                      placeholder="Tell us what's on your mind..."
                    />
                  </div>

                  <Button type="submit" size="lg" variant="cyberpunk" className="w-full mt-4 h-12 text-lg">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div>
            <Card className="bg-transparent border-none shadow-none">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-neon-primary font-mono uppercase tracking-widest text-sm mb-4 border-b border-neon-primary/30 pb-2">
                  Other Ways to Reach Us
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <div className="space-y-6">
                  <div className="flex items-start gap-4 group">
                    <div className="h-10 w-10 rounded-none border border-neon-primary flex items-center justify-center flex-shrink-0 bg-neon-primary/10 group-hover:bg-neon-primary group-hover:text-black transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm mb-1 group-hover:text-neon-primary transition-colors">Email</h4>
                      <p className="text-xs text-muted-foreground">contact@krackeddevs.com</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}

