
"use client";

import React, { useState, useEffect, useRef } from 'react';
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
import Hero from '@/components/Hero';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showLangSplash, setShowLangSplash] = useState(false);
  const [lang, setLang] = useState<Language | null>(null);
  const [isOpened, setIsOpened] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowLangSplash(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleLangSelect = (selectedLang: Language) => {
    setLang(selectedLang);
    setShowLangSplash(false);
  };

  const handleOpenInvitation = () => {
    setIsOpened(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch((error) => {
        console.error("Audio playback failed. Please ensure the file exists in /public/song/:", error);
      });
    }
  };

  if (isLoading) return <LoadingSplash />;
  if (showLangSplash || !lang) return <LanguageSplash onSelect={handleLangSelect} />;

  // The filename from the screenshot: "Agajanana Padmarkam _ Shri Ganesha Slokam __.mp3"
  const audioPath = "/song/Agajanana%20Padmarkam%20_%20Shri%20Ganesha%20Slokam%20__.mp3";

  return (
    <main className="relative min-h-screen bg-[#FAF7F2] pt-0">
      <audio
        ref={audioRef}
        preload="auto"
        loop
      >
        <source src={audioPath} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      
      <LanguageToggle current={lang} onToggle={handleLangSelect} />
      <PetalsAnimation />
      
      <Hero lang={lang} isOpen={isOpened} onOpen={handleOpenInvitation} />
      
      {isOpened && (
        <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000">
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
