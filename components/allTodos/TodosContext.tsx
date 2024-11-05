'use client';

import React, { createContext, useContext, ReactNode } from 'react';

interface TodoContextType {
  totalCount: number;
  setTotalCount: (count: number) => void;
}

const TodosContext = createContext<TodoContextType | null>(null);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [totalCount, setTotalCount] = React.useState(0);

  return (
    <TodosContext.Provider
      value={{
        totalCount,
        setTotalCount,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};
