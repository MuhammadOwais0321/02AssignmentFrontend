import { useContext, createContext, useState } from "react";

const userContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); 

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};