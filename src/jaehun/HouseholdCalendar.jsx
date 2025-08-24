import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, TrendingUp } from 'lucide-react';



const HouseholdCalendar = ({ onNavigateToDetail, onNavigateToAdd, onNavigateToStats }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

 
  
  // 실제 연동 시 사용할 데이터 저장소 (현재= localStorage)
  const getStoredTransactions = () => {
    
    return JSON.parse(localStorage.getItem('transactions')) || [];
    //  return await fetchTransactionsFromDB();
    
  };

  // 월별 총 수입/지출 계산
  const getMonthlyTotal = (year, month) => {
    const transactions = getStoredTransactions();
    const monthlyTransactions = transactions.filter(t => 
      t.year === year && t.month === month
    );
    
    const income = monthlyTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expense = monthlyTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    // 실제 데이터 사용 (localStorage가 비어있으면 기본값 표시)
    return {
      income: income || 0,
      expense: expense || 0, 
      total: income - expense
    };
  };

  // 일별 수입/지출 계산  
  const getDailyTotal = (year, month, day) => {
    const transactions = getStoredTransactions();
    const dailyTransactions = transactions.filter(t => 
      t.year === year && t.month === month && t.day === day
    );
    
    const income = dailyTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expense = dailyTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    // 실제 데이터 사용 (없으면 0 반환)
    return {
      income: income || 0,
      expense: expense || 0,
      total: income - expense
    };
  };

  // ===== [일별 상세페이지 이동] =====
  const navigateToDetailPage = (year, month, day) => {
    const dateString = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    if (onNavigateToDetail) {
      onNavigateToDetail(dateString);
    } else {
      console.log(`일별 상세페이지로 이동: ${year}년 ${month}월 ${day}일`);
      alert(`${year}년 ${month}월 ${day}일 상세페이지로 이동 (연동 필요)`);
    }
  };

  // ===== [추가페이지 이동] =====  
  const navigateToAddPage = () => {
    if (onNavigateToAdd) {
      onNavigateToAdd();
    } else {
      console.log('수입/지출 작성페이지로 이동');
      alert('수입/지출 작성페이지로 이동 (연동 필요)');
    }
  };

  // ===== [통계 페이지 이동] =====
  const navigateToStatsPage = () => {
    if (onNavigateToStats) {
      onNavigateToStats();
    } else {
      console.log('월간 통계페이지로 이동');
      alert('월간 통계페이지로 이동 (연동 필요)');
    }
  };

  // 달력 네비게이션
  const goToPrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // 달력 데이터 계산
  const month = currentDate.getMonth();
  const monthlyData = getMonthlyTotal(currentDate.getFullYear(), month + 1);

  // 해당 월의 첫날과 마지막날
  const firstDay = new Date(currentDate.getFullYear(), month, 1);
  const lastDay = new Date(currentDate.getFullYear(), month + 1, 0);
  const firstDayOfWeek = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  // 달력 날짜 배열 생성
  const calendarDays = [];
  
  // 이전 달 날짜들
  for (let i = firstDayOfWeek; i > 0; i--) {
    const prevDate = new Date(currentDate.getFullYear(), month, 1 - i);
    calendarDays.push({
      date: prevDate.getDate(),
      isCurrentMonth: false,
      fullDate: prevDate
    });
  }

  // 현재 달 날짜들
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push({
      date: day,
      isCurrentMonth: true,
      fullDate: new Date(currentDate.getFullYear(), month, day),
      data: getDailyTotal(currentDate.getFullYear(), month + 1, day)
    });
  }

  // 다음 달 날짜들 (6주 완성)
  const remainingDays = 42 - calendarDays.length;
  for (let day = 1; day <= remainingDays; day++) {
    const nextDate = new Date(currentDate.getFullYear(), month + 1, day);
    calendarDays.push({
      date: day,
      isCurrentMonth: false,
      fullDate: nextDate
    });
  }

  // 금액 포맷팅
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('ko-KR').format(Math.abs(amount));
  };

  const monthNames = [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월'
  ];

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* 헤더 */}
      <div className="bg-gray-50 px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={goToPrevMonth}
            className="p-2 hover:bg-gray-200 rounded-lg"
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
          
          <h2 className="text-lg font-semibold text-gray-800">
            {currentDate.getFullYear()}년 {monthNames[month]}
          </h2>
          
          <button 
            onClick={goToNextMonth}
            className="p-2 hover:bg-gray-200 rounded-lg"
          >
            <ChevronRight size={20} className="text-gray-600" />
          </button>
        </div>

        {/* 월별 합계 */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-xs text-blue-600 mb-1">총 수입</div>
              <div className="text-sm font-medium text-blue-600">
                +{formatAmount(monthlyData.income)}
              </div>
            </div>
            <div>
              <div className="text-xs text-red-600 mb-1">총 지출</div>
              <div className="text-sm font-medium text-red-600">
                -{formatAmount(monthlyData.expense)}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-600 mb-1">합계</div>
              <div className={`text-sm font-medium ${
                monthlyData.total >= 0 ? 'text-blue-600' : 'text-red-600'
              }`}>
                {monthlyData.total >= 0 ? '+' : ''}{formatAmount(monthlyData.total)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 달력 */}
      <div className="px-4">
        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 mb-2">
          {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
            <div key={day} className="text-center py-2 text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        {/* 날짜 그리드 */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((dayInfo, index) => (
            <div
              key={index}
              onClick={() => {
                if (dayInfo.isCurrentMonth) {
                  navigateToDetailPage(currentDate.getFullYear(), month + 1, dayInfo.date);
                }
              }}
              className={`
                aspect-square border rounded-lg p-1 cursor-pointer relative
                ${dayInfo.isCurrentMonth 
                  ? 'bg-white border-gray-200 hover:bg-gray-50' 
                  : 'bg-gray-50 border-gray-100 text-gray-400'
                }
                ${dayInfo.isCurrentMonth && dayInfo.data?.total !== 0 
                  ? 'ring-1 ring-blue-100' 
                  : ''
                }
              `}
            >
              {/* 날짜 */}
              <div className={`text-sm font-medium ${
                dayInfo.isCurrentMonth ? 'text-gray-800' : 'text-gray-400'
              }`}>
                {dayInfo.date}
              </div>

              {/* 일별 금액 정보 - 현재 달만 표시 */}
              {dayInfo.isCurrentMonth && dayInfo.data && dayInfo.data.total !== 0 && (
                <div className="absolute bottom-0 left-0 right-0 px-1">
                  {/* 수입 */}
                  {dayInfo.data.income > 0 && (
                    <div className="text-xs text-blue-600 truncate">
                      +{formatAmount(dayInfo.data.income)}
                    </div>
                  )}
                  {/* 지출 */}
                  {dayInfo.data.expense > 0 && (
                    <div className="text-xs text-red-600 truncate">
                      -{formatAmount(dayInfo.data.expense)}
                    </div>
                  )}
                  {/* 합계는 공간이 있을 때만 */}
                  {(dayInfo.data.income === 0 || dayInfo.data.expense === 0) && (
                    <div className={`text-xs truncate ${
                      dayInfo.data.total >= 0 ? 'text-blue-600' : 'text-red-600'
                    }`}>
                      {dayInfo.data.total >= 0 ? '+' : ''}{formatAmount(dayInfo.data.total)}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 하단 버튼들 */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3">
        {/* 통계 버튼 */}
        <button
          onClick={navigateToStatsPage}
          className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg flex items-center justify-center"
        >
          <TrendingUp size={24} className="text-white" />
        </button>
        
        {/* + 버튼 */}
        <button
          onClick={navigateToAddPage}
          className="w-14 h-14 bg-orange-500 hover:bg-orange-600 rounded-full shadow-lg flex items-center justify-center"
        >
          <Plus size={24} className="text-white" />
        </button>
      </div>

      
    </div>
  );
};

export default HouseholdCalendar;