import { store } from "../../index";
import { AppDispatch } from "../../store/store"
import { collection, CollectionReference, DocumentData, getDocs, limit, orderBy, query, QueryDocumentSnapshot, where } from "firebase/firestore";
import { database } from "../../config";
import { videoReducer } from "../VideoReducer";
import { IVideo } from "../../types/VideoTypes";
import { LOAD_ALL_VIDEOS } from "./LOAD_ALL_VIDEOS";

export const LOAD_VIDEOS_WITH_SEARCH = (search:string,email?:string) => {
    // without email - all videos
    // with email - only current user videos(can be empty)
    return async(dispatch:AppDispatch) => {
        const SET_LAST_VISIBLE_DOC = videoReducer.actions.SET_LAST_VISIBLE_DOC
        const {load,loadSuccess,loadError} = videoReducer.actions
        let collectionRef = query(collection(database,'videos'),orderBy('video.created'))
        if (email && email.length){
            collectionRef = query(collection(database,'videos'),where('video.user.email','==',email),orderBy('video.created')) as CollectionReference  
        }
        try{    
            const res = await getDocs(collectionRef)
            dispatch(load())
            let array : IVideo[] = []
            res.docs.forEach((doc) => {
                let video : IVideo = doc.data().video
                video.id = doc.id
                if (typeof search === 'string'){
                    const videoName = video.name.toLowerCase()
                        if (search.length){
                            if (videoName.includes(search.toLowerCase())){
                                array.unshift(video)
                            }
                        }
                        else{
                            array.unshift(video)
                        }
                    }
                })
            if (email && email.length){
                dispatch(LOAD_ALL_VIDEOS(email,search))
            }
            else{
                dispatch(LOAD_ALL_VIDEOS('',search))
            }
            dispatch(loadSuccess(array))
            // firebase doesen't filtering data,so when search it loads all videos,that includes searchValue
            dispatch(SET_LAST_VISIBLE_DOC(null))
        }
        catch(e){
            let message = 'Unknown Error'
            if (e instanceof Error) message = e.message
            dispatch(loadError(message))
        }

    }
}