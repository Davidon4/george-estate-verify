import { User } from "firebase/auth";
import { createContext } from "react";

interface UserContextType {
    user: User | null;
  } 
const AuthContext = createContext<UserContextType | undefined>(undefined);
export default AuthContext;