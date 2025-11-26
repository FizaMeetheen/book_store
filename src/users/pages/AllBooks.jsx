import React, { useEffect, useState } from 'react'
import Footer from '../../common/components/Footer'
import Header from '../../common/components/Header'
import { Link } from 'react-router-dom'
import { getAllBooksAPI } from '../../services/allAPI'

function AllBooks() {
  const [token, setToken] = useState("")
  const [allBooks, setAllBooks] = useState([])

  const getAllBooks = async (userToken) => {
    //reqHeader
    const reqHeader = {
      "Authorization": `Bearer ${userToken}`
    }
    const result = await getAllBooksAPI(reqHeader)
    console.log(result);
    setAllBooks(result.data)
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const userToken = sessionStorage.getItem("token")
      setToken(userToken)
      getAllBooks(userToken)
    }

  }, [])


  return (
    <>
      <Header />
      <div className='flex justify-center items-center flex-col my-5'>
        <h1 className='text-4xl font-bold my-5'>Collections</h1>
        <div className='flex my-5'>
          <input type="text" className='p-2 border border-gray-500 text-black w-100 placeholder-gray-500' placeholder='Search By Title' />
          <button className='bg-blue-950 text-white p-2 hover:bg-white hover:text-blue-950 hover:border hover:border-blue-900 '>Search</button>
        </div>
      </div>

      <div className='md:grid grid-cols-4 md:px-20 p-5 mb-10'>
        {/* filter option */}
        <div className='col-span-1'>
          <h1>Filters</h1>
          <div className='mt-5'>
            <input type="radio" id='Literary fiction' />
            <label className='ms-2' htmlFor="Literary fiction" >Literary Fiction</label>
          </div>
        </div>

        <div className='col-span-3'>
          {allBooks.length > 0 ?
            <div className='md:grid grid-cols-4 mt-5 md:mt-0'>
              {allBooks.map((item) => (
                <div className='shadow rounded p-3 mx-4 my-3'>
                  <img width={"100%"} height={"300px"} src={item.ImageUrl} alt="book" />
                  <div className='flex flex-col justify-center items-center'>
                    <h1 className='font-bold mt-3 text-xl'>{item.title}</h1>
                    <p>{item.author}</p>
                    <Link to={"/viewBook"} className="bg-blue-950 text-white p-2 hover:bg-white hover:text-blue-950 hover:border hover:border-blue-950 w-full mt-5 text-center">View Book</Link>
                  </div>
                </div>
              ))
              }
            </div> :
            <p>Loading...........</p>}

          <div className='my-10 flex flex-col  justify-center items-center '>
            <img width={"400px"} src="https://cdn-icons-gif.flaticon.com/17905/17905764.gif" alt="" />
            <p className='font-semibold text-xl mt-5'>Please <Link to={"/login"} className='text-blue-900 font-bold'>Login</Link> to explore more.. </p>

          </div>

        </div>



      </div >

      <Footer />

    </>
  )
}

export default AllBooks