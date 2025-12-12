import React, { useContext, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { FaCircleUser } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import { googleLoginAPI, loginAPI, registerAPI } from '../../services/allAPI'
import { toast } from 'react-toastify'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { userAuthContext } from '../../context/AuthContext'

function Auth({ register }) {

  const [showPwd, setShowPwd] = useState(false)
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: ""
  })
  console.log(userDetails);

  const {setAuthorisedUser} = useContext(userAuthContext)

  const navigate = useNavigate()

  //register
  const handleRegister = async () => {
    const { username, email, password } = userDetails
    if (!username || !email || !password) {
      toast.info("Fill the required fields!!")
    }
    else {
      const result = await registerAPI(userDetails)
      console.log(result);
      if (result.status == 200) {
        toast.success("Registered Successfully")
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
        navigate('/login')
      }
      else if (result.status == 404) {
        toast.warning(result.response.data)
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
        navigate('/login')
      }
      else {
        toast.error("Something went wrong!")
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      }

    }
  }

  //login
  const handleLogin = async () => {
    const { email, password } = userDetails
    if (!email || !password) {
      toast.info("FIll the required fields..")
    }
    else {
      const result = await loginAPI(userDetails)
      console.log(result);
      if (result.status == 200) {
        sessionStorage.setItem("exisitingUser", JSON.stringify(result.data.exisitingUser))
        sessionStorage.setItem("token", result.data.token)
        toast.success("Login Successfully")
        setAuthorisedUser(true)
        if (result.data.exisitingUser.role == "admin") {
          navigate('/adminHome')
        }
        else {
          navigate('/')
        }
        setUserDetails({
          email: "",
          password: ""
        })

      }
      else if (result.status == 404) {
        toast.warning(result.response.data)
      }
      else if (result.status == 401) {
        toast.warning(result.response.data)
        setUserDetails({
          email: "",
          password: ""
        })
      }
      else {
        toast.error("Something went wrong")
        setUserDetails({
          email: "",
          password: ""
        })
      }

    }
  }

  //google-login
  const handleGoogleLogin = async (credentialResponse) => {
    console.log(credentialResponse.credential);
    const googleData = jwtDecode(credentialResponse.credential)
    console.log(googleData);
    try {
      const result = await googleLoginAPI({ username: googleData.name, password: "googlepassword", profile: googleData.picture, email: googleData.email })
      console.log(result);
        if (result.status == 200) {
          sessionStorage.setItem("exisitingUser", JSON.stringify(result.data.exisitingUser))
          sessionStorage.setItem("token", result.data.token)
          toast.success("Login Successfully")
          setAuthorisedUser(true)
          if (result.data.exisitingUser.role == "admin") {
            navigate('/adminHome')
          }
          else {
            navigate('/')
          }
          setUserDetails({
            email: "",
            password: ""
          })
        }
        else {
          toast.error("Something went wrong")
          setUserDetails({
            email: "",
            password: ""
          })
        }
    } catch (error) {
      console.log(error);

    }
  }


  return (
    <>
      <div className='w-full min-h-screen flex justify-center items-center flex-col bg-[url(https://e1.pxfuel.com/desktop-wallpaper/721/613/desktop-wallpaper-abstract-login-page.jpg)] bg-no-repeat bg-cover bg-center'>
        <div className='p-10'>
          <h1 className='text-3xl font-bold text-center text-white'>BOOKSTORE</h1>
          <div style={{ width: "400px" }} className='bg-blue-950 text-white p-5 flex flex-col my-5 justify-center items-center'>
            <div style={{ width: "100px", height: "100px", borderRadius: "50%" }} className='border mb-3 flex justify-center items-center'>
              <FaCircleUser className='text-6xl' />
            </div>
            <h1 className='text-2xl'>{register ? "Register" : "Login"}</h1>

            <form action="">
              {register && <div className='my-5'>
                <label htmlFor="">Username</label>
                <input value={userDetails?.username} onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} type="text" placeholder='Username' className='bg-white p-2 w-full rounded mt-2 placeholder-gray-500 text-black' />
              </div>}
              <div className='my-5'>
                <label htmlFor="">Email</label>
                <input value={userDetails?.email} onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} type="email" placeholder='Email' className='bg-white p-2 w-full rounded mt-2 placeholder-gray-500 text-black' />
              </div>
              <div className='my-5'>
                <label htmlFor="">Password</label>
                <div className='flex'>
                  <input value={userDetails?.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} type={showPwd ? "text" : "password"} placeholder='Password' className='bg-white p-2 w-full rounded mt-2 placeholder-gray-500 text-black' />
                  {showPwd ? <button type='button' style={{ marginLeft: "-20px" }} onClick={() => setShowPwd(!showPwd)} className='text-gray-500 cursor-pointer mt-2'><FaEye />  </button> :
                    <button type='button' style={{ marginLeft: "-20px" }} onClick={() => setShowPwd(!showPwd)} className='text-gray-500 cursor-pointer mt-2' ><FaEyeSlash /></button>}
                </div>
              </div>
              <div className='mt-5'>
                <p className='text-xs text-orange-400'>Never share your password with anyone.</p>
              </div>

              <div className='mt-4'>
                {register ? <button onClick={handleRegister} type='button' className='bg-green-700 p-2 w-full rounded'>Register</button> :
                  <button onClick={handleLogin} type='button' className='bg-green-700 p-2 w-full rounded'>Login</button>}

              </div>

              <div>
                {/* Google Authentication */}
                {!register && <div className='mt-3'>
                  <GoogleLogin
                    onSuccess={credentialResponse => {
                      console.log(credentialResponse);
                      handleGoogleLogin(credentialResponse)
                    }}
                    onError={() => {
                      console.log('Login Failed');
                    }}
                  />

                </div>}
              </div>

              <div className='mt-3'>
                {register ? <p>Are you already a user? <Link className='text-blue-400' to={"/login"}>Login</Link></p> :
                  <p>Are you a New User? <Link className='text-blue-400' to={"/register"}>Register</Link></p>}
              </div>
            </form>

          </div>


        </div>

      </div>
    </>
  )
}

export default Auth