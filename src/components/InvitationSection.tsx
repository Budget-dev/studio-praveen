
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
        {/* Central Ganesha Image - Extra Large Size */}
        <div className="flex justify-center -my-8 md:-my-12">
          <div className="relative w-full max-w-[380px] md:max-w-lg lg:max-w-xl">
            <Image 
              src="https://1234567890.sirv.com/ChatGPT%20Image%20Apr%2024%2C%202026%2C%2012_35_36%20PM.png"
              alt="Lord Ganesha"
              width={800}
              height={800}
              className="w-full h-auto block"
              priority
              unoptimized
            />
          </div>
        </div>

        {/* Header */}
        <div className="flex flex-col items-center mb-2 relative z-10">
          <h2 className={`${lang === 'te' ? 'font-telugu text-2xl md:text-3xl' : 'font-headline font-bold text-3xl md:text-5xl'} text-secondary`}>
            {t.shreeGanesh}
          </h2>
        </div>

        <div className="space-y-0.5">
          {/* Blessings Section - Very tight spacing */}
          <div className="flex flex-col gap-0.5 mb-2">
            <p className={`${lang === 'te' ? 'font-telugu text-xl md:text-2xl' : 'font-headline text-lg md:text-2xl'} text-muted-foreground italic font-medium`}>
              {t.blessingPrefix}
            </p>
            <p className={`${lang === 'te' ? 'font-telugu text-2xl md:text-3xl' : 'font-headline text-2xl md:text-3xl'} font-bold text-[#2C2015] leading-tight`}>
              {t.blessingNames}
            </p>
            
            {/* Host Couple Name - Semibold Maroon */}
            <p className={`${lang === 'te' ? 'font-telugu text-2xl md:text-4xl' : 'font-headline text-2xl md:text-4xl'} font-semibold text-primary mt-1`}>
              {t.hostCouple}
            </p>
          </div>
          
          <div className="gold-divider my-2 opacity-60" />

          {/* Invite Text */}
          <div className="py-0.5">
            <p className={`${lang === 'te' ? 'font-telugu text-lg md:text-2xl' : 'font-headline text-lg md:text-2xl'} text-muted-foreground font-bold px-4 leading-relaxed max-w-2xl mx-auto`}>
              {t.inviteText}
            </p>
          </div>

          {/* Occasion Box - Compact 3-line layout */}
          <div className="my-1 inline-block w-full max-w-3xl px-4">
             <div className={`py-4 border-y-2 border-secondary/20 bg-white/40 w-full flex flex-col gap-1 ${lang === 'te' ? 'font-telugu' : 'font-headline font-bold'}`}>
              <span className="text-2xl md:text-3xl text-primary leading-tight px-4">{t.occasion1}</span>
              <span className="text-xl md:text-2xl text-secondary">{t.occasionAnd}</span>
              <span className="text-2xl md:text-3xl text-primary leading-tight px-4">{t.occasion2}</span>
            </div>
          </div>

          {/* Body Text */}
          <p className={`text-foreground text-lg md:text-xl leading-relaxed max-w-3xl mx-auto px-6 mt-3 ${lang === 'te' ? 'font-telugu font-medium' : 'font-body font-medium'}`}>
            {t.bodyText}
          </p>
        </div>

        {/* Bottom Message */}
        <div className="flex justify-center gap-2 text-primary font-telugu text-2xl md:text-3xl mt-8 font-bold animate-pulse">
          💐 బంధు మిత్రుల అభినందనలతో 💐
        </div>
      </div>
    </section>
  );
};

export default InvitationSection;
