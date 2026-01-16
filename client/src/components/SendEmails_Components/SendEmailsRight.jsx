import React, { useEffect, useState } from 'react';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-monokai";

const SendEmailsRight = ({ html, setHtml }) => {
    const [value, setValue] = useState(html);
    const [mode, setMode] = useState('preview');

    useEffect(() => {
      setValue(html);
    }, [html]);

    useEffect(() => {
      setHtml(value);
    }, [value]);

    return (
        <div className='w-6/10 h-full flex justify-start flex-col items-center gap-[2vh]'>
            <div className='flex justify-center flex-col items-center mt-[5vh]'>
                <h1 className='text-xl mx-[2vw] font-mono'><span className='italic font-bold'>Preview </span>or<span className='italic font-bold'> Edit </span>your Generated Email.</h1>
            </div>
            <div className='w-9/10 h-84/100'>
                <div className='w-1/2 flex'>
                    <button className='bg-blue-400 px-[1vw] border border-b-0 border-black font-thin rounded-tl-2xl' onClick={() => { setMode('preview') }}>Preview</button>
                    <button className='bg-blue-400 px-[1vw] border border-black font-thin border-l-0 border-b-0 rounded-tr-2xl' onClick={() => { setMode('code') }}>Code</button>
                </div>
                <div className='w-full h-20/21 border bg-white'>
                    {mode === 'preview' ? (
                        <iframe
                            srcDoc={value}
                            style={{ width: "100%", height: "100%", border: "none" }}
                            title="preview"
                        />
                    ) : (
                        <AceEditor
                            mode="html"
                            theme="monokai"
                            value={value}
                            onChange={setValue}
                            width="100%"
                            height="100%"
                            wrapEnabled={true}
                            setOptions={{
                                tabSize: 1,
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default SendEmailsRight;
