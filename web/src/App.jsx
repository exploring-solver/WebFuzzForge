import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import WebFuzzForgeDashboard from './components/WebFuzzForgeDashboard';
import Signup from './components/Signup';
import { Dashboard, Navbar } from './components/Navbar';
import ReportGenerator from './components/ReportGenerator';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <Router>
      <Navbar token={token} setToken={setToken} />
      <Routes>

        <Route path="/" element={<WebFuzzForgeDashboard />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard token={token} />} />
        <Route path="/generate-report" element={<ReportGenerator />} />
      </Routes>
    </Router>
  );
};

export default App;
