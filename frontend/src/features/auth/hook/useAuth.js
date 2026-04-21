import {login , register ,getMe, logOut } from "../service/auth.api"
import { AuthContext } from "../auth.context"
import {useContext} from "react"


export const useAuth = () =>{
    const {user , setUser , loading , setLoading} = useContext(AuthContext)


    const handleRegister = async ({username,email,password}) =>{
        
        setLoading(true)
        const data = await register({username,email,password})
        setUser(data.user)
        setLoading(false)
    }

    const handleLogin = async ({username,email,password}) =>{
        setLoading(true)
        const data = await login({username,email,password})
        setUser(data.user)
        setLoading(false)
    }

    const handleGetMe = async ()=>{
        setLoading(true)
        const data = await getMe()
        setUser(data.user)
        setLoading(false)
    }

    const handleLogOut = async ()=>{
        setLoading(true)
        const data = await logOut()
        setUser(null)
        setLoading(false)
    }









}