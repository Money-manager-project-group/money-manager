import { Link } from "react-router-dom";
import Stats from "./Stats";
import TransactionList from "./TransactionList";
import { useTransactions } from "../context/TransactionContext";
import { formatKoreanMonth } from "../utils/utility";

const Table = () => {
  const { displayDate, changeMonth } = useTransactions();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <button
          onClick={() => changeMonth(-1)}
          className="p-2 rounded-full hover:bg-stone-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            {formatKoreanMonth(displayDate)}
          </h1>
          <p className="text-gray-500">월간 거래 내역</p>
        </div>
        <button
          onClick={() => changeMonth(1)}
          className="p-2 rounded-full hover:bg-stone-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      <div className="flex justify-end">
        <Link
          to="/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 font-semibold"
        >
          거래내역 추가
        </Link>
      </div>
      <Stats scope="month" />
      <TransactionList scope="month" />
    </div>
  );
};

export default Table;
