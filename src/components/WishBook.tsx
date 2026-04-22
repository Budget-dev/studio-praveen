
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Language, translations } from '@/lib/translations';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { getWishes, addWish, Wish } from '@/lib/firebase';
import { formatDistanceToNow } from 'date-fns';
import { Loader2, MessageSquare, Send } from 'lucide-react';
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
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchWishes();
  }, []);

  const fetchWishes = async () => {
    try {
      const data = await getWishes();
      setWishes(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    try {
      const newWish = await addWish(name, message, lang);
      setWishes(prev => [newWish, ...prev]);
      
      const thankYou = await generatePersonalizedThankYouNote({ name, wishMessage: message });
      
      toast({
        title: t.wishSent,
        description: `${t.thankYouFromHost}: "${thankYou.thankYouNote}"`,
      });
      
      setName('');
      setMessage('');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Unable to send wish. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-[#FAF7F2]">
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-4xl text-center text-primary mb-12 ${lang === 'te' ? 'font-telugu' : 'font-headline'}`}>
          {t.wishTitle}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-2xl shadow-xl border border-secondary/20 sticky top-24">
            <div>
              <Input
                placeholder={t.namePlaceholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-secondary/30 focus:ring-primary h-12"
                required
              />
            </div>
            <div>
              <Textarea
                placeholder={t.wishPlaceholder}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[120px] border-secondary/30 focus:ring-primary"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-white h-12 rounded-xl text-lg font-bold shadow-lg"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 mr-2" />}
              {t.sendWish}
            </Button>
          </form>

          <div className="space-y-6">
            <h3 className="text-2xl font-headline text-primary flex items-center gap-2 border-b border-secondary/20 pb-2">
              <MessageSquare className="w-6 h-6 text-secondary" />
              Latest Wishes
            </h3>
            
            <div 
              ref={scrollRef}
              className="h-[500px] overflow-y-auto pr-4 space-y-6 custom-scrollbar scroll-smooth"
            >
              {isLoading ? (
                <div className="flex justify-center py-20">
                  <Loader2 className="w-10 h-10 animate-spin text-secondary" />
                </div>
              ) : wishes.length > 0 ? (
                wishes.map((wish) => (
                  <div key={wish.id} className="bg-white p-6 rounded-2xl shadow-sm border border-secondary/10 hover:border-secondary/30 transition-all group">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                         <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-primary font-bold">
                           {wish.name.charAt(0).toUpperCase()}
                         </div>
                         <span className="font-bold text-primary text-lg">{wish.name}</span>
                      </div>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider bg-muted px-2 py-1 rounded">
                        {formatDistanceToNow(new Date(wish.timestamp), { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-foreground/80 leading-relaxed italic text-base relative pl-4 border-l-2 border-secondary/20">
                      "{wish.message}"
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 bg-white/50 rounded-2xl border-2 border-dashed border-secondary/20">
                  <p className="text-muted-foreground italic text-lg">No wishes yet. Be the first!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(196, 154, 90, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #C49A5A;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #7B3045;
        }
      `}</style>
    </section>
  );
};

export default WishBook;
