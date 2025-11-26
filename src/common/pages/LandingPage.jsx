import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { HiMiniMagnifyingGlass } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import { getHomeBookAPI } from '../../services/allAPI'

function LandingPage() {

  const [homeBook, setHomeBook] = useState([])

  const getHomeBooks = async () => {
    const result = await getHomeBookAPI()
    console.log(result);
    setHomeBook(result.data)
  }

  useEffect(() => {
    getHomeBooks()
  })

  return (
    <>
      <Header />
      <>
        {/* landing page */}
        <div style={{ height: "500px" }} className='flex flex-col justify-center items-center bg-[url(https://static.vecteezy.com/system/resources/thumbnails/056/176/571/small/genres-lots-of-books-photo.jpg)] bg-no-repeat bg-cover bg-center'>
          <div className='w-full flex flex-col justify-center items-center  text-white' style={{ height: "500px", backgroundColor: "rgba(0,0,0,0.5)" }} >
            <h1 className='text-5xl font-bold'>Wonderful Gifts</h1>
            <p>Gift your friends and family a book</p>
            <div className='mt-9 flex'>
              <input type="text" placeholder='Search Books' className='bg-white p-3 rounded-3xl placeholder-gray-500 w-100' />
              <HiMiniMagnifyingGlass className='text-gray-500 text-2xl mt-3 ' style={{ marginLeft: "-40px" }} />
            </div>
          </div>
        </div>
        {/* new arrivals */}
        <section className='md:px-40 p-5 flex flex-col justify-center items-center'>
          <h1 className='font-bold text-4xl '>NEW ARRIVALS</h1>
          <h1 className='text-2xl '>Explore our Latest Collections</h1>

          {homeBook.length > 0 ?
            <div className='md:grid grid-cols-4 w-full mt-5'>

              {homeBook.map((item)=>(
              <div className="p-3">
                <div className="shadow p-3 rounded">
                  <img height={"300px"} width={"100%"} src={item.ImageUrl} alt="" />
                  <div className='text-center mt-3'>
                    <p className='font-bold text-2xl'>{item.title}</p>
                    <p className='font-bold text-xl'>{item.author}</p>
                    <p className='font-bold'>{item.price}</p>
                  </div>
                </div>
              </div>
            ))}
            </div>
              :
              <p>Loading...</p>
              }

              <div className='text-center my-5'>
                <Link to={"/allBooks"} ><button className='px-3 py-2 bg-blue-900 text-white hover:border hover:border-blue-900 hover:text-blue-900 hover:bg-white'>Explore More</button></Link>
              </div>

            </section>

        {/* featured authors  */}
          <section>
            <div className='md:flex justify-center items-center bg-gray-100 m-10'>
              <div className='grid md:grid-cols-2 grid-cols-1 p-10'>
                <div className='text-justify'>
                  <div className='text-center mb-3'>
                    <h3 className='text-2xl font-bold'>Featured Authors</h3>
                    <h2 className='text-3xl font-bold'>Captivates with every word</h2>
                  </div>
                  <p className='text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet quae cumque consectetur consequuntur, amet quisquam cum iusto nemo eligendi provident facere praesentium facilis esse. Nostrum ducimus debitis labore possimus. Illo. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat, sit aut commodi, enim corrupti at consectetur aliquam impedit laborum mollitia iste! Accusamus similique architecto culpa quibusdam est odit ipsum repudiandae.
                    <br />
                    <br />
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat officia et consectetur sunt molestiae? Molestiae officia atque dolore similique itaque, distinctio dicta mollitia sint temporibus ab rerum rem doloribus magnam.amet consectetur adipisicing elit. Placeat officia et consectetur sunt molestiae? Molestiae officia atque dolore similique itaque, distinctio dicta mollitia sint temporibus ab rerum rem doloribus magnam. </p>
                </div>
                <div className='flex justify-center items-center'>
                  <img width={"600px"} height={"600px"} className='ms-15' src="https://images.presentationgo.com/2025/04/business-professional-portrait-office.jpg" alt="" />
                </div>
              </div>
            </div>
          </section>
          {/* testmonials */}
          <section>
            <div className='flex flex-col justify-center items-center bg-white m-10'>
              <div className='text-center mb-3'>
                <h2 className='font-bold text-2xl'>TESTIMONALS</h2>
                <h1 className='font-bold text-3xl'>See What Others Are Saying</h1>
              </div>
              <div className='md:grid grid-cols-4 w-full mt-5'>
                <div className='p-3'>
                  <div className='shadow p-3 rounded'>
                    <img className='mx-auto block' style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover" }} src="https://5.imimg.com/data5/SELLER/Default/2023/4/300693935/CF/LD/VU/150763822/ikigai-jpg-500x500.jpg" alt="" />
                    <div className='text-center mt-3'>
                      <p className='font-small text-l'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit facilis natus delectus debitis</p>
                    </div>
                  </div>
                </div>

                <div className='p-3'>
                  <div className='shadow p-3 rounded'>
                    <img className='mx-auto block' style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover" }} src="https://5.imimg.com/data5/SELLER/Default/2023/4/300693935/CF/LD/VU/150763822/ikigai-jpg-500x500.jpg" alt="" />
                    <div className='text-center mt-3'>
                      <p className='font-small text-l'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit facilis natus delectus debitis</p>
                    </div>
                  </div>
                </div>

                <div className='p-3'>
                  <div className='shadow p-3 rounded'>
                    <img className='mx-auto block' style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover" }} src="https://5.imimg.com/data5/SELLER/Default/2023/4/300693935/CF/LD/VU/150763822/ikigai-jpg-500x500.jpg" alt="" />
                    <div className='text-center mt-3'>
                      <p className='font-small text-l'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit facilis natus delectus debitis</p>
                    </div>
                  </div>
                </div>
                <div className='p-3'>
                  <div className='shadow p-3 rounded'>
                    <img className='mx-auto block' style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover" }} src="https://5.imimg.com/data5/SELLER/Default/2023/4/300693935/CF/LD/VU/150763822/ikigai-jpg-500x500.jpg" alt="" />
                    <div className='text-center mt-3'>
                      <p className='font-small text-l'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit facilis natus delectus debitis</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </>

        <Footer />

      </>
      )
}

      export default LandingPage