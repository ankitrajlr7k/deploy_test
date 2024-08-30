import { createContext, useEffect, useState } from "react";

// Define the context
export const AuthContext = createContext({
  currentUser: null,
  updateUser: () => { },
});

// Define the provider component
export const AuthContextProvider = ({ children }) => {
  // Initialize state with a function to handle potential JSON parsing errors
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error reading user from localStorage", error);
      return null;
    }
  });

  // Function to update the user state and handle potential errors
  const updateUser = (data) => {
    try {
      setCurrentUser(data);
    } catch (error) {
      console.error("Error updating user state", error);
    }
  };

  // Use useEffect to handle saving the user to localStorage with error handling
  useEffect(() => {
    try {
      localStorage.setItem("user", JSON.stringify(currentUser));
    } catch (error) {
      console.error("Error saving user to localStorage", error);
    }
  }, [currentUser]);

  // Provide the context value
  return (
    <AuthContext.Provider value={{ currentUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
