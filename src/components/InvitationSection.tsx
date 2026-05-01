"use client";

import React from 'react';
import { Language, translations } from '@/lib/translations';
import Image from 'next/image';

interface InvitationSectionProps {
  lang: Language;
}

const InvitationSection = ({ lang }: InvitationSectionProps) => {
  const t = translations[lang];

  return (
    <section id="invitation" className="pt-2 pb-6 px-4 md:px-8 bg-[#FAF7F2] text-center">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header text */}
        <div className="mb-0">
          <h1 className="text-xl md:text-3xl font-headline text-primary tracking-wide py-1">
            Housewarming Ceremony
          </h1>
        </div>

        {/* Central Ganesha Image */}
        <div className="flex justify-center -mb-8 sm:-mb-12">
          <div className="relative w-full md:max-w-md">
            <Image 
              src="https://1234567890.sirv.com/ChatGPT%20Image%20Apr%2024%2C%202026%2C%2012_35_36%20PM.png"
              alt="Housewarming Ceremony"
              width={1200}
              height={1200}
              className="w-full h-auto block"
              priority
              unoptimized
            />
          </div>
        </div>

        {/* Shree Ganeshaya Namaha */}
        <div className="flex flex-col items-center mb-2 relative z-10">
          <h2 className={`${lang === 'te' ? 'font-telugu' : 'font-headline font-bold'} text-secondary text-2xl md:text-4xl`}>
            {t.shreeGanesh}
          </h2>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            {/* Opening Message - Split into two lines as requested */}
            {lang === 'en' ? (
              <div className="flex flex-col gap-1 mb-4">
                <p className="font-headline text-muted-foreground text-sm sm:text-base md:text-lg italic">
                  {t.blessingPrefix}
                </p>
                <p className="font-headline font-bold text-muted-foreground text-base sm:text-lg md:text-xl">
                  {t.blessingNames}
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-1 mb-4">
                <p className="font-telugu font-bold text-muted-foreground text-lg sm:text-xl md:text-2xl">
                  {t.blessingNames}
                </p>
                <p className="font-telugu text-muted-foreground text-base sm:text-lg md:text-xl italic">
                  {t.blessingPrefix}
                </p>
              </div>
            )}
            
            <div className="gold-divider my-4" />

            {/* Invite Text */}
            <div className="py-2">
              <p className={`text-muted-foreground font-headline font-semibold text-base sm:text-lg md:text-xl px-4`}>
                {t.inviteText}
              </p>
            </div>

            {/* Occasion Box */}
            <div className="my-4 inline-block w-full max-w-2xl px-4">
               <h2 className={`text-xl md:text-3xl text-primary font-bold py-4 border-y border-secondary/20 bg-white/50 w-full ${lang === 'te' ? 'font-telugu' : 'font-headline font-bold'}`}>
                {t.occasion}
              </h2>
            </div>

            {/* Body Text */}
            <p className={`text-foreground text-base md:text-xl leading-relaxed max-w-2xl mx-auto px-4 mt-4 ${lang === 'te' ? 'font-telugu' : 'font-body'}`}>
              {t.bodyText}
            </p>
          </div>
        </div>

        {/* Bottom Message */}
        <div className="flex justify-center gap-2 text-primary font-telugu text-xl md:text-2xl mt-8">
          💐 బంధు మిత్రుల అభినందనలతో 💐
        </div>
      </div>
    </section>
  );
};

export default InvitationSection;
