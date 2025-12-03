import commonAPI from "./commonAPI"
import serverURL from "./serverURL"


//register
export const registerAPI = async(reqBody)=>{
    return await commonAPI("POST",`${serverURL}/register`,reqBody)
}

//login
export const loginAPI = async(reqBody)=>{
    return await commonAPI("POST",`${serverURL}/login`,reqBody)
}

//get home-book
export const getHomeBookAPI = async()=>{
    return await commonAPI("GET",`${serverURL}/home-books`)
}

//----------------user------------------------------

//add-book
export const addBookAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${serverURL}/add-book`,reqBody,reqHeader)
}

//get all books
export const getAllBooksAPI = async(searchKey,reqHeader) => {
    return await commonAPI("GET",`${serverURL}/All-books?search=${searchKey}`,"",reqHeader)
}

//get a book
export const getBookAPI = async(id,reqHeader) => {
    return await commonAPI("GET",`${serverURL}/viewBook/${id}`,"",reqHeader)
}

//status of book
export const getBookStatusAPI = async(reqHeader) => {
    return await commonAPI("GET",`${serverURL}/userbooks`,"",reqHeader)
} 

//delete book
export const deleteUserAddedBookAPI = async(id)=>{
    return await commonAPI("DELETE",`${serverURL}/delete-book/${id}`)
}

// get user bought books
export const getPurchaseHistoryAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${serverURL}/purchase-history`,"",reqHeader)
}


