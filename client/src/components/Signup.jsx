import React, { useEffect } from 'react'
import SignupText from './Signup_Components/SignupText'
import SignupForm from './Signup_Components/SignupForm'
import { useNavigate } from 'react-router-dom'

const Signup = ({ isLogged }) => {
  const navigate = useNavigate()
    useEffect(() => {
      if(isLogged){
        navigate('/')
      }
    })
  return (
    <div id='page1' className='w-[80vw] h-[80vh] flex items-start justify-center mx-[10vw] mt-[11vh] gap-[1vw] mb-[9vh]'>
      <SignupText/>
      <SignupForm/>
    </div>
  )
}

export default Signup
