/* 
    How function works : 
    loads first 24 videos,then when you scroll to the bottom(last 4 videos)
    loads another 24 videos from range (current,current+25)
*/
import {store} from '../../index'
import { collection, getDocs,query,limit,orderBy,where,CollectionReference, startAt,endAt, startAfter, DocumentSnapshot} from "firebase/firestore";
import { database } from "../../config";
import { AppDispatch } from "../../store/store";
import { IVideo } from "../../types/VideoTypes";
import { videoReducer } from "../VideoReducer";

export const LOAD_ALL_VIDEOS = (email?:string,search? : string) => {
    /*
        without email and search - all videos in DB
        email - loads selected user videos in DB
        search - searching in DB.
    */
    return async (dispatch:AppDispatch) => {
        let collectionRef = query(collection(database,'videos'),orderBy('video.created'))
        if (email){
            collectionRef = query(collection(database,'videos'),where('video.user.email','==',email),orderBy('video.created')) as CollectionReference
        }
        const {LOAD_ALL_VIDEOS,LOAD_ALL_VIDEOS_SUCCESS,LOAD_ALL_VIDEOS_ERROR} = videoReducer.actions
        try{    
            dispatch(LOAD_ALL_VIDEOS())
            const res = await getDocs(collectionRef)
            if (search){
                let array : IVideo[] = []
                res.forEach((doc) => {
                    let video : IVideo = doc.data().video
                    if (video.name.toLowerCase().includes(search.toLowerCase())){
                        array.push(video)
                    }
                })
                dispatch(LOAD_ALL_VIDEOS_SUCCESS(array.length))
            }
            else{
                dispatch(LOAD_ALL_VIDEOS_SUCCESS(res.docs.length))
            }
        }
        catch(e){
            let message = 'Unknown Error'
            if (e instanceof Error) message = e.message
            dispatch(LOAD_ALL_VIDEOS_ERROR(message))
        }
    }
}


