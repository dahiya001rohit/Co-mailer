import React from 'react'

const HeadingText = () => {
  return (
    <div className='w-2/3 h-full flex justify-center flex-col text-base'>
      <div>
        <h1 className='text-8xl mx-[2vw]'>Stop <span className='italic'>Sending</span> Ugly Plain <span className='italic font-bold'>Emails.</span></h1>
      </div>
      <div>
        <p>
           <h5 className='text-sm mx-[4vw] my-[3vh] font-mono' >Co-Mailer lets developers generate and send HTML emails with clean templates, SMTP support, and zero markup headaches. Plug in your data and ship formatted emails instantly.</h5> 
        </p>
      </div>
    </div>
  )
}

export default HeadingText
