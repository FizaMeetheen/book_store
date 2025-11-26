import React, { useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { FaLocationDot } from 'react-icons/fa6'
import { BiTrash } from 'react-icons/bi'
import { Link } from 'react-router-dom'


function AdminCareers() {

  const [jobPostStatus, setJobPostStatus] = useState(true)
  const [ApplicationStatus, setApplicationStatus] = useState(false)

  return (
    <>
      <AdminHeader />
      <div className='md:grid grid-cols-5 gap-2'>
        <div className='col-span-1'>
          <AdminSidebar />
        </div>
        <div className='col-span-4 p-10'>
          <h1 className='text-center text-3xl font-bold'>Careers</h1>
          {/*  */}
          <div className='flex justify-center items-center my-5 font-medium text-lg'>
            <p onClick={() => { setJobPostStatus(true), setApplicationStatus(false) }} className={jobPostStatus ? 'text-blue-500 p-4 border-gray-200 border-t border-r border-l cursor-pointer rounded ' : 'p-4 border-b border-gray-200 cursor-pointer '}>Job Posts</p>
            <p onClick={() => { setJobPostStatus(false), setApplicationStatus(true) }} className={ApplicationStatus ? 'text-blue-500 p-4 border-gray-200 border-t border-r border-l cursor-pointer rounded ' : 'p-4 border-b border-gray-200 cursor-pointer '}>View Application</p>
          </div>

          {/* JOB POSTS */}
          {jobPostStatus &&
            <div className=''>
              <div className='md:flex justify-center items-center my-8 w-full md:px-20 px-5'>
                <div className='md:flex w-full ms-2 md:ms-0 '>
                  <input type="text" placeholder='Search By Title ....' className='border border-gray-200 placeholder-gray-400 p-2 md:w-1/4 w-3/4 ' />
                  <button className='mt-5 md:mt-0 bg-green-700 text-white p-2 rounded md:ms-3 hover:bg-white hover:border hover:border-green-700 hover:text-green-700 '>Search</button>

                </div>
                <div>
                  <button className='bg-blue-800 mt-5 md:mt-0 w-full text-white p-2 rounded md:ms-3 hover:bg-white hover:border hover:border-blue-800 hover:text-blue-800  '>Add Job</button>
                </div>
              </div>

              <div>
                <div className='border border-gray-200 p-5 shadow my-5'>
                  <div className='flex mb-5'>
                    <div className='w-full'>
                      <h1 className='text-xl font-bold'>Frontend Developer</h1>
                      <hr />
                    </div>
                    <button className='bg-red-700 text-white p-3 ms-5 flex items-center'>Delete <BiTrash className='ms-2' /></button>
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
              <p className='text-red-500 font-bold text-xl'>No Job Openings......</p>
            </div>
             
          }

          {/* VIEW APPLICATION */}
          {ApplicationStatus &&

            <div className='p-10'>
              <table className='w-full my-3 shadow'>
                <thead>
                  <tr>
                    <th className='p-3 text-center bg-blue-800 text-white-border border-gray-500'>SI.No</th>
                    <th className='p-3 text-center bg-blue-800 text-white-border border-gray-500'>Job Title</th>
                    <th className='p-3 text-center bg-blue-800 text-white-border border-gray-500'>Name</th>
                    <th className='p-3 text-center bg-blue-800 text-white-border border-gray-500'>Qualification</th>
                    <th className='p-3 text-center bg-blue-800 text-white-border border-gray-500'>E-mail</th>
                    <th className='p-3 text-center bg-blue-800 text-white-border border-gray-500'>Phone</th>
                    <th className='p-3 text-center bg-blue-800 text-white-border border-gray-500'>Cover Letter</th>
                    <th className='p-3 text-center bg-blue-800 text-white-border border-gray-500'>Resume</th>
                  </tr>
                </thead>
                <tr>
                  <td className='border border-gray-500 p-3 text-center'>1</td>
                  <td className='border border-gray-500 p-3 text-center'>Software Engineer</td>
                  <td className='border border-gray-500 p-3 text-center'>Fiza Meetheen D M</td>
                  <td className='border border-gray-500 p-3 text-center'>B.tech</td>
                  <td className='border border-gray-500 p-3 text-center'>fiza@gmail.com</td>
                  <td className='border border-gray-500 p-3 text-center'>9496694843</td>
                  <td className='border border-gray-500 p-3 text-center'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo voluptatum quasi, pariatur sunt quae voluptatem illo quos illum saepe aut reiciendis vitae totam ab? Nulla mollitia voluptatibus cum sint odit?</td>
                  <td className='border border-gray-500 p-3 text-center'><Link className='text-blue-500 underline'>Resume</Link></td>
                </tr>

              </table>

              <p className='text-red-500 font-bold text-xl'>No Applicants are available .....</p>

            </div>
          }
        </div>

      </div>

    </>

  )
}

export default AdminCareers