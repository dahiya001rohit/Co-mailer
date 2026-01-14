import React, {useState} from 'react'

const Unlogged2 = () => {
    const [isLogged, setIsLogged] = useState(false)
    return (
        <div className='w-[95vw] h-screen bg-blue-50 flex flex-col items-center justify-between gap-1 py-[4vh] mb-[4vh]'>
            <div className='w-[80vw] h-4/10 border flex flex-col items-center'>
                <h1 className='mt-[2vh] font-mono'>Our Services</h1>
                <div className='w-full h-full flex items-center justify-center gap-2'>
                    <div className='w-3/10 h-8/10 border'></div>
                    <div className='w-3/10 h-8/10 border'></div>
                    <div className='w-3/10 h-8/10 border'></div>
                </div>
            </div>
            <div className='w-[80vw] h-6/10 border flex flex-col items-center'>
                <h1 className='mt-[2vh] font-mono'>Why Us?</h1>
                <div className='w-full h-full flex flex-col items-center justify-center gap-2'>
                    <div className='w-9/10 h-8/10 border'></div>
                    {/* <div className='w-3/10 h-8/10 border'></div>
                    <div className='w-3/10 h-8/10 border'></div> */}
                </div>
            </div>
        </div>
    )
}

export default Unlogged2
