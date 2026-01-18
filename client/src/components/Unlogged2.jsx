import React from 'react'
import { Sparkles, Mail, Shield, Zap, Lock, DollarSign } from 'lucide-react'

const Unlogged2 = () => {
    return (
        <div className='w-[95vw] bg-blue-50 flex flex-col items-center gap-[4vh] py-[4vh] mb-[4vh]'>
            {/* Our Services Section */}
            <div className='w-[80vw] flex flex-col items-center'>
                <h1 className='text-2xl font-mono mb-[3vh]'>Our Services</h1>
                <div className='w-full flex items-stretch justify-center gap-[2vw]'>
                    {/* Service 1: AI Email Generation */}
                    <div className='w-3/10 bg-white border-[0.5px] p-[2vw] shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center'>
                        <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4'>
                            <Sparkles className='text-red-400' size={32} />
                        </div>
                        <h2 className='text-lg mb-2'>AI-Powered Generation</h2>
                        <p className='text-sm font-mono text-gray-600'>
                            Generate professional HTML emails instantly using Gemini AI. Just describe what you want — get both subject line and beautifully designed email body. No coding required.
                        </p>
                    </div>

                    {/* Service 2: Bulk Email */}
                    <div className='w-3/10 bg-white border-[0.5px] p-[2vw] shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center'>
                        <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4'>
                            <Mail className='text-blue-600' size={32} />
                        </div>
                        <h2 className='text-lg mb-2'>Smart Bulk Emails</h2>
                        <p className='text-sm font-mono text-gray-600'>
                            Send to multiple recipients at once with personalized attachments. Our smart matching automatically sends the right file to the right person based on their email.
                        </p>
                    </div>

                    {/* Service 3: Secure SMTP */}
                    <div className='w-3/10 bg-white border-[0.5px] p-[2vw] shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center'>
                        <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4'>
                            <Shield className='text-green-600' size={32} />
                        </div>
                        <h2 className='text-lg mb-2'>Secure SMTP Integration</h2>
                        <p className='text-sm font-mono text-gray-600'>
                            Use your own Gmail with App Password. Your credentials are encrypted with AES-256 and auto-expire after 4 hours. Emails sent from YOUR address, not a generic sender.
                        </p>
                    </div>
                </div>
            </div>

            {/* Why Us Section */}
            <div className='w-[80vw] flex flex-col items-center mt-[2vh]'>
                <h1 className='text-2xl font-mono mb-[3vh]'>Why Choose Us?</h1>
                <div className='w-full bg-white border-[0.5px] p-[3vw] shadow-md'>
                    <div className='grid grid-cols-3 gap-[3vw]'>
                        {/* Reason 1 */}
                        <div className='flex items-start gap-3'>
                            <div className='w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center shrink-0'>
                                <Zap className='text-yellow-600' size={20} />
                            </div>
                            <div>
                                <h3 className='font-semibold mb-1'>Lightning Fast</h3>
                                <p className='text-sm font-mono text-gray-600'>
                                    Generate and send emails in seconds, not hours. No templates to customize, no HTML to write.
                                </p>
                            </div>
                        </div>

                        {/* Reason 2 */}
                        <div className='flex items-start gap-3'>
                            <div className='w-10 h-10 bg-red-100 rounded-full flex items-center justify-center shrink-0'>
                                <Lock className='text-red-600' size={20} />
                            </div>
                            <div>
                                <h3 className='font-semibold mb-1'>Privacy First</h3>
                                <p className='text-sm font-mono text-gray-600'>
                                    We never store your App Password permanently. It's encrypted and auto-deleted after your session.
                                </p>
                            </div>
                        </div>

                        {/* Reason 3 */}
                        <div className='flex items-start gap-3'>
                            <div className='w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0'>
                                <DollarSign className='text-green-600' size={20} />
                            </div>
                            <div>
                                <h3 className=' mb-1'>100% Free</h3>
                                <p className='text-sm font-mono text-gray-600'>
                                    No subscriptions, no hidden fees. Use your own Gmail account — we just help you send better emails.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Comparison */}
                    <div className='mt-[3vh] pt-[2vh] border-t'>
                        <h3 className='font-mono text-center mb-[2vh] text-gray-500'>Co-mailer vs Traditional Email</h3>
                        <div className='flex justify-center gap-[4vw] text-sm'>
                            <div className='text-center'>
                                <p className='font-semibold text-green-600'>✓ AI-generated templates</p>
                                <p className='font-mono text-gray-400 text-xs'>vs manual HTML coding</p>
                            </div>
                            <div className='text-center'>
                                <p className='font-semibold text-green-600'>✓ Smart file matching</p>
                                <p className='font-mono text-gray-400 text-xs'>vs one-by-one attachments</p>
                            </div>
                            <div className='text-center'>
                                <p className='font-semibold text-green-600'>✓ Your email address</p>
                                <p className='font-mono text-gray-400 text-xs'>vs noreply@service.com</p>
                            </div>
                            <div className='text-center'>
                                <p className='font-semibold text-green-600'>✓ Zero learning curve</p>
                                <p className='font-mono text-gray-400 text-xs'>vs hours of setup</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Unlogged2
