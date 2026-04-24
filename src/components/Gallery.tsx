
"use client";

import React, { useEffect, useState } from 'react';
import { Language, translations } from '@/lib/translations';
import { Camera, Loader2, Heart } from 'lucide-react';
import Image from 'next/image';
import { getGalleryImages, GalleryImage } from '@/lib/firebase';

interface GalleryProps {
  lang: Language;
}

const Gallery = ({ lang }: GalleryProps) => {
  const t = translations[lang];
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await getGalleryImages();
        setImages(data);
      } catch (error) {
        console.error("Failed to fetch gallery images:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, []);

  return (
    <section className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-4xl text-center text-primary mb-12 ${lang === 'te' ? 'font-telugu' : 'font-headline'}`}>
          {t.photosTitle}
        </h2>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-12 h-12 animate-spin text-secondary" />
            <p className="text-muted-foreground animate-pulse">Opening the album...</p>
          </div>
        ) : images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((img) => (
              <div key={img.id} className="group flex flex-col gap-4">
                <div className="relative aspect-video overflow-hidden rounded-[2rem] bg-muted border border-secondary/10 shadow-lg hover:shadow-2xl transition-all duration-500">
                  <Image 
                    src={img.imageUrl} 
                    alt={img.caption || "Housewarming Moment"}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <Heart className="text-white w-6 h-6 fill-white/20" />
                  </div>
                </div>
                {img.caption && (
                  <p className={`text-center text-primary italic text-lg px-4 ${lang === 'te' ? 'font-telugu' : 'font-headline'}`}>
                    {img.caption}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#FAF7F2] rounded-[3rem] border-4 border-dashed border-secondary/10">
            <div className="flex flex-col items-center gap-4">
              <Camera className="w-16 h-16 text-secondary/30" />
              <p className="text-muted-foreground italic text-xl">{t.photosSoon}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
