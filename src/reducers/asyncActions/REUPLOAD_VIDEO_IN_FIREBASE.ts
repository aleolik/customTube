import { deleteDoc, doc, setDoc } from "firebase/firestore"
import { store } from "../../index"
import { database } from "../../config"
import { IVideo } from "../../types/VideoTypes"

/* works when you watched the video,that already on your watchedList
    deletes the video,then uploads it again on Firebase,so it will be first
    deleted video in user.watched and push it again
*/
export const REUPLOAD_VIDEO_IN_FIREBASE = async() => {
    const user = store.getState().user.user
    const video = store.getState().video.video
        if (user && video){
            const videoRef = doc(database,'users',`${user.email}`)
            // if firebase is empty,then do nothing
            if (user.watched?.length){
                // deleted current video
                console.log('user.watched,',user.watched)
                const watchedListToReturn : IVideo[] = user.watched?.filter((obj) => obj.name !== video.name)
                const updateFireBase = async() => {
                    await setDoc(videoRef,{
                        user : {
                            ...user,
                            watched : [...watchedListToReturn,video]
                        }
                    })
                }
                updateFireBase()
        }
    }
 }