import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaRegUser } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { userAuthContext } from '../../context/AuthContext'

function AdminHeader() {
  const {setAuthorisedUser} = useContext(userAuthContext)
  const navigate = useNavigate()

  const logout = () => {
    sessionStorage.clear()
    toast.success("logout Successfully")
    setAuthorisedUser(false)
    navigate("/")
  }
  
  return (
    <>
    <nav className='px-5 py-3 flex items-center'>
                {/* logo */}
                <div className='flex items-center'>
                    <img width={"50px"} height={"50px"} src="https://img.freepik.com/premium-vector/book-line-art-logo-design-vector-art-illustration_761413-35162.jpg?semt=ais_hybrid&w=740&q=80" alt="" />
                    <h1 className='font-bold text-2xl ms-4'>BOOKSTORE</h1>
                </div>

                {/* login */}
                <div className='ms-auto'>
                    <Link onClick={logout}><button className='flex justify-between items-center border border-black rounded px-3 py-2  hover:bg-black hover:text-white '><FaRegUser className='me-2' />Login</button></Link>
                </div>

            </nav>

            
    </>
  )
}

export default AdminHeader