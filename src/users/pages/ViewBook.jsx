import React, { useEffect, useState } from 'react'
import Header from '../../common/components/Header'
import Footer from '../../common/components/Footer'
import { FaBackward, FaRegEye } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import { getBookAPI, makePaymentAPI } from '../../services/allAPI'
import serverURL from '../../services/serverURL'
import {loadStripe} from '@stripe/stripe-js';

function ViewBook() {

  const [modalOpen, setModalOpen] = useState(false)
  const [bookDetails,setBookDetails] = useState([])

  const { id } = useParams()

  const getBook = async () => {
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    try {
      const result = await getBookAPI(id,reqHeader)
      console.log(result);
      setBookDetails(result.data)

    } catch (error) {
      console.log(error);

    }
  }

  const handlePurchase = async () => {
    const stripe = await loadStripe('pk_test_51ScgS0IMPKPd4SixYTprNcdpRorAsMfNTlcazDu34IYvcTMx7PYFpyRjqTUvQiy0SLJe9QpOfSk4IekCcb6o3kIW00OMf32QO7');
    console.log(stripe);
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader = {
        "Authorization" : `Bearer ${token}`
      }
      try {
        const result = await makePaymentAPI(bookDetails,reqHeader)
        console.log(result);
        const checkoutSessionUrl = result.data.checkoutSessionUrl
        if(checkoutSessionUrl){
          window.location.href = checkoutSessionUrl
        }
      } catch (error) {
        console.log(error); 
      }
    }
  }

  useEffect(() => {
    getBook()
  }, [])


  return (
    <>
      <Header />
      <div className='md:p-20 p-5'>
        <div className='shadow w-full md:p-10 p-5'>
          <div className='flex justify-end'>
            <FaRegEye onClick={() => setModalOpen(true)} />
          </div>
          <div className='md:grid grid-cols-[1fr_3fr] w-full '>
            <div>
              <img className='w-full h-100' src={bookDetails?.ImageUrl} alt="" />
            </div>
            <div className='px-4'>
              <h1 className='text-center font-medium text-2xl'>{bookDetails?.title}</h1>
              <p className='text-center text-blue-500'>{bookDetails?.author} (Author) </p>
              <div className='md:flex justify-between mt-10'>
                <p>Publisher : {bookDetails?.publisher}</p> 
                <p>Language : {bookDetails?.language}</p>
                <p>No of Pages : {bookDetails?.noofPages}</p>
              </div>
              <div className='md:flex justify-between mt-10'>
                <p>Seller Mail :{bookDetails?.userMail} </p>
                <p>Real Price : {bookDetails?.price}</p>
                <p>ISBN : {bookDetails?.isbn} </p>
              </div>
              <p className='text-justify mt-10'>{bookDetails?.abstract}</p>
              <div className='mt-10 flex justify-end'>
                <Link to={'/allBooks'} className=' flex px-4 py-3 bg-blue-800  text-white hover:bg-white hover:text-blue-800 hover:border hover:border-blue-800 me-2 '><FaBackward className='mt-1 me-1' />Back</Link>
                <button onClick={handlePurchase} type='button' className='px-4 py-3 bg-green-800 text-white hover:bg-white hover:text-green-800 hover:border hover:border-green-800 '>Buy ₹</button>
              </div>
            </div>

          </div>

        </div>

      </div>

      {modalOpen &&
        <div className='relative z-10 overflow-y-hidden'>
          <div className='bg-gray-500/75 fixed inset-0'>
            <div className='flex justify-center items-center min-h-screen scroll-auto'>
              <div className='bg-white rounded-2xl md:w-250 w-100'>
                <div className='bg-black text-white flex justify-between items-center p-3'>
                  <h1>Book Images</h1>
                  <button onClick={() => setModalOpen(false)} className=''>X</button>
                </div>
                <div className='relative p-5'>
                  <p className='text-blue-600'>Camera clicks of the book in the hand of seller</p>
                </div>
                <div className='md:flex flex-wrap my-4 overflow-y-hidden'>
                  {bookDetails?.uploadImages.length > 0 ?
                  bookDetails?.uploadImages?.map(img=>(
                   <img height={"250px"} width={"250px"} src={`${serverURL}/imgUploads/${img}`} alt="noimage" className='mx-2 md:mb-0 mb-2' />
                  ))

                  : <p className='font-bold text-red-700'>User uploaded book images are unavailable...</p>}
                </div>
              </div>
            </div>
          </div>
        </div>}
      <Footer />

    </>
  )
}

export default ViewBook