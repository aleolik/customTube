/* 
    How function works : 
    loads first 25 videos,then when you scroll to the bottom(last 5 videos)
    loads another 25 videos from range (current,current+25)
*/

import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs,query,limit,orderBy,where,CollectionReference} from "firebase/firestore";
import { database } from "../../config";
import { AppDispatch } from "../../store/store";
import { IVideo } from "../../types/VideoTypes";
import { videoReducer } from "../VideoReducer";

export const LoadUserVideos = (username:String='',video_limit=25) => {
    return async (dispatch:AppDispatch) => {
        let collectionRef = query(collection(database,'videos'),limit(video_limit),orderBy('video.created'))
        if (username){
            collectionRef = query(collection(database,'videos'),where('video.user.username','==',username),limit(video_limit),orderBy('video.created')) as CollectionReference  
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
                    array.unshift(video)
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


