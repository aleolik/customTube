import { createSlice, PayloadAction } from "@reduxjs/toolkit"


interface IState{
    darkMode : boolean,
}
const initialState : IState = {
    darkMode : true
}

export const StateSlice = createSlice({
    name : 'device',
    initialState : initialState,
    reducers : {
        SetDarkModeOn(state : IState){
            state.darkMode = true
        },
        SetDarkModeOff(state:IState){
            state.darkMode = false
        }
    }
})