import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import  Navbar from './components/Navbar';
import ReportGenerator from './components/ReportGenerator';
import Dashboard from './components/Dashboard';
import TestSiteManager from './components/dashboard/TestSiteManager';
// import WebFuzzForgeDashboard from './components/dashboard/WebFuzzForgeDashboard';
import WebFuzzForgeDashboard from './components/ReferenceWebFuzzForgeDashboardOld';
import MainDashboard from './components/dashboard/MainDashboard';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <Router>
      <Navbar token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={<Dashboard  token={token} setToken={setToken}/>} />
        <Route path="/dashboard" element={<MainDashboard  token={token} setToken={setToken}/>} />
        <Route path="/dashboard/:siteId" element={<WebFuzzForgeDashboard  token={token} setToken={setToken}/>} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/testmanager" element={<TestSiteManager setToken={setToken} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/generate-report" element={<ReportGenerator />} />
      </Routes>
    </Router>
  );
};

export default App;
