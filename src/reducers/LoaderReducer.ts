import { createSlice } from "@reduxjs/toolkit"
import { stat } from "fs"

interface initialStateProps{
    load : boolean,

}
const initialState : initialStateProps = {
    load : false,
}   

export const LoaderRedcuer = createSlice({
    name : 'loader',
    initialState : initialState,
    reducers : {
        startLoading(state:initialStateProps){
            state.load = true
        },
        endLoading(state:initialStateProps){
            state.load = false
        }
    }
})