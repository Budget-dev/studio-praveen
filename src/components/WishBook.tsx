
"use client";

import React, { useState, useEffect } from 'react';
import { Language, translations } from '@/lib/translations';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { getWishes, addWish, Wish } from '@/lib/firebase';
import { Loader2, MessageSquare, Send, Heart, Share2, Sparkles } from 'lucide-react';
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
      // Errors handled centrally
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWishes();
    const interval = setInterval(fetchWishes, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleShare = (userName: string) => {
    const text = encodeURIComponent(`I just sent a wish to the Patnala family for their housewarming! 🏠🙏 Leave yours here: ${window.location.origin}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    const submittedName = name.trim();
    const submittedMessage = message.trim();

    try {
      await addWish(submittedName, submittedMessage, lang);
      
      let thankYouText = "";
      try {
        const aiNote = await generatePersonalizedThankYouNote({ 
          name: submittedName, 
          wishMessage: submittedMessage 
        });
        thankYouText = aiNote.thankYouNote;
      } catch (aiError) {
        thankYouText = lang === 'te' 
          ? `ప్రియమైన ${submittedName}, మీ ప్రేమపూర్వక శుభాకాంక్షలకు ధన్యవాదాలు. మా నూతన గృహ ప్రవేశానికి మీ రాక మాకు ఎంతో సంతోషాన్నిస్తుంది.`
          : `Dear ${submittedName}, thank you so much for your beautiful wishes. Your presence at our new home will truly complete our joy.`;
      }
      
      toast({
        duration: 10000,
        className: "bg-white border-2 border-primary/20 p-6 shadow-2xl rounded-3xl",
        title: (
          <div className="flex items-center gap-2 text-primary font-bold text-lg mb-2">
            <Sparkles className="w-5 h-5 text-secondary animate-pulse" />
            <span>Blessings Received! 🙏</span>
          </div>
        ) as any,
        description: (
          <div className="space-y-4">
            <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10">
              <p className="italic text-primary font-medium leading-relaxed">"{thankYouText}"</p>
            </div>
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{t.thankYouFromHost}</p>
            <div className="pt-2 flex flex-col gap-3">
               <Button 
                 onClick={() => handleShare(submittedName)} 
                 className="bg-green-600 hover:bg-green-700 text-white rounded-full text-sm h-12 w-full font-bold shadow-lg transition-all active:scale-95"
               >
                 <Share2 className="w-4 h-4 mr-2" /> Share with Family & Friends
               </Button>
               <p className="text-[10px] text-center text-muted-foreground italic">
                 "Your beautiful words mean the world to us."
               </p>
            </div>
          </div>
        ) as any,
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

  const displayWishes = [...wishes, ...wishes, ...wishes];

  return (
    <section className="snap-start min-h-screen py-20 px-4 md:px-8 bg-[#FAF7F2] relative overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
        <Heart className="w-64 h-64 text-primary fill-primary" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 w-full">
        <h2 className={`text-4xl text-center text-primary mb-12 ${lang === 'te' ? 'font-telugu' : 'font-headline'}`}>
          {t.wishTitle}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <form onSubmit={handleSubmit} className="space-y-4 bg-white/80 backdrop-blur-sm p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(123,48,69,0.05)] border-2 border-secondary/10">
            <div className="flex items-center gap-2 mb-4 text-primary">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 fill-primary" />
              </div>
              <span className="font-headline font-bold uppercase tracking-[0.2em] text-xs">Send Your Love</span>
            </div>
            
            <Input
              placeholder={t.namePlaceholder}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-secondary/20 focus:ring-primary h-14 rounded-2xl bg-white/50"
              required
            />
            <Textarea
              placeholder={t.wishPlaceholder}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[140px] border-secondary/20 focus:ring-primary rounded-2xl bg-white/50 text-lg"
              required
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-white h-14 rounded-2xl text-xl font-bold shadow-xl transition-all hover:scale-[1.02] active:scale-95"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Sending...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Send className="w-5 h-5 mr-2" />
                  <span>{t.sendWish}</span>
                </div>
              )}
            </Button>
          </form>

          <div className="space-y-6">
            <h3 className="text-2xl font-headline text-primary flex items-center gap-3 border-b border-secondary/20 pb-4">
              <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-secondary" />
              </div>
              Blessings Wall
            </h3>
            
            <div className="bg-white/50 rounded-3xl p-4 border border-secondary/10 shadow-inner overflow-hidden h-[400px] md:h-[500px] relative">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full gap-4">
                  <Loader2 className="w-12 h-12 animate-spin text-secondary" />
                  <p className="text-muted-foreground animate-pulse">Reading blessings...</p>
                </div>
              ) : wishes.length > 0 ? (
                <div className="animate-marquee hover:[animation-play-state:paused] space-y-6 py-4">
                  {displayWishes.map((wish, index) => (
                    <div 
                      key={`${wish.id}-${index}`} 
                      className="bg-white p-7 rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-secondary/10 hover:border-primary/20 transition-all hover:translate-x-1 group"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-3">
                           <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary text-xl font-bold border border-primary/10 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                             {wish.name.charAt(0).toUpperCase()}
                           </div>
                           <div className="flex flex-col">
                             <span className="font-bold text-primary text-xl leading-none">{wish.name}</span>
                             <span className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Guest Blessing</span>
                           </div>
                        </div>
                        <div className="p-2 rounded-full bg-secondary/5">
                          <Heart className="w-5 h-5 text-secondary/40 fill-secondary/10 group-hover:fill-secondary group-hover:text-secondary transition-all" />
                        </div>
                      </div>
                      <p className={`text-foreground/80 leading-relaxed italic text-lg border-l-4 border-secondary/20 pl-6 py-2 ${wish.language === 'te' ? 'font-telugu' : 'font-body'}`}>
                        "{wish.message}"
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-24 h-full flex flex-col items-center justify-center bg-white/50 rounded-[3rem] border-4 border-dashed border-secondary/10">
                  <Heart className="w-16 h-16 text-secondary/20 mb-4" />
                  <p className="text-muted-foreground italic text-xl">Waiting for the first blessing...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WishBook;
