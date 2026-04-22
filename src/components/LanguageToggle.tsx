"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';
import { Language } from '@/lib/translations';

interface LanguageToggleProps {
  current: Language;
  onToggle: (lang: Language) => void;
}

const LanguageToggle = ({ current, onToggle }: LanguageToggleProps) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => onToggle(current === 'en' ? 'te' : 'en')}
      className="fixed top-4 right-4 z-40 bg-white/80 backdrop-blur border-secondary text-primary hover:bg-primary hover:text-white rounded-full flex items-center gap-2 shadow-md transition-all"
    >
      <Languages className="w-4 h-4" />
      <span className={current === 'en' ? 'font-telugu' : 'font-headline'}>
        {current === 'en' ? 'తెలుగు' : 'English'}
      </span>
    </Button>
  );
};

export default LanguageToggle;