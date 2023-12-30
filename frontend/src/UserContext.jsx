import { createContext, useContext, useState } from 'react';

const UserContext = createContext('');

// Create a provider component to wrap around your app
// eslint-disable-next-line react/prop-types
export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({});

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to use the context
export const useUserContext = () => {
  return useContext(UserContext);
};