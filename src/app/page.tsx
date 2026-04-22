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
      // Use sessionStorage so the language choice persists during the session
      // but shows up again when they close and reopen the invitation.
      const savedLang = sessionStorage.getItem('invitation_lang') as Language;
      if (savedLang) {
        setLang(savedLang);
      } else {
        setShowLangSplash(true);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleLangSelect = (selectedLang: Language) => {
    setLang(selectedLang);
    sessionStorage.setItem('invitation_lang', selectedLang);
    setShowLangSplash(false);
  };

  const handleOpenInvitation = () => {
    setIsInvitationOpen(true);
    // Smooth scroll to invitation content
    setTimeout(() => {
      document.getElementById('invitation')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  if (isLoading) return <LoadingSplash />;
  if (showLangSplash || !lang) return <LanguageSplash onSelect={handleLangSelect} />;

  return (
    <main className="relative min-h-screen">
      <LanguageToggle current={lang} onToggle={handleLangSelect} />
      <PetalsAnimation />
      
      <Hero lang={lang} onOpen={handleOpenInvitation} />
      
      <div className={`transition-all duration-1000 ${isInvitationOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <InvitationSection lang={lang} />
        <EventDetails lang={lang} />
        <WishBook lang={lang} />
        <Gallery lang={lang} />
        <Footer lang={lang} />
      </div>

      <ScrollToTop />
    </main>
  );
}