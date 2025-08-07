import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc, DocumentData } from 'firebase/firestore';
import { auth, firestore } from '../firebaseConfig';
import { User } from '@/types/auth_types';
import { FirebaseError } from 'firebase/app';

interface AuthResponse {
  success: boolean;
  user?: FirebaseUser;
  userData?: User;
  error?: string;
}

interface LoginResponse extends AuthResponse {
  userData?: User;
}

export const registerUser = async (
    email: string, 
    password: string, 
    nombre: string, 
    apellido: string
): Promise<AuthResponse> => {
  try {
    // 1. Crear usuario en Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 2. Actualizar el displayName en Auth
    await updateProfile(user, { 
      displayName: `${nombre} ${apellido}`
    });

    // 3. Guardar información adicional en Firestore
    const userData: User = {
      uid: user.uid,
      email: email,
      nombre: nombre,
      apellido: apellido,
      displayName: `${nombre} ${apellido}`,
      createdAt: new Date(),
      isActive: true
    };
    await setDoc(doc(firestore, 'users', user.uid), userData);

    return { success: true, user };
  } catch (error: any) {
    console.error('Error registering user:', error);
    return { success: false, error: error.message };
  }
};

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Obtener información adicional del usuario desde Firestore
    /*const userDoc = await getDoc(doc(firestore, 'users', user.uid));
    const userData = userDoc.exists() ? userDoc.data() as User: undefined;*/

    return { success: true, user };
  } catch (error:any) {
    console.error('Error logging in:', error);
    return { success: false, error: error.message };
  }
};

export const logoutUser = async (): Promise<{ success: boolean; error?: string }> => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    console.error('Error signing out:', error);
    return { success: false, error: error.message };
  }
};

export const getUserData = async (uid: string): Promise<User | null> => {
  try {
    const userDoc = await getDoc(doc(firestore, 'users', uid));
    return userDoc.exists() ? userDoc.data() as User : null;
  } catch (error: any) {
    console.error('Error getting user data:', error);
    return null;
  }
};