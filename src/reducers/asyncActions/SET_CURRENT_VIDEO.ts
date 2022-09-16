import { AnyAction } from "@reduxjs/toolkit"
import { collection, FieldPath, getDocs, query, where } from "firebase/firestore"
import { database } from "../../config"
import { AppDispatch } from "../../store/store"
import { LoaderRedcuer } from "../LoaderReducer"
import { UserReducer } from "../User"
import { videoReducer } from "../VideoReducer"
import { SET_SOURCE_FILE } from "./SET_SOURCE_FILE"

// async function that sets state.video.video to videoObj,then add it to state.video.watched array
export const SET_CURRENT_VIDEO = (videoID:string,username:string) => {
    const startLoad = LoaderRedcuer.actions.startLoading // starts here,ends in SET_SOURCE_FILE
    return async (dispatch:AppDispatch)  => {
        //adds video to firebase,gets it from firebase,sets it to user.watched state
        const LOAD_VIDEO_SUCCES = videoReducer.actions.LOAD_VIDEO_SUCCES
        const videoRef = collection(database,'videos')
        const q = query(videoRef,where('__name__','==',`${videoID}`))
        try{
            dispatch(startLoad())
            const videos = await getDocs(q)
            videos.forEach((video) => {
            if (video.data().video.user.username === username){
                const videoObj = video.data().video
                videoObj.id = videoID
                dispatch(LOAD_VIDEO_SUCCES(videoObj))
                dispatch(SET_SOURCE_FILE())
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