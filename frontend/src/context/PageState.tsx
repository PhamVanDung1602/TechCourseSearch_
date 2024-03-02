import { ReactNode, createContext, useEffect, useState } from "react";

// create context
interface PageStateProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export const PageState = createContext<PageStateProps>({
  currentPage: "",
  setCurrentPage: () => {},
});


// create provider
export const PageStateProvider = ({ children }: { children: ReactNode }) => {
  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    let storedCurrentPage = localStorage.getItem("currentPage");
    if (storedCurrentPage) {
      setCurrentPage(storedCurrentPage);
    }
  }, []);

  useEffect(() => {
      localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);


  const authContextValue: PageStateProps = {
    currentPage,
    setCurrentPage
  };

  return (
    <PageState.Provider value={authContextValue}>
      {children}
    </PageState.Provider>
  );
};