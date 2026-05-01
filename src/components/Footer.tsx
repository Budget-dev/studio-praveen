
"use client";

import React from 'react';
import { Language, translations } from '@/lib/translations';
import OmIcon from './OmIcon';
import { Heart } from 'lucide-react';

interface FooterProps {
  lang: Language;
}

const Footer = ({ lang }: FooterProps) => {
  const t = translations[lang];

  return (
    <footer className="min-h-screen bg-primary text-white py-12 px-4 md:px-8 text-center flex flex-col items-center justify-center">
      <div className="max-w-4xl mx-auto space-y-6">
        <p className={`text-xl md:text-2xl italic ${lang === 'te' ? 'font-telugu' : 'font-headline'}`}>
          {t.footerText}
        </p>
        
        <div className="h-[1px] w-24 bg-secondary mx-auto" />
        
        <div className="space-y-2">
          <p className={`text-lg ${lang === 'te' ? 'font-telugu font-bold' : 'font-headline font-bold'} text-secondary`}>
            {t.hostCouple}
          </p>
          <p className="text-xs uppercase tracking-[0.3em] opacity-60">© 2026 Patnala Family</p>
        </div>

        <div className="pt-8 flex justify-center items-center gap-8 text-2xl opacity-40 hover:opacity-100 transition-opacity">
          <OmIcon className="w-10 h-10 text-white" />
          <span className="text-4xl">🏠</span>
          <Heart className="w-10 h-10 text-white fill-white" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
