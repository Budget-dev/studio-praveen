
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Language, translations } from '@/lib/translations';
import Image from 'next/image';

interface HeroProps {
  lang: Language;
  onOpenWithLang: (l: Language) => void;
  isOpen: boolean;
}

export default function Hero({ lang, onOpenWithLang, isOpen }: HeroProps) {
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
      <div className="relative z-10 w-full max-w-xl bg-white/95 backdrop-blur-sm border-2 border-secondary/30 rounded-[2.5rem] p-6 md:p-10 shadow-[0_20px_60px_rgba(123,48,69,0.15)] text-center animate-in fade-in zoom-in duration-1000">
        <div className="flex justify-center mb-8">
          <Image 
            src="https://1234567890.sirv.com/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2004_44_04%20PM.png"
            alt="Traditional Invitation Cover"
            width={500}
            height={400}
            className="rounded-2xl shadow-md border border-secondary/20"
            priority
          />
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <Button
              onClick={() => onOpenWithLang('te')}
              className="h-16 bg-primary hover:bg-primary/90 text-white rounded-2xl text-2xl font-telugu shadow-lg transition-all hover:scale-105 active:scale-95 border-none"
            >
              తెలుగు
            </Button>
            <Button
              onClick={() => onOpenWithLang('en')}
              className="h-16 bg-primary hover:bg-primary/90 text-white rounded-2xl text-2xl font-headline font-bold shadow-lg transition-all hover:scale-105 active:scale-95 border-none"
            >
              ENGLISH
            </Button>
          </div>

          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">Select language to enter</p>
        </div>
      </div>
    </div>
  );
}
