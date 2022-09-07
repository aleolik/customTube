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
        SetVideoFile(state:initialStateProps,action : PayloadAction<string>){
            if (state.video){
                state.video.file = action.payload
            }
        },
        loadError(state:initialStateProps,action : PayloadAction<string>){
            state.error = action.payload
            state.loading = false
            state.videos = []
        },
        LOAD_VIDEO(state : initialStateProps){
            state.loading = true
            state.video = null
            state.error = ''
        },
        LOAD_VIDEO_SUCCES(state:initialStateProps,action : PayloadAction<IVideo>){
            state.video = action.payload
            state.loading = false
            state.error = ''
        },
        LOAD_VIDEO_ERROR(state:initialStateProps,action : PayloadAction<string>){
            state.error = action.payload
            state.loading = false
            state.video = null
        },
    }
})