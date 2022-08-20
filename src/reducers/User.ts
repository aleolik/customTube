import {createSlice, PayloadAction } from "@reduxjs/toolkit";
import {IUser} from '../types/userTypes'
import { userState } from "../types/userTypes";
import { IVideo } from "../types/VideoTypes";

const initialState : userState = {
    user : null
}

export const UserReducer = createSlice({
    name : 'user',
    initialState : initialState,
    reducers : {
        login(state : userState,action : PayloadAction<IUser>){
            state.user = action.payload
        },
        logout(state:userState){
            state.user = null
        },
        setWatchedVideos(state:userState,action:PayloadAction<IVideo[]>){
            if (state.user){
                state.user.watched = action.payload
            }
        },
        ADD_VIDEO_TO_WATCHLIST(state:userState,action:PayloadAction<IVideo>){
            if (state.user?.watched?.length){
                state.user.watched = [...state.user.watched,action.payload]
            }
            else if (state.user?.watched?.length === 0){
                state.user.watched = [action.payload]
            }
        }
    }
})