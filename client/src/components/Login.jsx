import React from 'react'
import LoginTxt from './Login_Components/LoginTxt'
import LoginForm from './Login_Components/LoginForm'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Login = ({isLogged}) => {
  const navigate = useNavigate()
  useEffect(() => {
    if(isLogged){
      navigate('/')
    }
  })
  return (
    <div id='page1' className='w-[80vw] h-[80vh] flex items-start justify-center mx-[10vw] mt-[11vh] gap-[1vw] mb-[9vh]'>
      <LoginTxt/>
      <LoginForm/>
    </div>
  )
}

export default Login