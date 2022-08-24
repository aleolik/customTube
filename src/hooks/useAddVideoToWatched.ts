import {doc,getDoc,getDocs,query,setDoc, where } from 'firebase/firestore'
import { useEffect} from 'react'
import { database } from '../config'
import { ADD_VIDEO_TO_WATCHLIST } from '../reducers/asyncActions/ADD_VIDEO_TO_WATCHLIST'
import { DELETE_VIDEO_WATCHLIST } from '../reducers/asyncActions/DELETE_VIDEO_WATCHLIST'
import { UserReducer } from '../reducers/User'
import { IVideo } from '../types/VideoTypes'
import { useAppDispatch, useAppSelector } from './TypedHooks'

export const useGetWatchedForUser = () => {
    const dispatch = useAppDispatch()
    const GET_WATCHED_LIST = async(username:string) : Promise<IVideo[] | null> => {
        if (typeof username === 'string'){
            const userRef = doc(database,'users',`${username}`)
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
    const user = useAppSelector(state => state.user.user)
    const userRef = doc(database,'users',`${user?.username}`)
    const dispatch = useAppDispatch()
    const video = useAppSelector(state => state.video.video)
    const saveHistory = useAppSelector(state => state.history.saveHistory)

    const ADD_VIDEO_TO_FIREBASE = async() => {
        console.log('video1',video)
        if (user && video){
            console.log('video',video)
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



