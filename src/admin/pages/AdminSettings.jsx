import React, { useContext, useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import Footer from '../../common/components/Footer'
import { updateAdminProfileAPI } from '../../services/allAPI'
import { toast } from 'react-toastify'
import serverURL from '../../services/serverURL'
import { adminProfileUpdate } from '../../context/ContextShare'

function AdminSettings() {

  const [token, setToken] = useState("")
  const [adminDetails, setAdminDetails] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    profile: ""
  })
  const [existingProfile, setExistingProfile] = useState("")
  const [preview, setPreview] = useState("")
  const { setupdateAdminProfileStatus} = useContext(adminProfileUpdate)

  console.log(adminDetails);
  console.log(existingProfile);

  const handleReset = () => {
    let user = JSON.parse(sessionStorage.getItem("exisitingUser"))
    setAdminDetails({ ...adminDetails, username: user.username, password: user.password, confirmPassword: user.password })
    setExistingProfile(user.profile)
  }

  const handleFile = (e) => {
    setAdminDetails({ ...adminDetails, profile: e.target.files[0] })
    setPreview(URL.createObjectURL(e.target.files[0]))

  }

  const handleSubmit = async () => {
    const { username, password, confirmPassword } = adminDetails
    if (!username || !password || !confirmPassword) {
      toast.info("Fill the details completely")
    }
    else {
      if (password != confirmPassword) {
        toast.warning("Invalid Credentials")
      }
      else {
        const reqHeader = {
          'Authorization': `Bearer ${token}`
        }
        if (preview) {
          const reqBody = new FormData()
          for (let key in adminDetails) {
            reqBody.append(key, adminDetails[key])
          }

          const result = await updateAdminProfileAPI(reqBody, reqHeader)
          console.log(result);
          if (result.status == 200) {
            toast.success("Profile Updated Succesfully")
            sessionStorage.setItem("exisitingUser", JSON.stringify(result.data))
            setupdateAdminProfileStatus(result)
          } else {
            toast.error("Something went wrong")
          }

        } else {
          const result = await updateAdminProfileAPI({ username, password, profile: existingProfile }, reqHeader)
          console.log(result);
          if (result.status == 200) {
            toast.success("Profile Updated Succesfully")
            sessionStorage.setItem("exisitingUser", JSON.stringify(result.data))
            setupdateAdminProfileStatus(result)


          } else {
            toast.error("Something went wrong")
          }

        }

      }
    }
  }


  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
      let user = JSON.parse(sessionStorage.getItem("exisitingUser"))
      setAdminDetails({ ...adminDetails, username: user.username, password: user.password, confirmPassword: user.password })
      setExistingProfile(user.profile)
    }
  }, [])

  return (
    <>
      <AdminHeader />
      <div className='md:grid grid-cols-[1fr_4fr]'>
        <div>
          <AdminSidebar />
        </div>
        <div className='p-4'>
          <h1 className='text-3xl text-center font-semibold my-10'>Settings</h1>
          <div className='md:grid grid-cols-2 mt-10'>
            <div className='md:px-10 px-5'>
              <p className='text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum,
                praesentium aperiam. Ut a voluptatibus eveniet, maiores explicabo, necessitatibus tenetur tempore
                ipsa placeat amet exercitationem voluptates labore veniam assumenda magni porro
                dignissimos, sed obcaecati fugiat! Officiis laboriosam, exercitationem
                necessitatibus ipsam perferendis cum at quidem, minima rerum nemo error eum
                cupiditate neque consequuntur esse ratione quas? Quisquam corrupti quia alias,
                laudantium voluptates minus. </p>
              <p className='text-justify mt-10'>In quod rerum possimus excepturi ducimus magnam.
                Dolorum provident architecto voluptas, rem necessitatibus eius quis minima itaque saepe porro
                quam eveniet quo error dignissimos officia assumenda esse placeat labore! Voluptatum,
                ea distinctio. Fuga, quod. Beatae totam iusto culpa officiis! Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Debitis ad veritatis corporis, aliquam fugiat in
                delectus doloribus at quibusdam eius molestiae quod perferendis voluptatem
                velit unde ab iure laboriosam et?</p>
            </div>

            <div className='md:px-10 px-5'>
              <form className='bg-blue-200 md:p-10 p-5 rounded my-10 md:my-0'>
                <div className='flex justify-center items-center my-10'>
                  <label htmlFor="editUserProfile">
                    <input onChange={(e) => handleFile(e)} type="file" id='editUserProfile' style={{ display: "none" }} />
                    {existingProfile == "" ? <img src={preview ? preview : "https://st.depositphotos.com/1537427/3571/v/450/depositphotos_35716051-stock-illustration-user-icon-vector.jpg"} alt=""
                      style={{ width: "170px", height: "170px", borderRadius: "50%" }} />
                      : <img src={preview ? preview : `${serverURL}/imgUploads/${existingProfile}`} alt=""
                        style={{ width: "170px", height: "170px", borderRadius: "50%" }} />
                    }
                  </label>
                </div>
                <div className='mb-3'>
                  <label htmlFor="">Username</label>
                  <input value={adminDetails?.username} onChange={(e) => setAdminDetails({ ...adminDetails, username: e.target.value })} type="text" placeholder='Username' className='bg-white rounded w-full p-2' />
                </div>
                <div className='mb-3'>
                  <label htmlFor="">Password</label>
                  <input value={adminDetails?.password} onChange={(e) => setAdminDetails({ ...adminDetails, password: e.target.value })} type="text" placeholder='Password' className='bg-white rounded w-full p-2' />
                </div>
                <div className='mb-3'>
                  <label htmlFor="">Confirm Password</label>
                  <input value={adminDetails?.confirmPassword} onChange={(e) => setAdminDetails({ ...adminDetails, confirmPassword: e.target.value })} type="text" placeholder='Confirm Password' className='bg-white rounded w-full p-2' />
                </div>
                <div className='flex justify-between mt-10'>
                  <button onClick={handleReset} type='button' className='bg-amber-600 text-white rounded p-3 w-1/2  hover:border hover:border-amber-600 hover:text-amber-600 hover:bg-white   '>Reset</button>
                  <button onClick={handleSubmit} type='button' className='bg-green-600 text-white rounded p-3 w-1/2 hover:border hover:border-green-600 hover:text-green-600 hover:bg-white ms-1 '>Update</button>
                </div>



              </form>

            </div>

          </div>
        </div>
      </div>

      <Footer />


    </>
  )
}

export default AdminSettings