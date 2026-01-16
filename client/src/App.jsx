import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Unlogged2 from './components/Unlogged2';
import Signup from './components/Signup';
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login';
import api from './utils/api';
import SendEmails from './components/SendEmails';
import ProtactedRoute from './components/ProtactedRoute';

const App = () => {
  const [isLogged, setIsLogged] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      if (!localStorage.getItem('token')) return;
      try {
        const res = await api.get('/me');
        if (res.data.user) {
          setIsLogged(true);
        } else {
          setIsLogged(false);
        }
      } catch (error) {
        setIsLogged(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <div id='landingPage' className='bg-[url(/homebackground.jpg)] bg-cover bg-fixed w-screen h-full overflow-hidden flex flex-col items-center'>
      <Navbar isLogged={isLogged} setIsLogged={setIsLogged} />
      <Routes>
        <Route path='/' element={<Home isLogged={isLogged} />} />
        <Route path='/login' element={<Login isLogged={isLogged} />} />
        <Route path='/signup' element={<Signup isLogged={isLogged} />} />
        <Route
          path='/send-emails'
          element={
            <ProtactedRoute>
              <SendEmails />
            </ProtactedRoute>
          }
        />
      </Routes>
      {(location.pathname !== '/login' && location.pathname !== '/signup') && <Unlogged2 />}
    </div>
  );
};

export default App;
