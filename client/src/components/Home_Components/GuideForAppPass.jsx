import React from 'react'

const GuideForAppPass = () => {
  return (
    <div className='w-[90vw] h-[90vh] bg-blue-50 flex flex-col items-center justify-between gap-1 py-[4vh] mb-[0vh]'>
      <div className='w-[80vw]'>
        <h2 className='text-xl mb-[3vh] text-center font-thin font-mono'>How to Get Your Google App Password</h2>
        
        <div className='p-[3vw] border'>
          <p className='text-sm font-mono mb-[2vh] text-gray-600'>
            An App Password is a 16-character code that lets you sign in to your Google Account from apps that don't support 2-Step Verification.
          </p>

          <div className='space-y-[2vh]'>
            <div className='flex gap-3'>
              <span className='bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-thin shrink-0'>1</span>
              <div>
                <h3>Enable 2-Step Verification</h3>
                <p className='text-sm font-mono text-gray-600'>
                  Go to <a href="https://myaccount.google.com/security" target="_blank" rel="noopener noreferrer" className='text-blue-600 underline'>Google Account Security</a> and enable 2-Step Verification if not already enabled.
                </p>
              </div>
            </div>

            <div className='flex gap-3'>
              <span className='bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-thin shrink-0'>2</span>
              <div>
                <h3>Go to App Passwords</h3>
                <p className='text-sm font-mono text-gray-600'>
                  Visit <a href="https://myaccount.google.com/apppasswords" target="_blank" rel="noopener noreferrer" className='text-blue-600 underline'>myaccount.google.com/apppasswords</a> or search "App Passwords" in your Google Account settings.
                </p>
              </div>
            </div>

            <div className='flex gap-3'>
              <span className='bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-thin shrink-0'>3</span>
              <div>
                <h3 >Create a New App Password</h3>
                <p className='text-sm font-mono text-gray-600'>
                  Enter a name for the app (e.g., "Co-mailer") and click <strong>Create</strong>.
                </p>
              </div>
            </div>

            <div className='flex gap-3'>
              <span className='bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-thin shrink-0'>4</span>
              <div>
                <h3>Copy the 16-Character Password</h3>
                <p className='text-sm font-mono text-gray-600'>
                  Google will show you a 16-character password in the format: <code className='bg-gray-200 px-1 rounded'>xxxx xxxx xxxx xxxx</code>. Copy it and paste it above.
                </p>
              </div>
            </div>
          </div>

          <div className='mt-[3vh] p-[1vw] bg-yellow-50 border border-yellow-300 text-center'>
            <p className='text-sm font-mono text-yellow-800'>
              <strong>⚠️ Note:</strong> Your App Password is stored securely (encrypted) and auto-expires after 4 hours. You'll need to re-enter it after expiry.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GuideForAppPass
