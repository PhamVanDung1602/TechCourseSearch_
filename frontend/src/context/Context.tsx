import { ReactNode, createContext, useState } from "react";

//create context
interface AuthContextType {
    isLoggedIn: boolean;
    updateLoginStatus: (status: boolean) => void;
  }
  
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

//create provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const updateLoginStatus = (status:boolean) => {
        setIsLoggedIn(status);
    };

    const authContextValue: AuthContextType = {
        isLoggedIn,
        updateLoginStatus,
      };
    
      return (
        <AuthContext.Provider value={authContextValue}>
          {children}
        </AuthContext.Provider>
      );
}
