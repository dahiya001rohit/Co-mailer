import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Unlogged2 from './components/Unlogged2'
import GetStarted from './components/GetStarted'
import {Route, Routes, useLocation} from 'react-router-dom'
import Login from './components/Login'

const App = () => {
  const location = useLocation()

  // const [isLogged, setIsScrolled] = useState(true)

  return (
    <div id='landingPage' className='bg-[url(/homebackground.jpg)] bg-cover bg-fixed w-screen h-full overflow-hidden flex flex-col items-center'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<GetStarted/>}/>
      </Routes>
      {(location.pathname !== '/login' && location.pathname !== '/signup') && <Unlogged2/>}
    </div>
  )
}

export default App
