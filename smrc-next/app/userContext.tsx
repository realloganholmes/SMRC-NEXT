"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookie from 'js-cookie'

interface User {
  userId: string;
  username: string;
  admin: boolean;
  coolerAdmin: boolean,
  raceAdmin: boolean,
  RFGAdmin: boolean,
  recapAdmin: boolean,
  dashboardAdmin: boolean
}

interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    console.log("HELLO");
    const userCookie = Cookie.get('user');
    console.log(userCookie);
    if (userCookie) {
      setUser(JSON.parse(userCookie));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }
    }>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
