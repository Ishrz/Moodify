import axios from "axios"

const api= axios.create({
    baseURL:"http://localhost:4000",
    withCredentials:true
})


export const register = async ({username , email , password}) =>{
    const response = await api.post("/api/v1/auth/registration",{
        username,
        email,
        password
    })

    return response.data
}

export const login = async ({username, email , password}) =>{
    const response = await api.post("api/v1/auth/login", {
        username,
        email,
        password
    })

    // console.log(response)
    return response.data
}

export const getMe = async ()=>{
    const response = await api.get("/api/v1/auth/get-me")

    console.log(response.data)
    return response.data
}

export const logOut = async ()=>{
    const response = await api.get("/api/v1/auth/logout")

    return response.data
}