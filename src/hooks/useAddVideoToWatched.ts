import { getAuth } from 'firebase/auth'
import {doc,getDoc,getDocs,query,setDoc, where } from 'firebase/firestore'
import { database } from '../config'
import { ADD_VIDEO_TO_WATCHLIST } from '../reducers/asyncActions/ADD_VIDEO_TO_WATCHLIST'
import { DELETE_VIDEO_WATCHLIST } from '../reducers/asyncActions/DELETE_VIDEO_WATCHLIST'
import { UserReducer } from '../reducers/User'
import { IVideo } from '../types/VideoTypes'
import { useAppDispatch, useAppSelector } from './TypedHooks'

// gets watched list from firestore
export const useGetWatchedForUser = () => {
    const dispatch = useAppDispatch()
    const GET_WATCHED_LIST = async() : Promise<IVideo[] | null> => {
        const auth = getAuth()
        const email = auth.currentUser?.email
        if (email){
            const userRef = doc(database,'users',`${email}`)
            const userSnap = await getDoc(userRef)
            const setWatchedVideos = UserReducer.actions.setWatchedVideos
            if (userSnap.exists()){
                if (userSnap.data().user.watched){
                    let watched : IVideo[] =  userSnap.data().user.watched
                    watched = watched.reverse()
                    dispatch(setWatchedVideos(watched))
                }
            }
        }
        return null
    }
    return(
        GET_WATCHED_LIST
    )
}

export const useADD_VIDEO = () => {
    const auth = getAuth()
    const email = auth.currentUser?.email
    const userRef = doc(database,'users',`${email}`)
    const user = useAppSelector(state => state.user.user)
    const dispatch = useAppDispatch()
    const video = useAppSelector(state => state.video.video)
    const saveHistory = useAppSelector(state => state.history.saveHistory)

    const ADD_VIDEO_TO_FIREBASE = async() => {
        if (user && video){
            if (user?.watched?.length){
                if (user.watched.filter((obj) => obj.id === video.id).length > 1){
                    await DELETE_VIDEO_WATCHLIST(user,video)
                }
                else{   
                    await setDoc(userRef,{
                        user : {
                            ...user,
                            watched : [video,...user.watched]
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

    const ADD_VIDEO_TO_WATCHED = async(username:string,video_name:string) => {
        dispatch(ADD_VIDEO_TO_WATCHLIST(video_name,username))
    }
    const ADD_VIDEO = async(username:string,video_name:string) => {
        if (saveHistory){
            ADD_VIDEO_TO_WATCHED(username,video_name)
            ADD_VIDEO_TO_FIREBASE()
        }
    }

    return(
        ADD_VIDEO
    )
}



