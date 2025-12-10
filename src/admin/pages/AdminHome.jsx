import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { FaBook, FaUserGraduate, FaUsers } from 'react-icons/fa'
import { getAllAdminBooksAPI, getAllUsersAPI } from '../../services/allAPI'

function AdminHome() {

  const [allBooks, setAllBooks] = useState([])
  const [token, setToken] = useState("")
  const [allUsers, setAllUsers] = useState([])

  const getAllBooks = async () => {
     const reqHeader = {
      'Authorization': `Bearer ${token}`
    }
    try {
      const result = await getAllAdminBooksAPI(reqHeader)
      console.log(result);
      if (result.status == 200) {
        setAllBooks(result.data.length)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getAllAdminUsers = async () => {
    const reqHeader = {
      'Authorization': `Bearer ${token}`
    }
    try {
      const result = await getAllUsersAPI(reqHeader)
      console.log(result);
      if (result.status == 200) {
        setAllUsers(result.data.length)
      }


    } catch (error) {
      console.log(error);

    }

  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
    }
  }, [])

  useEffect(() => {
    if (token) {
      getAllBooks()
      getAllAdminUsers()
    }

  }, [token])

  return (
    <>
      <AdminHeader />
      <div className='md:grid grid-cols-[1fr_4fr]'>
        <div>
          <AdminSidebar />
        </div>
        <div className='p-4 '>
          <div className='md:grid grid-cols-3 text-white'>

            <div className='px-5'>
              <div className='grid grid-cols-[1fr_3fr] bg-blue-800 rounded p-4'>
                <div className='flex justify-center items-center'><FaBook className='text-3xl' /></div>
                <div className=''>
                  <h1>Total No: of Books : <span className='text-xl'>{allBooks}</span></h1>
                </div>
              </div>
            </div>

            <div className='px-5'>
              <div className='grid grid-cols-[1fr_3fr] bg-green-700 rounded p-4'>
                <div className='flex justify-center items-center'><FaUsers className='text-3xl' /></div>
                <div className=''>
                  <h1>Total No: of Users : <span className='text-xl'>{allUsers}</span></h1>
                </div>
              </div>
            </div>

            <div className='px-5'>
              <div className='grid grid-cols-[1fr_3fr] bg-yellow-700 rounded p-4'>
                <div className='flex justify-center items-center'><FaUserGraduate className='text-3xl' /></div>
                <div className=''>
                  <h1>Total No: of Applicants : <span className='text-xl'>85</span></h1>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  )
}

export default AdminHome