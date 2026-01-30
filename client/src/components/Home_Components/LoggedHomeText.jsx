import React from 'react'
import useAuth from '../../hooks/useAuth'
import { Link } from 'react-router-dom'
import api from '../../utils/api'
import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'

const LoggedHome = () => {
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
  const handleTemplateSubmit = async (e) => {
    e.preventDefault()
    if(template.name.split('.').at(-1) !== 'html'){
      alert(`Invalid template`)
      setTemplate(null)
      return
    }
    const formData = new FormData()
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
      if (templateInputRef.current) {
        templateInputRef.current.value = "";
      }
      setTemplate(null);
      return;
    } catch (error) {
      alert(`An error occured, try again`)
      setTemplate(null)
      return
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
        {<div className='flex flex-col gap-2 justify-center items-center'>
          <div >
            <Link to='/send-emails'className='text-base rounded-3xl px-[2vw] py-[1vh] bg-black text-white font-thin'>Send Mails</Link>
          </div>
          <div className='flex justify-start flex-col text-base items-center'>
            <input 
              type="file" 
              ref={templateInputRef} 
              style={{ display: 'none' }} 
              onChange={handleTemplateChange}
            />
            <h1 className='text-base rounded-3xl px-[1vw] py-[0.5vh] bg-black text-white font-thin cursor-default' onClick={handleClick}>{template?'Template Added':'Add/Update Template'}</h1>
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
