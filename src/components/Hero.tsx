"use client";

import React from 'react';
import { Language } from '@/lib/translations';
import Image from 'next/image';

interface HeroProps {
  lang: Language;
  onOpenWithLang: (l: Language) => void;
  isOpen: boolean;
}

export default function Hero({ onOpenWithLang, isOpen }: HeroProps) {
  if (isOpen) return null;

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-[#FAF7F2]">
      <div className="w-full max-w-[500px] flex flex-col items-center animate-in fade-in zoom-in duration-700">
        
        {/* Invitation Cover Image Container */}
        <div className="relative w-full overflow-hidden rounded-[2.5rem] shadow-2xl border border-secondary/10 bg-white">
          <Image 
            src="https://vennky.sirv.com/ChatGPT%20Image%20May%202%2C%202026%2C%2011_11_04%20PM.png"
            alt="Patnala Gruhapravesam Invitation Cover"
            width={500}
            height={500}
            className="w-full h-auto"
            priority
          />

          {/* Overlay Buttons on the bottom of the image */}
          <div className="absolute bottom-6 sm:bottom-10 inset-x-0 flex flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-6">
            <button
              onClick={() => onOpenWithLang('te')}
              className="flex-1 max-w-[110px] sm:max-w-[130px] h-11 sm:h-12 bg-primary hover:bg-primary/90 text-white rounded-xl text-lg sm:text-xl font-telugu shadow-xl border-none transition-all active:scale-95 flex items-center justify-center cursor-pointer"
            >
              తెలుగు
            </button>
            <button
              onClick={() => onOpenWithLang('en')}
              className="flex-1 max-w-[110px] sm:max-w-[130px] h-11 sm:h-12 bg-primary hover:bg-primary/90 text-white rounded-xl text-sm sm:text-lg font-headline font-bold shadow-xl border-none transition-all active:scale-95 flex items-center justify-center cursor-pointer"
            >
              ENGLISH
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
