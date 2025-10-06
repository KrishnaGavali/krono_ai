"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface CurrDateContextType {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  nextDate: (value: number | null) => void;
  prevDate: (value: number | null) => void;
  goToToday: () => void;
}

const CurrDateContext = createContext<CurrDateContextType | undefined>(
  undefined
);

export const CurrDateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const nextDate = (value: number | null) => {
    if (value === null || value === undefined) {
      value = 1;
    }
    setSelectedDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() + value);
      return newDate;
    });
  };

  const prevDate = (value: number | null) => {
    if (value === null || value === undefined) {
      value = 1;
    }

    setSelectedDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() - value);
      return newDate;
    });
  };

  const goToToday = () => {
    setSelectedDate(new Date());
  };

  return (
    <CurrDateContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        nextDate,
        prevDate,
        goToToday,
      }}
    >
      {children}
    </CurrDateContext.Provider>
  );
};

export const useCurrDate = (): CurrDateContextType => {
  const context = useContext(CurrDateContext);
  if (!context) {
    throw new Error("useCurrDate must be used within a CurrDateProvider");
  }
  return context;
};
