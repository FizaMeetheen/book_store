import React, { useState } from 'react'
import Header from '../../common/components/Header'
import Footer from '../../common/components/Footer'
import { FaArrowUpRightFromSquare, FaLocationDot } from 'react-icons/fa6'
import { IoMdClose } from 'react-icons/io'

function Careers() {

  const [applyStatus , setApplyStatus] = useState(false)
  return (
    <>
      <Header />
      <div className='md:px-40 p-5'>
        <div className='text-center my-5'>
          <h1 className='font-bold text-4xl mb-5 '>Careers</h1>
          <p>Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam hic eius,
            asperiores voluptatibus deleniti facilis quos velit? Voluptate, labore. Eligendi
            voluptatum officiis vitae cum maxime architecto ratione nisi atque aspernatur?
            ipsum dolor sit amet consectetur adipisicing elit. Rem culpa perspiciatis eius commodi
            harum, recusandae quaerat nesciunt non porro quas, iusto qui consequuntur veritatis nemo
            dignissimos tempore hic quidem iste.</p>
        </div>
        <div className='my-10'>
          <h1 className='font-bold text-4xl'>Current Openings</h1>
          <div className='flex my-10 justify-center items-center'>
            <input type="text" className='p-2 border border-gray-500 text-black w-100 placeholder-gray-500' placeholder='Search By Job Role' />
            <button className='bg-blue-950 text-white p-2 hover:bg-white hover:text-blue-950 hover:border hover:border-blue-900 '>Search</button>
          </div>
        </div>

        {/* job listing */}
        <div className='border border-gray-200 p-5 shadow my-5'>
          <div className='flex mb-5'>
            <div className='w-full'>
              <h1 className='text-xl font-bold'>Frontend Developer</h1>
              <hr />
            </div>
            <button onClick={()=>setApplyStatus(true)} className='bg-blue-950 text-white p-3 ms-5 flex items-center'>Apply <FaArrowUpRightFromSquare className='ms-2' /></button>
          </div>
          <p className='flex'><FaLocationDot className='mt-1 me-2' />Kochi</p>
          <p className='text-lg my-2'>Job Type : FULL TIME</p>
          <p className='text-lg my-2'>Salary : 20000 - 30000 / month </p>
          <p className='text-lg my-2'>Qualification : BTech</p>
          <p className='text-lg my-2'>Experience : 2yr </p>
          <p className='text-lg my-2 text-justify'>Description : Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat ducimus atque,
            enim ex odit facere adipisci alias nisi facilis modi quam nostrum cupiditate reiciendis quia vero dolorum tempore.
            Tempora, aperiam.</p>
        </div>
      </div>
      
      {applyStatus &&
        <div className='relative z-10 overflow-y-hidden '>
          <div className='bg-gray-500/25 fixed inset-0'>
            <div className='flex justify-center items-center scroll-auto min-h-screen '>
              <div className='bg-white rounded-2xl md:w-150 w-100'>
                <div className='bg-black text-white flex justify-between items-center p-3'>
                  <h3>Application Form</h3>
                  <button onClick={() => setApplyStatus(false)}><IoMdClose /></button>
                </div>
                <div className='md:grid grid-cols-2 gap-3'>
                  <div className='mt-7 ms-7'>
                    <div className='mb-3'>
                      <input type="text" placeholder='Full Name' className='w-full border p-3 rounded placeholder-gray-400 bg-white text-black' />
                    </div>
                    <div className='mb-3'>
                      <input type="text" placeholder='Email Id' className='w-full border p-3 rounded placeholder-gray-400 bg-white text-black' />
                    </div>
                  </div>
                  <div className='mt-7 me-7'>
                    <div className='mb-3'>
                      <input type="text" placeholder='Qualification' className='w-full border p-3 rounded placeholder-gray-400 bg-white text-black' />
                    </div>
                    <div className='mb-3'>
                      <input type="text" placeholder='Phone' className='w-full border p-3 rounded placeholder-gray-400 bg-white text-black' />
                    </div>
                  </div>
                  <div className='ms-7 me-7  col-span-2'>
                    <div>
                      <textarea name="" id="" placeholder='Cover Letter' className='w-full border p-3 rounded placeholder-gray-400 bg-white text-black'></textarea>
                    </div>
                    <div className=''>
                      <label htmlFor="">Upload Resume</label>
                      <input type="file" name="" id="" className='block w-full border-gray-900 text-gray-400 border rounded cursor-pointer file:bg-gray-700 file:p-2' />
                    </div>
                  </div>
                </div>
                <div className='mt-4 bg-gray-400'>
                  <div className='flex md:justify-end justify-center p-3'>
                  <button className='bg-amber-600 text-white rounded p-2 me-3 hover:border-amber-600 hover:text-amber-600 hover:bg-white'>Reset</button>
                  <button className='bg-green-600 text-white rounded p-2  hover:border-green-600 hover:text-green-600 hover:bg-white ms-3'>Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      <Footer />
    </>
  )
}

export default Careers