
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
      <div className="w-full max-w-[500px] flex flex-col items-center animate-in fade-in zoom-in duration-700">
        
        {/* Invitation Cover Image Container */}
        <div className="relative w-full">
          <Image 
            src="https://1234567890.sirv.com/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2004_44_04%20PM.png"
            alt="Patnala Gruhapravesam Invitation Cover"
            width={500}
            height={500}
            className="w-full h-auto rounded-[2.5rem] shadow-2xl border border-secondary/10"
            priority
          />

          {/* Overlay Buttons on the image */}
          <div className="absolute bottom-10 inset-x-0 flex flex-row gap-4 justify-center px-6">
            <button
              onClick={() => onOpenWithLang('te')}
              className="flex-1 max-w-[130px] h-12 bg-primary hover:bg-primary/90 text-white rounded-xl text-xl font-telugu shadow-xl border-none transition-all active:scale-95 flex items-center justify-center"
            >
              తెలుగు
            </button>
            <button
              onClick={() => onOpenWithLang('en')}
              className="flex-1 max-w-[130px] h-12 bg-primary hover:bg-primary/90 text-white rounded-xl text-lg font-headline font-bold shadow-xl border-none transition-all active:scale-95 flex items-center justify-center"
            >
              ENGLISH
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
