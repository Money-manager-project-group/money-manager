import { BrowserRouter, Route, Routes } from "react-router-dom";
import TransactionList from "./components/TransactionList";
import Setting from "./components/Setting";
import Calendar from "./components/Calendar";
import Home from "./components/Home";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          {/* <Route path="/" element={}></Route> */}
          <Route path="/" element={<Home />}></Route>
          <Route path="/table" element={<TransactionList />}></Route>
          <Route path="/calendar" element={<Calendar />}></Route>
          <Route path="/setting" element={<Setting />}></Route>
          <Route path="*" element={<div>404 Page Not found</div>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
