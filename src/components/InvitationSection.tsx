"use client";

import React from 'react';
import { Language, translations } from '@/lib/translations';
import OmIcon from './OmIcon';

interface InvitationSectionProps {
  lang: Language;
}

const InvitationSection = ({ lang }: InvitationSectionProps) => {
  const t = translations[lang];

  return (
    <section id="invitation" className="py-20 px-4 md:px-8 bg-[#FAF7F2] text-center">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Custom Header Image */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-[2.5rem] shadow-[0_20px_60px_rgba(123,48,69,0.15)] border-8 border-white">
            <img 
              src="https://1234567890.sirv.com/ChatGPT%20Image%20Apr%2024%2C%202026%2C%2012_35_36%20PM.png"
              alt="Housewarming Ceremony"
              className="w-full h-auto block"
            />
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-secondary mb-4">
            <OmIcon className="w-16 h-16" />
          </div>
          <h2 className={`${lang === 'te' ? 'font-telugu' : 'font-headline'} text-secondary text-xl italic`}>{t.shreeGanesh}</h2>
        </div>

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
    </section>
  );
};

export default InvitationSection;
