import "./App.scss";
import "boxicons/css/boxicons.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import AppLayout from "./components/Layout/AppLayout";
import Main from "./pages/Main/Main";
import About from "./pages/About/About";
import Update from "./pages/Update/Update";
import Integration from "./pages/Integration/Integration";
import Support from "./pages/Support/Support";
import Faq from "./pages/Faq/Faq";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import ChatHistory from "./pages/ChatHistory/ChatHistory";
import Authentication from "./pages/Authentication/Authentication.component";
import ProtectedRoute from "./pages/Authentication/ProtectedRoute";
function App() {
  return (
    <Fragment>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
        <Route index element={<Authentication />} />
          <Route index element=
           {<ProtectedRoute Component={Main} />}
          />
          <Route path="/about" element=
           {<ProtectedRoute Component={About} />}
          />
          <Route path="/update" element={

            <ProtectedRoute Component={Update} />
          } />
          <Route path="/integration" element={
            <ProtectedRoute Component={Integration} />
          } />
          <Route path="/support" element={
            <ProtectedRoute Component={Support} />
          } />
          <Route path="/faq" element={
            <ProtectedRoute Component={Faq} />
          } />
          <Route path="/chat-history" element={
            <ProtectedRoute Component={ChatHistory} />
          } />
          <Route path="/*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </Fragment>
  );
}

export default App;
