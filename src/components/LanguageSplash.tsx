
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Language } from '@/lib/translations';
import Image from 'next/image';

interface LanguageSplashProps {
  onSelect: (lang: Language) => void;
}

const LanguageSplash = ({ onSelect }: LanguageSplashProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#FAF7F2] flex flex-col items-center justify-center p-6 text-center">
      {/* Subtle border motif */}
      <div className="absolute inset-4 border border-secondary opacity-20 pointer-events-none rounded-xl" />
      
      <div className="relative z-10 max-w-md w-full space-y-8 animate-in fade-in zoom-in duration-700">
        <div className="flex justify-center mb-6">
          <Image 
            src="https://1234567890.sirv.com/ChatGPT%20Image%20Apr%2024%2C%202026%2C%2002_34_38%20PM.png"
            alt="Sacred Image"
            width={280}
            height={280}
            className="w-full max-w-[240px] h-auto drop-shadow-xl"
            priority
          />
        </div>
        
        <h1 className="text-2xl font-headline text-muted-foreground flex flex-col gap-2">
          <span>Select Language</span>
          <span className="font-telugu">భాష ఎంచుకోండి</span>
        </h1>

        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => onSelect('te')}
            className="h-16 w-32 bg-primary hover:bg-primary/90 text-white border-2 border-secondary rounded-xl text-xl font-telugu shadow-lg transition-transform hover:scale-105"
          >
            తెలుగు
          </Button>
          <Button
            onClick={() => onSelect('en')}
            className="h-16 w-32 bg-primary hover:bg-primary/90 text-white border-2 border-secondary rounded-xl text-xl font-headline shadow-lg transition-transform hover:scale-105"
          >
            English
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSplash;
