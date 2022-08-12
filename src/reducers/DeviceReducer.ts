import { createSlice, PayloadAction } from "@reduxjs/toolkit"


interface IDevice{
    device : 'tablet' | 'mobile' | 'desktop'
}
const initialState : IDevice = {
    device : 'desktop'
}

export const DeviceReducer = createSlice({
    name : 'device',
    initialState : initialState,
    reducers : {
        setDevice(state : IDevice,action:PayloadAction<'tablet' | 'desktop' | 'mobile'>){
            state.device = action.payload
        }
    }
})