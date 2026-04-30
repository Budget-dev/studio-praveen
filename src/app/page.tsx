
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Language } from '@/lib/translations';
import LoadingSplash from '@/components/LoadingSplash';
import LanguageToggle from '@/components/LanguageToggle';
import InvitationSection from '@/components/InvitationSection';
import EventDetails from '@/components/EventDetails';
import WishBook from '@/components/WishBook';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import PetalsAnimation from '@/components/PetalsAnimation';
import Hero from '@/components/Hero';
import Image from 'next/image';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [lang, setLang] = useState<Language>('en'); // Default to English for the cover
  const [isOpened, setIsOpened] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleOpenInvitation = (selectedLang: Language) => {
    setLang(selectedLang);
    setIsOpened(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch((error) => {
        console.error("Audio playback failed:", error);
      });
    }
  };

  const handleLangToggle = (newLang: Language) => {
    setLang(newLang);
  };

  if (isLoading) return <LoadingSplash />;

  const audioPath = "/song/Agajanana%20Padmarkam%20_%20Shri%20Ganesha%20Slokam%20__.mp3";

  return (
    <main className="relative min-h-screen bg-[#FAF7F2] pt-0">
      <audio
        ref={audioRef}
        preload="auto"
        loop
      >
        <source src={audioPath} type="audio/mpeg" />
      </audio>
      
      {isOpened && <LanguageToggle current={lang} onToggle={handleLangToggle} />}
      <PetalsAnimation />
      
      <Hero 
        lang={lang} 
        isOpen={isOpened} 
        onOpenWithLang={handleOpenInvitation} 
      />
      
      {isOpened && (
        <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000 relative">
          {/* Side Floral Decorations - Fixed to Viewport Sides */}
          <div className="hidden lg:block fixed inset-y-0 left-0 w-[200px] pointer-events-none z-10 opacity-40">
            <div className="relative w-full h-full">
              <Image 
                src="https://1234567890.sirv.com/ChatGPT%20Image%20Apr%2024%2C%202026%2C%2003_16_38%20PM.png"
                alt=""
                fill
                className="object-contain object-left"
              />
            </div>
          </div>
          <div className="hidden lg:block fixed inset-y-0 right-0 w-[200px] pointer-events-none z-10 opacity-40 scale-x-[-1]">
            <div className="relative w-full h-full">
              <Image 
                src="https://1234567890.sirv.com/ChatGPT%20Image%20Apr%2024%2C%202026%2C%2003_16_38%20PM.png"
                alt=""
                fill
                className="object-contain object-left"
              />
            </div>
          </div>

          <InvitationSection lang={lang} />
          <EventDetails lang={lang} />
          <WishBook lang={lang} />
          <Footer lang={lang} />
        </div>
      )}

      <ScrollToTop />
    </main>
  );
}
