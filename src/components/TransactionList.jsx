import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("border")) {
      localStorage.setItem(
        "border",
        JSON.stringify([
          { description: "커피", amount: 4500 },
          { description: "점심", amount: 8500 },
        ])
      );
    }
    const saved = JSON.parse(localStorage.getItem("border"));
    setTransactions(saved);
  }, []);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">가계부</h1>
        <Link
          to="/table/new"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + 추가
        </Link>
      </div>

      {transactions.length === 0 ? (
        <p className="text-gray-500">등록된 거래 내역이 없습니다.</p>
      ) : (
        <ul className="space-y-4">
          {transactions.map((t, index) => (
            <li
              key={index}
              className="flex justify-between p-4 border rounded shadow-sm hover:shadow-md"
              onClick={() => navigate(`/table/item/${index}`)}
            >
              <span>{t.description}</span>
              <span className="font-semibold">{t.amount}원</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;
