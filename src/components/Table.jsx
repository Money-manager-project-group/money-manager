import { Link } from "react-router-dom";
import Stats from "./Stats";
import TransactionList from "./TransactionList";
import { useTransactions } from "../context/TransactionContext";
import { formatKoreanMonth } from "../utils/utility";

const Table = () => {
  const { selectedDate } = useTransactions();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="text-left">
          <h1 className="text-2xl font-bold">
            {formatKoreanMonth(selectedDate)}
          </h1>
          <p className="text-gray-500">이번 달 거래 내역</p>
        </div>
        <Link
          to="/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 font-semibold"
        >
          내역 추가
        </Link>
      </div>
      <Stats scope="month" />
      <TransactionList scope="month" />
    </div>
  );
};

export default Table;
