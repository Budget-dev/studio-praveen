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
    <section id="invitation" className="pt-0 pb-12 px-4 md:px-8 bg-[#FAF7F2] text-center">
      <div className="max-w-4xl mx-auto">
        {/* Ceremony Image at the absolute top */}
        <div className="flex justify-center mb-0 pt-0">
          <Image 
            src="https://1234567890.sirv.com/ChatGPT%20Image%20Apr%2024%2C%202026%2C%2012_35_36%20PM.png"
            alt="Housewarming Ceremony"
            width={800}
            height={440}
            className="w-full max-w-[800px] h-auto block"
            priority
          />
        </div>

        {/* Sacred text immediately visible under image */}
        <div className="flex flex-col items-center mb-6 mt-2">
          <h2 className={`${lang === 'te' ? 'font-telugu' : 'font-headline font-bold'} text-secondary text-xl`}>
            {t.shreeGanesh}
          </h2>
        </div>

        <div className="space-y-12">
          <div className="space-y-6">
            <p className={`${lang === 'te' ? 'font-telugu italic' : 'font-headline'} text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed`}>
              {t.openingMessage}
            </p>
            
            <div className="gold-divider" />

            <div className="space-y-4">
              <h3 className={`text-3xl md:text-4xl ${lang === 'te' ? 'font-telugu font-bold' : 'font-headline font-bold'} text-primary`}>
                {t.hostCouple}
              </h3>
              <p className={`text-muted-foreground font-headline font-semibold`}>
                {t.inviteText}
              </p>
            </div>

            <h2 className={`text-2xl md:text-4xl text-primary font-bold px-4 py-6 border-y-2 border-secondary/20 bg-white/50 inline-block w-full max-w-3xl ${lang === 'te' ? 'font-telugu' : 'font-headline'}`}>
              {t.occasion}
            </h2>

            <p className={`text-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto ${lang === 'te' ? 'font-telugu' : 'font-body'}`}>
              {t.bodyText}
            </p>
          </div>
        </div>

        {/* Telugu Blessing */}
        <div className="flex justify-center gap-2 text-primary font-telugu text-xl mt-12 pt-4">
          💐 బంధు మిత్రుల అభినందనలతో 💐
        </div>

        {/* Traditional Decoration Image (Lotus) positioned under blessing */}
        <div className="flex justify-center mt-8">
          <Image 
            src="https://1234567890.sirv.com/ChatGPT%20Image%20Apr%2024%2C%202026%2C%2002_25_06%20PM.png"
            alt="Traditional Lotus Decoration"
            width={300}
            height={120}
            className="w-full max-w-[280px] h-auto opacity-90 drop-shadow-sm"
          />
        </div>
      </div>
    </section>
  );
};

export default InvitationSection;