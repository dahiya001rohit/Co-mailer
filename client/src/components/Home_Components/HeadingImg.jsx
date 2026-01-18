import React from 'react'
import { Mail, Sparkles, Send, FileText, Users } from 'lucide-react'

const HeadingImg = () => {
  return (
    <div className='w-1/3 h-full bg-linear-to-br from-blue-50 to-blue-200 rounded-xl flex flex-col items-center justify-around p-[2vw] overflow-hidden relative'>
    
      <div className='relative flex flex-col items-center gap-[2vh]'>
        <div className='flex items-center gap-3'>
          <div className='w-14 h-14 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg'>
            <Sparkles className='text-white' size={28} />
          </div>
          <div className='flex flex-col'>
            <div className='w-20 h-2 bg-blue-400 rounded-full'></div>
            <div className='w-16 h-2 bg-blue-300 rounded-full mt-1'></div>
            <div className='w-12 h-2 bg-blue-200 rounded-full mt-1'></div>
          </div>
        </div>

        {/* Arrow down */}
        <div className='text-blue-400 text-2xl'>↓</div>

        {/* Email card */}
        <div className='w-[90%] bg-white shadow-lg p-4 transform hover:scale-105 transition-transform'>
          <div className='flex items-center gap-2 mb-2'>
            <Mail className='text-blue-500' size={20} />
            <span className='text-xs font-mono text-gray-500'>Generated Email</span>
          </div>
          <div className='w-full h-2 bg-blue-200 rounded-full mb-1'></div>
          <div className='w-4/5 h-2 bg-blue-100 rounded-full mb-1'></div>
          <div className='w-3/5 h-2 bg-blue-50 rounded-full'></div>
          <div className='flex items-center gap-2 mt-3'>
            <FileText className='text-blue-500' size={14} />
            <span className='text-[10px] font-mono text-gray-400'>attachment.pdf</span>
          </div>
        </div>

        {/* Arrow down */}
        <div className='text-blue-400 text-2xl'>↓</div>

        {/* Send to multiple users */}
        <div className='flex items-center gap-2'>
          <Send className='text-blue-500' size={24} />
          <div className='flex -space-x-2'>
            <div className='w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white text-xs'>A</div>
            <div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs'>B</div>
            <div className='w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs'>C</div>
            <div className='w-8 h-8 bg-blue-300 rounded-full flex items-center justify-center text-blue-700 text-xs'>+5</div>
          </div>
        </div>
      </div>

      {/* Bottom label */}
      <p className='mt-[3vh] text-xs font-mono text-blue-600 text-center'>
        AI → Email → Send to All
      </p>
    </div>
  )
}

export default HeadingImg
