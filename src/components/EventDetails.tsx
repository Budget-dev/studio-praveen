
"use client";

import React from 'react';
import { Language, translations } from '@/lib/translations';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Sparkles } from 'lucide-react';
import Image from 'next/image';

interface EventDetailsProps {
  lang: Language;
}

const EventDetails = ({ lang }: EventDetailsProps) => {
  const t = translations[lang];

  const generateICS = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Patnala Housewarming//EN
BEGIN:VEVENT
DTSTART:20260508T134300Z
DTEND:20260508T164300Z
SUMMARY:Patnala Gruhapravesam Ceremony
DESCRIPTION:Housewarming ceremony at Sapthagiri Layout\\, YSR Nagar Road\\, Vizianagaram
LOCATION:Sapthagiri Layout, YSR Nagar Road, Vizianagaram
END:VEVENT
BEGIN:VEVENT
DTSTART:20260509T063000Z
DTEND:20260509T103000Z
SUMMARY:Patnala Satyanarayana Vratham & Lunch
DESCRIPTION:Satyanarayana Swamy Vratham and Lunch from 12 noon at the new residence
LOCATION:Sapthagiri Layout, YSR Nagar Road, Vizianagaram
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'patnala-housewarming.ics';
    link.click();
  };

  return (
    <section className="pt-6 pb-2 px-4 md:px-8 bg-white/50 backdrop-blur-sm flex flex-col items-center justify-center">
      <div className="max-w-6xl mx-auto w-full">
        <h2 className={`text-3xl text-center text-primary mb-8 ${lang === 'te' ? 'font-telugu' : 'font-headline font-bold'}`}>
          {t.detailsTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-secondary/20 hover:scale-[1.02] transition-transform shadow-lg bg-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 text-secondary opacity-10">
               <Sparkles className="w-12 h-12" />
            </div>
            <CardContent className="p-8 text-center space-y-4">
              <div className="mb-4 flex justify-center relative w-full h-24">
                <Image 
                  src="https://1234567890.sirv.com/ChatGPT%20Image%20Apr%2024%2C%202026%2C%2003_13_24%20PM.png"
                  alt="Gruhapravesam Ceremony"
                  fill
                  className="object-contain"
                  data-ai-hint="ceremony ritual"
                />
              </div>
              <h3 className="text-xl font-bold text-primary">{t.event1Title}</h3>
              <p className="text-foreground font-bold text-lg">{t.event1Date}</p>
              <p className="text-2xl font-bold text-primary">{t.event1Time}</p>
            </CardContent>
          </Card>

          <Card className="border-secondary/20 hover:scale-[1.02] transition-transform shadow-lg bg-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 text-secondary opacity-10">
               <Sparkles className="w-12 h-12" />
            </div>
            <CardContent className="p-8 text-center space-y-4">
              <div className="mb-4 flex justify-center relative w-full h-24">
                <Image 
                  src="https://1234567890.sirv.com/ChatGPT%20Image%20Apr%2024%2C%202026%2C%2003_07_05%20PM.png"
                  alt="Satyanarayana Swamy"
                  fill
                  className="object-contain"
                  data-ai-hint="sacred deity"
                />
              </div>
              <h3 className="text-xl font-bold text-primary">{t.event2Title}</h3>
              <p className="text-foreground font-bold text-lg">{t.event2Date}</p>
              <p className="text-2xl font-bold text-primary">{t.event2Time}</p>
            </CardContent>
          </Card>

          <Card className="border-secondary/20 hover:scale-[1.02] transition-transform shadow-lg bg-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 text-secondary opacity-10">
               <Sparkles className="w-12 h-12" />
            </div>
            <CardContent className="p-8 text-center space-y-4">
              <div className="mb-4 flex justify-center relative w-full h-24">
                <Image 
                  src="https://1234567890.sirv.com/ChatGPT%20Image%20May%201%2C%202026%2C%2007_36_28%20PM.png"
                  alt="Venue Location"
                  fill
                  className="object-contain"
                  data-ai-hint="venue map"
                />
              </div>
              <h3 className="text-xl font-bold text-primary">{t.venueTitle}</h3>
              <p className="text-foreground font-bold text-base leading-relaxed mb-4">{t.venueAddress}</p>
              
              <div className="flex flex-col gap-2">
                <Button variant="outline" onClick={generateICS} className="border-secondary text-primary hover:bg-secondary hover:text-white w-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  {t.addCalendar}
                </Button>
                <Button onClick={() => window.open('https://maps.app.goo.gl/57XQ4Nz7uptKqEW37', '_blank')} className="bg-primary hover:bg-primary/90 text-white w-full">
                  <MapPin className="w-4 h-4 mr-2" />
                  {t.getDirections}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
