import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Chapter from "./components/Chapter";
import './App.css';

function App() {
  return (
    <div dir="rtl" style={{ fontFamily: 'Cairo, sans-serif', background: '#fafdff', minHeight: '100vh' }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chapter/:id" element={<Chapter />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App; 