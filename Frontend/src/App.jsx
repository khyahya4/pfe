import { useEffect, useState } from 'react';
import api from './api';
import { BrowserRouter as Router, Route, Routes ,Navigate} from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Notfound from './components/Notfound';

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [inLoading, setInLoading] = useState(true);
  console.log(user);

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
      setInLoading(false);
    };

    fetchUser();
  }, []);
  
  if (inLoading) {
    return (
    <div className='min-h-screen bg-gray-900 flex items-center justify-center'> 
    <div className='text-xl text-white'>
    Loading...
    </div>
    </div>
    );
  }

  return (
    <Router>
      <Navbar user={user } setUser={setUser} />

      <Routes>
        <Route path="/" element={<Home user={user}  error={error}/>} />
        <Route
         path="/login"
          element={user ? <Navigate to="/"/> : <Login setUser={setUser} />} />

          <Route path="/Register" 
          element={user ? <Navigate to="/"/> : <Register setUser={setUser} />} />
          <Route path='*' element={<Notfound/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;