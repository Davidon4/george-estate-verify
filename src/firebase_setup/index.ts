import { auth, firestore } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc} from "firebase/firestore";
import { SignupProps, SigninProps } from "../types";

export const signUp = async ({ email, password, fullName, houseNumber, houseType, phoneNumber, block, color }: SignupProps) => {
  try {
    // Use createUserWithEmailAndPassword directly with 'auth'
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store additional user info in Firestore
    await setDoc(doc(firestore, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      fullName: fullName,
      houseNumber: houseNumber,
      houseType: houseType,
      phoneNumber: phoneNumber,
      block: block,
      color: color,
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
