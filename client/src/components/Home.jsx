import React from 'react'
import HeadingText from './Home_Components/HeadingText'
import HeadingImg from './Home_Components/HeadingImg'

const Home = () => {
  return (
    <div id='page1' className='w-[80vw] h-[80vh] flex items-start justify-center mx-[10vw] mt-[11vh] gap-[3vw] mb-[9vh]'>
      <HeadingText/>
      <HeadingImg/>
    </div>
  )
}

export default Home
