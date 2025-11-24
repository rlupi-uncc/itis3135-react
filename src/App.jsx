import { BrowserRouter, Routes, Route } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import Contract from "./Contract";
import Introduction from "./Introduction";
import Introductions from "./Introductions";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contract" element={<Contract />} />
        <Route path="/introduction" element={<Introduction />} />
        <Route path="/introductions" element={<Introductions />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
