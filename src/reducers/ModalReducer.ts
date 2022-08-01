import { createSlice } from "@reduxjs/toolkit";

// when modal open shows register or login component,depends on state
interface IModal{
    login_or_register : string,
}
const initialState : IModal = {
    login_or_register : 'login'
}
export const modalReducer = createSlice({
    name : 'modal-reducer',
    initialState : initialState,
    reducers : {
        changeState(state:IModal){
            if (state.login_or_register === 'login'){
                state.login_or_register = 'register'
            }
            else{
                state.login_or_register = 'login'
            }
        }
    }
}) 