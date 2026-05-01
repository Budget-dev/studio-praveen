
"use client";

import React from 'react';
import { Language, translations } from '@/lib/translations';
import { cn } from '@/lib/utils';

interface FooterProps {
  lang: Language;
}

const Footer = ({ lang }: FooterProps) => {
  const t = translations[lang];

  return (
    <footer className="bg-primary text-white py-12 px-4 md:px-8 text-center flex flex-col items-center justify-center">
      <div className="max-w-4xl mx-auto space-y-8">
        <p className={`text-xl md:text-2xl italic ${lang === 'te' ? 'font-telugu' : 'font-headline'}`}>
          {t.footerText}
        </p>
        
        <div className="gold-divider opacity-40" />
        
        <div className="space-y-4">
          <p className={cn(
            "text-sm uppercase text-secondary font-bold opacity-80",
            lang === 'en' && "tracking-[0.4em]",
            lang === 'te' && "tracking-normal"
          )}>
            {t.yoursTruly}
          </p>
          <div className="space-y-3">
            {t.hosts.map((host, idx) => (
              <p key={idx} className={`text-lg md:text-xl ${lang === 'te' ? 'font-telugu font-bold' : 'font-headline font-bold'} text-white`}>
                {host}
              </p>
            ))}
          </div>
          <p className="text-xs uppercase tracking-[0.3em] opacity-40 pt-8">© 2026 Patnala Family</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
