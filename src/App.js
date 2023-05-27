import "./App.scss";
import "boxicons/css/boxicons.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/Layout/AppLayout";
import Blank from "./pages/Blank";
import Main from "./components/Main/Main";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Blank />} />
          <Route path="/about" element={<Main />} />
          <Route path="/update" element={<Main />} />
          <Route path="/integration" element={<Blank />} />
          <Route path="/support" element={<Blank />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
