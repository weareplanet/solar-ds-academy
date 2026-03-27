'use client';

import { ReactNode, useEffect, useState } from 'react';
import {
  PublicClientApplication,
  AccountInfo,
  InteractionRequiredAuthError,
} from '@azure/msal-browser';
import { msalConfig, loginRequest } from '@/lib/msalConfig';

const msalInstance = new PublicClientApplication(msalConfig);

interface AuthGateProps {
  children: ReactNode;
}

export function AuthGate({ children }: AuthGateProps) {
  const [account, setAccount] = useState<AccountInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        await msalInstance.initialize();
        const response = await msalInstance.handleRedirectPromise();
        if (response?.account) {
          msalInstance.setActiveAccount(response.account);
          setAccount(response.account);
        } else {
          const accounts = msalInstance.getAllAccounts();
          if (accounts.length > 0) {
            msalInstance.setActiveAccount(accounts[0]);
            setAccount(accounts[0]);
          }
        }
      } catch (err) {
        console.error('MSAL init error:', err);
        setError('Authentication failed. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const handleLogin = async () => {
    try {
      await msalInstance.loginRedirect(loginRequest);
    } catch (err) {
      if (err instanceof InteractionRequiredAuthError) {
        await msalInstance.loginRedirect(loginRequest);
      } else {
        console.error('Login error:', err);
        setError('Login failed. Please try again.');
      }
    }
  };

  const handleLogout = async () => {
    await msalInstance.logoutRedirect();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-planet-600 mx-auto" />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!account) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-planet-50 to-white">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-planet-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">☀️</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Solar Product Academy</h1>
            <p className="text-gray-500 mt-2">
              Learn to build prototypes with @Solar — no coding required.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            className="w-full bg-planet-600 hover:bg-planet-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 21 21" fill="none">
              <rect x="1" y="1" width="9" height="9" fill="#f25022" />
              <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
              <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
              <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
            </svg>
            Sign in with Microsoft
          </button>

          <p className="text-xs text-gray-400 mt-4">
            Restricted to @weareplanet accounts
          </p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ account, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Auth context for child components
import { createContext, useContext } from 'react';

interface AuthContextType {
  account: AccountInfo;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthGate');
  return ctx;
}
