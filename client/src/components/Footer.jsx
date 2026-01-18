import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full bg-gray-200 border-t border-gray-400 py-3 flex flex-col items-center mt-auto">
      <div className="text-xs text-black font-mono">© {new Date().getFullYear()} Co-mailer. All rights reserved.</div>
      <div className="text-xs text-black font-mono mt-1">Made by Rohit Dahiya</div>
      <button
        className="text-xs text-black font-mono mt-1  hover:text-blue-900 transition-colors"
        onClick={() => window.open('mailto:rohit830770@gmail.com?subject=Contact%20from%20Co-mailer%20User', '_blank')}
      >
        Contact
      </button>

    </footer>
  )
}

export default Footer
