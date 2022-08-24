import { AnyAction } from "@reduxjs/toolkit"
import { collection, getDocs, query, where } from "firebase/firestore"
import { database } from "../../config"
import { AppDispatch } from "../../store/store"
import { UserReducer } from "../User"
import { videoReducer } from "../VideoReducer"


// async function that sets state.video.video to videoObj,then add it to state.video.watched array
export const ADD_VIDEO_TO_WATCHLIST = (video_name:string,username:string) => {
    const ADD_VIDEO_TO_WATCHLIST = UserReducer.actions.ADD_VIDEO_TO_WATCHLIST
    return async (dispatch:AppDispatch)  => {
        console.log('qxwx')
        const LOAD_VIDEO_SUCCES = videoReducer.actions.LOAD_VIDEO_SUCCES
        const videoRef = collection(database,'videos')
        const q = query(videoRef,where('video.name','==',`${video_name}`))
        try{
            const videos = await getDocs(q) 
            videos.forEach((video) => {
            if (video.data().video.user.username === username){
                const videoObj = video.data().video
                dispatch(LOAD_VIDEO_SUCCES(videoObj))
                dispatch(ADD_VIDEO_TO_WATCHLIST(videoObj))
              }
            }
          )
        }
        catch(e){
            let message = 'Unkown error'
            if (e instanceof Error) message = e.message
            console.error(message)
        }
    }
}