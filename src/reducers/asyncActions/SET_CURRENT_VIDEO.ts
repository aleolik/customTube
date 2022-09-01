import { AnyAction } from "@reduxjs/toolkit"
import { collection, getDocs, query, where } from "firebase/firestore"
import { database } from "../../config"
import { AppDispatch } from "../../store/store"
import { UserReducer } from "../User"
import { videoReducer } from "../VideoReducer"

// async function that sets state.video.video to videoObj,then add it to state.video.watched array
export const SET_CURRENT_VIDEO = (video_name:string,username:string) => {
    return async (dispatch:AppDispatch)  => {
        //adds video to firebase,gets it from firebase,sets it to user.watched state
        const LOAD_VIDEO_SUCCES = videoReducer.actions.LOAD_VIDEO_SUCCES
        const videoRef = collection(database,'videos')
        const q = query(videoRef,where('video.name','==',`${video_name}`))
        try{
            const videos = await getDocs(q) 
            videos.forEach((video) => {
            if (video.data().video.user.username === username){
                const videoObj = video.data().video
                dispatch(LOAD_VIDEO_SUCCES(videoObj))
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