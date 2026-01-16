import React from 'react'
import SendEmailsLeft from './SendEmails_Components/SendEmailsLeft'
import SendEmailsRight from './SendEmails_Components/SendEmailsRight'
import { useState } from 'react'

const SendEmails = () => {
    const [html, setHtml] = useState(null)
    return (
        <div className='w-[80vw] h-[85vh] flex items-start justify-center mx-[10vw] mt-[11vh] gap-[2vw] mb-[9vh]'>
        <SendEmailsLeft html = {html} setHtml = {setHtml}/>
        <SendEmailsRight html = {html} setHtml = {setHtml}/>
        </div>
    )
}

export default SendEmails
