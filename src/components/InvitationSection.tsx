
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
          <h1 className="text-xl md:text-2xl font-headline text-primary tracking-wide py-1">
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

        {/* Shree Ganeshaya Namaha - Pulled up with negative margin */}
        <div className="flex flex-col items-center mb-1 relative z-10">
          <h2 className={`${lang === 'te' ? 'font-telugu' : 'font-headline font-bold'} text-secondary text-xl md:text-2xl`}>
            {t.shreeGanesh}
          </h2>
        </div>

        <div className="space-y-1">
          <div className="space-y-1">
            {/* Opening Message - Forced to one line */}
            <p className={`${lang === 'te' ? 'font-telugu italic' : 'font-headline font-bold'} text-muted-foreground text-[10px] sm:text-sm md:text-lg whitespace-nowrap leading-tight`}>
              {t.openingMessage}
            </p>
            
            <div className="gold-divider my-2" />

            {/* Host Section Simplified - Only Invite Text */}
            <div className="space-y-1 py-1">
              <p className={`text-muted-foreground font-headline font-semibold text-sm md:text-base`}>
                {t.inviteText}
              </p>
            </div>

            <h2 className={`text-lg md:text-xl text-primary font-bold px-4 py-1 border-y border-secondary/20 bg-white/50 inline-block w-full max-w-2xl ${lang === 'te' ? 'font-telugu' : 'font-headline font-bold'}`}>
              {t.occasion}
            </h2>

            <p className={`text-foreground text-sm md:text-base leading-relaxed max-w-2xl mx-auto px-4 mt-2 ${lang === 'te' ? 'font-telugu' : 'font-body'}`}>
              {t.bodyText}
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-2 text-primary font-telugu text-lg mt-4">
          💐 బంధు మిత్రుల అభినందనలతో 💐
        </div>
      </div>
    </section>
  );
};

export default InvitationSection;
