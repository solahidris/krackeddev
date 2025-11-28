'use client';

import React from 'react';
import PageHero from '@/components/PageHero';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function TermsPage() {
  return (
    <main className="min-h-screen pb-20 overflow-hidden">
      <PageHero 
        title="Terms and Conditions" 
        subtitle="Please read these terms carefully."
      />

      <div className="container mx-auto px-4 py-10 relative z-10 max-w-4xl">
        <Card className="border-white/10 bg-black/60 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-2xl">Terms and Conditions</CardTitle>
            <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h3 className="text-xl font-bold mb-3 text-neon-primary">1. Acceptance of Terms</h3>
              <p className="text-zinc-50/90 leading-relaxed">
                By accessing and using this website and our services, you accept and agree to be bound by the terms and 
                provision of this agreement. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-3 text-neon-primary">2. Use License</h3>
              <p className="text-zinc-50/90 leading-relaxed">
                Permission is granted to temporarily access the materials on our website for personal, non-commercial 
                transitory viewing only. This is the grant of a license, not a transfer of title, and under this license 
                you may not modify or copy the materials, use the materials for any commercial purpose, or remove any 
                copyright or other proprietary notations from the materials.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-3 text-neon-primary">3. User Accounts</h3>
              <p className="text-zinc-50/90 leading-relaxed">
                When you create an account with us, you must provide information that is accurate, complete, and current 
                at all times. You are responsible for safeguarding the password and for all activities that occur under 
                your account.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-3 text-neon-primary">4. Code of Conduct</h3>
              <p className="text-zinc-50/90 leading-relaxed">
                You agree to use our services in a respectful and professional manner. You will not engage in any activity 
                that is harmful, illegal, or violates the rights of others. This includes but is not limited to harassment, 
                spamming, or sharing malicious code.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-3 text-neon-primary">5. Intellectual Property</h3>
              <p className="text-zinc-50/90 leading-relaxed">
                The content, features, and functionality of our platform, including but not limited to text, graphics, logos, 
                and software, are the property of Kracked Devs and are protected by copyright, trademark, and other laws.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-3 text-neon-primary">6. Payment Terms</h3>
              <p className="text-zinc-50/90 leading-relaxed">
                For paid services such as bootcamps, payment is required in advance. All fees are non-refundable unless 
                otherwise stated. We reserve the right to change our pricing at any time.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-3 text-neon-primary">7. Disclaimer</h3>
              <p className="text-zinc-50/90 leading-relaxed">
                The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, 
                and hereby disclaim and negate all other warranties including, without limitation, implied warranties or 
                conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property 
                or other violation of rights.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-3 text-neon-primary">8. Limitations</h3>
              <p className="text-zinc-50/90 leading-relaxed">
                In no event shall Kracked Devs or its suppliers be liable for any damages (including, without limitation, 
                damages for loss of data or profit, or due to business interruption) arising out of the use or inability to 
                use the materials on our website.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-3 text-neon-primary">9. Termination</h3>
              <p className="text-zinc-50/90 leading-relaxed">
                We may terminate or suspend your account and access to our services immediately, without prior notice or 
                liability, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-3 text-neon-primary">10. Changes to Terms</h3>
              <p className="text-zinc-50/90 leading-relaxed">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is 
                material, we will try to provide at least 30 days notice prior to any new terms taking effect.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-3 text-neon-primary">11. Contact Information</h3>
              <p className="text-zinc-50/90 leading-relaxed">
                If you have any questions about these Terms and Conditions, please contact us through our contact page.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

