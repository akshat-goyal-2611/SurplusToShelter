import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import DonateFood from "./pages/DonateFood";
import Shelter from "./pages/Shelter";
import Driver from "./pages/Driver";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <main className="page-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donate" element={<DonateFood />} />
        <Route path="/shelter" element={<Shelter />} />
        <Route path="/driver" element={<Driver />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      </main>

    </BrowserRouter>
  );
}

export default App;