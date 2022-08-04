import { ActionCreator, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {IUser} from '../types/userTypes'
import { userState } from "../types/userTypes";

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
        }
    }
})