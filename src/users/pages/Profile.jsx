import React, { useContext, useEffect, useState } from 'react'
import Header from '../../common/components/Header'
import Footer from '../../common/components/Footer'
import { MdVerified } from 'react-icons/md'
import { addBookAPI, deleteUserAddedBookAPI, getBookStatusAPI, getPurchaseHistoryAPI } from '../../services/allAPI'
import { toast } from 'react-toastify'
import EditProfile from '../components/EditProfile'
import { userProfileUpdate } from '../../context/ContextShare'
import serverURL from '../../services/serverURL'

function Profile() {

  const [sellBooks, setSellBook] = useState(true)
  const [bookStatus, setBookStatus] = useState(false)
  const [purchaseStatus, setPurchaseStatus] = useState(false)
  const [bookDetails, setBookDetails] = useState({
    title: "",
    author: "",
    noofPages: "",
    ImageUrl: "",
    price: "",
    dPrice: "",
    abstract: "",
    publisher: "",
    isbn: "",
    language: "",
    category: "",
    uploadImages: []
  })
  const [preview, setPreview] = useState("")
  const [allUploadImages, setAllUploadImages] = useState([])
  const [token, setToken] = useState("")
  const [username, setUsername] = useState("")
  const [deleteBookStatus, setDeleteBookStatus] = useState(false)
  const [bookStatusDetails, setBookStatusDetails] = useState("")
  const [boughtBooks, setBoughtBooks] = useState("")
  const [userProfile, setUserProfile] = useState("")

  const { updateProfileStatus } = useContext(userProfileUpdate)

  const handleReset = () => {
    setBookDetails({
      title: "",
      author: "",
      noofPages: "",
      ImageUrl: "",
      price: "",
      dPrice: "",
      abstract: "",
      publisher: "",
      isbn: "",
      language: "",
      category: "",
      uploadImages: []
    })
  }

  const handleFile = (e) => {
    console.log(e.target.files[0]);
    const fileArray = bookDetails.uploadImages
    fileArray.push(e.target.files[0])
    setBookDetails({ ...bookDetails, uploadImages: fileArray })

    // convert files into url
    const url = URL.createObjectURL(e.target.files[0])
    setPreview(url)
    let images = allUploadImages
    images.push(url)
    setAllUploadImages(images)

  }

  const handleAddBook = async () => {
    const { title, author, noofPages, ImageUrl, price, dPrice,
      abstract, publisher, isbn, language,
      category, uploadImages } = bookDetails
    if (!title || !author || !noofPages || !ImageUrl || !price || !dPrice
      || !abstract || !publisher || !isbn || !language
      || !category || uploadImages.length == 0) {
      toast.info("Fill all the required fields")
    }
    else {
      //reqHeader
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }

      //reqBody - formdata() - //append - reqBody.append(key,value) //
      const reqBody = new FormData()

      for (let key in bookDetails) {
        if (key != "uploadImages") {
          reqBody.append(key, bookDetails[key])
        }
        else {
          bookDetails.uploadImages.forEach((img) => {
            reqBody.append("uploadImages", img)
          })
        }
      }


      try {
        const result = await addBookAPI(reqBody, reqHeader)
        console.log(result);
        if (result.status == 200) {
          toast.success("Book Added Successfully")

        }
        else if (result.status == 401) {
          toast.warning(result.response.data)
        }
        else {
          toast.error("Error in adding Book")
        }


      } catch (error) {
        toast.error("Something went wrong")

      }

    }
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
    }
    if (sessionStorage.getItem("exisitingUser")) {
      const name = JSON.parse(sessionStorage.getItem("exisitingUser"))
      const profilePic = JSON.parse(sessionStorage.getItem("exisitingUser"))
      setUsername(name.username)
      setUserProfile(profilePic.profile)
    }
  }, [updateProfileStatus])

  const handleUserBook = async () => {
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }

    try {
      const result = await getBookStatusAPI(reqHeader)
      console.log(result.data);
      setBookStatusDetails(result.data)
    } catch (error) {
      console.log(error);

    }
  }

  const handleDeletBook = async (id) => {
    try {
      const result = await deleteUserAddedBookAPI(id)
      console.log(result);

      if (result.status == 200) {
        setDeleteBookStatus(true)
        toast.success("book deleted successfully")
      } else {
        toast.error("something went wrong")
      }

    } catch (error) {
      console.log(error);


    }
  }



  const getPurchaseHistory = async () => {
    try {
      //reqHeader
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      const result = await getPurchaseHistoryAPI(reqHeader)
      console.log(result);
      setBoughtBooks(result.data)
    }
    catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    if (!token) return;
    if (bookStatus == true) {
      handleUserBook()
    }
    getPurchaseHistory()
  }, [token, bookStatus, deleteBookStatus, purchaseStatus])

  return (
    <>
      <Header />
      <div style={{ height: "200px" }} className='bg-black'></div>
      <div style={{ width: "200px", height: "200px", borderRadius: "50%", marginLeft: "70px", marginTop: "-130px" }} className='bg-white p-3' >
        <img width={"200px"} height={"200px"} style={{ borderRadius: "50%" }} src={userProfile == "" ? "https://st.depositphotos.com/1537427/3571/v/450/depositphotos_35716051-stock-illustration-user-icon-vector.jpg"
          : userProfile.startsWith("http") ? userProfile : `${serverURL}/imguploads/${userProfile}`} alt="" />
      </div>
      <div className='md:flex justify-between px-20 mt-5'>
        <div className='flex justify-center items-center'>
          <h1 className='font-bold md:text-4xl text-2xl'>{username} </h1>
          <MdVerified className='text-blue-500 ms-3 text-xl' />
        </div>
        <div>
          <EditProfile />
        </div>
      </div>
      <p className='text-justify p-10'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Fugit fugiat, ipsam ut sapiente incidunt odit non doloremque natus
        at eos minima animi rem veritatis ipsa quaerat rerum suscipit,
        exercitationem molestiae.</p>

      <div className='flex justify-center items-center my-8 font-medium text-lg'>
        <p onClick={() => { setBookStatus(false), setSellBook(true), setPurchaseStatus(false) }} className={sellBooks ? 'text-blue-500 p-4 border-gray-200 border-t border-r border-l cursor-pointer rounded ' : 'p-4 border-b border-gray-200 cursor-pointer '}>Sell Book</p>
        <p onClick={() => { setBookStatus(true), setSellBook(false), setPurchaseStatus(false) }} className={bookStatus ? 'text-blue-500 p-4 border-gray-200 border-t border-r border-l cursor-pointer rounded ' : 'p-4 border-b border-gray-200 cursor-pointer '}>Book Status</p>
        <p onClick={() => { setBookStatus(false), setSellBook(false), setPurchaseStatus(true) }} className={purchaseStatus ? 'text-blue-500 p-4 border-gray-200 border-t border-r border-l cursor-pointer rounded ' : 'p-4 border-b border-gray-200 cursor-pointer '}>Purchase History</p>
      </div>

      {/* Sell Book */}
      {sellBooks &&
        <div className='md:p-20 p-5'>
          <div className='bg-gray-200 md:p-10 p-5 rounded'>
            <h1 className='text-center font-medium text-3xl'>Book Details</h1>
            <div className='md:grid grid-cols-2'>
              <div className='md:my-10 mt-5 px-2'>
                <div className='mb-3'>
                  <input value={bookDetails.title} onChange={(e) => setBookDetails({ ...bookDetails, title: e.target.value })} type="text" className='p-2 bg-white rounded w-full' placeholder='Title' />
                </div>
                <div className='mb-3'>
                  <input value={bookDetails.author} onChange={(e) => setBookDetails({ ...bookDetails, author: e.target.value })} type="text" className='p-2 bg-white rounded w-full' placeholder='Author' />
                </div>
                <div className='mb-3'>
                  <input value={bookDetails.noofPages} onChange={(e) => setBookDetails({ ...bookDetails, noofPages: e.target.value })} type="text" className='p-2 bg-white rounded w-full' placeholder='No: of Pages' />
                </div>
                <div className='mb-3'>
                  <input value={bookDetails.ImageUrl} onChange={(e) => setBookDetails({ ...bookDetails, ImageUrl: e.target.value })} type="text" className='p-2 bg-white rounded w-full' placeholder='Image url' />
                </div>
                <div className='mb-3'>
                  <input value={bookDetails.price} onChange={(e) => setBookDetails({ ...bookDetails, price: e.target.value })} type="text" className='p-2 bg-white rounded w-full' placeholder='Price' />
                </div>
                <div className='mb-3'>
                  <input value={bookDetails.dPrice} onChange={(e) => setBookDetails({ ...bookDetails, dPrice: e.target.value })} type="text" className='p-2 bg-white rounded w-full' placeholder='Discount Price' />
                </div>
                <div className='mb-3'>
                  <textarea value={bookDetails.abstract} onChange={(e) => setBookDetails({ ...bookDetails, abstract: e.target.value })} className='p-2 bg-white rounded w-full' placeholder='abstarct' rows={'8'}>
                  </textarea>
                </div>
              </div>

              <div className='md:my-10 px-2'>
                <div className='mb-3'>
                  <input value={bookDetails.publisher} onChange={(e) => setBookDetails({ ...bookDetails, publisher: e.target.value })} type="text" className='p-2 bg-white rounded w-full' placeholder='Publisher' />
                </div>
                <div className='mb-3'>
                  <input value={bookDetails.language} onChange={(e) => setBookDetails({ ...bookDetails, language: e.target.value })} type="text" className='p-2 bg-white rounded w-full' placeholder='Language' />
                </div>
                <div className='mb-3'>
                  <input value={bookDetails.isbn} onChange={(e) => setBookDetails({ ...bookDetails, isbn: e.target.value })} type="text" className='p-2 bg-white rounded w-full' placeholder='ISBN' />
                </div>
                <div className='mb-3'>
                  <input value={bookDetails.category} onChange={(e) => setBookDetails({ ...bookDetails, category: e.target.value })} type="text" className='p-2 bg-white rounded w-full' placeholder='Category' />
                </div>

                <div className='my-10 mx-20'>
                  {preview ? <img src={preview} alt="" style={{ width: "200px", height: "200px" }} /> :
                    <label htmlFor="uploadBooking">
                      <input onChange={(e) => handleFile(e)} id='uploadBooking' type="file" style={{ display: "none" }} alt='no image' />
                      <img src="https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_640.png" alt="" style={{ width: "200px", height: "200px" }} />
                    </label>
                  }

                  {preview && <div className='mt-10 flex items-center gap-5'>
                    {allUploadImages.map((item) => (<img src={item}
                      alt="" style={{ width: "100px", height: "100px" }} />))
                    }
                    {allUploadImages.length < 3 && <label htmlFor="uploadBooking">
                      <input onChange={(e) => handleFile(e)} id='uploadBooking' type="file" style={{ display: "none" }} alt='no image' />
                      <img src="https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_640.png" alt="" style={{ width: "100px", height: "100px" }} />
                    </label>}

                  </div>}
                </div>

                <div className='flex justify-center items-center mt-10 ' >
                  <button type='button' onClick={handleReset} className='bg-amber-700 text-white px-5 py-3 rounded hover:border hover:border-amber-700 hover:text-amber-700 hover:bg-white'>Reset</button>
                  <button type='button' onClick={handleAddBook} className='bg-green-700 text-white px-5 py-3 rounded hover:border hover:border-green-700 hover:text-green-700 hover:bg-white ms-4'>Submit</button>

                </div>

              </div>


            </div>

          </div>
        </div>}

      {/* Book  Status*/}

      {bookStatus && (
        <div className='p-10 my-20 shadow rounded'>
          {bookStatusDetails?.length > 0 ? (
            bookStatusDetails.map((item, index) => (
              <div key={index} className='bg-gray-400 p-5 rounded mt-4'>
                <div className='md:grid grid-cols-[3fr_1fr]'>
                  <div className='px-4'>
                    <h1 className='text-2xl'>{item.title}</h1>
                    <h2>{item.author}</h2>
                    <h3 className='text-blue-500'>{item.price}</h3>
                    <p>{item.abstract}</p>

                    <div className='flex mt-5'>
                      {item?.status === "pending" ? (
                        <img
                          style={{ width: "70px", height: "70px" }}
                          src="https://www.psdstamps.com/wp-content/uploads/2022/04/round-pending-stamp-png.png"
                          alt="pending"
                        />
                      ) : item?.status === "approved" ? (
                        <img
                          style={{ width: "70px", height: "70px" }}
                          src="https://juststickers.in/wp-content/uploads/2017/08/seal-of-approval.png"
                          alt="approved"
                        />
                      ) : (
                        <img
                          style={{ width: "70px", height: "70px" }}
                          src="https://cdn-icons-png.flaticon.com/512/6188/6188726.png"
                          alt="other"
                        />
                      )}
                    </div>
                  </div>

                  <div className='px-4 mt-4 md:mt-4'>
                    <img
                      src={item.ImageUrl}
                      alt="no image"
                      className='w-full'
                      style={{ height: "250px" }}
                    />
                    <div className='flex justify-end mt-4'>
                      <button
                        onClick={() => handleDeletBook(item?._id)}
                        type='button'
                        className='p-2 rounded bg-red-800 text-white hover:border hover:border-red-800 hover:text-red-800 hover:bg-white'
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            ))
          ) : (
            <div className='flex justify-center items-center flex-col'>
              <img
                src="https://i.pinimg.com/originals/b4/13/34/b41334a036d6796c281a6e5cbb36e4b5.gif"
                alt="no image"
                style={{ width: "200px", height: "200px" }}
              />
              <p className='text-red-600 text-2xl'>No Book Added Yet.</p>
            </div>
          )}
        </div>
      )}


      {/* Sell Book */}
      {purchaseStatus && (
        <div>
          <div className="p-10 my-20 shadow rounded">

            {boughtBooks?.length > 0 ? (
              boughtBooks.map((item) => (
                <div className="bg-gray-400 p-5 rounded mt-4">
                  <div className="md:grid grid-cols-[3fr_1fr]">
                    <div className="px-4">
                      <h1 className="text-2xl">{item.title}</h1>
                      <h2>{item.author}</h2>
                      <h3 className="text-blue-500">{item.price}</h3>
                      <p>{item.abstract}</p>
                    </div>

                    <div className="px-4 mt-4 md:mt-4">
                      <img
                        src={item.ImageUrl}
                        alt="no image"
                        className="w-full"
                        style={{ height: "250px" }}
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center flex-col">
                <img
                  src="https://i.pinimg.com/originals/b4/13/34/b41334a036d6796c281a6e5cbb36e4b5.gif"
                  alt="no image"
                  style={{ width: "200px", height: "200px" }}
                />
                <p className="text-red-600 text-2xl">No Book Added Yet.</p>
              </div>
            )}

          </div>
        </div>
      )}


      <Footer />
    </>
  )
}

export default Profile