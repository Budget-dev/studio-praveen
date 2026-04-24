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
import { Loader2, Lock, User as UserIcon } from 'lucide-react';

const ADMIN_EMAIL = 'praveenkumarpatnala@gmail.com';

export default function AdminPage() {
  const { user, isUserLoading } = useUser();
  const db = useFirestore();
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [isInitialized, setIsInitialized] = useState<boolean | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function checkInit() {
      if (!db) return;
      const configRef = doc(db, 'app_configuration', 'appConfig');
      const configSnap = await getDoc(configRef);
      setIsInitialized(configSnap.exists() && configSnap.data().adminInitialized);
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
      await signInWithEmailAndPassword(auth, email, password);
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
    if (email !== ADMIN_EMAIL) {
      toast({
        variant: "destructive",
        title: "Invalid Email",
        description: `Only ${ADMIN_EMAIL} can initialize the admin panel.`,
      });
      return;
    }

    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'app_configuration', 'appConfig'), {
        id: 'appConfig',
        adminInitialized: true
      });
      await setDoc(doc(db, 'admins', userCredential.user.uid), {
        email: ADMIN_EMAIL,
        role: 'super_admin'
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
      <Card className="w-full max-w-md shadow-2xl border-secondary/20">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-2">
            <Lock className="w-6 h-6" />
          </div>
          <CardTitle className="text-2xl font-headline text-primary">
            {isInitialized ? 'Admin Login' : 'Admin One-Time Setup'}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {isInitialized 
              ? 'Access the Patnala Gruhapravesam Dashboard' 
              : `Welcome! Please set a password for ${ADMIN_EMAIL}`}
          </p>
        </CardHeader>
        <form onSubmit={isInitialized ? handleLogin : handleSetup}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Input 
                  id="email" 
                  type="email" 
                  placeholder={ADMIN_EMAIL}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10"
                />
                <UserIcon className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90 text-white h-12 rounded-xl"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isInitialized ? 'Login' : 'Complete Setup')}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}