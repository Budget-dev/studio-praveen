
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
    <section id="invitation" className="pt-2 pb-12 px-4 md:px-8 bg-[#FAF7F2] text-center">
      <div className="max-w-4xl mx-auto w-full">
        {/* Central Ganesha Image */}
        <div className="flex justify-center -my-6 md:-my-10">
          <div className="relative w-full max-w-[320px] md:max-w-md">
            <Image 
              src="https://1234567890.sirv.com/ChatGPT%20Image%20Apr%2024%2C%202026%2C%2012_35_36%20PM.png"
              alt="Lord Ganesha"
              width={600}
              height={600}
              className="w-full h-auto block"
              priority
              unoptimized
            />
          </div>
        </div>

        {/* Shree Ganeshaya Namaha */}
        <div className="flex flex-col items-center mb-8 relative z-10">
          <h2 className={`${lang === 'te' ? 'font-telugu text-2xl md:text-3xl' : 'font-headline font-bold text-3xl md:text-5xl'} text-secondary mb-2`}>
            {t.shreeGanesh}
          </h2>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            {/* Blessings Section */}
            <div className="flex flex-col gap-3 mb-8">
              <p className={`${lang === 'te' ? 'font-telugu text-xl md:text-2xl' : 'font-headline text-lg md:text-2xl'} text-muted-foreground italic font-medium`}>
                {t.blessingPrefix}
              </p>
              <p className={`${lang === 'te' ? 'font-telugu text-2xl md:text-3xl' : 'font-headline text-2xl md:text-3xl'} font-bold text-[#2C2015] leading-tight`}>
                {t.blessingNames}
              </p>
              
              {/* Host Couple Name - Semibold and Maroon */}
              <p className={`${lang === 'te' ? 'font-telugu text-2xl md:text-4xl' : 'font-headline text-2xl md:text-4xl'} font-semibold text-primary mt-2`}>
                {t.hostCouple}
              </p>
            </div>
            
            <div className="gold-divider my-10" />

            {/* Invite Text */}
            <div className="py-2">
              <p className={`${lang === 'te' ? 'font-telugu text-lg md:text-2xl' : 'font-headline text-lg md:text-2xl'} text-muted-foreground font-bold px-4 leading-relaxed`}>
                {t.inviteText}
              </p>
            </div>

            {/* Occasion Box - Split into 3 lines */}
            <div className="my-8 inline-block w-full max-w-3xl px-4">
               <div className={`py-12 border-y-2 border-secondary/20 bg-white/40 w-full flex flex-col gap-6 ${lang === 'te' ? 'font-telugu' : 'font-headline font-bold'}`}>
                <span className="text-2xl md:text-4xl text-primary leading-tight px-4">{t.occasion1}</span>
                <span className="text-xl md:text-3xl text-secondary">{t.occasionAnd}</span>
                <span className="text-2xl md:text-4xl text-primary leading-tight px-4">{t.occasion2}</span>
              </div>
            </div>

            {/* Body Text */}
            <p className={`text-foreground text-lg md:text-2xl leading-relaxed max-w-3xl mx-auto px-6 mt-8 ${lang === 'te' ? 'font-telugu font-medium' : 'font-body font-medium'}`}>
              {t.bodyText}
            </p>
          </div>
        </div>

        {/* Bottom Message */}
        <div className="flex justify-center gap-2 text-primary font-telugu text-2xl md:text-3xl mt-20 font-bold animate-pulse">
          💐 బంధు మిత్రుల అభినందనలతో 💐
        </div>
      </div>
    </section>
  );
};

export default InvitationSection;
