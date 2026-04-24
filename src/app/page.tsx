"use client";

import React, { useState, useEffect } from 'react';
import { Language } from '@/lib/translations';
import LoadingSplash from '@/components/LoadingSplash';
import LanguageSplash from '@/components/LanguageSplash';
import LanguageToggle from '@/components/LanguageToggle';
import Hero from '@/components/Hero';
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
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);

  useEffect(() => {
    // Initial loading sequence
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // Use sessionStorage so it asks for language on every fresh browser visit
      const savedLang = sessionStorage.getItem('selected_language');
      if (savedLang) {
        setLang(savedLang as Language);
      } else {
        setShowLangSplash(true);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleLangSelect = (selectedLang: Language) => {
    setLang(selectedLang);
    sessionStorage.setItem('selected_language', selectedLang);
    setShowLangSplash(false);
  };

  const handleOpenInvitation = () => {
    setIsInvitationOpen(true);
    // Smooth scroll to invitation content
    setTimeout(() => {
      const element = document.getElementById('invitation');
      if (element) {
        const topOffset = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: topOffset, behavior: 'smooth' });
      }
    }, 50);
  };

  if (isLoading) return <LoadingSplash />;
  if (showLangSplash || !lang) return <LanguageSplash onSelect={handleLangSelect} />;

  return (
    <main className={`relative min-h-screen ${!isInvitationOpen ? 'overflow-hidden' : ''}`}>
      <LanguageToggle current={lang} onToggle={handleLangSelect} />
      <PetalsAnimation />
      
      <Hero lang={lang} onOpen={handleOpenInvitation} isOpen={isInvitationOpen} />
      
      {isInvitationOpen && (
        <div className="animate-in fade-in slide-in-from-bottom-20 duration-1000">
          <InvitationSection lang={lang} />
          <EventDetails lang={lang} />
          <WishBook lang={lang} />
          <Gallery lang={lang} />
          <Footer lang={lang} />
        </div>
      )}

      <ScrollToTop />
    </main>
  );
}