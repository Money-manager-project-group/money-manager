import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Trash2, Edit3 } from 'lucide-react';

// 팀원2 - 일별 상세페이지 컴포넌트
const DailyDetail = ({ selectedDate, onNavigateBack, onNavigateToAdd, onNavigateToEdit }) => {
  const [transactions, setTransactions] = useState([]);
  const [dailySummary, setDailySummary] = useState({
    income: 0,
    expense: 0,
    total: 0
  });

  // 선택된 날짜에서 년월일 추출
  const year = selectedDate ? new Date(selectedDate).getFullYear() : new Date().getFullYear();
  const month = selectedDate ? new Date(selectedDate).getMonth() + 1 : new Date().getMonth() + 1;
  const day = selectedDate ? new Date(selectedDate).getDate() : new Date().getDate();

  // localStorage에서 해당 날짜 거래내역 불러오기
  const loadDailyTransactions = () => {
    const allTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const dailyTransactions = allTransactions.filter(t => 
      t.year === year && t.month === month && t.day === day
    );
    
    // 최신순으로 정렬
    dailyTransactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    setTransactions(dailyTransactions);
    
    // 일별 합계 계산
    const income = dailyTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expense = dailyTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    setDailySummary({
      income,
      expense,
      total: income - expense
    });
  };

  useEffect(() => {
    loadDailyTransactions();
  }, [selectedDate, year, month, day]);

  // 거래내역 삭제
  const deleteTransaction = (transactionId) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      const allTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
      const updatedTransactions = allTransactions.filter(t => t.id !== transactionId);
      localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
      loadDailyTransactions(); // 목록 새로고침
    }
  };

  // 수입/지출 추가 페이지로 이동 (해당 날짜로 미리 설정)
  const navigateToAdd = () => {
    const dateString = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    if (onNavigateToAdd) {
      onNavigateToAdd(dateString);
    }
  };

  // 금액 포맷팅
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('ko-KR').format(amount);
  };

  // 날짜 포맷팅
  const formatDate = () => {
    const date = new Date(year, month - 1, day);
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const dayName = dayNames[date.getDay()];
    return `${year}년 ${month}월 ${day}일 (${dayName})`;
  };

  // 카테고리별 그룹핑
  const groupedTransactions = transactions.reduce((groups, transaction) => {
    const key = `${transaction.type}-${transaction.category}`;
    if (!groups[key]) {
      groups[key] = {
        type: transaction.type,
        category: transaction.category,
        items: [],
        total: 0
      };
    }
    groups[key].items.push(transaction);
    groups[key].total += transaction.amount;
    return groups;
  }, {});

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* 헤더 */}
      <div className="bg-gray-50 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={onNavigateBack}
            className="p-2 hover:bg-gray-200 rounded-lg"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">가계부 상세</h1>
          <button
            onClick={navigateToAdd}
            className="p-2 hover:bg-gray-200 rounded-lg"
          >
            <Plus size={20} className="text-gray-600" />
          </button>
        </div>

        {/* 선택된 날짜 */}
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">{formatDate()}</h2>
        </div>

        {/* 일별 합계 */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-sm text-blue-600 mb-1">총 수입</div>
              <div className="text-lg font-bold text-blue-600">
                +{formatAmount(dailySummary.income)}
              </div>
            </div>
            <div>
              <div className="text-sm text-red-600 mb-1">총 지출</div>
              <div className="text-lg font-bold text-red-600">
                -{formatAmount(dailySummary.expense)}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">합계</div>
              <div className={`text-lg font-bold ${
                dailySummary.total >= 0 ? 'text-blue-600' : 'text-red-600'
              }`}>
                {dailySummary.total >= 0 ? '+' : ''}{formatAmount(dailySummary.total)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 거래내역 목록 */}
      <div className="px-4 pb-20">
        {transactions.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-4">📝</div>
            <div className="text-gray-500 mb-2">이 날의 거래내역이 없습니다</div>
            <button
              onClick={navigateToAdd}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              + 거래내역 추가하기
            </button>
          </div>
        ) : (
          <div className="space-y-4 mt-4">
            {/* 카테고리별 그룹 표시 */}
            {Object.values(groupedTransactions).map((group, groupIndex) => (
              <div key={groupIndex} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      group.type === 'income' ? 'bg-blue-500' : 'bg-red-500'
                    }`}></div>
                    <span className="font-medium text-gray-800">{group.category}</span>
                  </div>
                  <div className={`font-bold ${
                    group.type === 'income' ? 'text-blue-600' : 'text-red-600'
                  }`}>
                    {group.type === 'income' ? '+' : '-'}{formatAmount(group.total)}
                  </div>
                </div>

                {/* 해당 카테고리의 거래내역들 */}
                <div className="space-y-2">
                  {group.items.map((transaction) => (
                    <div key={transaction.id} className="bg-white rounded-lg p-3 border border-gray-200">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className={`font-semibold ${
                              transaction.type === 'income' ? 'text-blue-600' : 'text-red-600'
                            }`}>
                              {transaction.type === 'income' ? '+' : '-'}{formatAmount(transaction.amount)}원
                            </span>
                            <div className="text-xs text-gray-400">
                              {new Date(transaction.createdAt).toLocaleTimeString('ko-KR', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </div>
                          </div>
                          
                          {transaction.memo && (
                            <div className="text-sm text-gray-600 mb-2">
                              {transaction.memo}
                            </div>
                          )}
                          
                          <div className="text-xs text-gray-500">
                            {transaction.category}
                          </div>
                        </div>
                        
                        <div className="flex gap-1 ml-2">
                          <button
                            onClick={() => {
                              if (onNavigateToEdit) {
                                onNavigateToEdit(transaction.id);
                              } else {
                                alert('수정 기능 연동이 필요합니다.');
                              }
                            }}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <Edit3 size={14} className="text-gray-400" />
                          </button>
                          <button
                            onClick={() => deleteTransaction(transaction.id)}
                            className="p-1 hover:bg-red-50 rounded"
                          >
                            <Trash2 size={14} className="text-red-400 hover:text-red-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={navigateToAdd}
          className="w-14 h-14 bg-blue-500 hover:bg-blue-600 rounded-full shadow-lg flex items-center justify-center"
        >
          <Plus size={24} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default DailyDetail;