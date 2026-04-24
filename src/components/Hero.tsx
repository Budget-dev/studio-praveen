
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Language, translations } from '@/lib/translations';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  lang: Language;
  onOpen: () => void;
  isOpen: boolean;
}

const Hero = ({ lang, onOpen, isOpen }: HeroProps) => {
  const t = translations[lang];

  if (isOpen) return null;

  return (
    <div className="relative h-screen flex items-center justify-center p-4 overflow-hidden bg-[#FAF7F2]">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 p-4 opacity-10 pointer-events-none">
        <svg width="200" height="200" viewBox="0 0 200 200">
          <path d="M0 0 Q50 0 50 50 Q50 100 100 100 Q150 100 150 150 Q150 200 200 200" stroke="#7B3045" fill="none" strokeWidth="2"/>
          <circle cx="50" cy="50" r="5" fill="#C49A5A" />
          <circle cx="150" cy="150" r="5" fill="#C49A5A" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 p-4 opacity-10 rotate-180 pointer-events-none">
        <svg width="200" height="200" viewBox="0 0 200 200">
          <path d="M0 0 Q50 0 50 50 Q50 100 100 100 Q150 100 150 150 Q150 200 200 200" stroke="#7B3045" fill="none" strokeWidth="2"/>
          <circle cx="50" cy="50" r="5" fill="#C49A5A" />
          <circle cx="150" cy="150" r="5" fill="#C49A5A" />
        </svg>
      </div>

      {/* Invitation Card (Cover) */}
      <div className="relative z-10 w-full max-w-xl bg-white/95 backdrop-blur-sm border-2 border-secondary/30 rounded-[2.5rem] p-8 md:p-14 shadow-[0_20px_60px_rgba(123,48,69,0.15)] text-center animate-in fade-in zoom-in duration-1000">
        <p className={`text-secondary text-base md:text-lg mb-4 italic tracking-wide ${lang === 'te' ? 'font-telugu' : 'font-headline font-semibold'}`}>
          {t.auspicious}
        </p>
        
        <div className="gold-divider mb-6 opacity-60" />
        
        <h1 className={`text-2xl md:text-4xl lg:text-5xl text-primary mb-6 leading-snug ${lang === 'te' ? 'font-telugu font-bold' : 'font-headline font-bold'}`}>
          {t.mainTitle}
        </h1>
        
        <div className="space-y-3 mb-8">
          <p className="text-muted-foreground text-[10px] md:text-xs uppercase tracking-[0.3em] font-headline font-semibold">Welcome To Our New Home</p>
          <div className="flex flex-col items-center gap-1">
            <span className={`text-xl md:text-2xl ${lang === 'te' ? 'font-telugu font-bold' : 'font-headline font-bold'} text-primary`}>
              {t.hostCouple}
            </span>
          </div>
        </div>

        <div className="animate-in fade-in zoom-in duration-500 flex flex-col items-center">
          <Button
            onClick={onOpen}
            className="group h-14 px-10 bg-primary hover:bg-primary/90 text-white rounded-full text-lg shadow-xl hover:scale-105 transition-all flex items-center gap-3 border-none mb-6"
          >
            <span className={lang === 'te' ? 'font-telugu' : 'font-headline font-semibold'}>
              {t.openInvitation}
            </span>
            <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const text = encodeURIComponent(`You're invited to Patnala Gruhapravesam! 🏠🙏 ${window.location.origin}`);
              window.open(`https://wa.me/?text=${text}`, '_blank');
            }}
            className="border-secondary/40 text-primary hover:bg-secondary/10 rounded-full text-[10px] uppercase tracking-widest h-8"
          >
            Share on WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
