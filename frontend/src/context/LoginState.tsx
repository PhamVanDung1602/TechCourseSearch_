import { ReactNode, createContext, useEffect, useState } from "react";

// create context
interface LoginStateProps {
  isLoggedIn: boolean;
  updateLoginStatus: (status: boolean) => void;
}

export const LoginState = createContext<LoginStateProps>({
  isLoggedIn: false,
  updateLoginStatus: () => { },
});


// create provider
export const LoginStateProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(storedIsLoggedIn === "true");
  }, []);


  const updateLoginStatus = (status: boolean) => {
    setIsLoggedIn(status);
    localStorage.setItem("isLoggedIn", status.toString());

    if (!status) {
      localStorage.removeItem('currentPage');
    }
  };

  const authContextValue: LoginStateProps = {
    isLoggedIn,
    updateLoginStatus,
  };

  return (
    <LoginState.Provider value={authContextValue}>
      {children}
    </LoginState.Provider>
  );
};