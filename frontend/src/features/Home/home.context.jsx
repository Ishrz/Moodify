import {  createContext, useState } from "react";


export const songContext = createContext()

export const SongContextProvider = ({children}) =>{

    const [song ,setSong] = useState(
        {
        "_id": "69eb8f5b4557c4958bc53c1f",
        "songUrl": "https://ik.imagekit.io/backendTesting/moodify/songs/One_Bottle_Down_-_AllMp3Song.Com_RrB--PxSgg.mp3",
        "posterUrl": "https://ik.imagekit.io/backendTesting/moodify/song_poster/One_Bottle_Down_-_AllMp3Song.Com_8AQ1Efq7M.jpeg",
        "title": "One Bottle Down - AllMp3Song.Com.mp3",
        "mood": "happy",
        "__v": 0
    })
    const [loading , setLoading] = useState(false)




    return(
        <songContext.Provider value={{song,setSong,loading,setLoading}}>
            {children}
        </songContext.Provider>
    )
}