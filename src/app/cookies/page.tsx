'use client';

import React from 'react';
import PageHero from '@/components/PageHero';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen pb-20 overflow-hidden">
      <PageHero 
        title="Cookie Policy" 
        subtitle="How we use cookies on our platform."
      />

      <div className="container mx-auto px-4 py-10 relative z-10 max-w-4xl">
        <Card className="border-white/10 bg-black/60 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-2xl">Cookie Policy</CardTitle>
            <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h3 className="text-xl font-bold mb-3 text-neon-primary">1. What Are Cookies</h3>
              <p className="text-white/90 leading-relaxed">
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
                They are widely used to make websites work more efficiently and provide information to the owners of the site.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-3 text-neon-primary">2. How We Use Cookies</h3>
              <p className="text-white/90 leading-relaxed">
                We use cookies to enhance your experience on our platform, analyze site traffic, personalize content, 
                and provide social media features. We may also use cookies to remember your preferences and settings.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-3 text-neon-primary">3. Types of Cookies We Use</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 text-neon-secondary">Essential Cookies</h4>
                  <p className="text-white/90 leading-relaxed">
                    These cookies are necessary for the website to function properly. They enable core functionality such 
                    as security, network management, and accessibility.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-neon-secondary">Analytics Cookies</h4>
                  <p className="text-white/90 leading-relaxed">
                    These cookies help us understand how visitors interact with our website by collecting and reporting 
                    information anonymously.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-neon-secondary">Functional Cookies</h4>
                  <p className="text-white/90 leading-relaxed">
                    These cookies allow the website to remember choices you make and provide enhanced, more personal features.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-neon-secondary">Marketing Cookies</h4>
                  <p className="text-white/90 leading-relaxed">
                    These cookies are used to track visitors across websites to display relevant advertisements.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-3 text-neon-primary">4. Third-Party Cookies</h3>
              <p className="text-white/90 leading-relaxed">
                In addition to our own cookies, we may also use various third-party cookies to report usage statistics 
                of the website and refine marketing efforts. These third-party cookies are subject to the respective 
                privacy policies of those third parties.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-3 text-neon-primary">5. Managing Cookies</h3>
              <p className="text-white/90 leading-relaxed">
                Most web browsers allow you to control cookies through their settings preferences. However, limiting cookies 
                may impact your ability to use certain features of our website. You can set your browser to refuse cookies 
                or alert you when cookies are being sent.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-3 text-neon-primary">6. Cookie Consent</h3>
              <p className="text-white/90 leading-relaxed">
                By continuing to use our website, you consent to our use of cookies in accordance with this Cookie Policy. 
                If you do not agree to our use of cookies, you should set your browser settings accordingly or discontinue 
                use of our website.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-3 text-neon-primary">7. Updates to This Policy</h3>
              <p className="text-white/90 leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our 
                business operations. We will notify you of any material changes by posting the new Cookie Policy on this page.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-3 text-neon-primary">8. Contact Us</h3>
              <p className="text-white/90 leading-relaxed">
                If you have any questions about our use of cookies, please contact us through our contact page.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

