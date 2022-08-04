/* 
    How function works : 
    loads first 25 videos,then when you scroll to the bottom(last 5 videos)
    loads another 25 videos from range (current,current+25)
*/

import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { measureMemory } from "vm";
import { database } from "../../config";
import { AppDispatch } from "../../store/store";
import { IVideo } from "../../types/VideoTypes";
import { videoReducer } from "../VideoReducer";
export const LOAD_VIDEOS = () => {
    return async (dispatch:AppDispatch) => {
        const collectionRef = collection(database,'videos')
        const {load,loadSuccess,loadError} = videoReducer.actions
        try{    
            dispatch(load())
            let array : IVideo[] = []
            const res = await getDocs(collectionRef)
            if (res !== null){
                res.forEach((doc) => {
                    let video : IVideo = doc.data().video
                    array.push(video)
                })
            }
            dispatch(loadSuccess(array))
        }
        catch(e){
            let message = 'Unknown Error'
            if (e instanceof Error) message = e.message
            dispatch(loadError(message))
        }
    }
}


