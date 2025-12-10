import React from 'react'
import Header from '../../common/components/Header'
import Footer from '../../common/components/Footer'
import { Link } from 'react-router-dom'

function PaymentSuccess() {
  return (
    <>
    <Header/>
    <div className='grid grid-cols-2 py-20 px-40 justify-center items-center'>
        <div>
            <h1 className='text-6xl text-blue-700'>Congratulations!!</h1>
            <p className='mt-5 mb-10 text-2xl'>Thank you for shopping with BookStore.Hope you have a good time with us.</p>
            <Link to={'/allBooks'} className="font-bold text-xl px-4 py-3 bg-blue-600 text-white hover:border hover:border-blue-600 hover:bg-white hover:text-blue-600">Explore more Books....</Link>
        </div>
        <div>
            <img src="https://funtura.in/wp-content/themes/funtura/assets/images/success.svg" className='w-3/4 mx-30' alt="" />
        </div>

    </div>

    <Footer/>

    </>
  )
}

export default PaymentSuccess