import TeamManage from "./pages/Teammanage.jsx";
import Appointments from "./pages/Appointments.jsx";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";

function App() {

  return (
    <>
    <TeamManage />
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/team-manage" element={<TeamManage />} />
    </Routes>
    </>
  );
}

export default App
