export interface Transaction {
  id: string;
  item: string;
  location: string;
  amount: number;
  type: 'spend' | 'save' | 'earn';
  isImpulsive: boolean;
  timestamp: number;
}

export interface YounisState {
  name: string;
  level: number;
  title: string;
  coins: number;
  xp: number;
  maxXP: number;
  progress: number;
  goal: string;
  goalCost: number;
  decisions: string[];
  badges: string[];
  transactions: Transaction[];
  totalSpent: number;
}

export const initialYounisState: YounisState = {
  name: "Younis",
  level: 2,
  title: "Explorer",
  coins: 980,
  xp: 340,
  maxXP: 500,
  progress: 68,
  goal: "Red Scooter",
  goalCost: 1250,
  decisions: [
    "Saved instead of buying candy",
    "Chose cheaper option at store"
  ],
  badges: ["Quick Thinker", "Saver"],
  transactions: [],
  totalSpent: 0,
};

export const updatedYounisState: YounisState = {
  name: "Younis",
  level: 2,
  title: "Explorer",
  coins: 1030,
  xp: 460,
  maxXP: 500,
  progress: 92,
  goal: "Red Scooter",
  goalCost: 1250,
  decisions: [
    "Saved instead of buying candy",
    "Chose cheaper option at store",
    "Chose to save and wait for scooter"
  ],
  badges: ["Quick Thinker", "Saver", "Smart Decision"],
  transactions: [],
  totalSpent: 0,
};
