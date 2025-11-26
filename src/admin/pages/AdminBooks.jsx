import React, { useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'

function AdminBooks() {

  const [bookListStatus, setBookListStatus] = useState(true)
  const [userListStatus, setUserListStatus] = useState(false)

  return (
    <>
      <AdminHeader />
      <div className='md:grid grid-cols-5 gap-2'>
        <div className='col-span-1'>
          <AdminSidebar />
        </div>
        <div className='col-span-4 p-10'>
          <h1 className='text-center text-3xl font-bold'>All Books</h1>
          {/*  */}
          <div className='flex justify-center items-center my-5 font-medium text-lg'>
            <p onClick={() => { setBookListStatus(true), setUserListStatus(false) }} className={bookListStatus ? 'text-blue-500 p-4 border-gray-200 border-t border-r border-l cursor-pointer rounded ' : 'p-4 border-b border-gray-200 cursor-pointer '}>Book List</p>
            <p onClick={() => { setBookListStatus(false), setUserListStatus(true) }} className={userListStatus ? 'text-blue-500 p-4 border-gray-200 border-t border-r border-l cursor-pointer rounded ' : 'p-4 border-b border-gray-200 cursor-pointer '}>Users</p>
          </div>

          {/* Books List */}

          {bookListStatus && <div>
            <div className='md:grid grid-cols-4 w-full my-5'>
              <div className='shadow rounded p-3 m-4'>
                <img width={"100%"} height={"100px"} src="https://m.media-amazon.com/images/I/81tFwEZOFcL.jpg" alt="" />
                <div className='flex flex-col justify-center items-center mt-4'>
                  <p>Book Name</p>
                  <p>Author Name</p>
                  <p>₹ 500 </p>
                  <button className='w-full mt-3 p-3 rounded border bg-green-700 text-white hover:border hover:border-green-700 hover:bg-white hover:text-green-700'>Approve</button>

                </div>
              </div>

            </div>
          </div>}

            {/* Users */}

          {userListStatus &&
            <div className='md:grid grid-cols-3 w-full my-5'>
              <div className='shadow rounded p-2 m-2 bg-gray-200'>
                <p className='text-red-700 font-bold'>ID : 77365 </p>
                <div className='flex items-center mt-3'>
                  <img width={"100px"} height={"100px"} style={{ borderRadius: "50%" }} src="https://st.depositphotos.com/1537427/3571/v/450/depositphotos_35716051-stock-illustration-user-icon-vector.jpg" alt="" />
                  <div className='flex flex-col ml-3 w-full'>
                    <p className='text-blue-800 text-lg text-bold  '>Username :</p>
                    <p className='text-blue-800 text-lg text-bold '>Email :</p>
                  </div>
                </div>


              </div>
              <div>

              </div>
            </div>
          }
        </div>

      </div>

    </>
  )
}

export default AdminBooks