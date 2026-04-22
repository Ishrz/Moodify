import {createBrowserRouter} from "react-router"
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"
import Protected from "./features/auth/components/Protected"
import HomePage from "./features/auth/pages/HomePage"
export const router = createBrowserRouter([
    {
        path:"/",
        element:<Protected > <HomePage/> </Protected>
    },
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/register",
        element:<Register/>
    }
])