import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useTransactions } from "../context/TransactionContext";
import Stats from "./Stats";
import TransactionList from "./TransactionList";
import { getFormattedDate } from "../utils/utility";

const CalendarView = () => {
  const { selectedDate, setSelectedDate, transactions } = useTransactions();

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const dateString = getFormattedDate(new Date(date));
      if (transactions.some((t) => t.date === dateString)) {
        return "has-transaction";
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
        formatDay={(locale, date) => new Date(date).getDate()}
      />
      <div className="flex justify-end">
        <Link
          to={`/new/${getFormattedDate(selectedDate)}`}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 font-semibold"
        >
          거래내역 추가
        </Link>
      </div>
      <Stats scope="day" />
      <TransactionList scope="day" />
    </div>
  );
};

export default CalendarView;
