import { getSong } from "../service/home.api.js"
import { useContext } from "react"
import { songContext } from "../home.context.jsx"



export const useSong = () =>{
    const context = useContext(songContext)
    const {song,setSong,loading,setLoading} = context

    const handleGetSong = async ({mood})=>{

        setLoading(true)
        const data = await getSong({mood})
        setSong(data.song)
        setLoading(false)

    }

    return ({
        loading,
        song,
        handleGetSong
    })
}