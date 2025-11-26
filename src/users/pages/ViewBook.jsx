import React, { useState } from 'react'
import Header from '../../common/components/Header'
import Footer from '../../common/components/Footer'
import { FaBackward, FaRegEye } from 'react-icons/fa'

function ViewBook() {

  const [modalOpen, setModalOpen] = useState(false)

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
              <img className='w-full h-100' src="https://m.media-amazon.com/images/I/81tFwEZOFcL.jpg" alt="" />
            </div>
            <div className='px-4'>
              <h1 className='text-center font-medium text-2xl'>Crooked Plow</h1>
              <p className='text-center text-blue-500'>Itamar Vietra Juniot (Author) </p>
              <div className='md:flex justify-between mt-10'>
                <p>Publisher :</p>
                <p>Language :</p>
                <p>No of Pages :</p>
              </div>
              <div className='md:flex justify-between mt-10'>
                <p>Seller Mail : </p>
                <p>Real Price :</p>
                <p>ISBN : </p>
              </div>
              <p className='text-justify mt-10'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi provident minima consectetur magni dignissimos suscipit ratione dolorum officiis minus nemo, et ab, a iusto dolores modi, labore eligendi adipisci explicabo.</p>
              <div className='mt-10 flex justify-end'>
                <button className=' flex px-4 py-3 bg-blue-800  text-white hover:bg-white hover:text-blue-800 hover:border hover:border-blue-800 me-2 '><FaBackward className='mt-1 me-1' />Back</button>
                <button className='px-4 py-3 bg-green-800 text-white hover:bg-white hover:text-green-800 hover:border hover:border-green-800 '>Buy ₹</button>
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
                  <img height={"250px"} width={"250px"} src="https://images.meesho.com/images/products/222954241/dqnsc_512.webp?width=512" alt="noimage" className='mx-2 md:mb-0 mb-2' />
                  <p className='font-bold text-red-700'>User uploaded book images are unavailable...</p>
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