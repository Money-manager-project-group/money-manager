import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import ListPage from "./components/ListPage";
import CalendarPage from "./components/CalendarPage";
import Setting from "./components/Setting";
import TransactionForm from "./components/TransactionForm";
import { TransactionProvider } from "./context/TransactionContext";

function App() {
  return (
    <TransactionProvider>
      <BrowserRouter>
        <div className="h-screen flex flex-col scrollbar-hidden overflow-y-scroll">
          <header>
            <NavBar />
          </header>
          <main className="flex-grow container mx-auto p-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/table" element={<ListPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="/new" element={<TransactionForm />} />
              <Route path="/new/:date" element={<TransactionForm />} />
              <Route path="/edit/:id" element={<TransactionForm />} />
              <Route path="*" element={<div>404 Page Not found</div>} />
            </Routes>
          </main>
          <footer className="mt-auto">
            <Footer />
          </footer>
        </div>
      </BrowserRouter>
    </TransactionProvider>
  );
}

export default App;
