import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CollectionReference, DocumentData, QueryDocumentSnapshot } from "firebase/firestore"
import { IVideo } from "../types/VideoTypes"
import {IUser} from '../types/userTypes'

interface initialStateProps{
    // to load videos
    AllVideos : number | null // to know how many videos on the server(TotalCount for paginating)
    AllError : string,
    AllLoading : boolean,
    videos : IVideo[]
    loading : boolean
    error : string
    loadingDynamically : boolean
    // to upload
    uploading : boolean
    uploadingError : string
    // to do smth with 1 video
    video : IVideo | null
    lastVisible? : null | QueryDocumentSnapshot<DocumentData>
}
const initialState : initialStateProps = {
    AllVideos : null,
    AllLoading : false,
    loadingDynamically : false,
    AllError : '',
    videos : [],
    loading : false,
    error : '',
    uploading : false,
    uploadingError : '',
    video : null,
    lastVisible : null
}

export const videoReducer = createSlice({
    name : 'videoReducer',
    initialState : initialState,
    reducers : {
        /*
            load,loadSuccess,loadError - set state of videos container

        */
        load(state : initialStateProps){
            state.loading = true    
            state.error = ''
            state.videos = []
        },
        loadSuccess(state:initialStateProps,action : PayloadAction<IVideo[]>){
            state.loading = false
            state.error = ''
            state.videos = action.payload
            state.lastVisible = null
        },
        loadError(state:initialStateProps,action : PayloadAction<string>){
            state.error = action.payload
            state.loading = false
            state.videos = []
            state.lastVisible = null
        },
        endLoad(state:initialStateProps){
            state.loading = false
        },
        /*
        loadDynamically 
        SET_LAST_VISIBLE_DOC
        sets state for dynamic pagination

        sets state of all videos(for dynami pagination,max videos in DB)
        LOAD_ALL_VIDEOS
        LOAD_ALL_VIDEOS_SUCCESS
        LOAD_ALL_VIDEOS_ERROR
        */
        loadDynamically(state : initialStateProps){
            state.loadingDynamically = true    
            state.error = ''
        },
        loadDynamicallySuccess(state:initialStateProps,action : PayloadAction<IVideo[]>){
            state.loadingDynamically = false
            state.error = ''
            let ids_arr : string[] = []
            for (let i = 0;i<state.videos.length;i++){
                const video = state.videos[i]
                if (video.id){
                    if (!ids_arr.includes(video.id)){
                        ids_arr.unshift(video.id)
                    }
                }   
            }
            let arr : IVideo[] = []
            for (let i = 0;i<action.payload.length;i++){
                const video = action.payload[i]
                if (video.id){
                    if (!ids_arr.includes(video.id)){
                        arr.unshift(video)
                        ids_arr.push(video.id)
                    }
                }
            }
            state.videos = [...state.videos,...arr]
        },
        loadDynamicallyError(state : initialStateProps,action : PayloadAction<string>){
            state.loadingDynamically = false    
            state.error = ''
        },
        SET_LAST_VISIBLE_DOC(state:initialStateProps,action : PayloadAction<QueryDocumentSnapshot<DocumentData> | null>){
            state.lastVisible = action.payload
        },
        LOAD_ALL_VIDEOS(state:initialStateProps){
            state.AllLoading = true
            state.AllError = ''
            state.AllVideos = null
        },
        LOAD_ALL_VIDEOS_SUCCESS(state:initialStateProps,action : PayloadAction<number>){
            state.AllVideos = action.payload
            state.AllLoading = false
            state.AllError = ''
        },
        LOAD_ALL_VIDEOS_ERROR(state:initialStateProps,action : PayloadAction<string>){
            state.AllError = action.payload
            state.AllVideos = null
            state.AllLoading = false
        },
        /* 
            setVideoFile - for creating video
        */
        SetVideoFile(state:initialStateProps,action : PayloadAction<string>){
            if (state.video){
                state.video.file = action.payload
            }
        },
        uploadNewVideo(state:initialStateProps){
            state.uploading = true
            state.uploadingError = ''
        },
        uploadNewVideoSuccess(state:initialStateProps,action : PayloadAction<IVideo>){
            state.videos = [action.payload,...state.videos,]
            state.uploading  = false
            state.uploadingError = ''
        },
        uploadNewVideoError(state:initialStateProps,action : PayloadAction<string>){
            state.uploading = false
            state.uploadingError = action.payload
        },
        /*
        LOAD_VIDEO
        LOAD_VIDEO_SUCCES
        LOAD_VIDEO_ERROR
        to set state of video
        */
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