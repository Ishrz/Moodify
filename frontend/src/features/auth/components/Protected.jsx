import { Children } from "react"
import { useAuth } from "../hook/useAuth"
import { Navigate, useNavigate } from "react-router"
import "../style/protected.scss"

const Protected =({children}) => {

    // console.log(children)
    const {loading,user} = useAuth()

    const navigate= useNavigate()
    
    if(loading){

        // {console.log("load from pro loading....")}
        // {console.log(loading)}
        return <h1>Loading......</h1>
        
    }


    // console.log("outise !user")
    // console.log(user)
    if(!user){
        // console.log("inside !user")
        // console.log(user)
        return <Navigate to="/login" />                         
    }
    

  return (
   children
  )
}

export default Protected
