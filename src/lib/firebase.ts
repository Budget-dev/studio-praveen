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
  
  let q;
  if (onlyApproved) {
    q = query(
      wishesRef, 
      where('isApproved', '==', true), 
      orderBy('displayOrder', 'asc'),
      orderBy('timestamp', 'desc')
    );
  } else {
    q = query(wishesRef, orderBy('timestamp', 'desc'));
  }

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Wish[];
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