import {createSlice, PayloadAction } from "@reduxjs/toolkit";
import {IUser} from '../types/userTypes'
import { userState } from "../types/userTypes";
import { IVideo } from "../types/VideoTypes";

const initialState : userState = {
    user : null,
    loadUser : false,
    userError : '',
}

export const UserReducer = createSlice({
    name : 'user',
    initialState : initialState,
    reducers : {
        // loging,clear function or other.
        startUserAction(state : userState){
            state.loadUser = true
        },
        UserActionError(state:userState,action:PayloadAction<string>){
            if (action.payload.length){
                state.userError = action.payload
            }
            else{
                state.userError = 'Unknown Error!'
            }
        },
        EndUserAction(state:userState){
            state.loadUser = false
        },
        login(state : userState,action : PayloadAction<IUser>){
            state.user = action.payload
        },
        logout(state:userState){
            state.user = null
        },
        setWatchedVideos(state:userState,action:PayloadAction<IVideo[]>){
            if (state.user !== null){
                state.user.watched = action.payload
            }
        },
        ADD_VIDEO_TO_WATCHLIST(state:userState,action:PayloadAction<IVideo>){
            if (state.user && state.user.watched?.length){
                state.user.watched = [...state.user.watched,action.payload]
            }
            else if (state.user && !state.user.watched?.length){
                state.user.watched = [action.payload]
            }
        },
        CLEAR_WATCHED_LIST(state:userState){
            if (state.user !== null){
                state.user.watched = []
            }
        },
    }
})