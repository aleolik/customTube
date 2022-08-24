import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateProps {
    saveHistory : boolean
    loading : boolean
    error : string
}
const initialState : initialStateProps = {
    saveHistory : true,
    loading : false,
    error : ''
}

export const HistoryReducer = createSlice({
    name:'historyRedcuer',
    initialState :initialState,
    reducers : {
        // if false,then true or if true,then false
        CHANGE_HISTORY_STATE(state : initialStateProps,action:PayloadAction<boolean>){
            state.saveHistory = action.payload
        },
        START_LOAD(state : initialStateProps){
            state.loading = true
        },
        LOAD_SUCCESS(state : initialStateProps){
            state.loading = false
        },
        LOAD_ERROR(state : initialStateProps,action:PayloadAction<string>){
            state.loading = false
            state.error = action.payload
        }
    }

})