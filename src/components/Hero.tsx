
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Language } from '@/lib/translations';
import Image from 'next/image';

interface HeroProps {
  lang: Language;
  onOpenWithLang: (l: Language) => void;
  isOpen: boolean;
}

export default function Hero({ lang, onOpenWithLang, isOpen }: HeroProps) {
  if (isOpen) return null;

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-[#FAF7F2]">
      {/* Simplified container without the card background */}
      <div className="w-full max-w-[500px] flex flex-col items-center animate-in fade-in zoom-in duration-700">
        
        {/* Invitation Cover Image */}
        <div className="w-full mb-8">
          <Image 
            src="https://1234567890.sirv.com/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2004_44_04%20PM.png"
            alt="Patnala Gruhapravesam Invitation Cover"
            width={500}
            height={500}
            className="w-full h-auto rounded-[2.5rem] shadow-2xl border border-secondary/10"
            priority
          />
        </div>

        {/* Language Selection Buttons - Now side-by-side and more compact */}
        <div className="w-full flex flex-row gap-4 justify-center">
          <Button
            onClick={() => onOpenWithLang('te')}
            className="flex-1 max-w-[140px] h-12 bg-primary hover:bg-primary/90 text-white rounded-[1rem] text-xl font-telugu shadow-lg border-none transition-all active:scale-95"
          >
            తెలుగు
          </Button>
          <Button
            onClick={() => onOpenWithLang('en')}
            className="flex-1 max-w-[140px] h-12 bg-primary hover:bg-primary/90 text-white rounded-[1rem] text-xl font-headline font-bold shadow-lg border-none transition-all active:scale-95"
          >
            ENGLISH
          </Button>
        </div>

        {/* Footer Instruction */}
        <p className="mt-8 text-[11px] text-muted-foreground uppercase tracking-[0.2em] font-bold">
          Select language to enter
        </p>
      </div>
    </div>
  );
}
