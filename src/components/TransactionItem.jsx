import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";

const TransactionItem = () => {
  
  const { id } = useParams();
  const navigate = useNavigate();
  const [transaction,setTransaction] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('border')) || [];
    setTransaction(saved[id]);
    if(saved[id]){
      setDescription(saved[id].description);
      setAmount(saved[id].amount);
    }},[id]);

  const del = () => {
    const saved = JSON.parse(localStorage.getItem('border')) || [];
    const updated = saved.filter((item,index) => index !== Number(id));
    localStorage.setItem('border', JSON.stringify(updated));
    navigate('/table');
  };

  const saveEdit = () => {
    const saved = JSON.parse(localStorage.getItem('border')) || [];
    saved[id] = { description, amount: Number(amount) };
    localStorage.setItem('border', JSON.stringify(saved));
    setTransaction(saved[id]);
    setIsEditing(false);
    navigate('/table');
  };

  if (!transaction) { return <div className="p-6">거래 내역을 찾을 수 없습니다.</div>; }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">거래 상세</h2>
      {isEditing ? (
        <div className="space-y-4">
          <input value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded"/>
          <input value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full p-2 border rounded"/>
          <button onClick={saveEdit} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">저장</button>
          <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">취소</button>
        </div>
      ) : (
        <div>
          <p className="mb-2">내역: {transaction.description}</p>
          <p className="mb-4">금액: {transaction.amount}원</p>
          <div className="flex space-x-2">
            <button onClick={() => navigate('/table')} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">돌아가기</button>
            <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">수정하기</button>
            <button onClick={del} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">삭제하기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionItem;