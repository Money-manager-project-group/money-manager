import React from "react";
import { Link } from "react-router-dom";
import Stats from "./Stats";
import TransactionList from "./TransactionList";
import { useTransactions } from "../context/TransactionContext";

const Table = () => {
  const { selectedDate } = useTransactions();
  const monthString = selectedDate.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="text-left">
          <h1 className="text-2xl font-bold">{monthString} 내역</h1>
          <p className="text-gray-500">이번 달의 거래 내역입니다.</p>
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
