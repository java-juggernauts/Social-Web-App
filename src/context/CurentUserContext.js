
import { createContext, useState, useContext } from "react";

const CurrentUserContext = createContext();

export function useCurrentUser() {
  return useContext(CurrentUserContext);
}

export function CurrentUserProvider({ children }) {
  const storedUser = localStorage.getItem("currentUser");
  const [currentUser, setCurrentUser] = useState(storedUser || null);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
}
