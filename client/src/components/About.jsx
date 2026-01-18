import React from 'react';
import { Shield, Sparkles, Mail, FileText, Users, Lock, Cpu, Send } from 'lucide-react';

const About = () => {
  return (
    <div className="w-[80vw] bg-blue-50 flex flex-col items-center py-[4vh] px-[2vw] mt-[12vh] mb-[7vh] border">
      <div className="w-full bg-white shadow-lg p-4 flex flex-col items-center">
        <h1 className="text-xl mb-1 font-mono font-thin">About Co-mailer</h1>
        <p className="text-xs text-gray-500 font-mono mb-6 text-center">
          Co-mailer is a modern, AI-powered bulk email platform designed for simplicity, security, and speed. Generate beautiful HTML emails from a prompt, send to many with smart attachments, and keep your credentials safe.
        </p>

        <h2 className="text-xl font-thin text-black mt-2 mb-1 flex items-center gap-2"><Cpu size={15}/> Tech Stack</h2>
        <ul className="list-disc list-inside text-gray-500 font-mono mb-2 text-xs">
          <li>Frontend: React 18, Vite, Tailwind CSS, Lucide Icons</li>
          <li>Backend: Node.js, Express.js, MongoDB (Mongoose)</li>
          <li>AI: Google Gemini API for email content generation</li>
          <li>Email: Nodemailer with Gmail SMTP & App Passwords</li>
        </ul>

        <h2 className="text-xl font-thin text-black mt-2 mb- 1 flex items-center gap-2"><Shield size={15}/> Security</h2>
        <ul className="list-disc list-inside text-gray-500 font-mono mb-2 text-xs">
          <li>App Passwords are <span className="font-bold">AES-256 encrypted</span> and never stored permanently</li>
          <li>App Password tokens auto-expire after 4 hours</li>
          <li>All API routes protected with JWT authentication</li>
          <li>No email or password data is ever shared with third parties</li>
        </ul>

        <h2 className="text-xl font-thin text-black mt-2 mb- 1 flex items-center gap-2"><Sparkles size={15}/> Features</h2>
        <ul className="list-disc list-inside text-gray-500 font-mono mb-2 text-xs">
          <li><span className="font-bold">AI Email Generation:</span> Instantly create HTML emails and subject lines from a simple prompt</li>
          <li><span className="font-bold">Bulk Sending:</span> Send to multiple recipients at once</li>
          <li><span className="font-bold">Smart Attachments:</span> Automatically match files to recipients by email</li>
          <li><span className="font-bold">Secure SMTP:</span> Use your own Gmail with App Passwords</li>
          <li><span className="font-bold">No Coding Needed:</span> Just type, generate, and send</li>
          <li><span className="font-bold">Modern UI:</span> Fast, responsive, and easy to use</li>
        </ul>

        <div className="mt-8 text-center text-xs text-black font-mono">
          &copy; {new Date().getFullYear()} Co-mailer. Built by Rohit Dahiya.
        </div>
      </div>
    </div>
  );
};

export default About;
