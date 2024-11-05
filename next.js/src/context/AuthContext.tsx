'use client';
import { createContext, useState, ReactNode } from 'react';
import AuthModal from '@/components/auth/AuthModal';

interface AuthContextType {
  isAuthOpen: boolean;
  setIsAuthOpen: (isOpen: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthOpen: false,
  setIsAuthOpen: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthOpen, setIsAuthOpen }}>
      {children}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={(userData) => {
          // Handle auth success
          setIsAuthOpen(false);
          window.location.reload();
        }}
      />
    </AuthContext.Provider>
  );
}