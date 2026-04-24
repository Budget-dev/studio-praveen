"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useFirestore, useAuth } from '@/firebase';
import { getWishes, updateWishStatus, deleteWish, Wish } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  Loader2, 
  CheckCircle, 
  XCircle, 
  Trash2, 
  LogOut, 
  Settings,
  MessageSquare
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const ADMIN_EMAIL = 'praveenkumarpatnala@gmail.com';

export default function AdminDashboard() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isUserLoading && (!user || user.email !== ADMIN_EMAIL)) {
      router.push('/admin');
    }
  }, [user, isUserLoading, router]);

  const fetchWishes = async () => {
    setIsLoading(true);
    try {
      const data = await getWishes(false);
      setWishes(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.email === ADMIN_EMAIL) {
      fetchWishes();
    }
  }, [user]);

  const handleApprove = async (wishId: string, currentStatus: boolean, order: number) => {
    try {
      await updateWishStatus(wishId, !currentStatus, order);
      toast({
        title: currentStatus ? "Wish Unapproved" : "Wish Approved",
        description: "Public view updated.",
      });
      fetchWishes();
    } catch (error) {
      toast({ variant: "destructive", title: "Action Failed" });
    }
  };

  const handleUpdateOrder = async (wish: Wish, newOrder: string) => {
    const orderVal = parseInt(newOrder);
    if (isNaN(orderVal)) return;
    try {
      await updateWishStatus(wish.id, wish.isApproved, orderVal);
      fetchWishes();
    } catch (error) {
      toast({ variant: "destructive", title: "Order Update Failed" });
    }
  };

  const handleDelete = async (wishId: string) => {
    if (!confirm("Delete this wish permanently?")) return;
    try {
      await deleteWish(wishId);
      toast({ title: "Wish Deleted" });
      fetchWishes();
    } catch (error) {
      toast({ variant: "destructive", title: "Delete Failed" });
    }
  };

  const handleLogout = async () => {
    if (!auth) return;
    await auth.signOut();
    router.push('/admin');
  };

  if (isUserLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-secondary/20 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white">
              <Settings className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-headline font-bold text-primary">Admin Dashboard</h1>
              <p className="text-muted-foreground">Managing Guest Blessings</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout} className="rounded-full border-primary/20 text-primary hover:bg-primary transition-all">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white text-center p-6 border-secondary/20 shadow-sm">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Total Wishes</p>
            <p className="text-4xl font-bold text-primary">{wishes.length}</p>
          </Card>
          <Card className="bg-white text-center p-6 border-secondary/20 shadow-sm">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Approved</p>
            <p className="text-4xl font-bold text-green-600">{wishes.filter(w => w.isApproved).length}</p>
          </Card>
          <Card className="bg-white text-center p-6 border-secondary/20 shadow-sm">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Pending</p>
            <p className="text-4xl font-bold text-orange-500">{wishes.filter(w => !w.isApproved).length}</p>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-primary flex items-center gap-2">
            <MessageSquare className="w-5 h-5" /> Recent Submissions
          </h2>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
          ) : wishes.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {wishes.map((wish) => (
                <Card key={wish.id} className={`overflow-hidden transition-all border-l-4 ${wish.isApproved ? 'border-l-green-500' : 'border-l-orange-500'}`}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-bold text-lg text-primary">{wish.name}</span>
                          <span className="text-[10px] bg-muted px-2 py-1 rounded-full uppercase text-muted-foreground">
                            {wish.language}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {wish.timestamp?.seconds ? formatDistanceToNow(new Date(wish.timestamp.seconds * 1000), { addSuffix: true }) : 'Just now'}
                          </span>
                        </div>
                        <p className="text-foreground/80 italic">"{wish.message}"</p>
                      </div>

                      <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-[10px] uppercase text-muted-foreground font-bold">Sort Order</span>
                          <Input 
                            type="number" 
                            defaultValue={wish.displayOrder}
                            onBlur={(e) => handleUpdateOrder(wish, e.target.value)}
                            className="w-16 h-8 text-center"
                          />
                        </div>

                        <Button 
                          onClick={() => handleApprove(wish.id, wish.isApproved, wish.displayOrder)}
                          variant={wish.isApproved ? "outline" : "default"}
                          className={`flex-1 md:flex-none h-10 px-6 rounded-full ${wish.isApproved ? 'border-orange-200 text-orange-600 hover:bg-orange-50' : 'bg-green-600 hover:bg-green-700 text-white'}`}
                        >
                          {wish.isApproved ? <XCircle className="w-4 h-4 mr-2" /> : <CheckCircle className="w-4 h-4 mr-2" />}
                          {wish.isApproved ? 'Unapprove' : 'Approve'}
                        </Button>

                        <Button 
                          onClick={() => handleDelete(wish.id)}
                          variant="ghost" 
                          size="icon" 
                          className="text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-secondary/20">
              <p className="text-muted-foreground italic text-lg">No wishes found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}