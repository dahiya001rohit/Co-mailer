import React from 'react'

const HeadingText = () => {
  return (
    <div className='w-full h-full flex justify-center flex-col text-base items-center text-center'>
      <div>
        <h1 className='text-8xl mx-[2vw]'>Send <span className='italic'> Emails</span> with just a <br /><span className='italic text-blue-400'>Prompt.</span></h1>
      </div>
      <div>
           <h5 className='text-xs mx-[4vw] my-[3vh] font-mono'>Co-Mailer uses AI to generate stunning HTML emails from simple prompts. Send bulk emails with smart file matching — the right attachment to the right person, automatically. No coding, no templates, just type and send.</h5> 
      </div>
    </div>
  )
}

export default HeadingText
