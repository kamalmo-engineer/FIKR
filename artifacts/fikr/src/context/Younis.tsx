import React, { createContext, useContext, useState } from 'react';
import { YounisState, Transaction, initialYounisState } from '@/lib/mock-data';

interface YounisContextValue {
  younis: YounisState;
  setYounis: React.Dispatch<React.SetStateAction<YounisState>>;
  /** Deduct coins and log a spending transaction */
  spendCoins: (amount: number, item: string, location: string, isImpulsive?: boolean) => void;
  /** Deduct coins and log a savings deposit transaction */
  saveCoins: (amount: number, item: string, location: string) => void;
  /** Add coins and log an earn transaction */
  addCoins: (amount: number, reason?: string) => void;
  /** Legacy alias — plain deduction with no transaction log */
  deductCoins: (amount: number) => void;
  resetYounis: () => void;
}

const YounisContext = createContext<YounisContextValue | null>(null);

function makeTransaction(
  item: string,
  location: string,
  amount: number,
  type: Transaction['type'],
  isImpulsive: boolean,
): Transaction {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    item,
    location,
    amount,
    type,
    isImpulsive,
    timestamp: Date.now(),
  };
}

export function YounisProvider({ children }: { children: React.ReactNode }) {
  const [younis, setYounis] = useState<YounisState>(initialYounisState);

  const spendCoins = (amount: number, item: string, location: string, isImpulsive = false) =>
    setYounis(prev => ({
      ...prev,
      coins: Math.max(0, prev.coins - amount),
      totalSpent: prev.totalSpent + amount,
      transactions: [
        makeTransaction(item, location, amount, 'spend', isImpulsive),
        ...prev.transactions,
      ].slice(0, 12),
    }));

  const saveCoins = (amount: number, item: string, location: string) =>
    setYounis(prev => ({
      ...prev,
      coins: Math.max(0, prev.coins - amount),
      transactions: [
        makeTransaction(item, location, amount, 'save', false),
        ...prev.transactions,
      ].slice(0, 12),
    }));

  const addCoins = (amount: number, reason = 'Reward') =>
    setYounis(prev => ({
      ...prev,
      coins: prev.coins + amount,
      transactions: [
        makeTransaction(reason, 'FIKR Reward', amount, 'earn', false),
        ...prev.transactions,
      ].slice(0, 12),
    }));

  const deductCoins = (amount: number) =>
    setYounis(prev => ({ ...prev, coins: Math.max(0, prev.coins - amount) }));

  const resetYounis = () => setYounis(initialYounisState);

  return (
    <YounisContext.Provider value={{ younis, setYounis, spendCoins, saveCoins, addCoins, deductCoins, resetYounis }}>
      {children}
    </YounisContext.Provider>
  );
}

export function useYounis(): YounisContextValue {
  const ctx = useContext(YounisContext);
  if (!ctx) throw new Error('useYounis must be used within YounisProvider');
  return ctx;
}
