import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [isLogged, setIsLogged] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div id='navbar' className={`flex justify-between px-[6vw] py-[2vh] items-center font-thin fixed w-screen transition duration-200 ${isScrolled ? 'bg-blue-200' : ''}`}>
      <h1 className='text-4xl font-medium font-mono'>Co-Mailer</h1>
      <div id='divElems' className='flex justify-between gap-[2vw]'>
        <Link to="/"><h5 className='text-sm px-[1vw] hover:text-blue-500'>Home</h5></Link>
        <Link to="/about"><h5 className='text-sm px-[1vw] hover:text-blue-500'>About</h5></Link>
        {isLogged && <Link to="/profile"><h5 className='text-sm px-[1vw] hover:text-blue-500'>Profile</h5></Link>}
      </div>
      <Link to={isLogged?'/sendmails':'/signup'} className='text-base rounded-3xl px-[2vw] py-[1vh] bg-black text-white'>{isLogged?'Send Emails':'Get Started'}</Link>
    </div>
  )
}

export default Navbar
