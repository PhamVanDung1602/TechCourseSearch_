import { ReactNode, createContext, useEffect, useState } from "react";

// create context
interface AuthContextType {
  isLoggedIn: boolean;
  updateLoginStatus: (status: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  updateLoginStatus: () => {},
});

// create provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(storedIsLoggedIn === "true");
  }, []);

  const updateLoginStatus = (status:boolean) => {
    setIsLoggedIn(status);
    localStorage.setItem("isLoggedIn", status.toString());
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
};