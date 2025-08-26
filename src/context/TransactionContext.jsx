/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useMemo, useEffect } from "react";
import { getFormattedDate } from "../utils/utility";

const TransactionContext = createContext();

// 커스텀 훅
export function useTransactions() {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("context 에러");
  }
  return context;
}

// 테스트용 데이터 - 지우기
const testTransaction = [
  {
    id: 1,
    text: "테스트 소득1",
    amount: 3000000,
    type: "income",
    date: "2025-08-23",
  },
  {
    id: 2,
    text: "테스트 소득2",
    amount: 4000000,
    type: "income",
    date: "2025-08-24",
  },
  {
    id: 3,
    text: "테스트 지출1",
    amount: -1000000,
    type: "expense",
    date: "2025-08-25",
  },
  {
    id: 4,
    text: "테스트 지출2",
    amount: -5500,
    type: "expense",
    date: "2025-08-26",
  },
];

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState(() => {
    try {
      const savedTransactions = localStorage.getItem("transactions");
      return savedTransactions
        ? JSON.parse(savedTransactions)
        : testTransaction;
    } catch (error) {
      console.error("local storage 읽기 실패", error);
      return testTransaction;
    }
  });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [displayDate, setDisplayDate] = useState(new Date());

  const changeMonth = (amount) => {
    setDisplayDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + amount);
      return newDate;
    });
  };

  // transactions 변화 값 localstorage 에 저장
  useEffect(() => {
    try {
      localStorage.setItem("transactions", JSON.stringify(transactions));
    } catch (error) {
      console.error("local storage 저장 실패", error);
    }
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions((prev) => [
      ...prev,
      {
        ...transaction,
        id: Date.now(),
        date: transaction.date,
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

  const filteredTransactionsByDay = useMemo(() => {
    const selectedDateStr = getFormattedDate(selectedDate);
    return transactions.filter((t) => t.date === selectedDateStr);
  }, [transactions, selectedDate]);

  const filteredTransactionsByMonth = useMemo(() => {
    const targetYear = displayDate.getFullYear();
    const targetMonth = displayDate.getMonth();
    return transactions
      .filter((t) => {
        const transactionDate = new Date(t.date + "T00:00");
        return (
          transactionDate.getFullYear() === targetYear &&
          transactionDate.getMonth() === targetMonth
        );
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [transactions, displayDate]);

  const value = {
    transactions,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    getTransactionById,
    selectedDate,
    setSelectedDate,
    displayDate,
    setDisplayDate,
    changeMonth,
    filteredTransactionsByDay,
    filteredTransactionsByMonth,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
}
