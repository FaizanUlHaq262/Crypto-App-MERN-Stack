import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import CoinInfo from './components/CoinInfo';
import HomePage from './components/HomePage';
import BuyCrypto from './components/BuyCrypto';
import Footer from './components/Footer';
import About from './components/About';

function App() {

    return (
        <div className="min-h-screen bg-black text-white">
            <Router>
                <AuthProvider>
                <div >
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/coin" element={<CoinInfo />} />
                        <Route path="/buy-crypto" element={<BuyCrypto />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                    <Footer />
                </div>
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;
