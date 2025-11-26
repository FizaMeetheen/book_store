import React from 'react'
import { BsLinkedin } from 'react-icons/bs'
import { FaArrowRight, FaFacebookSquare, FaInstagramSquare } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

function Footer() {
    return (
        <>
            <div className='md:grid grid-cols-3 md:gap-12 bg-gray-900 text-white p-10'>
                <div className='mb-5'>
                    <h3 className='font-bold'>About Us</h3>
                    <p className='text-justify mt-3'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem aliquam officia quam provident veritatis aut sint omnis exercitationem ullam quasi animi ea accusantium necessitatibus corporis, architecto consequuntur alias, ipsum sapiente?</p>

                </div>

                <div className='mb-5'>
                    <h3 className='font-bold'>NewsLetter</h3>
                    <p className='my-5'> Stay Updated with our latest trends.</p>
                    <div className='flex'>
                        <input type="text" placeholder='Enter your email-id' className='p-2 bg-white placeholder-gray-50' />
                        <button className='bg-yellow-400 p-3'><FaArrowRight/></button>
                    </div>
                </div>

                <div className=''>
                    <h3 className='font-bold'>Follow Us</h3>
                    <p className='my-5'>Let us be Social</p>
                    <div className='flex mt-4'>
                        <FaInstagramSquare className='me-3 text-2xl'/>
                        <FaXTwitter className='me-3 text-2xl'/>
                        <FaFacebookSquare className='me-3 text-2xl'/>
                        <BsLinkedin className=' text-2xl'/>

                    </div>
                </div>

            </div>

            <div className="bg-black p-3 text-center text-white">
                <p>Copyright © 2023 All rights reserved | This website is made with &#10084; by Fiza Meetheen D M | Luminar Technolab  </p>
            </div>
        </>
    )
}

export default Footer