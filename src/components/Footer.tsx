'use client';

import React from 'react';
import Link from 'next/link';

const Footer = () => {

  return (
    <footer className="relative border-t border-white/5 bg-background/50 backdrop-blur-sm pt-20 md:pt-24 pb-12 md:pb-16 overflow-hidden">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="container relative mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16 mb-16 md:mb-20">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block font-mono text-xl font-bold tracking-tighter text-foreground hover:text-neon-cyan transition-colors duration-300 mb-4">
              &lt;Kracked Devs /&gt;
            </Link>
            <p className="text-muted-foreground max-w-md mb-6">
              Building the future of tech, one line of code at a time. Join the elite community of developers pushing boundaries.
            </p>
            <div className="flex gap-4">
              <SocialLink icon="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 2.468-4.669 3.037-7.408 2.825 2.369 1.379 5.166 2.184 8.143 2.184 9.784 0 15.144-7.997 15.144-14.748 0-.215 0-.433-.014-.651.969-.699 1.8-1.565 2.455-2.449z" href="https://x.com/i/communities/1983062242292822298" />
              <SocialLink icon="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" href="https://x.com/i/communities/1983062242292822298" />
              <SocialLink icon="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" href="https://x.com/i/communities/1983062242292822298" />
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-foreground mb-4 uppercase tracking-widest text-sm">Links</h4>
            <ul className="space-y-2">
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
              <FooterLink href="/jobs">Jobs</FooterLink>
              <FooterLink href="/faq">FAQ</FooterLink>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-foreground mb-4 uppercase tracking-widest text-sm">Legal</h4>
            <ul className="space-y-2">
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/terms">Terms of Service</FooterLink>
              <FooterLink href="/cookies">Cookie Policy</FooterLink>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-10 md:pt-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Kracked Devs. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            All Systems Operational
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ icon, href }: { icon: string; href: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-neon-cyan hover:border-neon-cyan hover:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-all duration-300 bg-white/5">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className="fill-current">
      <path d={icon} />
    </svg>
  </a>
);

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <Link href={href} className="text-sm text-muted-foreground hover:text-neon-pink transition-colors duration-300 flex items-center gap-2 group">
      <span className="w-0 h-px bg-neon-pink transition-all duration-300 group-hover:w-4" />
      {children}
    </Link>
  </li>
);

export default Footer;
