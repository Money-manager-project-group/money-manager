import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';

// 팀원4 - 월간 통계 컴포넌트
const MonthlyStatistics = ({ onNavigateBack, onNavigateToAdd, onNavigateToDaily, onNavigateToCalendar }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const [statistics, setStatistics] = useState({
    income: 0,
    expense: 0,
    total: 0,
    categoryData: [],
    totalExpenseByCategory: []
  });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  // localStorage에서 데이터 불러오기 및 통계 계산
  const calculateStatistics = () => {
    const allTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    
    // 현재 월 거래내역 필터링
    const monthlyTransactions = allTransactions.filter(t => 
      t.year === year && t.month === month
    );

    // 총 수입/지출 계산
    const totalIncome = monthlyTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = monthlyTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    // 지출 카테고리별 집계
    const expenseByCategory = monthlyTransactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {});

    // 카테고리별 데이터 배열로 변환 (원형 차트용)
    const categoryData = Object.entries(expenseByCategory)
      .map(([category, amount]) => ({
        category,
        amount,
        percentage: totalExpense > 0 ? ((amount / totalExpense) * 100) : 0
      }))
      .sort((a, b) => b.amount - a.amount);

    setStatistics({
      income: totalIncome,
      expense: totalExpense,
      total: totalIncome - totalExpense,
      categoryData,
      totalExpenseByCategory: categoryData
    });
  };

  useEffect(() => {
    calculateStatistics();
  }, [currentDate, year, month]);

  // 달력 네비게이션
  const goToPrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // 금액 포맷팅
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('ko-KR').format(amount);
  };

  // 카테고리 색상 (고정된 색상 배치)
  const getCategoryColor = (index) => {
    const colors = [
      '#FF6B6B', // 빨강
      '#4ECDC4', // 청록
      '#45B7D1', // 파랑
      '#96CEB4', // 연두
      '#FFEAA7', // 노랑
      '#DDA0DD', // 보라
      '#98D8C8', // 민트
      '#F7DC6F', // 황금
      '#BB8FCE', // 라벤더
      '#85C1E9', // 하늘
    ];
    return colors[index % colors.length];
  };

  // SVG 원형 차트 생성
  const createPieChart = () => {
    if (statistics.totalExpenseByCategory.length === 0) {
      return (
        <div className="flex items-center justify-center w-64 h-64 bg-gray-100 rounded-full">
          <span className="text-gray-500">데이터가 없습니다</span>
        </div>
      );
    }

    const radius = 100;
    const centerX = 120;
    const centerY = 120;
    let currentAngle = 0;

    const paths = statistics.totalExpenseByCategory.map((item, index) => {
      const percentage = item.percentage;
      const angle = (percentage / 100) * 2 * Math.PI;
      
      const startX = centerX + radius * Math.cos(currentAngle);
      const startY = centerY + radius * Math.sin(currentAngle);
      
      currentAngle += angle;
      
      const endX = centerX + radius * Math.cos(currentAngle);
      const endY = centerY + radius * Math.sin(currentAngle);
      
      const largeArcFlag = angle > Math.PI ? 1 : 0;
      
      const pathData = [
        `M ${centerX} ${centerY}`,
        `L ${startX} ${startY}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
        'Z'
      ].join(' ');

      return (
        <path
          key={index}
          d={pathData}
          fill={getCategoryColor(index)}
          stroke="white"
          strokeWidth="2"
        />
      );
    });

    return (
      <svg width="240" height="240" className="mx-auto">
        {paths}
      </svg>
    );
  };

  const monthNames = [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월'
  ];

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* 헤더 */}
      <div className="bg-gray-50 px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={onNavigateBack}
            className="p-2 hover:bg-gray-200 rounded-lg"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">월간 통계</h1>
          <div className="w-10"></div>
        </div>

        {/* 네비게이션 탭 버튼들 */}
        <div className="bg-white p-1 rounded-lg flex mb-4">
          <button
            onClick={() => {
              if (onNavigateToAdd) {
                onNavigateToAdd();
              } else {
                alert('추가 페이지로 이동 (연동 필요)');
              }
            }}
            className="flex-1 py-2 px-4 rounded-md font-medium transition-colors bg-pink-500 text-white shadow-sm"
          >
            추가
          </button>
          <button
            onClick={() => {
              if (onNavigateToDaily) {
                // 오늘 날짜로 일별 상세페이지 이동
                const today = new Date();
                const dateString = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
                onNavigateToDaily(dateString);
              } else {
                alert('일별 페이지로 이동 (연동 필요)');
              }
            }}
            className="flex-1 py-2 px-4 rounded-md font-medium transition-colors bg-green-500 text-white shadow-sm"
          >
            일별
          </button>
          <button
            onClick={() => {
              if (onNavigateToCalendar) {
                onNavigateToCalendar();
              } else {
                alert('달력 페이지로 이동 (연동 필요)');
              }
            }}
            className="flex-1 py-2 px-4 rounded-md font-medium transition-colors bg-blue-500 text-white shadow-sm"
          >
            달력
          </button>
        </div>

        {/* 월 선택 네비게이션 */}
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={goToPrevMonth}
            className="p-2 hover:bg-gray-200 rounded-lg"
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
          
          <h2 className="text-lg font-semibold text-gray-800">
            {year}년 {monthNames[month - 1]}
          </h2>
          
          <button 
            onClick={goToNextMonth}
            className="p-2 hover:bg-gray-200 rounded-lg"
          >
            <ChevronRight size={20} className="text-gray-600" />
          </button>
        </div>

        {/* 월간 수입/지출 요약 */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-center mb-2">
            <span className="text-sm text-gray-600">지출</span>
            <div className="text-2xl font-bold text-red-600">
              {formatAmount(statistics.expense)}원
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-center">
              <div className="text-gray-600 mb-1">수입</div>
              <div className="font-medium text-blue-600">
                {formatAmount(statistics.income)}원
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-600 mb-1">잔액</div>
              <div className={`font-medium ${
                statistics.total >= 0 ? 'text-blue-600' : 'text-red-600'
              }`}>
                {statistics.total >= 0 ? '+' : ''}{formatAmount(statistics.total)}원
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 원형 차트 */}
      <div className="px-4 py-6">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          {createPieChart()}
        </div>
      </div>

      {/* 카테고리별 상세 목록 */}
      <div className="px-4 pb-20">
        <div className="space-y-3">
          {statistics.totalExpenseByCategory.map((item, index) => (
            <div key={item.category} className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: getCategoryColor(index) }}
                  ></div>
                  <span className="font-medium text-gray-800">{item.category}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-red-600">
                    {formatAmount(item.amount)}원
                  </div>
                  <div className="text-xs text-gray-500">
                    {item.percentage.toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {statistics.totalExpenseByCategory.length === 0 && (
          <div className="text-center py-12">
            <TrendingUp size={48} className="mx-auto text-gray-300 mb-4" />
            <div className="text-gray-500 mb-2">이번 달 지출 내역이 없습니다</div>
            <div className="text-sm text-gray-400">가계부를 작성해보세요!</div>
          </div>
        )}
      </div>

      {/* 하단 뒤로가기 버튼 */}
      <div className="fixed bottom-6 left-6">
        <button
          onClick={onNavigateBack}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg shadow-lg flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          뒤로가기
        </button>
      </div>
    </div>
  );
};

export default MonthlyStatistics;