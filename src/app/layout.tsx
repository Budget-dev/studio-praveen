import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { FirebaseClientProvider } from '@/firebase/client-provider';

export const metadata: Metadata = {
  title: 'Patnala Gruhapravesam 2026 | గృహప్రవేశ ఆహ్వానము',
  description: 'Join the Patnala family for their Housewarming (Gruhapravesam) ceremony and Sri Satyanarayana Swamy Vratham.',
  icons: {
    icon: 'data:image/svg+xml,<svg viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏠</text></svg>',
  },
  openGraph: {
    title: 'Patnala Gruhapravesam 2026',
    description: 'Housewarming Invitation - Sapthagiri Layout, Vizianagaram',
    images: ['https://picsum.photos/seed/house1/1200/630'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Telugu:wght@400;700&family=Cormorant+Garamond:wght@400;600;700&family=Lato:wght@300;400;700&family=Great+Vibes&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen">
        <FirebaseClientProvider>
          {children}
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
