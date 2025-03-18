// src/app/contexts/UserContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { 
  ValueItem, 
  ImportanceLevel, 
  CategorizedValues, 
  RankedValue 
} from '../lib/values';

// Define the shape of the user state
interface UserState {
  // Authentication
  email: string;
  accessCode: string;
  sessionId: string | null;
  authenticated: boolean;
  
  // User path
  selectedPath: 'direct' | 'sort' | null;
  
  // Value sorting state
  categorizedValues: CategorizedValues;
  veryImportantValues: ValueItem[];
  topTenValues: ValueItem[];
  topFiveValues: RankedValue[];
  
  // Process completion
  reportGenerated: boolean;
  reportSent: boolean;
}

// Define the shape of the context
interface UserContextType {
  user: UserState;
  setEmail: (email: string) => void;
  setAccessCode: (code: string) => void;
  setSessionId: (id: string | null) => void;
  setAuthenticated: (authenticated: boolean) => void;
  setSelectedPath: (path: 'direct' | 'sort' | null) => void;
  addCategorizedValue: (value: ValueItem, importance: ImportanceLevel) => void;
  setVeryImportantValues: (values: ValueItem[]) => void;
  setTopTenValues: (values: ValueItem[]) => void;
  setTopFiveValues: (values: RankedValue[]) => void;
  updateValueRank: (valueId: string, newRank: number) => void;
  setReportGenerated: (generated: boolean) => void;
  setReportSent: (sent: boolean) => void;
  resetState: () => void;
}

// Create the context with default values
const UserContext = createContext<UserContextType | undefined>(undefined);

// Initial state
const initialState: UserState = {
  email: '',
  accessCode: '',
  sessionId: null,
  authenticated: false,
  selectedPath: null,
  categorizedValues: {
    very: [],
    somewhat: [],
    not: []
  },
  veryImportantValues: [],
  topTenValues: [],
  topFiveValues: [],
  reportGenerated: false,
  reportSent: false
};

// Provider component
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserState>({ ...initialState });

  // Helper functions to update state
  const setEmail = (email: string) => {
    setUser(prev => ({ ...prev, email }));
  };

  const setAccessCode = (accessCode: string) => {
    setUser(prev => ({ ...prev, accessCode }));
  };

  const setSessionId = (sessionId: string | null) => {
    setUser(prev => ({ ...prev, sessionId }));
  };

  const setAuthenticated = (authenticated: boolean) => {
    setUser(prev => ({ ...prev, authenticated }));
  };

  const setSelectedPath = (path: 'direct' | 'sort' | null) => {
    setUser(prev => ({ ...prev, selectedPath: path }));
  };

  const addCategorizedValue = (value: ValueItem, importance: ImportanceLevel) => {
    setUser(prev => {
      const updatedCategorizedValues = { ...prev.categorizedValues };
      updatedCategorizedValues[importance] = [...updatedCategorizedValues[importance], value];
      return { ...prev, categorizedValues: updatedCategorizedValues };
    });
  };

  const setVeryImportantValues = (values: ValueItem[]) => {
    setUser(prev => ({ ...prev, veryImportantValues: values }));
  };

  const setTopTenValues = (values: ValueItem[]) => {
    setUser(prev => ({ ...prev, topTenValues: values }));
  };

  const setTopFiveValues = (values: RankedValue[]) => {
    setUser(prev => ({ ...prev, topFiveValues: values }));
  };

  const updateValueRank = (valueId: string, newRank: number) => {
    setUser(prev => {
      const updatedTopFiveValues = prev.topFiveValues.map(item => 
        item.value.id === valueId ? { ...item, rank: newRank } : item
      );
      return { ...prev, topFiveValues: updatedTopFiveValues };
    });
  };

  const setReportGenerated = (reportGenerated: boolean) => {
    setUser(prev => ({ ...prev, reportGenerated }));
  };

  const setReportSent = (reportSent: boolean) => {
    setUser(prev => ({ ...prev, reportSent }));
  };

  const resetState = () => {
    setUser({ ...initialState });
  };

  const contextValue: UserContextType = {
    user,
    setEmail,
    setAccessCode,
    setSessionId,
    setAuthenticated,
    setSelectedPath,
    addCategorizedValue,
    setVeryImportantValues,
    setTopTenValues,
    setTopFiveValues,
    updateValueRank,
    setReportGenerated,
    setReportSent,
    resetState
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to use the context
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}