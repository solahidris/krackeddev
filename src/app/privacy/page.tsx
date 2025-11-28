'use client';

import React from 'react';
import PageHero from '@/components/PageHero';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pb-20 overflow-hidden">
      <PageHero 
        title="Privacy Policy" 
        subtitle="Your privacy matters to us."
      />

      <div className="container mx-auto px-4 py-10 relative z-10 max-w-4xl">
        <Card className="border-white/10 bg-black/60 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-2xl">Privacy Policy</CardTitle>
            <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h3 className="text-xl font-bold mb-3 text-neon-primary">1. Information We Collect</h3>
              <p className="text-zinc-50/90 leading-relaxed">
                We collect information that you provide directly to us, including when you register for an account, 
                participate in our bootcamps, join our community, or contact us for support. This may include your name, 
                email address, and other contact information.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-3 text-neon-primary">2. How We Use Your Information</h3>
              <p className="text-zinc-50/90 leading-relaxed">
                We use the information we collect to provide, maintain, and improve our services, process transactions, 
                send you technical notices and support messages, and communicate with you about products, services, and 
                events that may be of interest to you.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-3 text-neon-primary">3. Information Sharing</h3>
              <p className="text-zinc-50/90 leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may share your information 
                only in the following circumstances: with your consent, to comply with legal obligations, to protect our 
                rights and safety, or with service providers who assist us in operating our platform.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-3 text-neon-primary">4. Data Security</h3>
              <p className="text-zinc-50/90 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the 
                Internet is 100% secure.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-3 text-neon-primary">5. Your Rights</h3>
              <p className="text-zinc-50/90 leading-relaxed">
                You have the right to access, update, or delete your personal information at any time. You may also opt-out 
                of certain communications from us. To exercise these rights, please contact us using the information provided 
                on our contact page.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-3 text-neon-primary">6. Cookies</h3>
              <p className="text-zinc-50/90 leading-relaxed">
                We use cookies and similar tracking technologies to track activity on our platform and hold certain information. 
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-3 text-neon-primary">7. Changes to This Policy</h3>
              <p className="text-zinc-50/90 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
                Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-3 text-neon-primary">8. Contact Us</h3>
              <p className="text-zinc-50/90 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us through our contact page.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

