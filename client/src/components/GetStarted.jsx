import React from 'react'
import GetStartedText from './GetStarted_Components/GetStartedText'
import GetStartedForm from './GetStarted_Components/GetStartedForm'

const GetStarted = () => {
  return (
    <div id='page1' className='w-[80vw] h-[80vh] flex items-start justify-center mx-[10vw] mt-[11vh] gap-[1vw] mb-[9vh]'>
      <GetStartedText/>
      <GetStartedForm/>
    </div>
  )
}

export default GetStarted
