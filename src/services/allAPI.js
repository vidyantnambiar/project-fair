import { commonAPI } from "./commonAPI"
import { BASE_URL } from "./baseurl"


//1) register user
export const registerAPI = async (user) => {
    return await commonAPI("POST", `${BASE_URL}/user/register`, user, "")
}

//2) login user 
export const loginAPI = async (user) => {
    return await commonAPI("POST", `${BASE_URL}/user/login`, user, "")
}

//3) Add Project
export const addprojectAPI = async (reqBody, reqHeader) => {
    return await commonAPI("POST", `${BASE_URL}/project/add`, reqBody, reqHeader)
}

//4) get home projects
export const homeProjectAPI = async () => {
    return await commonAPI("GET", `${BASE_URL}/project/home-project`, "", "")
}

//5) get all projects
// here we are sending searchkey as query parameter
// syntsx path?key=value
export const allProjectAPI = async (searchkey, reqHeader) => {
    return await commonAPI("GET", `${BASE_URL}/project/all-project?search=${searchkey}`, "", reqHeader)
}

//6) get user projects
export const userProjectAPI = async (reqHeader) => {
    return await commonAPI("GET", `${BASE_URL}/project/user-project`, "", reqHeader)
}

//7) edit project
export const editUserProjectAPI = async (projectId, reqBody, reqHeader) => {
    return await commonAPI("PUT", `${BASE_URL}/project/edit/${projectId}`, reqBody, reqHeader)
}

//8) delete project
export const DeleteProjectAPI = async(projectId,reqHeader)=>{
    return await commonAPI("DELETE",`${BASE_URL}/project/remove/${projectId}`,{},reqHeader)
}