"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useFirestore, useAuth } from '@/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Lock, User as UserIcon, ShieldCheck } from 'lucide-react';

const ADMIN_EMAIL = 'praveenkumarpatnala@gmail.com';

export default function AdminPage() {
  const { user, isUserLoading } = useUser();
  const db = useFirestore();
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [isInitialized, setIsInitialized] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function checkInit() {
      if (!db) return;
      try {
        const configRef = doc(db, 'app_configuration', 'appConfig');
        const configSnap = await getDoc(configRef);
        setIsInitialized(configSnap.exists() && configSnap.data().adminInitialized);
      } catch (error) {
        console.error("Error checking initialization:", error);
        setIsInitialized(false);
      }
    }
    checkInit();
  }, [db]);

  useEffect(() => {
    if (user && user.email === ADMIN_EMAIL) {
      router.push('/admin/dashboard');
    }
  }, [user, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, ADMIN_EMAIL, password);
      router.push('/admin/dashboard');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message || "Invalid credentials",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth || !db) return;

    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, ADMIN_EMAIL, password);
      await setDoc(doc(db, 'app_configuration', 'appConfig'), {
        id: 'appConfig',
        adminInitialized: true
      });
      await setDoc(doc(db, 'admins', userCredential.user.uid), {
        email: ADMIN_EMAIL,
        role: 'super_admin'
      });
      toast({
        title: "Setup Complete",
        description: "Admin account initialized successfully.",
      });
      router.push('/admin/dashboard');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Setup Failed",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isUserLoading || isInitialized === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2] p-4">
      <Card className="w-full max-w-md shadow-2xl border-secondary/20 rounded-[2rem] overflow-hidden">
        <CardHeader className="text-center space-y-2 bg-white pb-8">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4 rotate-3 hover:rotate-0 transition-transform">
            {isInitialized ? <Lock className="w-8 h-8" /> : <ShieldCheck className="w-8 h-8" />}
          </div>
          <CardTitle className="text-3xl font-headline text-primary">
            {isInitialized ? 'Admin Login' : 'Admin Setup'}
          </CardTitle>
          <p className="text-sm text-muted-foreground italic px-6">
            {isInitialized 
              ? 'Secure access to the Patnala family dashboard' 
              : `One-time initialization for ${ADMIN_EMAIL}`}
          </p>
        </CardHeader>
        <form onSubmit={isInitialized ? handleLogin : handleSetup}>
          <CardContent className="space-y-6 bg-white p-8 pt-0">
            <div className="space-y-3">
              <Label htmlFor="email" className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Admin Email</Label>
              <div className="relative group">
                <Input 
                  id="email" 
                  type="email" 
                  value={ADMIN_EMAIL}
                  readOnly
                  className="pl-12 h-14 bg-muted/30 border-secondary/20 rounded-xl cursor-not-allowed opacity-80"
                />
                <UserIcon className="w-5 h-5 absolute left-4 top-4.5 text-primary/40" />
              </div>
              <p className="text-[10px] text-muted-foreground italic">Email is hardcoded for security.</p>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="password" className="text-xs uppercase tracking-widest font-bold text-muted-foreground">
                {isInitialized ? 'Password' : 'Set Admin Password'}
              </Label>
              <div className="relative">
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-12 h-14 border-secondary/20 rounded-xl focus:ring-primary focus:border-primary"
                />
                <Lock className="w-5 h-5 absolute left-4 top-4.5 text-primary/40" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-white p-8 pt-0 pb-12">
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90 text-white h-14 rounded-2xl text-xl font-bold shadow-xl transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : (isInitialized ? 'Login' : 'Complete Setup')}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
