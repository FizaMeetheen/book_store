import React, { useContext, useEffect, useState } from 'react'
import { FaFacebookSquare, FaInstagramSquare, FaRegUser } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { TiThMenu } from 'react-icons/ti'
import { Link } from 'react-router-dom'
import { userProfileUpdate } from '../../context/ContextShare'
import serverURL from '../../services/serverURL'

function Header() {

    const [listStatus, setListStatus] = useState(false)
    const [dropdownStatus, setDropdownStatus] = useState(false)
    const [token, setToken] = useState("")
    const [username, setUsername] = useState("")
    const [userProfile, setUserProfile] = useState("")

    const { updateProfileStatus } = useContext(userProfileUpdate)

    console.log(userProfile);


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

    return (
        <>
            <div className='grid grid-cols-3 p-3'>
                {/* logo */}
                <div className='flex items-center'>
                    <img width={"50px"} height={"50px"} src="https://img.freepik.com/premium-vector/book-line-art-logo-design-vector-art-illustration_761413-35162.jpg?semt=ais_hybrid&w=740&q=80" alt="" />
                    <h1 className='font-bold text-2xl ms-2 md:hidden'>BOOKSTORE</h1>
                </div>

                <div className='md:flex justify-center items-center hidden '>
                    <h1 className='font-bold text-3xl'>BOOK STORE</h1>
                </div>

                {/* login */}
                <div className='md:flex justify-end items-center hidden'>
                    <FaInstagramSquare className='me-3 text-2xl' />
                    <FaXTwitter className='me-3 text-2xl' />
                    <FaFacebookSquare className='me-3 text-2xl' />

                    {!token ?
                        <Link to={"/login"}><button className='flex justify-between items-center border border-black rounded px-3 py-2 ms-3 hover:bg-black hover:text-white '><FaRegUser className='me-2' />Login</button></Link>
                        :
                        <div className='relative inline-block text-left'>
                            <button onClick={() => setDropdownStatus(!dropdownStatus)} className='w-full flex items-center bg-white px-3 py-2 shadow-xl hover:bg-gray-100'>
                                <img src={userProfile == "" ? "https://st.depositphotos.com/1537427/3571/v/450/depositphotos_35716051-stock-illustration-user-icon-vector.jpg"
                                    : userProfile.startsWith("http") ? userProfile : `${serverURL}/imguploads/${userProfile}`} alt="Profile Pic"
                                    width={"50px"} height={"50px"} style={{ borderRadius: "50%" }} />
                                <p className='ms-2'>{username}</p>
                            </button>
                            {dropdownStatus && <div className='absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg'>
                                <Link to={'/profile'} className='block px-4 py-2 text-sm text-gray-700'>Profile</Link>
                                <Link to={"/login"}> <button className='block px-4 py-2 text-sm text-gray-700'>Logout</button></Link>
                            </div>}
                        </div>}
                </div>

            </div>

            <nav className="w-full bg-gray-900 text-white p-5">
                <div className="flex justify-between items-center md:hidden">
                    {/* Menu icon */}
                    <button onClick={() => setListStatus(!listStatus)}>
                        <TiThMenu className="text-2xl" />
                    </button>

                    {/* Login */}
                    {!token ?
                        <Link to="/login">
                            <button className="flex items-center border border-white rounded px-3 py-2 ms-3 hover:bg-white hover:text-black">
                                <FaRegUser className="me-2" />
                                Login
                            </button>
                        </Link>
                        :
                        <div className="relative inline-block text-left">
                            <button
                                onClick={() => setDropdownStatus(!dropdownStatus)}
                                className="flex items-center bg-white text-black px-3 py-2 rounded-full shadow-md hover:bg-gray-100"
                            >
                                <img
                                    src="https://st.depositphotos.com/1537427/3571/v/450/depositphotos_35716051-stock-illustration-user-icon-vector.jpg"
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full"
                                />
                                <p className="ms-2 font-medium text-sm">{username}</p>
                            </button>

                            {dropdownStatus &&
                                <div className="absolute right-0 mt-2 w-40 rounded-md bg-white shadow-lg py-1 z-20">
                                    <Link
                                        to="/profile"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Profile
                                    </Link>
                                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Logout
                                    </button>
                                </div>
                            }
                        </div>
                    }
                </div>
                <ul className={listStatus ? "flex flex-col" : 'md:flex justify-center items-center hidden'}>
                    <li className='md:mx-4 mt-3 text-xl md:mt-0'><Link to={"/"} className='mx-4'>Home</Link> </li>
                    <li className='md:mx-4 mt-3 text-xl md:mt-0'> <Link to={"/allBooks"} className='mx-4'>Books</Link></li>
                    <li className='md:mx-4 mt-3 text-xl md:mt-0'> <Link to={"/careers"} className='mx-4'>Careers</Link></li>
                    <li className='md:mx-4 mt-3 text-xl md:mt-0'> <Link to={"/contact"} className='mx-4'>Contact</Link></li>
                </ul>
            </nav>


        </>
    )
}

export default Header