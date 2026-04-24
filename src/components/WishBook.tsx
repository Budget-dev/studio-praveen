"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Language, translations } from '@/lib/translations';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { getWishes, addWish, Wish } from '@/lib/firebase';
import { Loader2, MessageSquare, Send, Heart, Share2 } from 'lucide-react';
import { generatePersonalizedThankYouNote } from '@/ai/flows/generate-personalized-thank-you-note-flow';

interface WishBookProps {
  lang: Language;
}

const WishBook = ({ lang }: WishBookProps) => {
  const t = translations[lang];
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWishes = async () => {
    try {
      const data = await getWishes(true);
      setWishes(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWishes();
    const interval = setInterval(fetchWishes, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleShare = () => {
    const text = encodeURIComponent(`I just sent a wish to the Patnala family for their housewarming! 🏠🙏 Leave yours here: ${window.location.origin}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    try {
      await addWish(name, message, lang);
      
      const aiNote = await generatePersonalizedThankYouNote({ name, wishMessage: message });
      
      toast({
        duration: 8000,
        title: "Blessings Received! 🙏",
        description: (
          <div className="space-y-4 mt-2">
            <p className="italic text-primary font-medium">"{aiNote.thankYouNote}"</p>
            <p className="text-xs text-muted-foreground">{t.thankYouFromHost}</p>
            <div className="pt-2 flex flex-col gap-2">
               <Button onClick={handleShare} className="bg-green-600 hover:bg-green-700 text-white rounded-full text-xs h-10 w-full">
                 <Share2 className="w-4 h-4 mr-2" /> Share with Family & Friends
               </Button>
               <p className="text-[9px] text-center opacity-70">Your wish will appear publicly after approval.</p>
            </div>
          </div>
        ),
      });
      
      setName('');
      setMessage('');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Unable to send wish. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-[#FAF7F2] relative overflow-hidden">
      <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
        <Heart className="w-64 h-64 text-primary fill-primary" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className={`text-4xl text-center text-primary mb-12 ${lang === 'te' ? 'font-telugu' : 'font-headline'}`}>
          {t.wishTitle}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <form onSubmit={handleSubmit} className="space-y-4 bg-white/80 backdrop-blur-sm p-8 rounded-[2rem] shadow-xl border-2 border-secondary/10 sticky top-24">
            <div className="flex items-center gap-2 mb-4 text-primary">
              <Heart className="w-5 h-5 fill-primary" />
              <span className="font-headline font-bold uppercase tracking-widest text-sm">Send Your Love</span>
            </div>
            
            <Input
              placeholder={t.namePlaceholder}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-secondary/30 focus:ring-primary h-12 rounded-xl"
              required
            />
            <Textarea
              placeholder={t.wishPlaceholder}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[120px] border-secondary/30 focus:ring-primary rounded-xl"
              required
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-white h-12 rounded-xl text-lg font-bold shadow-lg transition-transform hover:scale-[1.01]"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 mr-2" />}
              {t.sendWish}
            </Button>
          </form>

          <div className="space-y-6">
            <h3 className="text-2xl font-headline text-primary flex items-center gap-2 border-b border-secondary/20 pb-2">
              <MessageSquare className="w-6 h-6 text-secondary" />
              Blessings from Guests
            </h3>
            
            <div className="h-[500px] overflow-hidden relative">
              <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#FAF7F2] to-transparent z-10" />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#FAF7F2] to-transparent z-10" />
              
              <div className="animate-marquee space-y-6 py-10">
                {isLoading ? (
                  <div className="flex justify-center py-20">
                    <Loader2 className="w-10 h-10 animate-spin text-secondary" />
                  </div>
                ) : wishes.length > 0 ? (
                  // Map wishes twice for seamless marquee loop
                  [...wishes, ...wishes].map((wish, index) => (
                    <div key={`${wish.id}-${index}`} className="bg-white p-6 rounded-2xl shadow-sm border border-secondary/10 hover:border-secondary/30 transition-all">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2">
                           <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary font-bold border border-primary/10">
                             {wish.name.charAt(0).toUpperCase()}
                           </div>
                           <span className="font-bold text-primary text-lg">{wish.name}</span>
                        </div>
                        <Heart className="w-4 h-4 text-secondary/30 fill-secondary/5" />
                      </div>
                      <p className={`text-foreground/80 leading-relaxed italic text-base border-l-2 border-secondary/20 pl-4 py-1 ${wish.language === 'te' ? 'font-telugu' : 'font-body'}`}>
                        "{wish.message}"
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-20 bg-white/50 rounded-2xl border-2 border-dashed border-secondary/20">
                    <p className="text-muted-foreground italic text-lg">Waiting for the first blessing...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default WishBook;