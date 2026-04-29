'use client';

import { createContext, useContext, ReactNode } from 'react';

interface AuthAccount {
  username: string;
  name: string;
}

interface AuthContextType {
  account: AuthAccount;
  logout: () => void;
}

const ANONYMOUS_ACCOUNT: AuthAccount = {
  username: 'learner@solar-academy',
  name: 'Solar Learner',
};

const AuthContext = createContext<AuthContextType>({
  account: ANONYMOUS_ACCOUNT,
  logout: () => {},
});

interface AuthGateProps {
  children: ReactNode;
}

export function AuthGate({ children }: AuthGateProps) {
  return (
    <AuthContext.Provider value={{ account: ANONYMOUS_ACCOUNT, logout: () => {} }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
