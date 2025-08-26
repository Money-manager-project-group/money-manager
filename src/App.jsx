import { BrowserRouter, Route, Routes } from "react-router-dom";
import Setting from "./components/Setting";
import Calendar from "./components/Calendar";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Table from "./components/Table";
import TransactionForm from "./components/TransactionForm";
import { TransactionProvider } from "./context/TransactionContext";

function App() {
  return (
    <TransactionProvider>
      <BrowserRouter>
        <div className="h-screen flex flex-col">
          <header>
            <NavBar />
          </header>
          <main className="flex-grow container mx-auto p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/table" element={<Table />} />
              <Route path="/calendar" element={<Calendar />} />
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
