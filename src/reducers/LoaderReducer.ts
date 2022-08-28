import { createSlice } from "@reduxjs/toolkit"
import { stat } from "fs"

interface initialStateProps{
    loadingToDB : boolean,
    loadingFromDB : boolean,
    loadingToStorage : boolean,
    loadingFromStorage : boolean
}
const initialState : initialStateProps = {
    loadingToDB : false,
    loadingFromDB : false,
    loadingToStorage : false,
    loadingFromStorage : false
}   

export const LoaderRedcuer = createSlice({
    name : 'loader',
    initialState : initialState,
    reducers : {
        loadFromDB(state : initialStateProps){
            state.loadingFromDB = true
            state.loadingToDB = false
            state.loadingFromStorage = false
            state.loadingToStorage = false
        },
        loadToDB(state : initialStateProps){
            state.loadingFromDB =false
            state.loadingToDB = true
            state.loadingFromStorage = false
            state.loadingToStorage = false
        },
        loadFromStorage(state : initialStateProps){
            state.loadingFromDB =false
            state.loadingToDB = false
            state.loadingFromStorage = true
            state.loadingToStorage = false
        },
        loadToStorage(state : initialStateProps){
            state.loadingFromDB =false
            state.loadingToDB = false
            state.loadingFromStorage = false
            state.loadingToStorage = true
        },
    }
})