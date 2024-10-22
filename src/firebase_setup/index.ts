import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    // signOut,
  } from "firebase/auth";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { SignupProps, SigninProps } from "../types";

  const db = getFirestore();
  const auth = getAuth();

export const signUp = async ({email, password}: SignupProps) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        email: user.email,
      });
      return true
    } catch (error: any) {
      return {error: error.message}
    }
  };

export const signIn = async ({email, password}: SigninProps) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      return true
    } catch (error: any) {
      return {error: error.message}
    }
  };

// export const signOut = async() => {
//     try {
//       await signOut(auth)
//       return true
//     } catch (error) {
//       return false
//     }
//   };