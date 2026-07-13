import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import CodeAnalysisPage from './pages/CodeAnalysisPage';
import HistoryPage from './pages/HistoryPage';
import SubmissionDetailPage from './pages/SubmissionDetailPage';
import ProfilePage from './pages/ProfilePage';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected */}
          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />
          <Route path="/analyze" element={
            <ProtectedRoute><CodeAnalysisPage /></ProtectedRoute>
          } />
          <Route path="/history" element={
            <ProtectedRoute><HistoryPage /></ProtectedRoute>
          } />
          <Route path="/history/:id" element={
            <ProtectedRoute><SubmissionDetailPage /></ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute><ProfilePage /></ProtectedRoute>
          } />
        </Routes>

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#161b22',
              color: '#e6edf3',
              border: '1px solid #30363d',
              fontSize: '14px',
            },
          }}
        />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;