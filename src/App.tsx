import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Calculator from './pages/Calculator';
import LandingPage from './pages/LandingPage';
import ResetPassword from './pages/ResetPassword';
import AuthCallback from './pages/AuthCallback';
import { AuthProvider } from './contexts/AuthContext';
import GoogleOneTap from './components/auth/GoogleOneTap';
import Navbar from './components/Navbar';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <GoogleOneTap />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/calculator" element={
          <>
            <Navbar />
            <Calculator />
          </>
        } />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;