import { useMemo } from "react";
import { useTransactions } from "../context/TransactionContext";
import { formatKoreanDate, formatKoreanMonth } from "../utils/utility";

const Stats = ({ scope = "day" }) => {
  // 기본값은 'day'
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

  const income = transactionsToDisplay
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactionsToDisplay
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const total = income + expense;

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">
        {scope === "month"
          ? formatKoreanMonth(dateForTitle) + " 내역"
          : formatKoreanDate(dateForTitle) + " 내역"}
      </h2>
      <div className="flex justify-around">
        <div className="text-center">
          <p className="text-lg text-blue-700 font-bold">수입</p>
          <p className="text-2xl font-semibold text-blue-700">
            ₩{income.toLocaleString("ko-KR")}
          </p>
        </div>
        <div className="text-center">
          <p className="text-lg text-rose-700 font-bold">지출</p>
          <p className="text-2xl font-semibold text-rose-700">
            ₩{Math.abs(expense).toLocaleString("ko-KR")}
          </p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold">합계</p>
          <p
            className={`text-2xl font-semibold ${
              total > 0
                ? "text-blue-700"
                : total == 0
                ? "text-gray-800"
                : "text-rose-700"
            }`}
          >
            ₩{total.toLocaleString("ko-KR")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
