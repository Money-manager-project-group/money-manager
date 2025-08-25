/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
} from "react";

const TransactionContext = createContext();

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error(
      "useTransactions must be used within a TransactionProvider"
    );
  }
  return context;
}

function getISODateOnly(date) {
  if (!date) return new Date().toISOString().split("T")[0];
  return new Date(date).toISOString().split("T")[0];
}

const initialTransactions = [
  { id: 1, text: "월급", amount: 3000000, type: "income", date: "2025-08-25" },
  {
    id: 2,
    text: "점심 식사",
    amount: -12000,
    type: "expense",
    date: "2025-08-25",
  },
  {
    id: 3,
    text: "온라인 쇼핑",
    amount: -89000,
    type: "expense",
    date: "2025-08-24",
  },
  {
    id: 4,
    text: "주말 커피",
    amount: -5500,
    type: "expense",
    date: "2025-08-23",
  },
];

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState(() => {
    try {
      const savedTransactions = localStorage.getItem("transactions");
      return savedTransactions
        ? JSON.parse(savedTransactions)
        : initialTransactions;
    } catch (error) {
      console.error("Failed to parse transactions from localStorage", error);
      return initialTransactions;
    }
  });

  const [selectedDate, setSelectedDate] = useState(new Date("2025-08-25"));

  useEffect(() => {
    try {
      localStorage.setItem("transactions", JSON.stringify(transactions));
    } catch (error) {
      console.error("Failed to save transactions to localStorage", error);
    }
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions((prev) => [
      ...prev,
      {
        ...transaction,
        id: Date.now(),
        date: transaction.date || getISODateOnly(new Date()), // 새 거래는 오늘 날짜 기준
      },
    ]);
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const updateTransaction = (id, updatedTransaction) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updatedTransaction } : t))
    );
  };

  const getTransactionById = (id) => {
    return transactions.find((t) => t.id === id);
  };

  const filteredTransactions = useMemo(() => {
    const selectedDateStr = getISODateOnly(selectedDate);
    return transactions.filter((t) => t.date === selectedDateStr);
  }, [transactions, selectedDate]);

  const value = {
    transactions,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    getTransactionById,
    selectedDate,
    setSelectedDate,
    filteredTransactions,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
}
