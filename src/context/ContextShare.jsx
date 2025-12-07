import React, { createContext, useState } from 'react'

export const userProfileUpdate = createContext()
export const adminProfileUpdate = createContext()

function ContextShare({ children }) {

    const [updateProfileStatus, setUpdateProfileStatus] = useState({})
    const [updateAdminProfileStatus , setupdateAdminProfileStatus] = useState({})
    return (
        <userProfileUpdate.Provider value={{ updateProfileStatus, setUpdateProfileStatus }}>
            <adminProfileUpdate.Provider value = {{updateAdminProfileStatus,setupdateAdminProfileStatus}}>
            {children}
            </adminProfileUpdate.Provider>
        </userProfileUpdate.Provider>
    )
}

export default ContextShare