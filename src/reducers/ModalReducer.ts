import { createSlice } from "@reduxjs/toolkit";

// when modal open shows register or login component,depends on state
interface IModal{
    show_login_or_faq : string,
}
const initialState : IModal = {
    show_login_or_faq : 'login'
}
export const modalReducer = createSlice({
    name : 'modal-reducer',
    initialState : initialState,
    reducers : {
        changeState(state:IModal){
            if (state.show_login_or_faq === 'login'){
                state.show_login_or_faq = 'faq'
            }
            else{
                state.show_login_or_faq = 'login'
            }
        }
    }
}) 