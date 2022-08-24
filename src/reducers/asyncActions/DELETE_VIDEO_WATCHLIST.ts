import { deleteDoc, doc, setDoc } from "firebase/firestore"
import { useEffect } from "react"
import { database } from "../../config"
import { AppDispatch } from "../../store/store"
import { IUser } from "../../types/userTypes"
import { IVideo } from "../../types/VideoTypes"
import { UserReducer } from "../User"

/* works when you watched the video,that already on your watchedList
    deletes the video,then uploads it again on Firebase,so it will be first
    deleted video in user.watched and push it again
*/
export const DELETE_VIDEO_WATCHLIST = async(user : IUser,video : IVideo) => {
    const videoRef = doc(database,'users',`${user.username}`)
    // удаляет все экземпяры видео
    let watchedListToReturn = user.watched?.filter((obj) => obj.name !== video.name)
    if (watchedListToReturn?.length){
        watchedListToReturn?.push(video)
    }
    const SET_WATCHED_LIST = UserReducer.actions.setWatchedVideos
    const updateFireBase = async() => {
        await setDoc(videoRef,{
            user : {
                watched : watchedListToReturn
            }
        })
        await setDoc(videoRef,{
            user : {
             watched : watchedListToReturn
          }
        })
    }
    return async(dispatch:AppDispatch) => {
        await updateFireBase()
        if (watchedListToReturn?.length){
            dispatch(SET_WATCHED_LIST(watchedListToReturn))
        }   
    }
}