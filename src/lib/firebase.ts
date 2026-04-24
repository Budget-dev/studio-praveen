import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  getDocs, 
  serverTimestamp, 
  doc, 
  updateDoc, 
  deleteDoc,
  limit,
  Firestore
} from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';

export type Wish = {
  id: string;
  name: string;
  message: string;
  timestamp: any;
  language: 'te' | 'en';
  isApproved: boolean;
  displayOrder: number;
};

export async function getWishes(onlyApproved = true): Promise<Wish[]> {
  const { firestore } = initializeFirebase();
  const wishesRef = collection(firestore, 'wishes');
  
  if (onlyApproved) {
    // We simplify the query to just the filter to avoid requiring a composite index.
    // Firestore handles single-field filters with default indexes.
    const q = query(
      wishesRef, 
      where('isApproved', '==', true)
    );

    const querySnapshot = await getDocs(q);
    const results = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Wish[];

    // Perform sorting in memory to avoid "Missing Index" errors for multi-field ordering.
    // 1. Sort by displayOrder (Ascending)
    // 2. Sort by timestamp (Descending) for items with same displayOrder
    return results.sort((a, b) => {
      const orderA = a.displayOrder ?? 999;
      const orderB = b.displayOrder ?? 999;
      
      if (orderA !== orderB) {
        return orderA - orderB;
      }
      
      const timeA = a.timestamp?.seconds ?? 0;
      const timeB = b.timestamp?.seconds ?? 0;
      return timeB - timeA;
    });
  } else {
    // Single orderBy on timestamp usually works with default indexes.
    const q = query(wishesRef, orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Wish[];
  }
}

export async function addWish(name: string, message: string, language: 'te' | 'en'): Promise<any> {
  const { firestore } = initializeFirebase();
  return addDoc(collection(firestore, 'wishes'), {
    name,
    message,
    language,
    timestamp: serverTimestamp(),
    isApproved: false,
    displayOrder: 999
  });
}

export async function updateWishStatus(wishId: string, isApproved: boolean, displayOrder: number) {
  const { firestore } = initializeFirebase();
  const wishRef = doc(firestore, 'wishes', wishId);
  return updateDoc(wishRef, { isApproved, displayOrder });
}

export async function deleteWish(wishId: string) {
  const { firestore } = initializeFirebase();
  return deleteDoc(doc(firestore, 'wishes', wishId));
}
