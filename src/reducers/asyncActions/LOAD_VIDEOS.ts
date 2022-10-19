/* 
    How function works : 
    loads first 24 videos,then when you scroll to the bottom(last 5 videos)
    loads another 24 videos from range (current,current+24)
*/
import {store} from '../../index'
import { collection, getDocs,query,limit,orderBy,where,CollectionReference, startAt,endAt, startAfter, DocumentSnapshot} from "firebase/firestore";
import { database } from "../../config";
import { AppDispatch } from "../../store/store";
import { IVideo } from "../../types/VideoTypes";
import { videoReducer } from "../VideoReducer";
import { LOAD_ALL_VIDEOS } from './LOAD_ALL_VIDEOS';

export const LoadUserVideos = (email?:string) => {
    /*
        loads videos on MainPage - default
        loads videos on ProfilePage - if email
    */
    return async (dispatch:AppDispatch) => {
        const SET_LAST_VISIBLE_DOC = videoReducer.actions.SET_LAST_VISIBLE_DOC
        if (email === undefined || email.length === 0){
            dispatch(LOAD_ALL_VIDEOS())
        }
        else{
            dispatch(LOAD_ALL_VIDEOS(email))
        }
        const device = store.getState().device.device
        let video_limit = 0
        const video_limit_options = {
            'tablet':24,
            'desktop':24,
            'mobile':5
        }
        if (device){
            video_limit = video_limit_options[device]
        }
        let collectionRef = query(collection(database,'videos'),orderBy('video.createdNegative'),limit(video_limit))
        if (email){
            collectionRef = query(collection(database,'videos'),where('video.user.email','==',email),limit(video_limit),orderBy('video.createdNegative')) as CollectionReference  
        }
        const {load,loadSuccess,loadError} = videoReducer.actions
        try{    
            const res = await getDocs(collectionRef)
            dispatch(load())
            let array : IVideo[] = []
            res.forEach((doc) => {
                let video : IVideo = doc.data().video
                video.id = doc.id
                array.unshift(video)
            })
            const lastDoc = res.docs[res.docs.length-1]
            const reversedArray : IVideo[] = array.reverse()
            dispatch(loadSuccess(reversedArray))
            if (lastDoc && lastDoc.exists()){
                dispatch(SET_LAST_VISIBLE_DOC(lastDoc))
            }
            else{
                dispatch(SET_LAST_VISIBLE_DOC(null))
            }
        }
        catch(e){
            let message = 'Unknown Error'
            if (e instanceof Error) message = e.message
            dispatch(loadError(message))
        }
    }
}


