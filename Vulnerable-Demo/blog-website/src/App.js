import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import BlogPost from './components/BlogPost';
import AddPost from './components/AddPost';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/post/:id" element={<BlogPost />} />
          <Route path="/post" element={<AddPost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
