import "./App.scss";
import "boxicons/css/boxicons.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/Layout/AppLayout";
import Main from "./pages/Main/Main";
import About from "./pages/About/About";
import Update from "./pages/Update/Update";
import Integration from "./pages/Integration/Integration";
import Support from "./pages/Support/Support";
import Faq from "./pages/Faq/Faq";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="/update" element={<Update />} />
          <Route path="/integration" element={<Integration />} />
          <Route path="/support" element={<Support />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
