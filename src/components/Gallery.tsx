"use client";

import React from 'react';
import { Language, translations } from '@/lib/translations';
import { Camera } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface GalleryProps {
  lang: Language;
}

const Gallery = ({ lang }: GalleryProps) => {
  const t = translations[lang];

  return (
    <section className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-4xl text-center text-primary mb-12 ${lang === 'te' ? 'font-telugu' : 'font-headline'}`}>
          {t.photosTitle}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PlaceHolderImages.map((img) => (
            <div key={img.id} className="group relative aspect-video overflow-hidden rounded-2xl bg-muted border border-secondary/10 shadow-inner">
               <Image 
                src={img.imageUrl} 
                alt={img.description}
                fill
                className="object-cover opacity-60 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700"
                data-ai-hint={img.imageHint}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white p-4 text-center opacity-80 group-hover:opacity-100 transition-opacity">
                <div className="flex flex-col items-center gap-2">
                  <Camera className="w-8 h-8 opacity-50" />
                  <span className="font-headline tracking-widest">{t.photosSoon}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;