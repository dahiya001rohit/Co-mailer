import React from 'react'
import HeadingText from './Home_Components/HeadingText'
import HeadingImg from './Home_Components/HeadingImg'
import LoggedHome from './Home_Components/LoggedHomeText'

const Home = ({isLogged}) => {
  return (
    <>
    {!isLogged?
      <div className='w-[80vw] h-[80vh] flex items-start justify-center mx-[10vw] mt-[11vh] gap-[3vw] mb-[9vh]'>
        <HeadingText/>
        <HeadingImg/>
      </div>
    :
      <div className='w-[80vw] h-[80vh] flex items-start justify-center mx-[10vw] mt-[11vh] gap-[3vw] mb-[9vh]'>
        <LoggedHome/>
      </div>}
    </>
  )
}

export default Home
