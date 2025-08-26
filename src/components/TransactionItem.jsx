import { useNavigate } from "react-router-dom";
import { useTransactions } from "../context/TransactionContext";

const TransactionItem = ({ transaction }) => {
  const { deleteTransaction } = useTransactions();
  const navigate = useNavigate();
  const { id, text, amount, type } = transaction;

  const sign = type === "income" ? "+" : "-";
  const color = type === "income" ? "text-blue-500" : "text-red-500";

  const formatNumber = (num) => {
    return new Intl.NumberFormat("ko-KR").format(num);
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <li
      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
      onClick={handleEdit}
    >
      <span>{text}</span>
      <div className="flex items-center space-x-3">
        <span className={`font-semibold ${color}`}>
          {sign} ₩{formatNumber(Math.abs(amount))}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteTransaction(id);
          }}
          className="bg-red-500 text-white text-xs w-8 h-6 flex items-center justify-center rounded opacity-75 hover:opacity-100"
        >
          삭제
        </button>
      </div>
    </li>
  );
};

export default TransactionItem;
