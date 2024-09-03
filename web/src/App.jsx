import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import WebFuzzForgeDashboard from './components/WebFuzzForgeDashboard';
import Signup from './components/Signup';
import  Navbar from './components/Navbar';
import ReportGenerator from './components/ReportGenerator';
import Dashboard from './components/Dashboard';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <Router>
      <Navbar token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={<WebFuzzForgeDashboard  token={token} setToken={setToken}/>} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard  />} />
        <Route path="/generate-report" element={<ReportGenerator />} />
      </Routes>
    </Router>
  );
};

export default App;
