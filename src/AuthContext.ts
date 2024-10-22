import { User } from "firebase/auth";
import { createContext } from "react";

interface UserContextType {
    user: User | null;
  } 
const AuthContext = createContext<UserContextType | null>(null);
export default AuthContext;