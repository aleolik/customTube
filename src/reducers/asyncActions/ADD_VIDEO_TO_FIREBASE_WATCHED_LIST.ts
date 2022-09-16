import { doc, setDoc } from "firebase/firestore"
import { store } from "../../index"
import { database } from "../../config"
import { REUPLOAD_VIDEO_IN_FIREBASE } from "./REUPLOAD_VIDEO_IN_FIREBASE"
import { IVideo } from "../../types/VideoTypes"

export const ADD_VIDEO_TO_FIREBASE_WATCHED_LIST =  async() => {
    // logic : reverse list,check if in already,do smth
    const user = store.getState().user.user
    const video = store.getState().video.video
    let AfterUpload = false
        if (user && video){
            // because firstore doese'nt support it
            const videoWithOutFileProperty : IVideo = {
                name : video.name,
                created : video.created,
                description : video.description,
                views : video.views,
                id : video.id,
                photoUrl : video.photoUrl,
                user : video.user,
                link : video.link,
            }
            const userRef = doc(database,'users',`${user.email}`)
            if (user.watched?.length !== undefined && user.watched.length > 0){
                {user.watched.map((watchedVideo) => {
                    if (watchedVideo.name === video.name){
                        AfterUpload = true
                        REUPLOAD_VIDEO_IN_FIREBASE(videoWithOutFileProperty)
                    }
                })}
                if (!AfterUpload){
                    await setDoc(userRef,{
                        user : {
                            ...user,
                            watched : [...user.watched,videoWithOutFileProperty]
                        }
                    })
                }
            }
            else{
                await setDoc(userRef,{
                    user : {
                        ...user,
                        watched : [videoWithOutFileProperty]
                    }
                })
            }
     }
}