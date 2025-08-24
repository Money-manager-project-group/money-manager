import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TransactionForm = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();

  const add = (e)=>{
    e.preventDefault();
    const saved = JSON.parse(localStorage.getItem('border')) || [];
    const newTransaction ={description: description, amount : Number(amount)};
    const updated = [...saved, newTransaction];
    localStorage.setItem('border',JSON.stringify(updated));
    navigate('/table');
  }


  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">가계부 작성</h2>
      <form onSubmit={add} className="space-y-4">
        <input value={description} onChange={e=>setDescription(e.target.value)} placeholder="거래 내역" required className="w-full p-2 border rounded"/>
        <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="금액 입력" required className="w-full p-2 border rounded"/>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">등록</button>
        <button type="button" onClick={()=>navigate('/table')}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">취소</button>
       </form>
    </div>
  );
};

export default TransactionForm;