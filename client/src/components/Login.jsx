import React from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import api from '../utils/api'

const Login = ({isLogged}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate()
  const handleLogInWithGoogle = async () =>{
    try {

      const res = await api.get('/login')
      if(res.data.error){
        alert(res.data.error)
        return
      }
      window.location.href = res.data.url
      return
    } catch (error) {
      alert(error)
      return
    }
  }
  useEffect(() => {
    if(isLogged){
      navigate('/')
    }
    const token = searchParams.get('token')
    if(token){
      localStorage.setItem('token', token)
      navigate('/')
    }
  }, [isLogged, navigate, searchParams])
    return (
    <div className='w-full min-w-125 h-[92vh] min-h-210 flex flex-col justify-center items-center text-center mt-21'>
        <h1 className='text-8xl italic text-blue-400 font-light'>Welcome.</h1>
        <h5 className='text-[17px] my-5 font-mono' >Let us make your day easier.</h5> 
        <button className='text-[20px] rounded-3xl px-8 py-2 bg-black text-white font-thin' onClick={() => {handleLogInWithGoogle()}}>Login with Google</button>
    </div>
  )
}

export default Login