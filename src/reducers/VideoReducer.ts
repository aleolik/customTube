import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IVideo } from "../types/VideoTypes"


interface initialState{
    videos : IVideo[]
}
const defaultState : initialState = {
    videos : []
}

export const videoReducer = createSlice({
    name : 'videoReducer',
    initialState : defaultState,
    reducers : {
        LOAD_VIDEOS_ON_MAIN_PAGE(state : initialState ,action : PayloadAction){
            
        }
    }
})