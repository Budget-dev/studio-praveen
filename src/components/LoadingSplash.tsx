"use client";

import React from 'react';
import { Heart } from 'lucide-react';

const LoadingSplash = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-[#FAF7F2] flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="relative">
          <Heart className="w-16 h-16 text-primary animate-pulse fill-primary/20" />
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-8 h-8 border-2 border-secondary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
        <p className="mt-6 font-headline text-primary tracking-widest text-lg animate-pulse flex flex-col items-center gap-2">
          <span>Loading...</span>
          <span className="font-telugu">లోడ్ అవుతోంది...</span>
        </p>
      </div>
    </div>
  );
};

export default LoadingSplash;