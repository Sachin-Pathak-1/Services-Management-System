import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Navbar } from "./components/Navbar.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";
import { ProfilePage } from "./pages/ProfilePage.jsx";
import { ActivityPage } from "./pages/ActivityPage.jsx";
import { HistoryPage } from "./pages/HistoryPage.jsx";
import { CustomerList } from "./pages/CustomerList.jsx";
import { CustomerDetails } from "./pages/CustomerDetails.jsx";
import { Home } from "./pages/Home.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import { Services } from "./pages/Services.jsx";
import { About } from "./pages/About.jsx";
import { Contact } from "./pages/Contact.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <>
      <Navbar 
        isLoggedIn={isLoggedIn} 
        setIsLoggedIn={setIsLoggedIn}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} />} />
        <Route path="/profile" element={<ProfilePage isLoggedIn={isLoggedIn} currentUser={currentUser} />} />
        <Route path="/activity" element={<ActivityPage isLoggedIn={isLoggedIn} />} />
        <Route path="/history" element={<HistoryPage isLoggedIn={isLoggedIn} />} />
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/customer/:id" element={<CustomerDetails />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
