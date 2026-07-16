import { createContext, useContext, useState, type ReactNode } from 'react';
import type { User } from '../types';

interface AppContextType {
  user: User | null;
}

const defaultUser: User = {
  id: '1',
  name: 'Suvanssh',
  role: 'Player & Reader',
  gamesPlayed: 12,
  gamesRead: 8,
  interestsSent: 3
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user] = useState<User | null>(defaultUser);

  return (
    <AppContext.Provider value={{ user }}>
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};