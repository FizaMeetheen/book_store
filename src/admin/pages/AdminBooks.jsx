import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { getAllAdminBooksAPI, getAllUsersAPI, updateBookStatusAPI } from '../../services/allAPI'
import serverURL from '../../services/serverURL'

function AdminBooks() {

  const [bookListStatus, setBookListStatus] = useState(true)
  const [userListStatus, setUserListStatus] = useState(false)
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
        setAllBooks(result.data)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const updateBookStatus = async (id) => {
    console.log(id);
    const reqHeader = {
      'Authorization': `Bearer ${token}`
    }
    try {
      const result = await updateBookStatusAPI(id, reqHeader)
      console.log(result);
      getAllBooks()
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
        setAllUsers(result.data)
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
      <div className='md:grid grid-cols-5 gap-2'>
        <div className='col-span-1'>
          <AdminSidebar />
        </div>
        <div className='col-span-4 p-10'>
          <h1 className='text-center text-3xl font-bold'>All Books</h1>
          {/*  */}
          <div className='flex justify-center items-center my-5 font-medium text-lg'>
            <p onClick={() => { setBookListStatus(true), setUserListStatus(false) }} className={bookListStatus ? 'text-blue-500 p-4 border-gray-200 border-t border-r border-l cursor-pointer rounded ' : 'p-4 border-b border-gray-200 cursor-pointer '}>Book List</p>
            <p onClick={() => { setBookListStatus(false), setUserListStatus(true), getAllAdminUsers() }} className={userListStatus ? 'text-blue-500 p-4 border-gray-200 border-t border-r border-l cursor-pointer rounded ' : 'p-4 border-b border-gray-200 cursor-pointer '}>Users</p>
          </div>

          {/* Books List */}

          {bookListStatus &&
            <>
              <div className='md:grid grid-cols-4 w-full my-5'>
                {allBooks.length > 0 ?
                  allBooks?.map((book, index) => (
                    <div className='shadow rounded p-3 m-4'>
                      <img width={"100%"} height={"100px"} src={book?.ImageUrl} alt="" />
                      <div className='flex flex-col justify-center items-center mt-4'>
                        <p>{book?.title}</p>
                        <p>{book?.author}</p>
                        <p>₹ {book?.dPrice} </p>
                        {book?.status == "pending" && <button onClick={() => updateBookStatus(book?._id)} className='w-full mt-3 p-3 rounded border bg-green-700 text-white hover:border hover:border-green-700 hover:bg-white hover:text-green-700'>
                          Approve</button>
                        }

                        {book?.status == "approved" && <div>
                          <img className='mt-5' style={{ width: "50px", borderRadius: "50%" }} src="https://toppng.com/uploads/preview/round-approved-green-postage-stamp-11642625401zch43bcd4q.png" alt="" />
                        </div>}
                      </div>
                    </div>)) :
                  <p className='text-red-500 font-semibold text-center mt-10 text-xl'>No Books Available</p>}
              </div>
            </>}

          {/* Users */}

          {userListStatus && (
            <div className="md:grid grid-cols-3 w-full my-5">
              {allUsers?.length > 0 ? (
                allUsers.map((user, index) => (
                  <div
                    key={index}
                    className="shadow rounded p-2 m-2 bg-gray-200"
                  >
                    <p className="text-red-700 font-bold">
                      ID : {user?._id}
                    </p>

                    <div className="flex items-center mt-3">
                      <img
                        width="100px"
                        height="100px"
                        style={{ borderRadius: "50%" }}
                        src={
                          user?.profile === ""
                            ? "https://st.depositphotos.com/1537427/3571/v/450/depositphotos_35716051-stock-illustration-user-icon-vector.jpg"
                            : `${serverURL}/imgUploads/${user?.profile}`
                        }
                        alt=""
                      />

                      <div className="flex flex-col ml-3 w-full">
                        <p className="text-blue-800 text-lg font-bold">
                          Username : {user?.username}
                        </p>
                        <p className="text-blue-800 text-lg font-bold">
                          Email : {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-red-500 font-semibold text-center mt-10 text-xl">
                  No Users Available
                </p>
              )}
            </div>
          )}




        </div>


      </div>

    </>
  )

}

export default AdminBooks