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
    <section id="invitation" className="pt-0 pb-20 px-4 md:px-8 bg-[#FAF7F2] text-center">
      <div className="max-w-4xl mx-auto">
        {/* Raw Ceremony Image - Sized down even more and centered with no top gap */}
        <div className="flex justify-center mb-0 pt-0 overflow-hidden">
          <Image 
            src="https://1234567890.sirv.com/ChatGPT%20Image%20Apr%2024%2C%202026%2C%2012_35_36%20PM.png"
            alt="Housewarming Ceremony"
            width={300}
            height={160}
            className="w-full max-w-[280px] h-auto block"
            priority
          />
        </div>

        <div className="flex flex-col items-center mb-4 mt-2">
          <h2 className={`${lang === 'te' ? 'font-telugu' : 'font-headline'} text-secondary text-lg`}>
            {t.shreeGanesh}
          </h2>
        </div>

        <div className="space-y-12">
          <div className="space-y-6">
            <p className={`${lang === 'te' ? 'font-telugu' : 'font-headline'} text-muted-foreground text-lg italic max-w-2xl mx-auto leading-relaxed`}>
              {t.openingMessage}
            </p>
            
            <div className="gold-divider" />

            <div className="space-y-4">
              <h3 className={`text-3xl md:text-4xl ${lang === 'te' ? 'font-telugu font-bold' : 'font-script'} text-primary`}>
                {t.hostCouple}
              </h3>
              <p className="text-muted-foreground italic font-headline">
                {t.inviteText}
              </p>
            </div>

            <h2 className={`text-2xl md:text-4xl text-primary font-bold px-4 py-6 border-y-2 border-secondary/20 bg-white/50 inline-block w-full max-w-3xl ${lang === 'te' ? 'font-telugu' : 'font-headline'}`}>
              {t.occasion}
            </h2>

            <p className={`text-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto ${lang === 'te' ? 'font-telugu' : 'font-body'}`}>
              {t.bodyText}
            </p>
            
            <div className="flex justify-center gap-2 text-primary font-telugu text-xl mt-8">
              💐 బంధు మిత్రుల అభినందనలతో 💐
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvitationSection;
