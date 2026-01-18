import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Navbar = ({ isLogged, setIsLogged }) => {
  const { logOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleLogout = () => {
    logOut();
    setIsLogged(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 5) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div id='navbar' className={`flex justify-between px-[6vw] py-[2vh] items-center font-thin fixed w-screen z-50 transition duration-100 ${isScrolled ? 'bg-blue-200' : ''}`}>
      <h1 className='text-4xl font-medium font-mono'>Co-Mailer</h1>
      <div id='divElems' className='flex justify-between gap-[2vw]'>
        <Link to="/"><h5 className='text-sm px-[1vw] hover:text-blue-500'>Home</h5></Link>
        <Link to="/about"><h5 className='text-sm px-[1vw] hover:text-blue-500'>About Co-Mailer</h5></Link>
        {isLogged && <h5 className='text-sm px-[1vw] hover:text-blue-500 cursor-pointer' onClick={handleLogout}>Logout</h5>}
      </div>
      {isLogged ? (
        <Link to='/send-emails' className='text-base rounded-3xl px-[2vw] py-[1vh] bg-black text-white'>Send Mails</Link>
      ) : (
        <div className='flex gap-2'>
          <Link to='/login' className='text-base rounded-3xl px-[2vw] py-[1vh] bg-black text-white'>Login</Link>
          <Link to='/signup' className='text-base rounded-3xl px-[2vw] py-[1vh] bg-black text-white'>Signup</Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
