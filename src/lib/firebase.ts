// Mocked Firebase functions for demonstration
// In a real app, replace with standard firebase/app and firebase/firestore setup

export type Wish = {
  id: string;
  name: string;
  message: string;
  timestamp: any;
  language: 'te' | 'en';
};

// We use a local state mock to simulate firestore since we don't have real credentials
// For a production app, the user would provide these.
const mockWishes: Wish[] = [
  {
    id: '1',
    name: 'Ramesh & Swathi',
    message: 'Congratulations on your new home! May it be filled with love and laughter.',
    timestamp: new Date(Date.now() - 3600000),
    language: 'en'
  },
  {
    id: '2',
    name: 'వెంకట్',
    message: 'కొత్త ఇల్లు మరియు సత్యనారాయణ స్వామి వ్రతం శుభాకాంక్షలు!',
    timestamp: new Date(Date.now() - 7200000),
    language: 'te'
  }
];

export async function getWishes(): Promise<Wish[]> {
  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...mockWishes].sort((a, b) => b.timestamp - a.timestamp);
}

export async function addWish(name: string, message: string, language: 'te' | 'en'): Promise<Wish> {
  const newWish: Wish = {
    id: Math.random().toString(36).substr(2, 9),
    name,
    message,
    timestamp: new Date(),
    language
  };
  mockWishes.unshift(newWish);
  return newWish;
}