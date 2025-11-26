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
export const getAllBooksAPI = async(reqHeader) => {
    return await commonAPI("GET",`${serverURL}/All-Books`,"",reqHeader)
}
