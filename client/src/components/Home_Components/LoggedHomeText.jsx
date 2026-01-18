import React from 'react'
import useAuth from '../../hooks/useAuth'
import { Link } from 'react-router-dom'
import api from '../../utils/api'
import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'

const LoggedHome = () => {
  const formData = new FormData()
  const templateInputRef = useRef(null)
  const handleClick = () => {
    templateInputRef.current.click()
  }
  const [template, setTemplate] = useState(null)
  const handleTemplateChange = (e) => {
        const newTemplate = e.target.files[0]
        setTemplate(newTemplate)
    }
  const { user } = useAuth()
  if(user){
    console.log(user)
  }
  const [appToken, setAppToken] = useState(localStorage.getItem('appToken'))
  const isTokenExpired = (token) => {
    if(!token) return true
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      return payload.exp * 1000 < Date.now()
    } catch (err) {
      return true``
    }
  }
  useEffect(() => {
    isTokenExpired
  }, [appToken])
  const [appPass, setAppPass] = useState('')
  const [error, setError] = useState(null)
  const validateAppPassword = (password) => {
    const pattern = /^[a-z]{4} [a-z]{4} [a-z]{4} [a-z]{4}$/;
    return pattern.test(password);
  }
  const handleTemplateSubmit = async (e) => {
    e.preventDefault()
    if(template.name.split('.').at(-1) !== 'html'){
      alert(`Invalid template`)
      setTemplate(null)
      return
    }
    formData.append('template', template)
    try {
      const responce = await api.post('/save-template', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      if(responce.data.error){
        alert(`An error occured, try again`)
        setTemplate(null)
        return
      }
      alert(`Template Updated`)
      setTemplate(null)
      return
    } catch (error) {
      alert(`An error occured, try again`)
      setTemplate(null)
      return
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!validateAppPassword(appPass)){
      setError('Invalid App-Pass')
      return
    }
    try {
      const response = await api.post('/save-app-password', { appPass })
      if(response.data.error) {
        alert('An error occurred')
        return
      }
      setError(null)
      setAppToken(response.data.appToken)
      localStorage.setItem('appToken', response.data.appToken)
    } catch (err) {
      alert(err.message)
    }
  }


  return (
      <div className='w-full h-[90vh] flex justify-center flex-col text-base items-center'>
        <div>
          <h1 className='text-8xl mx-[2vw]'> WelCome Back <span className='italic underline'>{user?.name}.</span></h1>
        </div>
        <div>
            <h5 className='text-sm mx-[4vw] my-[3vh] font-mono' >Wishing you a good day, lets help us in making your day easier.</h5> 
        </div>
        {!appToken && <div>
          <form className='flex gap-2' onSubmit={handleSubmit}>
            <input type="text" className='w-[20vw] text-base bg-white border font-mono px-[0.3vw]' placeholder='16 digit app password...' value={appPass} onChange={e => setAppPass(e.target.value)}/>
            <button type='submit' className='text-base rounded-3xl px-[2vw] py-[1vh] bg-black text-white font-thin'>Add APP-PASS</button>
          </form>
        </div>}
        {error && (
              <div className="text-red-500 font-thin flex flex-col justify-center items-center ">
                {error}
              </div>
            )}
        {!appToken && <div>
            <h5 className='text-xs mx-[4vw] my-[3vh] font-mono' >Enter your app pass, if you need steps to get your app password scroll down.</h5> 
        </div>}
        {appToken && <div className='flex flex-col gap-2 justify-center items-center'>
          <div >
            <Link to='/send-emails'className='text-base rounded-3xl px-[2vw] py-[1vh] bg-black text-white font-thin'>Send Mails</Link>
          </div>
          <div className='flex justify-start flex-col text-base items-center'>
            <input 
            type="file" 
            ref={templateInputRef} 
            style={{ display: 'none' }} 
            onChange={handleTemplateChange}
            multiple 
                />
            <h1 className='text-base rounded-3xl px-[1vw] py-[0.5vh] bg-black text-white font-thin' onClick={handleClick}>{template?'Template Added':'Add/Update Template'}</h1>
          </div>
          {template && <div>
            <form onSubmit={handleTemplateSubmit}>
              <button className='text-base rounded-3xl px-[1vw] py-[0.5vh] bg-black text-white font-thin' type='submit'>Send Template</button>
            </form>
          </div>}
        </div>}
      </div>
  )
}

export default LoggedHome
