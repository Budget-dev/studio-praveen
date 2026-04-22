"use client";

import React, { useState, useEffect } from 'react';
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
      
      // GenAI Magic: Generate a personalized thank you note
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
      <div className="max-w-4xl mx-auto">
        <h2 className={`text-4xl text-center text-primary mb-12 ${lang === 'te' ? 'font-telugu' : 'font-headline'}`}>
          {t.wishTitle}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-2xl shadow-xl border border-secondary/20">
            <div>
              <Input
                placeholder={t.namePlaceholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-secondary/30 focus:ring-primary"
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
            <h3 className="text-xl font-headline text-muted-foreground flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Latest Wishes
            </h3>
            
            <div className="max-h-[500px] overflow-y-auto pr-2 space-y-4 custom-scrollbar">
              {isLoading ? (
                <div className="flex justify-center py-10">
                  <Loader2 className="w-8 h-8 animate-spin text-secondary" />
                </div>
              ) : wishes.length > 0 ? (
                wishes.map((wish) => (
                  <div key={wish.id} className="bg-white p-4 rounded-xl shadow border-l-4 border-primary animate-in fade-in slide-in-from-right-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-primary">{wish.name}</span>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                        {formatDistanceToNow(wish.timestamp, { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/80 line-clamp-3 italic">"{wish.message}"</p>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-10 italic">No wishes yet. Be the first!</p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #C49A5A;
          border-radius: 10px;
        }
      `}</style>
    </section>
  );
};

export default WishBook;