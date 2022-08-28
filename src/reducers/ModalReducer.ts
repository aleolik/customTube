import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// when modal open shows register or login component,depends on state
interface IModal{
    showLogin : boolean,
    showRegister : boolean,
    showFAQ : boolean
    show_side_bar : boolean
    error : string
    showModal : boolean
}
const initialState : IModal = {
    showLogin : true,
    showRegister : false,
    showFAQ : false,
    show_side_bar : false,
    error : '',
    showModal : false
}
export const modalReducer = createSlice({
    name : 'modal-reducer',
    initialState : initialState,
    reducers : {
        showLoginAction(state:IModal){
            state.showLogin = true
            state.showFAQ = false
            state.showRegister = false
        },
        showRegisterAction(state:IModal){
            state.showLogin = false
            state.showRegister = true
            state.showFAQ = false
        },
        showFAQAction(state:IModal){
            state.showLogin = false
            state.showRegister = false
            state.showFAQ = true
        },
        OpenSideBar(state:IModal){
            state.show_side_bar = true
        },
        CloseSideBar(state:IModal){
            state.show_side_bar = false
        },
        setError(state:IModal,action:PayloadAction<string>){
            state.error = action.payload
        },
        showModalWindow(state : IModal){
            state.showModal = true
        },
        closeModalWindow(state : IModal){
            state.showModal = false
        }
    }
}) 