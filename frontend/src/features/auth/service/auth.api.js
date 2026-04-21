import axios from "axios"

const api= axios.create({
    baseURL:"http://localhost:4000",
    withCredentials:true
})


export const register = async ({username , email , password}) =>{
    const response = await api.post("/api/v1/registration"),{
        username,
        email,
        password
    }

    return response.data
}

export const login = async ({username, email , password}) =>{
    const response = await api.post("api/v1/login"), {
        username,
        email,
        password
    }

    return response.data
}

export const getMe = async ()=>{
    const response = await api.get("/api/v1/get-me")

    return response.data
}

export const logOut = async ()=>{
    const response = await api.get("/api/v1/logout")

    return response.data
}