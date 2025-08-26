import { useMemo } from "react";
import TransactionItem from "./TransactionItem";
import { useTransactions } from "../context/TransactionContext";

const TransactionList = ({ scope = "day" }) => {
  const { transactions, filteredTransactions, selectedDate } =
    useTransactions();

  const transactionsToDisplay = useMemo(() => {
    if (scope === "month") {
      const targetYear = selectedDate.getFullYear();
      const targetMonth = selectedDate.getMonth();
      return transactions
        .filter((t) => {
          const transactionDate = new Date(t.date + "T00:00");
          return (
            transactionDate.getFullYear() === targetYear &&
            transactionDate.getMonth() === targetMonth
          );
        })
        .sort((a, b) => new Date(b.date) - new Date(a.date)); // 최신 날짜 순으로 정렬
    }
    return filteredTransactions;
  }, [scope, transactions, filteredTransactions, selectedDate]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-inner">
      <h3 className="text-lg font-bold mb-3">상세 내역</h3>
      {transactionsToDisplay.length === 0 ? (
        <p className="text-gray-500 text-center py-4">거래 내역이 없습니다.</p>
      ) : (
        <ul className="space-y-2">
          {transactionsToDisplay.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;
