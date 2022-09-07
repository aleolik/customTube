import { doc, setDoc } from "firebase/firestore"
import { store } from "../../index"
import { database } from "../../config"
import { REUPLOAD_VIDEO_IN_FIREBASE } from "./REUPLOAD_VIDEO_IN_FIREBASE"

export const ADD_VIDEO_TO_FIREBASE_WATCHED_LIST =  async() => {
    // logic : reverse list,check if in already,do smth
    const user = store.getState().user.user
    const video = store.getState().video.video
    let AfterUpload = false
        if (user && video){
            const userRef = doc(database,'users',`${user.email}`)
            if (user.watched?.length){
                {user.watched.map((watchedVideo) => {
                    if (watchedVideo.name === video.name){
                        AfterUpload = true
                        REUPLOAD_VIDEO_IN_FIREBASE()
                    }
                })}
                if (!AfterUpload){
                    await setDoc(userRef,{
                        user : {
                            ...user,
                            watched : [...user.watched,video]
                        }
                    })
                }
            }
            else{
                await setDoc(userRef,{
                    user : {
                        ...user,
                        watched : [video]
                    }
                })
            }
     }
}