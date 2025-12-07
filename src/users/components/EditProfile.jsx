import React, { useContext, useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import serverURL from '../../services/serverURL'
import { toast } from 'react-toastify'
import { editProfileAPI } from '../../services/allAPI'
import { userProfileUpdate } from '../../context/ContextShare'

function EditProfile() {
    const [offCanvas, setOffCanvas] = useState(false)
    const [token, setToken] = useState("")
    const [userDetails, setUserDetails] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        bio: "",
        profile: "",
        role: ""
    })
    const [existingProfile, setExistingProfile] = useState("")
    const [preview, setPreview] = useState("")

    const {setUpdateProfileStatus} = useContext(userProfileUpdate)


    // console.log(userDetails);
    // console.log(existingProfile);

    const handleUploadImage = (e) => {
        setUserDetails({ ...userDetails, profile: e.target.files[0] })
        const url = URL.createObjectURL(e.target.files[0])
        setPreview(url)
    }

    const handleReset = () => {
        const user = JSON.parse(sessionStorage.getItem("exisitingUser"))
        setUserDetails({ username: user.username, password: user.password, confirmPassword: user.password, bio: user.bio })
        setExistingProfile(user.profile)
        setPreview("")
    }

    const handleUpdate = async () => {
        const { username, password, confirmPassword, bio, profile } = userDetails
        if (!username || !password || !confirmPassword || !bio) {
            toast.info("Fill all the required fields")
        }
        else {
            if (password === confirmPassword) {

                //reqHeader
                const reqHeader = {
                    "Authorization": `Bearer ${token}`
                }
                const reqBody = new FormData() //bcz of req.file only work if u send form data
                if (preview) {
                    for (let key in userDetails) {
                        reqBody.append(key, userDetails[key]) //append everthyng in userdetails
                    }

                    try {
                        const result = await editProfileAPI(reqBody, reqHeader)
                        console.log(result);

                        sessionStorage.setItem("exisitingUser", JSON.stringify(result.data))

                        if (result.status == 200) {
                            toast.success("User Profile Updated Successfully")
                            setOffCanvas(false)
                            setUpdateProfileStatus(result)
                        }
                        else if (result.status == 400) {
                            toast.warning(result.response.data)
                        }
                        else {
                            toast.error("Error in updating profile")
                        }
                    } catch (error) {
                        console.log(error);

                    }

                }
                else {
                    const result = await editProfileAPI({ username, password, bio, profile: existingProfile }, reqHeader)
                    console.log(result);

                    sessionStorage.setItem("exisitingUser", JSON.stringify(result.data))

                    if (result.status == 200) {
                        toast.success("User Profile Updated Successfully")
                        setOffCanvas(false)
                        setUpdateProfileStatus(result)
                    }
                    else if (result.status == 400) {
                        toast.warning(result.response.data)
                    }
                    else {
                        toast.error("Error in updating profile")
                    }
                }

            }
            else {
                toast.info("Password do not match")
            }
        }
    }

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
            const user = JSON.parse(sessionStorage.getItem("exisitingUser"))
            setUserDetails({ username: user.username, password: user.password, confirmPassword: user.password, bio: user.bio })
            setExistingProfile(user.profile)
        }
    }, [])

    return (
        <div>
            <button onClick={() => setOffCanvas(true)} className='flex px-4 py-3 font-bold border border-blue-200 text-blue-800 '><FaEdit className='mt-1 me-2' />Edit
            </button>

            {offCanvas && <div>
                <div className='fixed inset-0 bg-gray-500/75 w-full h-full'></div>
                <div className='bg-white h-full w-100 z-50 fixed top-0 left-0'>
                    <div className='bg-gray-900 px-3 py-4 flex justify-between text-white text-2xl'>
                        <h1>Edit Your Profile</h1>
                        <button onClick={() => setOffCanvas(false)}>X</button>
                    </div>

                    <div className='flex justify-center items-center flex-col my-5'>
                        <label htmlFor="profilePic">
                            <input onChange={(e) => handleUploadImage(e)} id='profilePic' type="file" style={{ display: "none" }} />
                            {existingProfile == "" ? <img width={"150px"} height={"150px"} style={{ borderRadius: "50%" }} src={preview ? preview : "https://st.depositphotos.com/1537427/3571/v/450/depositphotos_35716051-stock-illustration-user-icon-vector.jpg"} alt="" />
                                : <img width={"150px"} height={"150px"} style={{ borderRadius: "50%" }} src={preview ? preview : `${serverURL}/imgUploads/${existingProfile}`} alt="" />}

                        </label>
                    </div>

                    <div className='mt-10 mb-3 w-full px-5'>
                        <input value={userDetails.username} onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} type="text" placeholder='Username' className='w-full border border-gray-100 placeholder-gray-500 p-2 rounded' />
                    </div>
                    <div className='mt-10 mb-3 w-full px-5'>
                        <input value={userDetails.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} type="text" placeholder='Password' className='w-full border border-gray-100 placeholder-gray-500 p-2 rounded' />
                    </div>
                    <div className='mt-10 mb-3 w-full px-5'>
                        <input value={userDetails.confirmPassword} onChange={(e) => setUserDetails({ ...userDetails, confirmPassword: e.target.value })} type="text" placeholder='Confirm Password' className='w-full border border-gray-100 placeholder-gray-500 p-2 rounded' />
                    </div>
                    <div className='mt-10 mb-3 w-full px-5'>
                        <textarea value={userDetails.bio} onChange={(e) => setUserDetails({ ...userDetails, bio: e.target.value })} type="text" placeholder='Bio' className='w-full border border-gray-100 placeholder-gray-500 p-2 rounded' />
                    </div>
                    <div className='flex justify-end w-full px-5 mt-10'>
                        <button onClick={handleReset} className='bg-amber-600 text-white rounded border py-3 px-4 hover:text-amber-600 hover:border-amber-600 hover:bg-white'>Reset</button>
                        <button onClick={handleUpdate} className='bg-green-600 text-white rounded border py-3 px-4 hover:text-green-600 hover:border-green-600 hover:bg-white ms-3'>Update</button>
                    </div>
                </div>

            </div>}
        </div>
    )
}

export default EditProfile