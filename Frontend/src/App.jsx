import { useEffect, useState } from 'react';
import api from './api';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import AdminHome from './pages/AdminHome';
import GesHome from './pages/GesHome';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Notfound from './components/Notfound';

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const res = await api.get('/users/me', {
            headers: { Authorization: `Bearer ${token}` },
          });

          setUser(res.data);
        } catch (error) {
          setError('Failed to fetch user');
          localStorage.removeItem('token');
        }
      }
      setIsLoading(false);
    };

    fetchUser();
  }, []);

  // ✅ ProtectedRoute 
  const ProtectedRoute = ({ user, role, children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }

    if (role && user.role !== role) {
      return <Navigate to="/" />;
    }

    return children;
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gray-900 flex items-center justify-center'>
        <div className='text-xl text-white'>Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />

      <Routes>

        <Route path="/" element={<Home user={user} error={error} />} />

        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login setUser={setUser} />}
        />

        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register setUser={setUser} />}
        />

        {/* ✅ ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute user={user} role="Administrateur">
              <AdminHome />
            </ProtectedRoute>
          }
        />

        {/* ✅ GESTIONNAIRE */}
        <Route
          path="/ges"
          element={
            <ProtectedRoute user={user} role="gestionnaire de stock">
              <GesHome />
            </ProtectedRoute>
          }
        />

        {/* ✅ NOT FOUND */}
        <Route path="*" element={<Notfound />} />

      </Routes>
    </Router>
  );
}

export default App;