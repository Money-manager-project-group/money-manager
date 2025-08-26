import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useTransactions } from "../context/TransactionContext";
import Stats from "./Stats";
import TransactionList from "./TransactionList";
import { getISODate } from "../utils/utility";

const CalendarView = () => {
  const { selectedDate, setSelectedDate, transactions } = useTransactions();

  // 각 날짜에 거래가 있는지 표시하기 위한 함수
  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const dateString = getISODate(new Date(date));
      if (transactions.some((t) => t.date === dateString)) {
        return "has-transaction"; // 이 클래스에 CSS로 스타일을 추가할 수 있습니다.
      }
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <style>{`
        .react-calendar {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid #e5e7eb;
        }
        .has-transaction {
          position: relative;
        }
        .has-transaction::after {
          content: '';
          position: absolute;
          bottom: 10%;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #ef4444; /* red-500 */
        }
      `}</style>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileClassName={tileClassName}
        formatDay={(locale, date) => new Date(date).getDate()} // 날짜에서 '일' 제거
      />
      <div className="flex justify-end">
        <Link
          to={`/new/${getISODate(selectedDate)}`}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 font-semibold"
        >
          선택 날짜에 내역 추가
        </Link>
      </div>
      <Stats scope="day" />
      <TransactionList scope="day" />
    </div>
  );
};

export default CalendarView;
