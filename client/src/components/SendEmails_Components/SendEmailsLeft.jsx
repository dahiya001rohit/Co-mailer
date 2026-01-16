import React, { useState, useRef } from 'react';
import { FileUp } from 'lucide-react';
import { SiGooglegemini } from "react-icons/si";
import api from '../../utils/api';
import Loading from '../../utils/Loading';

const SendEmailsLeft = ({ html, setHtml }) => {
    const [to, setTo] = useState('')
    const [loading, setLoading] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [subject, setSubject] = useState('');
    const [error, setError] = useState('');

    const handleSend = async (e) => {
        e.preventDefault();
        if(!to || !subject || !html || to.trim() === '' || subject.trim() === '') return
        setLoading(true);
        try {
            const response = await api.post('/send-email', {
                to: to,
                subject: subject,
                html: html,
            });
            if (response.data.error) {
                setError(response.data.error);
                setLoading(false);
                alert(`An error occurred: ${response.data.error}`);
                return;
            }
            console.log(`Done`);
            setLoading(false);
            // setHtml(null);
            // setSubject('');
        } catch (error) {
            setLoading(false);
            const errorMessage = error.response?.data?.message || error.message || error;
            setError(errorMessage);
            alert(`An error occurred: ${errorMessage}`);
        }
    }    
    const handleGenerate = async (e) => {
        e.preventDefault();
        if (!prompt || prompt.trim() === '') return;
        setLoading(true);
        try {
            const response = await api.post('/gemini', { prompt: prompt });
            if (response.data.error) {
                setError(response.data.error);
                setLoading(false);
                alert(`An error occurred: ${response.data.error}`);
                return;
            }
            console.log(`Done`);
            setLoading(false);
            setHtml(response.data.html);
            setSubject(response.data.subject);
        } catch (error) {
            setLoading(false);
            const errorMessage = error.response?.data?.message || error.message || error;
            setError(errorMessage);
            alert(`An error occurred: ${errorMessage}`);
        }
    }

    return (
        <div className='w-4/10 h-full flex justify-start flex-col text-base items-center gap-[5vh] border rounded-4xl bg-blue-300'>
            <div className='flex justify-center text-base items-center mt-[5vh] mx-[2vw]'>
                <h1 className='text-xl font-mono'>Modify your emails<span className='italic font-bold'> Using AI </span>just at a <span className='italic font-bold'>CLICK.</span></h1>
            </div>
            <form className='mx-[3vw] mt-[2vh]' onSubmit={handleGenerate}>
                <h1 className='text-sm font-mono'>Generate Your Email Content and Subject:</h1>
                <textarea 
                    type="text" 
                    className='w-[25vw] h-[6vh] border font-mono text-[0.9vw] py-[0.5vh] pl-[0.5vw] bg-white mt-[1vh]' 
                    placeholder="Enter Prompt" 
                    value={prompt} 
                    onChange={(e) => setPrompt(e.target.value)}
                ></textarea>
                <div className='flex justify-start flex-col text-base items-center mt-[2vh]'>
                    <button type='submit' className='text-sm flex gap-1 font-mono px-[1vw] py-[0.5vh] text-white bg-black rounded-4xl hover:bg-gray-800'>
                        <span className='font-mono font-thin'>{loading ? <Loading /> : 'Generate'}</span>
                        {!loading && <SiGooglegemini />}
                    </button>
                </div>
            </form>

            <form className='mx-[3vw] mt-[2vh]' onSubmit={handleSend}>
                <h1 className='text-sm font-mono'>To:</h1>
                <input type="text" className='w-[25vw] border mx-1 font-mono text-[0.9vw] py-[0.5vh] pl-[0.5vw] bg-white mt-[2vh]' placeholder="Receiver's Email" value={to} onChange={(e) => setTo(e.target.value)}/>
                <h1 className='text-sm font-mono mt-[2vh]'>Subject:</h1>
                <input 
                    type="text" 
                    className='w-[25vw] border mx-1 font-mono text-[0.9vw] py-[0.5vh] pl-[0.5vw] bg-white mt-[2vh]' 
                    placeholder="Enter Subject" 
                    value={subject} 
                    onChange={(e) => setSubject(e.target.value)} 
                />
                <div className='flex justify-start flex-col text-base items-center mt-[2vh]'>
                    <h1 className='text-sm flex gap-1 font-mono px-[1vw] py-[0.5vh] text-white bg-black rounded-4xl hover:bg-gray-800'>
                        <FileUp size={18} strokeWidth={1} />
                        <span className='font-mono font-thin'> Upload</span>
                    </h1>
                </div>
                <div className='flex justify-around item-center mt-[2vh] font-mono text-xs'>
                    <label className='flex justify-around item-center'>
                        <input type="checkbox" className='w-[0.8vw]' />
                        <h5>To all</h5>
                    </label>
                    <label className='flex justify-around item-center'>
                        <input type="checkbox" className='w-[0.8vw]' />
                        <h5>Individually</h5>
                    </label>
                </div>
                <div className='flex justify-start flex-col text-base items-center mt-[2vh]'>
                    <button type='submit' className='text-sm flex gap-1 font-mono px-[1vw] py-[0.5vh] text-white bg-black rounded-4xl hover:bg-gray-800 cursor-pointer'>
                        <span className='font-mono font-thin'>{loading ? <Loading /> : 'Send'}</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SendEmailsLeft;
