import React, { useMemo } from 'react';
import { useTransactions } from '../context/TransactionContext';

const Stats = ({ scope = 'day' }) => { // 기본값은 'day'
  const { transactions, filteredTransactions, selectedDate } = useTransactions();

  const transactionsToDisplay = useMemo(() => {
    if (scope === 'month') {
      const targetYear = selectedDate.getFullYear();
      const targetMonth = selectedDate.getMonth();
      return transactions.filter(t => {
        // UTC 날짜 기준으로 생성된 new Date가 현지 시간대와 달라 생기는 문제를 막기 위해, 날짜 문자열에 T00:00을 더해 같은 기준으로 비교
        const transactionDate = new Date(t.date + 'T00:00');
        return transactionDate.getFullYear() === targetYear && transactionDate.getMonth() === targetMonth;
      });
    } 
    // scope가 'day'이거나 지정되지 않은 경우
    return filteredTransactions;
  }, [scope, transactions, filteredTransactions, selectedDate]);

  const income = transactionsToDisplay
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactionsToDisplay
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const total = income + expense;

  const formatNumber = (num) => {
    return new Intl.NumberFormat('ko-KR').format(num);
  }

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">
        {scope === 'month' ? `${selectedDate.getFullYear()}년 ${selectedDate.getMonth() + 1}월 요약` : '일일 요약'}
      </h2>
      <div className="flex justify-around">
        <div className="text-center">
          <p className="text-lg text-blue-600">수입</p>
          <p className="text-2xl font-semibold text-blue-600">₩{formatNumber(income)}</p>
        </div>
        <div className="text-center">
          <p className="text-lg text-red-600">지출</p>
          <p className="text-2xl font-semibold text-red-600">₩{formatNumber(Math.abs(expense))}</p>
        </div>
        <div className="text-center">
          <p className="text-lg">합계</p>
          <p className={`text-2xl font-semibold ${total >= 0 ? 'text-gray-800' : 'text-red-600'}`}>₩{formatNumber(total)}</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
