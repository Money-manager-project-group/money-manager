import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTransactions } from "../context/TransactionContext";
import { getFormattedDate } from "../utils/utility";

const TransactionForm = () => {
  const {
    addTransaction,
    updateTransaction,
    getTransactionById,
    selectedDate,
  } = useTransactions();
  const { id, date: urlDate } = useParams();
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [date, setDate] = useState(urlDate || getFormattedDate(selectedDate));

  const isEditing = !!id;

  useEffect(() => {
    if (isEditing) {
      const transaction = getTransactionById(Number(id));
      if (transaction) {
        setText(transaction.text);
        setAmount(Math.abs(transaction.amount));
        setType(transaction.type);
        if (!urlDate) {
          setDate(transaction.date);
        }
      }
    }
  }, [id, isEditing, getTransactionById, urlDate]);

  const setCost = (event, value) => {
    event.preventDefault();
    setAmount((prev) => {
      if (prev) {
        return parseInt(prev) + parseInt(value);
      } else if (prev === 0) {
        return value;
      } else {
        return value;
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text || !amount) {
      alert("내용과 금액을 모두 입력해주세요.");
      return;
    }

    const amountValue =
      type === "expense" ? -Math.abs(parseFloat(amount)) : parseFloat(amount);
    const transactionData = { text, amount: amountValue, type, date };

    if (isEditing) {
      updateTransaction(Number(id), transactionData);
    } else {
      addTransaction(transactionData);
    }

    navigate(-1); // 이전 페이지로 돌아가기
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isEditing ? "내역 수정" : "새로운 내역 추가"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            날짜
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full p-2 border rounded-md mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            분류
          </label>
          <div className="flex space-x-2 mt-1">
            <button
              type="button"
              onClick={() => setType("income")}
              className={`w-full p-2 rounded-md ${
                type === "income"
                  ? "bg-blue-700 text-white"
                  : "bg-gray-200 hover:bg-blue-200"
              }`}
            >
              수입
            </button>
            <button
              type="button"
              onClick={() => setType("expense")}
              className={`w-full p-2 rounded-md ${
                type === "expense"
                  ? "bg-rose-700 text-white"
                  : "bg-gray-200 hover:bg-rose-200"
              }`}
            >
              지출
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            내용
          </label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="예: 점심 식사"
            required
            className="w-full p-2 border rounded-md mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            금액
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="금액을 숫자로 입력"
            required
            className="w-full p-2 border rounded-md mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            자주쓰는 금액 (누르면 추가)
          </label>
          <div className="flex space-x-2 pt-4">
            <button
              onClick={(e) => setCost(e, 1000)}
              type
              className="w-full bg-gray-100 text-black px-4 py-2 rounded-md hover:bg-gray-600 hover:text-white font-semibold"
            >
              1000원
            </button>
            <button
              onClick={(e) => setCost(e, 5000)}
              className="w-full bg-gray-100 text-black px-4 py-2 rounded-md hover:bg-gray-600 hover:text-white font-semibold"
            >
              5000원
            </button>
            <button
              onClick={(e) => setCost(e, 10000)}
              className="w-full bg-gray-100 text-black px-4 py-2 rounded-md hover:bg-gray-600 hover:text-white font-semibold"
            >
              10000원
            </button>
            <button
              onClick={(e) => setCost(e, 50000)}
              className="w-full bg-gray-100 text-black px-4 py-2 rounded-md hover:bg-gray-600 hover:text-white font-semibold"
            >
              50000원
            </button>
          </div>
        </div>
        <div className="flex space-x-2 pt-4">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 font-semibold"
          >
            {isEditing ? "수정 완료" : "추가하기"}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full bg-red-700 text-white px-4 py-2 rounded-md hover:bg-rose-800 font-semibold"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
