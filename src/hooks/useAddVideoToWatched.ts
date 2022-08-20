import { collection, doc,getDoc,getDocs,query,setDoc, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { database } from '../config'
import { ADD_VIDEO_TO_WATCHLIST } from '../reducers/asyncActions/ADD_VIDEO_TO_WATCHLIST'
import { UserReducer } from '../reducers/User'
import { videoReducer } from '../reducers/VideoReducer'
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
export const ADD_VIDEO = async(video_name:string,username:string) => {
    const user = useAppSelector(state => state.user.user)
    const userRef = doc(database,'users',`${user?.username}`)
    const dispatch = useAppDispatch()
    const video = useAppSelector(state => state.video.video)

    const ADD_VIDEO_TO_FIREBASE = async() => {
        if (user && video){
            if (user?.watched?.length){
                await setDoc(userRef,{
                // add if video already in massive,then delete old duplicate and add new
                user : {
                         ...user,
                         watched : [video,...user.watched]
                        }
                    })
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
    useEffect(() => {
        dispatch(ADD_VIDEO_TO_WATCHLIST(video_name,username))
        ADD_VIDEO_TO_FIREBASE()
    },[video_name,username])
}