"use client";

import React from 'react';
import { Language, translations } from '@/lib/translations';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Sparkles } from 'lucide-react';

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
DTSTART:20260508T133000Z
DTEND:20260508T163000Z
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
    <section className="py-20 px-4 md:px-8 bg-white/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-4xl text-center text-primary mb-12 ${lang === 'te' ? 'font-telugu' : 'font-headline'}`}>
          {t.detailsTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-secondary/20 hover:scale-[1.02] transition-transform shadow-lg bg-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 text-secondary opacity-10">
               <Sparkles className="w-12 h-12" />
            </div>
            <CardContent className="p-8 text-center space-y-4">
              <div className="text-5xl mb-4">🏠</div>
              <h3 className="text-xl font-bold text-primary">{t.event1Title}</h3>
              <p className="text-muted-foreground">{t.event1Date}</p>
              <p className="text-2xl font-bold text-primary">{t.event1Time}</p>
            </CardContent>
          </Card>

          <Card className="border-secondary/20 hover:scale-[1.02] transition-transform shadow-lg bg-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 text-secondary opacity-10">
               <Sparkles className="w-12 h-12" />
            </div>
            <CardContent className="p-8 text-center space-y-4">
              <div className="text-5xl mb-4">🪔</div>
              <h3 className="text-xl font-bold text-primary">{t.event2Title}</h3>
              <p className="text-muted-foreground">{t.event2Date}</p>
              <p className="text-2xl font-bold text-primary">{t.event2Time}</p>
            </CardContent>
          </Card>

          <Card className="border-secondary/20 hover:scale-[1.02] transition-transform shadow-lg bg-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 text-secondary opacity-10">
               <Sparkles className="w-12 h-12" />
            </div>
            <CardContent className="p-8 text-center space-y-4">
              <div className="text-5xl mb-4">📍</div>
              <h3 className="text-xl font-bold text-primary">{t.venueTitle}</h3>
              <p className="text-sm leading-relaxed mb-4">{t.venueAddress}</p>
              
              <div className="flex flex-col gap-2">
                <Button variant="outline" onClick={generateICS} className="border-secondary text-primary hover:bg-secondary hover:text-white w-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  {t.addCalendar}
                </Button>
                <Button onClick={() => window.open('https://maps.google.com/?q=Sapthagiri+Layout+YSR+Nagar+Road+Vizianagaram', '_blank')} className="bg-primary hover:bg-primary/90 text-white w-full">
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