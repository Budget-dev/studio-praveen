
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
      {/* Main Single Card Container as seen in the screenshot */}
      <div className="w-full max-w-[500px] bg-white rounded-[3rem] shadow-[0_15px_50px_rgba(0,0,0,0.06)] overflow-hidden p-6 md:p-10 flex flex-col items-center animate-in fade-in zoom-in duration-700">
        
        {/* Invitation Cover Image */}
        <div className="w-full mb-8">
          <Image 
            src="https://1234567890.sirv.com/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2004_44_04%20PM.png"
            alt="Patnala Gruhapravesam Invitation Cover"
            width={500}
            height={500}
            className="w-full h-auto rounded-[2.5rem] border border-secondary/10"
            priority
          />
        </div>

        {/* Language Selection Buttons */}
        <div className="w-full max-w-[320px] flex flex-col gap-4">
          <Button
            onClick={() => onOpenWithLang('te')}
            className="h-16 bg-primary hover:bg-primary/90 text-white rounded-[1.25rem] text-2xl font-telugu shadow-md border-none transition-all active:scale-95"
          >
            తెలుగు
          </Button>
          <Button
            onClick={() => onOpenWithLang('en')}
            className="h-16 bg-primary hover:bg-primary/90 text-white rounded-[1.25rem] text-2xl font-headline font-bold shadow-md border-none transition-all active:scale-95"
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
