import { getAuth } from 'firebase/auth'
import {doc,getDoc,getDocs,query,setDoc, where } from 'firebase/firestore'
import { database } from '../config'
import { SET_CURRENT_VIDEO } from '../reducers/asyncActions/SET_CURRENT_VIDEO'
import { UserReducer } from '../reducers/User'
import { IVideo } from '../types/VideoTypes'
import { useAppDispatch, useAppSelector } from './TypedHooks'
import { GET_WATCHED_LIST } from '../reducers/asyncActions/GET_WATCHED_LIST'
import { IUser } from '../types/userTypes'
import { ADD_VIDEO_TO_FIREBASE_WATCHED_LIST } from '../reducers/asyncActions/ADD_VIDEO_TO_FIREBASE_WATCHED_LIST'
import { store } from '..'




export const useADD_VIDEO = () => {
    const auth = getAuth()
    const email = auth.currentUser?.email
    const dispatch = useAppDispatch()
    const saveHistory = useAppSelector(state => state.history.saveHistory)


    const video = useAppSelector(state => state.video.video)
    const user = useAppSelector(state => state.user.user)

    const ADD_VIDEO = async(username:string,videoID:string) => {
        // if paramter save history(localStorage) on,then add new video to DB and get it again
        if (saveHistory){
            // get current watched list,from firebase
            dispatch(GET_WATCHED_LIST())
            // loading it to FireBase
            if (video && user){
                await ADD_VIDEO_TO_FIREBASE_WATCHED_LIST(video,user) // just async function
            }
            // gets it again from firebase
            dispatch(GET_WATCHED_LIST())
        }
    }

    return(
        ADD_VIDEO
    )
}



