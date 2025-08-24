import React, { useState } from 'react';
import { ArrowLeft, Save, Plus, Minus } from 'lucide-react';

// 팀원1 - 수입/지출 추가 컴포넌트git
const AddTransaction = ({ onNavigateBack, presetDate }) => {
  const [transactionType, setTransactionType] = useState('expense');
  const [selectedDate, setSelectedDate] = useState(
    presetDate || new Date().toISOString().split('T')[0]
  );
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [memo, setMemo] = useState('');
  const [showCustomCategory, setShowCustomCategory] = useState(false);

  // 카테고리 옵션들
  const expenseCategories = [
    '교통비', '핸드폰비', '월세', '관리비', '고정식비', '외식비', '커피',
    '마트/편의점', '의류', '의료비', '문화/여가', '교육비', '기타'
  ];

  const incomeCategories = [
    '급여', '부업', '용돈', '이자', '투자수익', '환급', '기타'
  ];

  const currentCategories = transactionType === 'expense' ? expenseCategories : incomeCategories;

  // ===== [달력 컴포넌트와 연동할 함수] =====
  const saveTransaction = () => {
    const finalCategory = showCustomCategory && customCategory ? customCategory : category;
    
    if (!amount || !finalCategory) {
      alert('금액과 카테고리를 모두 입력해주세요.');
      return;
    }

    const transactionData = {
      id: Date.now(), // 임시 ID
      type: transactionType,
      amount: parseInt(amount.replace(/,/g, '')),
      category: finalCategory,
      memo: memo,
      date: selectedDate,
      year: parseInt(selectedDate.split('-')[0]),
      month: parseInt(selectedDate.split('-')[1]),
      day: parseInt(selectedDate.split('-')[2]),
      createdAt: new Date().toISOString()
    };

    // 실제 localStorage에 저장
    const existingTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    existingTransactions.push(transactionData);
    localStorage.setItem('transactions', JSON.stringify(existingTransactions));
    
    console.log('저장된 데이터:', transactionData);
    console.log('전체 거래 내역:', existingTransactions);
    
    alert(`${transactionType === 'income' ? '수입' : '지출'}이 저장되었습니다!`);
    
    // 폼 초기화
    setAmount('');
    setCategory('');
    setCustomCategory('');
    setMemo('');
    setShowCustomCategory(false);
  };

  // 뒤로가기 (달력으로)
  const goBack = () => {
    if (onNavigateBack) {
      onNavigateBack();
    } else {
      console.log('이전 페이지로 돌아가기');
      alert('이전 페이지로 돌아가기 (연동 필요)');
    }
  };

  // 금액 포맷팅
  const formatAmount = (value) => {
    const number = value.replace(/\D/g, '');
    return new Intl.NumberFormat('ko-KR').format(number);
  };

  const handleAmountChange = (e) => {
    const formatted = formatAmount(e.target.value);
    setAmount(formatted);
  };

  // 날짜 포맷팅 (표시용)
  const formatDateDisplay = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const dayName = dayNames[date.getDay()];
    
    return `${year}년 ${month}월 ${day}일 (${dayName})`;
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* 헤더 */}
      <div className="bg-gray-50 px-4 py-4">
        <div className="flex items-center justify-between">
          <button onClick={goBack} className="p-2 hover:bg-gray-200 rounded-lg">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">가계부 작성</h1>
          <div className="w-10"></div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* 수입/지출 선택 */}
        <div className="bg-gray-50 p-1 rounded-lg flex">
          <button
            onClick={() => {
              setTransactionType('expense');
              setCategory('');
              setShowCustomCategory(false);
            }}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors flex items-center justify-center gap-2 ${
              transactionType === 'expense'
                ? 'bg-red-500 text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Minus size={16} />
            지출
          </button>
          <button
            onClick={() => {
              setTransactionType('income');
              setCategory('');
              setShowCustomCategory(false);
            }}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors flex items-center justify-center gap-2 ${
              transactionType === 'income'
                ? 'bg-blue-500 text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Plus size={16} />
            수입
          </button>
        </div>

        {/* 날짜 선택 */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">날짜</label>
          <div className="space-y-2">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="text-sm text-gray-500 bg-gray-50 p-2 rounded">
              {formatDateDisplay(selectedDate)}
            </div>
          </div>
        </div>

        {/* 금액 입력 */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">금액</label>
          <div className="relative">
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              placeholder="0"
              className="w-full p-3 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right text-lg font-medium"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">원</span>
          </div>
        </div>

        {/* 카테고리 선택 */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            카테고리 ({transactionType === 'income' ? '수입' : '지출'})
          </label>
          
          {!showCustomCategory ? (
            <div className="space-y-2">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">카테고리를 선택하세요</option>
                {currentCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setShowCustomCategory(true)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                + 새 카테고리 추가
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <input
                type="text"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="새 카테고리명을 입력하세요"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                autoFocus
              />
              <button
                onClick={() => {
                  setShowCustomCategory(false);
                  setCustomCategory('');
                }}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                기본 카테고리로 돌아가기
              </button>
            </div>
          )}
        </div>

        {/* 메모 입력 */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">메모 (선택사항)</label>
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="메모를 입력하세요..."
            rows="3"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          />
        </div>

        {/* 저장 버튼 */}
        <button
          onClick={saveTransaction}
          className={`w-full py-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
            transactionType === 'income'
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-red-500 hover:bg-red-600 text-white'
          }`}
        >
          <Save size={20} />
          {transactionType === 'income' ? '수입' : '지출'} 저장
        </button>

        {/* 미리보기 */}
        {(amount || category || (showCustomCategory && customCategory)) && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">입력 미리보기</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">유형:</span>
                <span className={`font-medium ${
                  transactionType === 'income' ? 'text-blue-600' : 'text-red-600'
                }`}>
                  {transactionType === 'income' ? '수입' : '지출'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">날짜:</span>
                <span>{formatDateDisplay(selectedDate)}</span>
              </div>
              {amount && (
                <div className="flex justify-between">
                  <span className="text-gray-600">금액:</span>
                  <span className={`font-medium ${
                    transactionType === 'income' ? 'text-blue-600' : 'text-red-600'
                  }`}>
                    {transactionType === 'income' ? '+' : '-'}{amount}원
                  </span>
                </div>
              )}
              {(category || (showCustomCategory && customCategory)) && (
                <div className="flex justify-between">
                  <span className="text-gray-600">카테고리:</span>
                  <span>{showCustomCategory && customCategory ? customCategory : category}</span>
                </div>
              )}
              {memo && (
                <div className="flex justify-between">
                  <span className="text-gray-600">메모:</span>
                  <span className="text-right max-w-40 truncate">{memo}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 하단 여백 */}
      <div className="h-6"></div>
    </div>
  );
};

export default AddTransaction;