import React, { useState } from 'react';
import { FileUp } from 'lucide-react';
import { SiGooglegemini } from "react-icons/si";
import api from '../../utils/api';
import Loading from '../../utils/Loading';
import { useRef } from 'react';

const SendEmailsLeft = ({ html, setHtml }) => {
    const [showUpload, setShowUpload] = useState(false)
    const [toSeperate, setToSeperate] = useState(false)
    const fileInputRef = useRef(null)
    const [attachment, setAttachment] = useState(null)
    const [to, setTo] = useState('')
    const [loadingGenerate, setLoadingGenerate] = useState(false);
    const [loadingSend, setLoadingSend] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [subject, setSubject] = useState('');
    const [error, setError] = useState('');

    const handleUploadClick = () => {
        fileInputRef.current.click()
    }

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files)
        setAttachment(files)
    }

    const handleSend = async (e) => {
        e.preventDefault();
        if(!to || !subject || !html || to.trim() === '' || subject.trim() === '') return
        setLoadingSend(true);
        try {
            const formData = new FormData()
            formData.append('to', to)
            formData.append('subject', subject)
            formData.append('html', html)
            formData.append('toSeperate', toSeperate)
            // console.log(`Done`);

            if (attachment && attachment.length > 0){
                attachment.forEach( file => {
                    formData.append('attachments', file)
                });
            }
             const response = await api.post('/send-email', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (response.data.error) {
                setError('Failed to send email: ' + (response.data.error.message || response.data.error));
                setLoadingSend(false);
                alert('Failed to send email. Please check your details and try again.');
                return;
            }
            // console.log(`Done`);
            setLoadingSend(false);
            // setHtml(null);
            // setSubject('');
        } catch (error) {
            setLoadingSend(false);
            const errorMessage = error.response?.data?.message || error.message || error;
            setError(errorMessage);
            alert(`An error occurred: ${errorMessage}`);
        }
    }    
    const handleGenerate = async (e) => {
        e.preventDefault();
        if (!prompt || prompt.trim() === '') return;
        setLoadingGenerate(true);
        try {
            const response = await api.post('/gemini', { prompt: prompt });
            if (response.data.error) {
                setError('Failed to generate email: ' + (response.data.error.message || response.data.error));
                setLoadingGenerate(false);
                alert('Failed to generate email. Please try again.');
                return;
            }
            console.log(`Done`);
            setLoadingGenerate(false);
            setHtml(response.data.html);
            setSubject(response.data.subject);
        } catch (error) {
            setLoadingGenerate(false);
            const errorMessage = error.response?.data?.message || error.message || error;
            setError(errorMessage);
            alert(`An error occurred: ${errorMessage}`);
        }
    }

    return (
        <div className='w-4/10 h-full flex justify-start flex-col text-base items-center gap-[2vh] border rounded-4xl bg-blue-300 mt-2'>
            <div className='flex justify-center text-base items-center mt-[5vh] mx-[2vw] text-center'>
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
                    <button type='submit' className='text-sm flex gap-1 font-thin px-[1vw] py-[0.5vh] text-white bg-black rounded-4xl hover:bg-gray-800' disabled={loadingSend || loadingGenerate}>
                        {loadingGenerate ? <Loading /> : 'Generate'}
                        {!loadingGenerate && <SiGooglegemini />}
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
                <div className='flex justify-around item-center mt-[1vh] font-mono text-xs'>
                    <label className='flex justify-around item-center'>
                        <input type="checkbox" className='w-[0.8vw]' checked = {showUpload} onChange={e => {
                            setShowUpload(e.target.checked)
                            if(!e.target.checked) setAttachment(null)
                        }} />
                        <h5>Send Files</h5>
                    </label>
                </div>
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    style={{ display: 'none' }} 
                    onChange={handleFileChange}
                    multiple 
                />
                {showUpload && <div className='flex justify-start flex-col text-base items-center mt-[2vh]'>
                    <h1 className='text-sm flex gap-1 font-mono px-[1vw] py-[0.5vh] text-white bg-black rounded-4xl hover:bg-gray-800' onClick={handleUploadClick}>
                        {attachment && attachment.length !== 0?null:<FileUp size={18} strokeWidth={1} />}
                        <span className='font-mono font-thin'>{attachment && attachment.length !== 0?`${attachment.length} files added`:'Upload'}</span>
                    </h1>
                    <h1 className='text-[0.8vw] font-mono w-8/10 text-center mt-1 text-red-700'>MAX 100MB</h1>
                </div>}
                {showUpload && <div className='flex justify-around item-center mt-[1vh] font-mono text-xs'>
                    <label className='flex justify-around item-center'>
                        <input type="checkbox" className='w-[0.8vw]' checked = {toSeperate} onChange={e => {
                            setToSeperate(e.target.checked)
                        }} />
                        <h5>To separate Receiver</h5>
                    </label>
                </div>}
                <div className='flex justify-start flex-col text-base items-center mt-[2vh]'>
                    <button type='submit' className='text-sm flex gap-1 font-thin px-[1vw] py-[0.5vh] text-white bg-black rounded-4xl hover:bg-gray-800 cursor-pointer' disabled={loadingSend || loadingGenerate}>
                        {loadingSend ? <Loading /> : 'Send'}
                    </button>
                </div>
            </form>
            {!showUpload && <div className='font-italic text-[0.8vw] font-mono w-8/10 text-center text-red-700'>
                <p>* For sending files to separate recipients, name each file with the recipient’s email<br />(replace @ with _ and . with _)<br />Example: john_doe_gmail_com_resume.pdf will be sent to john.doe@gmail.com</p>
            </div>}
        </div>
    )
}

export default SendEmailsLeft;
