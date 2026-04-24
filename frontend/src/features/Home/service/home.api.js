import axios from "axios"


const api = axios.create({
    baseURL:"http://localhost:4000",
    withCredentials:true
})


export const getSong = async ({mood}) =>{
    const response =await api.get(`/api/v1/song?mood=${mood}`)
    return response.data
}


