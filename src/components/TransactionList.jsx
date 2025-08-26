import { useMemo } from "react";
import TransactionItem from "./TransactionItem";
import { useTransactions } from "../context/TransactionContext";

const TransactionList = ({ scope = "day" }) => {
  const {
    filteredTransactionsByDay,
    filteredTransactionsByMonth,
    selectedDate,
    displayDate,
  } = useTransactions();

  const transactionsToDisplay = useMemo(() => {
    return scope === "month"
      ? filteredTransactionsByMonth
      : filteredTransactionsByDay;
  }, [scope, filteredTransactionsByDay, filteredTransactionsByMonth]);

  const dateForTitle = scope === "month" ? displayDate : selectedDate;

  return (
    <div className="p-4 bg-white rounded-lg shadow-inner">
      <h3 className="text-lg font-bold mb-3">
        {scope === "month"
          ? `${dateForTitle.getMonth() + 1}월 `
          : `${dateForTitle.getDate()}일 `}
        상세 내역 (수정하려면 항목 클릭)
      </h3>
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
