// Firebase Utilities for Client-side
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  addDoc,
  orderBy,
  limit,
  serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { auth, db } from './firebase-config.js';

// Authentication functions
export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: error.message };
  }
}

export async function registerUser(email, password, userData) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, {
      displayName: userData.name
    });
    
    // Save additional user data to Firestore
    await setDoc(doc(db, 'members', userCredential.user.uid), {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      address: userData.address,
      memberType: 'regular',
      joinDate: serverTimestamp(),
      preferences: {
        notifications: userData.interests?.includes('notifications') || false,
        workshops: userData.interests?.includes('workshops') || false,
        promotions: userData.interests?.includes('recipes') || false
      }
    });
    
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: error.message };
  }
}

export async function logoutUser() {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return { success: false, error: error.message };
  }
}

// Member management functions
export async function getMemberData(uid) {
  try {
    const docRef = doc(db, 'members', uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { success: true, data: docSnap.data() };
    } else {
      return { success: false, error: 'Member not found' };
    }
  } catch (error) {
    console.error('Get member data error:', error);
    return { success: false, error: error.message };
  }
}

export async function updateMemberData(uid, data) {
  try {
    const docRef = doc(db, 'members', uid);
    await updateDoc(docRef, data);
    return { success: true };
  } catch (error) {
    console.error('Update member data error:', error);
    return { success: false, error: error.message };
  }
}

// Admin functions
export async function getAllMembers() {
  try {
    const membersRef = collection(db, 'members');
    const q = query(membersRef, orderBy('joinDate', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const members = [];
    querySnapshot.forEach((doc) => {
      members.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, members };
  } catch (error) {
    console.error('Get all members error:', error);
    return { success: false, error: error.message };
  }
}

export async function deleteMember(uid) {
  try {
    await deleteDoc(doc(db, 'members', uid));
    return { success: true };
  } catch (error) {
    console.error('Delete member error:', error);
    return { success: false, error: error.message };
  }
}

// News and content functions
export async function addNews(newsData) {
  try {
    const docRef = await addDoc(collection(db, 'news'), {
      ...newsData,
      createdAt: serverTimestamp(),
      published: true
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Add news error:', error);
    return { success: false, error: error.message };
  }
}

export async function getNews() {
  try {
    const newsRef = collection(db, 'news');
    const q = query(newsRef, where('published', '==', true), orderBy('createdAt', 'desc'), limit(10));
    const querySnapshot = await getDocs(q);
    
    const news = [];
    querySnapshot.forEach((doc) => {
      news.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, news };
  } catch (error) {
    console.error('Get news error:', error);
    return { success: false, error: error.message };
  }
}

// Workshop functions
export async function addWorkshop(workshopData) {
  try {
    const docRef = await addDoc(collection(db, 'workshops'), {
      ...workshopData,
      createdAt: serverTimestamp(),
      active: true
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Add workshop error:', error);
    return { success: false, error: error.message };
  }
}

export async function getWorkshops() {
  try {
    const workshopsRef = collection(db, 'workshops');
    const q = query(workshopsRef, where('active', '==', true), orderBy('date', 'asc'));
    const querySnapshot = await getDocs(q);
    
    const workshops = [];
    querySnapshot.forEach((doc) => {
      workshops.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, workshops };
  } catch (error) {
    console.error('Get workshops error:', error);
    return { success: false, error: error.message };
  }
}

// Custom order functions
export async function addCustomOrder(orderData) {
  try {
    const docRef = await addDoc(collection(db, 'custom_orders'), {
      ...orderData,
      createdAt: serverTimestamp(),
      status: 'pending'
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Add custom order error:', error);
    return { success: false, error: error.message };
  }
}

// Feedback functions
export async function addFeedback(feedbackData) {
  try {
    const docRef = await addDoc(collection(db, 'feedback'), {
      ...feedbackData,
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Add feedback error:', error);
    return { success: false, error: error.message };
  }
}

// Auth state listener
export function onAuthStateChange(callback) {
  return onAuthStateChanged(auth, callback);
}
