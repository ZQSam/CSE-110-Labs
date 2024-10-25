import { createContext, useState } from "react";
import { Expense } from "../types/types";

// Exercise: Create add budget to the context

interface AppContextType {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  budget: number;
  setBudget: React.Dispatch<React.SetStateAction<number>>;
}

const initialState: AppContextType = {
  expenses: [],
  setExpenses: () => {},
  budget: 1000,
  setBudget: () => {},
};

export const AppContext = createContext<AppContextType>(initialState);

interface AppProviderProps {
  children: React.ReactNode;
  initialExpenses?: Expense[]; // Optional prop to pass initial expenses
}

export const AppProvider = ({
  children,
  initialExpenses,
}: AppProviderProps) => {
  // const [expenses, setExpenses] = useState<Expense[]>(initialState.expenses);
  const [expenses, setExpenses] = useState<Expense[]>(
    initialExpenses || initialState.expenses // Use initialExpenses if passed, else use default state
  );
  const [budget, setBudget] = useState<number>(initialState.budget);

  return (
    <AppContext.Provider
      value={{
        expenses: expenses,
        setExpenses: setExpenses,
        budget,
        setBudget,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
