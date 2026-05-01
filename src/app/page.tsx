
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
  const [lang, setLang] = useState<Language>('en'); 
  const [isOpened, setIsOpened] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const attemptPlay = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.6;
        audioRef.current.play().catch(() => {
          // Handled by browser policy
        });
      }
    };

    // Attach listeners to window immediately to capture any interaction
    // This allows music to start even during the splash screen if the user clicks anywhere
    const events = ['click', 'touchstart', 'mousedown', 'keydown', 'scroll'];
    events.forEach(event => {
      window.addEventListener(event, attemptPlay, { once: true });
    });
    
    return () => {
      events.forEach(event => {
        window.removeEventListener(event, attemptPlay);
      });
    };
  }, []);

  const handleOpenInvitation = (selectedLang: Language) => {
    setLang(selectedLang);
    setIsOpened(true);
    
    // Attempt play again on deliberate button click
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch((error) => {
        console.warn("Audio playback failed:", error);
      });
    }
  };

  const handleLangToggle = (newLang: Language) => {
    setLang(newLang);
  };

  const audioPath = "/song/Agajanana%20Padmarkam%20_%20Shri%20Ganesha%20Slokam%20__.mp3";

  return (
    <main className={`relative bg-[#FAF7F2] ${isOpened ? 'overflow-x-hidden' : ''}`}>
      <audio
        ref={audioRef}
        preload="auto"
        loop
      >
        <source src={audioPath} type="audio/mpeg" />
      </audio>
      
      {isLoading && <LoadingSplash />}
      
      {isOpened && <LanguageToggle current={lang} onToggle={handleLangToggle} />}
      <PetalsAnimation />
      
      {!isLoading && !isOpened && (
        <Hero 
          lang={lang} 
          isOpen={isOpened} 
          onOpenWithLang={handleOpenInvitation} 
        />
      )}
      
      {isOpened && (
        <div className="relative">
          {/* Side Floral Decorations */}
          <div className="hidden lg:block fixed inset-y-0 left-0 w-[180px] pointer-events-none z-50 opacity-40">
            <div className="relative w-full h-full">
              <Image 
                src="https://1234567890.sirv.com/ChatGPT%20Image%20Apr%2024%2C%202026%2C%2003_16_38%20PM.png"
                alt=""
                fill
                className="object-contain object-left"
              />
            </div>
          </div>
          <div className="hidden lg:block fixed inset-y-0 right-0 w-[180px] pointer-events-none z-50 opacity-40 scale-x-[-1]">
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

      {isOpened && <ScrollToTop />}
    </main>
  );
}
