import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IVideo } from "../types/VideoTypes"

interface initialStateProps{
    // to load videos
    videos : IVideo[]
    loading : boolean
    error : string
    // to do smth with 1 video
    video : IVideo | null
}
const initialState : initialStateProps = {
    videos : [],
    loading : false,
    error : '',
    video : null
}

export const videoReducer = createSlice({
    name : 'videoReducer',
    initialState : initialState,
    reducers : {
        load(state : initialStateProps){
            state.loading = true
            state.videos = []
            state.error = ''
        },
        loadSuccess(state:initialStateProps,action : PayloadAction<IVideo[]>){
            state.videos = action.payload
            state.loading = false
            state.error = ''
        },
        loadError(state:initialStateProps,action : PayloadAction<string>){
            state.error = action.payload
            state.loading = false
            state.videos = []
        },
        load_video_creation(state : initialStateProps){
            state.loading = true
            state.video = null
            state.error = ''
        },
        load_video_creation_success(state:initialStateProps,action : PayloadAction<IVideo>){
            state.video = action.payload
            state.loading = false
            state.error = ''
        },
        load_video_creation_error(state:initialStateProps,action : PayloadAction<string>){
            state.error = action.payload
            state.loading = false
            state.videos = []
        },
    }
})