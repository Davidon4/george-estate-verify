import { auth, firestore } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { SignupProps, SigninProps } from "../types";

const db = firestore;

export const signUp = async ({ email, password }: SignupProps) => {
  try {
    // Use createUserWithEmailAndPassword directly with 'auth'
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store additional user info in Firestore
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      email: user.email,
      // Add other user fields if necessary
    });
    return true;
  } catch (error: any) {
    return { error: error.message };
  }
};

export const signIn = async ({ email, password }: SigninProps) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return true;
  } catch (error: any) {
    return { error: error.message };
  }
};

// Uncomment and implement signOut if needed
// export const signOut = async () => {
//     try {
//       await signOut(auth);
//       return true;
//     } catch (error) {
//       return false;
//     }
//   };
