import React, { createContext, useContext, useState } from 'react';
import { YounisState, initialYounisState } from '@/lib/mock-data';

interface YounisContextValue {
  younis: YounisState;
  setYounis: React.Dispatch<React.SetStateAction<YounisState>>;
  deductCoins: (amount: number) => void;
  addCoins: (amount: number) => void;
  resetYounis: () => void;
}

const YounisContext = createContext<YounisContextValue | null>(null);

export function YounisProvider({ children }: { children: React.ReactNode }) {
  const [younis, setYounis] = useState<YounisState>(initialYounisState);

  const deductCoins = (amount: number) =>
    setYounis(prev => ({ ...prev, coins: Math.max(0, prev.coins - amount) }));

  const addCoins = (amount: number) =>
    setYounis(prev => ({ ...prev, coins: prev.coins + amount }));

  const resetYounis = () => setYounis(initialYounisState);

  return (
    <YounisContext.Provider value={{ younis, setYounis, deductCoins, addCoins, resetYounis }}>
      {children}
    </YounisContext.Provider>
  );
}

export function useYounis(): YounisContextValue {
  const ctx = useContext(YounisContext);
  if (!ctx) throw new Error('useYounis must be used within YounisProvider');
  return ctx;
}
