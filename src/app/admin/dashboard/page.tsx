"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useAuth } from '@/firebase';
import { getWishes, updateWishStatus, deleteWish, Wish, addGalleryImage, getGalleryImages, deleteGalleryImage, GalleryImage } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Loader2, 
  CheckCircle, 
  XCircle, 
  Trash2, 
  LogOut, 
  Settings,
  MessageSquare,
  ImageIcon,
  Upload,
  Plus
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';

const ADMIN_EMAIL = 'praveenkumarpatnala@gmail.com';

export default function AdminDashboard() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [wishes, setWishes] = useState<Wish[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [isLoadingWishes, setIsLoadingWishes] = useState(true);
  const [isLoadingGallery, setIsLoadingGallery] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [caption, setCaption] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (!isUserLoading && (!user || user.email !== ADMIN_EMAIL)) {
      router.push('/admin');
    }
  }, [user, isUserLoading, router]);

  const fetchWishes = async () => {
    setIsLoadingWishes(true);
    try {
      const data = await getWishes(false);
      setWishes(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingWishes(false);
    }
  };

  const fetchGallery = async () => {
    setIsLoadingGallery(true);
    try {
      const data = await getGalleryImages();
      setGallery(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingGallery(false);
    }
  };

  useEffect(() => {
    if (user && user.email === ADMIN_EMAIL) {
      fetchWishes();
      fetchGallery();
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

  const handleDeleteWish = async (wishId: string) => {
    if (!confirm("Delete this wish permanently?")) return;
    try {
      await deleteWish(wishId);
      toast({ title: "Wish Deleted" });
      fetchWishes();
    } catch (error) {
      toast({ variant: "destructive", title: "Delete Failed" });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadImage = async () => {
    if (!selectedFile) {
      toast({ variant: "destructive", title: "No file selected" });
      return;
    }

    setIsUploading(true);
    try {
      const base64String = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(selectedFile);
      });

      await addGalleryImage(base64String, caption);
      toast({ title: "Image Uploaded", description: "The image is now live in the gallery." });
      setCaption('');
      setSelectedFile(null);
      await fetchGallery();
    } catch (error) {
      console.error("Upload error:", error);
      toast({ variant: "destructive", title: "Upload Failed" });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteImage = async (id: string) => {
    if (!confirm("Delete this image?")) return;
    try {
      await deleteGalleryImage(id);
      toast({ title: "Image Deleted" });
      fetchGallery();
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
              <p className="text-muted-foreground">Managing Guest Blessings & Gallery</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout} className="rounded-full border-primary/20 text-primary hover:bg-primary transition-all">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </header>

        <Tabs defaultValue="wishes" className="space-y-6">
          <TabsList className="bg-white p-1 rounded-full border border-secondary/20 h-12 shadow-sm">
            <TabsTrigger value="wishes" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white h-full px-8">
              <MessageSquare className="w-4 h-4 mr-2" /> Wishes
            </TabsTrigger>
            <TabsTrigger value="gallery" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white h-full px-8">
              <ImageIcon className="w-4 h-4 mr-2" /> Gallery
            </TabsTrigger>
          </TabsList>

          <TabsContent value="wishes" className="space-y-6">
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

              {isLoadingWishes ? (
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
                              <span className="text-[10px] uppercase text-muted-foreground font-bold">Order</span>
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
                              onClick={() => handleDeleteWish(wish.id)}
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
          </TabsContent>

          <TabsContent value="gallery" className="space-y-8">
            <Card className="bg-white p-8 border-secondary/20 shadow-sm rounded-[2rem]">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-1 space-y-4 w-full">
                  <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                    <Plus className="w-5 h-5" /> Add New Photo
                  </h3>
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Select Image</label>
                      <Input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange}
                        className="h-12 py-2"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Caption (Shown under image)</label>
                      <Input 
                        placeholder="E.g. The New Residence..."
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        className="h-12"
                      />
                    </div>
                    <Button 
                      onClick={handleUploadImage} 
                      disabled={isUploading || !selectedFile}
                      className="w-full md:w-auto h-12 px-10 rounded-full bg-primary hover:bg-primary/90 shadow-lg transition-all"
                    >
                      {isUploading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Upload className="w-4 h-4 mr-2" />}
                      Upload Photo
                    </Button>
                  </div>
                </div>
                {selectedFile && (
                  <div className="w-full md:w-64 aspect-video relative rounded-2xl overflow-hidden border-2 border-primary/10 shadow-inner">
                    <Image 
                      src={URL.createObjectURL(selectedFile)} 
                      alt="Preview" 
                      fill 
                      className="object-cover" 
                    />
                  </div>
                )}
              </div>
            </Card>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-primary flex items-center gap-2">
                <ImageIcon className="w-5 h-5" /> Gallery Overview ({gallery.length})
              </h2>

              {isLoadingGallery ? (
                <div className="flex justify-center py-20">
                  <Loader2 className="w-10 h-10 animate-spin text-primary" />
                </div>
              ) : gallery.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gallery.map((img) => (
                    <Card key={img.id} className="overflow-hidden bg-white border-secondary/20 group hover:shadow-xl transition-all duration-300">
                      <div className="aspect-video relative overflow-hidden">
                        <Image 
                          src={img.imageUrl} 
                          alt={img.caption || "Gallery item"} 
                          fill 
                          className="object-cover transition-transform duration-500 group-hover:scale-110" 
                        />
                        <div className="absolute top-2 right-2">
                          <Button 
                            onClick={() => handleDeleteImage(img.id)}
                            variant="destructive" 
                            size="icon" 
                            className="w-8 h-8 rounded-full shadow-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <p className="text-primary font-medium italic line-clamp-1">
                          {img.caption || "No caption provided"}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-1">
                          {img.timestamp?.seconds ? `Added ${formatDistanceToNow(new Date(img.timestamp.seconds * 1000))} ago` : 'Just added'}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-secondary/20">
                  <p className="text-muted-foreground italic text-lg">No images in gallery yet.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}