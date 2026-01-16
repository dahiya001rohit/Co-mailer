import React from 'react'
import useAuth from '../../hooks/useAuth'
import { Link } from 'react-router-dom'

const LoggedHome = () => {
    const { user } = useAuth()
    if(user){
        console.log(user)
    }
  return (
    <div className='w-full h-full flex justify-center flex-col text-base items-center'>
      <div>
        <h1 className='text-8xl mx-[2vw]'> WelCome Back <span className='italic underline'>{user?.name}.</span></h1>
      </div>
      <div>
           <h5 className='text-sm mx-[4vw] my-[3vh] font-mono' >Wishing you a good day, lets help us in making your day easier.</h5> 
      </div>
      <div>
        <Link to='/send-emails'className='text-base rounded-3xl px-[2vw] py-[1vh] bg-black text-white'>Send Mails</Link>
      </div>
    </div>
  )
}

export default LoggedHome
