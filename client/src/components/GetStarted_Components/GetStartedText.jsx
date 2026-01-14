import React from 'react'

const GetStartedText = () => {
  return (
    <div className='w-2/3 h-full flex justify-center flex-col text-base'>
      <div>
        <h1 className='text-4xl mx-[2vw]'>You're a <span className='italic'>Click Away</span> From Sending  <span className='italic font-bold'>Professional Emails.</span></h1>
      </div>
      <div>
        <h5 className='text-[0.7vw] mx-[4vw] my-[3vh] font-mono' >This service only works if you have a google account as it uses Google's App Password servise.<br/>If you have 2-Step Verification enabled on your Google account, you can generate a 16-character App Password This password works like a regular SMTP password but is separate from your main Google account password.</h5> 
      </div>
    </div>
  )
}

export default GetStartedText
