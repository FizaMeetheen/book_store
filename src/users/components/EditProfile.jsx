import React, { useState } from 'react'
import { FaEdit } from 'react-icons/fa'

function EditProfile() {
    const [offCanvas , setOffCanvas] = useState(false)
    return (
        <div>
            <button onClick={()=>setOffCanvas(true)} className='flex px-4 py-3 font-bold border border-blue-200 text-blue-800 '><FaEdit className='mt-1 me-2' />Edit
            </button>

        {offCanvas && <div>
            <div className='fixed inset-0 bg-gray-500/75 w-full h-full'></div>
            <div className='bg-white h-full w-90 z-50 fixed top-0 left-0'>
                <div className='bg-gray-900 px-3 py-4 flex justify-between text-white text-2xl'>
                    <h1>Edit Your Profile</h1>
                    <button onClick={()=>setOffCanvas(false)}>X</button>
                </div>
            </div>

        </div>}
        </div>
    )
}

export default EditProfile