import React, { useEffect, useState } from 'react'
import Footer from '../../common/components/Footer'
import Header from '../../common/components/Header'
import { Link } from 'react-router-dom'
import { getAllBooksAPI } from '../../services/allAPI'

function AllBooks() {
  const [token, setToken] = useState("")
  const [allBooks, setAllBooks] = useState([])
  const [allCategory, setAllCategory] = useState([])
  const [TempBooks, setTempBooks] = useState([])
  const [ searchKey , setSearchKey] = useState("")

  const getAllBooks = async (userToken) => {
    //reqHeader
    const reqHeader = {
      "Authorization": `Bearer ${userToken}`
    }
    const result = await getAllBooksAPI(searchKey,reqHeader)
    console.log(result);
    setAllBooks(result.data)
    setTempBooks(result.data)
    const TempCategory = result.data.map((item) => item.category)
    setAllCategory([...new Set(TempCategory)]) //ignore duplications - Set()
  } 

  const categoryFilter = (category) => {
    if(category == "no filter"){
      setAllBooks(TempBooks)
    }
    else{
      setAllBooks(TempBooks.filter((item)=>item.category.toLowerCase() == category.toLowerCase()))
    }
  }

   useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const userToken = sessionStorage.getItem("token")
      setToken(userToken)
      getAllBooks(userToken)
    }

  }, [searchKey])

  return (
    <>
      <Header />
      <div className='flex justify-center items-center flex-col my-5'>
        <h1 className='text-4xl font-bold my-5'>Collections</h1>
        <div className='flex my-5'>
          <input  onChange={(e)=> setSearchKey(e.target.value)} type="text" className='p-2 border border-gray-500 text-black w-100 placeholder-gray-500' placeholder='Search By Title' />
          <button  onClick={() => getAllBooks(token)}  className='bg-blue-950 text-white p-2 hover:bg-white hover:text-blue-950 hover:border hover:border-blue-900 '>Search</button>
        </div>
      </div>

      <div className='md:grid grid-cols-4 md:px-20 p-5 mb-10'>
        {/* filter option */}
        <div className='col-span-1'>
          <h1>Filters</h1>
          <div className='mt-5'>
            {allCategory.map((item, index) => (
              <div key={index} onClick={()=>categoryFilter(item)}>
                <input type="radio" id={item} name="filter" />
                <label className='ms-2' htmlFor={item} >{item}</label>
              </div>
            ))}

            <div onClick={()=>categoryFilter("no filter")}>
              <input type="radio" id="no filter" name="filter" />
              <label className='ms-2' htmlFor="no filter" >nofilter</label>
            </div>

          </div>
        </div>

        {token ? <>
          <div className='col-span-3'>
            {allBooks.length > 0 ?
              <div className='md:grid grid-cols-4 mt-5 md:mt-0'>
                {allBooks.map((item, index) => (
                  <div key={index} className='shadow rounded p-3 mx-4 my-3'>
                    <img width={"100%"} height={"300px"} src={item.ImageUrl} alt="book" />
                    <div className='flex flex-col justify-center items-center'>
                      <h1 className='font-bold mt-3 text-xl'>{item.title}</h1>
                      <p>{item.author}</p>
                      <Link to={`/viewBook/${item?._id}`} className="bg-blue-950 text-white p-2 hover:bg-white hover:text-blue-950 hover:border hover:border-blue-950 w-full mt-5 text-center">View Book</Link>
                    </div>
                  </div>
                ))
                }
              </div> :
              <p className='text-red-500 text-3xl mt-10'>No Books Available...........</p>}



          </div>
        </>
          :
          <div className='my-10 flex flex-col  justify-center items-center '>
            <img width={"400px"} src="https://cdn-icons-gif.flaticon.com/17905/17905764.gif" alt="" />
            <p className='font-semibold text-xl mt-5'>Please <Link to={"/login"} className='text-blue-900 font-bold'>Login</Link> to explore more.. </p>

          </div>
        }



      </div >

      <Footer />

    </>
  )
}

export default AllBooks