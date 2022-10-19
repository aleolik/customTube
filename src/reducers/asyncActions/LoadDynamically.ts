/* 
    How function works : 
    loads first 24 videos,then when you scroll to the bottom(last 5 videos)
    loads another 24 videos from range (current,current+25)
*/
import {store} from '../../index'
import { collection, getDocs,query,limit,orderBy,where,CollectionReference, startAt,endAt, startAfter, DocumentSnapshot} from "firebase/firestore";
import { database } from "../../config";
import { AppDispatch } from "../../store/store";
import { IVideo } from "../../types/VideoTypes";
import { videoReducer } from "../VideoReducer";

export const LoadUserVideosDynamically = (email?:string | null | undefined,search?:string | undefined) => {
    /*
        loads videos dynamically on Main Page - without email and search
        loads videos dynamically on ProfilePage - with email only
        loads videos dynamically on Serach Page if search
        loads videos dynamically on Profile Page with Search if search and email
    */
    return async (dispatch:AppDispatch) => {
        const device = store.getState().device.device
        let video_limit;
        const video_limit_options = {
            'tablet':24,
            'desktop':24,
            'mobile':5
        }
        if (device){
            video_limit = video_limit_options[device]
        }
        else{
            video_limit = 24
        }
        const setLastVisible = videoReducer.actions.SET_LAST_VISIBLE_DOC
        const lastVisible = store.getState().video.lastVisible
        let collectionRef = query(collection(database,'videos'),orderBy('video.createdNegative'),startAfter(lastVisible),limit(video_limit)) as CollectionReference
        if (email){
            collectionRef = query(collection(database,'videos'),where('video.user.email','==',email),limit(video_limit),orderBy('video.createdNegative'),startAfter(lastVisible)) as CollectionReference  
        }
        const {loadDynamically,loadDynamicallySuccess,loadDynamicallyError} = videoReducer.actions
        try{    
            const res = await getDocs(collectionRef)
            if (!res.empty){
                dispatch(loadDynamically())
                let array : IVideo[] = []
                res.forEach((doc) => {
                    let video : IVideo = doc.data().video
                    video.id = doc.id
                    if (search && search.length){
                        const videoName = video.name.toLowerCase()
                        if (videoName.includes(search.toLowerCase())){
                            array.unshift(video)
                        }
                    }
                    else{
                        array.unshift(video)
                    }
                })
                // fix it
                const lastDoc = res.docs[res.docs.length-1]
                setTimeout(() => {
                    dispatch(loadDynamicallySuccess(array))
                    dispatch(setLastVisible(lastDoc))
                },1110)
            }
        }
        catch(e){
            let message = 'Unknown Error'
            if (e instanceof Error) message = e.message
            dispatch(loadDynamicallyError(message))
        }
    }
}


