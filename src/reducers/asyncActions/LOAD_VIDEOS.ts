/* 
    How function works : 
    loads first 25 videos,then when you scroll to the bottom(last 5 videos)
    loads another 25 videos from range (current,current+25)
*/

import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs,query, where,CollectionReference} from "firebase/firestore";
import { database } from "../../config";
import { AppDispatch } from "../../store/store";
import { IVideo } from "../../types/VideoTypes";
import { videoReducer } from "../VideoReducer";
export const LoadUserVideos = (username:String) => {
    return async (dispatch:AppDispatch) => {
        let collectionRef = collection(database,'videos')
        if (username){
            collectionRef = query(collection(database,'videos'),where('video.user.username','==',username)) as CollectionReference  
        }
        const {load,loadSuccess,loadError} = videoReducer.actions
        try{    
            dispatch(load())
            let array : IVideo[] = []
            const res = await getDocs(collectionRef)
            if (res !== null){
                res.forEach((doc) => {
                    let video : IVideo = doc.data().video
                    video.id = doc.id
                    array.push(video)
                })
            }
            dispatch(loadSuccess(array))
        }
        catch(e){
            let message = 'Unknown Error'
            if (e instanceof Error) message = e.message+1
            dispatch(loadError(message))
        }
    }
}


