import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useTransactions } from "../context/TransactionContext";
import Stats from "./Stats";
import TransactionList from "./TransactionList";
import { getFormattedDate } from "../utils/utility";

const CalendarPage = () => {
  const { selectedDate, setSelectedDate, transactions } = useTransactions();

  const tileClassName = ({ date, view }) => {
    let className = " border-r-2 ";
    if (view === "month") {
      const dateString = getFormattedDate(new Date(date));
      if (transactions.some((t) => t.date === dateString)) {
        className +=
          " relative after:absolute after:bottom-[10%] after:left-2/4 after:-translate-x-1/2 after:w-[6px] after:h-[6px] after:rounded-[50%] ";
        const dailyTransactions = transactions.filter(
          (t) => t.date === dateString
        );
        const dailyIncome = dailyTransactions
          .filter((t) => t.type === "income")
          .reduce((acc, t) => acc + t.amount, 0);

        const dailyExpense = dailyTransactions
          .filter((t) => t.type === "expense")
          .reduce((acc, t) => acc + t.amount, 0);

        className +=
          dailyIncome + dailyExpense > 0
            ? " after:bg-blue-700 "
            : dailyIncome + dailyExpense == 0
            ? " after:bg-gray-500 "
            : " after:bg-rose-700 ";
      }
    }
    return className;
  };

  return (
    <div className="space-y-6">
      <style>{`
        .react-calendar {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid #e5e7eb;
        }
      `}</style>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileClassName={tileClassName}
        calendarType="gregory"
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

export default CalendarPage;
