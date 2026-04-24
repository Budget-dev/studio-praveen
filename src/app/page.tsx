
"use client";

import React, { useState, useEffect } from 'react';
import { Language } from '@/lib/translations';
import LoadingSplash from '@/components/LoadingSplash';
import LanguageSplash from '@/components/LanguageSplash';
import LanguageToggle from '@/components/LanguageToggle';
import InvitationSection from '@/components/InvitationSection';
import EventDetails from '@/components/EventDetails';
import WishBook from '@/components/WishBook';
import Gallery from '@/components/Gallery';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import PetalsAnimation from '@/components/PetalsAnimation';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showLangSplash, setShowLangSplash] = useState(false);
  const [lang, setLang] = useState<Language | null>(null);

  useEffect(() => {
    // Initial loading sequence
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // Always show language selection on reload
      setShowLangSplash(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleLangSelect = (selectedLang: Language) => {
    setLang(selectedLang);
    // Removed sessionStorage persistence so it asks on every reload
    setShowLangSplash(false);
  };

  if (isLoading) return <LoadingSplash />;
  if (showLangSplash || !lang) return <LanguageSplash onSelect={handleLangSelect} />;

  return (
    <main className="relative min-h-screen bg-[#FAF7F2]">
      <LanguageToggle current={lang} onToggle={handleLangSelect} />
      <PetalsAnimation />
      
      <div className="animate-in fade-in duration-1000">
        <div className="pt-0"> {/* Removed top padding entirely */}
          <InvitationSection lang={lang} />
          <EventDetails lang={lang} />
          <WishBook lang={lang} />
          <Gallery lang={lang} />
          <Footer lang={lang} />
        </div>
      </div>

      <ScrollToTop />
    </main>
  );
}
