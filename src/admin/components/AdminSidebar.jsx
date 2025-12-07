import React, { useContext, useEffect, useState } from 'react'
import { FaGraduationCap, FaHome } from 'react-icons/fa'
import { IoMdSettings } from 'react-icons/io'
import { PiBooks } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import serverURL from '../../services/serverURL'
import { adminProfileUpdate } from '../../context/ContextShare'

function AdminSidebar() {

    const [adminName , setAdminName] = useState("")
    const [existingProfile,setExistingProfile] = useState("")
    const {updateAdminProfileStatus} = useContext(adminProfileUpdate)

    useEffect(()=>{
        setAdminName(JSON.parse(sessionStorage.getItem("exisitingUser")).username)
        setExistingProfile(JSON.parse(sessionStorage.getItem("exisitingUser")).profile)
    },[updateAdminProfileStatus])

  return (
    <>
    <div className='bg-gray-200 w-full md:min-h-screen flex items-center flex-col'>
        <div className='my-10'>
            <img src={existingProfile == "" ?  "https://st.depositphotos.com/1537427/3571/v/450/depositphotos_35716051-stock-illustration-user-icon-vector.jpg" :`${serverURL}/imgUploads/${existingProfile}` } alt="profile log" style={{width:"170px" , height:"170px" , borderRadius:"50%"}} />
        </div>
        <div>
            <h1 className='text-2xl mb-10'>{adminName}</h1>
            <div className='mb-10'>
                <div className='mb-4 flex '>
                    <input type="radio" id='home' readOnly  />
                    <Link to={'/adminHome'}><label htmlFor="home" className='flex ms-3'><FaHome className='mt-1 me-1' />Home</label></Link>
                </div>
                 <div className='mb-4 flex '>
                    <input type="radio" id='books' readOnly  />
                    <Link to={'/adminBooks'}><label htmlFor="books" className='flex ms-3'><PiBooks className='mt-1 me-1' />Books</label></Link>
                </div>
                 <div className='mb-4 flex '>
                    <input type="radio" id='careers' readOnly  />
                    <Link to={'/adminCareers'}><label htmlFor="careers" className='flex ms-3'><FaGraduationCap className='mt-1 me-1' />Careers</label></Link>
                </div>
                 <div className='mb-4 flex '>
                    <input type="radio" id='settings' readOnly  />
                    <Link to={'/adminSettings'}><label htmlFor="settings" className='flex ms-3'><IoMdSettings className='mt-1 me-1' />Settings</label> </Link>
                </div>

            </div>
        </div>


    </div>
    </>
  )
}

export default AdminSidebar